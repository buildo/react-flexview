module.exports = function(url) {
  return {
    file: url.replace(/~/g, 'node_modules/')
  };
};
