export interface DummyOrder {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_city: string;
  customer_address: string;
  total_amount: number;
  payment_method: string;
  payment_status: string;
  order_status: string;
  created_at: string;
  items: unknown[];
  delivery_charge: number;
  user_id: string | null;
}

export const dummyOrders: DummyOrder[] = [
  {
    id: 'demo-order-1',
    customer_name: 'Rajesh Shrestha',
    customer_phone: '9841234567',
    customer_city: 'Kathmandu',
    customer_address: 'Lazimpat, Kathmandu',
    total_amount: 5999,
    payment_method: 'cod',
    payment_status: 'pending',
    order_status: 'delivered',
    created_at: '2026-01-15T10:30:00Z',
    items: [],
    delivery_charge: 100,
    user_id: null,
  },
  {
    id: 'demo-order-2',
    customer_name: 'Sita Gurung',
    customer_phone: '9812345678',
    customer_city: 'Pokhara',
    customer_address: 'Lakeside, Pokhara',
    total_amount: 8999,
    payment_method: 'esewa',
    payment_status: 'paid',
    order_status: 'shipped',
    created_at: '2026-02-01T14:00:00Z',
    items: [],
    delivery_charge: 200,
    user_id: null,
  },
  {
    id: 'demo-order-3',
    customer_name: 'Anil Thapa',
    customer_phone: '9867890123',
    customer_city: 'Bhaktapur',
    customer_address: 'Durbar Square, Bhaktapur',
    total_amount: 3499,
    payment_method: 'khalti',
    payment_status: 'paid',
    order_status: 'confirmed',
    created_at: '2026-02-10T09:15:00Z',
    items: [],
    delivery_charge: 0,
    user_id: null,
  },
];