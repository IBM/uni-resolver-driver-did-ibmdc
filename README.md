# Driver-DID-IBMDC

This is an Universal Resolver driver for did:idc identifiers.

## Specifications

-   [Decentralized Identifiers](https://w3c.github.io/did-core/)

## Example DIDs

```
did:idc:XgT9HxXqWsHCEd5wps268U
did:idc:XgT9HxXqWsHCEd5wps268U:prod
```

## Example request:

curl -X GET http://127.0.0.1:8080/1.0/identifiers/did:idc:XgT9HxXqWsHCEd5wps268U

## Development

1. Install dependencies

    ```bash
    npm install
    ```

2. Run application in development mode

    ```bash
    npm run dev
    ```

## Testing

### Unit Tests

To run tests in watch mode:

```bash
npm run test:watch
```

To run tests with coverage:

```
npm test
```

## Environment Configuration

Built on [node-config](https://github.com/lorenwest/node-config), `config` is used to provide environment specific configuration for our services. Configuration files can be found in the `config` directory.

Configuration is loaded in the default order as specificed by [node-config](https://github.com/lorenwest/node-config/wiki/Configuration-Files)

```
default.json
default-{instance}.json
{deployment}.json
{deployment}-{instance}.json
local.json
local-{instance}.json
```

Where:

-   {instance} is an optional instance name string for Multi-Instance Deployments, set by the env var `NODE_APP_INSTANCE`
-   {deployment} is the deployment name, from the `NODE_ENV` (or if specified `NODE_CONFIG_ENV`).

Configuration can be set through `process.env` or in your `.env` file will also be available in `config`. Nested configuration will be identified via `__`.

```json
// configs/default.json
{
    "NODE_ENV": "dev"
}
```

```json
// configs/prod.json
{
    "NODE_ENV": "prod"
}
```

```js
// server.js
const config = require('./utils/config');

console.log(config.NODE_ENV);
console.log(config.LOGGER.LEVEL);
```

```bash
$ node server.js
dev
debug

$ NODE_ENV=prod node server.js
prod
info

$ NODE_ENV=prod LOGGER__LEVEL=error node server.js
prod
error
```

## Build and Run (Docker)

```
docker build -f ./Dockerfile . -t ibmcom/uni-resolver-driver-did-ibmdc
docker run -p 8080:3000 ibmcom/uni-resolver-driver-did-ibmdc

```
