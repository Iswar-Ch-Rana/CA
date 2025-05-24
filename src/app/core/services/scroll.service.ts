import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  constructor(private router: Router) {
    // Scroll to top on route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.scrollToTop();
      });
  }

  scrollToTop(smooth: boolean = false): void {
    if (smooth) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo(0, 0);
    }
  }

  scrollToElement(elementId: string, offset: number = 80): void {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }

  scrollToPosition(position: number, smooth: boolean = true): void {
    window.scrollTo({
      top: position,
      behavior: smooth ? 'smooth' : 'auto'
    });
  }

  getCurrentScrollPosition(): number {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }

  isScrolledToBottom(threshold: number = 100): boolean {
    const scrollPosition = this.getCurrentScrollPosition();
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    return scrollPosition + windowHeight >= documentHeight - threshold;
  }

  onScroll(callback: (scrollPosition: number) => void): void {
    window.addEventListener('scroll', () => {
      callback(this.getCurrentScrollPosition());
    });
  }
}
