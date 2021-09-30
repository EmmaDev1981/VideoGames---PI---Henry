import React, {} from 'react'
import './pagination.css'


export default function Pagination({ cardPerPage, totalCards, paginate, currentPage }) {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalCards / cardPerPage ); i++){
        pageNumbers.push(i);
    }
    return (
        <div className="pag-div">
            <ul>
                {pageNumbers && pageNumbers.map((p, i) => 
                p === currentPage ? <li key={i}><button  className="pag-btn" onClick={() => paginate(p)}>{p}</button></li> : <li key={i}><button className="pag-btn" onClick={() => paginate(p)}>{p}</button></li>)}
            </ul>
        </div>
    )
}