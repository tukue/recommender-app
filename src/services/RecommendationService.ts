import { RecommendationEngine } from '../core/engine/RecommendationEngine';

export class RecommendationService {
    private engine: RecommendationEngine;

    constructor() {
        this.engine = new RecommendationEngine();
    }

    async getRecommendations(userId: string, preferences?: any) {
        try {
            const recommendations = await this.engine.generateRecommendations({
                userId,
                preferences,
                limit: 10
            });

            return recommendations;
        } catch (error) {
            console.error('Error in RecommendationService:', error);
            throw new Error('Failed to generate recommendations');
        }
    }
}
