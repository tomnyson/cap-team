import { faker } from '@faker-js/faker';

// Generate fake areas data
export const groups = [...Array(30)].map((_, index) => ({
  id: faker.string.uuid(),
  name: `Nhóm ${index + 1}`
}));
