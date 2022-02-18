import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AppUser } from 'src/models/AppUser';
import { AppUserServiceService } from 'src/services/app-user-service.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  private UserId: number = +localStorage.getItem('UserId')!;

  private miToken: number = +localStorage.getItem('personalToken')!;
  private user: Array<AppUser> = [];
  private photo: any;
  private type: string;
  

  constructor(private userService: AppUserServiceService, private router: Router, private alertController: AlertController ) { }

  ngOnInit() {

    if(this.miToken <= 0){
      this.router.navigateByUrl('/login');
    }

    

    this.userService.getOneAppUser(this.UserId).subscribe((u:AppUser) => {
      this.user.push(u)
    })
  }

  deleteAcount(){
    this.userService.deleteAppUser(this.UserId).subscribe(() =>{
      localStorage.removeItem('personalToken');
      localStorage.removeItem('UserId');
      this.router.navigate(['/login']).then(() => { window.location.reload(); });
    })
  }


  showAlert() {
    this.alertController.create({
      header: 'ATENCIÓN',
      message: '¿Estás seguro de borrar tu cuenta?',
      
      
      buttons: [
       
        {
          text: 'No, volver a atras',
          handler: (data: any) => {
            
          }
        },
        {
          text: 'Si, lo estoy.',
          handler: (data: any) => {
            this.deleteAcount();
          }
        }
      ]
    }).then(res => {
      res.present();
    });
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
     

      const reader = new FileReader();
  
    reader.readAsArrayBuffer(file);

    this.type = file.name;
  
    reader.onload = () => {
  
      
      let blob: Blob = new Blob([new Uint8Array((reader.result as ArrayBuffer))]);
  
      
      let blobURL: string = URL.createObjectURL(blob);

      this.photo = blob;

      this.userService.Updateimg(this.UserId, this.photo, this.type).subscribe(() =>{
        window.location.reload();
      })
  
    };
  
    reader.onerror = (error) => {
  
      
  
    };

    }

  
    
  };

 
  ModifyAccount(){
    this.router.navigate(["/modify-user"])
  }

}
