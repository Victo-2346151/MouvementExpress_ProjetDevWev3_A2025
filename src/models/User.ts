import { isString } from 'jet-validators';
import { parseObject, TParseOnError } from 'jet-validators/utils';
import { isRelationalKey, transIsDate } from '@src/common/util/validators';
import { IModel } from './common/types';

export interface IUser extends IModel {
  name: string;
  email: string;
  password: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

const DEFAULT_USER_VALS = (): IUser => ({
  id: -1,
  name: '',
  created: new Date(),
  password: '',
  email: '',
});

const parseUser = parseObject<IUser>({
  id: isRelationalKey,
  name: isString,
  email: isString,
  password: isString,
  created: transIsDate,
});

const parseUserLogin = parseObject<IUserLogin>({
  email: isString,
  password: isString,
});

function __new__(user?: Partial<IUser>): IUser {
  const retVal = { ...DEFAULT_USER_VALS(), ...user };
  return parseUser(retVal, (errors) => {
    throw new Error('Setup new user failed ' + JSON.stringify(errors, null, 2));
  });
}

function test(arg: unknown, errCb?: TParseOnError): arg is IUser {
  return !!parseUser(arg, errCb);
}

function testlogin(arg: unknown, errCb?: TParseOnError): arg is IUserLogin {
  return !!parseUserLogin(arg, errCb);
}

export default {
  new: __new__,
  test,
  testlogin,
} as const;
