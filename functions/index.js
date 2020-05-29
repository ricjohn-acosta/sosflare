const functions = require("firebase-functions")
const admin = require("firebase-admin")
admin.initializeApp()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

async function validBearer(req) {
  const key = functions.config().secret.key
  const authorization = req.get("Authorization")
  const split = authorization ? authorization.split("Bearer ") : []
  const bearerKey = split && split.length >= 2 ? split[1] : undefined
  return key === bearerKey
}

exports.deleteExpiredDocuments = functions.https.onRequest(async (req, res) => {
  const currentDate = Date.now()
  const cutoff = currentDate - 604800000
  const isValidBearer = await validBearer(req)

  if (isValidBearer) {
    return admin
      .firestore()
      .collection("cards")
      .where("unix_time", "<", cutoff)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.delete()
        })
        return console.log(res)
      })
  } else {
    res.status(400).json({
      error: "Not authorized",
    })
    return null
  }
})
