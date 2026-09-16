export interface Venue {
  name: string;
  type: 'Journal' | 'Conference' | 'Workshop';
  accent?: string;
}

export const defaultVenueAccent = '#64748b';

// Accent hues are adapted for readable badge text in PublicationMeta.
// These two hues were supplied by the site owner, not a verified brand guide.
export const venues = {
  'nature-medicine': {
    name: 'Nature Medicine',
    type: 'Journal',
    accent: '#ca3132',
  },
  'nature-nanotechnology': {
    name: 'Nature Nanotechnology',
    type: 'Journal',
    accent: '#e6a93e',
  },
} satisfies Record<string, Venue>;

export type VenueId = keyof typeof venues;
export const venueIds = Object.keys(venues) as [VenueId, ...VenueId[]];
export const getVenue = (id: VenueId): Venue => venues[id];
