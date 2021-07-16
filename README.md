# @persona/smtp-server

the receive-only email server for Persona project

*Note: this is NOT a microservice. Multiple deployment on the same host will cause errors. No, this one doesn't scale.*

## Configuration

Optional environment variables:

| Key           | Type   | Description                                                             | Default              |
|---------------|--------|-------------------------------------------------------------------------|----------------------|
| `TLS_KEY`     | string | path on local file system to TLS private keys in PEM format             | null                 |   
| `TLS_CERT`    | string | path on local file system to a TLS certificate chains in  in PEM format | null                 |
| `BROKER_ADDR` | string | the ZMQ address for broker to listen and for clients/workers to connect | `tcp://0.0.0.0:5555` |

When both `TLS_KEY` and `TLS_CERT` are provided, the server will upgrade to secure connections upon `STARTTLS` commands.

## Usage

You simply:

```
$ npm install
$ npm start
```
