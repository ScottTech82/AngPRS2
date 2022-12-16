import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SystemService } from 'src/app/common/system.service';
import { User } from '../user.class';
import { UserService } from '../user.service';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  pageTitle: string = "-- The User List --";
  users: User[] = [];
  admin!: User;
  searchCrit: string = "";
  sortColumn: string = "id";
  sortAsc: boolean = true;
  
  
  constructor(
    private usersvc: UserService,
    private sys: SystemService
  ) { }

  sortBy(column: string): void {
    if(column === this.sortColumn) {
      this.sortAsc = !this.sortAsc; //flip the sorting if already sorting.
      return;
    }
    this.sortColumn = column;
    this.sortAsc = true;
  }

  ngOnInit(): void {
    this.sys.chkLogin();
    this.usersvc.list().subscribe({
      next: (res) => {
        console.debug("Users:", res);
        this.users = res;
      },
      error: (err) => {
        console.error(err);
      }
    });

    this.admin = this.sys.user;
    console.debug(this.admin);
  }

}
