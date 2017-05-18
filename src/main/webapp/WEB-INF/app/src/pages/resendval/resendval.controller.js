import errorMap from "./../../services/error-msg.service";

class FormResendValidation {
    constructor($http, accessService, $state) {
        this.http = $http;
        this.state = $state;
        this.accessService = accessService;
        this.url = '/mood/api';
        this.token = "123";
        this.setlistenertobutton();
        this.startLoopForRequestIsVerified()
    }

    startLoopForRequestIsVerified() {
        let loop = setInterval(() => {
            this.http.get(this.url + '/isverified', {
                headers: this.accessService.getCurrentHeadersWithToken()
            }).then((resp) => {
                if (resp.data) {
                    const info = JSON.parse(localStorage.getItem("info"));
                    info.verifyied = true;
                    localStorage.clear();
                    localStorage.setItem("info", JSON.stringify(info));
                    clearInterval(loop);
                    this.accessService.initApp();
                    this.state.go('main');
                }
            }).catch((castError) => {
                if (castError.status === 403) {
                    clearInterval(loop);
                    localStorage.clear();
                    this.state.go('login');
                }
            })
        }, 3000);
    }

    setlistenertobutton() {
        let mybutton = document.getElementById("newkeysenderbutton");
        mybutton.onclick = function () {
            mybutton.disabled = true;
            let i = 30;
            let timerId = setTimeout(function tick() {
                mybutton.childNodes[0].nodeValue = --i;
                if (i < 0) {
                    mybutton.disabled = false;
                    mybutton.childNodes[0].nodeValue = 'Отправить';
                    clearTimeout(timerId);
                    return false;
                }
                timerId = setTimeout(tick, 1000);
            }, 1000);
        }
    }

    resend() {
        return this.http.get(this.url + '/verify', {
            headers: this.accessService.getCurrentHeadersWithToken()
        }).then((resp) => {
            this.textError = "";
            return resp.data;
        }).catch((castError) => {
            this.textError = errorMap.get(castError.data.error);
        });
    }
}

FormResendValidation.inject = ['$http', 'accessService', '$state'];

export default FormResendValidation;
