import { AddJobPage } from './add-job';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    AddJobPage,
  ],
  imports: [
    IonicPageModule.forChild(AddJobPage),
    TranslateModule.forChild()
  ],
})
export class AddJobPageModule {}
