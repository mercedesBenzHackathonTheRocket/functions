module.exports = async function (context, req) {
    const MercedesHelper = require('./helpers/mercedes')
    const axios = require('axios');
    const possible_queries = ['tires', 'location', 'odometer', 'fuel', 'door']

    if (possible_queries.indexOf(req.query.query_type) === -1) {
        context.res = {
            status: 404,
            body: JSON.stringify('Bad method!')
        }
        return

    }
    if (req.query.vehicle_id) {
        try {
            const location = await MercedesHelper.getVehicleStatus(req.query.vehicle_id, req.query.query_type)
            context.res = {
                status: 200,
                body: JSON.stringify(location)

            };
        } catch {
            context.res = {
                status: 400,
                body: JSON.stringify('Error')
            }
        }
        return
    } else {
        context.res = {
            status: 404,
            body: JSON.stringify('Vehicle ID is missing!')
        }


    }
};