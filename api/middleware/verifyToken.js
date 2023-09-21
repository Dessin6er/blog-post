const jwt = require("jsonwebtoken");

const verfyToken = (req, res, next) => {
  // console.log(" ha ", req?.cookies?.jwt);
  if (req?.cookies?.jwt === "" || req?.cookies?.jwt === undefined) {
    return res.status(400).json({ error: "unauthorized§!!!!!!!!!!" });
  }
  jwt.verify(
    req?.cookies?.jwt,
    process.env.TOKEN_SECRET,
    {},
    (err, decoded) => {
      if (err) {
        return res.status(403).json({ err: err.message });
      }
      //   return res.status(200).json(decoded);
    }
  );
  next();
};

module.exports = verfyToken;
