import { IonicPage, ViewController, NavParams } from "ionic-angular";
import { Component, OnInit } from "@angular/core";

import { FormGroup, FormControl, Validators } from "@angular/forms";
import { LocalStorageService } from "../../services/localStorage.service";
import { SettingsService } from "../../services/settings.service";

@IonicPage()
@Component({
    selector: 'page-criteria',
    templateUrl: 'criteria.html'
})
export class CriteriaPage implements OnInit {

    relCode: string;
    relGroup: string;
    relGroups = ["01", "JP", "US", "SA", "TX", "NP", "JZ"];
    criteriaForm: FormGroup;
      
    constructor(private viewCtrl: ViewController, 
        private navParams: NavParams,
        private lsService: LocalStorageService,
        private settingsService: SettingsService) {}

    ngOnInit() {
        //this.relGroup = "SA";//this.navParams.get('relGroup');
        this.relCode = this.settingsService.getApproval();
        // this.lsService.get('RELCODE')
        //     .then((relCode: string) => {
        //         this.relCode = relCode;
        //         this.initForm();
        //     })
        //     .catch(err => {
        //         console.log('Release Code not set.');
        //         this.relCode = 'TC';
        // });
        //this.relCode = "TC";//this.navParams.get('relCode');
        this.initForm();        
    }

    initForm() {
        this.criteriaForm = new FormGroup({
            'relCode': new FormControl(this.relCode, [Validators.required, Validators.maxLength(2)])
            //'relGroup': new FormControl(this.relGroup, Validators.required)
        });  
    }

    onClose() {
        this.viewCtrl.dismiss();
    }

    onSubmit() {
        
        //this.lsService.set('RELCODE', this.relCode);
        this.viewCtrl.dismiss({'relCode': this.criteriaForm.value.relCode}); //, 'relGroup': this.criteriaForm.value.relGroup });
        //this.onClose();
    }
}