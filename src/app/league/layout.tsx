import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "League",
    description: "All leagues",
};

export default function GeneratorLayout({
                                            children,
                                        }: {
    children: React.ReactNode
}) {
    return <section>{children}</section>
}