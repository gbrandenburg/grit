/**
 * Shared types for the buddy companion system.
 */

/** Grit-specific productivity stats for Kern */
export enum Stat {
	FOCUS = "FOCUS",
	MOMENTUM = "MOMENTUM",
	RESILIENCE = "RESILIENCE",
	CLARITY = "CLARITY",
	MISCHIEF = "MISCHIEF",
}

export const STAT_NAMES = Object.values(Stat);

export interface StatBlock {
	[Stat.FOCUS]: number;
	[Stat.MOMENTUM]: number;
	[Stat.RESILIENCE]: number;
	[Stat.CLARITY]: number;
	[Stat.MISCHIEF]: number;
}

/** Rarity tiers with weights for rolling */
export enum Rarity {
	COMMON = "Common",
	UNCOMMON = "Uncommon",
	RARE = "Rare",
	EPIC = "Epic",
	LEGENDARY = "Legendary",
}

/** Weight for each rarity tier (out of 100) */
export const RARITY_WEIGHTS: Record<Rarity, number> = {
	[Rarity.COMMON]: 60,
	[Rarity.UNCOMMON]: 25,
	[Rarity.RARE]: 10,
	[Rarity.EPIC]: 4,
	[Rarity.LEGENDARY]: 1,
};

/** Eye styles substituted into ASCII art via {E} placeholder */
export const EYE_STYLES = ["●", "○", "◉", "⊙", "◎", "°"] as const;

/** Hats rendered above the sprite */
export const HATS = [
	"", // no hat
	"🎩",
	"👑",
	"🎓",
	"🧢",
	"👒",
	"⛑️",
	"🪖",
] as const;

/** Kern's visual form identifier */
export type SpeciesName = "Kern";

/** Deterministic bones — re-rolled from hash on every session */
export interface CompanionBones {
	species: SpeciesName;
	rarity: Rarity;
	shiny: boolean;
	stats: StatBlock;
	eyeStyle: string;
	hat: string;
}

/** Persisted soul — generated once on first hatch */
export interface StoredCompanion {
	rerollCount: number;
	name: string;
	personality: string;
	backstory: string;
	hatchedAt: string;
	hidden?: boolean; // true when user ran /buddy off
	ollamaModel?: string; // user-chosen Ollama model for reactions
}

/** Full buddy state = bones (ephemeral) + soul (persisted) */
export interface BuddyState extends CompanionBones, StoredCompanion {}
