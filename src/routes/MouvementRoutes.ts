import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import MouvementService from '@src/services/MouvementService';
import { IReq, IRes } from './common/types';

/******************************************************************************
                                GET ALL
******************************************************************************/
async function getAll(req: IReq, res: IRes) {
  const mouvements = await MouvementService.getAll(req.query);
  return res.status(HttpStatusCodes.OK).json({ mouvements });
}

/******************************************************************************
                                GET BY ID
******************************************************************************/
async function getById(req: IReq, res: IRes) {
  const mouv = await MouvementService.getById(req.params.id);
  return res.status(HttpStatusCodes.OK).json({ mouvement: mouv || null });
}

/******************************************************************************
                                POST
******************************************************************************/
async function add(req: IReq, res: IRes) {
  try {
    const created = await MouvementService.addOne(req.body);
    return res.status(HttpStatusCodes.CREATED).json({ mouvement: created });
  } catch (err: any) {
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      erreur: err.message,
    });
  }
}

/******************************************************************************
                                PUT
******************************************************************************/
async function update(req: IReq, res: IRes) {
  try {
    const updated = await MouvementService.updateOne(req.params.id, req.body);

    if (!updated) {
      return res.status(HttpStatusCodes.NOT_FOUND).json({
        erreur: 'Aucun mouvement trouvé avec cet identifiant.',
      });
    }

    return res.status(HttpStatusCodes.OK).json({ mouvement: updated });
  } catch (err: any) {
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      erreur: err.message,
    });
  }
}

/******************************************************************************
                                DELETE
******************************************************************************/
async function delete_(req: IReq, res: IRes) {
  const deleted = await MouvementService.deleteOne(req.params.id);

  if (!deleted) {
    return res.status(HttpStatusCodes.NOT_FOUND).json({
      erreur: 'Aucun mouvement trouvé avec cet identifiant.',
    });
  }

  return res.status(HttpStatusCodes.OK).json({
    message: 'Mouvement supprimé avec succès.',
  });
}

/******************************************************************************
                                EXPORT
******************************************************************************/

export default {
  getAll,
  getById,
  add,
  update,
  delete: delete_,
} as const;
