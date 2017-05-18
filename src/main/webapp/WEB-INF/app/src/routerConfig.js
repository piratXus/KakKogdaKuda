/**
 * Created by bat on 06.04.2017.
 */
function routerConfig($stateProvider, $urlServiceProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $urlServiceProvider.rules.otherwise({state: 'main'});
    $stateProvider
        .state('main', {
            url: "/main",
            component: 'mapComponent',
        });
    $stateProvider
        .state('login', {
            url: "/login",
            component: 'loginComponent',
        })
        .state('registration', {
            url: "/registration",
            component: 'registrationComponent'
        });
    $stateProvider
        .state('resendEmail', {
            url: "/resend",
            component: 'resendVal'
        });
    $stateProvider
        .state('admin-panel', {
            url: "/admin-panel",
            component: 'adminPanelComponent'
        });
    $stateProvider
        .state('news', {
            url: "/news",
            component: 'newsPanelComponent'
        });
}
routerConfig.$inject = ['$stateProvider', '$urlServiceProvider', '$locationProvider'];
export default routerConfig;