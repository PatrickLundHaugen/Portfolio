import { ReactNode } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface AccordionItemProps {
    title: string;
    year: string;
    content: ReactNode;
    isOpen: boolean;
    onClick: () => void;
}

export default function Accordion({ title, year, content, isOpen, onClick }: AccordionItemProps) {
    return (
        <div>
            <button
                className="group flex w-full items-center justify-between py-2 space-x-4 text-left font-medium transition-colors cursor-pointer"
                type="button"
                onClick={onClick}
            >
                <div className="flex flex-1 items-baseline justify-between">
                    <span className="text-lg font-semibold group-hover:underline">{title}</span>
                    <span className="text-sm text-neutral-400">{year}</span>
                </div>
                <IoIosArrowDown
                    className={`size-4 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : "rotate-0"
                    }`}
                />
            </button>
            <div
                className={`grid overflow-hidden ease-in-out transition-[grid-template-rows,opacity,margin] duration-200 ${
                    isOpen
                        ? "grid-rows-[1fr] opacity-100 my-4"
                        : "grid-rows-[0fr] opacity-0 mb-0"
                }`}
            >
                <div className="min-h-0 text-neutral-600">
                    {content}
                </div>
            </div>
        </div>
    );
};