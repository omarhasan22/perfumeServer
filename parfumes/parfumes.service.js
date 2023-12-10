const db = require("_helpers/db");

module.exports = {
  add,
  getAll,
  getAllTypes,
  getById,
  getByType
  
};

async function add(params, origin) {

  // add parfume object
  const parfume = new db.Parfume(params);

  // save account
  await parfume.save();
}

function basicDetails(parfume) {
    const { id, name, company, type, img } = parfume;
    return { id, name, company,type, img };
}

async function getAll() {
  console.log("from getAll")
  const parfume = await db.Parfume.find();
  return parfume.map((x) => basicDetails(x));
}

async function getById(id) {
  const perfume = await db.Parfume.findById(id);
  return basicDetails(perfume);
}

async function getAllTypes() {
  const perfume = await db.Parfume.distinct("type");
  return perfume;
}

async function getByType(type) {
  const perfume = await db.Parfume.find({ type: type });
  return basicDetails(perfume);
}

