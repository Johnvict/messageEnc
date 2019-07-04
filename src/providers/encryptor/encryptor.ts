import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { SmsServiceProvider } from '../sms-service/sms-service';
declare var require:any;

@Injectable()
export class EncryptorProvider {
  aes256 = require("aes256");

  encryptedData: string;
  fakerText:string;
  encSecureKey: string;
  encSecureIV: string;
  encKey: string;

  constructor(
    private toastCtrl: ToastController,
    public smsService: SmsServiceProvider
    ) { }

  async prepareMessage (key, text) {
    var cipher = await this.aes256.createCipher(key);
    this.encryptedData = await cipher.encrypt(text);
    
    return this.encryptedData;
  }

  showToast(text:string, position?:string) {
    const toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: position == null ? "bottom" : position,
      cssClass: "danger"
    });
    toast.present();
  }

}
