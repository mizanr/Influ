import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, IonicPage } from 'ionic-angular';
@IonicPage()

@Component({
  selector: 'page-post-detail',
  templateUrl: 'post-detail.html',
})
export class PostDetailPage {
  detail: any = ''
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    public auth: AuthProvider, public api: RestApiProvider) {

  }
  ionViewWillEnter() {
    this.getPost()
  }

  getPost() {
    let data = {
      "user_id": this.auth.getCurrentUserId(),
      "job_id": this.navParams.get('PostId'),
    }
    this.api.get(data, 1, 'GetJobById').then((res: any) => {
      if (res.status == 1) {
        // this.categories = res.data
        this.detail = res.data[0];
      }
      else {
      }
    })
  }
}
