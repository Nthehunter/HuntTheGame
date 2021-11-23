import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUserServiceService } from 'src/services/app-user-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  private email: string;
  private photo: any;
  private password:string;
  private user: string;
  private visibleEmail: boolean;
  private visiblePassword: boolean;
  private visibleName: boolean;
  private visiblePhoto: boolean;

  

  private miToken: number = +localStorage.getItem('personalToken')!;

  constructor(private router: Router, private UserService:AppUserServiceService) { }

  ngOnInit() {

    if(this.miToken > 0){
      this.router.navigateByUrl('/home');
    }

  }

  validFileType(file ) {

    const fileTypes = [
      "image/apng",
      "image/bmp",
      "image/gif",
      "image/jpeg",
      "image/pjpeg",
      "image/png",
    ];

    return fileTypes.includes(file.type);
  }

  loadImageFromDevice(event) {

    const file = event.target.files[0];
    
    if(this.validFileType(file)){
      this.visiblePhoto = true;

      const reader = new FileReader();
  
    reader.readAsArrayBuffer(file);
  
    reader.onload = () => {
  
      
      let blob: Blob = new Blob([new Uint8Array((reader.result as ArrayBuffer))]);
  
      
      let blobURL: string = URL.createObjectURL(blob);

      this.photo = blob;

      console.log(blob)
  
    };
  
    reader.onerror = (error) => {
  
      
  
    };

    }
    else{
      this.visiblePhoto = false;
    }
  
    
  };

  post(){let send_count = 0;

    var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
    

    try {
      if (this.email.match(EMAIL_REGEX)) {
        console.log("ok")
        this.visibleEmail = false
        send_count++;
      }
      else{
        this.visibleEmail=true;
      }
    } catch (error) {
      this.visibleEmail=true;
    }
    
    try {
      if((this.password.length > 16 || this.password.length < 8) || this.password == null ){
        this.visiblePassword = true
      }
      else{
        send_count++;
        this.visiblePassword = false
      }
  
    } catch (error) {
      this.visiblePassword = true
    }

    try {
      if((this.user.length > 16 || this.user.length <= 1) || this.user == null ){
        this.visibleName = true
      }
      else{
        send_count++;
        this.visibleName = false
      }
  
    } catch (error) {
      this.visibleName = true
    }

    if(send_count == 3){
      this.UserService.createAppUser(this.password, this.email, this.user, this.photo)
    }

  }

}
