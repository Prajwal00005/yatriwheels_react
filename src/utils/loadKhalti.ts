// import axios from "axios";


// // utils/loadKhalti.js
// export const loadKhaltiScript = () => {
//     return new Promise((resolve) => {
//         const script = document.createElement("script");
//         script.src = "https://khalti.com/static/khalti-checkout.js";
//         script.onload = () => resolve(true);
//         document.body.appendChild(script);
//     });
// };


// export function generateKhaltiConfig({ productName, identity }: { productName: string, identity: string }) {
//     return {
//         publicKey: "e41e4bd0e12e4f4d84e389dfe2d0c8e6", // Replace with your public key
//         productIdentity: identity,
//         productName: productName,
//         productUrl: "http://localhost:5713.com/product" + identity,
//         eventHandler: {
//             onSuccess(payload) {
//                 const response = axios.post("/cofirm-check")
//             },
//             onError(error) {
//                 console.error("Payment error:", error);
//             },
//             onClose() {
//                 console.log("Widget closed");
//             },
//         },
//         paymentPreference: ["KHALTI", "EBANKING", "MOBILE_BANKING", "CONNECT_IPS"],
//     };
// }

import axios from "axios"

// utils/loadKhalti.js or .ts

// Load Khalti checkout script
export const loadKhaltiScript = () => {
    return new Promise((resolve, reject) => {
        const existingScript = document.querySelector("script[src='https://khalti.com/static/khalti-checkout.js']");
        if (existingScript) return resolve(true);

        const script = document.createElement("script");
        script.src = "https://khalti.com/static/khalti-checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => reject("Khalti script failed to load");
        document.body.appendChild(script);
    });
};

// Generate the Khalti configuration
export function generateKhaltiConfig({
    productName,
    identity,
    amount, // amount in paisa
}: {
    productName: string;
    identity: string;
    amount: number;
}) {
    return {
        publicKey: "e41e4bd0e12e4f4d84e389dfe2d0c8e6", // ✅ Replace with a valid Khalti test/live public key from your dashboard
        productIdentity: identity,
        productName: productName,
        productUrl: `http://localhost:5713/product/${identity}`,
        eventHandler: {
            async onSuccess(payload: any) {
                console.log("Payment successful", payload);

                try {
                    // You can call your server to verify the transaction
                    const res = await axios.post("api/v1/confirm-check", {
                        token: payload.token,
                        amount: payload.amount,
                        productIdentity: identity,
                    });
                    console.log("Server verified:", res.data);
                } catch (error) {
                    console.error("Server error on payment confirm:", error);
                }
            },
            onError(error: any) {
                console.error("Payment error:", error);
            },
            onClose() {
                console.log("Khalti widget closed");
            },
        },
        paymentPreference: [
            "KHALTI",
            "EBANKING",
            "MOBILE_BANKING",
            "CONNECT_IPS",
            "SCT",
        ],
        amount: amount, // 👈 Add this to define the payment amount (in paisa)
    };
}
