class NavBarController {
    constructor($http, $state, accessService) {
        this.$http = $http;
        this.state = $state;
        this.urlLogout = '/mood/api/logout';
        this.urlLastNews = '/mood/api/news/last';
        this.accessService = accessService;
        this.accessService.initApp();
        this.dataAccess = this.accessService.dataAccess;
        this.someNews = [];
    }
    getLastNews(){
        this.$http.get(this.urlLastNews, {
            headers: this.accessService.getCurrentHeadersWithToken()
        })
            .then((response) => {
                this.someNews = response.data;
                //console.log(this.someNews);
                this.someNews.forEach((record)=> {
                    record.title = record.text.split("@.....")[0].substr(0, 50);
                });
            }).catch((response) => {
            console.log(response);
        });
    }

    getCurrentNews(){
        
    }

    logoutUser() {
        localStorage.clear();
        this.state.go('login');
        this.$http.post(this.urlLogout, '',{
            headers: this.accessService.getCurrentHeadersWithToken()
            })
            .then((response) => {
                this.accessService.initApp();
            }).catch((response) => {
            console.log(response);
        });
    }
    allNewsShow(){
        this.state.go('news');
    }
    mapShow(){
        this.state.go('main');
    }
    someNews(){
        return this.news;
    }
    newsShow() {
        return !(this.state.is('news') 
        || this.state.is('login') 
        || this.state.is('registration')
        || this.state.is('resend'));
    }
}

NavBarController.inject = ['$http', 'accessService', '$state'];

export default NavBarController;