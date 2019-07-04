import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SuperTabs } from 'ionic2-super-tabs'; 
// import { ContactserviceProvider } from '../../providers/contactservice/contactservice';
import { SmsServiceProvider } from '../../providers/sms-service/sms-service';

@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {
  // searchQuery: string;
  // contactPageActive: boolean;
  pages = [
    { pageName: 'ComposePage', title: 'Write New', icon: 'create', id: 'composeTab' },
    { pageName: 'InboxPage', title: 'Inbox', icon: 'md-mail', id: 'inboxTab' },
    { pageName: 'SentboxPage', title: 'Sent Messages', icon: 'md-paper-plane', id: 'sentboxTab' },
    // { pageName: 'ContactsPage', title: 'Contacts', icon: 'md-person', id: 'contactsTab' },
  ];

  selectedTab = 0;
  @ViewChild(SuperTabs) superTabs: SuperTabs;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    /*private contactService: ContactserviceProvider, */ private smsService: SmsServiceProvider) {

      
    }
    

  // searchContact(q) {
  //   this.contactService.searchContact(this.searchQuery);
  // }

  async reloadMessages(refresher) {
    await this.smsService.loadAllMessages(true).then( res => {
      refresher.complete();
    });
    // refresher.complete();
  }

  onTabSelected(ev: any) {
    // if(ev.id == "contactsTab") {
    //   this.contactPageActive = true;
    // } else {
    //   this.contactPageActive = false;
    // }

    this.selectedTab = ev.index;
    this.superTabs.clearBadge(this.pages[ev.index].id);
    // console.log("Page id: ", ev.id);
    
} 

}
