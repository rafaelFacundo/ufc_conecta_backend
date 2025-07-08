import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    if (decoded.type !== "student") {
      return res
        .status(403)
        .json({ error: "You do not have permition to access this data" });
    }
    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ error: "invalid token" });
  }
};

export const authenticateEmployer = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    if (decoded.type !== "employer") {
      return res
        .status(403)
        .json({ error: "You do not have permition to access this data" });
    }
    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ error: "invalid token" });
  }
};

export const authenticateAdm = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    if (decoded.type !== "adm") {
      return res
        .status(403)
        .json({ error: "You do not have permition to access this data" });
    }
    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ error: "invalid token" });
  }
};
