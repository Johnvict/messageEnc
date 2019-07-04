import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import { SmsServiceProvider } from '../../providers/sms-service/sms-service';

@IonicPage()
@Component({
  selector: 'page-sentbox',
  templateUrl: 'sentbox.html',
})
export class SentboxPage {
  messages: any = [];
  results: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public smsService: SmsServiceProvider,
    public loadingCtrl: LoadingController
    ) {

      // this.smsService.getSentSMS();
      this.results = [];
    }
    
    ionViewDidLoad() {
      this.messages = this.smsService.sentboxMessages;
    // this.readSentSMS();
  }


 async  reloadSentMessages() {
    let loading = this.loadingCtrl.create({
      content: "Loading SMS..."
    });

    await this.smsService.readSentSMS()
    .then(listSMS => {
      //console.log(listSMS);
      this.results = listSMS;
      this.groupMessabesByAddress();

      loading.dismiss();
    })
  }

  selectedMessage(message:any) {
    this.navCtrl.push("MessagePage", {
      message: message
    });
  }

  groupMessabesByAddress() {
    let messages = this.results;
    let res = messages.reduce(function(res, currentValue) {
      if (res.indexOf(currentValue.address) === -1 ) {
        res.push(currentValue.address);
      }
  
      return res;
    }, []).map(function(address) {
      return {
        address: address,
        info: messages.filter(function(_el) {
          return _el.address === address;
        }).map(function(_el) { return _el; })
      }  
    });
    
    console.log(res);
    this.messages = res;
  }

}
