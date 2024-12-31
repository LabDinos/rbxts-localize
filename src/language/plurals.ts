import { LanguageCode } from './languages';

/**
 * The pluralization types for a given language.
 */
export const enum PluralOption {
    Zero = 'zero',
    One = 'one',
    Two = 'two',
    Few = 'few',
    Many = 'many',
    Other = 'other'
}

/**
 * The pluralization rules for a given language.
 */
export const PLURALIZATION_RULES = {
    [LanguageCode.de_DE]: {
        cardinal: [PluralOption.One, PluralOption.Other],
        ordinal: [PluralOption.Other]
    },
    [LanguageCode.en_US]: {
        cardinal: [PluralOption.One, PluralOption.Other],
        ordinal: [PluralOption.One, PluralOption.Two, PluralOption.Few, PluralOption.Other]
    },
    [LanguageCode.es_ES]: {
        cardinal: [PluralOption.One, PluralOption.Many, PluralOption.Other],
        ordinal: [PluralOption.Other]
    },
    [LanguageCode.fr_FR]: {
        cardinal: [PluralOption.One, PluralOption.Many, PluralOption.Other],
        ordinal: [PluralOption.One, PluralOption.Other]
    },
    [LanguageCode.id_ID]: {
        cardinal: [PluralOption.Other],
        ordinal: [PluralOption.Other]
    },
    [LanguageCode.it_IT]: {
        cardinal: [PluralOption.One, PluralOption.Many, PluralOption.Other],
        ordinal: [PluralOption.Many, PluralOption.Other]
    },
    [LanguageCode.ja_JP]: {
        cardinal: [PluralOption.Other],
        ordinal: [PluralOption.Other]
    },
    [LanguageCode.ko_KR]: {
        cardinal: [PluralOption.Other],
        ordinal: [PluralOption.Other]
    },
    [LanguageCode.pl_PL]: {
        cardinal: [PluralOption.One, PluralOption.Few, PluralOption.Many, PluralOption.Other],
        ordinal: [PluralOption.Other]
    },
    [LanguageCode.pt_BR]: {
        cardinal: [PluralOption.One, PluralOption.Many, PluralOption.Other],
        ordinal: [PluralOption.Other]
    },
    [LanguageCode.th_TH]: {
        cardinal: [PluralOption.Other],
        ordinal: [PluralOption.Other]
    },
    [LanguageCode.tr_TR]: {
        cardinal: [PluralOption.One, PluralOption.Other],
        ordinal: [PluralOption.Other]
    },
    [LanguageCode.vi_VN]: {
        cardinal: [PluralOption.Other],
        ordinal: [PluralOption.One, PluralOption.Other]
    },
    [LanguageCode.zh_CN]: {
        cardinal: [PluralOption.Other],
        ordinal: [PluralOption.Other]
    },
    [LanguageCode.zh_TW]: {
        cardinal: [PluralOption.Other],
        ordinal: [PluralOption.Other]
    }
} as const;

type PluralizationFunctionCardinal = Record<LanguageCode, unknown> & {
    [key in LanguageCode]: (value: number) => (typeof PLURALIZATION_RULES)[key]['cardinal'][number];
};

/**
 * The cardinal pluralization functions for a given language.
 */
export const PLURALIZATION_FUNCTIONS_CARDINAL: PluralizationFunctionCardinal = {
    [LanguageCode.de_DE]: (value: number) => (value === 1 ? PluralOption.One : PluralOption.Other),
    [LanguageCode.en_US]: (value: number) => (value === 1 ? PluralOption.One : PluralOption.Other),
    [LanguageCode.es_ES]: (value: number) => {
        if (value === 1) return PluralOption.One;
        // Compact decimal exponent value
        const compactDecimalExponentValue = value === 0 ? 0 : math.floor(math.log10(math.abs(value)));
        if (
            (compactDecimalExponentValue === 0 &&
                math.floor(value) !== 0 &&
                value % 1000000 === 0 &&
                value % 1 === 0) ||
            compactDecimalExponentValue < 0 ||
            compactDecimalExponentValue > 5
        )
            return PluralOption.Many;
        return PluralOption.Other;
    },
    [LanguageCode.fr_FR]: (value: number) => {
        if (value >= 0 && value < 2) return PluralOption.One;
        // Compact decimal exponent value
        const compactDecimalExponentValue = value === 0 ? 0 : math.floor(math.log10(math.abs(value)));
        if (
            (compactDecimalExponentValue === 0 &&
                math.floor(value) !== 0 &&
                value % 1000000 === 0 &&
                value % 1 === 0) ||
            compactDecimalExponentValue < 0 ||
            compactDecimalExponentValue > 5
        )
            return PluralOption.Many;
        return PluralOption.Other;
    },
    [LanguageCode.id_ID]: (value: number) => PluralOption.Other,
    [LanguageCode.it_IT]: (value: number) => {
        if (value === 1) return PluralOption.One;
        // Compact decimal exponent value
        const compactDecimalExponentValue = value === 0 ? 0 : math.floor(math.log10(math.abs(value)));
        if (
            (compactDecimalExponentValue === 0 &&
                math.floor(value) !== 0 &&
                value % 1000000 === 0 &&
                value % 1 === 0) ||
            compactDecimalExponentValue < 0 ||
            compactDecimalExponentValue > 5
        )
            return PluralOption.Many;
        return PluralOption.Other;
    },
    [LanguageCode.ja_JP]: (value: number) => PluralOption.Other,
    [LanguageCode.ko_KR]: (value: number) => PluralOption.Other,
    [LanguageCode.pl_PL]: (value: number) => {
        if (value === 1) return PluralOption.One;
        const hasDecimal = value % 1 !== 0;
        const int = math.floor(value);
        const int10 = int % 10;
        const int100 = int % 100;
        if (!hasDecimal && int10 >= 2 && int10 <= 4 && (int100 < 12 || int100 > 14)) return PluralOption.Few;
        if (
            !hasDecimal &&
            ((int !== 0 && (int10 === 0 || int10 === 1)) ||
                (int10 >= 5 && int10 <= 9) ||
                (int100 >= 12 && int100 <= 14))
        )
            return PluralOption.Many;
        return PluralOption.Other;
    },
    [LanguageCode.pt_BR]: (value: number) => {
        const int = math.floor(value);
        if (int === 0 || int === 1) return PluralOption.One;
        // Compact decimal exponent value
        const compactDecimalExponentValue = value === 0 ? 0 : math.floor(math.log10(math.abs(value)));
        if (
            (compactDecimalExponentValue === 0 && int !== 0 && value % 1000000 === 0 && value % 1 === 0) ||
            compactDecimalExponentValue < 0 ||
            compactDecimalExponentValue > 5
        )
            return PluralOption.Many;
        return PluralOption.Other;
    },
    [LanguageCode.th_TH]: (value: number) => PluralOption.Other,
    [LanguageCode.tr_TR]: (value: number) => (value === 1 ? PluralOption.One : PluralOption.Other),
    [LanguageCode.vi_VN]: (value: number) => PluralOption.Other,
    [LanguageCode.zh_CN]: (value: number) => PluralOption.Other,
    [LanguageCode.zh_TW]: (value: number) => PluralOption.Other
};

type PluralizationFunctionOrdinal = Record<LanguageCode, unknown> & {
    // Key maps to the language code using (typeof PLURALIZATION_RULES)[key]['ordinal'][number]
    [key in LanguageCode]: (value: number) => (typeof PLURALIZATION_RULES)[key]['ordinal'][number];
};

/**
 * The ordinal pluralization functions for a given language.
 */
export const PLURALIZATION_FUNCTIONS_ORDINAL: PluralizationFunctionOrdinal = {
    [LanguageCode.de_DE]: (value: number) => PluralOption.Other,
    [LanguageCode.en_US]: (value: number) => {
        if (value % 10 === 1 && value % 100 !== 11) return PluralOption.One;
        if (value % 10 === 2 && value % 100 !== 12) return PluralOption.Two;
        if (value % 10 === 3 && value % 100 !== 13) return PluralOption.Few;
        return PluralOption.Other;
    },
    [LanguageCode.es_ES]: (value: number) => PluralOption.Other,
    [LanguageCode.fr_FR]: (value: number) => {
        if (value === 1) return PluralOption.One;
        return PluralOption.Other;
    },
    [LanguageCode.id_ID]: (value: number) => PluralOption.Other,
    [LanguageCode.it_IT]: (value: number) => {
        if (value === 8 || value === 11 || value === 80 || value === 81 || value === 100) return PluralOption.Many;
        return PluralOption.Other;
    },
    [LanguageCode.ja_JP]: (value: number) => PluralOption.Other,
    [LanguageCode.ko_KR]: (value: number) => PluralOption.Other,
    [LanguageCode.pl_PL]: (value: number) => PluralOption.Other,
    [LanguageCode.pt_BR]: (value: number) => PluralOption.Other,
    [LanguageCode.th_TH]: (value: number) => PluralOption.Other,
    [LanguageCode.tr_TR]: (value: number) => PluralOption.Other,
    [LanguageCode.vi_VN]: (value: number) => (value === 1 ? PluralOption.One : PluralOption.Other),
    [LanguageCode.zh_CN]: (value: number) => PluralOption.Other,
    [LanguageCode.zh_TW]: (value: number) => PluralOption.Other
};
