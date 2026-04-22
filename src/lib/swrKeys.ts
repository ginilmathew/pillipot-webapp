export const swrKeys = {
  addresses: (token: string) => ["addresses", token] as const,
  myOrders: (token: string) => ["myOrders", token] as const,
  orderDetails: (token: string, orderId: string) => ["orderDetails", token, orderId] as const,
};

