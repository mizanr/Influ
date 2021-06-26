import { VirtualScrollerModule } from 'ngx-virtual-scroller';



import { PayPal } from '@ionic-native/paypal';
import { PaypalProvider } from './../providers/paypal/paypal';
import { FacebookProvider } from './../providers/facebook/facebook';
import { GooglePlusProvider } from './../providers/google-plus/google-plus';
import { GooglePlus } from '@ionic-native/google-plus';
import { VideoEditor } from '@ionic-native/video-editor';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { ImageResizer } from '@ionic-native/image-resizer';
import { ImagePicker } from '@ionic-native/image-picker';
import { MediaProvider } from './../providers/media/media';
import { LoadingProvider } from './../providers/loading/loading';
import { ImageProvider } from './../providers/image/image';
import { AlertProvider } from './../providers/alert/alert';
import { AuthProvider } from './../providers/auth/auth';
import { RestApiProvider } from './../providers/rest-api/rest-api';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { HttpClientModule } from '@angular/common/http';
import { Keyboard } from '@ionic-native/keyboard';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AES256 } from '@ionic-native/aes-256';
import { EncryptProvider } from '../providers/encrypt/encrypt';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    VirtualScrollerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      }
    }),
    IonicModule.forRoot(
      MyApp, {
      mode: "ios",
      backButtonText: ""
    }
    ),
    HttpClientModule],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RestApiProvider,
    AuthProvider,
    AlertProvider,
    ImageProvider,
    LoadingProvider,
    Camera,
    File,
    Keyboard,
    MediaProvider,
    ImagePicker,
    ImageResizer,
    AndroidPermissions,
    VideoEditor,
    GooglePlus,
    GooglePlusProvider,
    FacebookProvider,
    InAppBrowser,
    PaypalProvider,
    PayPal,
    AES256,
    EncryptProvider,
  ]
})
export class AppModule { }
