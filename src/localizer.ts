import { parseInterpolatable } from './interpolation';
import { getLookupKeyName, LookupVariables } from './keys';
import { LanguageCode } from './language';

/**
 * Implement your own localizer table dependency.
 */
export abstract class LocalizerTableDependency {
    abstract setLanguage(language: LanguageCode): void;
    abstract getLanguage(): LanguageCode;
    abstract getKey(key: string): string | undefined;
}

/**
 * A localizer.
 */
export class Localizer<Table extends LocalizerTableDependency> {
    private table: Table;
    public languageChangedSignal: BindableEvent<(language: LanguageCode) => void>;

    /**
     * Create a new localizer.
     */
    public constructor(translationTable: Table) {
        this.table = translationTable;
        this.languageChangedSignal = new Instance('BindableEvent');
    }

    /**
     * Set the language.
     *
     * @param language The language.
     */
    public setLanguage(language: LanguageCode): void {
        this.table.setLanguage(language);
        this.languageChangedSignal.Fire(language);
    }

    /**
     * Get the language.
     *
     * @returns The language.
     */
    public getLanguage(): LanguageCode {
        return this.table.getLanguage();
    }

    /**
     * Get a key given a key and arguments.
     *
     * @param key The key.
     * @param args The arguments.
     * @returns A key and fallback key.
     */
    public getLookupKeyName(
        key: string,
        args: LookupVariables
    ): {
        key: string;
        fallback: string;
    } {
        return getLookupKeyName(this.getLanguage(), key, args);
    }

    /**
     * Interpolate a string.
     *
     * @param interpolatable The interpolatable.
     * @param variables The variables.
     */
    public interpolate(interpolatable: string, variables: LookupVariables): string {
        const parts = parseInterpolatable(interpolatable);

        let result = '';

        for (const part of parts) {
            if (part.type === 'string') {
                result += part.value;
            } else {
                const value = variables[part.variable];

                if (value !== undefined) {
                    result += value;
                }
            }
        }

        return result;
    }

    /**
     * Get a key.
     *
     * @param key The key
     * @param args The arguments.
     * @returns The key.
     */
    public getKey(key: string, args: LookupVariables): string | undefined {
        const { key: lookupKey, fallback } = this.getLookupKeyName(key, args);
        return this.table.getKey(lookupKey) ?? this.table.getKey(fallback);
    }

    /**
     * Localize a key.
     *
     * @param key The key.
     * @param args The arguments.
     * @returns The localized key.
     */
    public localize(key: string, args: LookupVariables = {}): string {
        const value = this.getKey(key, args);
        return value !== undefined ? this.interpolate(value, args) : key;
    }
}
