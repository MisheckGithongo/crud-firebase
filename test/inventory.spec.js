const request = require('supertest')

describe('POST /addRecord', () => {
    it('should add a new record to the inventory', async () => {
      const res = await request('localhost:5001').post('/crud-firebase-1166f/us-central1/addRecord')
        .type('application/json')
        .send({
          record:{
            "itemName": "test item",
            "itemDesc": "this is an item meant for testing",
            "itemPrice": "5.00",
            "itemQty": 10,
            "inStock": true,
            "category": "test category",
          },
        }).expect(201)
    }).timeout(6000)
  })

  describe('GET /inventory', () => {
    it('should return all records in the inventory', async () => {
      const res = await request('localhost:5001').get('/crud-firebase-1166f/us-central1/inventory')
        .type('application/json')
        .expect(200)
    }).timeout(6000)
  })

  describe('PUT /updateRecord', () => {
    it('should update the record with the id in the inventory', async () => {
      const res = await request('localhost:5001').put('/crud-firebase-1166f/us-central1/inventory/:1')
        .type('application/json')
        .send({
          recordId: 1,
        })
        .expect(201)
    }).timeout(6000)
  })

  describe('DELETE /deleteRecord', () => {
    it('should delete the record with the id from the inventory', async () => {
      const res = await request('localhost:5001').put('/crud-firebase-1166f/us-central1/inventory/:1')
        .type('application/json')
        .send({
          recordId: 1,
        })
        .expect(201)
    }).timeout(6000)
  })