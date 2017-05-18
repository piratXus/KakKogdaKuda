/**
 * Created by Максим on 30.03.17.
 */
import errorMap from './../../services/error-msg.service';

class registrationController {

    constructor($http, $state, accessService) {
        this.state = $state;
        this.$http = $http;
        this.accessService = accessService;
        this.url = '/mood/api/registration';
        this.username = "";
        this.login = "";
        this.password = "";
        this.emaill = "";
        this.password_confirm = "";
        this.isDisabled = false;
    }

    reg() {
        this.isDisabled = true;
        const data = {};
        data.name = this.username;
        data.login = this.login;
        data.password = this.password;
        data.email = this.emaill;
        if (this.password !== this.password_confirm) {
            this.textError = 'Пароли не совпадают';
            this.error = true;
            this.isDisabled = false;
        } else if (this.password.length < 8) {
            this.textError = 'Пароль должен быть 8+ символов';
            this.error = true;
            this.isDisabled = false;
        } else if (!(/.+@.+\..+/.test(this.emaill))) {
            this.textError = 'Неправильная почта';
            this.error = true;
            this.isDisabled = false;
        }
        else {
            this.$http.post(this.url, JSON.stringify(data))
                .then((response) => {
                    localStorage.clear();
                    this.state.go('login');
                    this.accessService.sentEmail = true;
                }).catch((response) => {
                this.textError = errorMap.get(response.data.error);
                this.error = true;
                this.isDisabled = false;
            });
        }
    }
}

registrationController.$inject = ['$http', '$state', 'accessService'];
export default registrationController;