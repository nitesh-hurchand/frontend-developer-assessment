import { Artist } from './app.artist';
import { ARtIStS } from './app.mock.artists';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class ArtistService {

  constructor(private http: HttpClient) {

  }

    searchArtists(nameSearchCriteria): Artist[] {
      let r : Artist[] = [];
      this.http.get('http://ws.audioscrobbler.com/2.0/?method=artist.search&artist='+nameSearchCriteria
      +'&api_key=7fbf31268b02e6f191d4047df4643b45&format=json')
      .subscribe(data => {
        if (data && data['results'] && data['results']['artistmatches'] 
        && data['results']['artistmatches']['artist']) {
          let t = data['results']['artistmatches']['artist'];
          for(let i =0; i < t.length; i++) {
            r.push(new Artist(t[i]['name'], '', t[i]['url'], [], false));
          }
        }
      });
      return r;
  }

  searchArtistsFromMusicBrainz(nameSearchCriteria): Artist[] {
      let r : Artist[] = [];
      this.http.get('http://musicbrainz.org/ws/2/artist/?query=artist:'+nameSearchCriteria)
      .subscribe(data => {
        if (data && data['results'] && data['results']['artistmatches'] 
        && data['results']['artistmatches']['artist']) {
          let t = data['results']['artistmatches']['artist'];
          for(let i =0; i < t.length; i++) {
            r.push(new Artist(t[i]['name'], '', t[i]['url'], [], false));
          }
        }
        console.log('data: ' + JSON.stringify(r));
      });

      console.log('searched.');
      return r;
  }
  // http://musicbrainz.org/ws/2/artist/?query=artist:fred
  // http://musicbrainz.org/ws/2/release/?query=arid:e56fd97e-c18f-4e5e-9b4d-f9fc21b4973f
}
