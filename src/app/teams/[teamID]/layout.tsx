import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Roster",
    description: "",
};

export default function GeneratorLayout({
                                            children,
                                        }: {
    children: React.ReactNode
}) {
    return <section>{children}</section>
}