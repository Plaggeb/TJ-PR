import { Component, OnInit } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, LoadingController, AlertController, Loading, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { PRGatewayService } from '../../services/prGateway.service';
import { LocalStorageService } from '../../services/localStorage.service';
import { HomePage } from '../home/home';
import { IReturnMessage } from '../../interfaces/returnMessage.interface';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { IAPIInterface } from '../../interfaces/api.interface';
import { AuthService } from '../../services/auth.service';
import { SettingsService } from '../../services/settings.service';

/**
 * Generated class for the SapAuthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sap-auth',
  templateUrl: 'sap-auth.html',
})
export class SapAuthPage {
  authForm: FormGroup;
  loading: Loading;
  loginAttempts: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private platform: Platform,
    private prService: PRGatewayService, 
    private lsService: LocalStorageService, 
    private loadingCtrl: LoadingController, 
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private http: Http,
    private authService: AuthService,
    private settingsService: SettingsService) {
  }

  ngOnInit() {
    this.initializeForm();
    let toast = this.toastCtrl.create({
      message: 'No SAP credentials found. Please sign in to SAP.',
      duration: 3000,
      position: 'bottom'
    }).present();
  }

  initializeForm() {
    this.authForm = new FormGroup({
      "username": new FormControl(null, Validators.required),
      "password": new FormControl(null, Validators.required)
    });
  }

  onLogin() {
    this.showLoading();
    this.loginAttempts += 1;
    let tempId: string = this.authForm.controls.username.value;
    let tempPwd: string = this.authForm.controls.password.value;
    this.prService.setCredentials(tempId, tempPwd);


    this.prService.checkSAPCredentialsAPI().subscribe((data: any) => {
      console.log(data);

      if(this.settingsService.getStoreSAP()) {
        this.lsService.set('SAPID', tempId);
        this.lsService.set('SAPPWD', tempPwd);
      }
      this.navCtrl.setRoot(HomePage);
    },
    err => {
      console.log('ERR =>' + err);
      let text = 'Incorrect username or password.';
      text += '<BR>Login attempt: ' + this.loginAttempts ;
      if (this.loginAttempts == 2) {
        text += '<BR>One more failed login attempt will lock your SAP account.';
        text += '<BR>Your password may have expired please verify by logging into SAP via a PC';
      } else if(this.loginAttempts >= 3) {
        text += '<BR>3 or more failed login attempts.';
        text += '<BR>Your SAP account is now locked.  Please contact SAP Helpdesk.';
      }
      this.showError(text);
      text = '';

    });
  }

  onCancel() {
    this.authForm.controls.username.setValue("");
    this.authForm.controls.password.setValue("");
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(errText) {
    this.loading.dismiss();
    let alert = this.alertCtrl.create({
      title: 'Authentication Failure',
      subTitle: errText,
      buttons: ['Okay']
    });
    alert.present();
  }
}
