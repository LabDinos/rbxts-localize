/**
 * Supported Languages.
 */
export const enum LanguageCode {
    /// German (Germany)
    /// Deutsch (Deutschland)
    de_DE = 'de_DE',
    /// English (United States)
    /// English (United States)
    en_US = 'en_US',
    /// Spanish (Spain)
    /// Español (España)
    es_ES = 'es_ES',
    /// French (France)
    /// Français (France)
    fr_FR = 'fr_FR',
    /// Indonesian (Indonesia)
    /// Bahasa Indonesia (Indonesia)
    id_ID = 'id_ID',
    /// Italian (Italy)
    /// Italiano (Italia)
    it_IT = 'it_IT',
    /// Japanese (Japan)
    /// 日本語 (日本)
    ja_JP = 'ja_JP',
    /// Korean (South Korea)
    /// 한국어 (대한민국)
    ko_KR = 'ko_KR',
    /// Polish (Poland)
    /// Polski (Polska)
    pl_PL = 'pl_PL',
    /// Portuguese (Brazil)
    /// Português (Brasil)
    pt_BR = 'pt_BR',
    /// Russian (Russia)
    /// Русский (Россия)
    ru_RU = 'ru_RU',
    /// Thai (Thailand)
    /// ไทย (ประเทศไทย)
    th_TH = 'th_TH',
    /// Turkish (Turkey)
    /// Türkçe (Türkiye)
    tr_TR = 'tr_TR',
    /// Vietnamese (Vietnam)
    /// Tiếng Việt (Việt Nam)
    vi_VN = 'vi_VN',
    /// Chinese (Simplified)
    /// 中文 (简体)
    zh_CN = 'zh_CN',
    /// Chinese (Traditional)
    /// 中文 (繁體)
    zh_TW = 'zh_TW'
}

export const ROBLOX_LANGUAGE_CODE_MAP: Record<string, LanguageCode> = {
    'de-de': LanguageCode.de_DE,
    'en-us': LanguageCode.en_US,
    'es-es': LanguageCode.es_ES,
    'fr-fr': LanguageCode.fr_FR,
    'id-id': LanguageCode.id_ID,
    'it-it': LanguageCode.it_IT,
    'ja-jp': LanguageCode.ja_JP,
    'ko-kr': LanguageCode.ko_KR,
    'pl-pl': LanguageCode.pl_PL,
    'pt-br': LanguageCode.pt_BR,
    'ru-ru': LanguageCode.ru_RU,
    'th-th': LanguageCode.th_TH,
    'tr-tr': LanguageCode.tr_TR,
    'vi-vn': LanguageCode.vi_VN,
    'zh-cn': LanguageCode.zh_CN,
    'zh-hans': LanguageCode.zh_CN,
    'zh-hant': LanguageCode.zh_TW,
    'zh-tw': LanguageCode.zh_TW
};

export const LANGUAGE_CODE_ROBLOX_MAP: Record<LanguageCode, string> = {
    [LanguageCode.de_DE]: 'de-de',
    [LanguageCode.en_US]: 'en-us',
    [LanguageCode.es_ES]: 'es-es',
    [LanguageCode.fr_FR]: 'fr-fr',
    [LanguageCode.id_ID]: 'id-id',
    [LanguageCode.it_IT]: 'it-it',
    [LanguageCode.ja_JP]: 'ja-jp',
    [LanguageCode.ko_KR]: 'ko-kr',
    [LanguageCode.pl_PL]: 'pl-pl',
    [LanguageCode.pt_BR]: 'pt-br',
    [LanguageCode.ru_RU]: 'ru-ru',
    [LanguageCode.th_TH]: 'th-th',
    [LanguageCode.tr_TR]: 'tr-tr',
    [LanguageCode.vi_VN]: 'vi-vn',
    [LanguageCode.zh_CN]: 'zh-cn',
    [LanguageCode.zh_TW]: 'zh-tw'
};
