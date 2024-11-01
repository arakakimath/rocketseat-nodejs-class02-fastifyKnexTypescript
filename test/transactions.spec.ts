import { it, test, beforeAll, afterAll, describe, expect, beforeEach } from 'vitest'
import { execSync } from 'node:child_process'
import request from 'supertest' // needs to install @types/supertest
import { app } from '../src/app'

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready()
  })
  
  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npx knex migrate:rollback --all')
    execSync('npx knex migrate:latest')
  })
  
  // it('should be able to create a new transaction', async () => { ... }
  test('o usuário consegue criar uma nova transação', async () => {
    await request(app.server)
      .post('/transactions').send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })
      .expect(201)
  })

  it('should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions').send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })

      const cookies = createTransactionResponse.get('Set-Cookie')

      const listTransactionsResponse = await request(app.server)
        .get('/transactions')
        .set('Cookie', cookies)
        .expect(200)
      
      
      console.log(listTransactionsResponse.body.transactions)
      expect(listTransactionsResponse.body.transactions).toEqual([
        expect.objectContaining({
          'title': 'New transaction',
          amount: 5000

        }),
      ])
  })
})

