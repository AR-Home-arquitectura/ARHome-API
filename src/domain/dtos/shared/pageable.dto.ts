export class PageableDto<T> {
  constructor(
    public page: number,
    public limit: number,
    public total: number,
    public next: string,
    public prev: string | null,
    public data: T
  ) {}
}
