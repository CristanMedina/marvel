import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PersonajeService } from 'src/app/services/personaje-service';
import { IonLabel, IonItem, IonList, IonContent, IonToolbar, IonHeader, IonTitle } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personaje-list',
  templateUrl: './personaje-list.component.html',
  imports: [IonTitle, IonHeader, IonToolbar, IonContent, IonList, IonItem, IonLabel, CommonModule],
  styleUrls: ['./personaje-list.component.scss'],
})
export class PersonajeListComponent {

  personajesList: { nombre: string, alias: string }[] = [];

  constructor(
    private personajeService: PersonajeService,
    private router: Router
  ) { }

  ionViewWillEnter() {
    this.personajesList = this.personajeService.getPersonajes();
  }

  verDetalle(index: number) {
    this.router.navigate(['/detalle', index]);
  }
}
