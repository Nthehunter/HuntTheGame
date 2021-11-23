import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VideoGameInCollection } from 'src/models/VideoGameInCollection';
import { CollecServiceService } from 'src/services/collect-service.service';

@Component({
  selector: 'app-collect-modify',
  templateUrl: './collect-modify.page.html',
  styleUrls: ['./collect-modify.page.scss'],
})
export class CollectModifyPage implements OnInit {

  private v:any;
  visible:boolean;
  visible2:boolean;
  private UserId: number;
  gameTime:any;
  state:any;

  constructor( private modalController: ModalController, private CollectionService: CollecServiceService) { }

  ngOnInit() {
    if (localStorage.getItem('UserId')) {
      this.UserId = +localStorage.getItem('UserId')!;
    }
  }

  async closeModel() {
    const close: string = "Modal Removed";
    await this.modalController.dismiss(close);
  }
  
  @Input() model_title: string;

  post(v: VideoGameInCollection){let send = 0;


    if(this.gameTime != null && (this.gameTime >= 0 && this.gameTime <= 1000)){
      send ++;
    }

    if(this.state == 1 || this.state == 0){
      send ++;
    }

    if(send == 2){
      this.CollectionService.updateCollection(this.state, this.gameTime, v.idVideoGame, this.UserId)
      this.visible2 = true
      this.visible = false
    }

    else{
      this.visible2= false
      this.visible = true
    }



  } 


}
