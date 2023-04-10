// Import
import sanitize from "sanitize-html";

// Custom HTML sanitiser
const sanitizeHtml = (input) => sanitize(input, { allowedTags: [], allowedAttributes: {} });

// Export
export default sanitizeHtml;
