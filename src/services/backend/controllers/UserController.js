const User = require('../models/User');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
  async index(request, response) {
    const users = await User.find();

    return response.json(users);
  },
  
  async store(request, response) {
    const { name, email, password, tel, cpf, nameMother, date, insert, update, status, login  } = request.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        password,
        cpf,
        tel,
        date,
        nameMother,
        insert,
        update,
        status,
        login
      })

      const sendSocketMessageTo = findConnections(email)

      sendMessage(sendSocketMessageTo, 'new-user', user);
    }
  
    return response.json(user);
  },

  async validate(request, response){
    const { email, password } = request.body

    const user = await User.findOne({ email })

    if(!user){
      return response.status(400).send({ error: 'User not found' })
    }

    if(password !== user.password){
      return response.status(400).send({ error: 'Invalid password' })
    }

    response.send({ user })
  }
};