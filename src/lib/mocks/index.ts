async function initMocks() {
    if (typeof window === 'undefined') {
        return;
    }

    if (process.env.NODE_ENV === 'development') {
        const { worker } = await import('./browser');
        return worker.start({
            onUnhandledRequest: 'bypass',
        });
    }
}

initMocks();