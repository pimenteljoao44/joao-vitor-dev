import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public isMobile = false;

  constructor(private observer: BreakpointObserver) {}

  ngOnInit() {
    this.observer.observe(['(min-width: 800px)']).subscribe((res) => {
      this.isMobile = res.matches;
    });
  }

}
