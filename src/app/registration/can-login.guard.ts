import { Injectable } from "@angular/core";
import {
  CanActivate, Router
} from "@angular/router";
import { TokenserviceService } from '../services/tokenservice.service';


@Injectable({
  providedIn: "root"
})
export class CanLoginGuard implements CanActivate {
  constructor(private tokenservice:TokenserviceService,private router:Router){}
  canActivate():boolean{
    if(this.tokenservice.loggedIn()){
      return true
    }else{
      this.router.navigate(['/accueil'])
      return false
    }

  }

}
