import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  private search: any;
  private miToken: number = +localStorage.getItem('personalToken')!;
  private load: boolean;
  private searchValue: any;

  private searchResult: Array<VideoGame> = [];


  constructor(private router: Router, private gameService: VideoGameService, private modalController: ModalController, private alertController: AlertController) { }

  ngOnInit() {

    if (localStorage.getItem('grants')) {

      this.grants = +localStorage.getItem('grants')!;

    }

    if (this.miToken <= 0) {
      this.router.navigateByUrl('/login');
    }

    if (this.grants <= 0) {
      this.router.navigateByUrl('/login');
    }

  }

  async allGames() {
    this.search = true;
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    this.load = true;

    await sleep(2000);

    this.gameService.getVideoGame().subscribe((v: Array<VideoGame>) => {
      this.searchResult = v;
      this.load = false;
    })
  }

  async searchByName(ev: any) {
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    let val = ev;

    if (val && val.trim() !== '') {
      if (val.length > 2) {
        this.searchResult = undefined;
        this.search = true;

        this.load = true;

        await sleep(2000);

        this.gameService.searchByLikeName(val).subscribe((v: Array<VideoGame>) => {
          this.searchResult = v;
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

  deleteVideoGame(id: number) {
    this.gameService.deleteVideoGame(id).subscribe(() => {
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
        "v": v,
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
