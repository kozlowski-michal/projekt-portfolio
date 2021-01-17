//*************************************************************************************************//
// Serwis odpowiedzialny za uwierzytelnianie użytkownika
// Na podstawie biblioteki angularfire2
// Zaimplementowano najprostsze czynności: logowanie, wylogowanie, zminana hasła (link do nowego hasła na email)
// e-mail został umieszczony na sztywno, gdyż jako, że jest to aplikacja testowa, nie chcę, by ktoś mi go podmienił, albo skutecznie zmienił hasło :)
//*************************************************************************************************//
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth, User } from 'firebase/app';
import { Observable } from 'rxjs/index'

@Injectable({providedIn: 'root'})
export class AuthenticationService {

  //readonly authState$: Observable<User | null> = this.fireAuth.authState;
  email: string = "mhl@wp.pl";

  constructor(private fireAuth: AngularFireAuth) {}

  get user(): Observable<User> {
    return this.fireAuth.user;
  }
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  login(password): Promise<firebase.auth.UserCredential> {
    return this.fireAuth.auth.setPersistence(auth.Auth.Persistence.LOCAL)
    .then( () => this.fireAuth.auth.signInWithEmailAndPassword(this.email, password))
  }
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  logout(): Promise<void> {
    return this.fireAuth.auth.signOut();
  }

  reset(): Promise<void>{
    return this.fireAuth.auth.sendPasswordResetEmail(this.email);
  }
}
