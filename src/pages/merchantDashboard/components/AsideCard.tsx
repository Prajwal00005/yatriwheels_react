import React from 'react';

interface AsideCardProps {
    title: string;
    description: string;
    icon: string;
}

const AsideCard: React.FC<AsideCardProps> = ({ title, description, icon }) => {
    return (
        <div className="aside-card p-4 bg-white rounded-lg shadow mb-4">
            <div className="flex items-center gap-3">
                <span className={`text-3xl ${icon}`}></span>
                <div>
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="text-sm text-gray-500">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default AsideCard;