import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private endpoint: string = "http://localhost:8080/pdf";


  constructor(private httpClient: HttpClient) {

  }


  public downloadPDF(): any {
    var mediaType = 'application/pdf';
    this.httpClient.post(this.endpoint, { location: "report.pdf" }, { responseType: 'blob' }).subscribe(
      (response) => {
        var blob = new Blob([response], { type: mediaType });
        
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, '_blank');

      },
      e => { throwError(e); }
    );
  }

}
