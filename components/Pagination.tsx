interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    page,
    totalPages,
    onPageChange,
}: PaginationProps) {
    return (
        <div className="mt-4 flex justify-center">
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 bg-primary text-white rounded-xl disabled:bg-gray-300 active:translate-y-1 duration-50 shadow-xl"
            >
                Previous
            </button>
            <span className="px-4 py-2">
                Page {page} of {totalPages}
            </span>
            <button
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 bg-primary text-white rounded-xl disabled:bg-gray-300 active:translate-y-1 duration-50 shadow-xl"
            >
                Next
            </button>
        </div>
    );
}
