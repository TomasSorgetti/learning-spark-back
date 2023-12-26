const { subject } = require("../db");

const createSubjects = async (req, res, next) => {
  try {
    const allSubjects = [
      "mathematics aa",
      "mathematics ai",
      "history",
      "tok",
      "economics",
      "biology",
      "environmental systems",
      "business",
      "chemistry",
      "physics",
      "sports",
      "english",
      "spanish",
      "french",
      "art",
      "extended essay",
    ];
      const findSubjects = await subject.findAll();
    if (findSubjects.length === 0) {
        allSubjects.map(async (subj) => {
        await subject.create({ subj });
      });
    }
    next();
  } catch (error) {
    console.error("Error in middleware creacteSubjects:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = createSubjects;
