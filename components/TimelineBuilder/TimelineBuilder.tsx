"use client"

import React, { useState } from 'react';
import styles from './TimelineBuilder.module.css';

interface Event {
    description: string;
    completed: boolean;
}

interface TimelineBuilderProps {
    events: Event[];
    updateEvents: (events: Event[]) => void;
}

const TimelineBuilder: React.FC<TimelineBuilderProps> = ({ events, updateEvents }) => {
    const [currentEvent, setCurrentEvent] = useState('');

    const addEvent = () => {
        updateEvents([...events, { description: currentEvent, completed: false }]);
        setCurrentEvent('');
    };

    return (
        <div className={styles.builder}>
            <input
                type="text"
                value={currentEvent}
                onChange={(e) => setCurrentEvent(e.target.value)}
                placeholder="Add event description..."
            />
            <button onClick={addEvent}>Add Event</button>
        </div>
    );
};

export default TimelineBuilder;
