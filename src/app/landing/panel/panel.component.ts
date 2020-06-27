import { Component, OnInit, Renderer2, ElementRef, ViewChild, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  public loggedIn = true;

  @ViewChild('dropmenu') drop: ElementRef;
  @ViewChild('accountMenu') accMenu: ElementRef;

  public dropdown = false;
  public showAcc = false;
  public shrink = false;

  @HostListener('window:scroll', [])onWindowScroll() {
    this.checkScrollTop();
  }

  constructor(
      private renderer: Renderer2,
      @Inject(DOCUMENT) private document: Document,
      private authService: AuthService,
      private router: Router
    ) {
    renderer.listen('window', 'click', (e: Event) => {
      if (!this.drop.nativeElement.contains(e.target)) {
        this.dropdown = false;
      }
      if (!this.accMenu.nativeElement.contains(e.target)) {
        this.showAcc = false;
      }
    });

    if (this.authService.currentUserValue) {
      this.loggedIn = true;
    }
  }

  ngOnInit(): void {
  }

  showdrop() {
    this.dropdown = !this.dropdown;
  }
  public showAccount() {
    if (this.loggedIn) {
      this.showAcc = !this.showAcc;
    }
  }

  public checkScrollTop() {
    if (this.document.documentElement.scrollTop > 2) {
      this.shrink = true;
    } else {
      this.shrink = false;
    }
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
