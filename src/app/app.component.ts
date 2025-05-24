import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ThemeService } from './core/services/theme.service';
import { ScrollService } from './core/services/scroll.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ca-professional-website';

  constructor(
    private themeService: ThemeService,
    private scrollService: ScrollService
  ) {}

  ngOnInit() {
    // Initialize theme service to ensure proper theme application
    this.themeService.getCurrentTheme();

    // Initialize scroll service for route-based scrolling
    // The scroll service automatically handles scroll-to-top on route changes
  }
}
