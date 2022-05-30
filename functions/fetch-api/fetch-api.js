const axios = require('axios');



const handler = async function (event) {
  // apply our function to the queryStringParameters and assign it to a variable
  //const json = event.queryStringParameters.data
  var data = event.queryStringParameters.data
  //var data = JSON.stringify(event.queryStringParameters.data)
  
  var config = {
    method: 'post',
    url: 'https://c8rcvcb1u9.execute-api.us-east-1.amazonaws.com/prod/predict',
    headers: {
      'X-API-KEY': API_KEY,
      'Content-Type': 'application/json'
    },
    data : data
  };

  try {
    const { data } = await axios(config)
    // refer to axios docs for other methods if you need them
    // for example if you want to POST data:
    //    axios.post('/user', { firstName: 'Fred' })
    console.log(JSON.stringify(data));
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (error) {
    const { data, headers, status, statusText } = error.response
    return {
      statusCode: error.response.status,
      body: JSON.stringify({ status, statusText, headers, data }),
    }
  }

/*  await axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));

  })
  .catch(function (error) {
    console.log(error);

  });
*/


}

module.exports = { handler }
