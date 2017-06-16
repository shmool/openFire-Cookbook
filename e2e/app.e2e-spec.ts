import { OpenFireCookbookPage } from './app.po';

describe('open-fire-cookbook App', () => {
  let page: OpenFireCookbookPage;

  beforeEach(() => {
    page = new OpenFireCookbookPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
