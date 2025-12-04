import { Router } from 'express';
import Paths from '@src/common/constants/Paths';

import JetonRoutes from './JetonRoutes';
import MouvementRoutes from './MouvementRoutes';
import authenticateToken from '@src/middleware/authenticateToken';
import SwaggerRoutes from './SwaggerRoutes';

const apiRouter = Router();
// Affichage Swagger UI public
apiRouter.use('/docs', SwaggerRoutes);

/*Route publique qui generer un token*/
apiRouter.post(
  Paths.GenerateToken.Base + Paths.GenerateToken.Get,
  JetonRoutes.generateToken,
);

/*Middleware JWT */
apiRouter.use(authenticateToken);

/*ROUTES MOUVEMENTS AVEC BASE*/
apiRouter.get(
  Paths.Mouvement.Base + Paths.Mouvement.Get,
  MouvementRoutes.getAll,
);
apiRouter.post(Paths.Mouvement.Base + Paths.Mouvement.Add, MouvementRoutes.add);
apiRouter.get(
  Paths.Mouvement.Base + Paths.Mouvement.GetById,
  MouvementRoutes.getById,
);
apiRouter.put(
  Paths.Mouvement.Base + Paths.Mouvement.Update,
  MouvementRoutes.update,
);
apiRouter.delete(
  Paths.Mouvement.Base + Paths.Mouvement.Delete,
  MouvementRoutes.delete,
);

export default apiRouter;
