import { ToastController, Events, LoadingController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { UserserviceProvider } from '../userservice/userservice';
import { ContactserviceProvider } from '../contactservice/contactservice';


declare var SMS: any;

@Injectable()
export class SmsServiceProvider {
  contactsFound = [];
  inboxMessages:any = [];
  sentboxMessages:any = [];
  results: any = [];

  constructor(public toastCtrl: ToastController, private userService: UserserviceProvider,
    public events: Events, private loadingCtrl: LoadingController,
    private contactService: ContactserviceProvider) {
      this.loadAllMessages();
      // console.log("This SMS-SERVICE IS WORKING");
      
  }

  async loadAllMessages(refresher?) {
    if(refresher) {
      return new Promise ((resolve, reject) => {
          this.getInboxSMS();
          this.getSentSMS(); 
          resolve(true);
      });  
    } else {
      let loader = await this.loadingCtrl.create({
        content: 'Loading Messages'
      });
      await loader.present();
      await this.contactService.searchContact('').then( data => {
        this.contactsFound = data;
      }).then(  _ => {
        this.getInboxSMS();
        this.userService.showToast("Inbox Messages Loaded Completely")
      }).then(  _ => {
        this.getSentSMS();
        this.userService.showToast("Sent Messages Loaded Completely")
      }).then( _ => {
        loader.dismiss();
      });
  
      this.userService.checkForUser();
    }
  }

  //  name: contactsFound[i].displayName
  //  number: contactsFound[i].phoneNumbers[j].value
  
  readListSMS() {  
    console.log("readListSMS."); 
    let filter = { 
      box : 'inbox' , // 'inbox' (default), 'sent', 'draft' 
      indexFrom : 0 , // Start from index 0.
      maxCount : 200 , // Count of SMS to return each time.
    }; 
    return new Promise((resolve, reject) => {
      if (SMS)SMS.listSMS(filter,(listSMS) => { 
        resolve(listSMS);

      },Error => { 
        reject(Error);
      }); 
    });
  } 
  
  readSentSMS() {  
    // console.log("readListSMS."); 
    let filter = { 
      box : 'sent' , // 'inbox' (default), 'sent', 'draft' 
      indexFrom : 0 , // Start from index 0.
      maxCount : 200 , // Count of SMS to return each time.
    }; 
    return new Promise((resolve, reject) => {
      if (SMS)SMS.listSMS(filter,(listSMS) => { 
        resolve(listSMS);

      },Error => { 
        reject(Error);
      }); 
    });
  } 
    
  waitingForSMS() {
    return new Promise((resolve, reject) => {
      if (SMS)SMS.startWatch(() => { 
        console.log('Waiting for SMS...'); 
      },Error => { 
        console.log('Error waiting for SMS.'); 
      });      
      document.addEventListener('onSMSArrive', (e: any ) => { 
        var sms = e.data; 
        console.log({mensaje_entrante:sms});    
        this.events.publish('onSMSArrive', sms);   
        resolve(sms);
      }); 
    });
  }
  
  getInboxSMS() {
    this.readListSMS()
    .then(listSMS => {
      this.results = listSMS;
      this.groupInboxMessabesByAddress();
    })
  }

  async groupInboxMessabesByAddress() {
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
    
    for(let m in res) {
      for(let i in this.contactsFound) {
        for(let j in this.contactsFound[i].phoneNumbers) {
          if(res[m].address == this.contactsFound[i].phoneNumbers[j].value) {
            res[m].address = this.contactsFound[i].displayName;
            res[m].name = this.contactsFound[i].displayName;
          }
        }
      }
    }
    this.inboxMessages = res;

    this.events.publish("SMS ready");
  }

  getSentSMS() {
    this.readSentSMS()
    .then(listSMS => {
      //console.log(listSMS);
      this.results = listSMS;
      this.groupSentMessagesByAddress();

    })
  }

  async groupSentMessagesByAddress() {
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

    for(let m in res) {
      for(let i in this.contactsFound) {
        for(let j in this.contactsFound[i].phoneNumbers) {
          if(res[m].address == this.contactsFound[i].phoneNumbers[j].value) {
            res[m].address = this.contactsFound[i].displayName;
            res[m].name = this.contactsFound[i].displayName;
          }
        }
      }
    }
    
    this.sentboxMessages = res;
  }

}
