export default {
  Base: '/api',

  GenerateToken: {
    Base: '/generatetoken',
    Get: '/',
  },

  Mouvement: {
    Base: '/mouvements',
    Get: '/',
    GetById: '/:id',
    Add: '/',
    Update: '/:id',
    Delete: '/:id',
  },
} as const;
