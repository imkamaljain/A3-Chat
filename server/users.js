const users = []; 
/**
 * method used to add user
 * @param {object} param user object consisting of id, name & room
 * @returns NA
 */
const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();
  const existingUser = users.find((user) => user.room === room && user.name === name);
  if(!name || !room) return { error: 'Username and room are required.' };
  if(existingUser) return { error: 'Username is taken.' };
  const user = { id, name, room };
  users.push(user);
  return { user };
}
/**
 * method to remove user
 * @param {string} id id of user to be removed
 * @returns NA
 */
const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if(index !== -1) return users.splice(index, 1)[0];
}
/**
 * method to get user
 * @param {string} id id of user to be retreieved
 * @returns user
 */
const getUser = (id) => users.find((user) => user.id === id);
/**
 * method to get list of users in a room
 * @param {string} room room details
 * @returns Array of users
 */
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };