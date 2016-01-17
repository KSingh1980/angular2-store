import {Component, Input, HostListener} from 'angular2/core';
import { CartService }  from '../../service/cart-service';
import { RouterLink } from 'angular2/router';

@Component({
    directives: [RouterLink],
    selector: '[cart-button]',
    template: '<ng-content></ng-content>'
})

export class CartButton {
    @Input() product;
    @Input() action;
    @HostListener('click')
    onClick() {
        switch (this.action) {
            case 'add':
                this.addItem();
                break;
            case 'increase':
                this.increaseItem();
                break;
            case 'decrease':
                this.decreaseItem();
                break;
            case 'remove':
                this.removeItem();
                break;
        }
    }

    constructor(private cartService: CartService) {}

    addItem() {
        this.cartService.addItem(this.product);
    }

    removeItem() {
        this.cartService.removeItem(this.product);
    }

    decreaseItem() {
        if (this.product.qty > 0) {
            this.cartService.decreaseItem(this.product);
        } else {
            this.addItem();
        }
    }

    increaseItem() {
        this.cartService.increaseItem(this.product);
    }
}
