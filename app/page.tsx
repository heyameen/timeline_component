
"use client"
import React, { useState, useEffect, } from 'react';

import styles from './page.module.css'
import Timeline from '@/components/Timeline/Timeline'
import "@/styles/index.scss"
import ColorPicker from '@/components/ColorPicker/ColorPicker';
import shouldDarken from '@/util/shouldDarken';
import { darkenColor, lightenColor } from '@/util/colorConversion';


interface Colors {
  '--background-modal-color': string;
  '--color-timeline-default': string;
  '--color-checkmark-completed': string;
  '--body-color': string;

  [key: string]: string;
}


export default function Home() {
  const [selectedColor, setSelectedColor] = useState('#1e1f22');
  const [events, setEvents] = useState([
    { name: 'Test Event 1', description: 'Event 1', completed: false },
    { name: 'Test Event 2', description: 'Event 2', completed: false },
    { name: 'Test Event 3', description: 'Event 3 ffdddddddd', completed: false },
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

  const getDerivedColors = (color: string) => {
    if (shouldDarken(color)) {
      return {
        '--background-modal-color': darkenColor(color, 10),
        '--body-color': darkenColor(color, 70),
        '--color-timeline-default': darkenColor(color, 50),
        '--color-checkmark-completed': color,
        '--color-event': color
      };
    } else {
      return {
        '--background-modal-color': lightenColor(color, 10),
        '--body-color': lightenColor(color, 90),
        '--color-timeline-default': lightenColor(color, 30),
        '--color-checkmark-completed': color,
        '--color-event': color
      };
    }
  };

  useEffect(() => {
    const derivedColors: Colors = getDerivedColors(selectedColor);
    for (let key in derivedColors) {
      document.documentElement.style.setProperty(key, derivedColors[key]);
    }
  }, [selectedColor]);


  return (
    <main className={styles.main}>
      <ColorPicker setSelectedColor={setSelectedColor} selectedColor={selectedColor} />
      <Timeline events={events} toggleEvent={toggleEvent} changeEventDescription={changeEventDescription} setEvents={setEvents} />
    </main>
  )
}
