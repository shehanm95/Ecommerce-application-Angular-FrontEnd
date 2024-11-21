import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seller-order-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './seller-order-filter.component.html',
  styleUrl: './seller-order-filter.component.css'
})
export class SellerOrderFilterComponent {
  selectedStatus: string = 'All'; // Default status

  // Function to set selected status
  selectStatus(status: string): void {
    this.selectedStatus = status;
    console.log(`Selected Status: ${this.selectedStatus}`);
  }
}