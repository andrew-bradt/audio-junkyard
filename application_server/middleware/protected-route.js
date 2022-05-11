require('dotenv').config();
const key = process.env.PROTECTED_ROUTE_KEY;

const privateRoute = (req, res, next) => {
  if (req.body.key !== key) {
    return res.status(403).json({error: 'you do not have access to this resource'});
  }
  next();
};

module.exports = privateRoute;