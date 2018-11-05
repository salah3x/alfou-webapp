let functions = require('firebase-functions');

/**
 * This endpoint get triggered whenever a new message arrived in the mail box.
 * It stores the message in the database as a new message or as a reply to
 * an ongoing conversation depending on the title (if it contains the conversation number)
 */
exports.inbox = functions.https.onRequest((request, response) => {
  console.log('Message received');
  console.log(request);
  response.send('OK');
});

/**
 * This function listen to any new messages get inserted to the database and send it through email
 */
exports.send = functions.firestore.document('/messages/{messageId}').onCreate((snapshot, context) => {
  console.log('New message inserted');
  console.log(snapshot);
  console.log(context);
  response.send('OK');
});
