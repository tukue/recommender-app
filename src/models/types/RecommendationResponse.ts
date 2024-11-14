export interface Recommendation {
    id: string;
    name: string;
    category: string;
    confidence: number;
    reasoning: string;
    metadata?: Record<string, any>;
}

export interface RecommendationResponse {
    recommendations: Recommendation[];
    metadata?: {
        processingTime: number;
        modelVersion: string;
    };
}
