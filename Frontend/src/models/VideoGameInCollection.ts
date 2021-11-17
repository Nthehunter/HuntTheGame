import { Byte } from "@angular/compiler/src/util";
import { VideoGame } from "./VideoGame";

export class VideoGameInCollection implements VideoGame{

      idVideoGame: Number;
      Name:string;
      gameTime: Number;
      State: Number;
      photo: Byte[];
      photoConvert: String;

      get name(): string {
            return this.Name;
        }

        
    
}