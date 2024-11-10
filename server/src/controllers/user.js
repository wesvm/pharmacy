import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

class UserController {
  async getAll(_req, res) {
    const query = await prisma.user.findMany({
      include: { role: true },
    });

    const users = query.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role.name,
    }));

    res.status(200).json({ users });
  }
  async getById(req, res, next) {
    const { id } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
        include: { role: true },
      });

      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado." });
      }

      res.status(200).json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role.name,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    const { name, email, password, roleId } = req.body;

    try {
      const role = await prisma.role.findUnique({
        where: { id: roleId },
      });

      if (!role) {
        return res.status(404).json({
          error: "El rol seleccionado no existe.",
        });
      }

      const userExist = await prisma.user.findUnique({
        where: { email: email },
      });

      if (userExist) {
        return res.status(400).json({
          error: "El email ya está en uso.",
        });
      }

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: bcrypt.hashSync(password, 10),
          role: { connect: { id: role.id } },
        },
        include: { role: true },
      });

      res.status(201).json({
        message: "Usuario creado correctamente.",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role.name,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async update(req, res, next) {
    const { id } = req.params;
    const { name, email, password, roleId } = req.body;

    try {
      const user = await prisma.user.update({
        where: { id: parseInt(id) },
        data: {
          name,
          email,
          password: bcrypt.hashSync(password, 10),
          role: { connect: { id: roleId } },
        },
        include: { role: true },
      });

      res.status(200).json({
        message: "Usuario actualizado correctamente.",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role.name,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    const { id } = req.params;

    if (parseInt(id) === 1) {
      return res
        .status(403)
        .json({ error: "No se puede eliminar al administrador principal" });
    }

    try {
      await prisma.user.delete({
        where: { id: parseInt(id) },
      });
      res.status(200).send({ message: "Usuario eliminado correctamente." });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
