// Utility function to extract and format time from a date string
export function extractTime(dateString: string) {
  const date = new Date(dateString); // Convert the date string into a Date object
  let hours = date.getHours(); // Get the hours from the Date object
  const minutes = padZero(date.getMinutes()); // Get the minutes and pad with zero if needed
  const ampm = hours >= 12 ? "PM" : "AM"; // Determine if it's AM or PM

  hours = hours % 12; // Convert 24-hour format to 12-hour format
  hours = hours ? hours : 12; // If hours is 0, set it to 12 (midnight or noon)

  return `${padZero(hours)}:${minutes} ${ampm}`; // Return the formatted time string
}

// Helper function to pad a number with a leading zero if it's less than 10
function padZero(number: number) {
  return number.toString().padStart(2, "0"); // Ensure the number is at least two digits
}
