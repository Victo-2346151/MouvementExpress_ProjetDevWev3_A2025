import MouvementRepo from '@src/repos/MouvementRepo';
import { IMouvement } from '@src/models/Mouvement';

class MouvementService {
  getAll(filters: any) {
    return MouvementRepo.getAll(filters);
  }

  getById(id: string) {
    return MouvementRepo.getById(id);
  }

  addOne(mouv: IMouvement) {
    return MouvementRepo.addOne(mouv);
  }

  updateOne(id: string, data: Partial<IMouvement>) {
    return MouvementRepo.updateOne(id, data);
  }

  deleteOne(id: string) {
    return MouvementRepo.deleteOne(id);
  }
}

export default new MouvementService();
