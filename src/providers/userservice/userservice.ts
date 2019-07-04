import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import 'rxjs/add/operator/map';
import { BehaviorSubject } from "rxjs/Rx";
import { SQLitePorter } from "@ionic-native/sqlite-porter";
import { Storage } from "@ionic/storage";
import { Platform } from "ionic-angular/platform/platform";
import { UserDetail } from "../../models/interfaces";
import { ToastController, Events } from "ionic-angular";


@Injectable()
export class UserserviceProvider {
  userDetail = {} as UserDetail;
  userExists: boolean = false;
  database: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;

  constructor(
    public http: Http,
    private sqlitePorter: SQLitePorter,
    private sqlite: SQLite,
    private storage: Storage,
    private platform: Platform,
    private toastCtrl: ToastController,
    private events: Events
  ) {
    this.databaseReady = new BehaviorSubject(false);

    // this.platform.ready().then(() => {
    //   console.log("REady Platform USerService");
      
    //   this.sqlite
    //     .create({
    //       name: "aesUser.db",
    //       location: "default"
    //     })
    //     .then((db: SQLiteObject) => {
    //       this.database = db;
    //       this.storage.get("database_filled").then(val => {
    //         if (val) {
    //           this.databaseReady.next(true);
    //           this.checkForUser();
    //         } else {
    //           this.fillDatabase();
    //         }
    //       });
    //     });
    // });

    this.checkForUser();
  }

  async checkForUser() {
    await this.getUserExistenceStatus().then(confirm => {
      if(confirm){
        // this.showToast("USer Exists");
        this.getUser();
      } else {
        // this.showToast("USer Does not exist");
        this.events.publish("Go To RegisterPage");
      }
    });
  }

  fillDatabase() {
    // fillDatabase() {
    //   this.http.get('assets/dummyDump.sql')
    //   .map( res => res.text() )
    //   .subscribe(sql => {
    //     this.sqlitePorter.importSqlToDb(this.database, sql)
    //     .then( data => {
    //       this.updateUserExistence('false');
    //       this.databaseReady.next(true);
    //       this.storage.set('database_filled', true);
    //       this.showToast("Database Filled");
  
    //       this.events.publish("Go To RegisterPage");
    //     })
    //     .catch( e => this.showToast("Something Went Wrong: "+ e))
    //   });
    // }
  }

  createUser(data: UserDetail) {
    return this.storage.set("aesUser", data).then(res => {
      return res;
    });

  // let info = [data.password, data.pin, data.securityQuestion, data.email];
  // return this.database
  //   .executeSql(
  //     "INSERT INTO aesUser (password, pin, securityQuestion, email)",
  //     info
  //   )
  //   .then(res => {
  //     return res;
  //   });
  }

  async updateUserExistence(value:string) {
    return this.storage.set("aesUserExists", value).then(  res => {
      return res;
    });
    
    // let info = await [ value ];
    // return this.database
    //   .executeSql(
    //     "INSERT INTO aesUserExists (userExists)",
    //     info
    //   )
    //   .then(res => {
    //     return res;
    //   });
  }

  async getUserExistenceStatus() {
    return this.storage.get("aesUserExists").then( data => {
     if(data != null) {
        if(data) {
          this.userExists = true;
          // this.showToast("User Exists is true: "+ "Var. UserExists: "+this.userExists+ "Database Val:" + data);
          return this.userExists;
        } else {
          this.userExists = false;
          // this.showToast("User Exists is False: "+ "Var. UserExists: "+ this.userExists+ "Database Val:" + data);
          return this.userExists;
        }
      } else {
        this.storage.set("aesUserExists", false);
     }
    });

    // return this.database.executeSql("SELECT* FROM aesUserExists", []).then(data => {
    
    //   if (data.row.length > 0) {
    //     for (var i = 0; i < data.rows.length; i++) {
    //      if (data.rows.item[i].userExists == 'true') {
    //        this.userExists = true;
    //        this.showToast("User Exists is true: "+ "Var. UserExists: "+this.userExists+ "Database Val:" + data.rows.item[i].userExists);
    //       } else {
    //         this.userExists = false;
    //         this.showToast("User Exists is False: "+ "Var. UserExists: "+ this.userExists+ "Database Val:" + data.rows.item[i].userExists);
    //      }
    //     }
    //   } else {
    //     this.updateUserExistence('false');
    //   }

    //   return this.userExists;
    // }, err => {
    //   this.showToast('Something Went Wrong: '+ err);
    //   return [];
    // });
  }

  getUser() {

    return this.storage.get("aesUser").then(data => {
      if (data != null) {
        this.userDetail = data;
        return this.userDetail;
      }
    });

    // return this.database.executeSql("SELECT* FROM aesUser", []).then(data => {
    //   if (data.row.length > 0) {
    //     for (var i = 0; i < data.rows.length; i++) {
    //       this.userDetail = {
    //         password: data.rows.item[i].password,
    //         pin: data.rows.item[i].pin,
    //         securityQuestion: data.rows.item[i].securityQuestion,
    //         email: data.rows.item[i].email
    //       };
    //     }
    //   }

    //   return this.userDetail
    // }, err => {
    //   this.showToast('Something Went Wrong: '+ err);
    //   return [];
    // });
  }

  // getDatabaseState() {
  //   return this.databaseReady.asObservable();
  // }

  showToast(text:string, position?:string) {
    const toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: position == null ? "bottom" : position,
    });
    toast.present();
  }
}
