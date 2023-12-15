const { user } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { ADMIN_PASSWORD, ADMIN_EMAIL, SECRET } = process.env;

//**************** Login *****************//

const loginUser = async (email, password) => {
  const userVerification = await user.findOne({ where: { email } });
  if (userVerification) {
    const match = await bcrypt.compare(password, userVerification.password);
    if (match) {
      const token = jwt.sign(
        { id: userVerification.id, role: userVerification.role },
        SECRET,
        {
          expiresIn: "1y",
        }
      );
      // const refresh = await refreshToken(userVerification.id);
      return { token, id: userVerification.id, role: userVerification.role };
    }
    throw new Error("wrong password");
  }
  throw new Error("user doesn´t exist");
};

//******************* Login Dashboard *********************/
const loginDashboard = async (email, password) => {
  const userVerification = await user.findOne({ where: { email } });
  if (userVerification) {
    const match = await bcrypt.compare(password, userVerification.password);
    if (match) {
      const token = jwt.sign(
        { id: userVerification.id, role: userVerification.role },
        SECRET,
        {
          expiresIn: "1y",
        }
      );

      if (userVerification.role === "admin") {
        return { token, id: userVerification.id, role: userVerification.role };
      }
      throw new Error ("you dont have access to dashboard")
    }
    throw new Error("wrong password");
  }
  throw new Error("user doesn´t exist");
};

//**************** Create ****************//
const postUser = async (email, password) => {
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const res = await user.create({ email, password, role: "admin" });
    const { password: userPassword, ...userWithoutPassword } = res.toJSON();
    return userWithoutPassword;
  } 
  const res = await user.create({ email, password });
  const { password: userPassword, ...userWithoutPassword } = res.toJSON();
  return userWithoutPassword;
};

//***************** GET ********************//
const getUser = async (id) => {
  const res = await user.findOne({ where: { id } });
  if (!res) return;
  const { password, role, ...userWithoutSensitiveData } = res.toJSON();

  return userWithoutSensitiveData;
};

module.exports = {
  postUser,
  getUser,
  loginUser,
  loginDashboard,
};
