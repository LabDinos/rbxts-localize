# `localize`

[![npm version](https://img.shields.io/npm/v/@rbxts/localize)](https://www.npmjs.com/package/@rbxts/localize)
[![npm downloads](https://img.shields.io/npm/dm/@rbxts/localize)](https://www.npmjs.com/package/@rbxts/localize)
[![license](https://img.shields.io/npm/l/@rbxts/localize)](https://github.com/LabDinos/localize/blob/main/LICENSE.md)

`localize` is a runtime internationalization (i18n) and localization library for Roblox, inspired by i18next. There is no code generation and no build step: define your translations as plain data and resolve them at runtime, with CLDR-style automatic pluralization (cardinal and ordinal) built in.

## Why `localize`

Roblox's automatic translation renders the same string inconsistently within a single language. Translate "N players left" and Chinese can come back as "只剩一个玩家", "只剩2个玩家", then "只有3玩家": the count switches from spelled-out to digits, the phrasing drifts ("只剩" to "只有"), and the measure word ("个") vanishes. It looks unprofessional.

`localize` applies CLDR plural rules per language, so counts read correctly and consistently.

## Quick Start

### Installation

```bash
pnpm add @rbxts/localize
```

### Usage

```ts
import { Localizer, LanguageCode, type LocalizationProvider } from '@rbxts/localize';

const en_US = {
    apples: 'You have {{$count}} apples',
    'apples:one': 'You have {{$count}} apple',
    'apples:other': 'You have {{$count}} apples'
};

const zh_CN = {
    apples: '你有{{$count}}个苹果',
    'apples:other': '你有{{$count}}个苹果'
};

class MyProvider implements LocalizationProvider {
    private language: LanguageCode = LanguageCode.en_US;
    private translations: Record<string, string> = en_US;

    public setLanguage(language: LanguageCode): void {
        this.language = language;
        const languageMap = {
            [LanguageCode.en_US]: en_US,
            [LanguageCode.zh_CN]: zh_CN
        };
        this.translations = languageMap[language] ?? en_US;
    }

    public getLanguage(): LanguageCode {
        return this.language;
    }

    public getKey(key: string): string | undefined {
        return this.translations[key];
    }
}

const localizer = new Localizer(new MyProvider());

localizer.setLanguage(LanguageCode.en_US);

console.log(localizer.localize('apples', { $count: 1 })); // You have 1 apple
console.log(localizer.localize('apples', { $count: 2 })); // You have 2 apples
```

## Supported Languages

- German
- English (US)
- Spanish (Spain)
- French (France)
- Indonesian
- Italian
- Japanese
- Korean
- Polish
- Portuguese (Brazil)
- Russian
- Thai
- Turkish
- Vietnamese
- Chinese (Simplified)
- Chinese (Traditional)

## Plurals

The main idea of `localize` is to provide a simple way to localize your experience without having to worry about the complexity of pluralization rules. Simply use the `$count` token in your strings and `localize` will handle the rest.

Localization file:
```csv
key,en_US,zh_CN
apples:other,You have {{$count}} apples,你有{{$count}}个苹果
apples:one,You have {{$count}} apple,
```

Typescript:
```ts
// en_US
localizer.localize('apples', { $count: 1 }) // You have 1 apple
localizer.localize('apples', { $count: 2 }) // You have 2 apples
// zh_CN
localizer.localize('apples', { $count: 1 }) // 你有1个苹果
localizer.localize('apples', { $count: 2 }) // 你有2个苹果
```

For ordinal numbers, just pass `$ordinal` as true! Note you must add `:ordinal` to the key in the
localization file or it will not work.

Localization file:
```csv
key,en_US,zh_CN
place:ordinal:other,You are in {{$count}}th place,你在第{{$count}}名
place:ordinal:one,You are in {{$count}}st place,
place:ordinal:two,You are in {{$count}}nd place,
place:ordinal:few,You are in {{$count}}rd place,
```

Typescript:
```ts
// en_US
localizer.localize('place', { $count: 1, $ordinal: true }) // You are in 1st place
localizer.localize('place', { $count: 2, $ordinal: true }) // You are in 2nd place
localizer.localize('place', { $count: 3, $ordinal: true }) // You are in 3rd place
localizer.localize('place', { $count: 4, $ordinal: true }) // You are in 4th place

// zh_CN
localizer.localize('place', { $count: 1, $ordinal: true }) // 你在第1名
localizer.localize('place', { $count: 2, $ordinal: true }) // 你在第2名
localizer.localize('place', { $count: 3, $ordinal: true }) // 你在第3名
localizer.localize('place', { $count: 4, $ordinal: true }) // 你在第4名
```
