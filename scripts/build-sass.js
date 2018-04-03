const path = require('path');
const fs = require('fs');
const sass = require('node-sass');

sass.render(
  {
    file: path.resolve('theme', 'mystyles.scss'),
  },
  function (err, result) {
    if (err) throw err;
    const filePath = path.resolve('public', 'css', 'bulma.css');
    fs.writeFile(filePath, result.css, 'utf8', function (error) {
      if (error) throw error;
    });
  },
);
