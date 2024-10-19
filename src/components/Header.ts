import { Page, expect } from '@playwright/test';
import BaseComponent from '../base/BaseComponents';
import InventoryPage from '../pages/InventoryPage';

export default class Header extends BaseComponent {

    private readonly headerContainerLocator = '#header_container';
    private readonly burgerButton = this.page.locator(`${this.headerContainerLocator} [class="bm-burger-button"]`);
    private readonly burgerMenuItemList = this.page.locator(`${this.headerContainerLocator} [class="bm-item menu-item"]`);
    private readonly headerTitle = this.page.locator(`${this.headerContainerLocator} [class="title"]`);
    private readonly cartHeaderTitle = this.page.locator(`${this.headerContainerLocator} [class="subheader"]`);
    private readonly cartImage = this.page.locator(`${this.headerContainerLocator} [class="shopping_cart_container"]`);
    private readonly productAddedInCart = this.page.locator(`${this.headerContainerLocator} [class$="_cart_badge"]`);
    private readonly backToProducts = this.page.locator(`${this.headerContainerLocator} [class="inventory_details_back_button"]`);

    

    constructor(page: Page) {
        super(page);
    }

    public async clickOnSlideMenu(): Promise<void> {
        await this.burgerButton.click();
    }

    public async clickOnLogOutInSlideMenu(): Promise<void> {
        await this.burgerMenuItemList.filter({ hasText: 'Logout' }).click();
    }

    public async checkInventoryTitle(): Promise<void> {
        const title = await this.headerTitle.innerText();
        expect(title).toMatch(/Products/);
    }

    public async checkCartTitle(): Promise<void> {
        const cartTitle = await this.cartHeaderTitle.innerText();
        expect(cartTitle).toMatch(/Your Cart/);
    }

    public async checkThatCardHasRequiredAmountOfProducts(amountItems: number): Promise<void> {
        const cartItemCount = await this.productAddedInCart.innerText();
        expect(cartItemCount).toBe(amountItems.toString());
    }

    public async checkThatCardHasProducts(): Promise<void> {
        await this.productAddedInCart.isVisible();
    }

    public async checkThatCardNotHaveProducts(): Promise<void> {
        await this.productAddedInCart.isHidden();
    }

    public async clickOnBackToProductButton(): Promise<InventoryPage> {
        await this.backToProducts.click();
        return new InventoryPage(this.page);
    }
}