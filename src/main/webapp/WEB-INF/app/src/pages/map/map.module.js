import angular from 'angular';
import mapComponent from './map.component';
import resendComponent from '../resendval/resendval.component';


let mapPointMoodModule = angular.module('mapPointMood', []);
mapPointMoodModule.component('mapComponent', mapComponent);
mapPointMoodModule.component('resendVal', resendComponent);
export default mapPointMoodModule;