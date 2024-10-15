import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Create a Player",
    description: "Create a player, randomly selects country and name",
};

export default function GeneratorLayout({
                                            children,
                                        }: {
    children: React.ReactNode
    }) {
    return <section>{children}</section>
}