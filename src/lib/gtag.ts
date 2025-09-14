// src/lib/gtag.ts

type GtagEvent = {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: unknown;
};

declare global {
  interface Window {
    gtag: (command: 'config' | 'event', ...args: (string | GtagEvent)[]) => void;
  }
}

export const GA_TRACKING_ID = 'G-ZQLY8HT2ZN';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
type EventProps = {
  action: string;
  category: string;
  label: string;
  value?: number;
};

export const event = ({ action, category, label, value }: EventProps) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
