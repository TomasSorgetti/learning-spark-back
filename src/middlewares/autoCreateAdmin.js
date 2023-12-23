const { user } = require("../db");
const { ADMIN_NAME,ADMIN_PASSWORD, ADMIN_EMAIL } = process.env;

const createAdmin = async (req, res, next) => {
  const name = ADMIN_NAME;
  const email = ADMIN_EMAIL;
  const password = ADMIN_PASSWORD;

  try {
    const findUser = await user.findOne({ where: { email } });
    if (!findUser) {
      await user.create({ name, email, password, role: "admin" });
    }
    next();
  } catch (error) {
    console.error("Error in middleware createAdmin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = createAdmin;
