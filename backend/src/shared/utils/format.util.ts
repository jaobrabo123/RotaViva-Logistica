import { PaginationQueryDTO } from "../dto/pagination-query.dto";
import { Pagination } from "./entities/pagination.entity";

/**
 * Formata os parâmetros de paginação a partir da query de consulta
 * @param query Query de consulta contendo os parâmetros de paginação
 * @returns Objeto com os parâmetros de paginação
 */
export function paginationByQuery(query: PaginationQueryDTO): Pagination {
    const { page, perPage } = query;

    return { take: perPage, skip: (page - 1) * perPage };
}
