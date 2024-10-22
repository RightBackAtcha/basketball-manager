import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Teams",
    description: "All generated teams",
};

export default function GeneratorLayout({
                                            children,
                                        }: {
    children: React.ReactNode
}) {
    return <section>{children}</section>
}