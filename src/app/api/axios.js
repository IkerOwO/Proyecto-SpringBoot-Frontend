import axios from 'axios';

// GET Request
axios.get('http://localhost:8080/api/data')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));

// POST Request
axios.post('http://localhost:8080/api/data', { key: 'value' }, {
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => console.log(response.data))
  .catch(error => console.error(error));   