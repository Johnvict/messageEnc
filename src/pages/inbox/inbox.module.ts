import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InboxPage } from './inbox';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    InboxPage,
  ],
  imports: [
    IonicPageModule.forChild(InboxPage),
    PipesModule
  ],
})
export class InboxPageModule {}
