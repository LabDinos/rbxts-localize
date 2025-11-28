import { defineConfig, globalIgnores } from 'eslint/config';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import robloxTs from 'eslint-plugin-roblox-ts';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig([
    globalIgnores(['out']),
    eslint.configs.recommended,
    tseslint.configs.recommended,
    robloxTs.configs.recommended,
    eslintPluginPrettierRecommended,
    {
        rules: {
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_'
                }
            ]
        }
    }
]);
