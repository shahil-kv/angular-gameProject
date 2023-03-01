import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

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
    this.route.params.subscribe((params: Params) => {
      this.id = params.id
      console.log(this.id);
    })
  }

}
