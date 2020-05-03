import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../guards/login-guard.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';
import { VerificatokenGuard } from '../guards/verificatoken.guard';

const routes: Routes = [

  { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' }, canActivate: [VerificatokenGuard] },
  { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
  { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas de tarta' } },
  { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
  { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Reactive Extensions Library for JavaScript' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de usuario' } },
  { path: 'profile', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
  { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' } },

  { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Gestion de usuarios' }, canActivate: [AdminGuard] },
  { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Gestion de hospitales' } },
  { path: 'medicos', component: MedicosComponent, data: { titulo: 'Gestion de medicos' } },
  { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Gestion del medico' } },
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
];

export const PAGES_ROUTES = RouterModule.forChild(routes);

