const roleCheck = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res
        .status(403)
        .json({ message: `Access denied for ${req.user.role}` });
    }
    next();
  };
};

module.exports = roleCheck;
