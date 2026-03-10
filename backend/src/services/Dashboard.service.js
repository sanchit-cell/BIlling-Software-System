const { OrdersModel, ConsumerModel, ItemsModel } = require("../models");

class DashboardService {
  static async getDashboardStats(userId) {
    // Get total orders count
    const totalOrders = await OrdersModel.countDocuments({ user: userId });
    
    // Get orders from last month for comparison
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const ordersLastMonth = await OrdersModel.countDocuments({
      user: userId,
      createdAt: { $lt: lastMonth }
    });
    
    // Get total customers
    const totalCustomers = await ConsumerModel.countDocuments({ user: userId });
    const customersLastMonth = await ConsumerModel.countDocuments({
      user: userId,
      createdAt: { $lt: lastMonth }
    });
    
    // Get low stock items (quantity <= 10)
    const lowStockItems = await ItemsModel.countDocuments({
      user: userId,
      Quantity: { $lte: 10 }
    });
    
    // Get all items for total inventory
    const totalItems = await ItemsModel.countDocuments({ user: userId });
    
    // Calculate total revenue from completed orders
    const completedOrders = await OrdersModel.find({
      user: userId,
      paymentStatus: 'Completed'
    }).populate('Items');
    
    let totalRevenue = 0;
    completedOrders.forEach(order => {
      order.Items.forEach(item => {
        totalRevenue += item.price || 0;
      });
    });
    
    // Calculate revenue from last month
    const completedOrdersLastMonth = await OrdersModel.find({
      user: userId,
      paymentStatus: 'Completed',
      createdAt: { $lt: lastMonth }
    }).populate('Items');
    
    let revenueLastMonth = 0;
    completedOrdersLastMonth.forEach(order => {
      order.Items.forEach(item => {
        revenueLastMonth += item.price || 0;
      });
    });
    
    // Calculate percentage changes
    const ordersChange = ordersLastMonth > 0 
      ? Math.round(((totalOrders - ordersLastMonth) / ordersLastMonth) * 100 * 10) / 10
      : 0;
    
    const customersChange = customersLastMonth > 0
      ? Math.round(((totalCustomers - customersLastMonth) / customersLastMonth) * 100 * 10) / 10
      : 0;
    
    const revenueChange = revenueLastMonth > 0
      ? Math.round(((totalRevenue - revenueLastMonth) / revenueLastMonth) * 100 * 10) / 10
      : 0;
    
    // Pending orders count
    const pendingOrders = await OrdersModel.countDocuments({
      user: userId,
      paymentStatus: 'Pending'
    });

    return {
      totalRevenue,
      totalOrders,
      totalCustomers,
      lowStockItems,
      totalItems,
      pendingOrders,
      revenueChange,
      ordersChange,
      customersChange,
      stockChange: lowStockItems > 0 ? -Math.round((lowStockItems / totalItems) * 100) : 0
    };
  }

  static async getRecentActivity(userId, limit = 10) {
    // Get recent orders
    const recentOrders = await OrdersModel.find({ user: userId })
      .populate('consumer', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit);
    
    // Get recent customers
    const recentCustomers = await ConsumerModel.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5);
    
    // Get low stock items
    const lowStockItemsList = await ItemsModel.find({
      user: userId,
      Quantity: { $lte: 10 }
    }).sort({ Quantity: 1 }).limit(5);
    
    // Combine into activity feed
    const activities = [];
    
    // Add order activities
    recentOrders.forEach(order => {
      activities.push({
        id: order._id,
        type: order.paymentStatus === 'Completed' ? 'payment' : 'order',
        message: order.paymentStatus === 'Completed' 
          ? `Payment received for order #${order._id.toString().slice(-6)}`
          : `New order #${order._id.toString().slice(-6)} created`,
        status: order.paymentStatus === 'Completed' ? 'success' : 
                order.paymentStatus === 'Failed' ? 'error' : 'info',
        time: order.createdAt,
        meta: {
          orderId: order._id,
          customerName: order.consumer?.name
        }
      });
    });
    
    // Add customer activities
    recentCustomers.forEach(customer => {
      activities.push({
        id: customer._id,
        type: 'customer',
        message: `New customer registered: ${customer.name}`,
        status: 'info',
        time: customer.createdAt,
        meta: {
          customerId: customer._id,
          customerName: customer.name
        }
      });
    });
    
    // Add low stock alerts
    lowStockItemsList.forEach(item => {
      activities.push({
        id: item._id,
        type: 'inventory',
        message: `Low stock alert: ${item.item_name} (${item.Quantity} left)`,
        status: 'warning',
        time: item.updatedAt,
        meta: {
          itemId: item._id,
          itemName: item.item_name,
          quantity: item.Quantity
        }
      });
    });
    
    // Sort by time and limit
    activities.sort((a, b) => new Date(b.time) - new Date(a.time));
    
    return activities.slice(0, limit);
  }

  static async getSalesAnalytics(userId, days = 7) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    // Get orders grouped by date
    const orders = await OrdersModel.find({
      user: userId,
      createdAt: { $gte: startDate }
    }).populate('Items');
    
    // Group by date
    const salesByDate = {};
    const ordersByDate = {};
    
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      salesByDate[dateKey] = 0;
      ordersByDate[dateKey] = 0;
    }
    
    orders.forEach(order => {
      const dateKey = order.createdAt.toISOString().split('T')[0];
      if (salesByDate.hasOwnProperty(dateKey)) {
        ordersByDate[dateKey]++;
        if (order.paymentStatus === 'Completed') {
          order.Items.forEach(item => {
            salesByDate[dateKey] += item.price || 0;
          });
        }
      }
    });
    
    // Convert to arrays for charts
    const labels = Object.keys(salesByDate).reverse();
    const salesData = Object.values(salesByDate).reverse();
    const ordersData = Object.values(ordersByDate).reverse();
    
    return {
      labels,
      sales: salesData,
      orders: ordersData
    };
  }

  static async getCategoryStats(userId) {
    // Get all items grouped by category (using price ranges as pseudo-categories)
    const items = await ItemsModel.find({ user: userId });
    
    const categories = {
      'Low Price (< ₹500)': 0,
      'Medium Price (₹500-2000)': 0,
      'High Price (> ₹2000)': 0
    };
    
    items.forEach(item => {
      if (item.price < 500) {
        categories['Low Price (< ₹500)']++;
      } else if (item.price <= 2000) {
        categories['Medium Price (₹500-2000)']++;
      } else {
        categories['High Price (> ₹2000)']++;
      }
    });
    
    return {
      labels: Object.keys(categories),
      data: Object.values(categories)
    };
  }
}

module.exports = DashboardService;
