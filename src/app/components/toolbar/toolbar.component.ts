import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  ActivatedRoute,
  NavigationEnd,
  Route,
  Router,
  RouterState,
  TitleStrategy,
} from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  public isLoaded: boolean = false;
  public routeTitle: string = '';
  constructor(
    private router: Router,
    private readonly route: ActivatedRoute,
    private titleStrategy: TitleStrategy
  ) {
    router.events.subscribe((val) => {
      setTimeout(() => {
        console.log(val);
        this.isLoaded = val instanceof NavigationEnd;
        if (this.isLoaded) {
          console.log('route', this.route);
          console.log('route', this.route.snapshot.routeConfig?.title);
          this.routeTitle = this.getTitle(
            this.router.routerState,
            this.router.routerState.root
          )
            .join('-')
            .trim();
        }
      }, 1000);
    });
  }

  getTitle(state: RouterState, parent: ActivatedRoute): string[] {
    const data = [];

    if (
      parent &&
      parent.snapshot &&
      this.titleStrategy.getResolvedTitleForRoute(parent.snapshot)
    ) {
      data.push(this.titleStrategy.getResolvedTitleForRoute(parent.snapshot));
    }
    if (state && parent && parent.firstChild) {
      data.push(...this.getTitle(state, parent.firstChild));
    }
    return data;
  }
}
