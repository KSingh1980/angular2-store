import { Component } from 'angular2/core';
import { CartService }  from '../../service/cart-service';
import { RouterLink } from 'angular2/router';
import { TotalPipe } from './totalPipe';
import { CartButton } from './cart-button';
import { CartItem } from '../../model/cart-item-model';

@Component({
    directives: [RouterLink, CartButton],
    pipes: [TotalPipe],
    selector: '[cart]',
    template: require('./cart.html')
})

export class Cart {
    products: Array<CartItem>;

    constructor(private cartService: CartService) {
        cartService.cart$.subscribe(updatedCart => {
            this.products = updatedCart;
        });
    }

    ngOnInit() {
        this.cartService.getCart();
    }
}
