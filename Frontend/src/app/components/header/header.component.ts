import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  public miToken: number;

  constructor(private router: Router, private menu: MenuController) { this.miToken = 0; }

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

  public toggleMenu()  {
    this.menu.toggle();
  }

}
