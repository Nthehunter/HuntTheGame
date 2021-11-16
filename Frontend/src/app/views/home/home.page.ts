import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { MenuComponent } from 'src/app/components/menu/menu.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private miToken: number = +localStorage.getItem('personalToken')!;

  constructor(private router: Router) { 
    if (localStorage.getItem('personalToken')) {
      this.miToken = +localStorage.getItem('personalToken')!;
     
    }
  }

  

  ngOnInit() {
    
    
    if(this.miToken <= 0){
      this.router.navigateByUrl('/login');
    }
    
    
  }
  

}
