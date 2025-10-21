import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PersonajeService } from 'src/app/services/personaje-service';
import { LoadingController, ViewWillEnter } from '@ionic/angular';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonFooter, IonButtons, IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, arrowForwardOutline } from 'ionicons/icons';

@Component({
  selector: 'app-personaje-list',
  templateUrl: './personaje-list.component.html',
  styleUrls: ['./personaje-list.component.scss'],
  standalone: true,
  imports: [IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, IonButtons, IonButton, IonIcon
  ],
})
export class PersonajeListComponent {

  personajesList: { nombre: string, alias: string }[] = [];
  paginaActual = 0;
  personajesPorPagina = 5;
  totalPersonajes = 0;
  anteriorDeshabilitado = true;
  siguienteDeshabilitado = false;

  constructor(
    private personajeService: PersonajeService,
    private router: Router,
    private loadingCtr: LoadingController
  ) {
    addIcons({ arrowBackOutline, arrowForwardOutline });
  }

  async ionViewWillEnter() {
    this.showLoading();
    this.totalPersonajes = this.personajeService.getTotalPersonajes();
    this.paginaActual = 0;
    this.cargarPagina();
  }

  cargarPagina() {
    const inicio = this.paginaActual * this.personajesPorPagina;
    const fin = inicio + this.personajesPorPagina;
    this.personajesList = this.personajeService.getPersonajes(inicio, fin);
    this.actualizarBotones();
  }

  siguientePagina() {
    this.paginaActual++;
    this.cargarPagina();
  }

  anteriorPagina() {
    this.paginaActual--;
    this.cargarPagina();
  }

  actualizarBotones() {
    this.anteriorDeshabilitado = (this.paginaActual === 0);
    const finDePagina = (this.paginaActual + 1) * this.personajesPorPagina;
    this.siguienteDeshabilitado = (finDePagina >= this.totalPersonajes);
  }

  verDetalle(index: number) {
    const indiceReal = (this.paginaActual * this.personajesPorPagina) + index;
    this.router.navigate(['/detalle', indiceReal]);
  }

  async showLoading(){
    const loading = await this.loadingCtr.create({
        message: 'Cargando personajes...',
        spinner: 'circles',
        duration: 2000
    });
    await loading.present();
    await loading.dismiss();
  }
}
