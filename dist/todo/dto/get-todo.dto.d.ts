export declare class GetTodosDto {
    search: string;
    order?: 'ASC' | 'DESC';
    status?: 'active' | 'inactive';
}
export declare class PaginationDto {
    page: number;
    pageSize: number;
}
