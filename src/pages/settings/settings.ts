import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Toggle } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalStorageService } from '../../services/localStorage.service';
import { SettingsService } from '../../services/settings.service';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage implements OnInit {
  settingsForm: FormGroup;
  storeSAP: boolean;
  fontSize: string;
  approvalCode: string;
  displayData;
  showFieldNames: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public lsService: LocalStorageService,
    public settingsService: SettingsService) {
      this.storeSAP = this.settingsService.getStoreSAP();
      this.approvalCode = this.settingsService.getApproval();
      this.fontSize = this.settingsService.getFontSize();
      this.showFieldNames = this.settingsService.getShowFieldNames();
      this.displayData = this.settingsService.getDisplayData();
  }

  ngOnInit() {
    this.settingsForm = new FormGroup({
      "storeSAPCreds": new FormControl(this.storeSAP),
      "approvalCode": new FormControl(this.approvalCode.toUpperCase(), [Validators.maxLength(2)]),
      "fontSize": new FormControl(this.fontSize),
      "docType": new FormControl(this.displayData.documentType),
      "plant": new FormControl(this.displayData.plant),
      "accountAssignment": new FormControl(this.displayData.accountAssignment),
      "itemCategory": new FormControl(this.displayData.itemCategory),
      "prNumber": new FormControl(this.displayData.prNumber),
      "prLine": new FormControl(this.displayData.prLine),
      "materialNumber": new FormControl(this.displayData.materialNumber),
      "description": new FormControl(this.displayData.description),
      "requisitioner": new FormControl(this.displayData.requisitioner),
      "quantity": new FormControl(this.displayData.quantity),
      "amount": new FormControl(this.displayData.amount),
      "desiredVendor": new FormControl(this.displayData.desiredVendor),
      "fixedVendor": new FormControl(this.displayData.fixedVendor)
    });
  }
  ionViewDidLoad() {
    this.storeSAP = this.settingsService.getStoreSAP();
    this.approvalCode = this.settingsService.getApproval();
    this.fontSize = this.settingsService.getFontSize();
    this.showFieldNames = this.settingsService.getShowFieldNames();
    this.displayData = this.settingsService.getDisplayData();
    this.settingsForm.controls.fontSize.setValue(this.fontSize);
  }
  ionViewWillEnter() {
    this.storeSAP = this.settingsService.getStoreSAP();
    this.approvalCode = this.settingsService.getApproval();
    this.fontSize = this.settingsService.getFontSize();
    this.showFieldNames = this.settingsService.getShowFieldNames();
    this.displayData = this.settingsService.getDisplayData();
    this.settingsForm.controls.fontSize.setValue(this.fontSize);
  }

  ionViewWillLeave() {
    //write settings to local
    console.log("Leaving Settings");
    this.approvalCode = this.settingsForm.controls.approvalCode.value.toUpperCase();
    this.settingsService.setApproval(this.approvalCode);
    if (!this.storeSAP) {
      this.lsService.delete('SAPID').then(() => console.log("Removed SAPID"));
      this.lsService.delete('SAPPWD').then(() => console.log("Removed SAPPWD"));
    }
    this.settingsService.writeSettings();
  }

  onToggle(toggle: Toggle) {
    switch(toggle._elementRef.nativeElement.id) {
      case 'documentType':
        this.displayData.documentType = toggle.checked;
        break;
      case 'plant':
        this.displayData.plant = toggle.checked;
        break;
      case 'accountAssignment':
        this.displayData.accountAssignment = toggle.checked;
        break;
      case 'itemCategory':
        this.displayData.itemCategory = toggle.checked;
        break;
      case 'prNumber':
        this.displayData.prNumber = toggle.checked;
        break;
      case 'prLine':
        this.displayData.prLine = toggle.checked;
        break;
      case 'materialNumber':
        this.displayData.materialNumber = toggle.checked;
        break;
      case 'description':
        this.displayData.description = toggle.checked;
        break;
      case 'requisitioner':
        this.displayData.requisitioner = toggle.checked;
        break;
      case 'quantity':
        this.displayData.quantity = toggle.checked;
        break;
      case 'amount':
        this.displayData.amount = toggle.checked;
        break;
      case 'desiredVendor':
        this.displayData.desiredVendor = toggle.checked;
        break;
      case 'fixedVendor':
        this.displayData.fixedVendor = toggle.checked;
        break;
      case 'storeSAPCreds':
        this.storeSAP = toggle.checked;
        this.settingsService.setStoreSAP(this.storeSAP);
        break;
    }

    this.settingsService.setDisplayData(this.displayData);
    
  }

  segmentChanged(event: any) {
    this.settingsService.setFontSize(event.value);
    this.fontSize = event.value;
  }
}
