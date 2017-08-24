import { Release } from './../artist/app.release';
import { UserService } from './app.user.service';
import { Component, OnInit } from '@angular/core';
import { Artist } from '../artist/app.artist';

@Component({
  selector: 'app-user-favourites',
  templateUrl: './app.user.favourites.component.html'
})
export class AppUserFavouritesComponent implements OnInit {
  favourites: Artist[];
  constructor(private userService: UserService) { }

    ngOnInit(): void {
      this.userService.getFavourites()
    .then(result => {
      this.favourites = result;
      console.log('favourites: ' + result.length);
    });
  }

  removeFromFavourites(artist: Artist, release: Release = null): void {
    this.userService.removeFromFavourites(artist, release);
    this.userService.getFavourites()
    .then(result => console.log('remove from favourites: ' + result.length));
  }

  toggleReleaseView(artist: Artist): void {
    console.log('toggle release view');
    artist.showReleases = !artist.showReleases;
  }
}
