const { UserService } = require("../../services");
const { Sucessful, Error } = require("../../classes");
const { encrypt } = require("../../functions/crypt");

module.exports = {
  register: async (req, resp) => {
    const { username, password } = req.body;
    try {
      if (!username || !password) return resp.json(new Error("Preencha todos os campos!"));

      const exist = await UserService.findByUsername(username);
      if (exist.length > 0) return resp.json(new Error("Esse username já existe!"));

      const encrypted = encrypt(password);
      await UserService.register(username, encrypted.data, encrypted.iv);
      resp.json(new Sucessful({ username, password }, "Usuário cadastrado com sucesso!"));
    } catch (error) {
      resp.json(new Error(error.message));
    }
  },

  login: async (req, resp) => {
    const { username, password } = req.body;
    try {
      if (!username || !password) return resp.json(new Error("Preencha todos os campos!"));

      const user = await UserService.findByUsername(username);
      if (user.length > 0) {
        const result = await UserService.login(username, encrypt(password, user[0]?.iv).data);
        if (result.length > 0) return resp.json(new Sucessful({ user: result[0].username }, "Login efetuado com sucesso!"));
      }

      resp.json(new Error("Usuário ou senha inválidos!"));
    } catch (error) {
      resp.json(new Error(error.message));
    }
  },
};
