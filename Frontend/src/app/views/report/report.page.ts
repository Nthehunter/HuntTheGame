import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  private miToken: number = +localStorage.getItem('personalToken')!;
  private validate: boolean;
  private ok: boolean;

  constructor(private router: Router) { }

  ngOnInit() {

    this.ok == false

    if (this.miToken <= 0) {
      this.router.navigateByUrl('/login');
    }
  }

  post(message: String) {



    if (message == "") {
      this.validate = false;
    }

    if (message.length < 10) {
      this.validate = false;
    } else {
      this.validate = true;

    }


  }

}
