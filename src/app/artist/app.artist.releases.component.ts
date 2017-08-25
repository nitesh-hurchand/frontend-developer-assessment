import { Release } from './app.release';
import { Component, OnInit } from '@angular/core';
import { Artist } from './app.artist';
import { ArtistService } from './app.artist.service';
import { UserService } from './../user/app.user.service';

@Component({
  selector: 'app-artist-releases',
  templateUrl: './app.artist.releases.component.html'
})
export class AppArtistReleasesComponent implements OnInit {
  searchNameCriteria = '';
  artists: Artist[];

  constructor(private artistService: ArtistService,
            private userService: UserService) { }

  ngOnInit(): void {
  }

  searchArtists(): void {
    if (this.searchNameCriteria.trim() === '') {
      this.artists = [];
    } else {
      this.artists = this.artistService.searchArtistsFromMusicBrainz(this.searchNameCriteria);
    }
  }

  toggleReleaseView(artist: Artist): void {
    console.log('toggle release view');
    if (!artist.releases || artist.releases.length == 0) {
      artist.releases = this.artistService.searchReleasesFromMusicBrainz(artist);
    }
    artist.showReleases = !artist.showReleases;
  }

  addToFavourites(artist: Artist, release: Release): void {
    this.userService.addtoFavourites(artist, release);
    this.userService.getFavourites()
    .then(result => console.log('add to favourites: ' + result.length));
  }
}
