import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Obj {
  total: number;
  totalHits: number;
  hits: Hit[];
}
export interface Hit {
  previewURL: string;
  likes: number;
  user: string;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page implements OnInit{

  hits: Hit[];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('./assets/data.json').subscribe( (data: Obj) => {
      this.hits = data.hits;
    })
  }

}
