import { Page, expect } from '@playwright/test';
import BasePage from '../base/BasePage';
import Header from '../components/Header';

export default class InventoryPage extends BasePage {
    public header: Header = new Header(this.page);
    private inventoryContainer: string = '#inventory_container';
    private inventoryItemTitleLocator: string = '.inventory_item_name';
    private inventoryItemDescLocator: string = '.inventory_item_desc';
    private inventoryItemPriceLocator: string = '.inventory_item_price';
    private inventoryItemButtonLocator: string = '#add-to-cart-sauce-labs-backpack';
    private inventoryTitleListLocator: string = '[id$="title_link"]';


    constructor(page: Page) {
        super(page, 'Inventory Page', 'inventory.html');
    }
    private get inventoryItems(): Promise<Page[]> {
        return this.page.$$(`${this.inventoryContainer} [class="inventory_item"]`).then((elements) => elements.map(element => element as unknown as Page));
    }
    

    private async getArrayOfItemsPrice(): Promise<string[]> {
        const inventoryItems = await this.inventoryItems;
        const prices = await Promise.all(inventoryItems.map(async (item) => {
            const priceElement = await item.$(this.inventoryItemPriceLocator);
            return priceElement ? await priceElement.innerText() : '';
        }));
        return prices.map(price => price.replace('$', ''));
    }

    private async chooseRandomProductThatHasAddToCardButtonAndClickOn(countOfRandomProduct: number): Promise<void> {
        const inventoryItems = await this.inventoryItems;
        if (countOfRandomProduct > inventoryItems.length) {
            throw Error(`Count '${countOfRandomProduct}' of random product is bigger than products on the page`);
        }

        const randomIndex = Math.floor(Math.random() * inventoryItems.length);
        const inventoryItem = inventoryItems[randomIndex];

        const buttonElement = await inventoryItem.$(this.inventoryItemButtonLocator);
        if (buttonElement && (await buttonElement.innerText()) === 'Add to cart') {
            await buttonElement.click();
        } else {
            await this.chooseRandomProductThatHasAddToCardButtonAndClickOn(countOfRandomProduct);
        }
    }

    public chooseRandomProductThatHasAddToCardButton(countOfRandomProduct: number): this {
        for (let i = 0; i < countOfRandomProduct; i++) {
            this.chooseRandomProductThatHasAddToCardButtonAndClickOn(countOfRandomProduct);
        }
        return this;
    }

    public async checkProductsField(): Promise<this> {
        const inventoryItems = await this.inventoryItems;
        for (const inventoryItem of inventoryItems) {
            const titleElement = await inventoryItem.$(this.inventoryItemTitleLocator);
            const descElement = await inventoryItem.$(this.inventoryItemDescLocator);
            const priceElement = await inventoryItem.$(this.inventoryItemPriceLocator);

            expect(titleElement).toBeTruthy();
            expect(descElement).toBeTruthy();
            expect(priceElement).toBeTruthy();
        }
        return this;
    }

    public async checkGoodsIsSortedByLowToHi(): Promise<this> {
        const prices = await this.getArrayOfItemsPrice();
        prices.forEach((currentItemPrice, index, list) => {
            if (list.length - 1 !== index) {
                expect(Number(currentItemPrice)).toBeLessThanOrEqual(Number(list[index + 1]));
            }
        });
        return this;
    }

    public addFirstProductToCart(): this {
        this.page.click(`${this.inventoryItemButtonLocator}`);
        return this;
    }

}