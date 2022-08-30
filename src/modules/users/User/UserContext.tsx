import { createContext } from 'react';
import { IUser } from 'src/types/user';

export const UserContext = createContext<IUser>({});
