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

    const port = process.env.PORT || ENV.Port;
    server.listen(port);
  } catch (err) {
    logger.err(' Impossible de démarrer le serveur : ' + err);
  }
})();
