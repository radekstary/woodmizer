import { ApplicationConfig, Injectable } from '@angular/core';
import {
  RouterStateSnapshot,
  TitleStrategy,
  provideRouter,
} from '@angular/router';
import { provideAnimations  } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class TemplatePageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`Wood-Mizer | ${title}`);
    }
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    { provide: TitleStrategy, useClass: TemplatePageTitleStrategy },
    provideAnimations(),
  ],
};
