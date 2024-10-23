'use client';

import { Table } from 'react-aria-components';
import { useListData } from "@react-stately/data";
import {Cell, Column, Row, TableBody, TableHeader} from "@react-stately/table";

import { openMetadata } from "@/utils/db";
import { Metadata } from "@/utils/league/LeagueTypes";
import React from "react";

// Display all league files, retrieved from metadata
export default function DisplayLeagues() {
    // State for metadata values
    // const dbMetadata = openMetadata();

    // const metadata = useLiveQuery(() => dbMetadata.metadata.toArray());
    const metadata: Metadata[] = [
        {name: "League 1", mID: 0, tID: 1, startingSeason: "2024", season: "2024"},
        {name: "League 2", mID: 1, tID: 1, startingSeason: "2024", season: "2024"},
        {name: "League 3", mID: 2, tID: 1, startingSeason: "2024", season: "2024"},
        {name: "League 4", mID: 3, tID: 1, startingSeason: "2024", season: "2024"},
        {name: "League 5", mID: 4, tID: 1, startingSeason: "2024", season: "2024"}
    ];

    let item = metadata[0];

    return (
        <Table>
            <TableHeader>
                <Column isRowHeader={true}>Name</Column>
                <Column>Team</Column>
                <Column>Starting Season</Column>
                <Column>Current Season</Column>
            </TableHeader>
            <TableBody>
                <Row>
                    <Cell>{item.name}</Cell>
                    <Cell>{item.tID}</Cell>
                    <Cell>{item.startingSeason}</Cell>
                    <Cell>{item.season}</Cell>
                </Row>
            </TableBody>
        </Table>
    );
}