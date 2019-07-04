import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SentboxPage } from './sentbox';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    SentboxPage,
  ],
  imports: [
    IonicPageModule.forChild(SentboxPage),
    PipesModule
  ],
})
export class SentboxPageModule {}
