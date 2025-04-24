import axios from "axios";
import { toast } from "react-toastify";

// utils/loadKhalti.js
export const loadKhaltiScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://khalti.com/static/khalti-checkout.js";
        script.onload = () => resolve(true);
        document.body.appendChild(script);
    });
};


export function generateKhaltiConfig({ productName, identity }: { productName: string, identity: string }) {
    return {
        publicKey: "test_public_key_xxxxxxxxxxxxx", // Replace with your public key
        productIdentity: identity,
        productName: productName,
        productUrl: "http://localhost:5713.com/product" + identity,
        eventHandler: {
            onSuccess(payload) {
                const response = axios.post("/cofirm-check")
            },
            onError(error) {
                console.error("Payment error:", error);
            },
            onClose() {
                console.log("Widget closed");
            },
        },
        paymentPreference: ["KHALTI", "EBANKING", "MOBILE_BANKING", "CONNECT_IPS"],
    };
}