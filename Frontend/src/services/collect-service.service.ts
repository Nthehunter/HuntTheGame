import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Collect } from 'src/models/Collect';
import { VideoGameInCollection } from 'src/models/VideoGameInCollection';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

@Injectable({
  providedIn: 'root'
})
export class CollecServiceService {

  private endpoint: string = "http://localhost:8080/collection/search?";
  private endpointBasic: string = "http://localhost:8080/collection";
  constructor(private httpClient: HttpClient) {
  }

  getCollectFromUser(idAppUser: Number): Observable<Collect[]> {

    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("idAppUser", idAppUser.toString());


    const body = bodyEncoded.toString();

    return this.httpClient.get<Collect[]>(this.endpoint + body);
  }

   insertCollect(idAppUser: number, idVideoGame: Number, gameTime:number, state: number):  Observable<object> {

    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("idAppUser", idAppUser.toString());
    bodyEncoded.append("idVideoGame", idVideoGame.toString());
    bodyEncoded.append("gametime", gameTime.toString());
    bodyEncoded.append("state", state.toString());


    const body = bodyEncoded.toString();


    return this.httpClient.post<Collect>(this.endpointBasic, body, httpOptions)
      
  

  }


  deleteCollect(idAppUser: Number, idVideoGame: Number){
    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("idAppUser", idAppUser.toString());
    bodyEncoded.append("idVideoGame", idVideoGame.toString());

    const body = bodyEncoded.toString();

    this.httpClient.post<Collect>(this.endpointBasic+"/delete", body, httpOptions).subscribe(() => {
      
    });
    
  }

  completedVideoGame(idAppUser: Number, idVideoGame: Number, gameTime:Number){
    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("idAppUser", idAppUser.toString());
    bodyEncoded.append("idVideoGame", idVideoGame.toString());
    bodyEncoded.append("gameTime", gameTime.toString());

    const body = bodyEncoded.toString();

    this.httpClient.post<Collect>(this.endpointBasic+"/complete", body, httpOptions).subscribe(() => {
      
    });
  }

  notCompletedVideoGame(idAppUser: Number, idVideoGame: Number, gameTime:Number){
    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("idAppUser", idAppUser.toString());
    bodyEncoded.append("idVideoGame", idVideoGame.toString());
    bodyEncoded.append("gameTime", gameTime.toString());

    const body = bodyEncoded.toString();

    this.httpClient.post<Collect>(this.endpointBasic+"/notcomplete", body, httpOptions).subscribe(() => {
      
    });
  }

  updateCollection(state:any , gameTime:any , idVideoGame:any, UserId:any){
    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("idAppUser", UserId.toString());
    bodyEncoded.append("idVideoGame", idVideoGame.toString());
    bodyEncoded.append("gameTime", gameTime.toString());
    bodyEncoded.append("State", state.toString());

    const body = bodyEncoded.toString();

    console.log(body)

    this.httpClient.post<Collect>(this.endpointBasic+"/update",body, httpOptions).subscribe(() => {
      
    });
  }
  


}
