import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentComponent } from './payment/payment.component';
import { ResultComponent } from './result/result.component';
import { NricComponent } from './nric/nric.component';
import { PaymentStatusComponent } from './payment-status/payment-status.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentComponent,
    pathMatch: 'full'
  },
  {
    path: 'payment/:paymentCode',
    component: PaymentComponent
  },
  {
    path: 'result/:paymentCode',
    component: ResultComponent
  },
  {
    path: 'paymentStatus',
    component: PaymentStatusComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
