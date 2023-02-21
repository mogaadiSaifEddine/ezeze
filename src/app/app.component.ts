import { Component, OnInit } from '@angular/core';
import { ChildrenOutletContexts, NavigationEnd, Router } from '@angular/router';

import { Title } from '@angular/platform-browser';
import { IconSetService } from '@coreui/icons-angular';
import { TranslateService } from '@ngx-translate/core';
import { fadeInOut, pageFadeAnimation } from './fe-animations';
import { iconSubset } from './icons/icon-subset';
import { SharedService } from './services/shared.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-education',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [pageFadeAnimation, fadeInOut]
})
export class AppComponent implements OnInit {
  isLoading: boolean;
  loader: Subject<boolean> = this.sharedService.isLoading;

  constructor(
    private router: Router,
    private translate: TranslateService,

    private titleService: Title,
    iconSetService: IconSetService,
    private readonly contexts: ChildrenOutletContexts,
    private sharedService: SharedService
  ) {
    // iconSet singleton
    iconSetService.icons = { ...iconSubset };
    this.translate.setDefaultLang('fr');
    this.isLoading = true;
  }

  ngOnInit(): void {
    let lang = localStorage.getItem('lang');
    if (!lang) {
      localStorage.setItem('lang', 'fr');
      lang = this.translate.currentLang;
    }
    this.translate.onLangChange.subscribe((lang) => {
      localStorage.setItem('lang', lang.lang);
    });
    this.translate.use(lang).subscribe((val) => {
      this.titleService.setTitle(this.translate.instant('title'));
    });

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        return;
      }
    });
  }

  getRouteData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data;
  }
}
