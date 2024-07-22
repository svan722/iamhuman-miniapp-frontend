import validator from "validator";

export const validateURL = (url:string):boolean => {
  return validator.isURL(url);
}

export interface validateDiscordUsernameTypes {
  isValid: boolean;
  errorMessage?: string;
}

export const validateDiscordUsername = (username: string): validateDiscordUsernameTypes => {

  const usernameRegex = /^[a-zA-Z0-9_\-\s]{2,32}$/;
  const hasConsecutiveChars = /[\s_-]{2,}/.test(username);
  const startsOrEndsWithSpecialChar = /^[\s_-]|[\s_-]$/.test(username);

  if (username.length < 2 || username.length > 32) {
    return {
      isValid: false,
      errorMessage: 'Username must be between 2 and 32 characters long',
    };
  }

  if (!usernameRegex.test(username)) {
    return {
      isValid: false,
      errorMessage:
        'Username can only contain letters, numbers, underscores, hyphens, and spaces',
    };
  }

  if (hasConsecutiveChars) {
    return {
      isValid: false,
      errorMessage: 'Username cannot contain consecutive underscores, hyphens, or spaces',
    };
  }

  if (startsOrEndsWithSpecialChar) {
    return {
      isValid: false,
      errorMessage: 'Username cannot start or end with an underscore, hyphen, or space',
    };
  }

  return {
    isValid: true,
  };
}

export function validateTwitterUrl(url: string): boolean {
  // Remove any leading/trailing whitespace
  url = url.trim();

  // Check if the URL starts with "https://twitter.com/"
  if (!url.startsWith("https://twitter.com/") || !url.startsWith("https://x.com/") ) {
    return false;
  }

  let username="";
  // Extract the username part of the URL
  if (url.startsWith("https://twitter.com/")) {
      username = url.substring("https://twitter.com/".length);
  } 
  if(url.startsWith("https://x.com/")) {
    username = url.substring("https://x.com/".length);
  }
   

  // Check if the username is not empty
  if (username.length === 0) {
    return false;
  }

  // Check if the username contains only valid characters (alphanumeric, underscores, and periods)
  const usernameRegex = /^[a-zA-Z0-9_\.]+$/;
  if (!usernameRegex.test(username)) {
    return false;
  }

  // Check if the username doesn't start or end with a period or underscore
  if (username.startsWith("_") || username.startsWith(".") || username.endsWith("_") || username.endsWith(".")) {
    return false;
  }

  // If all checks pass, the URL is valid
  return true;
}