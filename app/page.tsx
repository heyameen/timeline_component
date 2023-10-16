
"use client"
import React, { useState } from 'react';

import styles from './page.module.css'
import Timeline from '@/components/Timeline/Timeline'
import "@/styles/index.scss"


export default function Home() {
  const [events, setEvents] = useState([
    { name:'Test Event 1', description: 'Event 1', completed: false },
    { name: 'Test Event 2', description: 'Event 2', completed: false },
    { name: 'Test Event 3', description: 'Event 3 ffdddddddd dddddddddddd dddddddddd sddffff', completed: false },
    { name: 'Test Event 4', description: 'Event 4cxcccx', completed: false },
    { name: 'Test Event 5', description: 'Event 5', completed: false },
    { name: 'Test Event 6', description: 'Event 6', completed: false },
  ]);

  const toggleEvent = (index: number) => {
    const newEvents = [...events];
    newEvents[index].completed = !newEvents[index].completed;
    setEvents(newEvents);
  };

  const changeEventDescription = (description: string, index: number) => {
    const newEvents = [...events];
    newEvents[index].description = description;
    setEvents(newEvents);
  }
  
  

  return (
    <main className={styles.main}>
          <Timeline events={events} toggleEvent={toggleEvent} changeEventDescription={changeEventDescription} setEvents={setEvents}/>
    </main>
  )
}
