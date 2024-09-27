import bcrypt from "bcrypt";

const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const isValidPassword = (password, user) =>
  bcrypt.compareSync(password, user.password);

// comparesync compara los password, retorna true o false segun corresponda

export { createHash, isValidPassword };
