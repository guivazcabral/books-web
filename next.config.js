require('dotenv').config()
const withSass = require('@zeit/next-sass')
module.exports = withSass({
  env: {
    API_URL: process.env.API_URL,
  }
})
