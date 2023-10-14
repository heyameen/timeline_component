
"use client"
import React, { useState } from 'react';

import styles from './page.module.css'
import Timeline from '@/components/Timeline/Timeline'
import TimelineBuilder from '@/components/TimelineBuilder/TimelineBuilder';
import "@/styles/index.scss"

export default function Home() {
  const [events, setEvents] = useState([
    { description: 'Event 1', completed: false },
    { description: 'Event 2', completed: false },
    { description: 'Event 3', completed: false },
    { description: 'Event 4cxcccx', completed: false },
    { description: 'Event 5', completed: false },
    { description: 'Event 6', completed: false },
  ]);

  const toggleEvent = (index: number) => {
    const newEvents = [...events];
    newEvents[index].completed = !newEvents[index].completed;
    setEvents(newEvents);
  };


  return (
    <main className={styles.main}>
      <Timeline events={events} toggleEvent={toggleEvent} />
      {/* <TimelineBuilder events={events} updateEvents={setEvents} /> */}
    </main>
  )
}
