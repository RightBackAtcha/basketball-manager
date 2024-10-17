'use client';

import {useEffect} from "react";

export default function ServiceWorker(){
    useEffect(() => {
        if('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker
                    .register('/service-worker.js')
                    .then((registration) => {
                        console.log('scope is: ', registration.scope)
                    })
                    .catch((error) => {
                        console.log("Service Worker registration failed:", error);
                    });
            });
        }
    }, []);

    return null;
}