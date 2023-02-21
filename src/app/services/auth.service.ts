import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import IUser from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersCollection: AngularFirestoreCollection<IUser>
  // we need a boolean for checking if there is user or not using the auth.user.subscribe for that
  // why we are using the dollar sign in the variable isAuthenticated is because that is a observable it is a commmon pratise to make the observable variable a dollar sign to understand other developers
  public isAuthenticated$: Observable<boolean>

  /****
   * ? angular fireauth is the giving the data into the google
   * ?angular firestore will have the all the collection in the google fire
   * ? we use angularfIrestonecollection for them to store the users collection and it will give us the users collection
   * */

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore) {
    // we are making the db collection a collection for the firebase and the name of the collection is user and we stored them to the userCollection
    this.usersCollection = db.collection('user')
    /*****
     * when the user is logged in we can get the data of the logged user using the user.subscribe console.log
     * if there is any user in the site logged in we can see the using the auth.user.subscribe if the user is there
     * * we will have a authentication and the server in our case that is firebase in firebase they automatically creates
     * * they create the token for the user when he registered into the website and stores the token to check if the user is logged in or not
     *  * we are checking that any token is available in the website if that is true then there will be tokens
     * */
    // auth.user is checking whether is there any user available or not  in the user there are somany things in a observable we only need the boolean so we are going to make that using the pipe operator
    this.isAuthenticated$ = auth.user.pipe(
      map((user) => {
        return !!user
      })
    )
  }

  public async createUser(userData: IUser) {
    if (!userData.password) {
      throw new Error("password not provided")
    }
    const userCred = await this.auth.createUserWithEmailAndPassword(
      userData.email as string, userData.password as string
    )
    /****
     * in this we are creating a new collection in the db and the new collection name is used
     * and the collection contains the document of the name,email,age,Phone number to the db named user
     * in the user they will create a uuid in the users collection a new document will always be created with a uuid
    */
    // if there is no user in the userCred then there will be no users
    if (!userCred.user) {
      throw new Error('Users cant be found')
    }
    // in each of the time we push the email and password using the userCred to the firebase it will have the
    // email password and the uuid in the database we can get the unique id using the
    await this.usersCollection.doc(userCred.user?.uid).set(
      {
        name: userData.name,
        email: userData.email,
        age: userData.age,
        phoneNumber: userData.phoneNumber
      })
    await userCred.user.updateProfile({
      displayName: userData.name
    })
  }
}

