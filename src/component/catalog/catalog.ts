import {Component, OnInit} from 'angular2/core';
import { StoreService }  from '../../service/store-service';
import { RouterLink } from 'angular2/router';

@Component({
  directives: [RouterLink],
  providers: [StoreService],
  selector: '[catalog]',
  template: require('./catalog.html')
})

export class Catalog {
  products: Array<any>;
  constructor(private storeService: StoreService) { }
  getCatalog(){
    this.storeService.getCatalog().then(res => this.products = res);  
  }
  ngOnInit() {
    this.getCatalog()
  }
  addItem(product){
    this.storeService.addItem(product).then(data => this.getCatalog());
  }
}