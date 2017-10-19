const uuid = require('uuid/v4');

const gums = [];

const getAllGums = (req, res, next) => {
  res.json({ data: gums });
}

const getOneGum = (req, res, next) => {
  const id = req.params.id;
  const gum = gums.find(gum => gum.id === id);
  if (!gum) return next({ status: 404, message: `Could not find gum with id of ${id}` });

  res.json({ data: gum });
}

const createGum = (req, res, next) => {
  const { name, brand, flavor, baseElasticity } = req.body;
  if (!name || !brand || !flavor || !baseElasticity) return next({ status: 400, message: `Fields name, brand, flavor, and baseElasticity are required` });

  const gum = { id: uuid(), name, brand, flavor, baseElasticity};
  gums.push(gum);
  res.status(201).json({ data: gum });
}

const updateGumPUT = (req, res, next) => {
  const id = req.params.id;
  const gum = gums.find(gum => gum.id === id);
  if (!gum) return next({ status: 404, message: `Could not find gum with id of ${id}` });

  const { name, brand, flavor, baseElasticity } = req.body;
  if (!name || !brand || !flavor || !baseElasticity) return next({ status: 400, message: `Fields name, brand, flavor, and baseElasticity are required` });

  gum.name = name;
  gum.brand = brand;
  gum.flavor = flavor;
  gum.baseElasticity = baseElasticity;
  res.status(200).json({ data: gum });
}

const updateGumPATCH = (req, res, next) => {
  const id = req.params.id;
  const gum = gums.find(gum => gum.id === id);
  if (!gum) return next({ status: 404, message: `Could not find gum with id of ${id}` });

  const { name, brand, flavor, baseElasticity } = req.body;
  if (!name && !brand && !flavor && !baseElasticity) return next({ status: 400, message: `At least one of the fields of name, brand, flavor, and baseElasticity is required` });

  gum.name = name || gum.name;
  gum.brand = brand || gum.brand;
  gum.flavor = flavor || gum.flavor;
  gum.baseElasticity = baseElasticity || gum.baseElasticity;
  res.status(200).json({ data: gum });
}

const deleteGum = (req, res, next) => {
  const id = req.params.id;
  const gum = gums.find(gum => gum.id === id);
  if (!gum) return next({ status: 404, message: `Could not find gum with id of ${id}` });

  const index = gums.indexOf(gum);
  gums.splice(index, 1);
  res.status(204).json();
}

module.exports = {getAllGums, getOneGum, createGum, updateGumPUT, updateGumPATCH, deleteGum}
