import { Injectable } from '@angular/core';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
  Auth,
  sendEmailVerification,
  User,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2';
import { BehaviorSubject } from 'rxjs';
// import { AngularFirestore } from '@angular/fire/firestore';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth!: Auth;
  private loggedInUserSubject = new BehaviorSubject<User | null>(null);
  constructor() {
    this.initializeFirebase();
  }
  initializeFirebase() {
    const firebaseApp = initializeApp(environment.firebase);
    this.auth = getAuth(firebaseApp);
  }

  // Register(email: string, pass: string) {
  //   return createUserWithEmailAndPassword(getAuth(), email, pass).then(
  //     (userCredential) => {
  //       return sendEmailVerification(userCredential.user);
  //     }
  //   );
  // }
  // Add a method to update the user login status
  updateUserStatus(user: User | null) {
    this.loggedInUserSubject.next(user);
  }

  // Add a method to get an observable for the user's login status
  getLoggedInUserStatus() {
    return this.loggedInUserSubject.asObservable();
  }
  async Register(
    email: string,
    pass: string,
    gender: string,
    phone: number,
    username: string
  ) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        pass
      );

      // Send email verification here if needed
      await sendEmailVerification(userCredential.user);
      const userData = {
        UserName: username,
        UserID: userCredential.user.uid,
        Email: email,
        Password: '*'.repeat(pass.length),
        Gender: gender,
        PhoneNumber: phone,
      };
      const db = getFirestore();
      await setDoc(doc(db, 'users', userCredential.user.uid), userData);

      return { success: true, message: 'Registration successful' };
    } catch (error) {
      return { success: false, message: 'Registration failed' };
    }
  }

  async Login(email: string, pass: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        pass
      );

      if (userCredential.user && !userCredential.user.emailVerified) {
        throw new Error('Email not verified');
      }
      this.updateUserStatus(userCredential.user);

      return { success: true, message: 'Login successful' };
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Error',
        text: 'Please verify your Email first',
      });
      throw error;
    }
  }
  // async Login(email: string, pass: string) {
  //   try {
  //     const user = await signInWithEmailAndPassword(getAuth(), email, pass);
  //     if (user.user && !user.user.emailVerified) {
  //       throw new Error('Email not verified');
  //     }
  //     return user;
  //   } catch (error) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Login Error',
  //       text: 'Please verify your Email first',
  //     });
  //     throw error;
  //   }
  // }
  loginwithGmail() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }
  LoginWithFacebook() {
    const auth = getAuth();
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider);
  }
  Logout() {
    return signOut(getAuth()).then(() => {
      this.updateUserStatus(null);
    });
  }
}
