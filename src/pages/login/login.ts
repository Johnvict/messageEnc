import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Events, ActionSheetController, AlertController, Platform } from "ionic-angular";
import { UserDetail } from "../../models/interfaces";
import { UserserviceProvider } from "../../providers/userservice/userservice";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  userDetail = {} as UserDetail;
  userData:any = {};
  userExists: boolean = false;
  usePin: boolean = false;
  counter: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userservice: UserserviceProvider,
    private events: Events,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private platform: Platform
  ) {
    this.events.subscribe("Go To RegisterPage", () => {
      this.navCtrl.setRoot("RegisterPage");
    });


  }

  ionViewDidLoad() {
     this.userservice.getUser().then( data => {
        this.userData = data;
     }); //  User detail from the database
  }

  async loginUser() {
    // this.userservice.showToast("PassWord: "+this.userData.password+" Pin: "+this.userData.pin);
    if (this.usePin) {
      if (this.userData.pin == this.userDetail.pin) {
        this.navCtrl.setRoot("LandingPage");
      } else {
        this.userservice.showToast("Invalid Pin");
      }

    } else {
      if (this.userData.password == this.userDetail.password) {
        this.navCtrl.setRoot("LandingPage");
      } else {
        this.userservice.showToast("Invalid Password");
      }
    }
    
    this.userDetail.password = null;
    this.userDetail.pin = null;
  }
  showOptions() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Help',
      buttons: [
        {
          text: 'Login With Pin',
          handler: () => {
            this.usePin = true;
          }
        },
        {
          text: 'Login With Password',
          handler: () => {
            this.usePin = false;
          }
        },
        {
          text: 'I Forgot My Password & Pin',
          handler: () => {
            // actionSheet.dismiss();
            this.forgotPasswords();
          }
        },{
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  forgotPasswords() {
  const alert = this.alertCtrl.create({
    title: 'Reset Your Account Details',
    inputs: [
      {
        name: 'email',
        placeholder: 'Email',
        type: 'text'
      },
      {
        name: 'secretWord',
        placeholder: 'Secret Single Word',
        type: 'text'
      },
      {
        name: 'password',
        placeholder: 'New Password',
        type: 'text'
      },
      {
        name: 'pin',
        placeholder: 'New Pin',
        type: 'text'
      },
      {
        name: 'newEmail',
        placeholder: 'Update Your Email',
        type: 'text'
      },
      {
        name: 'word',
        placeholder: 'New Secret Word',
        type: 'text'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Save',
        handler: data => {
          console.log("Data: ", this.userData);
          console.log("Enetered Data: ", data);
          if(
            (data.email != null) &&
            (data.secretWord != null) &&
            (data.word != null) &&
            (data.password != null) &&
            (data.pin != null) &&
            (data.newEmail != null) 
          ) {
              if ((this.userData.email.toLowerCase() == data.email) && (this.userData.securityQuestion.toLowerCase() == data.secretWord)) {
                this.userDetail = {
                  email: data.newEmail,
                  password: data.password,
                  pin: data.pin,
                  securityQuestion: data.word
                }
                this.userservice.createUser(this.userDetail).then( res => {
                  this.userservice.showToast("Account Details Updated Successfully");
                });
              } else {
                this.counter++
                this.userservice.showToast("Verification Unsuccessfull");
                
                if(this.counter == 5){
                  this.userservice.showToast("Sorry, It seems you are an intruder", 'middle');
                  setTimeout(() => {
                    this.platform.exitApp();
                  }, 4000);
                } else {
                  let count = 5 - this.counter;
                  this.userservice.showToast("Wrong Details! You have "+count+ " trials left!", 'middle');
                  data.email = '';
                  data.secretWord = '';
                }
              }
            }
          }
        }
      ]
    });
    alert.present();
    
  }
  
}
