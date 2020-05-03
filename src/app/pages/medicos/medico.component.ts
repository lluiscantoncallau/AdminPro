import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { HospitalService } from 'src/app/services/hospital/hospital.service';
import { MedicoService } from 'src/app/services/medico/medico.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {

    activatedRoute.params.subscribe(params => {

      const id = params.id;

      if (id !== 'nuevo') {
        this.cargarMedico(id);
      }

    });

  }

  ngOnInit() {

    this._hospitalService.cargarHospitales(0, 1000)
      .subscribe((resp: any) => {
        this.hospitales = resp.hospitales;
      });

    this._modalUploadService.notificacion
      .subscribe(resp => {
        this.medico.img = resp.medico.img;
      });

  }

  cargarMedico(id: string) {
    this._medicoService.cargarMedico(id)
      .subscribe(medico => {
        this.medico = medico;
        this.medico.hospital = medico.hospital._id;
        this.cambioHospital(this.medico.hospital);
      });
  }

  guardarMedico(f: NgForm) {
    if (f.invalid) {
      return;
    }
    console.log(f.value);
    this._medicoService.guardarMedico(this.medico)
      .subscribe(resp => {
        console.log(resp);
        this.medico._id = resp.medico._id;
        this.router.navigate(['/medico', resp.medico._id]);
      });

  }

  cambioHospital(id: string) {

    this._hospitalService.obtenerHospital(id)
      .subscribe((resp: any) => this.hospital = resp.hospital);

  }

  cambiarFoto() {

    this._modalUploadService.mostrarModal('medicos', this.medico._id);

  }


}
