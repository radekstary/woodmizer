import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {  ActivatedRoute, ParamMap } from '@angular/router';
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
  ptsPerIn: number = 72;
  pxPerIn: number = 96;
  constructor(
    private route: ActivatedRoute,
    private service: UsersService,
    public auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.user$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.service.getUser(params.get('id')!))
    );
  }

  cardToPdf(doc: jsPDF):void {
    const cardContent = this.card?.jsPdfContent?.nativeElement;
    if (!cardContent) return;
    const bcr = cardContent.getBoundingClientRect();
    doc.html(cardContent, {
      callback: function (doc) {
        /* get Blob and open it in a new tab */
        const blob = doc.output('blob');
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, '_blank');
      },
      x: 0,
      y: 0,
      html2canvas: {
        ignoreElements: (el) => el.classList.contains('pdf-ignore'),
      },
      width: this.pxToPt(bcr.width),
      windowWidth: this.pxToPt(bcr.width) * 2,
    });
  }

  generatePdf(): void {
    if (!this.card) return;
    const doc = new jsPDF();
    this.addFonts(doc);

    this.cardToPdf(doc);

    return;
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
    jspdfDoc.setFontSize(this.pxToPt(fontSize));
  }

  onSelectButtonClick() {}

  pxToPt(px: number | string): number {
    if (typeof px === 'string') px = parseFloat(px);
    return px * (this.ptsPerIn / this.pxPerIn);
  }
}
