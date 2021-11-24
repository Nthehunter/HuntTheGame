import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UseridServiceService {

  private userIdToSearch:number;
  constructor() {
    this.userIdToSearch = this.getUserIdToSearch();
  }

  

  public setUserIdToSearch(id:number){
    this.userIdToSearch = id;
  }
  public getUserIdToSearch(){
    console.log(this.userIdToSearch)
    return this.userIdToSearch;
  }
}
