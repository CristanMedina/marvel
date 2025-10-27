import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PersonajeService } from 'src/app/services/personaje-service';
import { LoadingController } from '@ionic/angular';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
  IonInfiniteScroll, IonInfiniteScrollContent, InfiniteScrollCustomEvent
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-personaje-list',
  templateUrl: './personaje-list.component.html',
  styleUrls: ['./personaje-list.component.scss'],
  standalone: true,
  imports: [
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
  ],
})
export class PersonajeListComponent {

  personajesList: { nombre: string, alias: string }[] = [];
  paginaActual = 0;
  personajesPorPagina = 10;
  totalPersonajes = 0;

  constructor(
    private personajeService: PersonajeService,
    private router: Router,
    private loadingCtr: LoadingController
  ) {}

  async ionViewWillEnter() {
    const loading = await this.showLoading();
    this.totalPersonajes = this.personajeService.getTotalPersonajes();
    this.paginaActual = 0;
    this.personajesList = [];

    await this.cargarMasPersonajes();

    loading.dismiss();
  }

  cargarMasPersonajes(event?: InfiniteScrollCustomEvent): Promise<void> {
    const inicio = this.paginaActual * this.personajesPorPagina;
    const fin = inicio + this.personajesPorPagina;

    return this.personajeService.getPersonajes(inicio, fin)
      .then(personajesNuevos => {
        this.personajesList = this.personajesList.concat(personajesNuevos);
        this.paginaActual++;

        if (event && this.personajesList.length >= this.totalPersonajes) {
          event.target.disabled = true;
        }
      })
      .catch(err => {
        console.error('Error al cargar personajes:', err);
        if (event) {
          event.target.disabled = true;
        }
      })
      .finally(() => {
        if (event) {
          event.target.complete();
        }
      });
  }

  verDetalle(index: number) {
    this.router.navigate(['/detalle', index]);
  }

  async showLoading(){
    const loading = await this.loadingCtr.create({
        message: 'Cargando personajes...',
        spinner: 'bubbles',
    });
    await loading.present();
    return loading;
  }

  onIonInfinite(event: InfiniteScrollCustomEvent) {
    this.cargarMasPersonajes(event);
  }

}
