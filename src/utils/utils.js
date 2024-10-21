
import bcrypt from "bcrypt";

const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const isValidPassword = (password, user) => {
  console.log("Esta es la userpass " + user.password);
  return bcrypt.compareSync(password, user.password);
};

// compareSync compara los passwords, retorna true o false según corresponda
export { createHash, isValidPassword };
