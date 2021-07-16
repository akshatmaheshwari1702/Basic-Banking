import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAsGByDL5HPGSqPpy7pNqoOKG4SGcBwlbM",
    authDomain: "orbit-bank.firebaseapp.com",
    projectId: "orbit-bank",
    storageBucket: "orbit-bank.appspot.com",
    messagingSenderId: "311506687176",
    appId: "1:311506687176:web:8b2b0787f2829dfcf241fd",
    measurementId: "G-NF6ZN6MNTE",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export const addUser = ([name, accountNo, balance]) => {
  return db
    .collection("users")
    .add({ name: name, accountNo: accountNo, balance: balance });
};

export const addTransaction = (amount, to, from) => {
  return db
    .collection("transactions")
    .add({ amount: amount, to: to, from: from, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
};

export const transact = (id1, balance1, id2, balance2, amount) => {
  return [db.collection("users").doc(id1).update({
    balance: Number(balance1) - Number(amount)
  }),
  db.collection("users").doc(id2).update({
    balance: Number(balance2) + Number(amount)
  })]

}

export { db };
