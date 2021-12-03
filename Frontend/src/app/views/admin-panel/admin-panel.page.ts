import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.page.html',
  styleUrls: ['./admin-panel.page.scss'],
})
export class AdminPanelPage implements OnInit {

  private grants: number;
  private UserId: number;
  private miToken: number = +localStorage.getItem('personalToken')!;

  constructor(private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('UserId')) {
      this.UserId = +localStorage.getItem('UserId')!;
      
    }

    if (localStorage.getItem('grants')) {
      
      this.grants = +localStorage.getItem('grants')!;
      
    }

    if(this.miToken <= 0){
      this.router.navigateByUrl('/login');
    }

    if(this.grants != 1){
      this.router.navigateByUrl('/login');
    }
  }

  toAdminUsers(){
    this.router.navigateByUrl('/admin-users');
  }

  toAdminGames(){
    this.router.navigateByUrl('/admin-games');
  }

}
