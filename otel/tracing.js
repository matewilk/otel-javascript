const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const {
  BasicTracerProvider,
  ConsoleSpanExporter,
  SimpleSpanProcessor,
  BatchSpanProcessor,
} = require("@opentelemetry/sdk-trace-base");
const { Resource } = require("@opentelemetry/resources");
const {
  SemanticResourceAttributes,
} = require("@opentelemetry/semantic-conventions");
const {
  OTLPTraceExporter,
} = require("@opentelemetry/exporter-trace-otlp-proto");
const {
  ExpressInstrumentation,
} = require("@opentelemetry/instrumentation-express");
const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");

const setupTracing = () => {
  const provider = new BasicTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]:
        "otel-javascript-new-relic-starter",
    }),
  });

  // Configure the ConsoleSpanExporter to print spans to the console
  const consoleExporter = new ConsoleSpanExporter();
  const consoleProcessor = new SimpleSpanProcessor(consoleExporter);
  provider.addSpanProcessor(consoleProcessor);

  // Configure the OTLPTraceExporter to send spans to an OTLP collector
  const otlpExporter = new OTLPTraceExporter({
    url: "https://{{NEWRELIC_OTEL_COLLECTOR_ENDPOINT}}:4318/v1/traces",
    headers: {
      "api-key": "{{NEWRELIC_API_KEY}}",
    },
    concurrencyLimit: 10,
  });
  const batchProcessor = new BatchSpanProcessor(otlpExporter);
  provider.addSpanProcessor(batchProcessor);

  provider.register();

  registerInstrumentations({
    instrumentations: [new ExpressInstrumentation(), new HttpInstrumentation()],
  });

  return provider.getTracer("otel-javascript-new-relic-starter");
};

module.exports = setupTracing;
