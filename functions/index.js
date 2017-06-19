const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');

// Import Admin SDK
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

// Get a database reference
const db = admin.database();

function getDisplayName(email) {
  return email.split('@')[0];
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

exports.saveRecipe = functions.database.ref('/recipes/{id}')
  .onWrite(event => {
    if (event.auth.admin) return;

    console.log(event)
    console.log(event.auth.variable.uid)

    event.data.adminRef.update({uid: event.auth.variable.uid});
    const original = event.data.val();
    let listItem = {};
    listItem[event.params.id] = {
      title: original.title,
      uid: event.auth.variable.uid
    };
    dbListRef = db.ref('recipeList');
    dbListRef.update(listItem);
  });

exports.addUserToDB = functions.auth.user()
  .onCreate(event => {
    console.log(event.data)
    // Get the uid of the deleted user.
    var uid = event.data.uid;
    let users = {};
    users[uid] = {
      avatarColor: getRandomColor()
    };

    if (event.data.photoURL) {
      users[uid].photoURL = event.data.photoURL;
    }

    // Remove the user from your Realtime Database's /users node.
    userList = db.ref('users');
    userList.update(users);
  });
