import { AlertProvider } from './../../providers/alert/alert';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

/**
 * Generated class for the CompanyProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-company-profile',
  templateUrl: 'company-profile.html',
})
export class CompanyProfilePage {
  grown: string = "Profile";
  public buttonClicked: boolean = false;

  public ngIfCtrl() {

    this.buttonClicked = !this.buttonClicked;
  }
  profile: any;
  jobs = [];
  noData = false;
  hires: any;
  posts: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public api: RestApiProvider,
    public alert: AlertProvider
  ) {
    this.getProfile();
  }


  getProfile() {
    let data = {
      "id": this.navParams.get('ID'),
    }
    this.api.get(data, 1, 'GetUserProfile').then((res: any) => {
      if (res.status == 1) {
        this.profile = res.data;
        this.hires = res.no_of_hires;
        this.posts = res.no_of_posts;
        this.getJob();
      }
      else {
      }
    })
  }

  getJob() {
    let data = {
      "user_id": { "value": this.navParams.get('ID'), "type": "NO" },
    }
    this.api.postData(data, 0, 'GetMyJobList').then((res: any) => {
      if (res.status == 1) {
        this.jobs = res.data;
      }
      else {
        this.jobs = [];
      }
      if (this.jobs.length == 0) {
        this.noData = true
      } else {
        this.noData = false
      }
    })
  }

  back() {
    this.navCtrl.pop();
  }

  onChange() {
    // if (this.grown == 'Images' || this.grown == 'Reviews') {
    //   this.alert.show('Alert!', 'Coming Soon!');
    // }
  }
}
