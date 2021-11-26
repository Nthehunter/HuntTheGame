import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { VideoGame } from 'src/models/VideoGame';
import { VideoGameService } from 'src/services/video-game.service';
import { GameAddModalPage } from '../modals/game-add-modal/game-add-modal.page';
import { GameModifyModalPage } from '../modals/game-modify-modal/game-modify-modal.page';

@Component({
  selector: 'app-admin-games',
  templateUrl: './admin-games.page.html',
  styleUrls: ['./admin-games.page.scss'],
})
export class AdminGamesPage implements OnInit {

  private grants: number;

  private search:any;

  private searchResult: Array<VideoGame> = [];

  constructor(private gameService:VideoGameService,private modalController: ModalController, private alertController: AlertController) { }

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

        this.gameService.searchByLikeName(val).subscribe((v: Array<VideoGame>) => {
         this.searchResult = v;

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

  deleteVideoGame(id: number){
    this.gameService.deleteVideoGame(id).subscribe(() =>{
      window.location.reload();
    })
  }

  showAlert(id: number) {
    this.alertController.create({
      header: 'ATENCIÓN',
      message: '¿Estás seguro de borrar este videojuego?',
      
      
      buttons: [
       
        {
          text: 'No, volver a atras',
          handler: (data: any) => {
            
          }
        },
        {
          text: 'Si, lo estoy.',
          handler: (data: any) => {
            this.deleteVideoGame(id);
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }

  private modelData: any;

  async openIonModal(v: any) {
    
    const modal = await this.modalController.create({
      component: GameModifyModalPage,
      componentProps: {
        "v" : v,
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

  private modelDataAdd: any;

  async openIonModalAdd() {
    
    const modal = await this.modalController.create({
      component: GameAddModalPage,
      
    });

    modal.onDidDismiss().then((modelDataAdd) => {
      if (modelDataAdd !== null) {
        this.modelDataAdd = modelDataAdd.data;
        window.location.reload();
      }
    });

    return await modal.present();
  }

}
