/**
 * Kern's rarity, productivity stats, and restrained terminal sketch.
 *
 * Kern deliberately has one visual form rather than a pool of animals. The
 * three frames animate the core seam without turning the terminal into a
 * pet simulator.
 */

import { rollWeighted } from "./buddy-prng.js";
import { EYE_STYLES, HATS, RARITY_WEIGHTS, Rarity, type SpeciesName, STAT_NAMES, type Stat } from "./buddy-types.js";

export interface SpeciesDef {
	name: SpeciesName;
	frames: string[][];
	rarityFloor: Rarity;
}

const KERN_FRAMES: string[][] = [
	["    /\\    ", "  /####\\  ", " <##*###> ", "  \\####/  ", "    \\/    "],
	["    /\\    ", "  /####\\  ", " <##+###> ", "  \\####/  ", "    \\/    "],
	["    /\\    ", "  /####\\  ", " <##*###> ", "  \\####/  ", "    \\/    "],
];

const SPECIES_DEFS: Record<SpeciesName, SpeciesDef> = {
	Kern: {
		name: "Kern",
		frames: KERN_FRAMES,
		rarityFloor: Rarity.COMMON,
	},
};

/** Kern is the only companion form in the Grit build. */
export const ALL_SPECIES: SpeciesName[] = ["Kern"];

/** Roll Kern's rarity while keeping the visual form stable. */
export function rollSpecies(rng: () => number): { species: SpeciesName; rarity: Rarity } {
	return { species: "Kern", rarity: rollWeighted(rng, RARITY_WEIGHTS) };
}

/** Retained as a compatibility export; Kern does not render eyes. */
export function rollEyes(rng: () => number): string {
	const idx = Math.floor(rng() * EYE_STYLES.length);
	return EYE_STYLES[idx];
}

/** Retained as a compatibility export; Kern does not wear hats. */
export function rollHat(rng: () => number): string {
	const idx = Math.floor(rng() * HATS.length);
	return HATS[idx];
}

function statFloor(rarity: Rarity): number {
	switch (rarity) {
		case Rarity.COMMON:
			return 10;
		case Rarity.UNCOMMON:
			return 20;
		case Rarity.RARE:
			return 35;
		case Rarity.EPIC:
			return 50;
		case Rarity.LEGENDARY:
			return 65;
	}
}

/** Roll productivity stats: one strength, one weakness, and three normal values. */
export function rollStats(rng: () => number, rarity: Rarity): Record<Stat, number> {
	const floor = statFloor(rarity);
	const stats: Partial<Record<Stat, number>> = {};

	const peakStat = STAT_NAMES[Math.floor(rng() * STAT_NAMES.length)];
	let dumpStat = STAT_NAMES[Math.floor(rng() * STAT_NAMES.length)];
	while (dumpStat === peakStat) {
		dumpStat = STAT_NAMES[Math.floor(rng() * STAT_NAMES.length)];
	}

	stats[peakStat] = Math.floor(rng() * 31) + 70;
	stats[dumpStat] = Math.floor(rng() * 20) + floor;

	for (const stat of STAT_NAMES) {
		if (!(stat in stats)) {
			stats[stat] = Math.floor(rng() * (100 - floor)) + floor;
		}
	}

	return stats as Record<Stat, number>;
}

/** Get Kern's three restrained terminal frames. */
export function getSpeciesFrames(species: SpeciesName): string[][] {
	return SPECIES_DEFS[species].frames;
}

/** Compatibility helper for older face-based species. Kern has no eye placeholder. */
export function applyEyes(frame: string[], eyes: string): string[] {
	return frame.map((line) => line.replace(/\{E\}/g, eyes));
}

/** Get the maximum width of Kern's frames. */
export function getSpeciesWidth(species: SpeciesName): number {
	const frames = SPECIES_DEFS[species].frames;
	let maxW = 0;
	for (const frame of frames) {
		for (const line of frame) {
			maxW = Math.max(maxW, line.length);
		}
	}
	return maxW;
}
