import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "../lib/jwt.js";

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ message: "Credenciales inválidas." });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });

    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas." });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Credenciales inválidas." });
    }

    const token = jwt.sign({
      id: user.id,
      email: user.email,
      role: user.role.name,
    });

    const { id, name, role } = user;

    res.status(200).json({
      user: {
        id,
        name,
        email,
        role: role.name,
      },
      token,
    });
  }
}

export default new AuthController();
