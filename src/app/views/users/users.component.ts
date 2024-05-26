import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { User } from '../../mockData/users/user.interface';
import { USERS } from '../../mockData/users/users.mock';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EllipsisPipe } from '../../pipes/ellipsis.pipe';
import { AuthService } from '../../services/auth.service';
import {
  MatButtonToggleChange,
  MatButtonToggleModule,
} from '@angular/material/button-toggle';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';

import { MatIconModule } from '@angular/material/icon';
import { CustomPaginatorConfig } from '../../config/CustomPaginator.config';
import { LocalStorageService } from '../../services/localStorageService/localStorage.service';
import {
  LocalStorageConfig,
  LocalStorageKey,
  ViewModeValue,
} from '../../services/localStorageService/localStorage.interface';
import { Router } from '@angular/router';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { AppService } from '../../app.service';
@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressBarModule,
    MatTooltipModule,
    EllipsisPipe,
    MatTableModule,
    MatPaginatorModule,
    MatButtonToggleModule,
    MatIconModule,
    UserCardComponent
  ],
  providers: [{ provide: MatPaginatorIntl, useValue: CustomPaginatorConfig() }],
})
export class UsersComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  private LOCAL_STORAGE_KEY: LocalStorageKey = 'UsersComponent';
  public localStorageConfig: LocalStorageConfig;
  public users: User[];

  public dataSource: MatTableDataSource<User>;
  public displayedColumns: string[] = [
    'lname',
    'fname',
    'birthDate',
    'qtyOfCars',
    'button',
  ];
  public viewModeValue: ViewModeValue;
  constructor(
    public app: AppService,
    public auth: AuthService,
    private localStorageSvc: LocalStorageService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    this.users = USERS;
    this.dataSource = new MatTableDataSource<User>(this.users);
    this.localStorageConfig = this.localStorageSvc.getConfig(
      this.LOCAL_STORAGE_KEY
    );
    this.viewModeValue = this.localStorageConfig?.viewModeValue || 'table';
  }

  ngAfterViewInit() {
    if (this.paginator !== undefined)
      this.dataSource.paginator = this.paginator;

    if(this.viewModeValue === 'table') this.cd.detectChanges();
  }

  selectUser(user: User) {
    this.auth.loginAs(user);
    const currentUser = this.auth.currentUser();

    if (!currentUser) {
      /* TODO:
      add a service to notify the user about authentication error
      */
      return;
    }

    this.router.navigate(['/user', currentUser.id]);
  }

  onViewModeChange(e: MatButtonToggleChange) {
    this.localStorageSvc.updateConfig(this.LOCAL_STORAGE_KEY, [
      { key: 'viewModeValue', value: e.value },
    ]);
    setTimeout(() => {
      if (e.value === 'table' && this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    }, 0);
  }
}
