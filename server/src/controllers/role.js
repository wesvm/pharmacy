import prisma from "../lib/prisma.js";

class RoleController {
  async getAll(_req, res) {
    const roles = await prisma.role.findMany();
    res.status(200).json({ roles });
  }
  async create(req, res, next) {
    const { name } = req.body;

    try {
      const role = await prisma.role.create({
        data: { name },
      });
      res.status(201).json({ message: "Rol creado correctamente.", role });
    } catch (error) {
      next(error);
    }
  }
  async update(req, res, next) {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const role = await prisma.role.update({
        where: { id: parseInt(id) },
        data: { name },
      });
      res.status(200).json({ message: "Rol actualizado correctamente.", role });
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    const { id } = req.params;

    if (parseInt(id) === 1) {
      return res
        .status(400)
        .json({ error: "No puedes eliminar el rol de administrador." });
    }

    try {
      await prisma.role.delete({
        where: { id: parseInt(id) },
      });
      res.status(204).send({ message: "Rol eliminado correctamente." });
    } catch (error) {
      next(error);
    }
  }
}

export default new RoleController();
