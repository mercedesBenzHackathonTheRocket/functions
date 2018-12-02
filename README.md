# Welcome to Rocket's brain!

Azure Functions are heavily used here.


## Development
To start developing the app, you need to install *DotNet Core SDK 2.+ and azure-functions-core-tools

## Running locally
You need to build the extensions first by using the following command:
``` func extensions install```
To run:

```func host start```

## Deployment
Deployment is done by a hook provided by GitHub, but it is possible to deploy with following command:


```func deploy ```