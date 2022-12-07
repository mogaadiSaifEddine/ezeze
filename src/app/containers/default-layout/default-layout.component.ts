import { Component, OnDestroy, OnInit } from '@angular/core';

import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

import { Subscription } from 'rxjs';
import { ChapitreService } from 'src/app/services/chapitre.service';
import { navItems } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
  public perfectScrollbarConfig = {
    suppressScrollX: true
  };

  userType = JSON.parse(localStorage.getItem('user_details')).profession;
  group_id = JSON.parse(localStorage.getItem('user_details')).group?.id;
  public navItems = navItems;
  loadingMenu = true;
  navSrvss: Subscription;
  constructor(private chapterService: ChapitreService, private translateService: TranslateService) {}


  ngOnInit() {
    if (this.group_id) {
      this.chapterService.getChaptersByGroup(this.group_id).subscribe((res) => {
        this.navItems = this.filterNavItemsByUser(this.userType);
        this.loadingMenu = false;
      });
    } else {
      this.loadingMenu = false;
      this.navItems = [...this.filterNavItemsByUser(this.userType)];
    }
    this.navItems = this.navItems.map((items) => {
      items.name = this.translateService.instant(items.name);
      return items;
    });
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.navItems = this.navItems.map((items) => {
        items.name = this.translateService.instant(items.name);
        return items;
      });
    });
  }
  filterNavItemsByUser(userType): any[] {
    if (userType === 'parent')
      return this.navItems.filter((nav) => {
        return nav?.url?.includes('parent');
      });
    if (userType === 'student') return this.navItems.filter((nav) => ['modules', 'revision', 'clubs', 'chat'].some((el) => nav.id.includes(el)));
    if (userType === 'teacher') return this.navItems.filter((nav) => ['modules', 'chapter', 'Clubs', 'chat'].some((el) => nav.id.includes(el)));
    // if (userType === 'student') return this.navItems.filter((nav) => ['Modules', 'Révision', 'Clubs', 'Messagerie'].some((el) => nav.id.includes(el)));
    if (userType === 'admin') return this.navItems;
    return [];
  }
  translate(item): void {
    const trans = this.translateService.instant(`${item.name}`);
    if (trans !== `${item.name}`) {
      item.name = trans;
    }
  }
  ngOnDestroy(): void {
    if (this.navSrvss) {
      this.navSrvss.unsubscribe();
    }
  }
}
