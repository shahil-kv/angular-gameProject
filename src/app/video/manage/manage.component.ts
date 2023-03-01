import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  videoOrder = '1'

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: Params) => {
      this.videoOrder = params.sort === '2' ? params.sort : '1'
    })
  }
  sort($event: Event) {
    const { value } = ($event.target as HTMLSelectElement)
    // ? we can use this method for simple task and rendering page using query parameters but if you need a powerful query parameters then we need to change the method
    // todo  this.router.navigateByUrl(`/manage?sort=${value}`)
    this.router.navigate([], {
      // we are giving that the relative will be the current route and the query params will be the sort
      relativeTo: this.route,
      queryParams: {
        sort: value
      }
    })

  }


}
