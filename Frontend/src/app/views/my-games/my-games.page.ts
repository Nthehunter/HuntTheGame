import { Component, OnInit } from '@angular/core';
import { Collect } from 'src/models/Collect';
import { VideoGame } from 'src/models/VideoGame';
import { VideoGameInCollection } from 'src/models/VideoGameInCollection';
import { CollecServiceService } from 'src/services/collect-service.service';
import { VideoGameService } from 'src/services/video-game.service';

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
  

  private searcResult: Array<VideoGameInCollection> = [];

  constructor(private CollectService: CollecServiceService, private VideogameService: VideoGameService) { }

  ngOnInit() {

    this.search = false;

    if (localStorage.getItem('UserId')) {
      this.UserId = +localStorage.getItem('UserId')!;
    }

    this.checkCollect(this.UserId);
  }

  searchByName(ev: any) {
 
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      this.search = true;

      this.searcResult = this.videogames.filter((videogame) => {
       
        return videogame.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
      })


    }
    else {
      this.search = false;
    }


  }

  checkCollect(id: Number) {

    this.CollectService.getCollectFromUser(id).subscribe((c: Array<Collect>) => {
      this.collect = c;

      console.log(c)
      

      c.forEach(collection => {
        this.VideogameService.getVideoGameById(collection.idVideoGame).subscribe((v: VideoGameInCollection) => {
          v.State = collection.state;
          v.gameTime = collection.gameTime;
          


          this.videogames.push(v);
          
        })

        
      });

      console.log(this.videogames)

    })



  }

}
