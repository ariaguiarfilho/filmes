import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Filme } from './../../shared/models/filme';
import { FilmesService } from './../../core/filmes.service';
import { Alerta } from 'src/app/shared/models/alerta';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';

@Component({
  selector: 'app-visualizar-filmes',
  templateUrl: './visualizar-filmes.component.html',
  styleUrls: ['./visualizar-filmes.component.css']
})
export class VisualizarFilmesComponent implements OnInit {
  readonly semImagem = "https://www.malhariapradense.com.br/wp-content/uploads/2017/08/produto-sem-imagem.png"
  filme: Filme;
  id: number;

  constructor(
    private activateRoute: ActivatedRoute,
    public dialog: MatDialog,
    private filmeService: FilmesService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params['id'];
    this.visualizarFilme();
  }


  editar(id: number){
    this.route.navigateByUrl('/filmes/cadastro/'+id);
  }

  excluir() {

    const config = {
      data: {
        titulo: 'Você tem certeza que deseja excluir?',
        descricao: 'Caso você tenha certeza que deseja excluir, clique no botão OK',
        corBtnCancelar: 'primary',
        corBtnSucesso: 'warn',
        possuitBtnFechar: true
      } as Alerta
    }
    const dialogRef = this.dialog.open(AlertaComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.filmeService.excluir(this.id).subscribe({
            next: f => {
              this.route.navigateByUrl('filmes');
            },
            error: err => {
              const config = {
                data: {
                  btnSucesso: 'Fechar',
                  possuitBtnFechar: false,
                  titulo: 'Falha ao excluir registro!',
                  corBtnSucesso: 'warn',
                  descricao: 'Não conseguimos excluir o seu registro, por favor tente mais tarde.'
                } as Alerta
              }
              this.dialog.open(AlertaComponent, config);
            },
          })
      }
    });



  }


  private visualizarFilme() {
    this.filmeService.consultar(this.id).subscribe((fil: Filme) => {
      this.filme = fil;
      console.log(JSON.stringify(fil.dtLancamento));
    });

  }

}
