import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  private miToken: number = +localStorage.getItem('personalToken')!;

  constructor(private router: Router) { }

  ngOnInit() {

    if(this.miToken > 0){
      this.router.navigateByUrl('/home');
    }

  }

}
