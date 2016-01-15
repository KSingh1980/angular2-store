import {Component, OnInit} from 'angular2/core';
import { StoreService }  from '../../service/store-service';
import { RouterLink } from 'angular2/router';

@Component({
  directives: [RouterLink],
  providers: [StoreService],
  selector: '[store-header]',
  template: require('./store-header.html')
})

export class StoreHeader {
  constructor(private catalogService: StoreService) { }
  ngOnInit() {
  }
}
