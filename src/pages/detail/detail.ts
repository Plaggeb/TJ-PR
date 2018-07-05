import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { IRequisition, IRequisitionExtended, IREQ_EXT_PRITEM_SINGLE, IREQ_EXT_PRACCOUT_SINGLE, IREQ_EXT_PRITEMTEXT_SINGLE } from '../../interfaces/requisition.interface';
import { PRGatewayService } from '../../services/prGateway.service';
import { RequisitionService } from '../../services/requisition.service';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage implements OnInit {

  //pr: IRequisition;
  public pr: string;
  public prLine: string;
  public prItem: IREQ_EXT_PRITEM_SINGLE;
  public prAccount: IREQ_EXT_PRACCOUT_SINGLE;
  public prItemText: IREQ_EXT_PRITEMTEXT_SINGLE[] = [];
  public isDataLoaded: boolean = false;
  public hasJustification: boolean = false;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private prService: PRGatewayService,
    private reqService: RequisitionService) {
  }

  ionViewDidLoad() {
    this.pr = this.navParams.get('pr');
    this.prLine = this.navParams.get('line');
    let loading = this.loadingCtrl.create({content: 'Fetching PR ' + this.pr});
    console.log(this.navParams);
    loading.present();
      this.loadData().then(() => {
      this.isDataLoaded=true;
      loading.dismiss();
    }).catch(() => loading.dismiss());
  }

  ngOnInit() {
    
    
    //this.pr = <IRequisition>this.navParams.get('pr');
  }

  loadData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.prService.getRequisitionExpandedAPI(this.pr).subscribe((data: any) => {
        //console.log(data);
        
        let textIDs: any = this.reqService.getItemTextIDs();
  
        if(data['PRITEM'].length > 0) {
          for(let x = 0; x < data['PRITEM'].length; x++) {
            console.log('X = ' + x + ', PREQ_ITEM = ' + data['PRITEM'][x].PREQ_ITEM);
            if (this.prLine === data['PRITEM'][x].PREQ_ITEM) {
              this.prItem = (<IREQ_EXT_PRITEM_SINGLE>data['PRITEM'][x]);
              this.prAccount = (<IREQ_EXT_PRACCOUT_SINGLE>data['PRACCOUNT'][x]);
              if(data['PRITEMTEXT'].length > 0) {
                console.log(data['PRITEMTEXT']);
                for(let y = 0; y < data['PRITEMTEXT'].length; y++) {
                  if (this.pr === data['PRITEMTEXT'][y].PREQ_NO && this.prLine === data['PRITEMTEXT'][y].PREQ_ITEM && textIDs.JUSTIFICATION === data['PRITEMTEXT'][y].TEXT_ID) {
                    this.hasJustification = true;
                    this.prItemText.push((<IREQ_EXT_PRITEMTEXT_SINGLE>data['PRITEMTEXT'][y]));
                    console.log(this.prItemText);
                  }
                }
              } 
              break;
            }
          }
        } else {
          console.log("No records");
          // present error getting details
        }
        resolve({"updated": true});
      }, err => {
        // present error getting details
        console.log(err);
        reject({"updated": false});
      });
    });
 
  }

  onShowDesc() {
    const alert = this.alertCtrl.create({
      title: 'Description',
      message: this.prItem.SHORT_TEXT,
      buttons: [{
        text: 'Okay',
        role: 'Cancel',
        handler: () => { console.log('done'); }
      }]
    });
    alert.present();
  }
}
