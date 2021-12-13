import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { ValidarCamposService } from '../validar-campos.service';

@Component({
  selector: 'dio-input-data',
  templateUrl: './input-data.component.html',
  styleUrls: ['./input-data.component.css']
})
export class InputDataComponent implements OnInit {


  @Input() formGroup: FormGroup;
  @Input() controlName: string
  @Input() titulo: string;
  @Input() require = false;

  constructor(public validacao: ValidarCamposService) { }

  ngOnInit(): void {
  }


  get formControl(): AbstractControl{
    return this.formGroup.controls[this.controlName];
  }
}
