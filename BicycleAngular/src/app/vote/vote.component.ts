import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {
  postId : any;
  currentPost: any = null;
  options : any;
  constructor(private _HttpService : HttpService,
    private _router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._route.params.subscribe((params: Params) => {
      this.postId = params['postId'];
    });

    if(this.postId) {
      console.log({postId: this.postId});
      this.getOnePost();
    }
  }
  getOnePost(): void {
    console.log( "Getting post" );
    const observable = this._HttpService.getOnePost(this.postId);
    observable.subscribe((data: any) => {
      this.currentPost = data;
      console.log("this is data ==> ", {currentPost: this.currentPost});
    })

  }

  addCount(option : {option: string, count: number}, optionIndex: number) : void {
    let selectedOption = option;
    selectedOption.count = option.count + 1;
    let optionsArray = this.currentPost.options;
    optionsArray[optionIndex] = selectedOption;
    this.currentPost.options = optionsArray;
    const observable = this._HttpService.updateVotesInPost(this.currentPost);
    observable.subscribe((data: any) => {
      console.log("Update votes ==> ", {data});
    })
  }

}
