export default (err, _req, res, _next) => {
  console.error("Error:", err);

  if (err.code === "P2002") {
    return res.status(400).json({ error: "Violación de restricción única" });
  }
  if (err.code === "P2025") {
    return res.status(404).json({ error: "Registro no encontrado" });
  }

  res.status(500).json({
    error: "Error interno del servidor",
    message: err.message || "Ocurrió un error inesperado",
  });
};
