const URLS = {
    graphql: 'https://gpgsql.herokuapp.com/v1alpha1/graphql'
}
async function getImages(imageType = 'truck_images', imageId) {
    const axios = require('axios');
    try {
        const res = await axios.post(URLS.graphql, {
            "query": `query {${imageType}(where: {id: {_eq :${imageId}}}) { id url } }`

        })
        return res.data
    } catch {
        return "err"
    }

}
module.exports = {
    getImages,


}