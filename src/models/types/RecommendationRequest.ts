export interface UserPreferences {
    categories: string[];
    previousPurchases: string[];
    interests: string[];
    constraints?: {
        priceRange?: {
            min: number;
            max: number;
        };
        excludeCategories?: string[];
    };
}

export interface RecommendationRequest {
    userId: string;
    preferences: UserPreferences;
    limit?: number;
    context?: {
        location?: string;
        device?: string;
        timestamp?: number;
    };
}
