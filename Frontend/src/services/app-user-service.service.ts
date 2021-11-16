import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppUser } from 'src/models/AppUser';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

@Injectable({
  providedIn: 'root'
})
export class AppUserServiceService {

  private login : number;

  private endpoint: string = "http://localhost:8080/appuser";
  constructor(private httpClient: HttpClient) {

  }


  getAppUser(): Observable<AppUser[]> {

    return this.httpClient.get<AppUser[]>(this.endpoint);
  }

  deleteAppUser(id: number): Observable<AppUser> {
    return this.httpClient.delete<AppUser>(this.endpoint + "/" + id)
  }

  updateAppUser(id: Number, AppUser: AppUser) {

    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("email", AppUser.email);
    bodyEncoded.append("password", AppUser.password);
    bodyEncoded.append("userName", AppUser.userName);


    const body = bodyEncoded.toString();

    console.log(body)

    this.httpClient.put<AppUser>(this.endpoint + '/' + id, body, httpOptions).subscribe(() => {
      console.log("Usuario Actualizado");
    });

  }

  createAppUser(AppUser: AppUser) {

    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("email", AppUser.email);
    bodyEncoded.append("password", AppUser.password);
    bodyEncoded.append("userName", AppUser.userName);


    const body = bodyEncoded.toString();

    console.log(body)

    this.httpClient.post<AppUser>(this.endpoint, body, httpOptions).subscribe(() => {
      console.log("Usuario añadido");
    });

  }

  Login(email: string, password: string): Observable<object>{

    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("email", email);
    bodyEncoded.append("originalPassword", password);

    const body = bodyEncoded.toString();

  
    return this.httpClient.post(this.endpoint + "/login", body, httpOptions)
    
  }

}
