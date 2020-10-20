import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NricComponent } from './nric/nric.component';
import { OtpComponent } from './otp/otp.component';
import { SelectionComponent } from './selection/selection.component';
import { PaymentComponent } from './payment/payment.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  { path: '', component: NricComponent},
  { path: 'otp', component: OtpComponent},
  { path: 'selection', component: SelectionComponent},
  { path: 'payment', component: PaymentComponent},
  { path: 'result', component: ResultComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
