const {
  postUser,
  getUser,
  loginUser,
  loginDashboard,
} = require("../controllers/userControllers");


//************* Create User ***************/
const postUserHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await postUser(email, password);
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


//*********** Dashboard **************/
const LoginDashboardHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await loginDashboard(email, password);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get user 
const getUserHandler = async (req, res) => {
  const { id, role } = req.user;
  try {
    if (id) {
      const response = await getUser(id);
      res.status(200).json({ response, role });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};




module.exports = {
  postUserHandler,
  getUserHandler,
  LoginHandler,
  LoginDashboardHandler,
};
