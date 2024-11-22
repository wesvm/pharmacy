export default (err, _req, res, _next) => {
  console.error("Error:", err);

  if (err.code === "P2002") {
    const field = err.meta?.target?.[0];
    return res.status(400).json({ error: `El valor del campo '${field}' ya está en uso` });
  }
  if (err.code === "P2003") {
    return res.status(400).json({ error: 'No se puede eliminar debido a relaciones existentes. Elimine los registros relacionados primero' });
  }
  if (err.code === "P2025") {
    const entity = err.meta?.modelName || "Registro";
    return res.status(404).json({ error: `${entity} no encontrado` });
  }

  res.status(500).json({
    error: err.message || "Ocurrió un error inesperado",
  });
};
