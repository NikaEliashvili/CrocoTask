import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-logo-btn',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './logo-btn.component.html',
  styleUrl: './logo-btn.component.css',
})
export class LogoBtnComponent {
  @Input() theme: string;
}
