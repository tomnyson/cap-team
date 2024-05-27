import { faker } from '@faker-js/faker';

// Generate fake areas data
export const areas = [...Array(30)].map((_, index) => ({
  id: faker.string.uuid(),
  name: `Khu vực ${index + 1}`,
  event_id: faker.string.uuid(),
  opening_date: faker.date.between('2024-05-01', '2024-05-15').toISOString(),
  sale_end_date: faker.date.between('2024-05-16', '2024-05-30').toISOString(),
  description: `Mô tả ${index + 1}`,
  event: {
    name: `Sự kiện ${index + 1}`,
  },
}));
