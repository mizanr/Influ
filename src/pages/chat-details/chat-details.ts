import { DownloadProvider } from './../../providers/download/download';
import { TranslateService } from '@ngx-translate/core';
import { ImageProvider } from './../../providers/image/image';
import { AlertProvider } from './../../providers/alert/alert';
import { AuthProvider } from './../../providers/auth/auth';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, Content, ActionSheetController } from 'ionic-angular';

import { Observable } from 'Rxjs/rx';
import { Subscription } from "rxjs/Subscription";
import { MediaProvider } from '../../providers/media/media';
@IonicPage()
@Component({
  selector: 'page-chat-details',
  templateUrl: 'chat-details.html',
})
export class ChatDetailsPage {
  job: any;
  chat: any;
  observableVar: Subscription;
  msgPrelength = 0;
  msgPostlength = 0;
  msg: string = "";
  sendBtnDisabledS = false;
  baseUrl = "https://www.webwiders.com/WEB01/Influ/assets/media/";
  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, public navParams: NavParams, public api: RestApiProvider,
    public auth: AuthProvider,
    public alert: AlertProvider,
    public imageP: ImageProvider,
    public actionSheetCtrl: ActionSheetController,
    public trans: TranslateService,
    public media: MediaProvider,
    public download: DownloadProvider,) {
  }

  ionViewWillEnter() {
    this.startConversation();
    this.chatReaded();
  }

  getChat(s) {
    let data = {
      "user_id": this.auth.getCurrentUserId(),
      "JobId": this.navParams.get('JobId'),
      "receiver": this.navParams.get('ReceiverId'),
    }
    this.api.get(data, s, 'GetChatDataBetweenUsers').then((result: any) => {
      this.job = result.Job_data;
      if (result.status == 1) {
        console.log(result);
        this.chat = result.data;
        this.msgPostlength = result.data.length;
        if (this.msgPrelength != this.msgPostlength) {
          this.chat = result.data;
          setTimeout(
            () => {
              this.content.scrollToBottom();
            },
            100
          );
        }
        this.msgPrelength = this.msgPostlength;

      }
      else {
      }
    })
  }


  ionViewDidLeave() {
    this.observableVar.unsubscribe();
    // this.navCtrl.popToRoot();
  }

  startConversation() {
    this.getChat(1);
    // // let user =  JSON.parse(localStorage.getItem("userDetailsUserGF"))
    // this.currentUser = this.auth.getCurrentUserId();
    // this.currentUsername = this.navParams.get("name");
    this.observableVar = Observable.interval(3000).subscribe(() => {
      // this.getChat(0);
    });
  }


  send() {
    this.sendBtnDisabledS = true;
    let m = this.msg.trim();
    let Data = {
      JobId: { "value": this.navParams.get('JobId'), "type": "NO" },
      sender: { "value": this.auth.getCurrentUserId(), "type": "NO" },
      receiver: { "value": this.navParams.get('ReceiverId'), "type": "NO" },
      message: { "value": m, "type": "MSG" },
      msg_type: { "value": 'text', "type": "NO" },
    }
    this.api.postData(Data, 0, 'SendMessage').then((result: any) => {
      this.sendBtnDisabledS = false;
      console.log(result);
      if (result.status == 1) {
        this.msg = "";
      } else {
      }
    })
  }


  sendFile(blob1, name1, type) {
    console.log('type---------------', type);

    let data = {
      // action: { value: 'Send_media', type: 'NO' },
      file: { value: blob1, type: 'NO', name: name1 },
      file_type: { value: type, type: 'NO' },
    }

    this.api.postData(data, 0, 'Send_media').then((res: any) => {
      if (res.status == "1") {
        this.sendImg(res.file_name, type);
      } else {
        // this.alertP.show('Alert!', res.message);
      }
    })
  }


  sendImg(fileName, typ) {
    let Data = {
      JobId: { "value": this.navParams.get('JobId'), "type": "NO" },
      sender: { "value": this.auth.getCurrentUserId(), "type": "NO" },
      receiver: { "value": this.navParams.get('ReceiverId'), "type": "NO" },
      message: { "value": fileName, "type": "NO" },
      msg_type: { "value": typ, "type": "NO" },
    }
    this.api.postData(Data, 0, 'SendMessage').then((result: any) => {
      console.log(result);
      if (result.status == 1) {
      } else {
      }
    })
  }

  editImage() {
    this.imageP.getImage().then((res: any) => {
      this.imageP.imgURItoBlob(res).then((b) => {
        this.sendFile(b, this.imageP.generateImageName('hello.png'), 'image')
      })
    })
  }



  openSlider(imgNameArr, index) {
    let profileModal = this.api.modalCtrl.create('ImagesViewerPage', { imgs: imgNameArr, index: index });
    profileModal.present();
  }

  chatReaded() {
    let data = {
      "user_id": this.auth.getCurrentUserId(),
      "JobId": this.navParams.get('JobId'),
      "receiver": this.navParams.get('ReceiverId'),
    }
    this.api.get(data, 0, 'unread_chat').then((result: any) => {
      this.job = result.Job_data;
      if (result.status == 1) {

      }
      else {
      }
    })

  }

  attach() {

    const actionSheet = this.actionSheetCtrl.create({
      // title: this.trans.instant('REPORT_THIS_POST'),
      buttons: [
        {
          text: this.trans.instant('SEND_IMAGE'),
          handler: () => {
            this.editImage();
          }
        },
        {
          text: this.trans.instant('SEND_FILE'),
          handler: () => {
            this.media.getFile().then((res1: any) => {
              if (res1 != 0) {
                this.sendFile(res1.file, res1.name, 'file');
              }
            });
          }
        },
        {
          text: this.trans.instant('CANCEL'),
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }


  openFile(link) {
    this.download.checkFileExistOrNot(link).then((res) => {
      if (res == 1) {
        this.alert.confirmationAlert(this.trans.instant('CONFIRMATION'), this.trans.instant('FILE_ALREADY_EXISTS')).then((res) => {
          if (res) {

            this.download.download(link);
          }

        });
      }
      else {
        this.download.download(link);
      }
    })



  }
}
