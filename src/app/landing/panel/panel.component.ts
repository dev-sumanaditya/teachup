import { Component, OnInit, Renderer2, ElementRef, ViewChild, Inject, HostListener, AfterViewInit, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '../auth/services/auth.service';
import { Router, ActivatedRoute, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { switchMap, filter, tap } from 'rxjs/operators';
import { GetUser } from '../models/user.model';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit, AfterViewInit,OnDestroy {

  public loading = false;
  public requesting = false;
  public user: GetUser;
  public sidemenu = false;

  @ViewChild('dropmenu') drop: ElementRef;
  @ViewChild('accountMenu') accMenu: ElementRef;
  @ViewChild('loading', { static: true }) loader: ElementRef;

  public dropdown = false;
  public showAcc = false;
  public shrink = false;


  public subscriptions = [];

  @HostListener('window:scroll', [])onWindowScroll() {
    this.checkScrollTop();
  }

  constructor(
      @Inject(DOCUMENT) private document: Document,
      private renderer: Renderer2,
      private authService: AuthService,
      private router: Router,
      private route: ActivatedRoute

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

    if (localStorage.getItem('currentUser')) {
          // if (this.authService.currentUserValue) {
      //   this.authService.getUserData(this.authService.currentUserValue.uuid).subscribe(data => {
      //     if (!data.firstName) {
      //       // this.router.navigate(['/', 'auth', 'info']);
      //     }
      //   });
      // }
    }
  }

  ngOnInit(): void {
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

    const sub = this.authService.currentUserSubject
    .pipe(
      tap(user => console.log(user)),
    filter(user => !!user),
    switchMap(user => this.authService.getUserData(user.uuid)),
    tap(user => {
      this.user = user;
    }),
    filter(user => !user.firstName),
    tap(user => this.router.navigate(['auth', 'info']))
    )
    .subscribe();


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
    if (this.document.documentElement.scrollTop > 2) {
      this.shrink = true;
    } else {
      this.shrink = false;
    }
  }

  public logout() {
    this.authService.logout();
    this.user = null;
    this.router.navigate(['/']);
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

  ngOnDestroy(){
    // this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
