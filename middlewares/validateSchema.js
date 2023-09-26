const validateSchema =
  (schema) =>
  async (req, res, next) => {
    try {
      await schema.parseAsync(req.body);
      return next();
    } catch (error) {
      return res.status(400).json({error: error?.issues?.[0]?.message});
    }
  };

  module.exports = validateSchema;