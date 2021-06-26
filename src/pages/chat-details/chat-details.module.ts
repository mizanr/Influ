import { ChatDetailsPage } from './chat-details';



import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    ChatDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatDetailsPage),
    TranslateModule.forChild()
  ],
})
export class ChatDetailsPageModule { }
