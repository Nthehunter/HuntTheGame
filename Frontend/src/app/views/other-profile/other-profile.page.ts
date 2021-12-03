import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUser } from 'src/models/AppUser';
import { Collect } from 'src/models/Collect';
import { VideoGameInCollection } from 'src/models/VideoGameInCollection';
import { AppUserServiceService } from 'src/services/app-user-service.service';
import { CollecServiceService } from 'src/services/collect-service.service';
import { UseridServiceService } from 'src/services/userid-service.service';
import { VideoGameService } from 'src/services/video-game.service';

@Component({
  selector: 'app-other-profile',
  templateUrl: './other-profile.page.html',
  styleUrls: ['./other-profile.page.scss'],
})
export class OtherProfilePage implements OnInit {

  private userId: number;
  private user: Array<AppUser> = [];
  
  private collect: Array<Collect> = [];
  private videogames: Array<VideoGameInCollection> = [];

  private miToken: number = +localStorage.getItem('personalToken')!;

  constructor(private CollectService: CollecServiceService, private VideogameService: VideoGameService, private UserService:AppUserServiceService, private idService: UseridServiceService, private router: Router) { }

  ngOnInit() {

    if(this.miToken <= 0){
      this.router.navigateByUrl('/login');
    }


    this.userId =+ localStorage.getItem('userIdToSearch');

    if(this.userId == 0){
      this.router.navigateByUrl('/home');
    }

    

    this.UserService.getOneAppUser(this.userId).subscribe((u:AppUser) => {
      this.user.push(u)
    })

    this.checkCollect(this.userId);
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

}
