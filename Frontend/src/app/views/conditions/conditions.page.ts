import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conditions',
  templateUrl: './conditions.page.html',
  styleUrls: ['./conditions.page.scss'],
})
export class ConditionsPage implements OnInit {

  private miToken: number = +localStorage.getItem('personalToken')!;

  constructor(private router: Router) { }

  ngOnInit() {

    if(this.miToken <= 0){
      this.router.navigateByUrl('/login');
    }

    
  }

}
