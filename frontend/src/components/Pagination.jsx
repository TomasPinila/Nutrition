import React from "react";
import "../css/Pagination.css";

const Pagination = ({
    current_page,
    current_set_page,
    total_pages,
    setCurrentPage,
}) => {
    const pages_per_set = 5;
    const page1 = current_set_page * pages_per_set + 1;
    const page2 = page1 + 1;
    const page3 = page2 + 1;
    const page4 = page3 + 1;
    const page5 = page4 + 1;

    return (
        <div className="pagination">
            <div className="pagination-box">
                <button
                    className="b"
                    onClick={() => setCurrentPage(current_page - 1)}
                    disabled={current_page === 1}
                >
                    <i class="fa-solid fa-arrow-left"></i>
                </button>
                <button
                    className={page1 === current_page ? "curr" : "b"}
                    onClick={() => setCurrentPage(page1)}
                    disabled={page1 === current_page}
                >
                    {page1}
                </button>
                <button
                    className={page2 === current_page ? "curr" : "b"}
                    onClick={() => setCurrentPage(page2)}
                    disabled={page2 === current_page || page2 > total_pages}
                >
                    {page2}
                </button>
                <button
                    className={page3 === current_page ? "curr" : "b"}
                    onClick={() => setCurrentPage(page3)}
                    disabled={page3 === current_page || page3 > total_pages}
                >
                    {page3}
                </button>
                <button
                    className={page4 === current_page ? "curr" : "b"}
                    onClick={() => setCurrentPage(page4)}
                    disabled={page4 === current_page || page4 > total_pages}
                >
                    {page4}
                </button>
                <button
                    className={page5 === current_page ? "curr" : "b"}
                    onClick={() => setCurrentPage(page5)}
                    disabled={page5 === current_page || page5 > total_pages}
                >
                    {page5}
                </button>

                <button
                    className="b"
                    onClick={() => setCurrentPage(current_page + 1)}
                    disabled={current_page === total_pages}
                >
                    <i class="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </div>
    );
};

export default Pagination;
