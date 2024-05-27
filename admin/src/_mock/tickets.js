import { faker } from '@faker-js/faker';

// Generate fake ticket data
export const tickets = [...Array(30)].map((_, index) => ({
  id: faker.string.uuid(),
  name: `VE THAM GIA sk Event ${index + 1}`,
  price: 100000,
  event_id: faker.string.uuid(),
  quantity: Math.floor(Math.random() * 50),
  minimum: 1,
  maximum: 1,
  opening_date: faker.date.between('2024-05-01', '2024-05-15').toISOString(),
  sale_end_date: faker.date.between('2024-05-16', '2024-05-30').toISOString(),
  status: faker.datatype.boolean(),
  event: {
    name: `Event Tại Nhà ${index + 1}`,
  },
}));
