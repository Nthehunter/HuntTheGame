import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { AppUser } from 'src/models/AppUser';
import { AppUserServiceService } from 'src/services/app-user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private UserId: number = +localStorage.getItem('UserId')!;

  private miToken: number = +localStorage.getItem('personalToken')!;
  private user: Array<AppUser> = [];
  

  constructor(private router: Router, private userService: AppUserServiceService) { 
    if (localStorage.getItem('personalToken')) {
      this.miToken = +localStorage.getItem('personalToken')!;
     
    }
  }

  

  ngOnInit() {
    
    
    if(this.miToken <= 0){
      this.router.navigateByUrl('/login');
    }

    this.userService.getOneAppUser(this.UserId).subscribe((u:AppUser) => {
      this.user.push(u)
    })
    
    
    
  }
  

}
