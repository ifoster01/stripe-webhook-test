// This is your test secret API key.
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// Replace this endpoint secret with your endpoint's unique secret
// If you are testing with the CLI, find the secret by running 'stripe listen'
// If you are using an endpoint defined with the API or dashboard, look in your webhook settings
// at https://dashboard.stripe.com/webhooks
const endpointSecret = process.env.ENDPOINT_SECRET;
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  let event = request.body;

  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = request.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        event,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }
  }

  // Handle the event
  switch (event.type) {
    case 'customer.subscription.updated':
      const subscription = event.data.object;
      console.log(`Subscription for ${subscription.id} was updated!`);

      // TODO: update the subscription in the database
      // THIS IS WHERE YOUR CUSTOM BUSINESS LOGIC SHOULD GO

      break;
    case 'customer.subscription.created':
      const subscriptionCreated = event.data.object;
      console.log(`Subscription for ${subscriptionCreated.id} was created!`);

      // TODO: update the subscription in the database
      // THIS IS WHERE YOUR CUSTOM BUSINESS LOGIC SHOULD GO

      break;
    case 'customer.subscription.deleted':
      const subscriptionDeleted = event.data.object;
      console.log(`Subscription for ${subscriptionDeleted.id} was deleted!`);

      // TODO: update the subscription in the database
      // THIS IS WHERE YOUR CUSTOM BUSINESS LOGIC SHOULD GO

      break;
    case 'customer.subscription.paused':
      const subscriptionPaused = event.data.object;
      console.log(`Subscription for ${subscriptionPaused.id} was paused!`);

      // TODO: update the subscription in the database
      // THIS IS WHERE YOUR CUSTOM BUSINESS LOGIC SHOULD GO

      break;
    case 'customer.subscription.pending_update_applied':
      const subscriptionPendingUpdateApplied = event.data.object;
      console.log(`Subscription for ${subscriptionPendingUpdateApplied.id} was updated!`);

      // TODO: update the subscription in the database
      // THIS IS WHERE YOUR CUSTOM BUSINESS LOGIC SHOULD GO

      break;
    case 'customer.subscription.pending_update_expired':
      const subscriptionPendingUpdateExpired = event.data.object;
      console.log(`Subscription for ${subscriptionPendingUpdateExpired.id} was updated!`);

      // TODO: update the subscription in the database
      // THIS IS WHERE YOUR CUSTOM BUSINESS LOGIC SHOULD GO

      break;
    case 'customer.subscription.resumed':
      const subscriptionResumed = event.data.object;
      console.log(`Subscription for ${subscriptionResumed.id} was resumed!`);

      // TODO: update the subscription in the database
      // THIS IS WHERE YOUR CUSTOM BUSINESS LOGIC SHOULD GO

      break;
    case 'customer.subscription.trial_will_end':
      const subscriptionTrialWillEnd = event.data.object;
      console.log(`Subscription for ${subscriptionTrialWillEnd.id} will end!`);

      // TODO: update the subscription in the database
      // THIS IS WHERE YOUR CUSTOM BUSINESS LOGIC SHOULD GO

      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.sendStatus(200);
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));