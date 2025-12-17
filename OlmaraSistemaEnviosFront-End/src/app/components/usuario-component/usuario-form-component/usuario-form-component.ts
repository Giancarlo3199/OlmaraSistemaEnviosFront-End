import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { RolService } from '../../../services/rol.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Rol } from '../../../models/Rol';
import { Usuario } from '../../../models/Usuario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario-form-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuario-form-component.html',
  styleUrl: './usuario-form-component.css',
})
export class UsuarioFormComponent implements OnInit {

  form!: FormGroup;
  roles: Rol[] = [];
  idUsuario?: number;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
    this.cargarRoles();
    this.cargarUsuarioSiEdita();
  }

  crearFormulario(): void {
    this.form = this.fb.group({
      id: [],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      documentoIdentidad: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: [''],
      rol: [null, Validators.required],
      activo: [true]
    });
  }

  cargarRoles(): void {
    this.rolService.listar().subscribe(data => this.roles = data);
  }

  cargarUsuarioSiEdita(): void {
    this.idUsuario = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.idUsuario) return;

    this.usuarioService.listarPorId(this.idUsuario).subscribe(usuario => {
      this.form.patchValue(usuario);
      this.form.get('password')?.clearValidators();
      this.form.get('password')?.updateValueAndValidity();
    });
  }

  guardar(): void {
    if (this.form.invalid) return;

    const usuario: Usuario = this.form.value;

    const peticion = usuario.id
      ? this.usuarioService.modificar(usuario)
      : this.usuarioService.registrar(usuario);

    peticion.subscribe(() => {
      this.router.navigate(['/usuarios']);
    });
  }

   atras(): void {
    this.router.navigate(['/usuarios']);
  }
}
