import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { UserDetail } from '../../models/interfaces';
import { UserserviceProvider } from '../../providers/userservice/userservice';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  userDetail = {} as UserDetail;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private userservice: UserserviceProvider, private loadingCtrl: LoadingController) {
  }

  async createUserAccount() {
    if ((this.userDetail.password != null )&& (this.userDetail.pin != null) && (this.userDetail.email != null) && (this.userDetail.email != null)) {
      let loader = await  this.loadingCtrl.create({
        content: "Please wait.."
      });
      loader.present();
  
      await this.userservice.createUser(this.userDetail).then( data => {
        this.userservice.updateUserExistence('true');
        this.userservice.getUser().then( _ => {
          
          loader.dismiss();
          this.navCtrl.setRoot("LoginPage");
          this.userservice.showToast("Account Setup Completed Successfully");
        });
  
      });
    } else {
      this.userservice.showToast("Please Enter all the details correctly");
    }
  }

}
