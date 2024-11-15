import { Request, Response, NextFunction } from 'express';

export const validateRecommendationRequest = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { userId } = req.params;
    const { preferences } = req.body;

    // Validate userId
    if (!userId) {
        res.status(400).json({
            status: 'error',
            message: 'User ID is required'
        });
        return;
    }

    // Validate preferences object
    if (!preferences || typeof preferences !== 'object') {
        res.status(400).json({
            status: 'error',
            message: 'Preferences object is required'
        });
        return;
    }

    // Validate preferences structure
    const { categories, priceRange, interests } = preferences;

    // Validate categories if provided
    if (categories && !Array.isArray(categories)) {
        res.status(400).json({
            status: 'error',
            message: 'Categories must be an array'
        });
        return;
    }

    // Validate priceRange if provided
    if (priceRange && typeof priceRange === 'object') {
        const { min, max } = priceRange;
        if (
            typeof min !== 'number' || 
            typeof max !== 'number' || 
            min < 0 || 
            max < min
        ) {
            res.status(400).json({
                status: 'error',
                message: 'Invalid price range'
            });
            return;
        }
    }

    // Validate interests if provided
    if (interests && !Array.isArray(interests)) {
        res.status(400).json({
            status: 'error',
            message: 'Interests must be an array'
        });
        return;
    }

    // If all validations pass, proceed to the next middleware
    next();
};
