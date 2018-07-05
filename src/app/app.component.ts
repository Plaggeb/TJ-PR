import { Component, ViewChild } from '@angular/core';
import { Platform, ToastController, AlertController, Button, MenuController, NavController, ModalController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { TabsPage } from '../pages/tabs/tabs';
import { AuthPage } from '../pages/auth/auth';
import { SapAuthPage } from '../pages/sap-auth/sap-auth';
import { LocalStorageService } from '../services/localStorage.service';
import { AuthService } from '../services/auth.service';
import { PRGatewayService } from '../services/prGateway.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HowToPage } from '../pages/how-to/how-to';
import { SettingsPage } from '../pages/settings/settings';
import { SettingsService } from '../services/settings.service';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = AuthPage; //TabsPage;
  howToPage: any = HowToPage;
  settingsPage: any = SettingsPage;
  
  @ViewChild('nav') nav: NavController;

  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private lsService: LocalStorageService, 
    private authService: AuthService,
    private prService: PRGatewayService,
    private toast: ToastController,
    private menuCtrl: MenuController, 
    private settingsService: SettingsService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController) {
//splashScreen.show();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      //this.lsService.clearAll();
      let loading = this.loadingCtrl.create({content: "Checking Credentials"});
      loading.present();
      this.lsService.get("TUT").then(() => {
        this.initToken().then(() => {
          splashScreen.hide();
          loading.dismiss();
        });
      }).catch(() => {
        const modal = this.modalCtrl.create(HowToPage); 
        modal.present();    
        modal.onDidDismiss(() => {
          console.log("Exit HowTo Modal");
          this.lsService.set('TUT', true);
          this.initToken().then(() => {
            splashScreen.hide();
            loading.dismiss();
          });
        });      
      });
      statusBar.styleDefault();
    });
  }
  
  ionViewWillEnter() {
    console.log("ionViewWillEnter - App Component ");
  }

  initToken(): Promise<any> {
    console.log('Init Token');
    return new Promise((resolve, reject) =>{
    //this.platform.ready().then(() => {
      this.lsService.get('token').then(token => {
        this.authService.setToken(token);
        console.log('Got Token: ' + token);
        this.lsService.get('userid').then(userid => {
          this.authService.setUserid(userid);
          console.log('Got User: ' + userid);
          let tempId;
          let tempPwd;
          this.lsService.get('SAPID').then(sapId => {
            tempId = sapId;
            console.log('Got SAP user: ' + tempId);
            this.lsService.get('SAPPWD').then(sapPwd => {
              tempPwd = sapPwd;
              console.log('Got SAP pass: ' + tempPwd);
              this.prService.setCredentials(tempId, tempPwd);
              this.prService.checkSAPCredentialsAPI().subscribe(data => {
                console.log("SAP Credentials verified");
                this.rootPage = HomePage;
                this.toast.create({
                  message: 'Logged in to SAP as: ' + tempId,
                  duration: 3000,
                  position: 'bottom'
                }).present();
                resolve();
              }, (err: HttpErrorResponse) => {
                console.log("Invalid SAP credentials: " + this.prService.getUser() + " " + this.prService.getPwd());
                console.log(err.message);
                this.rootPage = SapAuthPage;
                resolve();
              });
            }, err => {
              console.log('Error getting SAPPWD: ' + err);
              this.rootPage = SapAuthPage;
              resolve();
            }).catch (err => {
              console.log('Error getting SAPPWD: ' + err);
              this.rootPage = SapAuthPage;
              resolve();
            });
          }, err => {
            console.log('Error getting SAPID: ' + err);
            this.rootPage = SapAuthPage;
            resolve();
          }).catch(err => {
            console.log('Error getting SAPID: ' + err);
            this.rootPage = SapAuthPage;
            resolve();
          });
        }, err => {
          //  No user, login to AWS
          this.rootPage = AuthPage;
          resolve();
        });
      }, err => {
        //  No token, login to AWS
        this.rootPage = AuthPage;
        resolve();
      });
    //});
    });
    
  }

  onLogoutSAP() {
    this.lsService.delete('SAPID').then(res => {
      console.log('Removed SAPID');
      this.lsService.delete('SAPPWD').then(res => {
        console.log('Removed SAPPWD');
        this.lsService.delete('RELCODE').then(() => console.log('Removed RELCODE')).catch(() => console.log('Error removing RELCODE'));
        this.nav.setRoot(SapAuthPage);
        this.menuCtrl.close();
      }).catch(err => {
        console.log('Error removing SAPPWD ' + err);
        this.nav.setRoot(SapAuthPage);
        this.menuCtrl.close();;
      });
    }).catch(err => {
      console.log('Error removing SAPID ' + err);
      let alert: AlertController;
      alert.create({
        message: 'Error Logging out.  Please try again.',
        buttons: ['Okay']
      }).present();
    });
  }

  onLoadPage(page: any) {
    this.nav.push(page);
    this.menuCtrl.close();
  }
}
