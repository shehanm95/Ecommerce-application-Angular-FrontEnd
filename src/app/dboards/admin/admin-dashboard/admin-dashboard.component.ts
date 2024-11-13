import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {


  lastClickedLink: string = 'Statics'; // Default active link

  setButtonAppearance(event: Event): void {
    const target = event.target as HTMLElement;
    // Capture the clicked link's text content, trimming any extra whitespace
    this.lastClickedLink = target.innerText.trim();
  }




}
