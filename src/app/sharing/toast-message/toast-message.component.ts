import { NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { Severity } from "./message.model";
import { ToastMessageService } from "./toast-message.service";

@Component({
  selector: 'app-toast-message',
  templateUrl: './toast-message.component.html',
  styleUrls: ['./toast-message.component.scss'],
  standalone: true,
  imports: [NgFor, NgbToastModule, NgIf]
})
export class ToastMessageComponent implements OnDestroy {

  private severityHeaderMap: Map<Severity, string> = new Map<Severity, string>([
    [Severity.ERROR, "Error"],
    [Severity.WARNING, "Warning"],
    [Severity.SUCCESS, "Success"],
    [Severity.INFO, "Information"],
  ]);

  private severityDelayTimeMap: Map<Severity, number> = new Map<Severity, number>([
    [Severity.SUCCESS, 3500],
    [Severity.INFO, 3500],
    [Severity.ERROR, 3500],
    [Severity.WARNING, 3500],
  ]);

  private severityCssClassMap: Map<Severity, string> = new Map<Severity, string>([
    [Severity.ERROR, 'bg-danger text-light'],
    [Severity.WARNING, 'bg-warning'],
    [Severity.SUCCESS, 'bg-success text-light'],
    [Severity.INFO, "bg-info"],
  ]);

  private severityIconClassMap: Map<Severity, string> = new Map<Severity, string>([
    [Severity.ERROR, 'bi bi-x-circle-fill'],
    [Severity.WARNING, 'bi bi-exclamation-triangle-fill'],
    [Severity.SUCCESS, 'bi bi-check-circle-fill'],
    [Severity.INFO, "bi bi bi-info-circle-fill"],
  ]);

  constructor(public messageService: ToastMessageService) {
  }

  getDelayTime(severity: Severity): number | any {
    return this.severityDelayTimeMap.get(severity);
  }

  getHeader(severity: Severity): string | any {
    return this.severityHeaderMap.get(severity);
  }

  getCssClass(severity: Severity) {
      return this.severityCssClassMap.get(severity);
  }

  getIconClass(severity: Severity) {
    return this.severityIconClassMap.get(severity);
  }

  isAutoHide(severity: Severity): boolean {
    return  !(severity === Severity.WARNING || severity === Severity.ERROR);
  }

  ngOnDestroy(): void {
    this.messageService.clearAll();
  }


}
