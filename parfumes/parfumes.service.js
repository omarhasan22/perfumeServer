const db = require("_helpers/db");

module.exports = {
  add,
  getAll,
  getById,
  getAllTypes
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
  const parfume = await db.Parfume.find();
  return parfume.map((x) => basicDetails(x));
}

async function getById(id) {
  const perfume = await db.Parfume.findById(id);
  return basicDetails(perfume);
}

async function getAllTypes() {
  console.log("from getAlltypes")
  const perfume = await db.Parfume.find();
  return perfume.map((x) => basicDetails(x));
}

