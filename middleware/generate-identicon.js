const md5 = require('md5');
const Identicon = require('identicon.js');

function generateIdenticon(req, res, next) {
  if (req.user) {
    const hash = md5(req.user.email);
    const imageData = new Identicon(hash, {
      size: 32,
      background: [0, 0, 0, 15],
      saturation: 0.35,
    });
    req.user.image = `data:image/png;base64,${imageData}`;
  }
  next();
}

module.exports = generateIdenticon;
