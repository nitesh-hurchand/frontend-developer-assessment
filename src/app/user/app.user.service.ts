import { Release } from './../artist/app.release';
import { Artist } from './../artist/app.artist';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
    private shortList: Artist[] = [];
    private favourites: Artist[] = null;

    getShortList() {
        return this.shortList;
    }
    addtoShortList(artist: Artist) {
        const i = this.findIndexInShortList(artist.name);
        // not found
        if (i < 0) {
            this.shortList.push(artist);
        }
    }
    removeFromShortList(artist: Artist) {
        const i = this.findIndexInShortList(artist.name);
        // valid range
        if (i >= 0 && i < this.shortList.length) {
            this.shortList.splice(i, 1);
        }
    }

    private findIndexInShortList(artistName: string) {
        const i = this.shortList.findIndex((value, index, obj) => {
            if (value.name === artistName) {
                return true;
            }
            return false;
        });
        return i;
    }

    checkFavourites(){
        if (!this.favourites) {
            if (localStorage.getItem('fav') != null) {
                this.favourites = JSON.parse(localStorage.getItem('fav'));
            } else {
                this.favourites = [];
            }
        }
    }

    getFavourites(): Promise<Artist[]> {
        this.checkFavourites();
        return Promise.resolve(this.favourites);
    }
    addtoFavourites(artist: Artist, release?: Release) {
        let i = this.findIndexInFavourites(artist.name);
        // not found
        if (i < 0) {
            this.favourites.push(new Artist(artist.name, artist.arid, artist.url, [], false));
            i = this.favourites.length - 1;
        }

        if (release) {
            const a = this.favourites[i];
            const x = a.releases.findIndex((value, index, obj) => {
                if (value.title === release.title) {
                    return true;
                }
                return false;
            });
            // not found
            if (x < 0) {
                a.releases.push(release);
            }
        }
        localStorage.setItem('fav', JSON.stringify(this.favourites));
    }
    removeFromFavourites(artist: Artist, release?: Release) {
        const i = this.findIndexInFavourites(artist.name);
        // not found
        if (i < 0) {
            return;
        }
        if (!release) {
            if (i >= 0 && i < this.favourites.length) {
                this.favourites.splice(i, 1);
            }
        } else {
            const a = this.favourites[i];
            const x = a.releases.findIndex((value, index, obj) => {
                if (value.title === release.title) {
                    return true;
                }
                return false;
            });
            if (x >= 0 && x < a.releases.length) {
                a.releases.splice(x, 1);
            }
        }
        localStorage.setItem('fav', JSON.stringify(this.favourites));
    }

    private findIndexInFavourites(artistName: string) {        
        this.checkFavourites();
        const i = this.favourites.findIndex((value, index, obj) => {
            if (value.name === artistName) {
                return true;
            }
            return false;
        });
        return i;
    }
}
