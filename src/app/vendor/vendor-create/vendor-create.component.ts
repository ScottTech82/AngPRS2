import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemService } from 'src/app/common/system.service';
import { Vendor } from '../vendor.class';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendor-create',
  templateUrl: './vendor-create.component.html',
  styleUrls: ['./vendor-create.component.css']
})
export class VendorCreateComponent implements OnInit {

  pageTitle: string = "-- Create New Vendor --"
  vend: Vendor = new Vendor;
  DetailPage: boolean = false;
  message: string = "";

  constructor(
    private vendsvc: VendorService,
    private router: Router,
    private sys: SystemService
  ) { }

  create(): void {
    if(this.sys.user.username !== 'Guest'){
      this.vendsvc.create(this.vend).subscribe({
        next: (res) => {
          console.debug("Vendor created.");
          this.router.navigateByUrl("/vendor/list");
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
    else {
      this.message = "**This button is disabled when logged in as a guest**";
    }

  }
  ngOnInit(): void {
    this.sys.chkLogin();
  }

}
