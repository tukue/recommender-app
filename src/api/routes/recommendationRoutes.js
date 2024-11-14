import { Router, Request, Response } from 'express';

const router = Router();

router.get('/recommendations', (req: Request, res: Response) => {
  res.json({
    recommendations: [
      {
        id: '1',
        name: 'Sample Product',
        category: 'Electronics',
        confidence: 0.95
      }
    ]
  });
});

export default router;
