# User Guide

## Introduction
This guide provides an overview of how to use the billing software, from logging in to managing inventory and processing orders.

## Login

1. Click on the "Login" button.
2. Use the following credentials to login as a test user:
   - **Email:** EV Shop Owner
   - **Password:** admin

> **Note:** This test user has some seeded data in the database already.

## Registering a New Consumer
1. After logging in, navigate to the "Customers" page via the sidebar.
2. Click on the "Add Customer" button.
3. Fill in the consumer details and submit the form.

## Managing Inventory
1. Go to the "Inventory" page via the sidebar.
2. You can:
   - **Add a new item:** Click on the "Add Item" button, fill in the item details, and submit.
   - **Update an existing item:** Click on the "Edit" button next to the item, modify the details, and save.
   - **Search for an item:** Use the search bar to find specific items by name or other details.

## Managing Orders
1. Navigate to the "Orders" page via the sidebar.
2. You can:
   - **Add a new order:** Click on the "Add Order" button, select a consumer, add items, and submit.
   - **Update an existing order:** Click on the "Edit" button next to the order, modify the details, and save.
   - **Delete an order:** Click on the "Delete" button next to the order.
3. Once an order is created, it will appear at the top of the orders list with the payment status set to "pending."

## Processing Payments
1. In the "Orders" page, find the order you want to process.
2. Click on the "Checkout" button on the order card.
3. This will generate the bill and proceed with the payment using a card.
4. The payment status will be updated automatically via webhooks.

## Sales Analytics (Dashboard)
1. Access the "Sales Analytic" (Dashboard) via the sidebar.
2. View various sales metrics and analytics to track your business performance.

---

