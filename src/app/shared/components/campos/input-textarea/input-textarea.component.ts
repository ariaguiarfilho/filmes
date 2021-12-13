import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ValidarCamposService } from '../validar-campos.service';

@Component({
  selector: 'dio-input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.css']
})
export class InputTextareaComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() controlName: string
  @Input() titulo: string;
  @Input() rows = 5;
  @Input() require = false;

  constructor(public validacao: ValidarCamposService) { }

  ngOnInit(): void {
  }


  get formControl(): AbstractControl{
    return this.formGroup.controls[this.controlName];
  }

}
