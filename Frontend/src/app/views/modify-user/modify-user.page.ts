import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.page.html',
  styleUrls: ['./modify-user.page.scss'],
})
export class ModifyUserPage implements OnInit {

  private miToken: number = +localStorage.getItem('personalToken')!;

  constructor(private router: Router) { }

  ngOnInit() {

    if(this.miToken > 0){
      this.router.navigateByUrl('/home');
    }

  }

}
