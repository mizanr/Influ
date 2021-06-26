import { AuthProvider } from './../../providers/auth/auth';

import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
@IonicPage()

@Component({
  selector: 'page-home-influencer',
  templateUrl: 'home-influencer.html',
})
export class HomeInfluencerPage {
  public buttonClicked: boolean = false;

  public ngIfCtrl() {

    this.buttonClicked = !this.buttonClicked;
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public auth: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeInfluencerPage');
  }
  profile() {
    this.navCtrl.push('CompanyProfilePage')
  }

}
