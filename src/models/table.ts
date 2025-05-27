export interface Table {
  id: string;
  name: string;
  status: 'Normal' | 'VIP';
  people: number;
  createdAt: string;
}

export interface TableApiItem {
  id: string;
  name: string;
  status: string; // 'Normal' or 'VIP'
  people: number;
  createdAt: string;
}
