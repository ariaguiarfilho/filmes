import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { ValidarCamposService } from '../validar-campos.service';

@Component({
  selector: 'dio-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.css']
})
export class InputSelectComponent implements OnInit {


  @Input() formGroup: FormGroup;
  @Input() controlName: string
  @Input() titulo: string;
  @Input() require = false;
  @Input() opcoes: Array<string>;

  constructor(public validacao: ValidarCamposService) { }

  ngOnInit(): void {
  }


  get formControl(): AbstractControl{
    return this.formGroup.controls[this.controlName];
  }

}
