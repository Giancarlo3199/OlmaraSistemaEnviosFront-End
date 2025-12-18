import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmpresaTransporteService } from '../../../services/empresa-transporte.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empresa-transporte-form-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './empresa-transporte-form-component.html',
  styleUrl: './empresa-transporte-form-component.css',
})
export class EmpresaTransporteFormComponent implements OnInit {

  form!: FormGroup;
  id?: number;

  constructor(
    private fb: FormBuilder,
    private service: EmpresaTransporteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [],
      nombre: ['', Validators.required],
      ruc: ['', Validators.required],
      telefono: [''],
      email: [''],
      direccion: [''],
      activo: [true]
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id) {
      this.service.listarPorId(this.id).subscribe(data => {
        this.form.patchValue(data);
      });
    }
  }

  guardar() {
    if (this.form.invalid) return;

    if (this.id) {
      this.service.modificar(this.form.value).subscribe(() => {
        this.router.navigate(['/empresa-transporte']);
      });
    } else {
      this.service.registrar(this.form.value).subscribe(() => {
        this.router.navigate(['/empresa-transporte']);
      });
    }
  }

  atras() {
    this.router.navigate(['/empresa-transporte']);
  }
}
