import {bootstrap} from "angular2/platform/browser";
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {App} from './component/app';

bootstrap(App, [HTTP_PROVIDERS, ROUTER_PROVIDERS]);
