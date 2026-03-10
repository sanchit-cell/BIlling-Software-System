const router = require("express").Router();
const DashboardController = require("../controllers/Dashboard.controller");
const Auth = require("../middlewares/Authentication");

// All dashboard routes require authentication
router.use(Auth);

// Get dashboard statistics
router.get("/stats", DashboardController.getStats);

// Get recent activity feed
router.get("/activity", DashboardController.getRecentActivity);

// Get sales analytics for charts
router.get("/analytics", DashboardController.getSalesAnalytics);

// Get category/price distribution stats
router.get("/categories", DashboardController.getCategoryStats);

module.exports = router;
