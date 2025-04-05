// /**
//  * Formats a date string or Date object into a readable string
//  * @param date - Date object or ISO string
//  * @param options - Optional formatting options
//  * @returns Formatted date string
//  */
// export function formatDate(
//     date: Date | string,
//     options: Intl.DateTimeFormatOptions = {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     }
//   ): string {
//     const dateObj = typeof date === 'string' ? new Date(date) : date;
    
//     // Handle invalid dates
//     if (isNaN(dateObj.getTime())) {
//       console.warn('Invalid date passed to formatDate:', date);
//       return 'Invalid date';
//     }
  
//     return new Intl.DateTimeFormat('en-US', options).format(dateObj);
//   }
  
//   // Alternative version with time formatting
//   export function formatDateTime(
//     date: Date | string,
//     options: Intl.DateTimeFormatOptions = {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     }
//   ): string {
//     return formatDate(date, options);
//   }
  
//   // Relative time formatting (e.g., "2 days ago")
//   export function formatRelativeTime(
//     date: Date | string,
//     options: Intl.RelativeTimeFormatOptions = {
//       style: 'long',
//       numeric: 'auto',
//     }
//   ): string {
//     const dateObj = typeof date === 'string' ? new Date(date) : date;
//     const now = new Date();
//     const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
  
//     const rtf = new Intl.RelativeTimeFormat('en-US', options);
  
//     if (diffInSeconds < 60) return rtf.format(-diffInSeconds, 'second');
//     if (diffInSeconds < 3600) return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
//     if (diffInSeconds < 86400) return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
//     if (diffInSeconds < 604800) return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
//     if (diffInSeconds < 2592000) return rtf.format(-Math.floor(diffInSeconds / 604800), 'week');
//     if (diffInSeconds < 31536000) return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month');
//     return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year');
//   }




// lib/utils.ts

/**
 * Combines class names and filters out falsy values
 * 
 * @param inputs - Class names to combine
 * @returns Combined class string
 */

export function cn(...inputs: (string | undefined | boolean)[]): string {
    return inputs
      .filter(Boolean)
      .join(' ')
      .trim();
  }
  
  /**
   * Formats a date string or Date object into a readable string
   * @param date - Date object or ISO string
   * @param options - Optional formatting options
   * @returns Formatted date string
   */
  export function formatDate(
    date: Date | string,
    options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }
  ): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    // Handle invalid dates
    if (isNaN(dateObj.getTime())) {
      console.warn('Invalid date passed to formatDate:', date);
      return 'Invalid date';
    }
  
    return new Intl.DateTimeFormat('en-US', options).format(dateObj);
  }
  
  /**
   * Formats a date with time
   * @param date - Date object or ISO string
   * @param options - Optional formatting options
   * @returns Formatted date and time string
   */
  export function formatDateTime(
    date: Date | string,
    options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }
  ): string {
    return formatDate(date, options);
  }
  
  /**
   * Formats a date as relative time (e.g., "2 days ago")
   * @param date - Date object or ISO string
   * @param options - Optional formatting options
   * @returns Relative time string
   */
  export function formatRelativeTime(
    date: Date | string,
    options: Intl.RelativeTimeFormatOptions = {
      style: 'long',
      numeric: 'auto',
    }
  ): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
  
    const rtf = new Intl.RelativeTimeFormat('en-US', options);
  
    if (diffInSeconds < 60) return rtf.format(-diffInSeconds, 'second');
    if (diffInSeconds < 3600) return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
    if (diffInSeconds < 86400) return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
    if (diffInSeconds < 604800) return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
    if (diffInSeconds < 2592000) return rtf.format(-Math.floor(diffInSeconds / 604800), 'week');
    if (diffInSeconds < 31536000) return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month');
    return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year');
  }