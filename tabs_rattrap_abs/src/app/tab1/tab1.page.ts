import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private alertController: AlertController, private router: Router) {}

  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Etes vous sur de passer à l\'étape suivante ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Ok',
          handler: () => {
            this.router.navigate(['/tabs/tab2']);
          }
        }
      ]
    });

    await alert.present();
  }

}