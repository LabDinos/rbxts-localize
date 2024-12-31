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
    pt_br: LanguageCode.pt_BR,
    th_th: LanguageCode.th_TH,
    de_de: LanguageCode.de_DE,
    ko_kr: LanguageCode.ko_KR,
    vi_vn: LanguageCode.vi_VN,
    ja_jp: LanguageCode.ja_JP,
    tr_tr: LanguageCode.tr_TR,
    it_it: LanguageCode.it_IT,
    pl_pl: LanguageCode.pl_PL,
    fr_fr: LanguageCode.fr_FR,
    id_id: LanguageCode.id_ID,
    en_us: LanguageCode.en_US,
    zh_tw: LanguageCode.zh_TW,
    es_es: LanguageCode.es_ES,
    zh_cn: LanguageCode.zh_CN
};

export const LANGUAGE_CODE_ROBLOX_MAP: Record<LanguageCode, string> = {
    [LanguageCode.pt_BR]: 'pt-br',
    [LanguageCode.th_TH]: 'th-th',
    [LanguageCode.de_DE]: 'de-de',
    [LanguageCode.ko_KR]: 'ko-kr',
    [LanguageCode.vi_VN]: 'vi-vn',
    [LanguageCode.ja_JP]: 'ja-jp',
    [LanguageCode.tr_TR]: 'tr-tr',
    [LanguageCode.it_IT]: 'it-it',
    [LanguageCode.pl_PL]: 'pl-pl',
    [LanguageCode.fr_FR]: 'fr-fr',
    [LanguageCode.id_ID]: 'id-id',
    [LanguageCode.en_US]: 'en-us',
    [LanguageCode.zh_TW]: 'zh-tw',
    [LanguageCode.es_ES]: 'es-es',
    [LanguageCode.zh_CN]: 'zh-cn'
};
