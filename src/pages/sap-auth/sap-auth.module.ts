import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SapAuthPage } from './sap-auth';

@NgModule({
  declarations: [
    SapAuthPage,
  ],
  imports: [
    IonicPageModule.forChild(SapAuthPage),
  ],
})
export class SapAuthPageModule {}
