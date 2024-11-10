export default (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res
        .status(403)
        .json({ error: "Acceso denegado: usuario no autenticado o sin rol" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: "Acceso denegado: rol no autorizado" });
    }

    next();
  };
};
