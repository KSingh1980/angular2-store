import {Component} from 'angular2/core';
import { CartService }  from '../../service/cart-service';
import { RouterLink } from 'angular2/router';
import { TotalPipe } from './totalPipe';
import { CartButton } from './cart-button';

@Component({
    directives: [RouterLink, CartButton],
    selector: '[cart]',
    pipes: [TotalPipe],
    template: require('./cart.html')
})

export class Cart {
    products: Array<any>;

    constructor(private cartService: CartService) {
        cartService.cart$.subscribe(updatedCart => {
            this.products = updatedCart;
        });
    }

    ngOnInit() {
        this.cartService.getCart();
    }
}
