const db = require("_helpers/db");

module.exports = {
  add,
  getAll,
  getAllTypes,
  getById,
  getByType,
  getByIdA,
 
  
};

async function add(params, origin) {

  // add parfume object
  const parfume = new db.Parfume(params);

  // save account
  await parfume.save();
}




function basicDetails(parfume) {
    const { id, name, company, type,price, img } = parfume;
    return { id, name, company,type, price, img };
}

async function getAll() {
  const parfume = await db.Parfume.find();
  return parfume.map((x) => basicDetails(x));
}

async function getById(id) {
  const perfume = await db.Parfume.findById(id);
  return perfume;
}

async function getByIdA(id) {
  const perfume = await db.Parfume.findById(id);
  return perfume.map((x) => basicDetails(x));
}

async function getAllTypes() {
  const perfume = await db.Parfume.distinct("company");
  return perfume;
}

async function getByType(type) {
  const perfume = await db.Parfume.find({ type: type });
  return perfume.map((x) => basicDetails(x));
}

