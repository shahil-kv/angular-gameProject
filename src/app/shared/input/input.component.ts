import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  /**
   * ? the input component is used for the form control to access in the input component we are passing the form control using the register ts file
   **/

  @Input() control: FormControl = new FormControl()
  @Input() type = 'text'
  @Input() placeholder = ''

  constructor() { }

  ngOnInit(): void {
    console.log(this.control)
  }



}
