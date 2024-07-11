import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LogoBtnComponent } from '../logo-btn/logo-btn.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, LogoBtnComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {}
