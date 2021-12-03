import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allUsers : any;
  currentUser : any;
  contactUser : any;
  selectedPost : any;
  
  constructor(private _HttpService: HttpService,
              private _router: Router,
              private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllUsers()
    this.contactUser = null;
    let observable = this._HttpService.validateUser();
    observable.subscribe((data:any) => {
      console.log(data);
      this.currentUser = data;
      
    },
    (error:any) => {
      this._router.navigate(['/login']);
    })
    
    
  }

  getAllUsers(): void {
    console.log( "Getting alL users and posts" );
    let observable = this._HttpService.getAll();;
    observable.subscribe((data: any) => {
      console.log(data);
      this.allUsers = data;
    })
    console.log("i got here")

  }
  deletePost(postId: string) : void {
    console.log(postId, this.currentUser.userName, "in the home component")
    let observable = this._HttpService.DeletePost(postId, this.currentUser.userName)
    observable.subscribe((data:any) => {
      console.log(data, "post has been erased");
      this.getAllUsers();
    })
  }

  logout(): void {
    let observable = this._HttpService.logoutUser()
    observable.subscribe((data:any) => {
      console.log(data);
      this._router.navigate(['/login'])
    })
  }

}
