import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.css'
})
export class SellerDashboardComponent {
  lastClickedLink: string = 'Statics'; // Default active link

  setButtonAppearance(event: Event): void {
    const target = event.target as HTMLElement;
    // Capture the clicked link's text content, trimming any extra whitespace
    this.lastClickedLink = target.innerText.trim();
  }
}
