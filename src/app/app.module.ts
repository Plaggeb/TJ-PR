import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule, JsonpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
//import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PRGatewayService } from '../services/prGateway.service';
import { RequisitionService } from '../services/requisition.service';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/localStorage.service';

import { CriteriaPage } from '../pages/criteria/criteria';
import { DetailPage } from '../pages/detail/detail';
import { AuthPage } from '../pages/auth/auth';
import { SapAuthPage } from '../pages/sap-auth/sap-auth';
import { IonicStorageModule } from '@ionic/storage';
import { SettingsPage } from '../pages/settings/settings';
import { SettingsService } from '../services/settings.service';
import { HowToPage } from '../pages/how-to/how-to';
import { PopoverPage } from '../pages/popover/popover';





@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    CriteriaPage,
    DetailPage,
    AuthPage,
    SapAuthPage,
    SettingsPage,
    HowToPage,
    PopoverPage
    //TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    JsonpModule,
    HttpModule,
    HttpClientModule,
    IonicStorageModule.forRoot({
      name: 'TJPR'
    })
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    CriteriaPage,
    DetailPage,
    AuthPage,
    SapAuthPage,
    SettingsPage,
    HowToPage,
    PopoverPage
    //TabsPage
  ],
  providers: [
    SettingsService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PRGatewayService,
    RequisitionService,
    AuthService,
    LocalStorageService,
    IonicStorageModule
    
  ]
})
export class AppModule {}
