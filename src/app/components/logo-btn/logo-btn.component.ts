import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logo-btn',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './logo-btn.component.html',
  styleUrl: './logo-btn.component.css',
})
export class LogoBtnComponent {
  @Input() theme: string;
}
