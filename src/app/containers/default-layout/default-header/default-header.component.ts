import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HeaderComponent } from '@coreui/angular';
import { TranslateService } from '@ngx-translate/core';
import { TokenserviceService } from '../../../services/tokenservice.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html'
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {

  public newMessages = new Array(4);
  public newTasks = new Array(5);
  public newNotifications = new Array(5);
  constructor(private tokenservice: TokenserviceService, private router: Router, private translate: TranslateService) {
    super();
  }
  userId = JSON.parse(localStorage.getItem('user_details')).user_id;
  userconnected: string;
  ngOnInit(): void {
    this.userconencte();
  }
  logout(): void {
    this.tokenservice.logout()
    this.router.navigate(['/accueil']);
  }
  userconencte() {
    this.userconnected = this.tokenservice.getUserconnected();
  }
  changeLang(lang) {
    this.translate.use(lang);
  }
}
