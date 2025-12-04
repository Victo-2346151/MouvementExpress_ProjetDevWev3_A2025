import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const router = Router();

const swaggerDocument = YAML.load(
  path.join(__dirname, '../DocumentationApi/api.yaml'),
);

// Swagger UI  /api/docs
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
