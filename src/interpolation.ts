/**
 * A part of an interpolation that is a string.
 */
export interface InterpolationStringPart {
    type: 'string';
    value: string;
}

/**
 * A part of an interpolation that needs to be replaced with a variable.
 */
export interface InterpolationVariablePart {
    type: 'variable';
    variable: string;
}

/**
 * Options for the key parser.
 * Note: ESCAPE_CODE must be a single character.
 */
const PARSER_OPTIONS = {
    ESCAPE_CODE: '\\',
    EXPRESSION_START: '{{',
    EXPRESSION_END: '}}'
} as const;

/**
 * Get a character at an index.
 *
 * @param str The string.
 * @param index The index.
 * @returns The character.
 */
function charAt(str: string, index: number): string {
    return str.sub(index + 1, index + 1);
}

/**
 * Get a substring.
 *
 * @param str The string.
 * @param startIndex The start index.
 * @param endIndex The end index.
 * @returns The substring.
 */
function subString(str: string, startIndex: number, endIndex?: number): string {
    return str.sub(startIndex + 1, endIndex === undefined ? str.size() : endIndex + 1);
}

/**
 * Parse an interpolatable.
 *
 * @param interpolatable The interpolatable.
 * @returns The parsed key.
 */
export function parseInterpolatable(
    interpolatable: string
): Array<InterpolationStringPart | InterpolationVariablePart> {
    const sections: Array<InterpolationStringPart | InterpolationVariablePart> = [];

    let expressionMatch = 0;
    let inExpression = false;
    let escaped = false;
    let current = '';

    for (let i = 0; i < interpolatable.size(); i++) {
        const char = charAt(interpolatable, i);

        if (escaped) {
            current += char;
            escaped = false;
            continue;
        }

        if (char === PARSER_OPTIONS.ESCAPE_CODE) {
            escaped = true;
            expressionMatch = 0;
            continue;
        }

        if (inExpression) {
            if (char === charAt(PARSER_OPTIONS.EXPRESSION_END, expressionMatch)) {
                expressionMatch++;
                if (expressionMatch === PARSER_OPTIONS.EXPRESSION_END.size()) {
                    expressionMatch = 0;
                    inExpression = false;
                    sections.push({
                        type: 'variable',
                        variable: subString(current, 0, current.size() - PARSER_OPTIONS.EXPRESSION_END.size())
                    });
                    current = '';
                    continue;
                }
            } else {
                expressionMatch = 0;
            }
        } else {
            if (char === charAt(PARSER_OPTIONS.EXPRESSION_START, expressionMatch)) {
                expressionMatch++;
                if (expressionMatch === PARSER_OPTIONS.EXPRESSION_START.size()) {
                    expressionMatch = 0;
                    inExpression = true;
                    if (current.size() - PARSER_OPTIONS.EXPRESSION_START.size() > 0)
                        sections.push({
                            type: 'string',
                            value: subString(current, 0, current.size() - PARSER_OPTIONS.EXPRESSION_START.size())
                        });
                    current = '';
                    continue;
                }
            } else {
                expressionMatch = 0;
            }
        }

        current += char;
    }

    let lastSection: InterpolationStringPart = { type: 'string', value: '' };
    const actualLastSection = sections[sections.size() - 1];
    if (actualLastSection && actualLastSection.type === 'string') {
        lastSection = actualLastSection;
    } else {
        sections.push(lastSection);
    }

    if (inExpression) {
        lastSection.value += PARSER_OPTIONS.EXPRESSION_START + current;
    } else {
        lastSection.value += current;
    }

    if (escaped) {
        lastSection.value += PARSER_OPTIONS.ESCAPE_CODE;
    }

    return sections;
}
