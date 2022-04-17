import { MatPaginatorIntl } from "@angular/material/paginator";



export function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'Displaying Items';
  customPaginatorIntl.firstPageLabel = 'First';
  customPaginatorIntl.nextPageLabel = 'Next';
  customPaginatorIntl.previousPageLabel = 'Previous';
  customPaginatorIntl.lastPageLabel = 'Last';
  
  return customPaginatorIntl;
}