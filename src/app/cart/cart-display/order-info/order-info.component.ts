import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderInfoCardComponent } from './order-info-card/order-info-card.component';
import { TimelineModule } from 'primeng/timeline';
import { CurrencyPipe, NgClass } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';


interface EventItem {
  status?: string;
  date?: string;
  icon?: string;
  color?: string;
  image?: string;
  id: string
}


@Component({
  selector: 'app-order-info',
  standalone: true,
  imports: [OrderInfoComponent, FormsModule, TimelineModule, OrderInfoCardComponent, NgClass, ReactiveFormsModule, CurrencyPipe],
  templateUrl: './order-info.component.html',
  styleUrl: './order-info.component.scss'
})
export class OrderInfoComponent {
  events: EventItem[];

  colorStatus = [
    {
      status: "Not Complete", color: "#ffc107",      
    },
    {
      status: "Done", color: "#198754",
    },
    {
      status: "No Info", color: "#adb5bd",
    }
  ]

    constructor() {
        this.events = [
            { id: 'step-1', status: 'Thông tin người nhận', icon: 'pi pi-user', color: this.colorStatus[0].color },
            { id: 'step-2', status: 'Thông tin đơn hàng', icon: 'pi pi-shopping-cart', color: this.colorStatus[0].color },
            { id: 'step-3', status: 'Thông tin vận chuyển', icon: 'pi pi-truck', color: this.colorStatus[2].color },
            { id: 'step-4', status: 'Thông tin thanh toán', icon: 'pi pi-wallet', color: this.colorStatus[0].color }
        ];
    }
    validate(eventId: string): boolean{
      var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
      if (form.checkValidity() === false) {
      } else {
        this.events.forEach(event => {
          if (event.id === eventId) {
            event.color = this.colorStatus[1].color;
          }
        })
      }
      form.classList.add('was-validated');
      return form.checkValidity();
    }
}
