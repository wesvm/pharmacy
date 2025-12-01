import { GoogleGenAI } from "@google/genai";
import prisma from "../lib/prisma.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

class ChatController {
  async sendMessage(req, res) {
    try {
      const { message } = req.body;

      if (!message || !message.trim()) {
        return res.status(400).json({
          error: 'El mensaje no puede estar vacío'
        });
      }

      const aiResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
          Analiza el siguiente mensaje del usuario y responde SOLO en JSON válido, sin markdown.
          
          Formato:
          {
            "needs_db": true | false,
            "query_type": "get_all" | "search" | "low_stock" | "recommendation" | null,
            "search_term": string | null,
            "low_stock_threshold": number | null,
            "symptom": string | null
          }
          
          Mensaje: "${message}"
          
          Reglas:
          - needs_db = true si el usuario pide productos, stock, precios, categorías, productos por agotarse, o recomendaciones de productos.
          - query_type = "get_all" si pide ver todos los productos.
          - query_type = "search" si busca un producto/categoría específica.
          - query_type = "low_stock" si pregunta por productos por agotarse.
          - query_type = "recommendation" si describe síntomas o situaciones (ej: "ansiedad", "dolor de cabeza") y pide sugerencias.
          - symptom: texto corto con el síntoma o problema principal si es recomendación.
          
          Responde ÚNICAMENTE el JSON, sin explicaciones adicionales.
        `,
      });

      let responseText = aiResponse.text;
      responseText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const json = JSON.parse(responseText);

      let products = null;

      // Si la IA dice que hay que consultar la BD
      if (json.needs_db) {
        if (json.query_type === "get_all") {
          products = await prisma.product.findMany();
        } else if (json.query_type === "search" && json.search_term) {
          // Buscar producto(s) por nombre (sirve también para "stock de X")
          products = await prisma.product.findMany({
            where: {
              name: {
                contains: json.search_term,
                mode: "insensitive",
              },
            },
          });
        } else if (json.query_type === "low_stock") {
          // Umbral por defecto si la IA no envía uno
          const threshold = json.low_stock_threshold ?? 5;

          products = await prisma.product.findMany({
            where: {
              stockQuantity: {
                lte: threshold, // comentario: productos con stock <= threshold
              },
            },
            orderBy: {
              stockQuantity: "asc", // primero los más críticos
            },
          });
        } else if (json.query_type === "recommendation") {
          products = await prisma.product.findMany({
            select: {
              id: true,
              name: true,
              description: true,
              stockQuantity: true,
              // agrega más campos si quieres, pero lo mínimo es esto
            },
            where: {
              stockQuantity: {
                gt: 0, // solo productos disponibles
              },
            },
            take: 50, // evita mandar toda la BD
          });
        }
      }

      const finalResponseAI = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
          Mensaje del usuario: "${message}"
          ${products ? `Productos encontrados: ${JSON.stringify(products)}` : 'No se consultaron productos.'}
          
          Genera una respuesta directa, clara y concisa para el usuario.
        `,
      });

      return res.status(200).json({
        reply: finalResponseAI.text,
        ai_decision: json,
        products_count: products?.length || 0,
      });

    } catch (error) {
      console.error('Error en chat:', error);
      res.status(500).json({
        error: 'Error procesando el mensaje',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
}

export default new ChatController();
