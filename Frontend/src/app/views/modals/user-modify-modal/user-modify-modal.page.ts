import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AppUser } from 'src/models/AppUser';
import { AppUserServiceService } from 'src/services/app-user-service.service';

@Component({
  selector: 'app-user-modify-modal',
  templateUrl: './user-modify-modal.page.html',
  styleUrls: ['./user-modify-modal.page.scss'],
})
export class UserModifyModalPage implements OnInit {

  private userName: string;
  private email: string;
  private password: string;
  private photo: any;

  private visibleEmail: boolean;
  private visiblePassword: boolean;
  private visibleName: boolean;
 
  private visibleNameExist: boolean;
  private visibleEmailExist: boolean;
  private visibleOkay: boolean;
  private visible: boolean;
  private visible2: boolean;
  private conectOnline: boolean;

  constructor( private modalController: ModalController, private UserService:AppUserServiceService) { }

  ngOnInit() {
  }

  async closeModel() {
    const close: string = "Modal Removed";
    await this.modalController.dismiss(close);
  }
  
  @Input() model_title: string;


  post(u: AppUser){
    let send_count = 0;

    var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
    

    try {
      if (this.email.match(EMAIL_REGEX)) {
        
        this.visibleEmail = false
        send_count++;
      }
      else{
        if(this.email == ""){
          this.email == undefined;
          send_count++;
        }
        else{
          this.visibleEmail=true;
        }
        
      }
    } catch (error) {
      send_count++;
      this.visibleEmail=false;
    }
    
    try {
      if((this.password.length > 16 || this.password.length < 8) || this.password == null ){
        

        if(this.password == ""){
          this.password = undefined;
          send_count++;
        }else{
          this.visiblePassword = true
        }
      }
      else{
        send_count++;
        this.visiblePassword = false
      }
  
    } catch (error) {
      send_count++;
      this.visiblePassword = false
    }

    try {

      

      if((this.userName.length > 16 || this.userName.length <= 1) || this.userName == null ){
        if(this.userName == ""){
          this.userName = undefined;
          send_count++;
        }
        else{
          this.visibleName = true
        }
       
      }
      else{
        send_count++;
        this.visibleName = false
      }
  
    } catch (error) {

      send_count++;
      this.visibleName = false
    }

    this.UserService.userNameExist(this.userName).subscribe((exist : boolean) =>{
      if(exist == true){
        this.visibleNameExist = true;
        send_count --;
      }
      else{
        this.visibleNameExist = false;
        
        this.UserService.emailExist(this.email).subscribe((existEmail: boolean) => {
          if(existEmail == true){
            this.visibleEmailExist = true;
            send_count --;
          }
          else{
            if(send_count == 3){

              console.log("Para el servidor")

              var Interval = setInterval(() => {
                
                this.conectOnline = false;
              this.UserService.updateAppUser(u.idAppUser, this.email, this.password, this.userName).subscribe(() => {
                this.conectOnline = true;
                this.visible2 = true;
                this.visible = false;
                clearInterval(Interval);
              })
            }, 3000);
              
            }
            else{
              this.visible = true;
            }
          }
        })
      }
    })

  }

}
