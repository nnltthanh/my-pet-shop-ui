import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../services/order.service';
import { OrderStatus } from '../product/order.model';
import { Shipment } from '../product/shipment.model';
import { Payment, PaymentSupplier } from '../product/payment.model';
import { User } from '../auth/user.model';
import { getLoggedInUserId } from '../services/user.service';

@Component({
  selector: 'app-payment-result-page',
  standalone: true,
  imports: [],
  templateUrl: './payment-result-page.component.html',
  styleUrl: './payment-result-page.component.scss'
})
export class PaymentResultPageComponent implements OnInit {

  route = inject(ActivatedRoute);

  orderService = inject(OrderService);

  isSuccess: boolean;

  ngOnInit(): void {
    const returnUrl = new URLSearchParams(window.location.search);
    
    console.log(returnUrl.get("vnp_ResponseCode"));
    console.log(returnUrl.get("vnp_Amount")!.substring(0, returnUrl.get("vnp_Amount")!.length - 2));
    console.log(returnUrl.get("vnp_BankTranNo"));
    console.log(returnUrl.get("vnp_BankCode"));
    console.log(returnUrl.get("vnp_OrderInfo"));
    this.route.params.subscribe((params) => {
      let id = params['id'];
      // vnp_ResponseCode

      if (returnUrl.get("vnp_ResponseCode") && returnUrl.get("vnp_ResponseCode") === "00") {
        this.isSuccess = true;
      } else {
        this.isSuccess = false;
      }

      let isFromVNPay = false;
      
      if (returnUrl.get("vnp_BankTranNo") && returnUrl.get("vnp_BankTranNo")?.includes("VNP")) {
        isFromVNPay = true;
      }

      if (id && Number(id)) {
        this.orderService.findById(getLoggedInUserId(), +id).subscribe({
          next: (order) => {
            
            if (isFromVNPay) {
              let payment = new Payment();
              payment.amount = +(returnUrl.get("vnp_Amount")!.substring(0, returnUrl.get("vnp_Amount")!.length - 2));
              payment.customer = new User({id:1});
              payment.paymentUrl = returnUrl.toString();
              payment.status = this.isSuccess ? "Thành công" : "Thất bại";
              payment.supplier = PaymentSupplier.VN_PAY;
              order.payment = payment;
            }
            if (this.isSuccess) {
              order.status = OrderStatus.PAYMENT;
              this.orderService.update(getLoggedInUserId(), order).subscribe({
                complete:() => {}
              })
            } else {
              order.status = OrderStatus.CANCELLED;
              this.orderService.update(getLoggedInUserId(), order).subscribe({
                complete:() => {}
              })
            }
          }
        })
      }
    })
  }

}
