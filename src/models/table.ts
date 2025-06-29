export interface Table {
  id: string;
  name: string;
  status: 'available' | 'busy';
  type: 'normal' | 'vip' | 'exclusive';
  people: number;
  createdAt: string;
  _id: string;
}

export interface TableApiItem {
  id: string;
  name: string;
  status: string; // 'Normal' or 'VIP'
  people: number;
  createdAt: string;
}
