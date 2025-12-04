import Mouvement, { IMouvement } from '@src/models/Mouvement';

class MouvementRepo {
  /*GET ALL avec filtres */
  public async getAll(filters: any = {}): Promise<IMouvement[]> {
    const query: any = {};

    /* Filtre  typeOperation*/
    if (filters.typeOperation) {
      query.typeOperation = filters.typeOperation;
    }

    /*Filtre urgent = true/false */
    if (filters.urgent !== undefined) {
      query.urgent = filters.urgent === 'true' || filters.urgent === true;
    }

    return await Mouvement.find(query).sort({ dateOperation: -1 }).exec();
  }

  /*get by id*/
  public async getById(id: string): Promise<IMouvement | null> {
    return await Mouvement.findById(id).exec();
  }

  /*Addone */
  public async addOne(mouv: IMouvement): Promise<IMouvement> {
    const newMouv = new Mouvement(mouv);
    return await newMouv.save();
  }

  /*update one*/
  public async updateOne(
    id: string,
    updates: Partial<IMouvement>,
  ): Promise<IMouvement | null> {
    return await Mouvement.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).exec();
  }

  /* Delete ne */
  public async deleteOne(id: string): Promise<IMouvement | null> {
    return await Mouvement.findByIdAndDelete(id).exec();
  }
}

export default new MouvementRepo();
