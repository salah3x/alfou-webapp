const functions = require('firebase-functions');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

/**
 * This endpoint get triggered whenever a new message arrived in the mail box.
 * It stores the message in the database as a new message or as a reply to
 * an ongoing conversation depending on the subject (if it contains the conversation number)
 */
exports.onMessageArrived = functions.https.onRequest((request, response) => {
  console.log('Message received');
  console.log(request.body);
  response.send('OK');
});

/**
 * This function listen to any new email get inserted to the database and send them
 */
exports.onNewEmail = functions.firestore.document('/emails/{id}').onCreate((snapshot, context) => {
  sendEmail(snapshot.data().to, snapshot.data().subject, snapshot.data().body);
  return null;
});

/**
 * This function listen to any new replies get inserted to the database by the app and send them
 */
exports.onNewReply = functions.firestore.document('/messages/{id}').onUpdate((change, context) => {
  const message = change.after.data();
  if (message.replies !== change.before.data().replies) {
    const reply = message.replies.pop();
    if (reply.me) {
      sendEmail(message.from, `[ID#${change.after.id}] ${message.subject}`, reply.body);
    }
  }
  return null;
});

function sendEmail(to, subject, body) {
  const msg = {
    from: 'info@alfou-secunet.com',
    to: to,
    subject: subject,
    // text: body,
    html: body,
  };
  sgMail.send(msg);
  console.log('Email sent :' + msg);
}
