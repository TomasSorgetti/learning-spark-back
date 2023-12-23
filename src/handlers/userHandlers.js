const {
  postUser,
  getUser,
  loginUser,
  loginDashboard,
  changeUserRole,
  deleteUser,
  searchUserByEmail,
  getUsersOrdered,
} = require("../controllers/userControllers");

//************* Create User ***************/
const postUserHandler = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const response = await postUser(name, email, password);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//************* Login User ***************/
const LoginHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await loginUser(email, password);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//*********** Login Dashboard **************/
const LoginDashboardHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await loginDashboard(email, password);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//************* Create User Dashboard ***************/
const postUserDashboardHandler = async (req, res) => {
  const { name,email, password } = req.body;
  try {
    const response = await postUser(name, email, password);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//************** Get User *****************//
const getUserHandler = async (req, res) => {
  const { id, role } = req.user;
  try {
    if (id) {
      const response = await getUser(id);
      res.status(200).json({ response, role });
    } else {
      return res.status(403).send("you are not admin");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getUserByEmailHandler = async (req, res) => {
  const { role } = req.user;
  const {partialEmail} = req.query
  try {
    if (role==="admin") {
      const response = await searchUserByEmail(partialEmail);
      res.status(200).json({ response });
    }
    else {
      return res.status(400).send("you are not admin");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getUserOrderedHandler = async (req, res) => {
  const { role } = req.user;
  const { order, direction } = req.query;
  try {
    if (role === "admin") {
      const response = await getUsersOrdered(order, direction);
      res.status(200).json({ response });
    } else {
      return res.status(403).send("you are not admin");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//************** User Role Change *****************//
const changeUserRoleHandler = async (req, res) => {
  const { role } = req.user;
  const { userId, userRole } = req.body

  try {
    if (role === "admin") {
      const response = await changeUserRole(userId, userRole);
      return res.status(200).json(response);
    } else {
      return res.status(400).json({error:"you are not admin"});
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//************** Delete User *****************//
const deleteUserHandler = async (req, res) => {
  const { role } = req.user;
  const { userId } = req.params;
  const { deleted } = req.body;
//deleted is true or false, true to delete, false to restore
  try {
    if (role === "admin") {
      await deleteUser(userId, deleted);
      return res.status(200).json({msg:"userDeleted"});
    } else {
      return res.status(400).json({ error: "you are not admin" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


module.exports = {
  postUserHandler,
  getUserHandler,
  LoginHandler,
  LoginDashboardHandler,
  changeUserRoleHandler,
  deleteUserHandler,
  getUserByEmailHandler,
  getUserOrderedHandler,
};
