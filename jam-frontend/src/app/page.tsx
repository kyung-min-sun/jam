"use client"; // This is a client component 👈🏽
import { useState } from 'react';
import * as Tone from 'tone'

interface Note {
  note: string;
  time: number;
  duration: number;
}

function NoteButton({note, socket}: {note: string, socket: WebSocket}) {
  return <button
    onClick={() => {
      socket.send(JSON.stringify({
        note: note,
        time: new Date().getTime(),
        duration: 1,
      }));
    }}
    >
    {note}
  </button>
}

export default function Home() {  
  const ws = new WebSocket('ws://localhost:8000');
  ws.onopen = () => {
    console.log('connected');
  }

  ws.onmessage = evt => {
    const message = JSON.parse(evt.data) as Note;
    Tone.start().then(() => {
      new Tone.Synth().toDestination().triggerAttackRelease(
        `${message.note}4`.toUpperCase(),
        "8n",
      );
    });
    // console.log(message);
  }

  ws.onclose = () => {
    console.log('disconnected');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <NoteButton note={"c"} socket={ws} />
      <NoteButton note={"b"} socket={ws} />
      <NoteButton note={"a"} socket={ws} />
      <NoteButton note={"f"} socket={ws} />
      <NoteButton note={"e"} socket={ws} />
      <NoteButton note={"d"} socket={ws} />
      <NoteButton note={"c"} socket={ws} />
    </main>
  )
}
