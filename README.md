# `@rbxts/localize`

`@rbxts/localize` is a library for localizing Roblox games with an approach similar to i18next.

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
- Thai
- Turkish
- Vietnamese
- Chinese (Simplified)

## Plurals

The main idea of `@rbxts/localize` is to provide a simple way to localize your experience without
having to worry about the complexity of pluralization rules. Simpily use the `$count` token in your
strings and `@rbxts/localize` will handle the rest.

Localization file:
```csv
key,en,zh_cn
apples,You have {{$count}} apples,你有{{$count}}个苹果
apples:one,You have {{$count}} apple,
```

Typescript:
```ts
// en
localizer.localize('apples', { $count: 1 }) // You have 1 apple
localizer.localize('apples', { $count: 2 }) // You have 2 apples
// zh_cn
localizer.localize('apples', { $count: 1 }) // 你有1个苹果
localizer.localize('apples', { $count: 2 }) // 你有2个苹果
```

For ordinal numbers, just pass `$ordinal` as true! Note you must add `:ordinal` to the key in the
localization file or it will not work.

Localization file:
```csv
key,en,zh_cn
place:ordinal,You are in {{$count}}th place,你在第{{$count}}名
place:ordinal:one,You are in {{$count}}st place,
place:ordinal:two,You are in {{$count}}nd place,
place:ordinal:few,You are in {{$count}}rd place,
```

Typescript:
```ts
// en
localizer.localize('place', { $count: 1, $ordinal: true }) // You are in 1st place
localizer.localize('place', { $count: 2, $ordinal: true }) // You are in 2nd place
localizer.localize('place', { $count: 3, $ordinal: true }) // You are in 3rd place
localizer.localize('place', { $count: 4, $ordinal: true }) // You are in 4th place

// zh_cn
localizer.localize('place', { $count: 1, $ordinal: true }) // 你在第1名
localizer.localize('place', { $count: 2, $ordinal: true }) // 你在第2名
localizer.localize('place', { $count: 3, $ordinal: true }) // 你在第3名
localizer.localize('place', { $count: 4, $ordinal: true }) // 你在第4名
```
