const URLS = {
    graphql: 'https://gpgsql.herokuapp.com/v1alpha1/graphql'
}
async function getImages(imageType = 'truck_images', id) {
    const axios = require('axios');
    try {
        if (imageType == 'truck_images') {
            return await getTruckImages(id)
        } else if (imageType == 'driver_images') {
            return await getDriverImages(id)
        }
    } catch {
        return 'errrrr'
    }


}
async function getDriverImages(driverId) {
    const axios = require('axios');
    try {
        const res = await axios.post(URLS.graphql, {
            "query": `query {
                drivers(
                     where: { id: { _eq: ${driverId}}} 
                  ) {
                  image_url 
                }
              }`

        })
        return res.data

    } catch {
        return "err"

    }
}
async function getTruckImages(imageId) {
    const axios = require('axios');

    try {
        const res = await axios.post(URLS.graphql, {
            "query": `query {truck_images(where: {id: {_eq :${imageId}}}) { id url } }`

        })
        return res.data
    } catch {
        return "err"
    }
}
module.exports = {
    getImages,


}