# OTel Javascript New Relic Starter

This is a simple Express.js application that demonstrates how to create, delete, and fetch all posts. It also serves a web app from the server using the built-in `express.static` middleware.

## Getting Started

Follow these steps to set up the project on your local machine.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your system.

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/otel-javascript-new-relic-starter.git
```

2. Change into the project directory:
```bash
cd otel-javascript-new-relic-starter
```

3. Install the dependencies:
```bash
npm install
```


## Usage

To start the Express server, run:
```
npm start
```


The web app will be served at `http://localhost:3000/`. You can access the API endpoints for creating, deleting, and fetching all posts at `http://localhost:3000/api/posts`.


## API Endpoints

The Express application provides three API endpoints related to managing posts:

1. **Fetch all posts** (`GET /api/posts`):
   
    Returns a JSON array of all existing posts.

2. **Create a new post** (`POST /api/posts`): 

    Creates a new post with a provided `title` and `content`. Returns the created post with its unique ID as a JSON object.

    Example JSON payload:
    ```json
    {
      "title": "My first post",
      "content": "Hello world!"
    }
    ```

3. **Delete a post by ID** (`DELETE /api/posts/:id`): 

    Deletes a post by its unique ID. Responds with a `204 No Content` status code.


## OpenTelemetry Tracing
This project uses OpenTelemetry to instrument and collect trace data from the Express server. The trace data is sent to an OTLP collector using the @opentelemetry/exporter-trace-otlp-proto package.

### Configuration
The tracing.js file contains the configuration for OpenTelemetry tracing. The OTLPTraceExporter is configured to send spans to New Relic using the [New Relic collector endpoint URL](https://docs.newrelic.com/docs/more-integrations/open-source-telemetry-integrations/opentelemetry/get-started/opentelemetry-set-up-your-app/#review-settings) and [API key]((https://docs.newrelic.com/docs/apis/intro-apis/new-relic-api-keys/#overview-keys)). You can update the configuration object as needed if you wish to.

```javascript
const otlpExporter = new OTLPTraceExporter({
  url: "https://{{NEWRELIC_OTEL_COLLECTOR_ENDPOINT}}:4318/v1/traces",
  headers: {
    "api-key": "{{NEWRELIC_API_KEY}}",
  },
  concurrencyLimit: 10,
});
```
Repalce the `{{NEWRELIC_OTEL_COLLECTOR_ENDPOINT}}` value in the url with appropriate New Relic OTLP collector endpoint for your region (US or EU).
Replace the `{{NEWRELIC_API_KEY}}` value in the headers object with your own New Relic API key.

The Express and HTTP instrumentations are also configured in the tracing.js file:

```javascript
registerInstrumentations({
  instrumentations: [new ExpressInstrumentation(), new HttpInstrumentation()],
});
```
To add more instrumentations or modify the existing ones, update the instrumentations array as needed.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

   