import { Alerta } from './../../shared/models/alerta';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FilmesService } from './../../core/filmes.service';
import { Filme } from './../../shared/models/filme';
import { ValidarCamposService } from './../../shared/components/campos/validar-campos.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Router } from '@angular/router';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  cadastro: FormGroup;
  generos: Array<string>;

  constructor(private fb: FormBuilder,
    public validacao: ValidarCamposService,
    public dialog: MatDialog,
    private filmeService: FilmesService,
    private route: Router) { }

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit() {

    this.cadastro = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
      urlFoto: ['', [Validators.minLength(10)]],
      dataLancamento: ['', [Validators.required]],
      descricao: [''],
      nota: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlImdb: ['', [Validators.minLength(10)]],
      genero: ['', [Validators.required]]

    });

    this.generos = ['Ação', 'Romance', 'Aventura', 'Terror', 'Ficção cientifica', 'Comédia', 'Drama'];

  }

  submit(): void {
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid) {
      return;
    }

    const filme = this.cadastro.getRawValue() as Filme;

    this.salvar(filme);

  }

  reiniciarForm(): void {
    this.cadastro.reset();
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
            descricao: 'Não conseguimos inserir o ser registro, por favor tente mais tarde.'
          } as Alerta
        }
        this.dialog.open(AlertaComponent, config);
      },


    })
  }


}
