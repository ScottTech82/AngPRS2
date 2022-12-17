import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from 'src/app/common/system.service';
import { User } from 'src/app/user/user.class';
import { Vendor } from '../vendor.class';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendor-change',
  templateUrl: './vendor-change.component.html',
  styleUrls: ['./vendor-change.component.css']
})
export class VendorChangeComponent implements OnInit {

  pageTitle: string = "-- Vendor Update --";
  DetailPage: boolean = false;
  vend!: Vendor;
  admin!: User;
  message: string = "";

  constructor(
    private vendsvc: VendorService,
    private router: Router,
    private route: ActivatedRoute,
    private sys: SystemService
  ) { }

  update(): void {
    if(this.sys.user.username !== 'Guest') {
      this.vendsvc.change(this.vend).subscribe({
        next: (res) => {
          console.debug("Vendor updated.");
          this.router.navigateByUrl("/vendor/list");
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
    }
    else {
      this.message = "**This button is disabled when logged in as a guest**";
    }
  }

  ngOnInit(): void {
    this.sys.chkLogin();
    let id = +this.route.snapshot.params["id"];
    this.vendsvc.get(id).subscribe({
      next: (res) => {
        //console.debug("Vendor:",res);
        this.vend = res;
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
