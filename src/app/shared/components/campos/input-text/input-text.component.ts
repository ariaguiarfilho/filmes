import { ValidarCamposService } from './../validar-campos.service';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dio-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css']
})
export class InputTextComponent implements OnInit {


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
