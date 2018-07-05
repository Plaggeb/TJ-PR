import { Component, OnInit, group } from '@angular/core';
import { NavController, ModalController, AlertController, LoadingController, ToastController, PopoverController } from 'ionic-angular';

import { PRGatewayService } from '../../services/prGateway.service';
import { RequisitionService } from '../../services/requisition.service';
import { CriteriaPage } from '../criteria/criteria';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { IRequisition } from '../../interfaces/requisition.interface';
import { DetailPage } from '../detail/detail';
import { HttpErrorResponse } from '@angular/common/http';
import { IReturnMessage } from '../../interfaces/returnMessage.interface';
import { SettingsService } from '../../services/settings.service';
import { ReplaySubject, Observable } from 'rxjs';
import { SettingsPage } from '../settings/settings';
import { PopoverPage } from '../popover/popover';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  selectAll: boolean = false;
  relCode: string = "";
  relGroup: string = "";
  approvalForm: FormGroup;
  PRs: IRequisition[] = [];
  displayData: any;
  showFieldNames: boolean;
  fontSize: string;

  constructor(private navCtrl: NavController, 
    private prService: PRGatewayService, 
    private reqService: RequisitionService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private settingsService: SettingsService,
    private toastCtrl: ToastController,
    private popCtrl: PopoverController) {

      console.log("constructor");
      this.fontSize = this.settingsService.getFontSize();
      this.showFieldNames = this.settingsService.getShowFieldNames();
      this.displayData = this.settingsService.getDisplayData();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad");;
    this.fontSize = this.settingsService.getFontSize();
    this.showFieldNames = this.settingsService.getShowFieldNames();
    this.displayData = this.settingsService.getDisplayData();
    if (this.relCode == "" ) { //|| this.relGroup == "") {
      this.onSetCodeAndGroup().then(() => {
        this.initializeForm();
      }).catch();
    } 
  }

  ionViewCanEnter() {
    console.log("ionViewCanEnter");
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter");
    this.fontSize = this.settingsService.getFontSize();
    this.showFieldNames = this.settingsService.getShowFieldNames();
    this.displayData = this.settingsService.getDisplayData();
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter");
    this.fontSize = this.settingsService.getFontSize();
    this.showFieldNames = this.settingsService.getShowFieldNames();
    this.displayData = this.settingsService.getDisplayData();
  }

  ngOnInit() {
    console.log("ngOninit");

  }

  // Changes the value of selectAll to the opposite of what it currently is.
  // This change updates the bound checkboxes checked value.
  onSelectAll() {
    this.selectAll = !this.selectAll;
  }

  // Scroll to top to refresh page
  onRefresher(refresher) {
    this.refreshPRs().then(() => {
      refresher.complete();
    });
  }


  onNewCriteria() {
    this.onSetCodeAndGroup().then().catch();
  }

  //  Set the release code and release group, need to test if * can be sent for release group
  onSetCodeAndGroup(): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      const modal = this.modalCtrl.create(CriteriaPage, {'relCode': this.relCode}); //, 'relGroup': this.relGroup} );
      modal.present().catch();    
      modal.onDidDismiss(data => {
        this.relCode = (<string>data.relCode).toUpperCase();
        //this.relGroup = (<string>data.relGroup).toUpperCase();
        this.refreshPRs().then(() => {
          resolve({"updated": true});
        }).catch();
      });
      
    });
    return promise;
  }

  private initializeForm() {
    let reqs: any[] = [];
    console.log(this.PRs);
    if (this.PRs.length > 0) {
      for (let req of this.PRs) {
        reqs.push(new FormControl(false));
      }
    }

    this.approvalForm = new FormGroup({
      "requisitions": new FormArray(reqs, Validators.required)
    });
  }

  // Refreshes the PR array
  refreshPRs(): Promise<any> {
    const loading = this.loadingCtrl.create({content: 'Fetching PRs'});
    try {
      loading.present();
      const promise = new Promise((resolve, reject) =>{
        
        let getReleaseItemsBatch = [];
        
        this.prService.getRelGroups().forEach(group => {
          getReleaseItemsBatch.push(this.prService.getReleaseItemsAPI(group, this.relCode));
        });

        Observable.forkJoin(getReleaseItemsBatch).subscribe((data) => {
            this.reqService.clear();
            data.forEach(retGroup => {
              console.log(retGroup);
              console.log((<IRequisition[]>retGroup['REQUISITION_ITEMS']).length);
              if ((<IRequisition[]>retGroup['REQUISITION_ITEMS']).length > 0) {
                this.reqService.addItems((<IRequisition[]>retGroup['REQUISITION_ITEMS']));
              }
            });
            this.PRs = this.reqService.getItems();
            if (this.PRs.length == 0) {
              const alert = this.alertCtrl.create({
                message: "No requisitions found for Approval Code: " + this.relCode,
                buttons: ['OK']
              });
              alert.present();
            }
            this.initializeForm();
            resolve({"updated": true});
            loading.dismiss();
        },
          (err: any) => {
            loading.dismiss();
            
            const alert = this.alertCtrl.create({
                    message: "Observable Error: " + err.message,
                    buttons: ['OK']
                });
            alert.present();
            resolve({"updated": false});
          });

        // this.prService.getReleaseItemsAPI(this.relGroup, this.relCode).subscribe(
        //   (data: any) => {
        //     console.log(data);
        //     this.reqService.clear();
        //     if ((<IRequisition[]>data['REQUISITION_ITEMS']).length > 0) {
        //       this.reqService.addItems((<IRequisition[]>data['REQUISITION_ITEMS']));
        //     } else {
        //       let  temp: IReturnMessage = (<IReturnMessage>data['RETURN'][0]);
        //       const alert = this.alertCtrl.create({
        //         message: "<B>Return Code: </B>" + temp.CODE + "<BR><B>Message: </B>" + temp.MESSAGE,
        //         buttons: ['OK']
        //       });
        //       alert.present();
        //     }
        //     this.PRs = this.reqService.getItems();
        //     this.initializeForm();
        //     resolve({"updated": true});
        //     loading.dismiss();
        //   },
        //   (err: any) => {
        //     loading.dismiss();
            
        //     const alert = this.alertCtrl.create({
        //             message: "Observable Error: " + err,
        //             buttons: ['OK']
        //         });
        //     alert.present();
        //     resolve({"updated": false});
        //   }
        // );
      });
      return promise;
    } 
    catch (error) 
    {
      //loading.dismiss();
      const alert = this.alertCtrl.create({
        title: 'Exception in RefreshPRs',
        message: error.message,
        buttons: ['Okay']
      });
      alert.present();
    }
  }

  onSubmit() {
    const alert = this.alertCtrl.create({
      title: 'Approve PR(s)',
      subTitle: 'Are you sure?',
      message: 'Are you sure you want to approve the selected PR(s)?',
      buttons: [{
        text: 'Yes, go ahead',
        handler: () => { 
            const loading = this.loadingCtrl.create({content: 'Approving PRs'});
            loading.present();
            this.processSubmit().subscribe((data) => {
              loading.dismiss();
              this.refreshPRs().then(() => {
                this.initializeForm();
                let toast = this.toastCtrl.create({
                  message: 'All selected PRs have been approved.',
                  duration: 3000,
                  position: 'bottom'
                }).present();
              });
            }, err => {
              console.log(err);
              loading.dismiss();
              let alert2 = this.alertCtrl.create({
                title: 'Approval Error',
                message: 'Error: ' + err.message,
                buttons: ['Okay']
              }).present();
            });
          }
        }, {
          text: 'No, I changed my mind!',
          role: 'Cancel',
          handler: () => { console.log('On Submit - Nope'); }
        }]
      });
      alert.present();  
  }

  processSubmit() {
    let x = this.approvalForm.value["requisitions"].length - 1;
    let observableBatch = [];
    for (x; x >= 0; x--) {
      if (this.approvalForm.value["requisitions"][x]) {
        observableBatch.push(this.prService.releaseItemAPI(this.PRs[x].PREQ_NO, this.PRs[x].PREQ_ITEM, this.relCode));
      }
    }
    return Observable.forkJoin(observableBatch);
  }

  onDetails(index: number) {
    console.log(this.PRs[index].PREQ_ITEM);
    this.navCtrl.push(DetailPage, { "pr": this.PRs[index].PREQ_NO, "line": this.PRs[index].PREQ_ITEM });
  }

  onApproval(index: number) {
    let pr: IRequisition = this.PRs[index];
    const alert = this.alertCtrl.create({
      title: 'Approve PR',
      subTitle: 'Are you sure?',
      message: 'Are you sure you want to approve PR: ' + pr.PREQ_NO + ' Line: ' + pr.PREQ_ITEM + '?',
      buttons: [{
        text: 'Yes, go ahead',
        handler: () => {
          // Approve PR wrap below in the observable
          this.prService.releaseItemAPI(pr.PREQ_NO, pr.PREQ_ITEM, this.relCode).subscribe((response: any) => {
            console.log(response);
            // Remove from service array if successfully approved
            this.reqService.removeItem(index);
            // Refresh local array
            this.PRs = this.reqService.getItems();
            // Refresh form
            this.initializeForm();
          });
        }
      }, {
        text: 'No, I changed my mind!',
        role: 'Cancel',
        handler: () => { console.log('Approval Slide - Nope'); }
      }]
    });
    alert.present();
  }

  onPopover(event: any) {
    let popover = this.popCtrl.create(PopoverPage);
    popover.present({ev: event});
  }
}
