const { subject } = require("../db");

const getAllSubjects = async () => {
  const findSubjects = await subject.findAll();

  return findSubjects;
};

module.exports = {
  getAllSubjects,
};
