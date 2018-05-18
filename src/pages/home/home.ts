import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';

import { PRGatewayService } from '../../services/prGateway.service';
import { RequisitionService } from '../../services/requisition.service';
import { CriteriaPage } from '../criteria/criteria';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { IRequisition } from '../../interfaces/requisition.interface';
import { DetailPage } from '../detail/detail';
import { HttpErrorResponse } from '@angular/common/http';
import { IReturnMessage } from '../../interfaces/returnMessage.interface';


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

  constructor(private navCtrl: NavController, 
    private prService: PRGatewayService, 
    private reqService: RequisitionService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {
  }

  ngOnInit() {
    if (this.relCode == "" || this.relGroup == "") {
      this.onSetCodeAndGroup().then(() => {
        this.initializeForm();
      });
    } 
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

  //  Set the release code and release group, need to test if * can be sent for release group
  onSetCodeAndGroup(): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      const modal = this.modalCtrl.create(CriteriaPage, {'relCode': this.relCode, 'relGroup': this.relGroup} );
      modal.present();    
      modal.onDidDismiss(data => {
        this.relCode = (<string>data.relCode).toUpperCase();
        this.relGroup = (<string>data.relGroup).toUpperCase();
        this.refreshPRs().then(() => {
          resolve({"updated": true});
        });
      });
    });
    return promise;
  }

  private initializeForm() {
    let reqs: any[] = [];

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
        this.prService.getReleaseItems(this.relGroup, this.relCode).subscribe(
          (data: any) => {
            console.log(data);
            this.reqService.clear();
            if ((<IRequisition[]>data['REQUISITION_ITEMS']).length > 0) {
              this.reqService.addItems((<IRequisition[]>data['REQUISITION_ITEMS']));
            } else {
              let  temp: IReturnMessage = (<IReturnMessage>data['RETURN'][0]);
              const alert = this.alertCtrl.create({
                message: "<B>Return Code: </B>" + temp.CODE + "<BR><B>Message: </B>" + temp.MESSAGE,
                buttons: ['OK']
              });
              alert.present();
            }
            this.PRs = this.reqService.getItems();
            this.initializeForm();
            resolve({"updated": true});
            loading.dismiss();
          },
          (err: any) => {
            loading.dismiss();
            
            const alert = this.alertCtrl.create({
                    message: "Observable Error: " + err,
                    buttons: ['OK']
                });
            alert.present();
            resolve({"updated": false});
          }
        );
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
    let x = this.approvalForm.value["requisitions"].length - 1;
    for (x; x >= 0; x--) {
      if (this.approvalForm.value["requisitions"][x]) {
        this.prService.releaseItem(this.PRs[x].PREQ_NO, this.PRs[x].PREQ_ITEM, "TC").subscribe((response: any) => {
          console.log(response);
          this.reqService.removeItem(x);
        });
      }
    }
    this.PRs = this.reqService.getItems();
    this.selectAll = false;
    this.initializeForm();
  }

  onDetails(index: number) {
    this.navCtrl.push(DetailPage, {"pr": this.PRs[index]});
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
          this.prService.releaseItem(pr.PREQ_NO, pr.PREQ_ITEM, "TC").subscribe((response: any) => {
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
        handler: () => { console.log('Nope'); }
      }]
    });
    alert.present();
  }
}
