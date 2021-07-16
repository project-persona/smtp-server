module.exports = {
  TLS_KEY: process.env.TLS_KEY || null,
  TLS_CERT: process.env.TLS_CERT || null,
  BROKER_ADDR: process.env.BROKER_ADDR || 'tcp://0.0.0.0:5555'
}
