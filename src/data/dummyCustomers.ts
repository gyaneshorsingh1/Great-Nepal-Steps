export interface DummyCustomer {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  created_at: string;
}

export const dummyCustomers: DummyCustomer[] = [
  {
    id: 'demo-customer-1',
    user_id: 'demo-user-1',
    full_name: 'Rajesh Shrestha',
    phone: '9841234567',
    created_at: '2025-12-01T08:00:00Z',
  },
  {
    id: 'demo-customer-2',
    user_id: 'demo-user-2',
    full_name: 'Sita Gurung',
    phone: '9812345678',
    created_at: '2026-01-05T12:00:00Z',
  },
  {
    id: 'demo-customer-3',
    user_id: 'demo-user-3',
    full_name: 'Anil Thapa',
    phone: '9867890123',
    created_at: '2026-01-20T16:00:00Z',
  },
];