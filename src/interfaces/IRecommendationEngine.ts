import { RecommendationRequest } from "../models/types/RecommendationRequest";
import { RecommendationResponse } from "../models/types/RecommendationResponse";

export interface IRecommendationEngine {
    generateRecommendations(request: RecommendationRequest): Promise<RecommendationResponse>;
}
