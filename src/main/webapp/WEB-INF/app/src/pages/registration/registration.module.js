/**
 * Created by Максим on 29.03.17.
 */
import angular from 'angular';
import registrationComponent from './registration.component';

let registration =  angular.module('registration', []).component('registrationComponent', registrationComponent);
export default registration;
