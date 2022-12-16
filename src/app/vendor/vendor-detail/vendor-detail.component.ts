import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from 'src/app/common/system.service';
import { User } from 'src/app/user/user.class';
import { Vendor } from '../vendor.class';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css']
})
export class VendorDetailComponent implements OnInit {

  pageTitle: string = "-- Vendor Details --";
  DetailPage: boolean = true;
  vend!: Vendor;
  verifyRemoveButton: boolean = false;
  admin!: User;
  message: string = "";

  constructor(
    private vendsvc: VendorService, 
    private router: Router,
    private route: ActivatedRoute,
    private sys: SystemService
  ) { }
  
  remove(): void {
    this.verifyRemoveButton = !this.verifyRemoveButton;
  }
  verifyRemove(): void {
    if(this.sys.user.username !== 'Guest') {
      this.vendsvc.remove(this.vend.id).subscribe({
        next: (res) => {
          console.debug("Vendor deleted.");
          this.router.navigateByUrl("/vendor/list");
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
    else {
      this.message = "**This button is disabled when logged in as a guest, but will remove the vendor and navigate back to the vendor list**";
    }
  }

  ngOnInit(): void {
    this.sys.chkLogin();
    let id = +this.route.snapshot.params["id"];
    this.vendsvc.get(id).subscribe({
      next: (res) => {
        console.debug("Vendor:", res);
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
