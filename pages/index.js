import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import BrainTree from "../components/brainTree.js"
import { auth, get, set } from '@upstash/redis'
import axios from "axios"

auth("secret ;)", "secret too :)");

export default function Home() {

   // BrainTree
   const [showBraintreeDropIn, setShowBraintreeDropIn] = useState(false);

   // If the user both the private text
   var verify_buy = false;

   // All text that was wrote 
   const [state, setState] = useState("");
   const [privateState, setPrivateState] = useState("");

   // user IP
   const [ip, setIP] = useState("");

   // Function to send the input to the text 
   const send_text = () => {
      let input = text_input;

      if (!input.value || input.value.length === 0) return;

      global.setStateData(input.value);

      input.value = "";

      resize();

      public_text.innerHTML = state;
   };

   const send_pivate = () => {
      let input = text_input;

      if (verify_buy) {
         if (!input.value || input.value.length === 0) return;

         global.setStatePrivateDate(input.value);

         resize();

         private_text.innerHTML = state;
      }

      else {
         setShowBraintreeDropIn(true);
      }
   };

   // Get the user's IP address
   const getUserIP = () => {
      axios.get('http://ip-api.com/json/').then(res => {
         setIP(res.data.query);
      }, err => alert(err));
   };

   useEffect(() => {

      // Get the IP address
      getUserIP();

      get("public_diary/global_text").then(response => {
         if (!response.data) return set("public_diary/global_text", "");

         setState(response.data);
         public_text.innerHTML = response.data;
      }, err => console.log(err));

      global.setStateData = value => {
         let date = new Date();
         let year = date.getFullYear();
         let month = date.getMonth();
         let day = date.getDate();
         let hour = date.getHours();
         let minute = date.getMinutes();

         if (ip == "secret too ._.") return (
            setState(state += `\n ${day}/${month}/${year} às ${hour}:${minute}: ${value} 👑`),
            set("public_diary/global_text", state).catch(err => alert(err))
         );

         setState(state += `\n ${day}/${month}/${year} às ${hour}:${minute}: ${value}`);
         set("public_diary/global_text", state).catch(err => alert(err));
      }

      get(`public_diary/private/${ip}`).then(response => {
         if (!response.data) return;

         verify_buy = true;
         setPrivateState(response.data);
      }, err => console.log(err));

      global.setStatePrivateDate = value => {
         let date = new Date();
         let year = date.getFullYear();
         let month = date.getMonth();
         let day = date.getDate();
         let hour = date.getHours();
         let minute = date.getMinutes();

         setPrivateState(state += `\n ${day}/${month}/${year} às ${hour}:${minute}: ${value}`);
         set("public_diary/private/${ip}", privateState).catch(err => alert(err));
      };
   });

   // Resize the input
   const resize = () => {
      let input = text_input;

      input.style.height = 'auto';
      input.style.height = input.scrollHeight + 'px';
   };

   // Change the talk
   const changeTalk = () => {
      if (public_text.style.opacity == "0") {

         private_text.style.opacity = "0";
         private_text.style.zIndex = "-5";

         public_text.style.opacity = "1";
         public_text.style.zIndex = "0";

         setTalk.innerHTML = "Show Private";
      }

      else {
         private_text.style.opacity = "1";
         private_text.style.zIndex = "0";

         public_text.style.opacity = "0";
         public_text.style.zIndex = "-5"

         setTalk.innerHTML = "Show Public";
      }
   };

   useEffect(() => {
      global.width = window.innerWidth;
      global.height = window.innerHeight;
   });

   if (global.width > 600) {
      return (
         <div className={styles.container}>
            <Head>
               <title>Public Diary</title>
               <meta charSet="utf-8" />
               <mata name="viewport" content="width=device-width, initial-scale=0.1" />
            </Head>
            <button id="setTalk" className={styles.setTalk} onClick={changeTalk}>Show Private</button>
            <div className={styles.input_area}>
               <textarea id="text_input" className={styles.textarea} placeholder="Your Text" onKeyUp={resize} />
               <button className={styles.sendButton} onClick={send_text}>Send</button>
               <button className={styles.sendPrivateButton} onClick={send_pivate}>Send Private</button>
            </div>
            <pre id="public_text" className={styles.public_text}></pre>
            <pre id="private_text" className={styles.private_text}></pre>

            <BrainTree
               show={showBraintreeDropIn}
               onPaymentCompleted={() => {
                  setShowBraintreeDropIn(false);
               }}
            />
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

            <div className={styles.input_area_mobile}>
               <textarea id="text_input" className={styles.textarea_mobile} placeholder="Your Text" onKeyUp={resize} />
               <button className={styles.sendButton_mobile} onClick={send_text}>Send</button>
            </div>
            <pre id="public_text" className={styles.public_text_mobile}></pre>
            <pre id="private_text" className={styles.private_text_mobile}></pre>
            <BrainTree
               show={showBraintreeDropIn}
               onPaymentCompleted={() => {
                  setShowBraintreeDropIn(false);
               }}
            />
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
