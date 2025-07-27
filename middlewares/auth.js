import jwt from "jsonwebtoken";
import RefreshToken from "../models/RefreshToken.js";

export const authenticateStudent = (req, res, next) => {
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

export const authenticateStudentOrEmployer = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    if (!(decoded.type === "student" || decoded.type === "employer")) {
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

export const authenticateRefreshToken = async (req, res, next) => {
  console.log(
    "KJKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK"
  );
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("TOKENNN", token);
  if (!token) {
    return res.sendStatus(401);
  }
  let refreshToken;
  try {
    refreshToken = await RefreshToken.findOne({
      hash: token,
      isValid: true,
    });
    console.log(refreshToken);
    if (!refreshToken) {
      return res.sendStatus(401);
    }

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    refreshToken.isValid = false;
    await refreshToken.save();
    return res.status(403).json({ error: "invalid token" });
  }
};
