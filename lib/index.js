const fs = require('fs').promises

const { SMTPServer } = require('smtp-server')
const { simpleParser } = require('mailparser')

const { RpcClient } = require('@persona/infra/service-broker')

const { TLS_KEY, TLS_CERT, BROKER_ADDR } = require('./config')

let tlsKey, tlsCert

const client = RpcClient.create(BROKER_ADDR, { type: 'system' })
;(async () => {
  if (TLS_KEY && TLS_CERT) {
    tlsKey = await fs.readFile(TLS_KEY)
    tlsCert = await fs.readFile(TLS_CERT)
  }

  new SMTPServer({
    secure: false, // keep this to false so we can still fallback to plaintext
    key: tlsKey,
    cert: tlsCert,
    onData (stream, session, callback) {
      simpleParser(stream, session)
        .then(parsed => {
          const email = {
            from: parsed.from.value,
            to: parsed.to.value,
            date: parsed.date,
            subject: parsed.subject,
            content: parsed.html || parsed.textAsHtml
          }
          console.log('Received email: ')
          console.log(email)
          return client.emails.create(email)
        })
        .then(() => callback(null))
        .catch(err => {
          console.error(err)
          callback(err)
        })
    },
    disabledCommands: ['AUTH'],
    logger: true
  }).listen(25) // requires root on Unix!
})()
