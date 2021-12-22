import { ConfigParamsService } from './config-params.service';
import { ConfigParams } from './../shared/models/config-params';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Filme } from './../shared/models/filme';

const url = 'http://localhost:3000/filmes/'
@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  constructor(private http: HttpClient,
    private configParamService: ConfigParamsService) { }


  salvar(filme: Filme): Observable<Filme> {
    return this.http.post<Filme>(url, filme);
  }

  listar(configParams: ConfigParams): Observable<Filme[]> {

    let httpParams = this.configParamService.configurarParametros(configParams);
    return this.http.get<Filme[]>(url, { params: httpParams });
  }


  listaDeGeneros(): Array<string> {
    return ['Ação', 'Romance', 'Aventura', 'Terror', 'Ficção cientifica', 'Comédia', 'Drama'];
  }
}
