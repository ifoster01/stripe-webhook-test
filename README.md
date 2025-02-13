# Build a webhook endpoint

Build a simple webhook endpoint to listen to events from Stripe. Included are some basic build and run scripts you can use to start up the application.

## Running the sample

1. Build the server

~~~
npm install
~~~

2. Run the server

~~~
npm start
~~~

## Testing the webhook

The easiest way to test your webhook locally is with the Stripe CLI. Download [the CLI](https://github.com/stripe/stripe-cli) and log in with your Stripe account. Alternatively, use a service like ngrok to make your local endpoint publicly accessible.

Set up event forwarding with the CLI to send all Stripe events in test mode to your local webhook endpoint.

~~~
stripe listen --forward-to localhost:4242/webhook
~~~

Make sure to copy the webhook secret (whsec_...) provided by the CLI and paste it in your .env file.

Use the CLI to simulate specific events that test your webhook application logic by sending a POST request to your webhook endpoint with a mocked Stripe event object.

~~~
stripe trigger customer.subscription.updated
~~~

## Live deployment

Obtain the stripe webhook signing secret from the [stripe webhooks dashboard](https://dashboard.stripe.com/test/workbench/webhooks) by selecting the desired webhook and clicking on the "Reveal" button (found under the Destination details).

Set it in the .env file and configure the environment variable in your hosting provider.