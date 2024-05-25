import { MatPaginatorIntl } from '@angular/material/paginator';

export function CustomPaginatorConfig() {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'Liczba rekordów na stronie:';
  customPaginatorIntl.lastPageLabel = 'Ostatnia strona';
  customPaginatorIntl.nextPageLabel = 'Następna strona';
  customPaginatorIntl.previousPageLabel = 'Poprzednia strona';
  customPaginatorIntl.firstPageLabel = 'Pierwsza strona';

  return customPaginatorIntl;
}
