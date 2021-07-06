const request = require('supertest')

describe('adding a record', () => {
    it('add a new record to the inventory', async () => {
      const res = await request('localhost:5001').post('/crud-firebase-1166f/us-central1/addMessage?text=hello from test')
        .type('application/json')
        .send({
        })
      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('result')
    })
  })