const { views } = require("../db");

const postView = async (ip) => {
    const existIp = await views.findOne({ where: { ip } })
    if (existIp) throw new Error("ip already exist")
    else {
        return await views.create({ip})
    }
}


const getViews = async () => {
  const res = await views.findAll()
  return res.length
};




module.exports = {
  postView,
  getViews,
};