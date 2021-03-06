/**
 * Service using Observables
 */

import {Http, Headers } from 'angular2/http';
import {Injectable} from 'angular2/core';
import {CartItem} from '../model/cart-item-model.ts';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

const BASE_URL = 'http://localhost:9000';
const jsonHeader = new Headers();
jsonHeader.append('Content-Type', 'application/json');

@Injectable()
export class CartService {
    public cart$: Observable<Array<CartItem>>;
    private _cartObserver: any;
    private _cartStore: {
        cart: Array<CartItem>
    };

    constructor(private http: Http) {
        this.createCartObserver();
    }

    createCartObserver() {
        this._cartStore = {cart: []};
        this.cart$ = new Observable((observer: any) => {
            this._cartObserver = observer;
        }).share();
    }

    getProduct(id: string) {
        return this.transact('get', `${BASE_URL}/product/${id}/?_embed=cart`);
    }

    getCatalog() {
        return this.transact('get', `${BASE_URL}/product/?_embed=cart`);
    }

    getCart() {
        this.http.get(`${BASE_URL}/cart`).subscribe(data => {
            this._cartStore.cart = data.json();
            this._cartObserver.next(this._cartStore.cart.slice(0));
        });
    }

    getCartByProduct(id: number) {
        return this.transact('get', `${BASE_URL}/cart/?productId=${id}`);
    }

    addItem(product: CartItem) {
        this.getCartByProduct(product.id).subscribe(res => {
            if (res[0]) {
                this.increaseItem(res[0]);
            } else {
                let item = {
                    id: 0,
                    productId: product.id,
                    qty: 1,
                    price: product.price,
                    title: product.title
                };
                this.transact('post', `${BASE_URL}/cart`, item).subscribe(res => {
                    this._cartStore.cart.push(res);
                    this._cartObserver.next(this._cartStore.cart.slice(0));
                });
            }
        });
    }

    increaseItem(cartItem: CartItem) {
        this.transact('patch', `${BASE_URL}/cart/${cartItem.id}`, {qty: cartItem.qty + 1}).subscribe(() => {
            this._cartStore.cart.find(item => cartItem.id === item.id).qty++;
            this._cartObserver.next(this._cartStore.cart.slice(0));
        });
    }

    decreaseItem(cartItem: CartItem) {
        if (cartItem.qty > 1) {
            this.transact('patch', `${BASE_URL}/cart/${cartItem.id}`, {qty: cartItem.qty - 1}).subscribe(() => {
                this._cartStore.cart.find(item => cartItem.id === item.id).qty--;
                this._cartObserver.next(this._cartStore.cart.slice(0));
            });
        } else {
            this.removeItem(cartItem);
        }
    }

    removeItem(cartItem: CartItem) {
        this.transact('delete', `${BASE_URL}/cart/${cartItem.id}`).subscribe(() => {
            this._cartStore.cart = this._cartStore.cart.filter(item => cartItem.id !== item.id);
            this._cartObserver.next(this._cartStore.cart.slice(0));
        });
    }

    transact(method, url, payload?) {
        if (!payload || typeof payload === 'string') {
            return this.http[method](url, payload)
                .map(res => res.json());
        } else {
            return this.http[method](url, JSON.stringify(payload), {headers: jsonHeader})
                .map(res => res.json());
        }
    }

    cartTotals(qty = 0, total = 0) {
        this._cartStore.cart.forEach(cartItem => {
            qty += cartItem.qty;
            total += cartItem.qty * cartItem.price;
        });
        return {qty, total};
    }
}