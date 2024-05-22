import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  ActivatedRoute,
  ActivationStart,
  NavigationEnd,
  Router,
  TitleStrategy,
} from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthService } from '../../services/auth.service';
import { CommonModule, Location } from '@angular/common';
import { NavService } from '../../services/nav.service';
import { MatGridListModule } from '@angular/material/grid-list';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,
    MatGridListModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  public auth = inject(AuthService);
  public isLoaded: boolean = false;
  public routeTitle: string | undefined | null = '';
  public hasHistory: boolean;
  constructor(
    private router: Router,
    private readonly route: ActivatedRoute,
    private titleStrategy: TitleStrategy,
    private location: Location,
    public nav: NavService,
    private cd: ChangeDetectorRef
  ) {
    this.subscribeToRouterEvents();
    this.hasHistory = this.location.getState() !== null;
  }

  subscribeToRouterEvents() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.isLoaded = true;
      } else {
        this.isLoaded = false;
      }

      if (val instanceof ActivationStart) {
        this.setTitle(val);
        this.handleGoBackVisibility(val);
      }
    });
  }

  setTitle(val: ActivationStart) {
    this.routeTitle = val.snapshot.routeConfig?.title as string;
  }

  handleGoBackVisibility(val: ActivationStart) {
    const path = val.snapshot.routeConfig?.path;
    switch (path) {
      case 'login':
        this.nav.isRoot = signal(true);
        break;
      default:
        this.nav.isRoot = signal(false);
    }
  }

  goBack(): void {
    this.location.back();
  }

  logOut(): void {
    this.auth.logout();
  }
}
