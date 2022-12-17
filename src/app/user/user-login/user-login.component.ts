import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemService } from 'src/app/common/system.service';
import { User } from '../user.class';
import { UserService } from '../user.service';

@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  username: string = "";
  password: string = "";
  message: string = "";
  message2: string = "";
  userguest: string = "Guest";
  guestpword: string = "g123";
  

  constructor(
    private sys: SystemService,
    private usersvc: UserService,
    private router: Router

  ) { }

  login(): void {
    this.sys.user = null;
    if(this.username === null || this.password === null) {
      this.message = "**Please enter a Username and Password**";
    }
    else { 
      this.usersvc.login(this.username, this.password).subscribe({
        next: (res) => {
          //console.debug("User:", res);
          this.sys.user = res;
          this.router.navigateByUrl("/user/list");
        },
        error: (err) => {
          if(err.status === 404) {
            this.message = "**The Username or Password entered is not found.**";
            this.message2 = "**Please re-check the information and try again or contact an Admin.**";
          }
          else {
            console.error(err);
          }
        }
      });
    }
  }

  guestlogin(): void {
    this.sys.user = null;
    this.usersvc.login(this.userguest, this.guestpword).subscribe({
      next: (res) => {
        this.sys.user = res;
        this.router.navigateByUrl("/user/list");
      },
      error: (err) => {
        if(err.status === 404) {
          this.message = "**The Username or Password entered does not exist.**";
          this.message2 = "**Please try again or contact an Admin.**";
        }
        else {
          console.error(err);
        }
      }
    })
  }

  ngOnInit(): void {
  }

}
