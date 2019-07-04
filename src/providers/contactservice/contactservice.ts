import { Injectable } from '@angular/core';
import { Contacts, IContactFindOptions, ContactFieldType } from '@ionic-native/contacts';
import { Events } from 'ionic-angular';


@Injectable()
export class ContactserviceProvider {
  contType: ContactFieldType[] = ["displayName"];
  contactsFound:any = [];
  constructor(private contacts: Contacts, private events: Events) {
    // this.searchContact('');
  }

  async searchContact(q) {
    const option: IContactFindOptions = {
      filter: q
    };
    
    return new Promise<any[]>((resolve, reject) => {
      this.contacts.find(this.contType, option).then(conts => {
        this.contactsFound =  conts;
        this.events.publish('contactSearched', this.contactsFound);   
        resolve(this.contactsFound);
      });
    });
      
  }
  
  //  return new Promise((resolve, reject) => {
    //  });

}
