import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { EncryptorProvider } from '../providers/encryptor/encryptor';
import { DecryptorProvider } from '../providers/decryptor/decryptor';
import { SMS } from '@ionic-native/sms';

import { SmsServiceProvider } from '../providers/sms-service/sms-service';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { TextMaskModule } from 'angular2-text-mask';
// import { FormatDatePipe  } from '../pipes/format-date/format-date';

import { AES256 } from '@ionic-native/aes-256';
import { Contacts } from '@ionic-native/contacts';
import { SmsProvider } from '../providers/sms/sms';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { UserserviceProvider } from '../providers/userservice/userservice';
import { SQLite } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { IonicStorageModule } from '@ionic/storage';
import { ContactserviceProvider } from '../providers/contactservice/contactservice';
import { HttpModule } from '@angular/http';

// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { AngularFireModule } from 'angularfire2';
// import { config } from './app.firebaseConfig';


@NgModule({
  declarations: [
    MyApp, 
    // FormatDatePipe
  ],
  imports: [

    // AngularFireModule.initializeApp(config),
    // AngularFireDatabaseModule,
    TextMaskModule,
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    SuperTabsModule.forRoot(),
    IonicStorageModule.forRoot({
      name: '__aesApp',
      driverOrder: ['sqlite', 'localstorage', 'indexeddb', 'websql']
    }),
  
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EncryptorProvider,
    DecryptorProvider,
    SmsServiceProvider,
    SMS,
    AndroidPermissions,
    AES256,
    Contacts,
    SmsProvider,
    UserserviceProvider,
    ContactserviceProvider,
    SQLite,
    SQLitePorter
    
  ]
})
export class AppModule {
}
