import {Component, Input} from 'angular2/core';
import { RouterLink, RouteParams } from 'angular2/router';
import { StoreService }  from '../../service/store-service';

@Component({
  directives: [RouterLink],
  providers: [StoreService],
  selector: 'product-detail',
  template: require('./product-detail.html')
})

export class ProductDetail {
    product: any;
    productId: string;
    constructor(private storeService: StoreService, private routeParams: RouteParams) {
        this.product = {};
        this.productId = this.routeParams.get('productId');
    }
    getProduct(){
        this.storeService.getProduct(this.productId).then(res => this.product = res);
    }
    ngOnInit() {
        this.getProduct()
    }
    addItem(product){
        this.storeService.addItem(product).then(data => this.getProduct());
    }
}
