import logger from 'jet-logger';

import ENV from '@src/common/constants/ENV';
import server from './server';
import { connectDB } from './db/mongoose';

/******************************************************************************
                                Constants
******************************************************************************/

const SERVER_START_MSG =
  'Express server started on port: ' + ENV.Port.toString();

/******************************************************************************
                                  Run
******************************************************************************/

(async () => {
  try {
    await connectDB();

    server.listen(ENV.Port, (err) => {
      if (!!err) {
        logger.err(err.message);
      } else {
        logger.info(SERVER_START_MSG);
      }
    });
  } catch (err) {
    logger.err(' Impossible de démarrer le serveur : ' + err);
  }
})();
