import { Component, inject, OnInit } from '@angular/core';
import { SpinnerService } from '../services/spinner.service';
import { Observable, ReplaySubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {

  spinnerService = inject(SpinnerService);

  isVisible$ = new ReplaySubject<boolean>();

  ngOnInit(): void {
    this.spinnerService.visibility.subscribe(isVisible => 
      this.isVisible$.next(isVisible)
    )
  }

}
