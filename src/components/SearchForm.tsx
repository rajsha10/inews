import React from 'react';
import './searchForm.css';

interface SearchFormProps {
    active: boolean;
    formOpen: (e: React.MouseEvent<HTMLButtonElement>) => void; // Specify the function type
}

export default function SearchForm({ active, formOpen }: SearchFormProps) {
    return (
        <div className={`search-form-wrap js-search-form-wrap ${active ? 'active' : ''}`}>
            <form className="search-form" onSubmit={(e) => e.preventDefault()}> {/* Prevent default form submission */}
                <span className='icon bi-search'></span>
                <input type="text" placeholder='search' className='form-control' />
                <button className='btn js-search-close' onClick={formOpen} type="button"> {/* Add type="button" to prevent form submission */}
                    <span className='bi-x'></span>
                </button>
            </form>
        </div>
    );
}
