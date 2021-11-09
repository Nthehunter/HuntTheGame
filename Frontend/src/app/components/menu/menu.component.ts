import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})


export class MenuComponent implements OnInit {

  public miToken: number;

  constructor(private router: Router) { this.miToken = 0; }

  ngOnInit(): void {
    if (localStorage.getItem('personalToken')) {
      this.miToken = +localStorage.getItem('personalToken')!;
    }

    

  }

  public logout(): void {
    if (localStorage.getItem('personalToken')) {
      localStorage.removeItem('personalToken');
      this.router.navigate(['/sesion']).then(()=>{window.location.reload();});
    }
  }


}
