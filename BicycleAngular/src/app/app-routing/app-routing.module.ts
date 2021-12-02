import { CommonModule, registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { ProfileComponent } from '../profile/profile.component';
import { UserRegisterComponent } from '../user-register/user-register.component';


let routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: UserRegisterComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    // {
    //     path: 'addUser',
    //     component: NewUserFormComponent
    // },
    // {
    //   path: 'user/:username',
    //   component: UserParamComponent
    // },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/login'
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [CommonModule,
        RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
