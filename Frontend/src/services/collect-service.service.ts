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
  constructor(private httpClient: HttpClient) {
  }

  getCollectFromUser(idAppUser: Number): Observable<Collect[]>{

    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("idAppUser", idAppUser.toString());

    const body = bodyEncoded.toString();

    

    return this.httpClient.get<Collect[]>(this.endpoint + body );
  }
  
}
