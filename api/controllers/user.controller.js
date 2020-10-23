const getUsers = (request, response) => {
  response.send("Endpoint get users");
};
  
const saveUser = (request, response) => {
  response.send("Endpoint post users");
};
  
const updateUser = (request, response) => {
  let id = request.params.id;
  response.send("Endpoint put users" + id);
};
  
const deleteUser = (request, response) => {
  response.send("Endpoint delete users");
};
  
module.exports = { getUsers, saveUser, updateUser, deleteUser };