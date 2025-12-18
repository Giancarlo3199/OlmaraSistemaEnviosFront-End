import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CiudadService } from '../../../services/ciudad.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ciudad } from '../../../models/Ciudad';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ciudad-form-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ciudad-form-component.html',
  styleUrl: './ciudad-form-component.css',
})
export class CiudadFormComponent implements OnInit {

  form!: FormGroup;
  idCiudad?: number;

  constructor(
    private fb: FormBuilder,
    private ciudadService: CiudadService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
    this.cargarCiudadSiEdita();
  }

  crearFormulario(): void {
    this.form = this.fb.group({
  idCiudad: [],
  nombreCiudad: ['', Validators.required],
  activo: [true]
});
  }

  cargarCiudadSiEdita(): void {
    this.idCiudad = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.idCiudad) return;

    this.ciudadService.listarPorId(this.idCiudad).subscribe(ciudad => {
      this.form.patchValue(ciudad);
    });
  }

  guardar(): void {
    if (this.form.invalid) return;

    const ciudad: Ciudad = this.form.value;

    const peticion = ciudad.idCiudad
      ? this.ciudadService.modificar(ciudad)
      : this.ciudadService.registrar(ciudad);

    peticion.subscribe(() => {
      this.router.navigate(['/ciudades']);
    });
  }

  atras(): void {
    this.router.navigate(['/ciudades']);
  }
}
