 module.exports = {
  apps : [{
    name: 'booksweb',
    script: 'yarn',
    args:"start",
    autorestart: true,
    watch: true,
    env: {
      NODE_ENV: 'development',
      API_URL: 'https://books-api.guilhermecabral.net',
      PORT:3001
    },
    env_production: {
      NODE_ENV: 'production',
      API_URL: 'https://books-api.guilhermecabral.net',
      PORT:3001
    }
  }]
};
