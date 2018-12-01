module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    const MercedesHelper = require('./helpers/mercedes')
    if (req.query.name || (req.body && req.body.name)) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello " + (req.query.name || req.body.name)
        };
    }
    else {
        context.res = {
            status: 400,
            body:  JSON.stringify(MercedesHelper.myFoo('w'))

        };
    }
};