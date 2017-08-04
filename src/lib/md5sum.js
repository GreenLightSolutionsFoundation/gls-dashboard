const crypto = require('crypto');

export default function md5sum(str) {
  const hash = crypto.createHash('md5');
  hash.update(str, 'utf8');
  return hash.digest('hex');
}
