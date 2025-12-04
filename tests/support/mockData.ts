import { IMouvement } from '@src/models/Mouvement';

export const MOCK_MOUVEMENTS: IMouvement[] = [
  {
    reference: 'MVT-2025-0001',
    typeOperation: 'entree',
    produit: 'Chaise Ergonomique X200',
    entrepot: 'Central',
    quantite: 25,
    urgent: false,
    dateOperation: new Date('2025-11-30T12:00:00Z'),
    tags: ['furniture'],
    commentaire: 'Réception normale',
  },
  {
    reference: 'MVT-2025-0002',
    typeOperation: 'sortie',
    produit: 'Laptop HP Pro 15',
    entrepot: 'Ouest',
    quantite: 10,
    urgent: true,
    dateOperation: new Date('2025-11-29T09:15:00Z'),
    tags: ['informatique'],
    commentaire: 'Urgent - client VIP',
  },
  {
    reference: 'MVT-2025-0003',
    typeOperation: 'entree',
    produit: 'Bureau en bois massif',
    entrepot: 'Central',
    quantite: 5,
    urgent: false,
    dateOperation: new Date('2025-11-25T14:00:00Z'),
    tags: ['furniture', 'lourd'],
    commentaire: '',
  },
];
