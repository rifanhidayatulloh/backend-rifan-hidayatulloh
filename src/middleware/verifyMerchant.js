module.exports = (req, res, next) => {
  if (req.user.role !== "merchant") {
    return res.status(403).send("Access denied. Only merchants can access this resource.");
  }
  next();
};
