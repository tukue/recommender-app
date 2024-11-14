"use strict";
exports.__esModule = true;
var express_1 = require("express");
var recommendationRoutes_1 = require("./api/routes/recommendationRoutes");
var Logger_1 = require("./utils/logger/Logger");
var app = (0, express_1["default"])();
var logger = new Logger_1.Logger('App');
app.use(express_1["default"].json());
// Routes
app.use('/api/v1', recommendationRoutes_1["default"]);
// Error handling middleware
app.use(function (err, req, res, next) {
    logger.error('Unhandled error:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: err.message
    });
});
var port = process.env.PORT || 3000;
app.listen(port, function () {
    logger.info("Server running on port ".concat(port));
});
exports["default"] = app;
