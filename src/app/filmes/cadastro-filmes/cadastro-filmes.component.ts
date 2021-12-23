import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { FilmesService } from './../../core/filmes.service';
import { Filme } from './../../shared/models/filme';
import { ValidarCamposService } from './../../shared/components/campos/validar-campos.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from './../../shared/models/alerta';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  cadastro: FormGroup;
  generos: Array<string>;
  id: number;

  constructor(
    public validacao: ValidarCamposService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private filmeService: FilmesService,
    private route: Router,
    private activateRoute: ActivatedRoute) { }

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit() {

    this.id = this.activateRoute.snapshot.params['id'];
    if (this.id) {
      this.filmeService.consultar(this.id).subscribe((fil: Filme) =>    this.criarFormulario(fil));
    } else {
      this.criarFormulario(this.criarFilmeEmBraco());
    }



    this.generos = this.filmeService.listaDeGeneros();

  }

  submit(): void {
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid) {
      return;
    }

    const filme = this.cadastro.getRawValue() as Filme;

    if (this.id) {
      filme.id = this.id;
      this.editar(filme);
    } else {
      this.salvar(filme);
    }


  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }


  private criarFilmeEmBraco(): Filme {
    return {
      id: null,
      titulo: null,
      urlFoto: null,
      dtLancamento: null,
      descricao: null,
      nota: null,
      urlIMDb: null,
      genero: null,
    } as Filme
  }

  private criarFormulario(filme: Filme): void {
    this.cadastro = this.fb.group({

      titulo: [filme.titulo, [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
      urlFoto: [filme.urlFoto, [Validators.minLength(10)]],
      dtLancamento: [filme.dtLancamento, [Validators.required]],
      descricao: [filme.descricao],
      nota: [filme.nota, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlImdb: [filme.urlIMDb, [Validators.minLength(10)]],
      genero: [filme.genero, [Validators.required]]

    });
  }

  private salvar(filme: Filme): void {
    this.filmeService.salvar(filme).subscribe({
      next: fil => {
        const config = {
          data: {
            btnSucesso: 'Ir para a listagem',
            btnCancelar: 'Cadastrar um novo filme',
            corBtnCancelar: 'primary',
            possuitBtnFechar: true
          } as Alerta
        }
        const dialogRef = this.dialog.open(AlertaComponent, config);
        dialogRef.afterClosed().subscribe((opcao: boolean) => {
          opcao ? this.route.navigateByUrl('filmes') : this.reiniciarForm();
        });

      },
      error: err => {
        const config = {
          data: {
            btnSucesso: 'Fechar',
            possuitBtnFechar: false,
            titulo: 'Falha ao iserir registro!',
            corBtnSucesso: 'warn',
            descricao: 'Não conseguimos inserir o seu registro, por favor tente mais tarde.'
          } as Alerta
        }
        this.dialog.open(AlertaComponent, config);
      },


    })
  }

  private editar(filme: Filme): void {
    this.filmeService.editar(filme).subscribe({
      next: fil => {
        const config = {
          data: {
            btnSucesso: 'Ir para a listagem',
            corBtnCancelar: 'primary',
            possuitBtnFechar: true
          } as Alerta
        }
        const dialogRef = this.dialog.open(AlertaComponent, config);
        dialogRef.afterClosed().subscribe((opcao: boolean) => {
          this.route.navigateByUrl('filmes');
        });

      },
      error: err => {
        const config = {
          data: {
            btnSucesso: 'Fechar',
            possuitBtnFechar: false,
            titulo: 'Falha ao iserir registro!',
            corBtnSucesso: 'warn',
            descricao: 'Não conseguimos inserir o seu registro, por favor tente mais tarde.'
          } as Alerta
        }
        this.dialog.open(AlertaComponent, config);
      },


    })
  }


}
