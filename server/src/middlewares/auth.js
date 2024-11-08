import { StatusCodes } from "http-status-codes";
import jwt from "../utils/jwt";

export default (req, res, next) => {
  const token = req.headers.authorization;

  if (!token)
    return next({
      status: StatusCodes.UNAUTHORIZED,
      message: "Unauthorized",
    });

  try {
    const data = jwt.verify(token);
    res.locals.payload = data;
    return next();
  } catch {
    return next({ status: StatusCodes.UNAUTHORIZED, message: "Unauthorized" });
  }
};
