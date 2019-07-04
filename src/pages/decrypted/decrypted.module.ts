import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DecryptedPage } from './decrypted';

@NgModule({
  declarations: [
    DecryptedPage,
  ],
  imports: [
    IonicPageModule.forChild(DecryptedPage),
  ],
})
export class DecryptedPageModule {}
