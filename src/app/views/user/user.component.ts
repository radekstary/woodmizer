import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../mockData/users/user.interface';
import { Observable } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EllipsisPipe } from '../../pipes/ellipsis.pipe';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { jsPDF } from 'jspdf';

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
    UserCardComponent,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  inputs: ['isChildComponent'],
})
export class UserComponent implements OnInit {
  @ViewChild('card') card: UserCardComponent | undefined;
  isChildComponent: boolean = false;
  user$!: Observable<User>;

  offsetLeft: number = 20;
  lineHeight: number = 15;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: UsersService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.user$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.service.getUser(params.get('id')!))
    );
  }

  generatePdf(user: User): void {
    if (!this.card) return;
    const doc = new jsPDF();
    this.addFonts(doc);
    const elementsToPrint: Array<string> = [
      'fname',
      'lname',
      'birthDate',
      'qtyOfCars',
    ];

    let i = 0;
    let offsetTop = 0;
    let gap = 8;
    for (let field of elementsToPrint) {
      i++;
      const elementRef = this.card[
        field as keyof UserCardComponent
      ] as ElementRef<HTMLElement>;
      console.log('getLineHeightFactor', doc.getLineHeightFactor());
      const el = elementRef.nativeElement;
      const bcr = el.getBoundingClientRect();
      const style = window.getComputedStyle(el, null);

      this.setFont(doc, style);

      this.setFontSize(doc, style);

      console.log(bcr);
      doc.text(
        `${elementRef.nativeElement.innerHTML}`,
        this.offsetLeft,
        bcr.height + offsetTop
      );
      offsetTop += bcr.height;
    }

    /* get Blob and open it in a new tab */
    const blob = doc.output('blob');
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, '_blank');
  }

  addFonts(jspdfDoc: jsPDF): void {
    jspdfDoc.addFont(
      '../../../assets/fonts/Roboto/Roboto-Regular.ttf',
      'Roboto',
      'normal'
    );
    jspdfDoc.addFont(
      '../../../assets/fonts/Roboto/Roboto-Medium.ttf',
      'Roboto',
      '500normal'
    );
  }

  setFont(jspdfDoc: jsPDF, style: CSSStyleDeclaration): void {
    let fontFamily = style.getPropertyValue('font-family');
    fontFamily = fontFamily.includes(',')
      ? fontFamily.split(',')[0]
      : fontFamily;
    const fontStyle = style.getPropertyValue('font-style');
    const fontWeight = style.getPropertyValue('font-weight');
    jspdfDoc.setFont(fontFamily, fontStyle, fontWeight);
  }

  setFontSize(jspdfDoc: jsPDF, style: CSSStyleDeclaration): void {
    const fontSize = style.getPropertyValue('font-size');
    jspdfDoc.setFontSize(parseFloat(fontSize));
  }

  onSelectButtonClick() {}
}
