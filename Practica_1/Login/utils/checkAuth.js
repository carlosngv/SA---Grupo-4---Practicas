const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const bearerToken = req.headers['authorization'];
    //console.log(bearerToken)
    if (!bearerToken) {
      global.log.error('Token Not Available');
      return res.status(403).json({"success": false, "message": "Access denied."});
    }
    
    const token = bearerToken.split(' ')[1];

    jwt.verify(token, process.env.SECRET, (error, authData) => {
      if (error) {
        global.log.error(error);
        return res.status(403).json({"success": false, "message": error});
      } else {
        req.user = authData;
        global.log.info('Token Available');
      }
    });

    // console.log(req.user)
    next();
  } catch (error) {
    global.log.error(error);
    res.status(400).json({"success": false, "message": "Invalid token"})
  }
};
