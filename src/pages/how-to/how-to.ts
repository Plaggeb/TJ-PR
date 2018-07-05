import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { LocalStorageService } from '../../services/localStorage.service';
import { AuthPage } from '../auth/auth';

/**
 * Generated class for the HowToPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-how-to',
  templateUrl: 'how-to.html',
})
export class HowToPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private lsService: LocalStorageService,
    private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HowToPage');
  }

  slides = [{
    title: "Welcome to the TowerJazz PR Approval application!",
    description: "This application will allow you to review and approve Purchase Requisitions from anywhere.",
    image: "assets/imgs/blue_on_white-100 (5).jpg"
  }, {
    title: "Corporate Login",
    description: "You will first be asked to Login with your Corporate credentials.",
    image: "assets/imgs/corp_login.PNG"
  }, {
    title: "SAP Login",
    description: "Next you will be asked to login with your SAP credentials. This is only on the first load, unless changed in the settings.",
    image: "assets/imgs/sap_login.PNG"
  }, {
    title: "PR Approval Code",
    description: "You will then be required to enter your PR Approval Code (i.e. BA, 20, TC, BI).  A default can be set in the Settings menu",
    image: "assets/imgs/pr_approval_code.PNG"
  }, {
    title: "PR(s) needing approval",
    description: "You will then be presented with a list of PRs that require approval",
    image: "assets/imgs/pr_list.PNG"
  }, {
    title: "Swipe Left for details",
    description: "You can swipe the line(s) to the left to view more details about the PR",
    image: "assets/imgs/swipe_left.PNG"
  }, {
    title: "Swipe Right to approve",
    description: "You can swipe right to approve a single line item",
    image: "assets/imgs/swipe_right.PNG"
  }, {
    title: "Select multiple / Approve multiple",
    description: "Multiple PRs can be selected by tapping the line.  The top Approve button will approve all selected PRs",
    image: "assets/imgs/multiple_select.PNG"
  }];


  onTutorialEnd() {
    this.viewCtrl.dismiss();
  }
}
