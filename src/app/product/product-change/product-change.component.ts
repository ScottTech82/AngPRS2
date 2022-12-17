import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from 'src/app/common/system.service';
import { Vendor } from 'src/app/vendor/vendor.class';
import { VendorService } from 'src/app/vendor/vendor.service';
import { Product } from '../product.class';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-change',
  templateUrl: './product-change.component.html',
  styleUrls: ['./product-change.component.css']
})
export class ProductChangeComponent implements OnInit {

  pageTitle: string = "-- Product Update --";
  DetailPage: boolean = false;
  prod!: Product;
  vendor: Vendor[] = [];
  message: string = "";

  constructor(
    private prodsvc: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private vendsvc: VendorService,
    private sys: SystemService
  ) { }

  update(): void {
    if(this.sys.user.username !== 'Guest') {
    this.prodsvc.change(this.prod).subscribe({
      next: (res) => {
        console.debug("Product udpated.");
        this.router.navigateByUrl("/product/list");
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
    let id = +this.route.snapshot.params["id"];
    this.prodsvc.get(id).subscribe({
      next: (res) => {
        console.debug("Product:",res);
        this.prod = res;
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
    this.vendsvc.list().subscribe({
      next: (res) => {
        console.debug("Vendor:", res);
        this.vendor = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
