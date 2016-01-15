import {Component, OnInit,OnChanges } from 'angular2/core';
import { StoreService }  from '../../service/store-service';
import { RouterLink } from 'angular2/router';

@Component({
  directives: [RouterLink],
  providers: [StoreService],
  selector: '[cart]',
  template: require('./cart.html')
})

export class Cart {
  products: Array<any>;
  constructor(private storeService: StoreService) { }
  getCart(){
    this.storeService.getCart().then(data => {
        console.log(data)
        this.products = data
    });  
  }
  ngOnInit() {
    this.getCart();
  }
  removeItem(product){
    this.storeService.removeItem(product).then(data => this.getCart());
  }
  increaseItem(product){
    if(product.qty >0){
      this.storeService.increaseItem(product).then(data => this.getCart());
    }
    else {
      this.removeItem(product);
    }
  }
  decreaseItem(product) {
    this.storeService.decreaseItem(product).then(data => this.getCart());
  }
}
