import { Byte } from "@angular/compiler/src/util";

export class VideoGame{
      idVideoGame: Number;
      Name:string;
      photo: Byte[];

      get name(): string {
            return this.Name;
        }
    
}