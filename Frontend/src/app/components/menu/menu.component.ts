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
  private grants: number;

  constructor(private router: Router, private menu: MenuController) {

  }

  ngOnInit(): void {

    if (localStorage.getItem('UserId')) {
      this.miToken = +localStorage.getItem('UserId')!;
      
    }

    if (localStorage.getItem('grants')) {
      
      this.grants = +localStorage.getItem('grants')!;
      
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

  toMyProfile() {
    this.router.navigateByUrl('/my-profile').then(() => { window.location.reload(); });
 
  }

  toSearchUsers() {
    this.router.navigateByUrl('/search-user').then(() => { window.location.reload(); });
 
  }

  toAdmin(){
    this.router.navigateByUrl("admin-panel").then(() => {window.location.reload(); });
  }

  public logout(): void {
    if (localStorage.getItem('personalToken')) {
      localStorage.removeItem('personalToken');
      localStorage.removeItem('UserId');
      localStorage.removeItem('grants');
      this.router.navigate(['/login']).then(() => { window.location.reload(); });
    }

  }

}
