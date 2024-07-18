const usersService = require('../services/users.service');

let lastId = 0;

function getUsers(req, res) {
  res.send(usersService.getAll());
}

function getUser(req, res) {
  const id = req.params.id;
  const response = usersService.getOne(id);

  if (response) {
    res.send(response);

    return;
  }

  res.sendStatus(404);
}

function createUser(req, res) {
  const name = req.body.name;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  lastId++;

  const user = {
    id: lastId,
    name,
  };

  usersService.addUser(user);

  res.statusCode = 201;
  res.send(user);
}

function deleteUser(req, res) {
  const id = req.params.id;

  const deletedUser = usersService.getOne(id);

  if (deletedUser) {
    usersService.deleteUser(deletedUser.id);
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
}

function updateUser(req, res) {
  const id = req.params.id;
  const data = req.body;

  const userToUpdate = usersService.getOne(id);
  const index = usersService.getIndexOf(userToUpdate);
  const newUser = { ...userToUpdate, ...data };

  res.send(usersService.updateUser(index, newUser));
}

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  getUser,
};
