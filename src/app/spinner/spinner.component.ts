import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {

  showSpinner$ = this.spinnerService.visibility;

  constructor(private spinnerService: SpinnerService){ }

}
