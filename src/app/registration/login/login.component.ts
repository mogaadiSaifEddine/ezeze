import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, NgZone, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterWrapperService } from 'src/app/services/toaster-wrapper.service';
import { UserService } from 'src/app/services/userservice.service';
import { TokenserviceService } from '../../services/tokenservice.service';
import { TranslateService } from '@ngx-translate/core';
import { MatStepper } from '@angular/material/stepper';
import { RevisionService } from 'src/app/services/revision.service';
import { ToastrService } from 'ngx-toastr';
import { fadeInOut } from 'src/app/fe-animations';
import { fromEvent, interval, merge, Observable, skipWhile, Subscription, switchMap, take, tap } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';

schemas: [CUSTOM_ELEMENTS_SCHEMA];

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeInOut]
})
export class LoginComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  // timer stopper
  public inactivityTimerEvent: Array<any>[] = [[document, 'click'], [document, 'wheel'], [document, 'scroll'], [document, 'mousemove'], [document, 'keyup'], [window, 'resize'], [window, 'scroll'], [window, 'mousemove']];
  inactivityTime: number = 1200;

  timeLapsedSinceInactivity: number = 0;
  // minute: number = this.padZero(0);
  // seconds: number = this.padZero(0);
  subscription: Subscription;
  observeable$: Observable<any>;
  mergedObservable$: Observable<any>;
  status = 'actif'


  isPasswordVisible = false;
  isSignupPasswordVisible = false;
  isSignupPasswordConfirmVisible = false;
  isRegisterPageActive = false;
  password: string;
  username: string;
  submitted = false;
  loginForm: FormGroup;
  signupStepAccountForm: FormGroup;
  signupStepPersonalForm: FormGroup;
  signupForm: FormGroup;
  minDate = new Date('01/01/1800');
  groupList: { id: number; name: string }[];

  get signupFormControls() {
    return this.signupForm.controls;
  }
  get signupStepAccountFormControls() {
    return this.signupStepAccountForm.controls;
  }
  get signupStepPersonalFormControls() {
    return this.signupStepPersonalForm.controls;
  }
  constructor(
    public _ngZone: NgZone,
    public _cd: ChangeDetectorRef,
    private router: Router,
    private fb: FormBuilder,
    private tokenservice: TokenserviceService,
    private userservice: UserService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private revisionSerivce: RevisionService,
    private ss : SharedService
  ) {}
  ngOnInit(): void {
    let observableArray$: Observable<any>[] = [];
    this.inactivityTimerEvent.forEach(x => {
      observableArray$.push(fromEvent(x[0], x[1]))
    })
    this.mergedObservable$ = merge(...observableArray$);
    this.isRegisterPageActive = history.state.isRegisterPageActive;
    this.userservice.getGroups().subscribe((groupList) => {
      this.groupList = groupList;
    });
    this.loginForm = this.fb.group({
      password: [],
      username: []
    });
    this.signupStepPersonalForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      datenaissance: ['/6/1985', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(8)]],
      sexe: ['', [Validators.required, Validators.minLength(4)]]
    });
    this.signupStepAccountForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmepassword: ['', [Validators.required, Validators.minLength(5)]]
    });
  }
  // padZero(digit: any) {
  //   return digit <= 9 ? '0' + digit : digit;
  // }


  createObserable(): void {
    this._ngZone.runOutsideAngular(() => {
      console.log('test');


      this.observeable$ = this.mergedObservable$
      .pipe(
        switchMap(ev => interval(1000).pipe(take      (this.inactivityTime))),

        tap(value => this.isItTimeToShowPopUp(value)),

        skipWhile((x) => {
          this.timeLapsedSinceInactivity = x;
          return x != this.inactivityTime - 1
        })
      );

      this.subscribeObservable();
    })

  }


  isItTimeToShowPopUp(val: number) {
    let timeLeftForInactive = this.inactivityTime - val;
    if (timeLeftForInactive <= 1200) {

      this.timeLapsedSinceInactivity = timeLeftForInactive;
      // this.minute = this.padZero(Math.floor(timeLeftForInactive / 13));
      // this.seconds = this.padZero(timeLeftForInactive % 13);


      this._cd.detectChanges();
      if (timeLeftForInactive === 600) {
        this.ss.studentStatus.next('inactif')
        console.log(this.ss.studentStatus.value);


      }
      console.log(timeLeftForInactive);

    }
  }

  subscribeObservable() {
    this.subscription = this.observeable$.subscribe((x) => {
      console.log(`subscribed for ${x + 1} sec`);
      this.unsubscribeObservable()

    })
  }

  unsubscribeObservable() {
    this.ss.studentStatus.next('disconected')
    this._ngZone.run(() => {
      this.tokenservice.logout()
    this.router.navigate(['/accueil'])
    })

    console.log('  unsubscriebd')
    this.subscription.unsubscribe();
  }

  startTimer() {
    this.createObserable();
    console.log('subscription started');
  }
  // stopTimer(event) {
  //   if (this.subscription && !this.subscription.closed) {
  //     this.minute = this.padZero(0);
  //     this.seconds = this.padZero(0);
  //     this.unsubscribeObservable();
  //   }
  // }
  login(): void {
    this.tokenservice.login(this.loginForm.value).subscribe({
      next: (data) => {
        let jwtToken = data.headers.get('Authorization')!;
        let userconnected = data.headers.get('userconnected')!;
        this.tokenservice.saveToken(jwtToken);
        this.tokenservice.saveConnectedUser(userconnected);
        this.userservice.getUser(userconnected).subscribe((res) => {
          UserService.currentuser = res;
          localStorage.setItem('user_details', JSON.stringify(res));
          this.revisionSerivce.modulesContent.next(res?.group?.chaptersList);
          console.log(res);
          if (res?.profession === 'student') {
            this.startTimer()
            this.router.navigate(['/revision/matieres']);
          } else if (res?.profession === 'teacher') {
            this.router.navigate(['/enseignant/chapter-list']);
          } else if (res?.profession === 'parent') {
            this.router.navigate(['/espace-parent']);
          } else if (res?.profession === 'admin') {
            this.router.navigate(['/dashboard']);
          }
          this.toastr.success('Welcome Again!', 'Toastr fun!');
        });
      },
      error: (err) => {
        console.log(err);

        this.toastr.error(this.translate.instant('error.check-connection'));
      }
    });
  }



  signup() {
    if (this.signupStepAccountForm.get('confirmepassword').value !== this.signupStepAccountForm.get('password').value) {
      this.toastr.error('Verif Your passwords ');
      return;
    }
    if (this.signupStepPersonalForm.valid && this.signupStepAccountForm.valid)
      this.userservice
        .signup({
          ...this.signupStepPersonalForm.value,
          ...this.signupStepAccountForm.value
        })
        .subscribe({
          next: (res) => {
            this.isRegisterPageActive = false;
          },
          error: (error) => {
            this.isRegisterPageActive = false;
          }
        });
  }
  keyPressNumbers(formControlName: string, event) {
    let charCode = event.which ? event.which : event.keyCode;
    let formControlValue = this.signupStepPersonalFormControls[formControlName].value;
    // Only Numbers 0-9 and +
    if (formControlValue.length > 15 || ((charCode !== 43 || (charCode === 43 && formControlValue[0] === '+')) && charCode < 48) || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
}
