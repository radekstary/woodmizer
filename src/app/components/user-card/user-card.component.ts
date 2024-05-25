import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EllipsisPipe } from '../../pipes/ellipsis.pipe';
import { User } from '../../mockData/users/user.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule,
    EllipsisPipe,
    MatDividerModule,
    MatProgressBarModule,
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Output() onActionButtonClick: EventEmitter<any> = new EventEmitter();
  @Input('truncateStrings') truncateStrings: boolean = false;
  @Input('showDivider') showDivider: boolean = false;
  @Input('showStatusBar') showStatusBar: boolean = false;
  @Input('showActionButton') showActionButton: boolean = false;
  @Input('showTooltips') showTooltips: boolean = false;
  @Input('actionText') actionText: string = '';
  @Input('user') user: User | undefined;
  @ViewChild('fname') fname: ElementRef<HTMLElement> | undefined;
  @ViewChild('lname') lname: ElementRef<HTMLElement> | undefined;
  @ViewChild('birthDate') birthDate: ElementRef<HTMLElement> | undefined;
  @ViewChild('qtyOfCars') qtyOfCars: ElementRef<HTMLElement> | undefined;

  constructor(public auth: AuthService) {}
  handleActionButtonClick() {
    this.onActionButtonClick.emit();
  }
}
