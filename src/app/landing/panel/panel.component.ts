import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  ViewChild,
  Inject,
  HostListener,
  AfterViewInit,
  OnDestroy,
  PLATFORM_ID
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { AuthService } from '../auth/services/auth.service';
import { Router, ActivatedRoute, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetCartItems } from '../store/actions/cart.action';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit, AfterViewInit, OnDestroy {

  public loading = false;
  public requesting = false;
  public sidemenu = false;
  public dropdown = false;
  public showAcc = false;
  public shrink = false;
  public user;
  public isInstructor;

  @ViewChild('dropmenu') drop: ElementRef;
  @ViewChild('accountMenu') accMenu: ElementRef;
  @ViewChild('loading', { static: true }) loader: ElementRef;

  public subscriptions = [];

  @HostListener('window:scroll', [])onWindowScroll() {
    this.checkScrollTop();
  }

  constructor(
      @Inject(DOCUMENT) private document: Document,
      private renderer: Renderer2,
      private authService: AuthService,
      private router: Router,
      private route: ActivatedRoute,
      private store: Store,
      @Inject(PLATFORM_ID) private platformId,
    ) {
    renderer.listen('window', 'click', (e: Event) => {
      if (!this.drop.nativeElement.contains(e.target)) {
        this.dropdown = false;
      }
      if (this.user) {
        if (!this.accMenu.nativeElement.contains(e.target)) {
          this.showAcc = false;
        }
      }
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events.forEach((event: RouterEvent) => {
        if (event instanceof NavigationStart) {
          this.loading = true;
          this.loader.nativeElement.classList.remove('hide');
          return;
        }
        if (event instanceof NavigationEnd) {
          this.loading = false;
          this.loader.nativeElement.classList.add('hide');
          return;
        }
        if (event instanceof NavigationCancel) {
          this.loading = false;
          this.loader.nativeElement.classList.add('hide');
          return;
        }
        if (event instanceof NavigationError) {
          this.loading = false;
          this.loader.nativeElement.classList.add('hide');
          return;
        }
      });
    }

    const sub = this.authService.currentUser
    .subscribe(
      data => {
        if (!data.displayName) {
          this.router.navigate(['auth', 'info']);
        }
        this.user = data;
        const roles = data.roles;
        if (roles.some(e => e.name === 'INSTRUCTOR')) {
          this.isInstructor = true;
        }
        this.store.dispatch(new GetCartItems());
      }
    );


    this.subscriptions = [...this.subscriptions, sub];
  }

  ngAfterViewInit() {
  }

  showdrop() {
    this.dropdown = !this.dropdown;
  }
  public showAccount() {
    if (this.user) {
      this.showAcc = !this.showAcc;
    }
  }

  public checkScrollTop() {
    if (this.document.documentElement.scrollTop > 50) {
      this.shrink = true;
    } else {
      this.shrink = false;
    }
  }

  public logout() {
    this.authService.logout();
    this.user = null;
    this.router.navigate(['/auth']);
  }
  public logout2() {
    this.logout();
    this.closeSideMenu();
  }

  openSideMenu() {
    this.sidemenu = true;
  }
  closeSideMenu() {
    this.sidemenu = false;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
