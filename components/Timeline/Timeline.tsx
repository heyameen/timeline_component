import React from 'react';
import styles from './Timeline.module.scss';
import Input from '../Input/Input';

interface Event {
    description: string;
    completed: boolean;
}

interface TimelineProps {
    events: Event[];
    toggleEvent: (index: number) => void;
}

const Timeline: React.FC<TimelineProps> = ({ events, toggleEvent }) => {
    const onInputChange = (e) => {
        console.log(e.target.checked)
    }

    return (
        <div className={styles.container}>
            <div className={styles.timelineContainer} >
                <div className={styles.events}>
                    {
                        events.map((event, index) => (
                            <div className={styles.eventItem} key={index}>
                                <div>
                                    <label className={styles.checkboxContainer}>
                                        <Input type="checkbox" onChange={onInputChange} className={styles.input} />
                                        <span className={styles.checkmark}></span>
                                    </label>
                                    <div className={styles.label}>{event.description}</div>
                                </div>
                                <div className={styles.line} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>

    );
};

export default Timeline;
