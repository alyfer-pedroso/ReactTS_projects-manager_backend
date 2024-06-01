const { CategoriesService } = require("../../services");
const { Sucessful, Error } = require("../../classes");

module.exports = {
  allCategories: async (_req, resp) => {
    try {
      const result = await CategoriesService.allCategories();
      resp.json(new Sucessful(result, "Categorias retornadas com sucesso!"));
    } catch (error) {
      resp.json(new Error(error.message));
    }
  },
};
