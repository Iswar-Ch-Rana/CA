import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, Theme } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  imports: [CommonModule],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss'
})
export class ThemeToggleComponent implements OnInit {
  currentTheme: Theme = 'light';

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  get isDarkMode(): boolean {
    return this.currentTheme === 'dark';
  }
}
