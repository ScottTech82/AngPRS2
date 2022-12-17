import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from 'src/app/common/system.service';
import { User } from 'src/app/user/user.class';
import { Vendor } from 'src/app/vendor/vendor.class';
import { VendorService } from 'src/app/vendor/vendor.service';
import { Product } from '../product.class';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  pageTitle: string = "-- Product Details --";
  DetailPage: boolean = true;
  prod!: Product;
  verifyRemoveButton: boolean = false;
  vend: Vendor[] = [];
  admin!: User;
  message: string = "";

  constructor(
    private prodsvc: ProductService,
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
    this.prodsvc.remove(this.prod.id).subscribe({
      next: (res) => {
        console.debug("Product deleted");
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
        console.debug("Product:", res);
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
    this.admin = this.sys.user;
  }
}
