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
    {id: 5, title: `Avengers : End game`, director: 'Anthony et Joe Russo'},
    {id: 6, title: `Starsky et Hutch`, director: 'Todd Phillips'}
  ];

  constructor(public actionSheetController: ActionSheetController) {}

  delete(movie: Movie): void {
    console.log('removing:', movie.title);
    const idx = this.movies.findIndex((m: Movie) => movie.id === movie.id);
    this.movies.splice(idx, 1);
  }

  async share(movie: Movie) { // Voir comment typer le retour en Promise
    console.log('sharing:', movie.title);
    const idx = this.movies.findIndex((m: Movie) => movie.id === movie.id);
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      buttons: [{
        text: 'Supprimer',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('clickedOn : delete');
          this.delete(movie);
        }
      }, {
        text: 'Partager',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }]

    });
    await actionSheet.present();
    }
  }
