export class Pagination<T> {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
    hasPrevious: boolean;
    hasNext: boolean;
    items: T[];

    constructor(
      currentPage: number,
      totalPages: number,
      pageSize: number,
      totalCount: number,
      hasPrevious: boolean,
      hasNext: boolean,
      items: T[]
    ) {
      this.currentPage = currentPage;
      this.totalPages = totalPages;
      this.pageSize = pageSize;
      this.totalCount = totalCount;
      this.hasPrevious = hasPrevious;
      this.hasNext = hasNext;
      this.items = items;
    }
  }
