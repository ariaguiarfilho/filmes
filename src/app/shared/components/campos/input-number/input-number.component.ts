import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { ValidarCamposService } from '../validar-campos.service';

@Component({
  selector: 'dio-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.css']
})
export class InputNumberComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() controlName: string
  @Input() titulo: string;
  @Input() require = false;
  @Input() mim = 0;
  @Input() max = 10;
  @Input() step = 1;


  constructor(public validacao: ValidarCamposService) { }

  ngOnInit(): void {
  }


  get formControl(): AbstractControl{
    return this.formGroup.controls[this.controlName];
  }

}
