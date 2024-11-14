import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { IRecommendationEngine } from "../../interfaces/IRecommendationEngine";
import { RecommendationRequest } from "../../models/types/RecommendationRequest";
import { RecommendationResponse } from "../../models/types/RecommendationResponse";
import { Logger } from "../../utils/logger/Logger";

export class RecommendationEngine implements IRecommendationEngine {
    private bedrockClient: BedrockRuntimeClient;
    private logger: Logger;

    constructor() {
        this.bedrockClient = new BedrockRuntimeClient({ region: process.env.AWS_REGION });
        this.logger = new Logger('RecommendationEngine');
    }

    async generateRecommendations(request: RecommendationRequest): Promise<RecommendationResponse> {
        try {
            const prompt = this.buildPrompt(request);
            const response = await this.invokeModel(prompt);
            return this.processResponse(response);
        } catch (error) {
            this.logger.error('Error generating recommendations:', error);
            throw error;
        }
    }

    private buildPrompt(request: RecommendationRequest): string {
        return JSON.stringify({
            prompt: `Generate product recommendations for user with the following preferences:
                    Categories: ${request.preferences.categories.join(', ')}
                    Previous purchases: ${request.preferences.previousPurchases.join(', ')}
                    Interests: ${request.preferences.interests.join(', ')}`,
            max_tokens: 1000,
            temperature: 0.7
        });
    }

    private async invokeModel(prompt: string) {
        const command = new InvokeModelCommand({
            modelId: process.env.BEDROCK_MODEL_ID,
            contentType: "application/json",
            accept: "application/json",
            body: Buffer.from(prompt)
        });

        return await this.bedrockClient.send(command);
    }

    private processResponse(response: any): RecommendationResponse {
        // Process and format the model's response
        const recommendations = JSON.parse(response.body.toString());
        return {
            recommendations: recommendations.map(this.formatRecommendation)
        };
    }

    private formatRecommendation(item: any) {
        return {
            id: item.id,
            name: item.name,
            category: item.category,
            confidence: item.confidence,
            reasoning: item.reasoning
        };
    }
}
