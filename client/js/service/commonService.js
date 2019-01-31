app.service('loginAuthService', function () {
    this.validateFunction = function (id, paswrd, loginData) {
        if ( id == loginData.username && paswrd == loginData.password) {
            return true;
        }
        return false;
    }
});
app.service('dataCheckService', function () {
    this.checkService = function (data) {

        if (data != null) {

            return true;
        }
        return false;

    }
});
function intCheck() {

}