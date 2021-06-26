import { HiredServicesPage } from './hired-services';

import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    HiredServicesPage,
  ],
  imports: [
    IonicPageModule.forChild(HiredServicesPage),
    TranslateModule.forChild()
  ],
})
export class HiredServicesPageModule {}
