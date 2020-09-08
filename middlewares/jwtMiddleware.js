const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/index");

exports.checkJWT = (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }

  try {
    const { id } = jwt.verify(token, JWT_KEY);
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }
};
