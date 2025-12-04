import { IUser } from '@src/models/User';

const users: IUser[] = [
  {
    id: 1,
    name: 'Admin',
    email: 'admin@test.com',
    password: '1234',
    created: new Date(),
  },
];

function getAll(): Promise<IUser[]> {
  return Promise.resolve(users);
}

export default {
  getAll,
} as const;
