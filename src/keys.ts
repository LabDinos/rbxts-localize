import {
    LanguageCode,
    PluralOption,
    PLURALIZATION_FUNCTIONS_ORDINAL,
    PLURALIZATION_FUNCTIONS_CARDINAL
} from './language';

/**
 * Lookup options.
 */
const KEY_LOOKUP_OPTIONS = {
    PLURALS: {
        [PluralOption.Zero]: ':zero',
        [PluralOption.One]: ':one',
        [PluralOption.Two]: ':two',
        [PluralOption.Few]: ':few',
        [PluralOption.Many]: ':many',
        [PluralOption.Other]: ''
    },
    ORDINAL: ':ordinal'
} as const;

/**
 * Special variable names.
 */
const SPECIAL_VARIABLES = {
    PLURALIZATION: '$count',
    ORDINAL: '$ordinal'
} as const;

/**
 * Special lookup variables.
 */
export interface SpecialLookupVariables {
    /**
     * The count for pluralization.
     */
    [SPECIAL_VARIABLES.PLURALIZATION]?: number;
    /**
     * Whether to use ordinal pluralization.
     */
    [SPECIAL_VARIABLES.ORDINAL]?: boolean;
}

/**
 * Lookup variables.
 */
export type LookupVariables = Record<string, string | number | boolean> & SpecialLookupVariables;

/**
 * Lookup a translation key.
 *
 * @param language The translation language.
 * @param key The translation key.
 * @param variables The variables to replace in the key.
 * @returns The translation key and fallback key.
 */
export function getLookupKeyName(
    language: LanguageCode,
    key: string,
    variables: LookupVariables
): {
    key: string;
    fallback: string;
} {
    const ordinal = variables[SPECIAL_VARIABLES.ORDINAL];
    const count = variables[SPECIAL_VARIABLES.PLURALIZATION];

    const keyBase = key + (ordinal ? KEY_LOOKUP_OPTIONS.ORDINAL : '');

    if (count !== undefined) {
        const plural = (ordinal ? PLURALIZATION_FUNCTIONS_CARDINAL : PLURALIZATION_FUNCTIONS_ORDINAL)[language](count);

        return {
            key: keyBase + KEY_LOOKUP_OPTIONS.PLURALS[plural],
            fallback: keyBase + KEY_LOOKUP_OPTIONS.PLURALS[PluralOption.Other]
        };
    }

    return {
        key: keyBase,
        fallback: keyBase + KEY_LOOKUP_OPTIONS.PLURALS[PluralOption.Other]
    };
}
