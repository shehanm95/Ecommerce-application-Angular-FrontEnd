import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-buyer-order-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buyer-order-filter.component.html',
  styleUrl: './buyer-order-filter.component.css'
})
export class BuyerOrderFilterComponent {
  selectedStatus: string = 'All'; // Default status

  // Function to set selected status
  selectStatus(status: string): void {
    this.selectedStatus = status;
    console.log(`Selected Status: ${this.selectedStatus}`);
  }
}
