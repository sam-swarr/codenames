import * as firebase from "firebase/app";
import "firebase/auth";

let USER_CREDENTIAL = null;

export async function loginUser() {
  USER_CREDENTIAL = await firebase.auth().signInAnonymously();
  return USER_CREDENTIAL.user.uid;
}

export function getCurrentUserID() {
  if (!USER_CREDENTIAL) {
    throw Error('USER_CREDENTIAL IS MISSING');
  }
  return USER_CREDENTIAL.user.uid;
}
