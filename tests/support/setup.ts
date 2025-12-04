import { beforeAll, afterAll } from 'vitest';
import supertest, { Test } from 'supertest';
import TestAgent from 'supertest/lib/agent';

import app from '@src/server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import ENV from '@src/common/constants/ENV';
import MouvementRepo from '@src/repos/MouvementRepo';

let agent: TestAgent<Test>;

// Création du token JWT pour les tests
const token = jwt.sign({ email: 'admin@test.com' }, ENV.Jwtsecret, {
  expiresIn: '1h',
});

beforeAll(async () => {
  // Connexion MongoDB
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(ENV.MongoUri);
  }

  // Agent supertest
  agent = supertest.agent(app);
});

afterAll(async () => {
  await mongoose.connection.close();
});

export { agent, token };
