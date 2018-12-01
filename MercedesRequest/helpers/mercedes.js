const CONST_URLS = {
    vehicle_endpoint: "https://api.mercedes-benz.com/experimental/connectedvehicle/v1/vehicles/"
}

function sendMsg(msg) {
    return 'Hii' + msg
}


function mercedesAPIRequest(method = "get", path, headers, data, query = {}, encoding = "utf-8") {
    const http = require("http");
    const querystring = require('querystring');

    const MERCEDES_API = {
        PROTOCOL: "https:",
        HOSTNAME: "api.secure.mercedes-benz.com"
    }

    const MERCEDES_CLIENT = {
        ID: "d566781b-91ff-41df-8732-345d1791e175",
        SECRET: "3c965a45-bfb1-49b8-8c84-3a66cfc16da0",
        AUTH_HEADER: 'dd'
    };


    const StringDecoder = require("string_decoder").StringDecoder;
    const decoder = new StringDecoder("utf-8");


    const APIRequest = ({
            method,
            path,
            headers,
            data,
            query,
            encoding,
        }) =>
        new Promise((resolve, reject) => {
            headers = Object.assign({

            }, )
            const options = {
                protocol: MERCEDES_API.PROTOCOL,
                hostname: MERCEDES_API.HOSTNAME,
                method,
                path: querystring.stringify(query),
                headers
            };
            const req = http.request(options, res => {
                const {
                    statusCode
                } = res;
                res.setEncoding(encoding);
                let body = "";
                res.on('data', chunk => {
                    body += decoder.write(chunk);
                });
                res.on('end', () => {
                    body += decoder.end();
                    resolve({
                        status: statusCode,
                        body,
                        headers: res.headers
                    })
                });
            });

            req.on("error", e => {
                console.error(e);
                reject(e);
            });

            if (data != null) {
                req.write(data);
            }

            req.end();
        });

    return APIRequest
}

function dotenv() {
    const dotenv = require('dotenv');
    dotenv.config();
    return process.env

}

async function getVehicleStatus(vehicleId, dataType) {
    const statusFn = higherOrderConnect(vehicleId)
    try {
        const res = await statusFn(dataType)
        return res.data

    } catch {
        return 'Error'
    }

}

function higherOrderConnect(vehicleId) {
    const axios = require('axios')
    dotenv()


    return (type) => axios.get(`${CONST_URLS.vehicle_endpoint}${vehicleId}/${type}`, {
        headers: {
            accept: 'application/json',
            authorization: `Bearer ${process.env.MERCEDES_CLIENT_Access_token}`
        }
    })



}
module.exports = {
    sendMsg,
    myFoo: (x) => {
        return x + '123'
    },
    dotenv,
    getVehicleStatus
}