const configs = {
  db: {
    host: '10.20.0.3',
    password: 'example',
  },
  web: {
    url: 'http://localhost',
    port: 8000
  }
}

const globalConfig = {
  JWT_TOKEN: "BitsAmericas"
}

module.exports = { ...globalConfig, configs }