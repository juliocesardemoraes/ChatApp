import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import io from "Socket.IO-client";
let socket;
/**
 * This returns the main component
 * @return {JSX.Element}: The Jsx element for the home page
 */
export default function Home() {
  const [input, setInput] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  useEffect(() => {
    const socketInitializer = async () => {
      await fetch("/api/socket");
      socket = io();

      socket.on("connect", () => {
        console.log("connected");
      });

      socket.on("update-input", (msg) => {
        setMessageReceived(msg);
      });
    };
    socketInitializer();
  }, []);

  const onClickSocket = (e) => {
    // setInput(e.target.value);
    // socket.emit("input-change", e.target.value);
    socket.emit("input-change", input);
  };

  useEffect(() => {
    console.log(input);
  }, [input]);

  return (
    <>
      <input
        placeholder="Type something"
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <button onClick={onClickSocket}>Send Message</button>
      <h1>Received Message: {messageReceived} </h1>
    </>
  );
}
