const { postView, getViews } = require("../controllers/viewsControllers");

const postViewsHandler = async (req, res) => {
  const { ip } = req.params;
  try {
    const response = await postView(ip);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getViewsHandler = async (req, res) => {
  const { role } = req.user;
  try {
    if (role === "admin") {
      const response = await getViews();
      res.status(200).json(response);
    } else {
      return res.status(403).send("you are not admin");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postViewsHandler,
  getViewsHandler,
};
