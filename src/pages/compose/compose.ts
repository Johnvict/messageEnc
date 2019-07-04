import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Platform,
  Events
} from "ionic-angular";
import { Message } from "../../models/interfaces";
import { EncryptorProvider } from "../../providers/encryptor/encryptor";
import { DecryptorProvider } from "../../providers/decryptor/decryptor";
import { SmsProvider } from "../../providers/sms/sms";
import { SmsServiceProvider } from "../../providers/sms-service/sms-service";

@IonicPage()
@Component({
  selector: "page-compose",
  templateUrl: "compose.html"
})
export class ComposePage {
  messageDetail = {} as Message;
  encrypted: any;

  constructor(
    public plt: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    private smsProvider: SmsProvider,
    private smsService: SmsServiceProvider,
    public encryptProvider: EncryptorProvider,
    public decryptProvider: DecryptorProvider
  ) {}

  // ionViewDidLoad() {
    
  // }

  async send() {
    if (this.messageDetail.key == null){
      this.encryptProvider.showToast("Please specify an Encryption Key");
    } else if(this.messageDetail.message == null){
      this.encryptProvider.showToast("Sorry, you can't send an Empty Mesage");
    } else {
      if((this.messageDetail.key != null) && (this.messageDetail.message != null)) {
        this.encrypted =  await this.encryptProvider.prepareMessage(this.messageDetail.key, this.messageDetail.message);
        console.log("Encrypted With PAss: ", this.encrypted);
        
        await this.smsProvider.sendSMS(this.messageDetail.recipient, this.encrypted);
        await this.smsService.loadAllMessages();
        this.messageDetail = await null;
      } else {
        this.encryptProvider.showToast("Please fill all required inputs before pressing the send button");
      }
    }
  }

 
}
