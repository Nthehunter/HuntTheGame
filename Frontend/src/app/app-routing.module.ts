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
  {
    path: 'collect-modify',
    loadChildren: () => import('./views/modals/collect-modify/collect-modify.module').then( m => m.CollectModifyPageModule)
  },
  {
    path: 'collect-add',
    loadChildren: () => import('./views/modals/collect-add/collect-add.module').then( m => m.CollectAddPageModule)
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./views/my-profile/my-profile.module').then( m => m.MyProfilePageModule)
  },
  {
    path: 'search-user',
    loadChildren: () => import('./views/search-user/search-user.module').then( m => m.SearchUserPageModule)
  },
  {
    path: 'other-profile',
    loadChildren: () => import('./views/other-profile/other-profile.module').then( m => m.OtherProfilePageModule)
  },
  {
    path: 'admin-panel',
    loadChildren: () => import('./views/admin-panel/admin-panel.module').then( m => m.AdminPanelPageModule)
  },
  {
    path: 'admin-users',
    loadChildren: () => import('./views/admin-users/admin-users.module').then( m => m.AdminUsersPageModule)
  },
  {
    path: 'user-modify-modal',
    loadChildren: () => import('./views/modals/user-modify-modal/user-modify-modal.module').then( m => m.UserModifyModalPageModule)
  },
  {
    path: 'admin-games',
    loadChildren: () => import('./views/admin-games/admin-games.module').then( m => m.AdminGamesPageModule)
  },
  {
    path: 'game-modify-modal',
    loadChildren: () => import('./views/modals/game-modify-modal/game-modify-modal.module').then( m => m.GameModifyModalPageModule)
  },
  {
    path: 'game-add-modal',
    loadChildren: () => import('./views/modals/game-add-modal/game-add-modal.module').then( m => m.GameAddModalPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
