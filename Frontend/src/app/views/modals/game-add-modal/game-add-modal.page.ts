import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VideoGame } from 'src/models/VideoGame';
import { VideoGameService } from 'src/services/video-game.service';

@Component({
  selector: 'app-game-add-modal',
  templateUrl: './game-add-modal.page.html',
  styleUrls: ['./game-add-modal.page.scss'],
})
export class GameAddModalPage implements OnInit {
  private Name: string;
  private visibleName: boolean;
  private visibleNameExist: boolean;
  private visible: boolean;
  private visible2: boolean;
  private visiblePhoto: boolean;
  private photo: any;
  private type: string;

  constructor(private modalController: ModalController, private gameService: VideoGameService) { }

  ngOnInit() {
  }

  async closeModel() {
    const close: string = "Modal Removed";
    await this.modalController.dismiss(close);
  }

  validFileType(file) {

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

  loadImageFromDevice(event) {

    const file = event.target.files[0];
    this.type = file.name;
    
    if(this.validFileType(file)){
      this.visiblePhoto = true;

      const reader = new FileReader();
  
    reader.readAsArrayBuffer(file);
  
    reader.onload = () => {
  
      
      let blob: Blob = new Blob([new Uint8Array((reader.result as ArrayBuffer))]);
  
      
      let blobURL: string = URL.createObjectURL(blob);

      this.photo = blob;

      console.log(blob)
  
    };
  
    reader.onerror = (error) => {
  
      
  
    };

    }
    else{
      this.visiblePhoto = false;
    }
  
    
  };

  post(){let send_count = 0;

    try {
      if((this.Name.length > 50 || this.Name.length <= 1) || this.Name == null ){

        this.visibleName = true
       
      }
      else{
        if(this.Name != ""){
          send_count++;
        }
      }
     
  
    } catch (error) {
      this.visibleName = true
    }

    this.gameService.videoGameNameExist(this.Name).subscribe((exist : boolean) =>{

      if(exist){
        this.visibleNameExist = true;
        send_count --;
      }
      else{
        this.visibleNameExist = false;
        if(send_count == 1){
        
          this.gameService.createVideoGame(this.Name, this.photo, this.type);
          
          this.visible2 = true;
          this.visible = false;
        }
        else{
          this.visible2 = false;
          this.visible = true;
        }
      }
    })


  }

}
