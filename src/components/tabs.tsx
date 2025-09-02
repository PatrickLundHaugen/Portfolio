import { useState } from 'react';
import { TbExternalLink } from "react-icons/tb";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";

export function Tabs() {
    const [selectedTab, setSelectedTab] = useState(0);
    const { t } = useTranslation();

    const tabsConfig = [
        {
            key: 'projects',
            items: ['1', '2', '3']
        },
        {
            key: 'education',
            items: ['1', '2']
        }
    ];

    const TabItem = ({ tabKey, itemId }: { tabKey: string; itemId: string }) => (
        <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">
                {t(`home.tabs.${tabKey}.${itemId}.date`)}
            </p>
            <h1 className="font-semibold">
                {t(`home.tabs.${tabKey}.${itemId}.title`)}
            </h1>
            <p className="text-sm text-muted-foreground">
                {t(`home.tabs.${tabKey}.${itemId}.description`)}
            </p>
            <ul className="list-disc ml-4 text-sm text-primary">
                {[1, 2, 3].map(itemNum => {
                    const translationKey = `home.tabs.${tabKey}.${itemId}.list.item${itemNum}`;
                    const translation = t(translationKey);
                    return translation !== translationKey ? (
                        <li key={itemNum}>{translation}</li>
                    ) : null;
                })}
            </ul>
            {tabKey === 'education' && itemId === '1' && (
                <div>
                    <Button
                        onClick={() => window.open("https://www.uio.no/studier/emner/matnat/ifi/IN1060/v23/prosjekter-var-2023/super-circut/")}
                        size="link"
                    >
                        {t(`home.tabs.${tabKey}.${itemId}.project-link`)}
                        <TbExternalLink className="size-3" />
                    </Button>
                </div>
            )}
        </div>
    );

    const tabs = tabsConfig.map(({ key, items }) => ({
        label: t(`home.tabs.${key}.label`),
        content: (
            <div className="shadow-sm border rounded-xl p-6 space-y-6">
                {items.map(itemId => (
                    <TabItem key={itemId} tabKey={key} itemId={itemId} />
                ))}
            </div>
        )
    }));

    return (
        <>
            <div className="grid grid-cols-2 items-center justify-center w-full rounded-lg bg-muted p-1 text-muted-foreground">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`whitespace-nowrap px-3 py-1 rounded-sm text-sm font-medium cursor-pointer ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                            selectedTab === index
                                ? 'shadow bg-background text-foreground'
                                : 'text-foreground'
                        }`}
                        onClick={() => setSelectedTab(index)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="mt-2">
                {tabs[selectedTab].content}
            </div>
        </>
    );
}
