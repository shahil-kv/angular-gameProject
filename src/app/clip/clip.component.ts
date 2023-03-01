import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
//  after we imported the activatedRoute and we will get all the information about the route parameters in the router

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.css']
})
export class ClipComponent implements OnInit {

  id = '';

  constructor(public route: ActivatedRoute) { }


  // the route.params is an observable and it will emit the changes in the routing
  ngOnInit(): void {
    /***
     * ? This code will also gives us that id but not as an observable so it will have drawbacks
     * ? and the draws backs of the method is
     * ! problems it is not updating when router is updated
     * ? the biggest drawbacks are the clips example is when we click on a href then it url will change but it will not change the page title or dynamically changes things it will change the url but not the
     * * using the next method will make you render easily when the url changes dynamically it effects everywhere in the website
     */
    // todo this.id = this.route.snapshot.params.id
    console.log(this.id)
    this.route.params.subscribe((params: Params) => {
      // we will get the information about the routing parameters using the observable given by the activated route
      this.id = params.id

    })
  }

}
