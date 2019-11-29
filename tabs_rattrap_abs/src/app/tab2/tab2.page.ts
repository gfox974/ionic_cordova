import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

interface Movie {
  id: number;
  title: string; 
  director: string;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  movies: Movie[] = [
    {id: 1, title: `Avatar`, director: 'James Cameron'},
    {id: 2, title: `Star Wars : l'ascension de Skywalker`, director: 'J J Abrams'},
    {id: 3, title: `Ad Astra`, director: 'James Gray'},
    {id: 4, title: `Aladin`, director: 'Guy Richie'},
    {id: 5, title: `Avangers : End game`, director: 'Anthony et Joe Russo'},
    {id: 6, title: `Starsky et Hutch`, director: 'Todd Phillips'}
  ]

  moviesFiltered: Movie[] = this.movies;

  constructor(private actionSheetController: ActionSheetController) {}

  remove(movie: Movie) {
    const index = this.movies.findIndex( (m: Movie) => m.id === movie.id );
    this.movies.splice(index, 1);
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Films',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Play (open modal)',
        icon: 'arrow-dropright-circle',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  changeSearch(str: string) {
    str = str.toLowerCase();
    this.moviesFiltered = this.movies.filter( (movie: Movie) => movie.title.toLowerCase().startsWith(str));
  }

}
