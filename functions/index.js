const functions = require('firebase-functions');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

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

/*
const msg = {
  from: 'salah@local.com',
  to: 'salah.loukili@gmail.com',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);
*/
