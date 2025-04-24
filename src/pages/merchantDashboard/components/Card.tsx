import React from 'react';

interface CardProps {
    title: string;
    subtitle: string;
    value: string;
    growth: string;
    icon: string;
    chartClass: string;
}

const Card: React.FC<CardProps> = ({ title, subtitle, value, growth, icon, chartClass }) => {
    return (
        <div className="p-4 flex items-center p-4 bg-white rounded-lg shadow">
            <div className="card-info flex-1">
                <div className="card-head">
                    <span className="text-lg font-semibold">{title}</span>
                    <small className="text-gray-500">{subtitle}</small>
                </div>
                <h2 className="text-2xl font-bold">{value}</h2>
                <small className="text-gray-500">{growth}</small>
            </div>
            <div className={`card-chart ${chartClass} text-3xl p-4 rounded-full`}>
                <span className={icon}></span>
            </div>
        </div>
    );
};

export default Card;