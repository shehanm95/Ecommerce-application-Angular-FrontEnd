import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IUser } from '../../service/user.service';

@Component({
  selector: 'app-dashboard-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-main.component.html',
  styleUrl: './dashboard-main.component.css'
})
export class DashboardMainComponent {


}
