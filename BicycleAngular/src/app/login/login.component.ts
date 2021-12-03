import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  newUser: any;
  loginUserName: string = "";
  loginPassword: string = "";
  errorMessage: string = "";

  constructor( private _HttpService : HttpService,
                private _router: Router,
                private _route: ActivatedRoute
                ) { }

  ngOnInit(): void {
    this.newUser = {
      firstName : "",
      userName : "",
      password : ""
    }
  }
  registerHandler( event: any ): void{
    event.preventDefault();
    console.log("registering");

    let observable = this._HttpService.CreateOne( this.newUser );
    observable.subscribe( (data: any ) => {
      this._router.navigate( ['/home'] );
    },
    ( error: any ) => {
      console.log( error );
      this.errorMessage = error.statusText;
    });
  }

  loginHandler( event: any ): void{
    event.preventDefault();
    console.log("Im getting here");

    let currentUser = {
      loginPassword : this.loginPassword,
      loginUserName : this.loginUserName
    }
    let observable = this._HttpService.loginUser( currentUser );
    observable.subscribe( (data: any ) => {
      console.log("I'm the data in observable", data)
      this._router.navigate( ['/home'] );
    },
    ( error: any ) => {
      console.log( error );
      console.log( error, "I'm the error" );
      this.errorMessage = error.statusText;
    });
  }

}
