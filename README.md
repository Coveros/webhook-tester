# webhook-tester

Docker image that listens to and logs requests. Useful for testing webhooks.

## Overview

This image is intended to be used as a simple endpoint to check webhook functionality. It is used to test and 
verify events causing webhooks to be fired and to review the data sent in the request body. It runs a basic Node.js Express
application that listens to and logs requests. Currently, it responds to two routes: 

1. GET /healthcheck
    * This will return a 200 OK response
2. POST /json-hook
    * This will output the JSON request body and headers, and return a 200 OK response

All other requests will be logged and return a 404 Not Found response.

## How to use this image

### Run the image
By default, the Node.js application in the image listens on port 8080. Map this port to a host
port using `-p`.

```
$ docker run --name webhook-tester -p 8080:8080 coveros/webhook-tester 
```

### Monitoring the requests

If running the image in the foreground, the logged requests will display as they occur. Alternatively, run the image
in detached mode, and follow the logs.

```
$ docker logs -f CONTAINER
```

Where `CONTAINER` is either the container ID or the container name (In the example above, it was defined using the 
`--name` argument)

### Make requests

Requests can be made any number of ways, either from the command-line or from an external tool.
```
$ curl -d '{"test": "123"}' -H "Content-Type: application/json" -X POST http://localhost:8080/json-hook
```

Example log output
```
$ docker logs -f webhook-tester

Listening on 8080
POST /json-hook request received at 1570827503221
Webhook Request Body:
{
  "test": "123"
}
Webhook Request Headers:
{
  "connection": "keep-alive",
  "content-length": "0"
}
```

### Configure the Port
The container port is configurable with an environment variable setting. There is no need to change this from the 
default `8080`, but by setting the `PORT` environment variable, you can define the port on which the Node.js application 
listens. Changing this value necessitates updating the port mapping configuration.

```
$ docker run --rm -e PORT=3000 -p 8080:3000 --name webhook-tester coveros/webhook-tester
```
