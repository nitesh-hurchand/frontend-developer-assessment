import { UserService } from './user/app.user.service';
import { ArtistService } from './artist/app.artist.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppArtistSearchComponent } from './artist/app.artist.search.component';
import { AppArtistReleasesComponent } from './artist/app.artist.releases.component';
import { AppUserFavouritesComponent } from './user/app.user.favourites.component';

const appRoutes: Routes = [
  { path: 'artist', component: AppArtistSearchComponent },
  { path: 'favourites',      component: AppUserFavouritesComponent },
  { path: '', component: AppArtistReleasesComponent }/*,
  { path: '**', component: PageNotFoundComponent }*/
];

@NgModule({
  declarations: [
    AppComponent,
    AppArtistSearchComponent,
    AppUserFavouritesComponent,
    AppArtistReleasesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    NgbModule.forRoot(),
    HttpClientModule
  ],
  providers: [ArtistService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
