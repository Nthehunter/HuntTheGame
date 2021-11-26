import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AppUser } from 'src/models/AppUser';
import { AppUserServiceService } from 'src/services/app-user-service.service';
import { UserModifyModalPage } from '../modals/user-modify-modal/user-modify-modal.page';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.page.html',
  styleUrls: ['./admin-users.page.scss'],
})
export class AdminUsersPage implements OnInit {
  private grants: number;

  private search:any;

  private searchResult: Array<AppUser> = [];

  constructor(private UserService:AppUserServiceService,private modalController: ModalController,  private alertController: AlertController ) { }

  ngOnInit() {

    if (localStorage.getItem('grants')) {
      
      this.grants = +localStorage.getItem('grants')!;
      
    }
    
  }

  searchByName(ev: any) {
    
    
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      if(val.length > 2){
        this.search = true;

        this.UserService.searchByLikeUsername(val).subscribe((u: Array<AppUser>) => {
         this.searchResult = u;

        })
      }
      else{
        this.search = false;
      }
      
    }
    else {
      this.search = false;
    }


  }

  deleteAcount(id: number){
    this.UserService.deleteAppUser(id).subscribe(() =>{
      window.location.reload();
    })
  }

  showAlert(id: number) {
    this.alertController.create({
      header: 'ATENCIÓN',
      message: '¿Estás seguro de borrar esta cuenta?',
      
      
      buttons: [
       
        {
          text: 'No, volver a atras',
          handler: (data: any) => {
            
          }
        },
        {
          text: 'Si, lo estoy.',
          handler: (data: any) => {
            this.deleteAcount(id);
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }

  private modelData: any;

  async openIonModal(u: any) {
    
    const modal = await this.modalController.create({
      component: UserModifyModalPage,
      componentProps: {
        "u" : u,
      }
      
    });

    modal.onDidDismiss().then((modelData) => {
      if (modelData !== null) {
        this.modelData = modelData.data;
        window.location.reload();
      }
    });

    return await modal.present();
  }

}
