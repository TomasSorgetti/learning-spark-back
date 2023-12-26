const { getAllSubjects } = require("../controllers/subjectsControllers");

const subjectHandler = async (req, res) => {
  try {
    const response = await getAllSubjects();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  subjectHandler,
};
