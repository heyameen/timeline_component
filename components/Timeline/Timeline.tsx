import React, { useState } from 'react';
import styles from './Timeline.module.scss';
import InlineEditStyles from '../InlineEdit/InlineEdit.module.scss';
import Input from '../Input/Input';
import InlineEdit from './../InlineEdit/InlineEdit';

interface Event {
    name: string;
    description: string;
    completed: boolean;
}

interface TimelineProps {
    events: Event[];
    toggleEvent: (index: number) => void;
    changeEventDescription: (desc: string, index: number) => void;
}


const Timeline: React.FC<TimelineProps> = ({ events, toggleEvent, changeEventDescription }) => {
    // const [eventValue, setEventValue] = useState<string, index>()
    console.log('Event 3 ffdddddddd dddddddddddd dddddddddd sddffff ddddddddd dddd ddffd fffg'.length)
    const [editing, setIsEditing] = useState(false)
    const [eventIndex, setEventIndex] = useState<number | null>(null)

    const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        toggleEvent(index)
    }

    const onSave = () => {
        setIsEditing(false)
    }

    const makeEditable = (index: number) => {
        setEventIndex(index)
        setIsEditing(true)
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
                                        <Input
                                            type="checkbox"
                                            onChange={e => onCheckboxChange(e, index)}
                                            className={styles.input}
                                        />
                                        <span className={styles.checkmark}></span>
                                    </label>
                                    {
                                        eventIndex == index && editing ? (
                                            <InlineEdit
                                                index={index}
                                                value={event.description}
                                                setValue={changeEventDescription}
                                                eventName={event.name}
                                                className={styles.textInput}
                                            />
                                        )
                                            : (
                                                <div className={
                                                    event.description.length > 61 ? `${styles.label} ${styles.labelLarge}` :
                                                    event.description.length > 20 ? `${styles.label} ${styles.labelMedium}` : `${styles.label}`}
                                                    onClick={() => makeEditable(index)}
                                                >
                                                    {event.description}
                                                </div>
                                            )
                                    }

                                </div>
                                <div className={`${styles.line} ${event.completed ? styles.completed : ''}`} />
                            </div>
                        ))
                    }
                </div>
            </div>
            {
                editing ? (
                    <div className={styles.buttonContainer}>
                        <button className={styles.button} onClick={onSave}>save</button>
                    </div>
                ) : null
            }

        </div >
    );
};

export default Timeline;
