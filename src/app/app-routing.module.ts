import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentComponent } from './payment/payment.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentComponent
  },
  {
    path: ':paymentCode',
    component: PaymentComponent
  },
  {
    path: 'result/:paymentCode',
    component: ResultComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
