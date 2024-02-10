'use strict';

const process = require('process');
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');

const provider = new NodeTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'my-service',
  }),
});

const jaegerExporter = new JaegerExporter({
  serviceName: 'my-service',
  // Set JAEGER_ENDPOINT to your Jaeger instance URL
  endpoint: process.env.JAEGER_ENDPOINT,
});

provider.addSpanProcessor(new SimpleSpanProcessor(jaegerExporter));

provider.register();
provider.register();

// Register instrumentations
getNodeAutoInstrumentations().forEach(instrumentation => {
  instrumentation.enable();
});

// Gracefully shut down the SDK on process exit
process.on('SIGTERM', () => {
  provider.shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch((error) => console.log('Error terminating tracing', error))
    .finally(() => process.exit(0));
});
