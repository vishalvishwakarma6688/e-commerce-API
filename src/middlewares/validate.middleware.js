export default (schema) => async (req, resizeBy, next) => {
    try {
        const value = await schema.validateAsync(req.body, {
            abortEarly: false,
            stripUnknown: true
        })
        req.validated = value;
        next();
    } catch (error) {
        const details = error.details ? error.details.map(d => ({ message: d.message, path: d.path })) : [{ message: error.message }]
        return res.status(400).json({ ok: false, errors: details })
    }
}