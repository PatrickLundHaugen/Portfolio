import { useState } from 'react';
import { TbExternalLink } from "react-icons/tb";
import {useTranslation} from "react-i18next";

const Tabs = () => {
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
            <h3 className="font-semibold">
                {t(`home.tabs.${tabKey}.${itemId}.title`)}
            </h3>
            <p className="text-sm text-muted-foreground">
                {t(`home.tabs.${tabKey}.${itemId}.description`)}
            </p>
            <ul className="list-disc ml-4 text-sm text-primary">
                {/* Dynamically render list items based on what exists in translation */}
                {[1, 2, 3].map(itemNum => {
                    const translationKey = `home.tabs.${tabKey}.${itemId}.list.item${itemNum}`;
                    const translation = t(translationKey);
                    // Only render if translation exists (doesn't return the key)
                    return translation !== translationKey ? (
                        <li key={itemNum}>{translation}</li>
                    ) : null;
                })}
            </ul>
            {/* Hardcode the specific button for education.1 */}
            {tabKey === 'education' && itemId === '1' && (
                <div>
                    <button
                        onClick={() => window.open("https://www.uio.no/studier/emner/matnat/ifi/IN1060/v23/prosjekter-var-2023/super-circut/")}
                        className="inline-flex items-center shadow border-transparent rounded-md py-1 px-3 text-xs font-semibold bg-primary cursor-pointer text-primary-foreground ml-1 transition-colors hover:bg-primary/90"
                    >
                        {t(`home.tabs.${tabKey}.${itemId}.project-link`)}
                        <TbExternalLink className="ml-1 size-3" />
                    </button>
                </div>
            )}
        </div>
    );

    const tabs = tabsConfig.map(({ key, items }) => ({
        label: t(`home.tabs.${key}.label`),
        content: (
            <div className="shadow border rounded-xl p-6 space-y-6">
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
                        className={`whitespace-nowrap px-3 py-1 rounded-sm text-sm font-medium cursor-pointer transition-colors ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                            selectedTab === index
                                ? 'shadow bg-background text-foreground'
                                : 'text-muted-foreground'
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

export default Tabs;