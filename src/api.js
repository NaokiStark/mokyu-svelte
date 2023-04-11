const backendLocation = 'bkndloc';
export const backendRoot = 'bkndroot_';
export const api_request = async function (location, _method = 'get', _data = {}) {
    let headers = {};
    if (!!localStorage.token) {
        if (localStorage.token.length > 0) {
            headers["Authorization"] = `Bearer ${localStorage.token}`;
        }
    }

    if (_method == 'get' || _method == 'delete') {
        const res = await fetch(
            `${backendLocation}${location}`,
            {
                method: _method,
                headers: headers,
            }
        ).then(response => {
            if (response.status == 200) {
                return response.json();
            }
            else {
                return response.text();
            }
        });

        if (res) {
            return res;
        }
        else {
            throw new Error("Ocurrió un error al solicitar los datos<br>");
        }

    }
    else {
        let p;
        if (typeof _data == 'object') {
            headers["Content-Type"] = "application/json";
            p = await fetch(
                `${backendLocation}${location}`,
                {
                    method: _method,
                    body: JSON.stringify(_data),
                    headers: headers,
                }
            ).then(response => {
                if (response.status == 200) {
                    return response.json();
                }
                else {
                    return response.text();
                }
            })
        }
        else {
            headers["Content-Type"] = "application/x-www-form-urlencoded";
            p = await fetch(
                `${backendLocation}${location}`,
                {
                    method: _method,
                    body: `${_data}`,
                    headers: headers,
                }
            ).then(response => {
                if (response.status == 200) {
                    return response.json();
                }
                else {
                    return response.text();
                }
            })
        }

        if (p) {
            return p;
        }
        else {
            throw new Error("Ocurrió un error al solicitar los datos<br>");
        }

    }
}

export const checkLogin = async function () {

    if (!localStorage.token) {
        localStorage.clear();
        return false;
    }
    if (localStorage.token.length < 0) {
        localStorage.clear();
        return false;
    }

    if (localStorage.userData && localStorage.token) {
        return true;
    }
    else {
        return false;
    }


    /*
        if (!localStorage.userData) {
            let chkLogin = await api_request('checkLogin');
            if (chkLogin.status == 1) {
                localStorage.userData = JSON.stringify(chkLogin.data);
                return true;
            }
            return false;
        }
        else {
            let localLogin = {};
            try {
                localLogin = JSON.parse(localStorage.userData);
            }
            catch {
                localStorage.userData = '';
                return false;
            }
    
            if (localLogin.checkTimeout >= Date.now()) {
                // Check login again
                let chkLogin = await api_request('checkLogin');
                if (chkLogin.result) {
                    localStorage.userData = JSON.stringify(chkLogin.result.data);
                    return true;
                }
                return false;
            }
            else {
                return true;
            }
    
        }*/
}