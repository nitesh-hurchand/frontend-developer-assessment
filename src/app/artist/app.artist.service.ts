import { Artist } from './app.artist';
import { ARtIStS } from './app.mock.artists';
import { Injectable } from '@angular/core';

@Injectable()
export class ArtistService {
    searchArtists(nameSearchCriteria): Promise<Artist[]> {
    return Promise.resolve(ARtIStS);
  }
}
