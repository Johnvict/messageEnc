import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, ModalController, AlertController } from 'ionic-angular';
import * as moment from 'moment';
import { DecryptorProvider } from '../../providers/decryptor/decryptor';
import { EncryptorProvider } from '../../providers/encryptor/encryptor';
import { DecryptedPage } from '../decrypted/decrypted';


@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {
  messages: any;
  counter: number = 0;
  key:string;

  constructor(
    private events: Events,
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    public navParams: NavParams,
    private decryptProvider: DecryptorProvider,
    private encryptProvider: EncryptorProvider,
    ) {
    this.messages = this.navParams.get('message');
    //console.log('constructor SmsDetailsPage');
    //console.log(this.messages);
    this.groupMessabesByDate();
    this.removeDuplicates();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SmsDetailsPage');
  }

  groupMessabesByDate() {
    let messages = this.messages.info;
    //console.log("groupMessagesByDate");
    //console.log(messages);
    let res = messages.reduce(function(res, currentValue) {
      if (res.indexOf(currentValue.date) === -1 ) {
        res.push(currentValue.date);
      }
      //console.log(res);
      return res;
    }, []).map(function(date) {
      return {
        date: moment(date).format("DD/MM/YYYY"),
        info: messages.filter(function(_el) {
          return moment(_el.date).isSame(moment(date), 'day');
        }).map(function(_el) { return _el; })
      }  
    });
    
    //console.log(res);
    this.messages = res;
  }

  removeDuplicates() {
    let noDupeObj = {} //Create an associative array. It will not accept duplicate keys.
    for (let i = 0, n = this.messages.length; i < n; i++) {
       //Store each object as a variable. This helps with clarity in the next line.
      var item = this.messages[i];
      // This is the critical step.
      // Here, you create an object within the associative array that has a key composed of the two values 
      // from the original object. 
      // Since the associative array will not allow duplicate keys, and the keys are determined by the 
      // content, then all duplicate content are removed. 
      // The value assigned to each key is the original object which is along for the ride and used 
      // to reconstruct the list in the next step.
      noDupeObj[item.date] = item; 
    }

    //Recontructs the list with only the unique objects left in the doDupeObj associative array.
    let index = 0;
    let uniqueMessages = [];
    for (let item in noDupeObj) {
      uniqueMessages[index++] = noDupeObj[item]; //Populate the array with the values from the noDupeObj.
    }

    this.messages = uniqueMessages;
    //console.log(this.messages);
  }

  async decryptMessage(text:string) {
    const alert = this.alertCtrl.create({
      title: 'Enter Decryption Key',
      inputs: [
        {
          name: 'key',
          placeholder: 'decryption key',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Next',
          handler: data => {
            console.log("Enetered Data: ", data);
            if(data.key != null) {
              this.key = data.key;
              this.decryptProvider.decryptText(text, this.key);
            }
          }
        }
        ]
      });
      alert.present();
    this.counter = 0;

    this.encryptProvider.showToast(text);
    
    await this.events.subscribe("Decrypted successfully", () => {
      this.counter++;
      if(this.counter == 1){
        const myModal =  this.modalCtrl.create('DecryptedPage', { data: this.decryptProvider.decryptedText })
        myModal.present();
      }
    });

    setTimeout(() => {
      // loading.dismiss();
    }, 5000);

  }

}
