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
//                 const response = axios.post("/cofirm-check", payload)
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


// export const loadKhaltiScript = (): Promise<void> => {
//     return new Promise((resolve, reject) => {
//         const scriptUrl = 'https://khalti.s3.ap-south-1.amazonaws.com/KhaltiCheckout.min.js';
//         const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);
//         if (existingScript) {
//             console.log('Khalti script already loaded'); // Debug
//             return resolve();
//         }

//         const script = document.createElement('script');
//         script.src = scriptUrl;
//         script.async = true;
//         script.onload = () => {
//             console.log('Khalti script loaded successfully'); // Debug
//             resolve();
//         };
//         script.onerror = () => {
//             console.error('Failed to load Khalti script');
//             reject(new Error('Khalti script failed to load'));
//         };
//         document.body.appendChild(script);
//     });
// };

// // Khalti configuration interface
// interface KhaltiConfigParams {
//     productName: string;
//     productIdentity: string;
//     amount: number;
// }

// interface KhaltiConfig {
//     publicKey: string;
//     productIdentity: string;
//     productName: string;
//     productUrl: string;
//     amount: number;
//     eventHandler: {
//         onSuccess: (payload: any) => void;
//         onError: (error: any) => void;
//         onClose: () => void;
//     };
//     paymentPreference: string[];
// }

// // Generate the Khalti configuration
// export function generateKhaltiConfig({ productName, productIdentity, amount }: KhaltiConfigParams): KhaltiConfig {
//     const publicKey = "e41e4bd0e12e4f4d84e389dfe2d0c8e6";
//     console.log('Khalti Public Key:', publicKey ? publicKey.slice(0, 15) + '...' : 'undefined'); // Debug
//     console.log('Khalti Config Inputs:', { productName, productIdentity, amount }); // Debug

//     // Validate inputs
//     if (!publicKey || typeof publicKey !== 'string') {
//         throw new Error('Invalid public key. Please set REACT_APP_KHALTI_PUBLIC_KEY in .env');
//     }
//     if (!productName || typeof productName !== 'string' || productName.trim() === '') {
//         throw new Error('Invalid productName: must be a non-empty string');
//     }
//     if (!productIdentity || typeof productIdentity !== 'string' || productIdentity.trim() === '') {
//         throw new Error('Invalid productIdentity: must be a non-empty string');
//     }
//     if (!amount || typeof amount !== 'number' || amount < 1000) {
//         throw new Error('Invalid amount: must be a number >= 1000 paisa (NPR 10)');
//     }

//     const config: KhaltiConfig = {
//         publicKey,
//         productIdentity,
//         productName,
//         productUrl: `http://localhost:3000/product/${productIdentity}`,
//         amount: Math.round(amount), // Ensure integer
//         eventHandler: {
//             onSuccess: (payload: any) => { console.log(payload) }, // Empty default
//             onError: (error: any) => { console.log(error) },
//             onClose: () => { },
//         },
//         paymentPreference: ['KHALTI', 'EBANKING', 'MOBILE_BANKING', 'CONNECT_IPS', 'SCT'],
//     };

//     console.log('Khalti Config Object:', {
//         publicKey: publicKey.slice(0, 15) + '...',
//         productIdentity,
//         productName,
//         productUrl: config.productUrl,
//         amount: config.amount,
//         paymentPreference: config.paymentPreference,
//     }); // Debug

//     return config;
// }


