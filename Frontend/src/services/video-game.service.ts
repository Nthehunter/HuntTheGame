import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VideoGame } from 'src/models/VideoGame';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

@Injectable({
  providedIn: 'root'
})
export class VideoGameService {

  private endpoint: string = "http://localhost:8080/videogame";
  constructor(private httpClient: HttpClient) {

  }

  getVideoGameById(id: Number):Observable<VideoGame>{

    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("idVideoGame", id.toString());

    const body = bodyEncoded.toString();
    return this.httpClient.get<VideoGame>(this.endpoint + "/searchbyid?"+ body)
  }

  getVideoGame(): Observable<VideoGame[]>{
    return this.httpClient.get<VideoGame[]>(this.endpoint);
  }

  videoGameNameExist(Name: string): Observable<boolean>{

    return this.httpClient.get<boolean>(this.endpoint + "/name/" + Name)
  }

  deleteVideoGame(id: number): Observable<VideoGame> {
    return this.httpClient.delete<VideoGame>(this.endpoint + "/" + id)
  }

  updateVideoGame(id: Number, videogame: VideoGame) {

    const formData = new FormData();
    if(videogame.Name != undefined && videogame.Name != null){
      formData.append("Name", videogame.Name);
    }
    
    

    this.httpClient.put<VideoGame>(this.endpoint + '/' + id, formData).subscribe(() => {
      console.log("Videojuego Actualizado");
    });

  }

  updateVideoGameImage(id: Number, photo:Blob, type: string) {

    const formData = new FormData();
    formData.append('image', photo);
    formData.append("type", type);

    return this.httpClient.put<VideoGame>(this.endpoint + "/uploadimg/" + id, formData)
  }

  createVideoGame(name: any, photo: Blob, type: string) {

    const formData = new FormData();
  
    formData.append("name", name);
    formData.append("type", type);

    if(photo != undefined){
      formData.append("image", photo);
      this.httpClient.post<VideoGame>(this.endpoint, formData).subscribe(() => {
        console.log("Usuario añadido");
      });
    }
    else{
      
      this.httpClient.post<VideoGame>(this.endpoint+"/withoutimage", formData).subscribe(() => {
        console.log("Usuario añadido");
      });
    }
      

  }

  searchByLikeName(Name: string): Observable<VideoGame[]>{
    return this.httpClient.get<VideoGame[]>(this.endpoint + "/likename/" + Name)
  }

  
}
