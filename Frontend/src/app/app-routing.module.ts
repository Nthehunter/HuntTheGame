import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadChildren: () => import('./views/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./views/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./views/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'modify-user',
    loadChildren: () => import('./views/modify-user/modify-user.module').then( m => m.ModifyUserPageModule)
  },
  {
    path: 'report',
    loadChildren: () => import('./views/report/report.module').then( m => m.ReportPageModule)
  },
  {
    path: 'my-games',
    loadChildren: () => import('./views/my-games/my-games.module').then( m => m.MyGamesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
