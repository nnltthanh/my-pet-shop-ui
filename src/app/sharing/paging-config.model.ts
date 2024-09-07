export interface PagingConfig {
  first: number, // index of first item to show
  rows: number, // number of row in page
  page: number, // index of page (start at 0)
  pageCount: number, // number of page
  totalRecords: number // total items

}