import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "New League",
    description: "Create new league",
};

export default function GeneratorLayout({
                                            children,
                                        }: {
    children: React.ReactNode
}) {
    return <section>{children}</section>
}