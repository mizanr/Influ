import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  notiList = [];
  noData = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public auth: AuthProvider,
    public api: RestApiProvider) {
    this.getNotifications();
  }

  getNotifications() {
    let data = {
      "user_id": this.auth.getCurrentUserId(),
    }
    this.api.get(data, 1, 'get_notification').then((result: any) => {
      if (result.status == 1) {
        this.notiList = result.data;
        this.unread();
      }
      else {
        this.notiList = [];
      }
      if (this.notiList.length == 0) {
        this.noData = true;
      } else {
        this.noData = false;
      }
    })

  }

  unread() {
    let data = {
      "user_id": this.auth.getCurrentUserId(),
    }
    this.api.get(data, 0, 'unread_notification').then((result: any) => {
    })
  }

  open(data) {

    if (data.screen == 'ChatDetail') {
      setTimeout(() => {
        this.navCtrl.push('ChatDetailsPage', { JobId: data.job_id, receiver: data.receiver_id });
      }, 700)
    } else if (data.other.screen == 'InfluencerProfile') {
      setTimeout(() => {
        this.navCtrl.push('InfluencerProfilePage', { InfluId: data.influId });
      }, 700)
    }
  }
}
