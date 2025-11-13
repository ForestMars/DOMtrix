// Define a simple TypeScript structure for incoming messages to keep things clean.
interface ExtensionMessage {
    action: 'QUERY_AI' | 'DOM_MANIPULATION' | 'GET_STATE';
    data: any;
    tabId?: number; // Optional tab ID if targeting a specific tab
}

// The Service Worker is the central listener for all parts of the extension.
chrome.runtime.onMessage.addListener(
    (request: ExtensionMessage, sender, sendResponse) => {
        // Must return true to indicate you will call sendResponse asynchronously
        const isAsync = handleMessage(request, sender, sendResponse);
        return isAsync;
    }
);

function handleMessage(request: ExtensionMessage, sender, sendResponse) {
    // Determine the source of the message (Sidebar/Content Script) and its action.
    console.log(`[SW] Received message: ${request.action}`, request.data);

    switch (request.action) {
        // ----------------------------------------------------------------------
        // 1. RECEIVE: Message from Sidebar UI (Popup/React)
        // ----------------------------------------------------------------------
        case 'QUERY_AI':
            // 1. This is where you will call your external AI API (async operation).
            // 2. Once the AI response (the DOM command) is ready, you send it
            //    to the Content Script in the active tab (using chrome.tabs.sendMessage).
            
            // Temporary Response for testing the flow:
            console.log(`[SW] Processing AI query: ${request.data.prompt}`);
            
            if (sender.tab?.id) {
                // Send the AI's *command* to the Content Script in the active tab.
                chrome.tabs.sendMessage(sender.tab.id, {
                    action: 'EXECUTE_DOM_COMMAND',
                    data: {
                        command: `The AI says: ${request.data.prompt}` 
                        // Actual response will be a JSON command or script
                    }
                });
            }
            sendResponse({ status: "AI_QUERY_RECEIVED", processed: true });
            return false; // Not awaiting a response from the Content Script here.


        // ----------------------------------------------------------------------
        // 2. RECEIVE: Message from Content Script (Status update/data transfer)
        // ----------------------------------------------------------------------
        case 'DOM_MANIPULATION':
            // The Content Script sends a status back here after manipulating the DOM.
            console.log(`[SW] DOM Manipulation Status: ${request.data.status}`);
            
            // This is where you could save the status to chrome.storage
            // or notify the Sidebar UI if it's open.
            sendResponse({ status: "OK" });
            return false; // Immediate response.

        // ... other actions go here
    }
}
