import { Release } from './app.release';

export class Artist {
    name = '';
    url = '';
    releases: Release[] = Array<Release>();
    showReleases = false;
}
