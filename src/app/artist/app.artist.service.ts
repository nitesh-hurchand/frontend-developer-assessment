import { Artist } from './app.artist';
import { ARtIStS } from './app.mock.artists';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Release } from "./app.release";

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
        if (data && data['artists']) {
            let t = data['artists'];
            for(let i =0; i < t.length; i++) {
              r.push(new Artist(t[i]['name'], t[i]['id'], '', [], false));
            }
        }
      });
      return r;
  }
  // http://musicbrainz.org/ws/2/artist/?query=artist:fred
  // http://musicbrainz.org/ws/2/release/?query=arid:e56fd97e-c18f-4e5e-9b4d-f9fc21b4973f
  searchReleasesFromMusicBrainz(artist: Artist): Release[] {
      let r : Release[] = [];
      this.http.get('http://musicbrainz.org/ws/2/release/?query=arid:'+artist.arid)
      .subscribe(data => {
        if (data && data['releases']) {
            let t = data['releases'];
            for(let i =0; i < t.length; i++) {
              r.push(new Release(t[i]['date'], t[i]['title'], 
              t[i]['label-info'] && t[i]['label-info'].length > 0 ?  t[i]['label-info'][0]['name'] : '', 
              t[i]['track-count']));
            }
        }
      });
      return r;
  }
}
