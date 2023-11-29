const db = require("_helpers/db");

module.exports = {
  add,
  getAll
};

async function add(params, origin) {

  // add parfume object
  const parfume = new db.Parfume(params);

  // save account
  await parfume.save();
}
function basicDetails(parfume) {
    const { id, name, company, img } = parfume;
    return { id, name, company, img };
}
async function getAll() {
  const parfume = await db.Parfume.find();
  return parfume.map((x) => basicDetails(x));
}


