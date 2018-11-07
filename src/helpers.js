function postData(url = ``, data = {}) {
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
        body: JSON.stringify(data),
    })
    .then(response => {
      return response
    });
}

export const sendEmail = (endpoint, email, successCallback, errorCallback) => {
  postData(endpoint, email).
      then(response => successCallback()).
      catch(error => errorCallback())
}
