export interface Icons {
  alert: string;
  error: string;
  info: string;
  warn: string;
  success: string;
}

export const defaultIcons: Icons = {
  alert: `
        <svg class="simple-notification-svg" xmlns="http://www.w3.org/2000/svg" fill="#000000" height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
        </svg>`,

  error: `
        <svg class="simple-notification-svg" xmlns="http://www.w3.org/2000/svg" fill="#000000" height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
        </svg>
    `,
  info: `
        <svg class="simple-notification-svg" xmlns="http://www.w3.org/2000/svg" fill="#000000" height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/>
        </svg>
    `,  
  success: `
        <svg class="simple-notification-svg" xmlns="http://www.w3.org/2000/svg" fill="#000000" height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
        </svg>
    `,
  warn: `
        <svg class="simple-notification-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" version="1.1" height="64" viewBox="0 0 64 64" enable-background="new 0 0 64 64">
        <g>
            <g fill="#555">
            <circle cx="32.086" cy="50.142" r="2.256"/>
            <path d="m30.08 25.012v17.308c0 1.107 0.897 2.005 2.006 2.005s2.006-0.897 2.006-2.005v-17.308c0-1.107-0.897-2.006-2.006-2.006s-2.006 0.898-2.006 2.006z"/>
            <path d="M63.766 59.234L33.856 3.082c-0.697-1.308-2.844-1.308-3.54 0L0.407 59.234c-0.331 0.622-0.312 1.372 0.051 1.975 0.362 0.605 1.015 0.975 1.72 0.975h59.816c0.705 0 1.357-0.369 1.721-0.975C64.076 60.606 64.096 59.856 63.766 59.234zM5.519 58.172L32.086 8.291l26.568 49.881H5.519z"/>
            </g>
        </g>
        </svg>
    `
};
