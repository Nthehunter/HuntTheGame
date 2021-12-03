import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUser } from 'src/models/AppUser';
import { AppUserServiceService } from 'src/services/app-user-service.service';
import { UseridServiceService } from 'src/services/userid-service.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.page.html',
  styleUrls: ['./search-user.page.scss'],
})
export class SearchUserPage implements OnInit {

  

  private search:any;

  private searchResult: Array<AppUser> = [];

  private miToken: number = +localStorage.getItem('personalToken')!;
  private load: boolean;
  private found: number;
  private searchValue: any;
  
 

  constructor(private UserService:AppUserServiceService, private idService: UseridServiceService, private router: Router) { }

  ngOnInit() {

    if(this.miToken <= 0){
      this.router.navigateByUrl('/login');
    }

    localStorage.removeItem('userIdToSearch');
  }

  async searchByName(ev: any) {

    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    
    
    let val = ev;

    if (val && val.trim() !== '') {
      if(val.length >= 2){
        this.search = true;

        this.load = true;

        await sleep(3000);

        this.UserService.searchByLikeUsername(val).subscribe((u: Array<AppUser>) => {
         this.searchResult = u;
         this.load = false;
         
        })
      }
      else{
        this.search = false;
      }
      
    }
    else {
      this.search = false;
    }


  }

  viewProfile(id: number){
    this.idService.setUserIdToSearch(id)
    localStorage.setItem('userIdToSearch',`${ id }`);
    this.router.navigate(["other-profile"])
  }



}
