"use client"
import React, { useState, useEffect, useRef } from 'react';
import styles from './Timeline.module.scss';
import Input from '../Input/Input';
import InlineEdit from './../InlineEdit/InlineEdit';
import { CiSettings } from 'react-icons/ci';
import { FiEdit } from 'react-icons/fi';
import { GoTrash } from 'react-icons/go';
import { IoMdAdd } from 'react-icons/io';
import Modal from '../Modal/Modal';

interface Event {
    name: string;
    description: string;
    completed: boolean;
}

interface TimelineProps {
    events: Event[];
    toggleEvent: (index: number) => void;
    changeEventDescription: (desc: string, index: number) => void;
    setEvents: React.Dispatch<React.SetStateAction<Event[]>>
}


const Timeline: React.FC<TimelineProps> = ({ events, toggleEvent, changeEventDescription, setEvents }) => {
    const [editing, setIsEditing] = useState(false)
    const [eventIndex, setEventIndex] = useState<number | null>(null)
    const [popover, setIsPopover] = useState(false)
    const [modal, setIsModal] = useState(false)
    const divRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);


    const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        toggleEvent(index)
    }

    const onSave = () => {
        setIsEditing(false)
    }

    const onSettingsClick = (index: number) => {
        setEventIndex(index)
        setIsPopover(true)
    }

    const closePopup = (index: number) => {
        setIsPopover(false);
        setIsModal(!modal)
    }


    const addEvent = () => {
        const newEvents = [...events];
        newEvents.push({ name: 'Test Event Default', description: 'Event Default', completed: false },)
        setEvents(newEvents);
    }

    const onDeleteEvent = () => {
        const newEvents = [...events];
        const filteredEvents = newEvents.filter((e, i) => i !== eventIndex)
        setEvents(filteredEvents);
        setIsModal(!modal)
    }    

    const toggleModal = () => {
        setIsModal(!modal)
    }

    const onEdit = () => {
        setIsEditing(true)
        setIsPopover(false)
    }

    const cancelEdit = () => {
        setIsEditing(false);
    }

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (divRef.current && !divRef.current.contains(event.target)) {
                setIsPopover(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


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
                                                <>
                                                    <div className={
                                                        event.description.length > 61 ? `${styles.label} ${styles.labelLarge}` :
                                                            event.description.length > 22 ? `${styles.label} ${styles.labelMedium}` : `${styles.label}`}
                                                    >
                                                        <div className={styles.content}>
                                                            <CiSettings size={16} className={styles.contentIcon} onClick={() => onSettingsClick(index)} />
                                                        </div>
                                                        {event.description}
                                                    </div>
                                                </>
                                            )
                                    }
                                    {
                                        eventIndex == index && popover ? (
                                            <div className={styles.popover}>
                                                <div className={styles.popoverIcon} ref={divRef}>
                                                    <p>Manage Event </p>
                                                    <FiEdit size={17} className={`${styles.editIcons} ${styles.edit}`} onClick={onEdit} />
                                                    <GoTrash size={17} className={`${styles.editIcons} ${styles.delete}`} onClick={closePopup} />
                                                </div>
                                            </div>
                                        ) : null
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
                        <button className={`${styles.button} ${styles.edit}`} onClick={onSave}>
                            save
                        </button>
                        <button className={`${styles.button} ${styles.edit}`} onClick={cancelEdit}>
                            cancel
                        </button>
                    </div>
                ) : (
                    <div className={styles.buttonContainer}>
                        <button className={`${styles.button} ${styles.edit}`} onClick={addEvent}>
                            <IoMdAdd size={20} className={styles.icon} />
                            <p>add event</p>
                        </button>
                    </div>
                )
            }
            {
                modal && <Modal
                    content={
                        <>
                            <b>Remove Event</b>
                            <p style={{ margin: "10px 0px" }}>
                                Are you sure you want to delete this event?
                            </p>
                            <button style={{ marginRight: '10px', display: 'inline' }} className={styles.button} onClick={toggleModal}>Cancel</button>
                            <button className={`${styles.button} ${styles.delete}`} onClick={onDeleteEvent}>Delete</button>
                        </>
                    }
                    toggleModal={toggleModal}
                />

            }

        </div >
    );
};

export default Timeline;
