import { AuthProvider } from './../../providers/auth/auth';
import { NavParams, Tabs, Events } from 'ionic-angular';
import { AddJobPage } from './../add-job/add-job';
import { Component, ViewChild } from '@angular/core';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('companyTabs') companyTabRef: Tabs;
  @ViewChild('influTabs') influTabRef: Tabs;


  tab1Root = 'HomePage';
  tab2Root = 'AddJobPage';
  tab3Root = 'ChatPage';
  tab4Root = 'ProfilePage';


  tab5Root = 'HomeInfluencerPage';
  tab6Root = 'AddjobInfluPage';
  tab7Root = 'ChatPage';
  tab8Root = 'ProfilePage';

  constructor(public navParams: NavParams,
    public auth: AuthProvider,
    public events: Events) {
    this.events.subscribe('SelectTab', (index) => {
      if(this.auth.getUserDetails().user_type==1){
        this.companyTabRef.select(index);
      }else{
        this.influTabRef.select(index);
      }
    })
  }
}
