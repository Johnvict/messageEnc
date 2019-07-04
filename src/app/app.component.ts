import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController, App} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AndroidPermissions } from '@ionic-native/android-permissions';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { MessagePage } from '../pages/message/message';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = "LoginPage";
  
  loader: any;
  counter: number = 0;

  pages: Array<{title: string, component: any}>;


  constructor(
    private app: App, 
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public androidPermissions:AndroidPermissions, 
    private toastCtrl: ToastController
    ) {
    this.initializeApp();

    platform.registerBackButtonAction(() => {
      let nav = app.getActiveNavs()[0];
      let active = nav.getActive();
      this.counter++;
      if(this.counter == 1) {
        const toast = this.toastCtrl.create({
          message: 'Press back  button once again to exit',
          duration: 2000,
          position: "middle"
        });
        toast.present();
      } else if (this.counter == 2) {
        platform.exitApp();
      }
      
      setTimeout(() => {
        this.counter = 0;
      }, 2000);

      if ((active.instance instanceof RegisterPage) || (active.instance instanceof LoginPage)) {
        // do NOTHING
      } else {
        this.nav.setRoot('LandingPage')
      }
      
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    let isApp = (!document.URL.startsWith('http') || document.URL.startsWith('http://localhost:8080'));
	  if (isApp) this.requestSMSPermissions();
  }

  requestSMSPermissions(){
    this .androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS)
    .then( success =>   {
      // this.encryptProvider.showToast( 'Permission Granted' )
    }, 
    err => this.androidPermissions.requestPermission( this.androidPermissions.PERMISSION.READ_SMS) 
    ); 

    this .androidPermissions.requestPermissions ([ this .androidPermissions.PERMISSION.READ_SMS]);
  }

}
