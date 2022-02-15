import React, { useEffect, useState } from 'react'
import dropin from "braintree-web-drop-in"
import { Button } from "reactstrap";
import styles from "../styles/checkout.module.css"

export default function BraintreeDropIn(props) {
   const { show, onPaymentCompleted } = props;

   const [braintreeInstance, setBraintreeInstance] = useState(undefined)

   useEffect(() => {
      if (show) {
         const initializeBraintree = () => dropin.create({
            authorization: "sandbox_q78vr59q_7bkbg65vqmz8rkj7",
            container: '#braintree-drop-in-div',
            
         }, (error, instance) => {
            if (error)
               console.error(error)
            else
               setBraintreeInstance(instance);

            instance.requestPaymentMethod({
               
            })
         });

         if (braintreeInstance) {
            braintreeInstance
               .teardown()
               .then(() => {
                  initializeBraintree();
               });
         } else {
            initializeBraintree();
            checkOuterContainer.style.opacity = "1";
            checkOuterContainer.style.zIndex = "6";
         }
      }
   }, [show])

   return (
      <div className={styles.checkOuterContainer} id="checkOuterContainer">
         <div id={"braintree-drop-in-div"} className={styles.brainTree}/>
         <Button
            className={styles.braintreePayButton}
            type="primary"
            disabled={!braintreeInstance}
            onClick={() => {
               if (braintreeInstance) {
                  braintreeInstance.requestPaymentMethod(
                     (error, payload) => {
                        if (error) return console.error(error);

                        const paymentMethodNonce = payload.nonce;
                        onPaymentCompleted();
                     });
               }
            }}
         >
            {
               "Pay"
            }
         </Button>
      </div>
   )
}