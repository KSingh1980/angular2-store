import { Component } from 'angular2/core';
import { CartService }  from '../../service/cart-service';
import { RouterLink } from 'angular2/router';
import { CartButton } from '../cart/cart-button';

@Component({
    directives: [RouterLink, CartButton],
    selector: '[catalog]',
    template: require('./catalog.html')
})

export class Catalog {
    products: Array<any>;
    constructor(private cartService: CartService) {
        cartService.cart$.subscribe(updatedCart => {
            this.getCatalog();
        });
    }

    getCatalog() {
        this.cartService.getCatalog().subscribe(res => this.products = res);
    }

    ngOnInit() {
        this.getCatalog();
    }

}