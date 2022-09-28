const { Router } = require("express");

const UserController = require("./controllers/UserController");
const SearchController = require("./controllers/SearchController");

const routes = Router();

routes.get("/users", UserController.index);
routes.post("/users", UserController.store);
routes.post("/auth", UserController.validate);
routes.post("/edit", UserController.edit);
routes.post("/delete", UserController.delete);

routes.get("/search", SearchController.index);

module.exports = routes;
