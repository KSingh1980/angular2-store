import { bootstrap } from 'angular2/platform/browser';
import { HTTP_PROVIDERS } from 'angular2/http';
import { ROUTER_PROVIDERS } from 'angular2/router';
import { App } from './component/app';
import { CartService }  from './service/cart-service';

bootstrap(App, [HTTP_PROVIDERS, ROUTER_PROVIDERS, CartService]);
