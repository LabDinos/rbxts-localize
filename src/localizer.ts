import { parseInterpolatable } from './interpolation';
import { getLookupKeyName, LookupVariables } from './keys';
import { LanguageCode } from './language';

/**
 * Implement your own localizer table dependency.
 */
export interface LocalizationProvider {
    setLanguage(language: LanguageCode): void;
    getLanguage(): LanguageCode;
    getKey(key: string): string | undefined;
}

/**
 * A localizer.
 */
export class Localizer<Provider extends LocalizationProvider> {
    private provider: Provider;
    public languageChangedSignal: BindableEvent<(language: LanguageCode) => void>;

    /**
     * Create a new localizer.
     *
     * @param provider The translation provider.
     */
    public constructor(provider: Provider) {
        this.provider = provider;
        this.languageChangedSignal = new Instance('BindableEvent');
    }

    /**
     * Change the current language.
     *
     * @param language The language.
     */
    public setLanguage(language: LanguageCode): void {
        this.provider.setLanguage(language);
        this.languageChangedSignal.Fire(language);
    }

    /**
     * Get the current language.
     *
     * @returns The language.
     */
    public getLanguage(): LanguageCode {
        return this.provider.getLanguage();
    }

    /**
     * Retrieve a localized string for a given key with arguments.
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
     * Interpolate a string with variables.
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

                result += value !== undefined ? value : '(nil)';
            }
        }

        return result;
    }

    /**
     * Get a key from the provider given a key and arguments.
     *
     * @param key The key.
     * @param args The loookup variables.
     * @returns The key.
     */
    public getKey(key: string, args: LookupVariables): string | undefined {
        const { key: lookupKey, fallback } = this.getLookupKeyName(key, args);
        return this.provider.getKey(lookupKey) ?? this.provider.getKey(fallback);
    }

    /**
     * Localize a key with arguments.
     *
     * @param key The key.
     * @param args The lookup variables.
     * @returns The localized key.
     */
    public localize(key: string, args: LookupVariables = {}): string {
        const value = this.getKey(key, args);
        return value !== undefined ? this.interpolate(value, args) : key;
    }
}
