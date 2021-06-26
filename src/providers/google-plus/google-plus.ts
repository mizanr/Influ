import { LoadingProvider } from './../loading/loading';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { compareDates } from 'ionic-angular/umd/util/datetime-util';
import { GooglePlus } from '@ionic-native/google-plus';
import { LoadingController } from 'ionic-angular';
/*
ionic cordova plugin add cordova-plugin-googleplus --variable REVERSED_CLIENT_ID=com.googleusercontent.apps.314185524564-qs5n513mt9opgbd6a7a4obes7e58jgl5
npm install --save @ionic-native/google-plus@4

import { GooglePlus } from '@ionic-native/google-plus';

*/

/*
  Generated class for the GooglePlusProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


//keytool -exportcert -keystore C:\Users\ionic\.android\debug.keystore -list -v
@Injectable()
export class GooglePlusProvider {

  constructor(
    public http: HttpClient,
    private googlePlus: GooglePlus,
    private loading: LoadingProvider
  ) {
    console.log('Hello GooglePlusProvider Provider');

  }

  login() {

    this.loading.show();
    return new Promise((resolve, reject) => {
      this.googlePlus.login({}).then(res => {
        // alert('res=================google plus page: ' + JSON.stringify(res));
        this.loading.hide();
        let data = {
          "fname": res.givenName,
          "lname": res.familyName,
          "email": res.email,
          "profilepic": res.imageUrl,
          "id": res.userId
        }
        resolve(data);
      }).catch(err => {
        console.log("this is google login error", err);
        this.loading.hide();
        // alert("Error:  "+JSON.stringify(err));
        reject(err);
      });

    })
  }




}
