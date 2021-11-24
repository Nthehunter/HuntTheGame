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
    if(email != null){
      formData.append("email", email);
    }
    if(password != null){
      formData.append("password", password);
    }
   if(userName != null){
    formData.append("userName", userName);
   }
    

 


    this.httpClient.put<AppUser>(this.endpoint + '/' + id, formData).subscribe(() => {
      console.log("Usuario Actualizado");
    });

  }

  createAppUser( password: string, email: string, username: string, photo: Blob) {

    const formData = new FormData();
    formData.append('image', photo);
  
    formData.append("email", email);
    formData.append("password", password);
    formData.append("userName", username);
    formData.append("image", photo);


    this.httpClient.post<AppUser>(this.endpoint, formData).subscribe(() => {
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

  Updateimg(id: any, photo: Blob): Observable<object>{
    const formData = new FormData();
    formData.append('image', photo);

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
