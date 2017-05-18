/**
 * Created by Максим on 29.03.17.
 */
import angular from 'angular';
import login from './login.component';

let authentication =  angular.module('authentication', []).component('loginComponent', login);
export default authentication;
