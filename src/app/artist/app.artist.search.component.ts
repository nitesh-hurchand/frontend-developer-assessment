import { UserService } from './../user/app.user.service';
import { Artist } from './app.artist';
import { ArtistService } from './app.artist.service';
import { Component, OnInit  } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-artist-search',
  templateUrl: './app.artist.search.component.html'
})
export class AppArtistSearchComponent implements OnInit {
  searchNameCriteria = '';
  artists: Artist[];
  shortList: Artist[];
  constructor(private artistService: ArtistService,
              private userService: UserService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  searchArtists(): void {
    if (this.searchNameCriteria.trim() === '') {
      this.artists = [];
    } else {
      this.artists = this.artistService.searchArtists(this.searchNameCriteria);
    }
  }

  open(content) {
    this.shortList = this.userService.getShortList();
    this.modalService.open(content).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  addtoShortList(artist: Artist): void {
    this.userService.addtoShortList(artist);
    console.log('add to shortlist: ' + this.userService.getShortList().length);
  }
  removeFromShortList(artist: Artist): void {
    this.userService.removeFromShortList(artist);
    console.log('remove from shortlist: ' + this.userService.getShortList().length);
  }

  addToFavourites(artist: Artist): void {
    this.userService.addtoFavourites(artist);
    this.userService.getFavourites()
    .then(result => console.log('add to favourites: ' + result.length));
  }
}


