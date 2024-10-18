// Service worker to cache whole website when offline

'use client';

import { useEffect } from 'react';

const ServiceWorker = (() => {
    useEffect(() => {
        if('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('sw.js')
                .then((reg) => {
                    console.log('Service Worker registered with scope:', reg.scope);
                }).catch((error) => {
                    console.error('Service Worker registration failed:', error);
            });
        }
    }, []);

    return null;
})

export default ServiceWorker;