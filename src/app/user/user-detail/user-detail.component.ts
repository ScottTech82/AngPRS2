import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from 'src/app/common/system.service';
import { User } from '../user.class';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

    pageTitle: string = "-- User Details --";
    user!: User;
    DetailPage: boolean = true;
    showVerifButton: boolean = false;
    admin!: User;
    message: string = "";

  constructor(
    private usersvc: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private sys: SystemService
  ) { }

  remove(): void {
    this.showVerifButton = !this.showVerifButton;
  }

  verifyDeletion(): void {
    if(this.sys.user.username !== 'Guest') {
    this.usersvc.remove(this.user.id).subscribe({
      next: (res) => {
        console.debug("The User was deleted!");
        this.router.navigateByUrl("/user/list");
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
    else {
      this.message = "**This button is disabled when logged in as a guest, but will remove the user and navigate back to the User list**";
    }
  }

  ngOnInit(): void {
    this.sys.chkLogin();
    let id = +this.route.snapshot.params["id"];
    this.usersvc.get(id).subscribe({
      next: (res) => {
        //console.debug("User:", res);
        this.user = res;
      },
      error: (err) => {
        if(err.status === 404) {
          this.router.navigateByUrl("/misc/e404");
        }
        else {
          console.error(err);
        }
      }
    });
    this.admin = this.sys.user;
  }

}
