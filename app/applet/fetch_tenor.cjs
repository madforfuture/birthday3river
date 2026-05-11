const https = require('https');
https.get('https://tenor.com/view/milk-and-mocha-haha-gif-12499475292157450672', (res) => {
  let data = '';
  res.on('data', (c) => data += c);
  res.on('end', () => {
    const match = data.match(/https:\/\/media\.tenor\.com\/[^\"]+\.gif/);
    console.log(match ? match[0] : 'Not found');
  });
});
