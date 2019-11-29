import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  defaultImage = './assets/default_image_1.png';
  title: string = "Titre de l'image";
  description: string = "Description de l'image";
  type: string = "paysage";
  geoloc: boolean = false;

  constructor(
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing,
    private geolocation: Geolocation,
    private storage: Storage
  ) {}
  
  takePicture(){
    const options: CameraOptions = {
      quality: 40,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     this.defaultImage = base64Image;
    }, (err) => {
     // Handle error
    });
  }

  share() {
    const options = {
      message: this.description,
      subject: this.title,
      files: [this.defaultImage],
      // url: 'https://www.website.com/foo/#bar?a=b',
      chooserTitle: 'Choisir une app',
      // appPackageName: 'com.apple.social.facebook', // Android only, you can provide id of the App you want to share with
      // iPadCoordinates: '0,0,0,0' //IOS only iPadCoordinates for where the popover should be point.  Format with x,y,width,height
    };

    this.socialSharing.shareWithOptions(options).then(() => {
      // this.presentToast('Le lieu a bien été partagé');
    }).catch((e) => {
      console.log(e);
    });
  }

  locateMe() { // WIP
    this.geolocation.getCurrentPosition().then((resp) => {
       // resp.coords.latitude
       // resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
     });
  }

  view() {
    this.storage.get('place').then((val) => {
      console.log('Title is:', val.title);
      this.title = val.title;
      this.description = val.description;
      this.defaultImage = val.defaultImage;
    });
  }

  save() { // là on stocke un objet ( a voir pour lui caler un id en db)
    this.storage.set('place', {
      title: this.title,
      description: this.description,
      defaultImage: this.defaultImage
    });
  }

  async valider() { // on balance une actionsheet pour partager / sauvegarder / annuler
    console.log(this.title, this.description, this.type, this.geoloc);
    if (this.geoloc){
      console.log(this.locateMe());
    }
    const actionSheet = await this.actionSheetController.create({
      header: 'Photo',
      buttons: [{
        text: 'Annuler',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('clicked Annuler');
        }
      }, {
        text: 'Partager',
        icon: 'share',
        handler: () => {
          console.log('clicked Partage');
          this.share();
        }
      }/*, { // on va utiliser le datastorage ionic pour save https://ionicframework.com/docs/building/storage
        text: 'Sauvegarder',
        icon: 'save',
        handler: () => {
          console.log('clicked sauvegarder');
          this.save();
        },
      },{ 
        text: 'Voir infos',
        icon: 'eye',
        handler: () => {
          console.log('clicked voir');
          this.view();
        },
      }*/]
  });
    await actionSheet.present();
  }

}
