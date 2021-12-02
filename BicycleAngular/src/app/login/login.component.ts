import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginPassword: string = "";
  loginEmail: string = "";
  errorMessage: string = "";

  constructor( private _HttpService : HttpService,
                private _router: Router,
                private _route: ActivatedRoute
                ) { }

  ngOnInit(): void {
  }

  loginHandler( event: any ): void{
    event.preventDefault();
    console.log("Im getting here");

    let currentUser = {
      loginPassword : this.loginPassword,
      loginEmail : this.loginEmail
    }
    let observable = this._HttpService.loginUser( currentUser );
    observable.subscribe( (data: any ) => {
      this._router.navigate( ['/home'] );
    },
    ( error: any ) => {
      console.log( error );
      this.errorMessage = error.statusText;
    });
  }

}
