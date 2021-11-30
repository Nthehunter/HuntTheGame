import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/models/AppUser';
import { Router } from '@angular/router';

import { AppUserServiceService } from 'src/services/app-user-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private miToken: number;
  private UserId: number;
  private validate: number;
  private grants: number;


  private email: any;
  private password: any;

  constructor(private AppUserService: AppUserServiceService, private router: Router) { this.miToken = 0; this.UserId = 0; }

  ngOnInit() {

    if (localStorage.getItem('personalToken')) {
      this.miToken = +localStorage.getItem('personalToken')!;
    }

    if(this.miToken > 0){
      this.router.navigateByUrl('/home');
    }

    if (localStorage.getItem('UserId')) {
      this.UserId = +localStorage.getItem('UserId')!;
    }



  }


  post() {

    if (this.email != null && this.password != null) {


      this.AppUserService.Login(this.email, this.password).subscribe(resultado => {

        this.UserId = Number(resultado)

       
        if(this.UserId != 0){
          this.validate = 1;
          this.AppUserService.getOneAppUser(this.UserId).subscribe(u => {
            
            if(u.rol == 1){
              this.grants = 1;
              
            }
            else{
              this.grants = 0;
             
            }
            localStorage.setItem('grants',`${ this.grants }`);
            localStorage.setItem('personalToken',`${ 1 }`);
            localStorage.setItem('UserId',`${ this.UserId }`);
            
            this.router.navigateByUrl('/home');
          })
          
          
        }
        else{
          this.validate = 0;
        }
      })

    }

    else {
      this.validate = 0;
    }

  }
}
