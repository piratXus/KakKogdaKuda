import angular from 'angular';
import router from 'angular-ui-router';
import progressBar from 'angular-loading-bar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'jquery';
import './app.style.css';
import map from './pages/map/map.module';
import authentication from './pages/login/login.module';
import registration from './pages/registration/registration.module';
import accessService from './services/access.service';
import navarComponent from './pages/navbar/navbar.component';
import filterComponent from './pages/filters/filters.component';

import routerConfig from './routerConfig';
import myInterceptor from './myInterceptor';

const mainAppModule = angular.module('mainApp',
    [map.name, authentication.name,
        registration.name, router,
        progressBar]);

mainAppModule.component('navbarComponent', navarComponent);
mainAppModule.component('filterComponent', filterComponent);
mainAppModule.service('accessService', accessService);
mainAppModule.config(routerConfig).run(myInterceptor);