module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    const MercedesHelper = require('./helpers/mercedes')
    const axios = require('axios');
    if (req.query.name || (req.body && req.body.name)) {
        try {

            const res = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
            console.log(res.data)

            context.res = {
                status: 200,
                body: JSON.stringify(res.data)
            };
        } catch {
            throw Error("Request failure");
        }
    } else {
        context.res = {
            status: 200,
            body: JSON.stringify(MercedesHelper.myFoo('w'))

        };
    }
};