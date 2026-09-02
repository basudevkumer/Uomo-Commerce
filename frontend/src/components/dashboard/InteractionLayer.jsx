"use client";

/**
 * Shared client boundary for the dashboard shells.
 *
 * Dashboard and admin layouts are server components, while interactive UI
 * inside those shells may need a client ancestor. Keeping that boundary here
 * also gives both layouts a stable place for future dashboard interactions.
 */
export default function InteractionLayer({ children }) {
  return <>{children}</>;
}
