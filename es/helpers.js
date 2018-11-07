function postData() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return fetch(url, {
        method: "POST",
        mode: "no-cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json; charset=utf-8"
        },
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify(data)
    }).then(function (response) {
        return response;
    });
}

export var sendEmail = function sendEmail(endpoint, email, successCallback, errorCallback) {
    postData(endpoint, email).then(function (response) {
        return successCallback();
    }).catch(function (error) {
        return errorCallback();
    });
};