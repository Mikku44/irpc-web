'use client';

import { useState } from "react";
import { PaginationProps } from "antd";
import { Pagination } from "antd";
import { ArrowLeft, ArrowRight } from "lucide-react";

const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'prev') {
        return <a className="flex gap-2 items-center"><ArrowLeft /> Previous</a>;
    }
    if (type === 'next') {
        return <a className="flex gap-2 items-center">Next <ArrowRight /></a>;
    }
    return originalElement;
};

interface PaginationsProps {
    className?: string;
    classNames?: {
        items?: string;
    },
    emptyTxt?:string | React.ReactNode;
    items: any[];
    pageSize?: number;
    renderItem: (item: any) => React.ReactNode;
}

export default function Paginations({ className, classNames, items,emptyTxt, pageSize = 10, renderItem }: PaginationsProps) {
    const [currentPage, setCurrentPage] = useState(1);


    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedItems = items.slice(startIndex, endIndex);

    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className={`grid gap-2 `}>
            <div className={`${classNames?.items}`}>
                {items?.length > 0 ? paginatedItems.map((item, index) => (
                    <div key={index}>
                        {renderItem(item)}
                    </div>
                )) :
                    <div className="flex min-h-[50vh] justify-center items-center w-full">{emptyTxt}</div>
                }
            </div>

           {items?.length > 0 && <Pagination
                align="center"
                itemRender={itemRender}
                current={currentPage}
                total={items.length}
                pageSize={pageSize}
                onChange={onPageChange}
                className={className}
            />}
        </div>
    );
}
