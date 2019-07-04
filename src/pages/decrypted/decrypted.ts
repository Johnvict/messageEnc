import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-decrypted',
  templateUrl: 'decrypted.html',
})
export class DecryptedPage {
  message: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private viewCtrl: ViewController
    ) {
  }

  ionViewDidLoad() {

  }

  ionViewWillLoad() {
    this.message = (this.navParams.get('data'));
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
