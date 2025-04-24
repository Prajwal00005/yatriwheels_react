import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="flex justify-between items-center p-4 bg-white shadow">
            <span className="las la-bars text-2xl cursor-pointer"></span>
            <div className="header-icons flex gap-4 text-xl">
                <span className="las la-search"></span>
                <span className="las la-bookmark"></span>
                <span className="las la-sms"></span>
            </div>
        </header>
    );
};

export default Header;