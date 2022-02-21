import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppUser } from 'src/models/AppUser';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

const httpOptionsSpecial = {
  headers: new HttpHeaders({ 'Content-Type':'multipart/form-data' })
  
}

@Injectable({
  providedIn: 'root'
})
export class AppUserServiceService {

  private login : number;

  private endpoint: string = "http://localhost:8080/appuser";
  constructor(private httpClient: HttpClient) {

  }

  getOneAppUser(id: Number): Observable<AppUser> {

    return this.httpClient.get<AppUser>(this.endpoint + "/"+ id);
  }

  getAppUser(): Observable<AppUser[]> {

    return this.httpClient.get<AppUser[]>(this.endpoint);
  }

  deleteAppUser(id: number) {
    return this.httpClient.delete(this.endpoint + "/" + id)
  }

  updateAppUser(id: Number, email: string, password: string, userName:string) {

    const formData = new FormData();
    console.log(email)
    if(email != null || email == ""){
      formData.append("email", btoa(email));
    }
    if(password != null || password == ""){
      formData.append("password", btoa(password));
    }
   if(userName != null || userName == ""){
    formData.append("userName", btoa(userName));
   }
    

    return this.httpClient.put<AppUser>(this.endpoint + '/' + id, formData)

  }

  createAppUser( password: string, email: string, username: string, photo: Blob, type: string): Observable<AppUser> {

    const formData = new FormData();
    formData.append('image', photo);
  
    formData.append("email", btoa(email));
    formData.append("password", btoa(password));
    formData.append("userName", btoa(username));
    formData.append("type", type);

    if(photo != undefined){
      formData.append("image", photo);
      return this.httpClient.post<AppUser>(this.endpoint, formData)
    }
    else{
      return this.httpClient.post<AppUser>(this.endpoint+"/withoutimage", formData)
    }

    
    

  }

  Login(email: string, password: string): Observable<object>{

    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("email", btoa(email));
    bodyEncoded.append("originalPassword", btoa(password));

    const body = bodyEncoded.toString();

  
    return this.httpClient.post(this.endpoint + "/login", body, httpOptions)
    
  }

  Updateimg(id: any, photo: Blob, type: string): Observable<object>{
    const formData = new FormData();
    formData.append('image', photo);
    formData.append('type', type);

    return this.httpClient.put<AppUser>(this.endpoint + "/uploadimg/" + id, formData)
  }

  userNameExist(userName: string): Observable<boolean>{

    return this.httpClient.get<boolean>(this.endpoint + "/username/" + userName)
  }

  emailExist(email: string): Observable<boolean>{

    return this.httpClient.get<boolean>(this.endpoint + "/email/" + email)
  }

  searchByLikeUsername(userName: string): Observable<AppUser[]>{
    return this.httpClient.get<AppUser[]>(this.endpoint + "/likeusername/" + userName)
  }
}
