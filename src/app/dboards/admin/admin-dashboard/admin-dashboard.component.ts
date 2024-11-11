import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminStaticsComponent } from '../admin-statics/admin-statics.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterModule,],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

}
