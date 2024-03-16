/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ServantDto } from './ServantDto';
import type { UserDto } from './UserDto';

export type GetUserByPhoneNumberResponse = {
    isUser?: boolean;
    user?: UserDto;
    isServant?: boolean;
    servant?: ServantDto;
};
