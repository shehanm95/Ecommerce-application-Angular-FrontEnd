import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nothing-to-show',
  standalone: true,
  imports: [],
  templateUrl: './nothing-to-show.component.html',
  styleUrl: './nothing-to-show.component.css'
})
export class NothingToShowComponent {
  @Input() message: string = "Nothing To Show !";

}
