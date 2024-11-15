import dotenv from 'dotenv';
import 'module-alias/register';
import express from 'express';
import { RecommendationService } from './services/RecommendationService'

// Load environment variables
dotenv.config();

const app = express();
const recommendationService = new RecommendationService();

app.use(express.json());

app.get('/recommendations/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const recommendations = await recommendationService.getRecommendations(userId);
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get recommendations' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
