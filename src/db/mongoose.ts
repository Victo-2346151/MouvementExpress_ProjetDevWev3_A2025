import mongoose from 'mongoose';
import logger from 'jet-logger';

export async function connectDB() {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error(' MONGO_URI manquant dans .env.development');
    }

    await mongoose.connect(uri);
    logger.info('Connexion MongoDB locale réussie !');
  } catch (err) {
    logger.err(' Erreur connexion MongoDB : ' + err);
    process.exit(1);
  }
}
