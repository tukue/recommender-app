import { Router } from 'express';
import { RecommendationController } from '../controllers/RecommendationController';
import { validateRecommendationRequest } from '../validators/recommendationValidator';

const router = Router();
const controller = new RecommendationController();

router.post(
    '/users/:userId/recommendations',
    validateRecommendationRequest,
    (req, res) => controller.getRecommendations(req, res)
);

export default router;
