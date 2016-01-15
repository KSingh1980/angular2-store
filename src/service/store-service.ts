import {Http, Headers, Response} from 'angular2/http';
import {Injectable} from 'angular2/core';
import {CartItem} from './cart-item-model.ts';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

const BASE_URL = 'http://localhost:9000';
const jsonHeader = new Headers();
jsonHeader.append('Content-Type', 'application/json');

@Injectable()
export class StoreService {
  public cart$: Observable<Array<CartItem>>;
  private cartObserver: any;
  private _cartStore: {
      cart: Array<CartItem>
  };
  constructor(private http: Http) {
      this.createCartObserver()
  }
  
  createCartObserver(){
    this._cartStore = { cart: [] };
    this.cart$ = new Observable((observer: any) => {
        this.cartObserver = observer
    }).share();
    this.cart$.subscribe();
  }

  getProduct(id: string) {
    return this.transact('get',`${BASE_URL}/product/${id}/?_embed=cart`);
  }
  
  getCatalog(){
    return this.transact('get',`${BASE_URL}/product/?_embed=cart`);
  }
  
  getCart() {
    return this.transact('get',`${BASE_URL}/cart`)
    // .then(data => {
    //     this._cartStore.cart = data;
    //     this.cartObserver.next(this._cartStore.cart);
    //     return data;
    // });
  }
  
  getCartByProduct(id: number) {
    return this.transact('get',`${BASE_URL}/cart/?productId=${id}`);
  }
  
  createCartItem(product): CartItem{
    var newItem: CartItem = {
      id: 0,
      productId: product.id,
      qty: 1,
      price: product.price,
      title: product.title
    };
    return newItem;
  }

  addItem(product: CartItem) {
    return this.getCartByProduct(product.id).then(res => {
        if(res[0]){
            return this.increaseItem(res[0])
        }
        else {
            var item = this.createCartItem(product);
            return this.transact('post', `${BASE_URL}/cart`,item);
        }
    })
  }

  increaseItem(cartItem: CartItem) {
    return this.transact('patch', `${BASE_URL}/cart/${cartItem.id}`, {qty: cartItem.qty+1});
  }
  
  decreaseItem(cartItem: CartItem) {
    if(cartItem.qty>1){
        return this.transact('patch', `${BASE_URL}/cart/${cartItem.id}`, { qty: cartItem.qty - 1 })
    }
    else {
      return this.removeItem(cartItem);
    }
  }
  
  removeItem(cartItem: CartItem){
      return this.transact('delete', `${BASE_URL}/cart/${cartItem.id}`);
  }
  
  transact(method, url, payload?){
      var response;
      if(!payload || typeof payload === 'string'){
        response = this.http[method](url, payload)
        .map(res => res.json()).toPromise()    
      }
      else {
          response = this.http[method](url, JSON.stringify(payload), { headers: jsonHeader })
          .map(res => res.json()).toPromise();
      }
      return response
  }
  
  
  // cartTotals(qty = 0, total = 0) {
  //   this.cartItems.forEach(cartItem  => {
  //     qty += cartItem.qty;
  //     total += cartItem.qty * cartItem.cost;
  //   });
  //   return { qty, total };
  // }
}