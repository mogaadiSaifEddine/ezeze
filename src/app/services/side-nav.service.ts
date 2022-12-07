import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

const navItems: Array<any> = [
  {
    name: 'menu.dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },

    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'menu.your-profile'
  },
  {
    name: 'menu.profile',
    url: '/theme/colors',
    iconComponent: { name: 'cilUser' }
  },
  {
    name: 'menu.admin',
    url: '/admin-panel/coupons',
    iconComponent: { name: 'cilUser' }
  },

  // {
  //   name: 'menu.classroom',
  // //   title: true
  // // },
  // {
  //   name: 'Eleve',
  //   url: '/base/accordion',
  //   iconComponent: { name: 'cil-layers' }
  // },
  // {
  //   name: 'menu.classroom',
  //   url: '/base/cards',
  //   iconComponent: { name: 'cil-layers' }
  // },
  {
    name: 'menu.chapter-list',
    url: '/enseignant/chapter-list',
    iconComponent: { name: 'cil-layers' }

    // children: [
    //   {
    // name: 'EspaceEnseignant',
    // iconComponent: { name: 'cil-cursor' },
    // children: [
    //   {
    //     name: 'menu.chapter-list',
    //     url: '/enseignant/chapter-list'
    //   }
    //   // {
    //   //   name: 'AjouterExcercice',

    //   //   url: '/AjouterExcercice'
    //   // },
    //   // {
    //   //   name: 'ListeExercice',

    //   //   url: '/ListExercice'
    //   // }
    // ]
    //   }
    // ]
  },
  // {
  //   name: 'EspaceEnseignant',
  //   url: '/espaceEnseignant',
  //   iconComponent: { name: 'cil-layers' },

  // },
  // {
  //   name: 'AjouterChapitre',
  //   url: '/AjouterChapitre',
  //   iconComponent: { name: 'cil-layers' },

  // },
  // {
  //   name: 'Modifier',
  //   url: '/ModifierChapitre',
  //   iconComponent: { name: 'cil-layers' },
  // },
  // {
  //   name: 'AjouterEwcercice',
  //   url: '/AjouterExcercice',
  //   iconComponent: { name: 'cil-layers' },
  // },

  // {
  //   name: 'Professeur',

  //   iconComponent: { name: 'cil-layers' },
  //   children: [
  //     {
  //       name: 'EXERCICE',
  //       iconComponent: { name: 'cil-cursor' },
  //       children: [
  //         {
  //           name: 'Ajouter exercice',
  //           url: '/base/add'
  //         },
  //         {
  //           name: 'Afficher exercices',

  //           url: '/exercice/show'
  //         },
  //         {
  //           name: 'EspaceEnseignant',

  //           url: '/espace/prof'
  //         }
  //       ]
  //     }
  //   ]
  // },

  {
    name: 'menu.modules',
    title: true
  },
  {
    name: 'menu.revision',
    iconComponent: { name: 'cil-layers' }
  },

  {
    name: 'menu.clubs',
    url: '/clubs',
    iconComponent: { name: 'cil-layers' }
  },
  {
    name: 'menu.clubs',
    title: true
  },
  {
    name: 'menu.chat',
    url: '/chat',
    iconComponent: { name: 'cil-cursor' }
  }
];
@Injectable({
  providedIn: 'root'
})
export class SideNavService {
  navItems = navItems;
  constructor(private ts: TranslateService) {}

  translate(items): void {
    for (const item of items) {
      if ('key' in item) {
        const trans = this.ts.instant(`nav.${item.key}`);
        if (trans !== `nav.${item.key}`) {
          item.name = trans;
        }
      }
      if (item.children && item.children.length > 0) {
        this.translate(item.children);
      }
    }
  }

  ready(): Observable<Array<any>> {


    return of(navItems).pipe(
      map((items) => {
        this.translate(items);
        return items;
      })
    );
  }
}
