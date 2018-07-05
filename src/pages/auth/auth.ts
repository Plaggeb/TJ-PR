import { Component, OnInit } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, Loading, LoadingController, AlertController, Toast, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { PRGatewayService } from '../../services/prGateway.service';
//import { TabsPage } from '../tabs/tabs';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/localStorage.service';
import { SapAuthPage } from '../sap-auth/sap-auth';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage implements OnInit{
  authForm: FormGroup;
  loading: Loading;
  registerCredentials = {userid: '', password: ''};

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private platform: Platform,
    private prService: PRGatewayService, 
    private authService: AuthService,
    private lsService: LocalStorageService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toast: ToastController) {
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.authForm = new FormGroup({
      "username": new FormControl(null, Validators.required),
      "password": new FormControl(null, Validators.required)
    });
  }

  onLogin() {
    //this.prService.setCredentials(this.authForm.controls.username.value, this.authForm.controls.password.value)
    //this.navCtrl.setRoot(TabsPage);
    this.showLoading();

    this.registerCredentials = {userid: this.authForm.controls.username.value, password: this.authForm.controls.password.value};

    this.authService.login(this.registerCredentials).subscribe( allowed => {
      if(allowed) {
        let tempId;
        let tempPwd;
        console.log('Stash the token ' + this.authService.token);
        this.lsService.set('token', this.authService.token);
        this.lsService.set('userid', this.authService.userid);
        this.lsService.get('SAPID').then(sapId => {
          tempId = sapId;
          this.lsService.get('SAPPWD').then(sapPwd => {
            tempPwd = sapPwd;
            this.prService.setCredentials(tempId, tempPwd);
            this.prService.checkSAPCredentialsAPI().subscribe(data => {
              console.log("SAP Credentials verified");
              this.navCtrl.setRoot(HomePage);
              this.toast.create({
                message: 'Logged in to SAP as: ' + tempId,
                duration: 2500,
                position: 'bottom'
              }).present();
            }, err => {
              console.log("Invalid SAP credentials");
              this.navCtrl.setRoot(SapAuthPage);
            });
          }, err => {
            console.log('Error getting SAPPWD: ' + err);
            this.navCtrl.setRoot(SapAuthPage);
          }).catch (err => {
            console.log('Error getting SAPPWD: ' + err);
            this.navCtrl.setRoot(SapAuthPage);
          });
        }, err => {
          console.log('Error getting SAPID: ' + err);
          this.navCtrl.setRoot(SapAuthPage);
        }).catch(err => {
          console.log('Error getting SAPID: ' + err);
          this.navCtrl.setRoot(SapAuthPage);
        });

      }
      else {
        this.showError('Access Denied');
      }
    }, err => {
      this.showError(err);
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
