/**
 * Created by plutonii on 31.03.17.
 */

class AccessService {
    constructor() {
        this._isAuthorized = false;
        this.token = null;
        this._isVerified = false;
        this.user = null;
        this.roles = [];
        this._isAdmin = false;
        this._isModer = false;
        this.sentEmail = false;
        this.dataAccess = {
            isAdmin: false,
            isAuthoried: false,
            userId: 0,
            isVerified: false
        };
    }

    setLogin(login){
        this.user.login = login;
    }

    initApp() {
        let info = JSON.parse(localStorage.getItem("info"));
        if (info) {
            this._isAuthorized = true;
            this.token = info.token;
            this.user = info.user;
            this._isVerified = info.verifyied;
            this.dataAccess.isVerified = this._isVerified;
            this.roles = [];
            info.roles.forEach((role) =>{
                this.roles.push(role.authority);
            });
            this.isAdmin();
            this.dataAccess.isAuthoried = true;
            this.dataAccess.userId = this.user.id;
        } else {
            this.roles = [];
            this._isAuthorized = false;
            this.user = null;
            this.token = null;
            this._isVerified = false;
            this._isAdmin = false;
            this._isModer = false;
            this.dataAccess.isAdmin = false;
            this.dataAccess.isAuthoried = false;
            this.dataAccess.userId = 0;
            this.dataAccess.isVerified = false;
        }
    }

    isAdmin() {
        this.roles.forEach((role) => {
            if(role === "ROLE_ADMIN"){
                this._isAdmin = true;
                this.dataAccess.isAdmin = true;
            }
        });
        return this._isAdmin;
    }

/*    isModer() {
        this.roles.forEach((role) => {
            if(role === "ROLE_MODER"){
                this._isModer = true;
            }
        });
        return this._isAdmin;
    }*/

    isAuthorize() {
        return this._isAuthorized;
    }

    isVerified() {
        return this._isVerified;
    }

    setAuthorize(isAuthorize){
        if (isAuthorize !== this._isAuthorized) {
            this._isAuthorized = isAuthorize;
        }
    }

    getCurrentUser() {
        return this.user;
    }

    getUserId() {
        return this.user.id;
    }

    getCurrentHeadersWithToken() {
        return {
            "token": this.token
        }
    }
}

export default AccessService;