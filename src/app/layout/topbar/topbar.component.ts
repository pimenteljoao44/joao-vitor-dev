import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, Output, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {

  @Output() sidenavToggle = new EventEmitter<void>();
  
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  @ViewChild('container') container!: ElementRef;

  public isMobile = false;

  constructor(private observer: BreakpointObserver, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .subscribe((res) => {
        this.isMobile = res.matches;
  
        if (this.isMobile && this.sidenav) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else if (this.sidenav) {
          this.sidenav.close();
        }
      });
  
    this.isMobile = this.observer.isMatched('(max-width: 800px)');
    if (!this.isMobile && this.sidenav) {
      this.sidenav.close();
    }
  }

  toggleSidenav() {
    this.sidenavToggle.emit();
    const toolbar = document.querySelector('.mat-toolbar');
    if (toolbar) {
      toolbar.classList.toggle('sidenav-opened', this.sidenav && this.sidenav.opened);
    }
  }  
}
