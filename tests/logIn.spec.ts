import { expect, test } from '../src/utils/Fixture';
import { AccountType } from '../src/utils/enum/AccountType';
import Credentials from '../src/utils/UserCredentialsProvider';
import 'dotenv/config'


test.describe('Login and Logout test', () => {
    test('Login with \'standard\' user', async ({ page, loginPage}) => {
        await loginPage.open();
        await expect(await page.url()).toContain(await loginPage.getPageUrl());
        await loginPage.logInWithCredentials(Credentials.getUserCredentials(AccountType.Standard));
    });

    test('Login with \'problem\' user', async ({ page, loginPage }) => {
        await loginPage.open();
        await expect(await page.url()).toContain(await loginPage.getPageUrl());
        await loginPage.logInWithCredentials(Credentials.getUserCredentials(AccountType.Problem));
    });

    test('Login with \'locked\' user', async ({ page, loginPage }) => {
        await loginPage.open();
        await expect(await page.url()).toContain(await loginPage.getPageUrl());
        await loginPage.logInWithCredentials(Credentials.getUserCredentials(AccountType.LocKed));
        await expect(await loginPage.getErrorMessage()).toContain('Epic sadface: Sorry, this user has been locked out.');
    });
});
