import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LogoBtnComponent } from '../logo-btn/logo-btn.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DatePipe, RouterLink, MatIconModule, LogoBtnComponent],

  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }
  currentDateTime = new Date();

  constructor() {}

  ngOnInit(): void {
    setInterval(() => {
      this.currentDateTime = new Date();
    }, 700);
  }
}
