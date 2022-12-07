import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MinimizedUser } from 'src/app/model/User';
import { map, startWith } from 'rxjs/operators';
import { ClubService } from 'src/app/service/club.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public userBarForm: FormGroup;
  userCtrl = new FormControl('');
  minimizedUsers: MinimizedUser[];
  filteredUsers: Observable<MinimizedUser[]>;

  messagesList = [];
  message = '';
  loadingMessages;
  loadingSendMessage;

  constructor(private readonly clubService: ClubService, private fb: FormBuilder) {
    this.filteredUsers = this.userCtrl.valueChanges.pipe(
      startWith(''),
      map((user) => (user ? this._filterUsers(user) : this.minimizedUsers.slice()))
    );
  }

  initForm() {
    this.userBarForm = this.fb.group({
      selectedUser: ['', [Validators.required]]
    });
  }

  private _filterUsers(value: string): MinimizedUser[] {
    const filterValue = value.toLowerCase();

    return this.minimizedUsers.filter((state) => state.name.toLowerCase().includes(filterValue));
  }

  loadMinimizedUsers() {
    this.clubService.getMinimizedUsers().subscribe((users) => {
      this.minimizedUsers = users;
    });
  }
  ngOnInit(): void {
    // this.resizeService?.isMobal.subscribe((res) => {
    //   this.isMobal = res;
    // });
    this.initForm();
    this.loadMinimizedUsers();
    this.loadMessages();
  }

  loadMessages() {
    // this.scoreboardService.getMessagesList(this.game.game_code_hash).subscribe((res: any) => {
    //   this.messagesList = res.slice().reverse();
    //   this.loadingMessages = false;
    // });
    this.clubService.getMessagesList(1, 2).subscribe((res: any) => {
      this.messagesList = res.slice();
      this.loadingMessages = false;
    });
  }

  sendMessage() {
    this.loadingSendMessage = true;
    // this.scoreboardService.sendMessage(this.game.game_code_hash,{text:this.message}).subscribe((res)=>{
    //   this.message="";
    //   this.loadingSendMessage=false
    //   this.loadMessages()
    // })
  }
}
