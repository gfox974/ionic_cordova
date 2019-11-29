import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  hits: any[];

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.http.get('./assets/data.json').subscribe((data: any) => {
      console.log(data);
      this.hits = data.hits;
    });
  }

  search(str: string) {
    console.log('debug:', str);
    const apikey = '12540878-ad6df0a7de7e17bd6dbc1b84c';
    const apiurl = `https://pixabay.com/api/?key=${apikey}&q=${str}&image_type=all&per_page=200`;
    this.http.get(apiurl).subscribe((data: any) => {
      console.log(data);
      this.hits = data.hits;
    });
  }


}
