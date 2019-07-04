import { Injectable } from '@angular/core';
import { SMS, SmsOptionsAndroid, SmsOptions } from '@ionic-native/sms';
import { ToastController } from 'ionic-angular';
import { SmsServiceProvider } from '../sms-service/sms-service';

@Injectable()
export class SmsProvider {

  constructor(
    public sms: SMS,
    private smsService: SmsServiceProvider,
    private toastCtrl: ToastController
  ) {
    console.log('Hello SmsProvider Provider');
  }

  sendSMS(number:any, message:any) {
  
    let options: SmsOptions = {
      android:  {
        intent: 'INTENT'
      }
    }
    this.sms.send(number, message, options).then((result) => {
      let successToast = this.toastCtrl.create({
        message: "Text message sent successfully! :)",
        duration: 3000
      });
      successToast.present();
      this.smsService.getSentSMS();
    }, (error) => {
      let errorToast = this.toastCtrl.create({
        message: "Text message not sent. :(",
        duration: 3000
      });
      errorToast.present();
    });

    // SMs.sendSMS(number, message, 'intent' ,function(){
    //   console.log("SMS sent."); 
    //  }, function(e){
    //   console.log('Error sending SMS.'); 
    //  });
  }

}
