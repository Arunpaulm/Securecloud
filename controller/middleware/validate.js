const { ZodError } = require("zod")

const validate = (schema) =>
    (req, res, next) => {
        try {
            console.log("validating params")
            schema.parse({
                ...req.params,
                ...req.query,
                ...req.body,
            });

            next();
        } catch (error) {
            console.log("error validating params")
            if (error instanceof ZodError) {
                return res.status(400).json({
                    status: false,
                    errors: error.errors,
                });
            }
            next(error);
        }
    };

module.exports = validate