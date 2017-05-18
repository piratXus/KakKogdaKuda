import errorMap from './../../services/error-msg.service';
/**
 * Created by Максим on 30.03.17.
 */

class loginController {

    constructor($http, $state, accessService) {
        this.$http = $http;
        this.$state = $state;
        this.accessService = accessService;
        this.accessService.initApp();
        this.url = '/mood/api/login';
        this.login = "";
        this.password = "";
        this.isDisabled = false;
        if(accessService.sentEmail){
            this.messageSent = accessService.sentEmail;
            setTimeout(() => { this.messageSent = false;}, 7000);
            accessService.sentEmail = false;
        }
    }
    log() {
        this.isDisabled = true;
        let data = {};
        data.login = this.login;
        data.password = this.password;
        this.$http.post(this.url, JSON.stringify(data))
            .then((response) => {
                localStorage.setItem("info", JSON.stringify(response.data));
                this.accessService.initApp();
                this.$state.go('main');
            }, (response) => {
                this.textError = errorMap.get(response.data.error);
                this.error = true;
                this.isDisabled = false;
            });
    }
}
loginController.$inject = ['$http', '$state', 'accessService'];
export default loginController;