import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, model, OnInit, signal } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg, EventInput, EventSourceFuncArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { PetCustomerRegistrationService } from '../../../services/pet-customer-registration.service';
import { getLoggedInUserId } from '../../../services/user.service';
import { createEventId, INITIAL_EVENTS } from '../../../sharing/event-utils';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceDetailDialogComponent } from './service-detail-dialog/service-detail-dialog.component';
import { EventImpl } from '@fullcalendar/core/internal';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../product/order.model';

@Component({
  selector: 'app-service-product-calendar-display',
  standalone: true,
  imports: [
    CommonModule,
    FullCalendarModule
  ],
  templateUrl: './service-product-calendar-display.component.html',
  styleUrl: './service-product-calendar-display.component.scss',

})
export class ServiceProductCalendarDisplayComponent implements OnInit {

  modalService = inject(NgbModal);

  petRegistrationService = inject(PetCustomerRegistrationService);

  calendarVisible = signal(true);

  calendarOptions = model<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    events: this.LoadEvents.bind(this),
    weekends: true,
    // editable: true,
    selectable: true,
    // selectMirror: true, press and move to select
    dayMaxEvents: true,
    eventOverlap: true,
    locale: "vi",
    showNonCurrentDates: false,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    // eventChange: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventRemove:
    */
  });
  currentEvents = signal<EventApi[]>([]);

  orderService = inject(OrderService);

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
      // this.orderService.findAllServiceProductOrdersByCustomer(getLoggedInUserId()).subscribe({
      //   next: data => {
      //     console.log(data);
          
      //   }
      // })
  }

  LoadEvents(args: EventSourceFuncArg): Promise<EventInput[]> {
    return new Promise<EventInput[]>((resolve) => {
      // this.orderService.findAllServiceProductOrdersByCustomer(getLoggedInUserId()).subscribe({
      //   next: (result: Order[]) => {
          
      //     const events: EventInput[] = [];
      //     result.forEach((val) => {
      //       events.push({
      //         id: val.id.toString(),
      //         title: `[${val.orderDetails[0].productDetail.product.name}] ${val.orderDetails[0].productDetail.product.name}`,
      //         // start: val.serveFrom,
      //         // end: val.serveTo,
      //         extendedProps: val

      //       });
      //     });
      
      //     resolve(events);
      //   }
      // })
      this.petRegistrationService.findAll().subscribe({
        next: (result) => {
          console.log(result);
          
          
          const events: EventInput[] = [];
          result.forEach((val) => {
            events.push({
              id: val.id.toString(),
              title: `[${val.serviceProduct?.name}] ${val.serveFor?.name}`,
              start: val.serveFrom,
              end: val.serveTo,
              extendedProps: val

            });
          });
     
          resolve(events);
        }
    });
  })
} 

  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  handleWeekendsToggle() {
    this.calendarOptions.update((options) => ({
      ...options,
      weekends: !options.weekends,
    }));
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    // const title = prompt('Please enter a new title for your event');
    // const calendarApi = selectInfo.view.calendar;

    // calendarApi.unselect(); // clear date selection

    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay
    //   });
    // }
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.openDetailDialog(clickInfo.event);
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }

  openDetailDialog(clickInfo: EventImpl) {
    const modalRef = this.modalService.open(ServiceDetailDialogComponent, {
      backdrop: 'static',
      centered: true,
      scrollable: true,
      size: 'lg'
    });
    console.log(clickInfo.extendedProps);
    
    modalRef.componentInstance.service = clickInfo.extendedProps;
    modalRef.componentInstance.activeModal = modalRef;

    modalRef.result.then(
      (result) => {
        if (result) {
        }
      },
      (reason) => {
        if (
          reason == ModalDismissReasons.BACKDROP_CLICK ||
          reason == ModalDismissReasons.ESC
        ) {
        }
      })
  }
}
