const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

/**
 * This endpoint get triggered whenever a new message arrived in the mail box.
 * It stores the message in the database as a new message or as a reply to
 * an ongoing conversation depending on the subject (if it contains the conversation number)
 */
exports.onMessageArrived = functions.https.onRequest((request, response) => {
  console.log('Message received' + request.body);
  response.send('OK');
});

/**
 * This function listen to any new email get inserted to the database and send them
 */
exports.onNewEmail = functions.firestore.document('emails/{id}').onCreate((snapshot) => {
  const msg = {
    from: 'info@async.zone',
    to: snapshot.data().to,
    subject: snapshot.data().subject,
    html: snapshot.data().body.replace(/\n/g, '<br/>')
  };
  return sgMail.send(msg)
    .then(() => console.log('Email sent to ' + msg.to))
    .then(() => admin.firestore().collection('/emails').doc(snapshot.id).update({delivered: true}))
    .catch(console.error);
});

/**
 * This function listen to any new replies get inserted to the database by the app and send them
 */
exports.onNewReply = functions.firestore.document('messages/{idM}/{repliesId}/{idR}').onCreate((snapshot, context) => {
  if (context.params.repliesId === 'replies' && snapshot.data().me) {
    return snapshot.ref.parent.parent.get()
      .then(value => {
        return {
          from: 'info@async.zone',
          to: value.data().from,
          subject: `[ID#${context.params.idM}]: ${value.data().subject}`,
          html: snapshot.data().body.replace(/\n/g, '<br/>')
        }
      })
      .then(msg => {
        return [sgMail.send(msg), msg];
      })
      .then((result) => {
        console.log(`Reply sent to ${result[1].to}`);
        return result[0];
      })
      .then(() => admin.firestore()
        .collection(`/messages/${context.params.idM}/replies`)
        .doc(snapshot.id)
        .update({delivered: true}))
      .catch(error => console.error(error.response));
  }
  return Promise.resolve('');
});

