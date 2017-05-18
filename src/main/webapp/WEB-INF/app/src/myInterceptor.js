/**
 * Created by bat on 06.04.2017.
 */
function myInterceptor($transitions) {

    $transitions.onStart({to: 'admin-panel'}, onlyAdmin);
    // $transitions.onStart({to: 'main'}, onlyAuthorize);
    $transitions.onStart({to: 'news'}, onlyAuthorize);
    // $transitions.onStart({to: 'main'}, onlyVerified);
    $transitions.onStart({to: 'news'}, onlyVerified);
    $transitions.onStart({to: 'resendEmail'}, onlyAuthorize);

    function onlyAdmin(transit) {
        let auth = transit.injector().get('accessService');
        if (!auth.isAdmin()) {
            return transit.router.stateService.target('main');
        }
    }

    function onlyAuthorize(transit) {
        let auth = transit.injector().get('accessService');
        if (!auth.isAuthorize()) {
            return transit.router.stateService.target('login');
        }
    }

    function onlyVerified(transit) {
        let auth = transit.injector().get('accessService');
        if (!auth.isVerified()) {
            return transit.router.stateService.target('resendEmail');
        }
    }
}
myInterceptor.$inject = ['$transitions'];
export default myInterceptor;