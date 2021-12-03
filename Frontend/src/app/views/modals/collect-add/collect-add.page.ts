import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Collect } from 'src/models/Collect';
import { VideoGame } from 'src/models/VideoGame';
import { VideoGameInCollection } from 'src/models/VideoGameInCollection';
import { CollecServiceService } from 'src/services/collect-service.service';
import { VideoGameService } from 'src/services/video-game.service';

@Component({
  selector: 'app-collect-add',
  templateUrl: './collect-add.page.html',
  styleUrls: ['./collect-add.page.scss'],
})
export class CollectAddPage implements OnInit {

  private collect: Array<Collect> = [];
  private videogamesInCollect: Array<VideoGameInCollection> = [];

  private search: boolean;
  private videogames: Array<VideoGame> = [];
  private searcResult: Array<VideoGame> = [];
  private UserId: number;
  private send: boolean;
  private gamesLegth: number;
  private load: boolean;
  private searchValue: any;

  

  constructor(private modalController: ModalController, private CollectService: CollecServiceService, private VideogameService: VideoGameService) { }

  

  ngOnInit() {

    if (localStorage.getItem('UserId')) {
      this.UserId = +localStorage.getItem('UserId')!;
    }

    if (localStorage.getItem('gamesLegth')) {
      this.gamesLegth = +localStorage.getItem('gamesLegth')!;
    }
    
  }

  

  async closeModel() {
    const close: string = "Modal Removed";
    await this.modalController.dismiss(close);
  }

  async searchByName(ev: any) {

    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

 
    let val = ev;

    if (val && val.trim() !== '') {
      this.search = true;

      this.searcResult = undefined
      
      this.search = true;

      this.load = true;

      await sleep(2000);

      this.VideogameService.searchByLikeName(val).subscribe((v: Array<VideoGame>) => {
        this.searcResult = v;
        this.load = false;
       })



    }
    else {
      this.search = null;
    }


  }

  checkCollect(id: Number) {

    let gamesLegth = this.gamesLegth;

    this.CollectService.getCollectFromUser(id).subscribe((c: Array<Collect>) => {
      this.collect = c;

      this.gamesLegth = c.length;

      
      if(gamesLegth == this.gamesLegth){
        this.send= false;
      }

      else{
        this.send = true;
      }


    })



  }

  post(v: VideoGame){

    this.checkCollect(this.UserId);

    

    
    
    this.CollectService.insertCollect(this.UserId, v.idVideoGame,  0, 0).subscribe(() => {
      this.search= false;

      this.checkCollect(this.UserId);



      
    });


  }

}
