import angular from 'angular';
import mapComponent from './map.component';
import resendComponent from '../resendval/resendval.component';
import routeService from './route.service'


let mapPointMoodModule = angular.module('mapPointMood', ['ngSanitize', 'ui.select']);
mapPointMoodModule.component('mapComponent', mapComponent);
mapPointMoodModule.component('resendVal', resendComponent);
mapPointMoodModule.service('routeService',routeService)
export default mapPointMoodModule;