import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';
import { TokenserviceService } from '../services/tokenservice.service';
import { UserService } from '../services/userservice.service';

@Component({
  selector: 'app-activecompte',
  templateUrl: './activecompte.component.html',
  styleUrls: ['./activecompte.component.scss']
})
export class ActivecompteComponent implements OnInit {
  constructor(private userserivce: UserService, private tokenservice: TokenserviceService) {}
  userconnected: string;

  ngOnInit(): void {
    this.activecommpte();
  }
  user: User;
  data: any;
  username!: string;
  currentuser: any = UserService.currentuser;

  activecommpte() {
    this.userserivce.Activecompte('amineboj').subscribe((res) => {});
  }
  getuser() {
    let username;
    this.userserivce.getUser(username);
  }
}
