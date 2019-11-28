import {
  Component
} from '@angular/core';
import {
  AlertController
} from '@ionic/angular';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private alertController: AlertController,
    private router: Router
  ) {}


  async presentAlert() {
    console.log('Hello');
    // alert('Hello');
    /* On definit la fonction comme etant asynchrone,
    ce n'est pas bloquant, pour l'execution du reste de l'appli meme si on attends une action */
    const alert = await this.alertController.create({
      header: 'Confirmer l\'action',
      message: '<strong>Passer sur tab2 ?</strong>',
      buttons: [{
        text: 'Annuler',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'OK',
        handler: () => {
          console.log('Confirm Okay');
          this.router.navigate(['/tabs/tab2']);
        }
      }]
    });
    await alert.present();
}

}
