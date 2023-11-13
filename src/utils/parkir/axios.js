import axios from 'axios';

const instance = axios.create({
    baseURL: "http://sandbox.mkpmobile.com:10080/api/parking/master",
});

instance.defaults.headers.common['Content-Type'] = "application/json";

const POST = async (path = "", data, headers = {}) => {
    let promise = new Promise((resolve, reject) => {
        instance.post(path, data, {
            headers: {
                ...headers
            }
        }).then((res) => {
            if (res.status === 200 || res.status === 201) {
                resolve(res.data)
            }
        }).catch(async (error) => {
            reject(error);
        })
    })
    return promise;
}

export default {
    POST
};