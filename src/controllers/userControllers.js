const { user } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { Op } = require("sequelize");
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
      return { token };
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
        return { token };
      }
      throw new Error("you dont have access to dashboard");
    }
    throw new Error("wrong password");
  }
  throw new Error("user doesn´t exist");
};

//**************** Create User ****************//
const postUser = async (name, email, password) => {
  const res = await user.create({ name, email, password });
  const { password: userPassword, ...userWithoutPassword } = res.toJSON();
  return userWithoutPassword;
};

//***************** Get User ********************//
const getUser = async (id) => {
  const res = await user.findOne({ where: { id, deleted: false } });
  if (!res) return;
  const { password, role, ...userWithoutSensitiveData } = res.toJSON();

  return userWithoutSensitiveData;
};

//***************** Get User by Email ********************//
const searchUserByEmail = async (partialEmail) => {
  const lowerPartialEmail = partialEmail.toLowerCase();
  const res = await user.findAll({
    where: { email: { [Op.startsWith]: lowerPartialEmail } },
  });
  const users = res.filter((user)=>user.email !== ADMIN_EMAIL)
  if (!res) return;
  const usersWithoutSensitiveData = users.map((user) => {
    const { password, ...userWithoutSensitiveData } = user.toJSON();
    return userWithoutSensitiveData;
  });
  return usersWithoutSensitiveData;
};

//***************** Get Users Ordered ********************//
const getUsersOrdered = async (order, direction) => {
  if (order === "date") {
    let users = await user.findAll();
    users = users.filter((user) => user.email !== ADMIN_EMAIL);
    if (!users || users.length === 0) {
      return [];
    }
    const usersWithoutSensitiveData = users.map((user) => {
      const { password, role, ...userWithoutSensitiveData } = user.toJSON();
      return userWithoutSensitiveData;
    });
    if (direction === "asc") {
      return usersWithoutSensitiveData.sort((a, b) => {
        if (a.createdAt < b.createdAt) return -1;
        if (a.createdAt > b.createdAt) return 1;
        return 0;
      });
    } else if (direction === "desc") {
      return usersWithoutSensitiveData.sort((a, b) => {
        if (a.createdAt < b.createdAt) return 1;
        if (a.createdAt > b.createdAt) return -1;
        return 0;
      });
    }
  } else if (order === "email") {
    let users = await user.findAll();
    users = users.filter((user) => user.email !== ADMIN_EMAIL);
    if (!users || users.length === 0) {
      return [];
    }
    const usersWithoutSensitiveData = users.map((user) => {
      const { password, role, ...userWithoutSensitiveData } = user.toJSON();
      return userWithoutSensitiveData;
    });
    if (direction === "asc") {
      return usersWithoutSensitiveData.sort((a, b) => {
        if (a.email < b.email) return -1;
        if (a.email > b.email) return 1;
        return 0;
      });
    } else if (direction === "desc") {
      return usersWithoutSensitiveData.sort((a, b) => {
        if (a.email < b.email) return 1;
        if (a.email > b.email) return -1;
        return 0;
      });
    }
  } else if (order === "all") {
    let users = await user.findAll();
    users = users.filter((user) => user.email !== ADMIN_EMAIL);
    if (!users || users.length === 0) {
      return [];
    }
    const usersWithoutSensitiveData = users.map((user) => {
      const { password, ...userWithoutSensitiveData } = user.toJSON();
      return userWithoutSensitiveData;
    });
    if (direction === "asc") {
      return usersWithoutSensitiveData.sort((a, b) => {
        if (a.email < b.email) return -1;
        if (a.email > b.email) return 1;
        return 0;
      });
    } else if (direction === "desc") {
      return usersWithoutSensitiveData.sort((a, b) => {
        if (a.email < b.email) return 1;
        if (a.email > b.email) return -1;
        return 0;
      });
    }
  } else if (order === "admin") {
    let users = await user.findAll({ where: { role: "admin" } });
    users = users.filter((user) => user.email !== ADMIN_EMAIL);
    if (!users || users.length === 0) {
      return [];
    }
    const usersWithoutSensitiveData = users.map((user) => {
      const { password, ...userWithoutSensitiveData } = user.toJSON();
      return userWithoutSensitiveData;
    });
    if (direction === "asc") {
      return usersWithoutSensitiveData.sort((a, b) => {
        if (a.email < b.email) return -1;
        if (a.email > b.email) return 1;
        return 0;
      });
    } else if (direction === "desc") {
      return usersWithoutSensitiveData.sort((a, b) => {
        if (a.email < b.email) return 1;
        if (a.email > b.email) return -1;
        return 0;
      });
    }
  }
};

//***************** Change User Role ********************//
const changeUserRole = async (userId, userRole) => {
  const userFind = await user.findOne({ where: { id: userId } });
  if (!userFind) {
    throw new Error("User do not exist");
  }
  if (userFind.email === ADMIN_EMAIL) {
    throw new Error("This user can not be changed");
  }
  userFind.role = userRole || userFind.role;
  return await userFind.save();
};

//***************** Delete User ********************//
const deleteUser = async (userId, deleted) => {
  await user.update({ deleted }, { where: { id: userId } });
};

module.exports = {
  postUser,
  getUser,
  loginUser,
  loginDashboard,
  changeUserRole,
  deleteUser,
  searchUserByEmail,
  getUsersOrdered,
};
