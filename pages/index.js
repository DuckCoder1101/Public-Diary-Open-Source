import Head from 'next/head'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import styles from '../styles/Home.module.css'
import { auth, get, set } from '@upstash/redis'
import Footer from "../components/footer.js"

auth("https://gusc1-literate-polecat-31310.upstash.io", "AXpOASQgYTA2Y2Q5NTYtYWFjMy00ZDU4LTlkYmUtYmVhNGQwNDUwMjkyNjE4OTBmOTk3NGM2NDMyNjk5MGZjNmVhOGQ3NzQ1NmU=");

export default function Home() {

   let date = new Date();
   let year = date.getFullYear();
   let month = date.getMonth();
   let day = date.getDate();
   let hour = date.getHours();
   let minute = date.getMinutes();

   // All text that was wrote 
   const [state, setState] = useState("");

   // Send the public text
   global.send_public = () => {
      let input = text_input;

      if (!input.value || input.value.length === 0) return;

      if (state.length <= 0) return;

      setState(state += `\n ${day}/${month}/${year} às ${hour}:${minute}: ${input.value}`);
      set("public_diary/global_text", state).catch(err => alert(err));

      public_text.innerHTML = state;

      input.value = "";
      resize();
   };

   // Resize the input
   const resize = () => {
      let input = text_input;

      input.style.height = 'auto';
      input.style.height = input.scrollHeight + 'px';
   };

   useEffect(() => {
      // Get the public text

      if (state.length > 0) return;

      get("public_diary/global_text").then(response => {
         global.width = window.innerWidth;
         global.height = window.innerHeight;

         if (!response.data || response.data.length === 0) return (
            setState("First Message."),
            public_text.innerHTML = "First Message."
         );

         setState(response.data);
         public_text.innerHTML = response.data;
      }, err => console.log(err));
   });

   if (global.width > 600) {

      return (
         <div className={styles.container}>
            <Head>
               <title>Public Diary</title>
               <meta charSet="utf-8" />
               <mata name="viewport" content="width=device-width, initial-scale=0.1" />
            </Head>

            <main>
               <div className={styles.input_area}>
                  <textarea id="text_input" className={styles.textarea} placeholder="Your Text" onKeyUp={resize} />
                  <button className={styles.sendButton} onClick={global.send_public}>Send</button>
               </div>

               <pre id="public_text" className={styles.public_text}></pre>
            </main>

            <Footer />
         </div>
      )
   }

   else if (global.width < 600) {

      return (
         <div className={styles.container}>
            <Head>
               <title>Public Diary</title>
               <meta charSet="utf-8" />
               <mata name="viewport" content="width=device-width, initial-scale=0.1" />
            </Head>

            <main>
               <div className={styles.input_area_mobile}>
                  <textarea id="text_input" className={styles.textarea_mobile} placeholder="Your Text" onKeyUp={resize} />
                  <button className={styles.sendButton_mobile} onClick={global.send_text}>Send</button>
               </div>

               <pre id="public_text" className={styles.public_text_mobile}></pre>
            </main>

            <Footer />
         </div>
      )
   }

   else {
      return (
         <div className={styles.container}>
            <Head>
               <title>Public Diary</title>
               <meta charSet="utf-8" />
               <mata name="viewport" content="width=device-width, initial-scale=0.1" />
            </Head>
         </div>
      )
   }
}