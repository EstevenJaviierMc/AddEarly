import { Component, OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import Observable from 'rxjs/Observable';
import map from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
 Books: Observable<any>[];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            books {
              title
              author
            }
          }
        `,
      })
      .valueChanges.pipe(map(result => {
        this.Books = result.data && result.data.books;
        this.loading = result.loading;
        this.error = result.books;
      }));
  }
}
