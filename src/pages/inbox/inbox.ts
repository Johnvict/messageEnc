import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { SmsServiceProvider } from '../../providers/sms-service/sms-service';


@IonicPage()
@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html',
})
export class InboxPage {
  messages: any = [];
  results: any;

  constructor(
    public events: Events,
    public navParams: NavParams,
    public navCtrl: NavController,
    public smsService: SmsServiceProvider,
    public loadingCtrl: LoadingController
    ) {
      this.results = [];

      events.subscribe('onSMSArrive', (sms) => {
        console.log('onSMSArrive', sms);
        // this.smsService.getInboxSMS();
        this.readListSMS();
      });

      this.events.subscribe("SMS ready"), () => {
        this.messages = this.smsService.inboxMessages;
      }

      console.log("Inbox Loaded Again");
      

    }
    
    ionViewDidLoad() {      
      // this.readListSMS();
     this.messages = this.smsService.inboxMessages;
  }


  readListSMS() {
    let loading = this.loadingCtrl.create({
      content: "Loading SMS..."
    });

    this.smsService.readListSMS()
    .then(listSMS => {
      //console.log(listSMS);
      this.results = listSMS;
      this.groupMessabesByAddress();

      loading.dismiss();
    })
  }

  selectedMessage(message:any) {
    //console.log(message);
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
      //console.log(res);
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
