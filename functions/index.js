const functions = require("firebase-functions")
const admin = require("firebase-admin")
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.deleteExpiredDocuments = functions.https.onRequest((req, res) => {
  const currentDate = Date.now()
  const cutoff = currentDate - 604800000
  return admin
    .firestore()
    .collection("cards")
    .where("unix_timestamp", "<", cutoff)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.delete()
      })
      return console.log("DOCUMENT REMOVED")
    })
})

