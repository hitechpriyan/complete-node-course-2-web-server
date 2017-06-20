const axios = require('axios');
const url = 'http://localhost:3000/';

axios.get(url).then((response) => {
    console.log(response.data.name);
    console.log(response.data.likes[0]);
    console.log(response.data.likes[1]);    
});