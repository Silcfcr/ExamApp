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
  newPost: any;
  errorMessage : string = "";

  constructor(private _HttpService: HttpService,
    private _router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    let observable = this._HttpService.validateUser();
    observable.subscribe( (data: any) => {
      console.log( "This is session data ", data );
      this.currentUser = data;
      console.log(this.currentUser.userName)
    },
    (error: any) =>{
      console.log( error.statusText );
      this._router.navigate( ['/login'] );
    })
    
    this.newPost = {
      title : "",
      option1 : "",
      option2 : "",
      option3 : "",
      option4 : "",
    }
  }

  addPost(event:any): void {
    event.preventDefault();
    const options = [
      { 
        option : this.newPost.option1,
        count : 0
      },
      { 
        option : this.newPost.option2,
        count : 0
      },{ 
        option : this.newPost.option3,
        count : 0
      },{ 
        option : this.newPost.option4,
        count : 0
      }
    ] 
    let postToSend = {
      title : this.newPost.title,
      options : options
    }
    console.log(postToSend, "This is post to send");
    console.log(this.currentUser.userName, "username being sent to server");
    let observable = this._HttpService.CreateOnePost(this.currentUser.userName, postToSend );
    observable.subscribe((data: any) => {
    console.log("**** ", data, "data in client");
    this._router.navigate( ['/home'] );
    }, (error: any) =>{
      console.log( error.statusText );
    });  
    this._router.navigate( ['/home'] ); 
    //not working, why??????
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

