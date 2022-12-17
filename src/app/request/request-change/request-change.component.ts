import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from 'src/app/common/system.service';
import { Request } from '../request.class';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-request-change',
  templateUrl: './request-change.component.html',
  styleUrls: ['./request-change.component.css']
})
export class RequestChangeComponent implements OnInit {

  pageTitle: string = "-- Request Update --";
  DetailPage: boolean = false;
  req!: Request;
  message: string = "";

  constructor(
    private reqsvc: RequestService,
    private router: Router,
    private route: ActivatedRoute,
    private sys: SystemService
  ) { }

  update(): void {
    if(this.req.status !== 'APPROVED') {
    this.reqsvc.change(this.req).subscribe({
      next: (res) => {
        console.debug("Request updated");
        this.router.navigateByUrl("/request/list");
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
    else {
      this.message = "**Approved requests cannot be changed**";
    }
  }

  ngOnInit(): void {
    this.sys.chkLogin();
    let id = +this.route.snapshot.params["id"];
    this.reqsvc.get(id).subscribe({
      next: (res) => {
        console.debug("Request:", res);
        this.req = res;
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

}
