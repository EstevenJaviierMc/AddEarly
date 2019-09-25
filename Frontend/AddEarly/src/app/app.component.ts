import { Component, OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
 Books: any[];
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
      .valueChanges.subscribe(result => {
        this.Books = result.data && result.data['books'];
        this.loading = result.loading;
        this.error = result['books'];
      });
  }
}
