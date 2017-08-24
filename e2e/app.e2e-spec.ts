import { MusicBrainzAppPage } from './app.po';

describe('music-brainz-app App', () => {
  let page: MusicBrainzAppPage;

  beforeEach(() => {
    page = new MusicBrainzAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
