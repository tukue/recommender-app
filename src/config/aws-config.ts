import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { BedrockRuntimeClient } from '@aws-sdk/client-bedrock-runtime';

// AWS SDK Configuration
export const config = {
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
  }
};

// Initialize DynamoDB Client
export const dynamoDbClient = new DynamoDBClient(config);

// Initialize Bedrock Client
export const bedrockClient = new BedrockRuntimeClient(config);
