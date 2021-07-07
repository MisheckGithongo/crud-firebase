const request = require('supertest')
require('coveralls')


describe('POST /addRecord', () => {
    it('should add a new record to the inventory', async () => {
      const res = await request('localhost:5001').post('/crud-firebase-1166f/us-central1/addRecord')
        .type('application/json')
        .send({
          "itemName": "test item",
          "itemDesc": "this is an item meant for testing",
          "itemPrice": "5.00",
          "itemQty": 10,
          "inStock": true,
          "category": "test category",
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

  describe('PUT /updateRecord/:id', () => {
    it('should update the record with the id in the inventory', async () => {
      const addRes = await request('localhost:5001').post('/crud-firebase-1166f/us-central1/addRecord')
        .type('application/json')
        .send({
          "itemName": "update test item",
          "itemDesc": "update this is an item meant for testing",
          "itemPrice": "5.00",
          "itemQty": 10,
          "inStock": true,
          "category": "update test category",
        })
        const { body } = addRes
        const {data} = body
        const recordId = data.id
      const res = await request('localhost:5001').put('/crud-firebase-1166f/us-central1/updateRecord/')
        .type('application/json')
        .send({
          "id": recordId,
          "itemName": "updated test item",
          "itemDesc": "updated this is an item meant for testing",
          "itemPrice": "5.00",
          "itemQty": 10,
          "inStock": true,
          "category": "updated test category",
        })
        .expect(200)
    }).timeout(12000)
  })

  describe('DELETE /deleteRecord', () => {
    it('should delete the record with the id from the inventory', async () => {
      const addRes = await request('localhost:5001').post('/crud-firebase-1166f/us-central1/addRecord')
        .type('application/json')
        .send({
          "itemName": "delete test item",
          "itemDesc": "delete this is an item meant for testing",
          "itemPrice": "5.00",
          "itemQty": 10,
          "inStock": true,
          "category": "delete test category",
        })
        const { body } = addRes
        const {data} = body
        const recordId = data.id
      const res = await request('localhost:5001').put('/crud-firebase-1166f/us-central1/deleteRecord')
        .type('application/json')
        .send({
          id: recordId,
        })
        .expect(200)
    }).timeout(12000)
  })