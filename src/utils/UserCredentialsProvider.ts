import { env } from 'process';
import { AccountType } from './enum/AccountType';
import Credentials from './interfaces/Credentials';

export default class UserCredentialsProvider  {
    private static readonly accountInfo = {
        standard: {
            userName: 'standard_user',
            password: 'secret_sauce'

        },
        locked: {
            userName: 'locked_out_user',
            password: 'secret_sauce'
        },
        problem: {
            userName: 'problem_user',
            password: 'secret_sauce'
        },
        performance: {
            userName: 'performance_glitch_user',
            password: 'secret_sauce'
        },
    };

    public static getUserCredentials(accountType: AccountType): Credentials {
        return this.accountInfo[accountType];
    }
}