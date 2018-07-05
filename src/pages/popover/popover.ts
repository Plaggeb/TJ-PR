import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Toggle } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';

/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage implements OnInit {
  displayData: any;
  fontSize: string;
  settingsForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {
        this.fontSize = this.navParams.data;
    this.displayData = this.navParams.data;
    this.settingsForm = new FormGroup({
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
    console.log('ionViewDidLoad PopoverPage');

  }

  segmentChanged(event: any) {
    this.fontSize = event.value;
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
    }
  }
}
