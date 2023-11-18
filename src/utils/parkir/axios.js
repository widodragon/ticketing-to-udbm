import axios from 'axios';

const instance = axios.create({
    baseURL: "https://api.mkpmobile.com/parking/master/master",
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

const GET = async (path = "", data, headers = {}) => {
    let promise = new Promise((resolve, reject) => {
        instance.get(path, data, {
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
    POST,
    GET
};