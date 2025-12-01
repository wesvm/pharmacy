import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "../lib/jwt.js";

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          message: "Email y contraseña son requeridos."
        });
      }

      const user = await prisma.user.findUnique({
        where: { email },
        include: { role: true },
      });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({
          message: "Credenciales inválidas."
        });
      }

      const token = jwt.sign({
        id: user.id,
        email: user.email,
        role: user.role.name,
      });

      const userResponse = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role.name,
      };

      return res.status(200).json({
        user: userResponse,
        token,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
