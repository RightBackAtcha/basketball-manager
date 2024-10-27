import styles from "./TeamComboBox.module.css";

import React, { useState } from "react";
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react";

import { Team } from "@/utils/teams/TeamTypes";

interface TeamComboBoxProps {
    label?: string;
    description?: string | null;
    items: Team[];
    onSelectionChange: (item: Team | null) => void;
}

export default function TeamComboBox(props:     TeamComboBoxProps) {
    // State management
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
    const [query, setQuery] = useState("");

    const filteredItems = query === ''
        ? props.items
        : props.items.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.region.toLowerCase().includes(query.toLowerCase())
        );

    return (
        <div className="relative">
            <Combobox
                value={selectedTeam}
                onChange={(item) => {
                    setSelectedTeam(item);
                    props.onSelectionChange(item);
                    setQuery(''); // Clear input after selection
                }}
            >
                <ComboboxInput
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={(item: Team | null) => item ? `${item.region} ${item.name}` : ''}
                    placeholder="Select a team..."
                    className={styles.comboboxinput}
                />
                <ComboboxButton className={styles.comboboxbutton}>
                    ▼
                </ComboboxButton>
                <ComboboxOptions className={styles.comboboxoptions}>
                    {filteredItems.length === 0 && query !== '' ? (
                        <ComboboxOption value={null} disabled className={styles.comboboxoption}>
                            No results found.
                        </ComboboxOption>
                    ) : (
                        filteredItems.map((item) => (
                            <ComboboxOption key={item.tID} value={item} className={styles.comboboxoption}>
                                {item.region} {item.name}
                            </ComboboxOption>
                        ))
                    )}
                </ComboboxOptions>
            </Combobox>
        </div>
    );
}