var EC_ADMIN_NOTIFICATION_TOKEN = {
    bIsRequesting: false,

    init: function (fnCallback, bForceInit) {
        var sToken = this.getFromStorage();

        if (!sToken || bForceInit) {
            this.requestToken(fnCallback);
        } else {
            if (typeof fnCallback === "function") {
                fnCallback();
            }
        }
    },

    getRequestHeader: function () {
        return {Authorization: 'Bearer ' + this.getFromStorage()};
    },

    getFromStorage: function () {
        return localStorage.getItem(EC_ADMIN_NOTIFICATION_CONST.getStorageKey('token'));
    },

    requestToken: function (fnCallback) {
        if (EC_ADMIN_NOTIFICATION_TOKEN.bIsRequesting) {
            return;
        }

        EC_ADMIN_NOTIFICATION_TOKEN.bIsRequesting = true;

        $.ajax({
            url: EC_ADMIN_NOTIFICATION_CONST.REQUEST.URL_TOKEN,
            type: 'POST',
            dataType: 'json',
            success: function (oResponse) {
                EC_ADMIN_NOTIFICATION_TOKEN.bIsRequesting = false;
                if (!oResponse || oResponse.code !== 200) {
                    return;
                }

                localStorage.setItem(EC_ADMIN_NOTIFICATION_CONST.getStorageKey('token'), oResponse.data.token);

                if (typeof fnCallback === 'function') {
                    fnCallback();
                }
            }
        });
    }
};