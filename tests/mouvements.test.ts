import request from 'supertest';
import server from '../src/server';
import mongoose from 'mongoose';
import MouvementRepo from '../src/repos/MouvementRepo';

describe('Mouvement API Tests', () => {
  /*TESTS*/
  /*GET ALL*/

  it('GET /mouvements retourner 200 et unevide une liste des mouvements', async () => {
    const res = await request(server).get('/api/mouvements');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.mouvements)).toBe(true);
  });

  /* POST valide */
  it('POST /mouvements creer un mouvement (201)', async () => {
    const data = {
      reference: 'MV-001',
      typeOperation: 'entree',
      produit: 'Écran Dell',
      entrepot: 'Central',
      quantite: 10,
      urgent: false,
      dateOperation: '2025-01-01',
      commentaire: 'TEST',
      tags: ['info'],
    };

    const res = await request(server).post('/api/mouvements').send(data);

    expect(res.status).toBe(201);
    expect(res.body.mouvement.reference).toBe('MV-001');
  });

  /* POST invalide */
  it('POST /mouvements Retourner 400 si données invalides', async () => {
    const data = {
      reference: '',
      typeOperation: 'xxxx',
      quantite: -5,
    };

    const res = await request(server).post('/api/mouvements').send(data);

    expect(res.status).toBe(400);
    expect(res.body.erreur).toBeDefined();
  });

  /*GET BY ID*/
  it('GET /mouvements/:id   Retourner un mouvement', async () => {
    const obj = await MouvementRepo.addOne({
      reference: 'MV-002',
      typeOperation: 'sortie',
      produit: 'Clavier',
      entrepot: 'Est',
      quantite: 5,
      urgent: true,
      dateOperation: new Date(),
      commentaire: 'OK',
      tags: ['tech'],
    } as any);

    const res = await request(server).get(`/api/mouvements/${obj._id}`);

    expect(res.status).toBe(200);
    expect(res.body.mouvement.reference).toBe('MV-002');
  });

  it('GET /mouvements/:id — Retourner 200 + null si inexistant', async () => {
    const fakeId = new mongoose.Types.ObjectId();

    const res = await request(server).get(`/api/mouvements/${fakeId}`);

    expect(res.status).toBe(200);
    expect(res.body.mouvement).toBeNull();
  });

  /*PUT*/
  it('PUT /mouvements/:id — devrait modifier un mouvement', async () => {
    const obj = await MouvementRepo.addOne({
      reference: 'MV-003',
      typeOperation: 'entree',
      produit: 'Chaise',
      entrepot: 'Ouest',
      quantite: 50,
      urgent: false,
      dateOperation: new Date(),
      commentaire: 'OK',
      tags: ['bureau'],
    } as any);

    const res = await request(server)
      .put(`/api/mouvements/${obj._id}`)
      .send({ quantite: 999 });

    expect(res.status).toBe(200);
    expect(res.body.mouvement.quantite).toBe(999);
  });

  /*DELETE*/
  it('DELETE /mouvements/:id — Supprimer un mouvement', async () => {
    const obj = await MouvementRepo.addOne({
      reference: 'MV-004',
      typeOperation: 'sortie',
      produit: 'Serveur',
      entrepot: 'Central',
      quantite: 1,
      urgent: true,
      dateOperation: new Date(),
      commentaire: 'Supp',
      tags: ['urgent'],
    } as any);

    const res = await request(server).delete(`/api/mouvements/${obj._id}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBeDefined();
  });
});
