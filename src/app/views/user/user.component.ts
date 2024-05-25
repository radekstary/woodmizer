import { Component, OnChanges, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../mockData/users/user.interface';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EllipsisPipe } from '../../pipes/ellipsis.pipe';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UserCardComponent } from '../../components/user-card/user-card.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule,
    EllipsisPipe,
    MatDividerModule,
    MatProgressBarModule,
    UserCardComponent
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  inputs: ['isChildComponent'],
})
export class UserComponent implements OnInit {

  isChildComponent: boolean = false;
  user$!: Observable<User>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: UsersService,
    public auth: AuthService
  ) {}
  ngOnInit() {
    this.user$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.service.getUser(params.get('id')!))
    );
  }

  generatePdf(user: User) {}

  onSelectButtonClick() {

  }
}
