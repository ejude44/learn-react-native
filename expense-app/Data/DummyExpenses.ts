function generateId(): string {
  return Math.random().toString(36) + Date.now().toString(36);
}

const DUMMY_EXPENSES = [
  {
    id: generateId(),
    description: 'A Pair of shoes',
    amount: 59.99,
    date: new Date('2021-12-19'),
  },
  {
    id: generateId(),
    description: 'A Pair cars',
    amount: 49.99,
    date: new Date('2023-05-22'),
  },
  {
    id: generateId(),
    description: 'A big book',
    amount: 19.99,
    date: new Date('2025-01-2'),
  },
  {
    id: generateId(),
    description: 'a house',
    amount: 1900.99,
    date: new Date('2024-01-28'),
  },
  {
    id: generateId(),
    description: 'a small cat',
    amount: 1900.99,
    date: new Date('2024-01-28'),
  },
  {
    id: generateId(),
    description: 'A big book',
    amount: 19.99,
    date: new Date('2025-01-2'),
  },
  {
    id: generateId(),
    description: 'a house',
    amount: 1900.99,
    date: new Date('2024-01-28'),
  },
  {
    id: generateId(),
    description: 'a small cat',
    amount: 1900.99,
    date: new Date('2024-01-28'),
  },
  {
    id: generateId(),
    description: 'A big book',
    amount: 19.99,
    date: new Date('2025-09-20'),
  },
  {
    id: generateId(),
    description: 'a house',
    amount: 1900.99,
    date: new Date('2024-01-28'),
  },
  {
    id: generateId(),
    description: 'a small cat',
    amount: 1900.99,
    date: new Date('2024-01-28'),
  },
];

export { DUMMY_EXPENSES };
