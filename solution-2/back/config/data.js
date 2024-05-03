const dotenv = require('dotenv');

dotenv.config();

const env = {
    token: process.env.TOKEN,
}

module.exports = { env };