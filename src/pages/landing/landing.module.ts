import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LandingPage } from './landing';
import { SuperTabsModule } from 'ionic2-super-tabs'; 

@NgModule({
  declarations: [
    LandingPage,
  ],
  imports: [
    IonicPageModule.forChild(LandingPage),
    SuperTabsModule
  ],
})
export class LandingPageModule {}
