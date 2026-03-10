const httpStatus = require("http-status");
const CatchAsync = require("../utils/CatchAsync");
const DashboardService = require("../services/Dashboard.service");

class DashboardController {
  static getStats = CatchAsync(async (req, res) => {
    const stats = await DashboardService.getDashboardStats(req?.user);
    return res.status(httpStatus.OK).json(stats);
  });

  static getRecentActivity = CatchAsync(async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const activities = await DashboardService.getRecentActivity(req?.user, limit);
    return res.status(httpStatus.OK).json(activities);
  });

  static getSalesAnalytics = CatchAsync(async (req, res) => {
    const days = parseInt(req.query.days) || 7;
    const analytics = await DashboardService.getSalesAnalytics(req?.user, days);
    return res.status(httpStatus.OK).json(analytics);
  });

  static getCategoryStats = CatchAsync(async (req, res) => {
    const stats = await DashboardService.getCategoryStats(req?.user);
    return res.status(httpStatus.OK).json(stats);
  });
}

module.exports = DashboardController;
