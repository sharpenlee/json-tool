# Legal translation glossary

The English versions of `privacy.html` and `terms.html` are the single source of truth — the same holds for all eight localized copies under `/ko/`, `/ja/`, `/zh/`, `/zh-hant/`, `/ru/`, `/es/`, `/pt/`, `/fr/`. Use this glossary when editing or adding any legal page so the same legal concept never gets different wording inside one language.

Reviewed 2026-09-13 after an LLM legal-language review (applied: 18 files). See README "Languages" for the site structure.

## Document titles

| | English | 简体 | 繁體 | 日本語 | 한국어 | Français | Español | Português | Русский |
|---|---|---|---|---|---|---|---|---|---|
| Privacy Policy | Privacy Policy | 隐私政策 | 隱私權政策 | プライバシーポリシー | 개인정보처리방침 | Politique de confidentialité | Política de Privacidad | Política de Privacidade | Политика конфиденциальности |
| Terms of Service | Terms of Service | 服务条款 | 服務條款 | 利用規約 | 이용약관 | Conditions d'utilisation | Términos del Servicio | Termos de Serviço | Условия использования |

## Legal terms

| English | 简体 | 繁體 | 日本語 | 한국어 | Français | Español | Português | Русский |
|---|---|---|---|---|---|---|---|---|
| warranty | 保证 | 保證 | 保証 | 보증 | garantie | garantía | garantia | гарантия |
| express (warranty) | 明示 | 明示 | 明示 | 명시적 | expresse | expresa | expressa | явный |
| implied (warranty) | 默示 | 默示 | 黙示 | 묵시적 | implicite | implícita | implícita | подразумеваемый |
| collect | 收集 | 蒐集/收集 | 収集 | 수집 | collecter | recopilar | coletar | собирать |
| process | 处理 | 處理 | 処理 | 처리 | traiter | tratar | processar | обрабатывать |
| store | 存储 | 儲存 | 保存 | 저장 | stocker | almacenar | armazenar | хранить |
| access (v.) | 访问 | 存取/訪問 | アクセス | 접근 | accéder à | acceder a | acessar | получать доступ |
| view | 查看 | 查看 | 閲覧 | 열람 | consulter | ver | ver | просматривать |
| upload | 上传 | 上傳 | アップロード | 업로드 | téléverser | subir | enviar para servidores | загружать |
| transmit | 传输 | 傳輸 | 送信/転送 | 전송 | transmettre | transmitir | transmitir | передавать |
| analytics | 分析数据 | 分析資料 | 分析データ | 분석 데이터 | données d'analyse | datos analíticos | dados analíticos | аналитические данные |
| parser | 解析器 | 解析器 | パーサー | 파서 | analyseur | analizador | analisador | парсер |
| third-party | 第三方 | 第三方 | サードパーティ | 제3자 | services tiers | servicios de terceros | serviços de terceiros | сторонние сервисы |
| liability | 责任 | 責任 | 責任 | 책임 | responsabilité | responsabilidad | responsabilidade | ответственность |
| loss | 损失 | 損失 | 損失 | 손실 | perte | pérdida | perda | потеря |
| site operator | 网站运营者 | 網站營運者 | サイト運営者 | 사이트 운영자 | exploitant | operador | operador | оператор |

## Rules applied in the current copy (do not regress)

1. **"as is" and "as available" are two concepts** — both must appear (e.g. zh 按现状并按可用状态, fr `tel quel et tel que disponible`, ru `«как есть» и по мере доступности`, ko `있는 그대로, 이용 가능한 상태로`). Never merge them into a single "as is".
2. **warranty must not become 担保/擔保** — use 保证/保證 (implied = 默示, never 暗示).
3. **process ≠ parse ≠ analyse.** Privacy policy talks about data *processing*; 处理/処理/처리. Reserve 解析/解析/파싱 for the parser itself.
4. **"seen by anyone" stays "anyone"** — the English source says *anyone*; do not narrow it to "we" in any language unless the English changes first.
5. **access/back up/recover/audit** (Terms §4) must all survive translation — never collapse them into "we don't view your data".
6. **"third-party request" reads as a network call to users** — prefer "third-party service" (第三方服务 / serviço de terceiros / …) in the privacy policy.
7. GA property ID `G-S1RYL7MXPJ`, `hi@json-tool.com`, storage keys and structure ids are never translated.
8. 繁體 uses 解析器 (not 剖析器) site-wide; Japanese privacy register uses お使いのブラウザ / 概要, not 自分のブラウザ / 短いまとめ.

## Adding a new legal page

1. Translate from English only; keep the heading from the Document titles table.
2. Match the wording in the Legal terms table word-for-word for the concepts above.
3. Keep both "as is" and "as available"; keep the absolute "anyone" scope; keep GA/email/ids byte-identical; include the consent-gating sentence that matches `privacy.html` section 2.
4. Verify structurally like every other page: 10 hreflang alternates, single active switcher link, root-absolute assets, canonical pointing at the locale URL.