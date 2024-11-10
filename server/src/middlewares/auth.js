import jwt from "../lib/jwt.js";

export default (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ error: "Acceso denegado: token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token);
    req.user = decoded;
    return next();
  } catch {
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
};
