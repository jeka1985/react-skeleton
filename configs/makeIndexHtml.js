var fs = require('fs'),
    path = require('path'),
    bundle = require('../dist/node.js');

bundle.App.loadDeps()
  .then(() => {
    fs.writeFileSync(path.resolve(__dirname, '../dist/index.html'), bundle.App.render({}))
  });