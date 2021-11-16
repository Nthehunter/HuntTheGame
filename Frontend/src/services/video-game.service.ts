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

  deleteVideoGame(id: number): Observable<VideoGame> {
    return this.httpClient.delete<VideoGame>(this.endpoint + "/" + id)
  }

  updateVideoGame(id: Number, videogame: VideoGame) {

    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("name", videogame.Name);
    bodyEncoded.append("gametime", videogame.GameTime.toString());
    bodyEncoded.append("state", videogame.state.toString());

    const body = bodyEncoded.toString();

    console.log(body)

    this.httpClient.put<VideoGame>(this.endpoint + '/' + id, body, httpOptions).subscribe(() => {
      console.log("Videojuego Actualizado");
    });

  }

  createVideoGame(videogame: VideoGame) {

    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("name", videogame.Name);
    bodyEncoded.append("gametime", videogame.GameTime.toString());
    bodyEncoded.append("state", videogame.state.toString());


    const body = bodyEncoded.toString();

    console.log(body)

    this.httpClient.post<VideoGame>(this.endpoint, body, httpOptions).subscribe(() => {
      console.log("Videojuego añadido");
    });

  }
}
