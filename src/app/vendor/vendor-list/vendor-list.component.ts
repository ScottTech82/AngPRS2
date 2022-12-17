import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/common/system.service';
import { User } from 'src/app/user/user.class';
import { Vendor } from '../vendor.class';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {


  pageTitle: string = "-- The Vendor List --";
  vend: Vendor[] = [];
  admin!: User;
  searchCrit: string = "";
  sortColumn: string = "id";
  sortAsc: boolean = true;

  constructor(
    private vendsvc: VendorService,
    private sys: SystemService
  ) { }

  sortBy(column: string): void {
    if(column === this.sortColumn) {
      this.sortAsc = !this.sortAsc;
      return;
    }
    this.sortColumn = column;
    this.sortAsc = true;
  }

  ngOnInit(): void {
    this.sys.chkLogin();
    this.vendsvc.list().subscribe({
      next: (res) => {
        //console.debug("Vendors:", res);
        this.vend = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
    this.admin = this.sys.user;
  }

}
