export const authorization = (role) => {
    return async (req, res, next) => {
        if (!req.session.user) return res.status(401).send({ status: "Error", message: "Unauthorized" });

        if (req.session.user.role != role)
            return res.status(403).send({ status: "Error", message: "No tienes permisos" });
        next();
    };
};

export const auth = (role) => {
    return async (req, res, next) => {
        if (!req.session.user) return res.status(401).send({ status: "Error", message: "Unauthorized" });

        if (req.session.user.role === role)
            return res.status(403).send({ status: "Error", message: "No tienes permisos" });
        next();
    };
};