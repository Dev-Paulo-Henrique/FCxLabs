const User = require('../models/User');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(request, response) {
    // const { info } = request.query;
  
    // const infoArray = parseStringAsArray(info);

    const users = await User.find({
      // info: {
      //   $in: infoArray,
      // },
    });

    return response.json({ users });
  }
}