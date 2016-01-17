import { Component } from 'angular2/core';
import { RouterLink, RouteParams } from 'angular2/router';
import { CartService }  from '../../service/cart-service';
import { CartButton } from  '../cart/cart-button';

@Component({
    directives: [RouterLink, CartButton],
    selector: 'product-detail',
    template: require('./product-detail.html')
})

export class ProductDetail {
    product: any;
    productId: string;

    constructor(private cartService: CartService, private routeParams: RouteParams) {
        this.product = {};
        this.productId = this.routeParams.get('productId');
        cartService.cart$.subscribe(updatedCart => {
            this.getProduct();
        });
    }

    getProduct() {
        this.cartService.getProduct(this.productId).subscribe(res => this.product = res);
    }

    ngOnInit() {
        this.getProduct();
    }
}