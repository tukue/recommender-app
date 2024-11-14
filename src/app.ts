import express from 'express';
import recommendationRoutes from './api/routes/recommendationRoutes';
import { Logger } from './utils/logger/Logger';

const app = express();
const logger = new Logger('App');

app.use(express.json());

// Routes
app.use('/api/v1', recommendationRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.error('Unhandled error:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: err.message
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});

export default app;
