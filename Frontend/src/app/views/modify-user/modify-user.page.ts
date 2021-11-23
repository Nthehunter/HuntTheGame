import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUser } from 'src/models/AppUser';
import { AppUserServiceService } from 'src/services/app-user-service.service';

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.page.html',
  styleUrls: ['./modify-user.page.scss'],
})
export class ModifyUserPage implements OnInit {

  private email: string;
  private password: string;
  private userName: string;
  private visibleEmail: boolean;
  

  private user: Array<AppUser> = [];

  private UserId: number = +localStorage.getItem('UserId')!;

  private miToken: number = +localStorage.getItem('personalToken')!;
  private visiblePassword: boolean;
  private visibleName: boolean;
  private visibleNameExist: boolean;
  private visibleEmailExist: boolean;
  private visibleOkay: boolean;

  constructor(private router: Router, private userService: AppUserServiceService) { }

  ngOnInit() {

    
    this.visibleOkay = false;

    this.userService.getOneAppUser(this.UserId).subscribe((u:AppUser) => {
      this.user.push(u)
    })
  }

  post(){let send_count = 0;

    var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
    

    try {
      if (this.email.match(EMAIL_REGEX)) {
        console.log("ta bien")
        this.visibleEmail = false
        send_count++;
        
      }
      else{
        console.log("ta mal")
        this.visibleEmail=true;
        send_count --;
      }
    } catch (error) {
      console.log("no hay email")
      this.email = null;
      send_count++;
    }

    try {
      if((this.password.length > 16 || this.password.length < 8) || this.password == null ){
        this.visiblePassword = true
        send_count --;
      }
      else{
        send_count++;
        this.visiblePassword = false
      }
  
    } catch (error) {
      this.password = null;
      send_count++;
    }

    try {
      if((this.userName.length > 16 || this.userName.length <= 1) || this.userName == null ){
        this.visibleName = true
      }
      else{
        send_count++;
        this.visibleName = false
      }
  
    } catch (error) {
      this.userName = this.userName = null;
      send_count++;
    }

    this.userService.userNameExist(this.userName).subscribe((exist : boolean) =>{
      if(exist == true){
        this.visibleNameExist = true;
        send_count --;
      }
      else{
        this.visibleNameExist = false;
        
        this.userService.emailExist(this.email).subscribe((existEmail: boolean) => {
          if(existEmail == true){
            this.visibleEmailExist = true;
            send_count --;
          }
          else{
            if(send_count == 3){
              
              this.userService.updateAppUser(this.UserId, this.email, this.password, this.userName)
              this.visibleOkay = true;
              this.updated();

            }
            else{
              this.visibleOkay = false;
            }
          }
        })
      }
    })

  }

  updated(){
    this.router.navigate(["/my-profile"]).then(() => {
      window.location.reload();
    });
  }

}
