export interface Payment {
  id: string;
  transactionId: string;
  bookingId: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed" | "refunded";
  paymentMethod: "card" | "bank_transfer" | "wallet" | "other";
  paymentReference?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentFilters {
  status?: string;
  paymentMethod?: string;
  bookingId?: string;
  startDate?: string;
  endDate?: string;
}

