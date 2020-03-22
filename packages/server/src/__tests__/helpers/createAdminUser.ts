import bcrypt from 'bcryptjs';

import User from '@models/User';

const createAdminUser = (): {
  email: string;
  password: string;
  name: string;
  createUser: () => Promise<User | null>;
} => {
  const email = 'admin@fastfeet.com';
  const password = 'fastfeet';
  const name = 'Fastfeet Admin';

  const createUser = async () => {
    try {
      return User.create({
        name,
        email,
        password_hash: await bcrypt.hash(password, 8),
      });
    } catch (e) {
      console.log('create user error', e);
      return null;
    }
  };

  return {
    email,
    password,
    createUser,
    name,
  };
};

export default createAdminUser;
