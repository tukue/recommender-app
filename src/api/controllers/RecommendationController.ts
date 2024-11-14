import { Request, Response } from 'express';
import { RecommendationEngine } from '../../core/engine/RecommendationEngine';
import { RecommendationRequest } from '../../models/types/RecommendationRequest';
import { Logger } from '../../utils/logger/Logger';

export class RecommendationController {
    private engine: RecommendationEngine;
    private logger: Logger;

    constructor() {
        this.engine = new RecommendationEngine();
        this.logger = new Logger('RecommendationController');
    }

    async getRecommendations(req: Request, res: Response) {
        try {
            const request: RecommendationRequest = {
                userId: req.params.userId,
                preferences: req.body.preferences,
                limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
                context: {
                    location: req.headers['x-location'] as string,
                    device: req.headers['user-agent'],
                    timestamp: Date.now()
                }
            };

            const recommendations = await this.engine.generateRecommendations(request);
            res.json(recommendations);
        } catch (error) {
            this.logger.error('Error in getRecommendations:', error);
            res.status(500).json({
                error: 'Failed to generate recommendations',
                details: error.message
            });
        }
    }
}
