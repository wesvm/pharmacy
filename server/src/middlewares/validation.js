export default (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req);

    if (!result.success) {
      const errors = result.error.issues.reduce((acc, issue) => {
        const field = issue.path[1];
        const message = issue.message;

        if (!acc[field]) {
          acc[field] = [];
        }
        acc[field].push(message);

        return acc;
      }, {});

      return res.status(422).json({
        error: "Errores de validación",
        errors,
      });
    }

    next();
  };
};
