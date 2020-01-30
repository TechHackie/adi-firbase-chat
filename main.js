const firebaseConfig = {
  apiKey: "AIzaSyB3MRndkPhik12d1APBGV3I0dotCstP5f8",
  authDomain: "fir-ignite-dem0.firebaseapp.com",
  databaseURL: "https://fir-ignite-dem0.firebaseio.com",
  projectId: "fir-ignite-dem0",
  storageBucket: "fir-ignite-dem0.appspot.com",
  messagingSenderId: "277627782505",
  appId: "1:277627782505:web:71ffefe4b26743d118a9f8",
  measurementId: "G-XMGFLY2EEH"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



  // get a refence 

  var database = firebase.database();

  const dbRef = database.ref('message');

  // dbRef.on('value', event => {
  //   console.log(event.val());
  // })

  const inputbox = document.getElementById('inputbox');
  const messages = document.getElementById('messages');

  const CURRENT_USER = 'A';

  function getMessageElement(data){

    const newElement = document.createElement('div');
    newElement.innerHTML = data.message;
    newElement.className = `messages ${data.name === CURRENT_USER ? 'mine' : '' }`;

    return newElement;
  }


  inputbox.addEventListener('keyup' , function(e){

    if(e && e.code === 'Enter'){

      writeMessage(CURRENT_USER, e.target.value);
      inputbox.value = ''; 
    }
  });


function writeMessage(name , messages){

  console.log("i am supposed to write to firebase ", messages)
  const uid = dbRef.push().key;
  dbRef.child(uid).set({

        name: name,
        messages: messages 

  });
}

dbRef.limitToLast(20).on('value', event => {
  const response = event.val();
  if(response){
    messages.innerHTML = '';
    Object.keys(response).map(key => {
      messages.appendChild(getMessageElement(response[key]))
    })
  }
});

  messages.appendChild(getMessageElement({ name: 'Guest', message: 'Hello' }));
  messages.appendChild(getMessageElement({ name: '@TheWizardJS', message: 'Hi' }));



