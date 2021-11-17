import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Collect } from 'src/models/Collect';

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

  getCollectFromUser(idAppUser: Number): Observable<Collect[]>{

    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("idAppUser", idAppUser.toString());


    const body = bodyEncoded.toString();

    

    return this.httpClient.get<Collect[]>(this.endpoint + body );
  }

  InsertCollect(collection: Collect){

    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("idAppUser", collection.idAppUser.toString());
    bodyEncoded.append("idVideoGame", collection.idVideoGame.toString());
    bodyEncoded.append("gametime", collection.gameTime.toString());
    bodyEncoded.append("state", collection.state.toString());


    const body = bodyEncoded.toString();

    console.log(body)

    this.httpClient.post<Collect>(this.endpointBasic, body, httpOptions).subscribe(() => {
      console.log("Collección añadida");
    });


  }
  
}
