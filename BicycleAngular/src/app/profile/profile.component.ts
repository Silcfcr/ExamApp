import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser : any;
  newBike : any;
  errorMessage : string = "";

  constructor(private _HttpService: HttpService,
    private _router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    let observable = this._HttpService.validateUser();
    observable.subscribe( (data: any) => {
      console.log( "This is session data ", data );
      this.currentUser = data;
      console.log(this.currentUser.email)
    },
    (error: any) =>{
      console.log( error.statusText );
      this._router.navigate( ['/login'] );
    })
    // this.getUser();
    
    this.newBike = {
      title : "",
      description : "",
      price : "",
      location : "",
      imageUrl : ""
    }
  }

  addBike(event:any): void {
    event.preventDefault();
    console.log(this.newBike)
    let observable = this._HttpService.CreateOneBike(this.currentUser.email, this.newBike, );
    observable.subscribe((data: any) => {
      console.log(data);
      this._router.navigate( ['/home'] );
    },
    ( error: any ) => {
      console.log( error );
      this.errorMessage = error.statusText;
    });
  }

  // getUser(): void {
  //   console.log( "We are going to fetch one user!" );
  //   let observable = this._HttpService.getOne(this.currentUser.id);;
  //   observable.subscribe((data: any) => {
  //     console.log(data);
  //     this.currentUser = data;
  //   })
  //   console.log("i got here")
  // }

}

