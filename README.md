


yarn add express -s

yarn add @opentelemetry/sdk-trace-web -s


yarn add  @opentelemetry/api  @opentelemetry/sdk-node @opentelemetry/auto-instrumentations-node -s

yarn add @opentelemetry/exporter-jaeger -s

node -r ./tracing.js app.js

node -r tracing.js app.js



setx JAEGER_ENDPOINT "http://localhost:14268/api/traces"

echo %JAEGER_ENDPOINT%

## windows 

node -r .\tracing.js app.js

## linux 

node -r ./tracing.js app.js


https://github.com/open-telemetry/opentelemetry-js

