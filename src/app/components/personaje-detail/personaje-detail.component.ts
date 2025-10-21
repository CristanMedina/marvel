import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Personaje } from 'src/app/interfaces/personaje';
import { PersonajeService } from 'src/app/services/personaje-service';
import { CommonModule } from '@angular/common';
import { IonText, IonCol, IonRow, IonHeader, IonTitle, IonBackButton, IonButtons, IonToolbar, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonContent, IonCardContent, IonGrid } from "@ionic/angular/standalone";

@Component({
  selector: 'app-personaje-detail',
  templateUrl: './personaje-detail.component.html',
  imports: [IonGrid, IonCardContent, IonContent, IonCard, IonCardSubtitle, IonCardTitle, IonCardHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonHeader, IonRow, IonCol, IonText, CommonModule],
  styleUrls: ['./personaje-detail.component.scss'],
})
export class PersonajeDetailComponent {

  personaje: Personaje | undefined;

  constructor(
    private personajeService: PersonajeService,
    private route: ActivatedRoute
  ) {}

  ionViewWillEnter() {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      const index = +idParam;
      this.personaje = this.personajeService.getPersonaje(index);
    }
  }
}
