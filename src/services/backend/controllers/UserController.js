const User = require("../models/User");
const { findConnections, sendMessage } = require("../websocket");

module.exports = {
  async index(request, response) {
    const users = await User.find();

    return response.json(users);
  },

  async delete(request, response) {
    const { email } = request.body;

    let user = await User.findOne({ email });

    if (user) {
      user = await User.findOneAndDelete({ email });
      return response.status(200).send({ success: "Usuário deletado" });
    }

    if (!user) {
      return response.status(400).send({ error: "Usuário não existe" });
    }

    return response.json(users);
  },

  async edit(request, response) {
    const {
      name,
      email,
      password,
      tel,
      cpf,
      nameMother,
      date,
      update,
      status,
      login,
    } = request.body;

    let user = await User.findOne({ email });

    if (user) {
      user = await User.findOneAndUpdate(
        { email },
        {
          name,
          email,
          password,
          cpf,
          tel,
          date,
          nameMother,
          insert: user.insert,
          update,
          status,
          login,
        }
      );
      return response.status(200).send({ success: "Usuário atualizado" });
    }

    if (!user) {
      return response.status(400).send({ error: "Usuário não existe" });
    }

    return response.json(users);
  },

  async store(request, response) {
    const {
      name,
      email,
      password,
      tel,
      cpf,
      nameMother,
      date,
      insert,
      update,
      status,
      login,
    } = request.body;

    let user = await User.findOne({ email });

    if (user) {
      response.status(400).send({ error: "Usuário já existe" });
    }

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
        login,
      });

      const sendSocketMessageTo = findConnections(email);

      sendMessage(sendSocketMessageTo, "new-user", user);
    }

    return response.json(user);
  },

  async validate(request, response) {
    const { email, password } = request.body;

    const user = await User.findOne({ email });

    if (!user) {
      return response.status(400).send({ error: "Usuário não encontrado" });
    }

    if (password !== user.password) {
      return response.status(400).send({ error: "Senha incorreta" });
    }

    if (user.status !== "ativo") {
      return response.status(400).send({ error: "Usuário não está ativo" });
    }

    response.send({ user });
  },
};
