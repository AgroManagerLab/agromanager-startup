import paletteData from './palette.json';

export const palette = paletteData;
export type Palette = typeof palette;
export type Radii = typeof palette.radii;

export default palette;
