import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {

  private miToken: number;
  private UserId: number;

  constructor(private router: Router, private menu: MenuController) {

  }

  ngOnInit(): void {
    if (localStorage.getItem('personalToken')) {
      this.miToken = +localStorage.getItem('personalToken')!;
    }

    if (localStorage.getItem('UserId')) {
      this.miToken = +localStorage.getItem('UserId')!;
    }

  }

  closeMenu() {
    this.menu.close()
  }

  openMenu() {
    this.menu.open();
  }

  toHome() {
    this.router.navigateByUrl('/home').then(() => { window.location.reload(); });
  }

  toMyGames() {
    this.router.navigateByUrl('/my-games').then(() => { window.location.reload(); });
 
  }

  public logout(): void {
    if (localStorage.getItem('personalToken')) {
      localStorage.removeItem('personalToken');
      localStorage.removeItem('UserId');
      this.router.navigate(['/login']).then(() => { window.location.reload(); });
    }

  }

}
