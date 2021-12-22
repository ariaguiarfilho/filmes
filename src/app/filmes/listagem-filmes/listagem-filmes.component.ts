import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { Filme } from './../../shared/models/filme';
import { FilmesService } from './../../core/filmes.service';
import { ConfigParams } from './../../shared/models/config-params';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {


  readonly semImagem = "https://www.malhariapradense.com.br/wp-content/uploads/2017/08/produto-sem-imagem.png"
  configParams: ConfigParams = {
    pagina: 0,
    limite: 5,

  };
  filmes: Filme[] = [];
  filtroListagem: FormGroup;
  generos: Array<string>;

  constructor(
    private filmeService: FilmesService,
    private fb: FormBuilder) { }

  ngOnInit() {

    this.filtroListagem = this.fb.group({
      texto: [],
      genero: []
    });

    this.filtroListagem.get('texto').valueChanges
      .pipe(debounceTime(400))
      .subscribe((val: string) => {
        this.configParams.pesquisa = val;
        this.limparListagem();
      });

    this.filtroListagem.get('genero').valueChanges.subscribe((val: string) => {
      this.configParams.campo = { tipo: 'genero', valor: val };
      this.limparListagem();
    });

    this.generos = this.filmeService.listaDeGeneros();


    this.listarFilmes();
  }

  onScroll(): void {
    this.listarFilmes();
  }

  open() {
  }


  private listarFilmes(): void {

    this.configParams.pagina++;

    this.filmeService.listar(this.configParams)
      .subscribe({
        next: fil => {
          this.filmes.push(...fil);
        },

      });

  }

  private limparListagem(): void {
    this.configParams.pagina = 0;
    this.filmes = [];
    this.listarFilmes();
  }

}
