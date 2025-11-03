import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'app-pages',
  imports: [
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    MatRipple
  ],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css'
})
export default class PagesComponent {

}
