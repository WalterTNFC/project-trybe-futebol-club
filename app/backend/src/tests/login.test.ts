import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';

// import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa o Requisito 3', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  describe('Testa o sucesso do meotodo POST da rota /login', () => {
    before(async () =>  {
      sinon
        .stub(User, 'findOne')
        .resolves({
          id: 1,
          username: 'test',
          role: 'test',
          email: 'test@test.com',
          password: '123456'
        } as User); 
    });

    after(async () => {
      (User.findOne as sinon.SinonStub).restore();
    })

    it('Verificação de status igual a 200', async () => {
      const chaiHttpResponse: Response = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'test@test.com',
          password: 'secret_test',
        });
    
      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body).to.have.key('token');
    });
  });
});
