import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VideoGame } from 'src/models/VideoGame';
import { VideoGameService } from 'src/services/video-game.service';

@Component({
  selector: 'app-game-modify-modal',
  templateUrl: './game-modify-modal.page.html',
  styleUrls: ['./game-modify-modal.page.scss'],
})
export class GameModifyModalPage implements OnInit {

  private photo: any;
  private Name: any;
  private visible: any;
  private visible2: any;
  private visibleName: boolean;
  private visibleNameExist: boolean;

  constructor(private modalController: ModalController, private gameService: VideoGameService) { }

  ngOnInit() {
  }

  async closeModel() {
    const close: string = "Modal Removed";
    await this.modalController.dismiss(close);
  }
  
  @Input() model_title: string;

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

  loadImageFromDevice(event, id:number) {

    const file = event.target.files[0];
    
    if(this.validFileType(file)){
     

      const reader = new FileReader();
  
    reader.readAsArrayBuffer(file);
  
    reader.onload = () => {
  
      
      let blob: Blob = new Blob([new Uint8Array((reader.result as ArrayBuffer))]);
  
      
      let blobURL: string = URL.createObjectURL(blob);

      this.photo = blob;

      this.gameService.updateVideoGameImage(id, this.photo).subscribe(() =>{
        window.location.reload();
      })
  
    };
  
    reader.onerror = (error) => {
  
      
  
    };

    }

  
    
  };

  post(v: VideoGame){let send_count = 0;

    try {

      

      if((this.Name.length > 50 || this.Name.length <= 1) || this.Name == null ){
        if(this.Name == ""){
          this.Name = undefined;
          send_count++;
        }
        else{
          this.visibleName = true
        }
       
      }
      else{
        send_count++;
        this.visibleName = false
      }
  
    } catch (error) {

      send_count++;
      this.visibleName = false
    }

    this.gameService.videoGameNameExist(this.Name).subscribe((exist : boolean) =>{

      if(exist){
        this.visibleNameExist = true;
      }
      else{
        this.visibleNameExist = false;
        if(send_count == 1){
        
          v.Name = this.Name;
          this.gameService.updateVideoGame(v.idVideoGame, v)
          this.visible2 = true;
          this.visible = false;
        }
      }
    })


  }

}
