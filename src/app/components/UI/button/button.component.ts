import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() type: string;
  @Input() primary: boolean;
  @Input() success: boolean;
  @Input() danger: boolean;
  @Input() light: boolean;
  @Input() label: string;
  @Input() disabled: boolean;
  @Input() routerLink: string;

  @Output() Click = new EventEmitter<any>();

  setClasses() {
    return {
      btn: true,
      danger: this.danger,
      primary: this.primary,
      success: this.success,
      light: this.light
    };
  }

  constructor() {
  }

  onClickButton(event) {
    this.Click.emit(event);
  }

  ngOnInit() {
  }

}

