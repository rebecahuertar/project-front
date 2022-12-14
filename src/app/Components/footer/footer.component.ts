import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/Services/local-storage.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {}

  home(): void {
    this.router.navigateByUrl('home');
  }

  buscador(): void {
    this.router.navigateByUrl('buscador');
  }

  cuenta(): void {
    const tipo_usuario = this.localStorageService.get('tipo_usuario');
    console.log(tipo_usuario);
    if (tipo_usuario == 'comercio') {
      this.router.navigateByUrl('comercio-cuenta');
    }
    if (tipo_usuario == 'cliente') {
      this.router.navigateByUrl('cliente-cuenta');
    }
    if (tipo_usuario == null) {
      this.router.navigateByUrl('login');
    }
  }
}
