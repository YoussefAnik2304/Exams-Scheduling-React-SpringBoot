import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import {GeneratePaginationLinks} from "@/components/GeneratePaginationLinks.tsx";


type PaginatorProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
    showPreviousNext: boolean;
}

export default function Paginator({currentPage, totalPages, onPageChange, showPreviousNext,}: PaginatorProps) {

    return (
        <Pagination>
            <PaginationContent>
                {showPreviousNext && totalPages ? (
                    <PaginationItem>
                        <PaginationPrevious
                            aria-disabled={currentPage - 1 < 1}
                            onClick={() => onPageChange(currentPage - 1)}
                            tabIndex={currentPage <= 1 ? -1 : undefined}
                            className={
                                currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
                            }
                        />
                    </PaginationItem>
                ) : null}
                {GeneratePaginationLinks(currentPage, totalPages, onPageChange)}
                {showPreviousNext && totalPages ? (
                    <PaginationItem>
                        <PaginationNext
                            aria-disabled={currentPage >= totalPages}
                            onClick={() => onPageChange(currentPage + 1)}
                            tabIndex={currentPage >= totalPages ? -1 : undefined}
                            className={
                                currentPage >= totalPages ? "pointer-events-none opacity-50" : undefined
                            }
                        />
                    </PaginationItem>
                ): null}
            </PaginationContent>
        </Pagination>
    )
}