import React, { useState, JSX } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button.tsx";

interface FormData {
    name: string;
    email: string;
    message: string;
}

export function Contact(): JSX.Element {
    const { t } = useTranslation();
    const [isOpen, setOpen] = useState(false);
    const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<string | null>(null);
    const [toast, setToast] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    function showToast(message: string, type: "success" | "error" = "success") {
        setToast(`${type}:${message}`);
        setTimeout(() => setToast(null), 5500);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("Sending...");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data: { message?: string } = await res.json();

            if (!res.ok) {
                const errorMsg = data.message || "Failed to send message";
                setStatus(`Error: ${errorMsg}`);
                showToast(errorMsg, "error");
                return;
            }

            setStatus(t("navbar.contact.toast"));
            showToast(t("navbar.contact.toast"), "success");

            setFormData({ name: "", email: "", message: "" });
            setOpen(false);
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : "An unexpected error occurred.";
            setStatus(`Error: ${errorMsg}`);
            showToast(errorMsg, "error");
        }
    };

    const handleClose = () => {
        setOpen(false);
        setFormData({ name: "", email: "", message: "" });
        setStatus(null);
    };

    return (
        <>
            {toast && (
                <div className="fixed top-5 left-1/2 -translate-x-1/2 w-full max-w-9/10 sm:max-w-sm bg-card border border-input rounded-md p-4 shadow-lg z-50">
                    <p className="text-sm leading-none">{toast}</p>
                </div>
            )}

            <Button
                onClick={() => setOpen(true)}
                variant="outline"
            >
                {t("navbar.contact.title")}
            </Button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={handleClose}
                    />
                    <div className="relative z-50 flex flex-col gap-4 bg-background w-full max-w-[calc(100%-2rem)] sm:max-w-lg rounded-lg border p-6 shadow-lg">
                        <div className="flex flex-col gap-2">
                            <h1 className="leading-none font-semibold">
                                {t("navbar.contact.title")}
                            </h1>
                            <p className="text-muted-foreground text-sm">
                                {t("navbar.contact.description")}
                            </p>
                        </div>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-sm font-medium select-none">
                                {t("navbar.contact.form.input1.label")}
                            </label>
                            <input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                type="text"
                                placeholder={t("navbar.contact.form.input1.placeholder")}
                                autoComplete="name"
                                required
                                className="placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 shadow-xs transition-all outline-none md:text-sm focus-visible:border-ring"
                            />
                            <label htmlFor="email" className="text-sm font-medium select-none">
                                {t("navbar.contact.form.input2.label")}
                            </label>
                            <input
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                type="email"
                                placeholder={t("navbar.contact.form.input2.placeholder")}
                                autoComplete="email"
                                required
                                className="placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 shadow-xs transition-all outline-none md:text-sm focus-visible:border-ring"
                            />
                            <label htmlFor="message" className="text-sm font-medium select-none">
                                {t("navbar.contact.form.input3.label")}
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder={t("navbar.contact.form.input3.placeholder")}
                                required
                                className="border-input placeholder:text-muted-foreground dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border resize-y bg-transparent px-3 py-2 shadow-xs transition-all outline-none md:text-sm focus-visible:border-ring"
                            />
                            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                                <Button
                                    type="button"
                                    onClick={handleClose}
                                    variant="secondary"
                                >
                                    {t("navbar.contact.button1")}
                                </Button>

                                <Button
                                    type="submit"
                                    disabled={status === 'Sending...'}
                                    aria-disabled={status === 'Sending...'}
                                    className={` ${
                                        status === 'Sending...' ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                >
                                    {status === 'Sending...' ? 'Sending...' : t('navbar.contact.button2')}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
