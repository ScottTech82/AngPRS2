import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemService } from 'src/app/common/system.service';
import { Vendor } from 'src/app/vendor/vendor.class';
import { VendorService } from 'src/app/vendor/vendor.service';
import { Product } from '../product.class';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  pageTitle: string = "-- Create New Product --";
  DetailPage: boolean = false;
  prod: Product = new Product;
  vendor: Vendor[] = [];
  message: string = "";

  constructor(
    private prodsvc: ProductService,
    private vendsvc: VendorService,
    private router: Router,
    private sys: SystemService
  ) { }

  create(): void{
    if(this.sys.user.username !== 'Guest') {
    this.prodsvc.create(this.prod).subscribe({
      next: (res) => {
        console.debug("Product created");
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
    this.vendsvc.list().subscribe({
      next: (res) => {
        console.debug("Vendors:", res);
        this.vendor = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
