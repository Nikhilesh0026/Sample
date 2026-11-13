const { expect } = require('@playwright/test');

class RequestPage {
  constructor(page) {
    this.page = page;
    this.createButton     = page.getByText('Create', { exact: true });
    this.requestButton    = page.getByText('Request', { exact: true });
    this.contracttype     = page.locator("//label[contains(.,'Contract Type')]/following::input[1]");
    this.contractcategory = page.locator("//label[contains(.,'Contract Category_1')]/following::input[1]");
     this.zone             = page.locator("//label[contains(.,'Zone')]/following::input[1]");
    this.selfparty        = page.locator("//label[contains(.,'Contract Self Party')]/following::input[1]");
    this.otherparty       = page.locator("//label[contains(.,'Contract Other Party Name')]/following::input[1]");
    this.contracttitle    = page.locator("//input[@class='mandatory']");
    this.submitButton     = page.locator("//input[@value='Create']");
    this.okButton         = page.locator("//input[@value='Ok']");
    this.successMessage   = page.getByText('Contract Request Added Successfully.', { exact: true });
  }

  async openRequestForm() {
    await expect(this.createButton).toBeVisible({ timeout: 10000 });
    await this.createButton.hover();
    await this.requestButton.click();
  }

  async selectOption(field, name) {
    await field.click();
    const option = this.page.getByRole('option', { name, exact: true });
    await option.click();
  }

  async fillOtherParty(name) {
    await this.otherparty.fill(name);
    await this.page.getByRole('option').filter({ hasText: name }).first().click();
  }

  async submitRequest() {
    await expect(this.submitButton).toBeEnabled();
    await this.submitButton.click();
    await this.okButton.click();
  }

  async createRequestMandatory(data) {
    await this.openRequestForm();
    await this.selectOption(this.contracttype, data.contracttype);
    await this.selectOption(this.contractcategory, data.contractcategory);
    await this.selectOption(this.zone, data.zone);
    await this.selectOption(this.selfparty, data.selfparty);
    await this.fillOtherParty(data.otherparty);
    await this.contracttitle.fill(data.title);
    await this.submitRequest();
  }
}

module.exports = { RequestPage };