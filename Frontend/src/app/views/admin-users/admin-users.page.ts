import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  private search: any;
  private load: boolean;

  private searchResult: Array<AppUser> = [];
  private searchValue: any;

  private miToken: number = +localStorage.getItem('personalToken')!;

  private userToDelete = 0;
  private userToDeleteCount = 0;

  constructor(private router: Router, private UserService: AppUserServiceService, private modalController: ModalController, private alertController: AlertController) { }


  ngOnInit() {

    if (localStorage.getItem('grants')) {

      this.grants = +localStorage.getItem('grants')!;

    }

    if (this.grants != 1) {
      this.router.navigateByUrl('/login');
    }

    if (this.miToken <= 0) {
      this.router.navigateByUrl('/login');
    }

    


  }

  async allUsers() {
    this.search = true;
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    this.load = true;

    await sleep(2000);

    var Interval = setInterval(() => { this.UserService.getAppUser().subscribe((u: Array<AppUser>) => {
      this.searchResult = u;
      this.load = false;
      clearInterval(Interval);
    }) }, 3000);

    
  }

  async searchByName(ev: any) {

    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    let val = ev;

    if (val && val.trim() !== '') {
      if (val.length >= 2) {
        this.searchResult = undefined;
        this.search = true;
        this.load = true;
        await sleep(2000);


        this.UserService.searchByLikeUsername(val).subscribe((u: Array<AppUser>) => {
          this.searchResult = u;
          this.load = false;
        })
      }
      else {
        this.search = false;
      }

    }
    else {
      this.search = false;
    }

  }



  deleteAcount(id: number) {
    this.userToDelete++;
    var Interval = setInterval(() => {

      if(this.userToDelete == this.userToDeleteCount){
        this.UserService.getAppUser().subscribe((u: Array<AppUser>) => {
          this.searchResult = u;
          this.load = false;
        })
        clearInterval(Interval);
      }else{
        this.UserService.deleteAppUser(id).subscribe(() => {
          this.userToDeleteCount++;

        })
      }
      
    }, 3000);


  }

  showAlert(id: number) {
    this.alertController.create({
      header: 'ATENCI??N',
      message: '??Est??s seguro de borrar esta cuenta?',


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
        "u": u,
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
