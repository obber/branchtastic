module.exports = (err) => {
  console.log('caught error. err = ', err);
  throw Error(err);
};
