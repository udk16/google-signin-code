

import React,{useEffect,useState} from 'react';
import {
  
  Text,
  View,
  Button
} from 'react-native';
//import auth from '@react-native-firebase/auth';
//import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleSignin ,statusCodes} from '@react-native-google-signin/google-signin';
import { firebase } from '@react-native-firebase/auth';

//const [user, setUser] = useState("");

const onGoogleButtonPress=async ()=> {
  // Get the users ID token
//  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  //const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  //return await auth().signInWithCredential(googleCredential);

if(!await GoogleSignin.isSignedIn()){
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    //If login is successful you'll get user info object in userInfo below I'm just printing it to console. You can store this object in a usestate or use it as you like user is logged in.
    if (userInfo) {
      //await storeToken(userInfo);
      // eslint-disable-next-line no-console
      console.log('User info retrieved during login', userInfo);
    }
    // create a new firebase credential with the token
    // eslint-disable-next-line max-len
    const credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken);
    // login with credential
    // eslint-disable-next-line no-unused-vars
    const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
    console.log('Logged in')
    //setUser(firebase.auth().currentUser);  
   
   
   // console.log(userInfo)
  } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            alert("You cancelled the sign in.");
      } else if (error.code === statusCodes.IN_PROGRESS) {
            alert("Google sign In operation is in process");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            alert("Play Services not available");
      } else {
            alert("Something unknown went wrong with Google sign in. " + error.message);
      }
  }
}//if end
else{alert ("already signed in")}
}//fn end

isSignedIn = async () => {
  const isSignedIn = await GoogleSignin.isSignedIn();
  //this.setState({ isLoginScreenPresented: !isSignedIn });
if(isSignedIn){
  alert("user already signed in")

}
  else{alert("currently no sign in")}

//return isSignedIn;
};
//const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
  // if (user) {
       // Signed in
    // } else {
     // await firebase.auth().signOut();
       // Signed out
    // }
   //});

signOut = async () => {
 if(await GoogleSignin.isSignedIn()){
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    //alert("signed out")
    await firebase.auth().signOut();
    console.log("signed out")
    //setUser(firebase.auth().currentUser); 
    //setState({ user: null }); // Remember to remove the user from your app's state as well
  } catch (error) {
    console.error(error);
  }
}//if end
else{alert ("none signed in")}
};

const App = () => {

  //const [user, setUser] = useState(null);
useEffect(()=>{

  GoogleSignin.configure({
    webClientId: '325200367210-9va0gqsjfn25kgfp85t2detibhr1naoc.apps.googleusercontent.com',
  });
  

},[]);
useEffect(() => {
//setUser(firebase.auth().currentUser)
  const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // Signed in
        console.log(user.email)
        alert(user.email+" signed in")
      } else {
     //  await firebase.auth().signOut();
        // Signed out
        alert("signed out")
      }
    });
 



  
}, []);

//const user = firebase.auth().currentUser;
//setUser(firebase.auth().currentUser); 

return (
    
       
        // <GoogleSigninButton
  //  style={{ width: 192, height: 48 }}
   // size={GoogleSigninButton.Size.Wide}
    //color={GoogleSigninButton.Color.Dark}
    //onPress={this._signIn}
    //disabled={this.state.isSigninInProgress} />
<View>
  <Text>hellooooooo</Text>
  <Button
      title="Google Sign-In"
      onPress={() => onGoogleButtonPress().then(() => console.log('google Sign in is called')).catch((arg)=>{console.log(arg)})}
    />
<Button
title="check status"
onPress={()=>{isSignedIn()}}
/>
<Button

title="signout"
onPress={()=>{
signOut();
}}
/>
</View>     
    
);
};


export default App;
