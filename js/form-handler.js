// Google Apps Script Web App URL - Replace with your deployed script URL
const FORM_SUBMIT_URL = 'YOUR_GOOGLE_SCRIPT_URL';

// Handle form submissions for both newsletter and ebook downloads
async function submitFormToSheet(email, formType, ebookTitle = null) {
    try {
        const timestamp = new Date().toISOString();
        const data = {
            email,
            timestamp,
            formType,
            ebookTitle
        };

        const response = await fetch(FORM_SUBMIT_URL, {
            method: 'POST',
            mode: 'no-cors', // Required for Google Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        return true;
    } catch (error) {
        console.error('Form submission failed:', error);
        return false;
    }
}
