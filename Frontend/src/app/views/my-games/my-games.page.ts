import { Component, OnInit } from '@angular/core';
import { Collect } from 'src/models/Collect';
import { VideoGame } from 'src/models/VideoGame';
import { VideoGameInCollection } from 'src/models/VideoGameInCollection';
import { CollecServiceService } from 'src/services/collect-service.service';
import { VideoGameService } from 'src/services/video-game.service';
import { ModalController } from '@ionic/angular';
import { CollectModifyPage } from '../modals/collect-modify/collect-modify.page';
import { CollectAddPage } from '../modals/collect-add/collect-add.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-games',
  templateUrl: './my-games.page.html',
  styleUrls: ['./my-games.page.scss'],
})
export class MyGamesPage implements OnInit {

  private collect: Array<Collect> = [];
  private videogames: Array<VideoGameInCollection> = [];
  private UserId: number;
  private search: any;
  private miToken: number = +localStorage.getItem('personalToken')!;
  
  

  private searcResult: Array<VideoGameInCollection> = [];
  private load: boolean;

  constructor(private router:Router, private CollectService: CollecServiceService, private VideogameService: VideoGameService, private modalController: ModalController, ) { }

  ngOnInit() {

    if(this.miToken <= 0){
      this.router.navigateByUrl('/login');
    }

    this.search = false;

    if (localStorage.getItem('UserId')) {
      this.UserId = +localStorage.getItem('UserId')!;
    }

    this.checkCollect(this.UserId);
  }

  async searchByName(ev: any) {
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      this.search = true;
      
        this.search = true;

        this.load = true;

        await sleep(2000);

      this.searcResult = this.videogames.filter((videogame) => {
        this.load = false;
        return videogame.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
      })


    }
    else {
      this.search = false;
    }


  }

  deleteVideoGame(idVideoGame: number){
    this.CollectService.deleteCollect(this.UserId, idVideoGame);
    window.location.reload();
  }

  checkCollect(id: Number) {

    this.CollectService.getCollectFromUser(id).subscribe((c: Array<Collect>) => {
      this.collect = c;

    
      

      c.forEach(collection => {
        this.VideogameService.getVideoGameById(collection.idVideoGame).subscribe((v: VideoGameInCollection) => {
          v.State = collection.state;
          v.gameTime = collection.gameTime;
          
          this.videogames.push(v);
          
        })

        
      });

      

    })



  }

  videoGameCompleted(idVideoGame: number, gameTime: number){
    this.CollectService.completedVideoGame(this.UserId, idVideoGame, gameTime);
    window.location.reload();
  }

  videoGameNotCompleted(idVideoGame: number, gameTime: number){
    this.CollectService.notCompletedVideoGame(this.UserId, idVideoGame, gameTime);
    window.location.reload();
  }

  modelData: any;
  modelDataAdd: any;

  async openIonModal(v: any) {
    
    const modal = await this.modalController.create({
      component: CollectModifyPage,
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

  async openIonModalAdd() {
    
    const modal = await this.modalController.create({
      component: CollectAddPage,
      componentProps: {
      
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
