/* Shared logic for the JSON Schema validation page (json-schema.html and its
   localized copies). This is a focused validator, not a full JSON Schema
   implementation: it covers the keywords most schemas actually use, and the page
   states which ones. Errors come out as { path, key, args } so the wording can be
   localized here rather than baked into the engine, which is exposed on
   window.JsonSchema for testing. */
(function () {
    'use strict';

    var I18N = {
        en: {
            charUnit: ' characters',
            needBoth: 'Paste a JSON document and a schema to validate.',
            invalidJson: 'The document is not valid JSON: ',
            invalidSchemaJson: 'The schema is not valid JSON: ',
            okHead: '✓ Valid',
            errHead: '✕ Invalid',
            validBody: 'The document conforms to the schema.',
            summary: '{n} problem(s) found',
            copyLabel: 'Copy report',
            copiedLabel: 'Copied!',
            copyFailLabel: '⚠️ Could not copy',
            downloadLabel: 'Download report',
            reportHeader: 'JSON Schema validation report',
            type: 'must be {expected}',
            const: 'must equal {expected}',
            enum: 'must be one of the allowed values',
            required: 'required property "{name}" is missing',
            additional: 'property "{name}" is not allowed',
            minProperties: 'must have at least {n} properties',
            maxProperties: 'must have at most {n} properties',
            minItems: 'must have at least {n} items',
            maxItems: 'must have at most {n} items',
            unique: 'items must be unique',
            minLength: 'must be at least {n} characters',
            maxLength: 'must be at most {n} characters',
            pattern: 'must match the pattern {pattern}',
            minimum: 'must be ≥ {n}',
            maximum: 'must be ≤ {n}',
            exclusiveMinimum: 'must be > {n}',
            exclusiveMaximum: 'must be < {n}',
            multipleOf: 'must be a multiple of {n}',
            anyOf: 'must match at least one of the {n} subschemas',
            oneOf: 'must match exactly one subschema, but matched {n}',
            not: 'must not match the schema',
            falseSchema: 'the schema is false, so nothing is valid here',
            ref: 'could not resolve {ref}',
            badPattern: 'the schema pattern is not a valid regular expression'
        },
        "es": {
            charUnit: " caracteres",
            needBoth: "Pega un documento JSON y un esquema para validar.",
            invalidJson: "El documento no es JSON válido: ",
            invalidSchemaJson: "El esquema no es JSON válido: ",
            okHead: "✓ Válido",
            errHead: "✕ No válido",
            validBody: "El documento cumple el esquema.",
            summary: "{n} problema(s) encontrado(s)",
            copyLabel: "Copiar informe",
            copiedLabel: "¡Copiado!",
            copyFailLabel: "⚠️ No se pudo copiar",
            downloadLabel: "Descargar informe",
            reportHeader: "Informe de validación de JSON Schema",
            type: "debe ser {expected}",
            const: "debe ser igual a {expected}",
            enum: "debe ser uno de los valores permitidos",
            required: "falta la propiedad requerida \"{name}\"",
            additional: "la propiedad \"{name}\" no está permitida",
            minProperties: "debe tener al menos {n} propiedades",
            maxProperties: "debe tener como máximo {n} propiedades",
            minItems: "debe tener al menos {n} elementos",
            maxItems: "debe tener como máximo {n} elementos",
            unique: "los elementos deben ser únicos",
            minLength: "debe tener al menos {n} caracteres",
            maxLength: "debe tener como máximo {n} caracteres",
            pattern: "debe coincidir con el patrón {pattern}",
            minimum: "debe ser ≥ {n}",
            maximum: "debe ser ≤ {n}",
            exclusiveMinimum: "debe ser > {n}",
            exclusiveMaximum: "debe ser < {n}",
            multipleOf: "debe ser múltiplo de {n}",
            anyOf: "debe coincidir con al menos uno de los {n} subesquemas",
            oneOf: "debe coincidir con exactamente un subesquema, pero coincidió con {n}",
            not: "no debe coincidir con el esquema",
            falseSchema: "el esquema es false, así que nada es válido aquí",
            ref: "no se pudo resolver {ref}",
            badPattern: "el patrón del esquema no es una expresión regular válida",
        },
        "fr": {
            charUnit: " caractères",
            needBoth: "Collez un document JSON et un schéma à valider.",
            invalidJson: "Le document n'est pas du JSON valide : ",
            invalidSchemaJson: "Le schéma n'est pas du JSON valide : ",
            okHead: "✓ Valide",
            errHead: "✕ Non valide",
            validBody: "Le document est conforme au schéma.",
            summary: "{n} problème(s) détecté(s)",
            copyLabel: "Copier le rapport",
            copiedLabel: "Copié !",
            copyFailLabel: "⚠️ Copie impossible",
            downloadLabel: "Télécharger le rapport",
            reportHeader: "Rapport de validation JSON Schema",
            type: "doit être de type {expected}",
            const: "doit être égal à {expected}",
            enum: "doit être l'une des valeurs autorisées",
            required: "la propriété requise « {name} » est absente",
            additional: "la propriété « {name} » n'est pas autorisée",
            minProperties: "doit contenir au moins {n} propriétés",
            maxProperties: "doit contenir au plus {n} propriétés",
            minItems: "doit contenir au moins {n} éléments",
            maxItems: "doit contenir au plus {n} éléments",
            unique: "les éléments doivent être uniques",
            minLength: "doit contenir au moins {n} caractères",
            maxLength: "doit contenir au plus {n} caractères",
            pattern: "doit correspondre au motif {pattern}",
            minimum: "doit être ≥ {n}",
            maximum: "doit être ≤ {n}",
            exclusiveMinimum: "doit être > {n}",
            exclusiveMaximum: "doit être < {n}",
            multipleOf: "doit être un multiple de {n}",
            anyOf: "doit correspondre à au moins un des {n} sous-schémas",
            oneOf: "doit correspondre à exactement un sous-schéma, mais {n} correspondent",
            not: "ne doit pas correspondre au schéma",
            falseSchema: "le schéma vaut false, donc rien n'est valide ici",
            ref: "impossible de résoudre {ref}",
            badPattern: "le motif du schéma n'est pas une expression régulière valide",
        },
        "ja": {
            charUnit: "文字",
            needBoth: "検証する JSON ドキュメントとスキーマを貼り付けてください。",
            invalidJson: "ドキュメントは有効なJSONではありません: ",
            invalidSchemaJson: "スキーマは有効なJSONではありません: ",
            okHead: "✓ 有効",
            errHead: "✕ 無効",
            validBody: "ドキュメントはスキーマに適合しています。",
            summary: "{n} 件の問題",
            copyLabel: "レポートをコピー",
            copiedLabel: "コピーしました！",
            copyFailLabel: "⚠️ コピーできませんでした",
            downloadLabel: "レポートをダウンロード",
            reportHeader: "JSON Schema 検証レポート",
            type: "型は {expected} である必要があります",
            const: "{expected} と等しい必要があります",
            enum: "許可された値のいずれかである必要があります",
            required: "必須プロパティ \"{name}\" がありません",
            additional: "プロパティ \"{name}\" は許可されていません",
            minProperties: "プロパティは {n} 個以上必要です",
            maxProperties: "プロパティは {n} 個以下である必要があります",
            minItems: "要素は {n} 個以上必要です",
            maxItems: "要素は {n} 個以下である必要があります",
            unique: "要素は一意である必要があります",
            minLength: "{n} 文字以上必要です",
            maxLength: "{n} 文字以下である必要があります",
            pattern: "パターン {pattern} に一致する必要があります",
            minimum: "{n} 以上である必要があります",
            maximum: "{n} 以下である必要があります",
            exclusiveMinimum: "{n} より大きい必要があります",
            exclusiveMaximum: "{n} より小さい必要があります",
            multipleOf: "{n} の倍数である必要があります",
            anyOf: "{n} 個のサブスキーマの少なくとも 1 つに一致する必要があります",
            oneOf: "ちょうど 1 つのサブスキーマに一致する必要がありますが、{n} 個に一致しました",
            not: "スキーマに一致してはいけません",
            falseSchema: "スキーマが false のため、ここでは何も有効ではありません",
            ref: "{ref} を解決できませんでした",
            badPattern: "スキーマのパターンが正しい正規表現ではありません",
        },
        "ko": {
            charUnit: "자",
            needBoth: "검증할 JSON 문서와 스키마를 붙여넣으세요.",
            invalidJson: "문서가 유효한 JSON이 아닙니다: ",
            invalidSchemaJson: "스키마가 유효한 JSON이 아닙니다: ",
            okHead: "✓ 유효",
            errHead: "✕ 유효하지 않음",
            validBody: "문서가 스키마를 만족합니다.",
            summary: "{n}개의 문제",
            copyLabel: "보고서 복사",
            copiedLabel: "복사됨!",
            copyFailLabel: "⚠️ 복사하지 못했습니다",
            downloadLabel: "보고서 다운로드",
            reportHeader: "JSON Schema 검증 보고서",
            type: "{expected} 형식이어야 합니다",
            const: "{expected}와 같아야 합니다",
            enum: "허용된 값 중 하나여야 합니다",
            required: "필수 속성 \"{name}\"이(가) 없습니다",
            additional: "속성 \"{name}\"은(는) 허용되지 않습니다",
            minProperties: "속성이 {n}개 이상이어야 합니다",
            maxProperties: "속성이 {n}개 이하여야 합니다",
            minItems: "항목이 {n}개 이상이어야 합니다",
            maxItems: "항목이 {n}개 이하여야 합니다",
            unique: "항목은 중복될 수 없습니다",
            minLength: "{n}자 이상이어야 합니다",
            maxLength: "{n}자 이하여야 합니다",
            pattern: "패턴 {pattern}과(와) 일치해야 합니다",
            minimum: "{n} 이상이어야 합니다",
            maximum: "{n} 이하여야 합니다",
            exclusiveMinimum: "{n}보다 커야 합니다",
            exclusiveMaximum: "{n}보다 작아야 합니다",
            multipleOf: "{n}의 배수여야 합니다",
            anyOf: "{n}개 하위 스키마 중 하나 이상과 일치해야 합니다",
            oneOf: "정확히 하나의 하위 스키마와 일치해야 하지만 {n}개와 일치했습니다",
            not: "스키마와 일치하면 안 됩니다",
            falseSchema: "스키마가 false이므로 여기서는 아무것도 유효하지 않습니다",
            ref: "{ref}을(를) 확인할 수 없습니다",
            badPattern: "스키마의 패턴이 올바른 정규식이 아닙니다",
        },
        "pt": {
            charUnit: " caracteres",
            needBoth: "Cole um documento JSON e um esquema para validar.",
            invalidJson: "O documento não é um JSON válido: ",
            invalidSchemaJson: "O esquema não é um JSON válido: ",
            okHead: "✓ Válido",
            errHead: "✕ Inválido",
            validBody: "O documento está em conformidade com o esquema.",
            summary: "{n} problema(s) encontrado(s)",
            copyLabel: "Copiar relatório",
            copiedLabel: "Copiado!",
            copyFailLabel: "⚠️ Não foi possível copiar",
            downloadLabel: "Baixar relatório",
            reportHeader: "Relatório de validação de JSON Schema",
            type: "deve ser {expected}",
            const: "deve ser igual a {expected}",
            enum: "deve ser um dos valores permitidos",
            required: "a propriedade obrigatória \"{name}\" está ausente",
            additional: "a propriedade \"{name}\" não é permitida",
            minProperties: "deve ter pelo menos {n} propriedades",
            maxProperties: "deve ter no máximo {n} propriedades",
            minItems: "deve ter pelo menos {n} itens",
            maxItems: "deve ter no máximo {n} itens",
            unique: "os itens devem ser únicos",
            minLength: "deve ter pelo menos {n} caracteres",
            maxLength: "deve ter no máximo {n} caracteres",
            pattern: "deve corresponder ao padrão {pattern}",
            minimum: "deve ser ≥ {n}",
            maximum: "deve ser ≤ {n}",
            exclusiveMinimum: "deve ser > {n}",
            exclusiveMaximum: "deve ser < {n}",
            multipleOf: "deve ser múltiplo de {n}",
            anyOf: "deve corresponder a pelo menos um dos {n} subesquemas",
            oneOf: "deve corresponder a exatamente um subesquema, mas correspondeu a {n}",
            not: "não deve corresponder ao esquema",
            falseSchema: "o esquema é false, então nada é válido aqui",
            ref: "não foi possível resolver {ref}",
            badPattern: "o padrão do esquema não é uma expressão regular válida",
        },
        "ru": {
            charUnit: " симв.",
            needBoth: "Вставьте документ JSON и схему для проверки.",
            invalidJson: "Документ не является допустимым JSON: ",
            invalidSchemaJson: "Схема не является допустимым JSON: ",
            okHead: "✓ Допустимо",
            errHead: "✕ Недопустимо",
            validBody: "Документ соответствует схеме.",
            summary: "найдено проблем: {n}",
            copyLabel: "Копировать отчёт",
            copiedLabel: "Скопировано!",
            copyFailLabel: "⚠️ Не удалось скопировать",
            downloadLabel: "Скачать отчёт",
            reportHeader: "Отчёт о проверке по JSON Schema",
            type: "должно быть {expected}",
            const: "должно быть равно {expected}",
            enum: "должно быть одним из допустимых значений",
            required: "отсутствует обязательное свойство \"{name}\"",
            additional: "свойство \"{name}\" не разрешено",
            minProperties: "должно быть не менее {n} свойств",
            maxProperties: "должно быть не более {n} свойств",
            minItems: "должно быть не менее {n} элементов",
            maxItems: "должно быть не более {n} элементов",
            unique: "элементы должны быть уникальными",
            minLength: "должно быть не менее {n} символов",
            maxLength: "должно быть не более {n} символов",
            pattern: "должно соответствовать шаблону {pattern}",
            minimum: "должно быть ≥ {n}",
            maximum: "должно быть ≤ {n}",
            exclusiveMinimum: "должно быть > {n}",
            exclusiveMaximum: "должно быть < {n}",
            multipleOf: "должно быть кратно {n}",
            anyOf: "должно соответствовать хотя бы одной из {n} подсхем",
            oneOf: "должно соответствовать ровно одной подсхеме, но соответствует {n}",
            not: "не должно соответствовать схеме",
            falseSchema: "схема равна false, поэтому здесь ничто не допустимо",
            ref: "не удалось разрешить {ref}",
            badPattern: "шаблон в схеме не является допустимым регулярным выражением",
        },
        "zh-Hans": {
            charUnit: "个字符",
            needBoth: "请粘贴要校验的 JSON 文档和 Schema。",
            invalidJson: "文档不是有效的 JSON: ",
            invalidSchemaJson: "Schema 不是有效的 JSON: ",
            okHead: "✓ 通过",
            errHead: "✕ 未通过",
            validBody: "文档符合该 Schema。",
            summary: "发现 {n} 个问题",
            copyLabel: "复制报告",
            copiedLabel: "已复制！",
            copyFailLabel: "⚠️ 无法复制",
            downloadLabel: "下载报告",
            reportHeader: "JSON Schema 校验报告",
            type: "必须是 {expected}",
            const: "必须等于 {expected}",
            enum: "必须是允许的值之一",
            required: "缺少必需属性 \"{name}\"",
            additional: "不允许出现属性 \"{name}\"",
            minProperties: "至少需要 {n} 个属性",
            maxProperties: "最多只能有 {n} 个属性",
            minItems: "至少需要 {n} 个元素",
            maxItems: "最多只能有 {n} 个元素",
            unique: "元素必须唯一",
            minLength: "至少需要 {n} 个字符",
            maxLength: "最多只能有 {n} 个字符",
            pattern: "必须匹配模式 {pattern}",
            minimum: "必须 ≥ {n}",
            maximum: "必须 ≤ {n}",
            exclusiveMinimum: "必须 > {n}",
            exclusiveMaximum: "必须 < {n}",
            multipleOf: "必须是 {n} 的倍数",
            anyOf: "必须匹配 {n} 个子 Schema 中的至少一个",
            oneOf: "必须恰好匹配一个子 Schema，但匹配了 {n} 个",
            not: "不能匹配该 Schema",
            falseSchema: "Schema 为 false，所以此处任何内容都不合法",
            ref: "无法解析 {ref}",
            badPattern: "Schema 中的 pattern 不是有效的正则表达式",
        },
        "zh-Hant": {
            charUnit: "個字元",
            needBoth: "請貼上要驗證的 JSON 文件與 Schema。",
            invalidJson: "文件不是有效的 JSON: ",
            invalidSchemaJson: "Schema 不是有效的 JSON: ",
            okHead: "✓ 通過",
            errHead: "✕ 未通過",
            validBody: "文件符合該 Schema。",
            summary: "發現 {n} 個問題",
            copyLabel: "複製報告",
            copiedLabel: "已複製！",
            copyFailLabel: "⚠️ 無法複製",
            downloadLabel: "下載報告",
            reportHeader: "JSON Schema 驗證報告",
            type: "必須是 {expected}",
            const: "必須等於 {expected}",
            enum: "必須是允許的值之一",
            required: "缺少必要屬性 \"{name}\"",
            additional: "不允許出現屬性 \"{name}\"",
            minProperties: "至少需要 {n} 個屬性",
            maxProperties: "最多只能有 {n} 個屬性",
            minItems: "至少需要 {n} 個元素",
            maxItems: "最多只能有 {n} 個元素",
            unique: "元素必須唯一",
            minLength: "至少需要 {n} 個字元",
            maxLength: "最多只能有 {n} 個字元",
            pattern: "必須符合模式 {pattern}",
            minimum: "必須 ≥ {n}",
            maximum: "必須 ≤ {n}",
            exclusiveMinimum: "必須 > {n}",
            exclusiveMaximum: "必須 < {n}",
            multipleOf: "必須是 {n} 的倍數",
            anyOf: "必須符合 {n} 個子 Schema 中的至少一個",
            oneOf: "必須恰好符合一個子 Schema，但符合了 {n} 個",
            not: "不能符合該 Schema",
            falseSchema: "Schema 為 false，因此此處任何內容都不合法",
            ref: "無法解析 {ref}",
            badPattern: "Schema 中的 pattern 不是有效的正規表示式",
        }
    };

    function currentLang() {
        var tag = (document.documentElement.getAttribute('lang') || 'en').toLowerCase();
        if (tag.indexOf('zh') === 0) return tag.indexOf('hant') !== -1 ? 'zh-Hant' : 'zh-Hans';
        tag = tag.split('-')[0];
        return I18N[tag] ? tag : 'en';
    }

    var T = I18N[currentLang()];

    function fill(tpl, args) {
        return tpl.replace(/\{(\w+)\}/g, function (_, key) { return args[key]; });
    }

    // ---------------------------------------------------------------- core ----

    function typeOf(value) {
        if (value === null) return 'null';
        if (Array.isArray(value)) return 'array';
        return typeof value;
    }

    function isPlainObject(value) {
        return value !== null && typeof value === 'object' && !Array.isArray(value);
    }

    function deepEqual(a, b) {
        if (a === b) return true;
        var ta = typeOf(a);
        if (ta !== typeOf(b)) return false;
        if (ta === 'array') {
            if (a.length !== b.length) return false;
            for (var i = 0; i < a.length; i++) if (!deepEqual(a[i], b[i])) return false;
            return true;
        }
        if (ta === 'object') {
            var ka = Object.keys(a), kb = Object.keys(b);
            if (ka.length !== kb.length) return false;
            for (var j = 0; j < ka.length; j++) {
                if (!Object.prototype.hasOwnProperty.call(b, ka[j])) return false;
                if (!deepEqual(a[ka[j]], b[ka[j]])) return false;
            }
            return true;
        }
        // NaN is not representable in JSON, so a plain compare is enough here.
        return false;
    }

    function joinKey(parent, key) {
        if (/^[A-Za-z_$][\w$]*$/.test(key)) return parent + '.' + key;
        return parent + '[' + JSON.stringify(key) + ']';
    }

    function typeMatches(value, want) {
        var actual = typeOf(value);
        if (want === 'integer') return actual === 'number' && Number.isInteger(value);
        if (want === 'number') return actual === 'number';
        return actual === want;
    }

    /* Resolve a local JSON Pointer reference like "#/$defs/address" against the
       root schema. Remote references are not supported. */
    function resolvePointer(root, ref) {
        if (ref.charAt(0) !== '#') return undefined;
        var path = ref.slice(1);
        if (path === '') return root;
        if (path.charAt(0) !== '/') return undefined;
        var parts = path.slice(1).split('/').map(function (p) {
            return decodeURIComponent(p).replace(/~1/g, '/').replace(/~0/g, '~');
        });
        var node = root;
        for (var i = 0; i < parts.length; i++) {
            if (node === null || typeof node !== 'object') return undefined;
            node = node[parts[i]];
        }
        return node;
    }

    var MAX_DEPTH = 200;

    function check(instance, schema, path, errors, root, depth) {
        if (depth > MAX_DEPTH) return;

        if (schema === true || schema === undefined) return;
        if (schema === false) {
            errors.push({ path: path, key: 'falseSchema', args: {} });
            return;
        }
        if (!isPlainObject(schema)) return;

        if (typeof schema.$ref === 'string') {
            var target = resolvePointer(root, schema.$ref);
            if (target === undefined) {
                errors.push({ path: path, key: 'ref', args: { ref: schema.$ref } });
                return;
            }
            check(instance, target, path, errors, root, depth + 1);
            return;
        }

        if (schema.type !== undefined) {
            var wanted = Array.isArray(schema.type) ? schema.type : [schema.type];
            var ok = wanted.some(function (t) { return typeMatches(instance, t); });
            if (!ok) {
                errors.push({ path: path, key: 'type', args: { expected: wanted.join(' or ') } });
                return; // further keywords would only pile on
            }
        }

        if (schema.const !== undefined && !deepEqual(instance, schema.const)) {
            errors.push({ path: path, key: 'const', args: { expected: JSON.stringify(schema.const) } });
        }

        if (Array.isArray(schema.enum)) {
            var inEnum = schema.enum.some(function (v) { return deepEqual(instance, v); });
            if (!inEnum) errors.push({ path: path, key: 'enum', args: {} });
        }

        if (typeof instance === 'string') {
            var len = Array.from(instance).length;
            if (typeof schema.minLength === 'number' && len < schema.minLength) {
                errors.push({ path: path, key: 'minLength', args: { n: schema.minLength } });
            }
            if (typeof schema.maxLength === 'number' && len > schema.maxLength) {
                errors.push({ path: path, key: 'maxLength', args: { n: schema.maxLength } });
            }
            if (typeof schema.pattern === 'string') {
                try {
                    if (!new RegExp(schema.pattern).test(instance)) {
                        errors.push({ path: path, key: 'pattern', args: { pattern: schema.pattern } });
                    }
                } catch (err) {
                    errors.push({ path: path, key: 'badPattern', args: {} });
                }
            }
        }

        if (typeof instance === 'number') {
            if (typeof schema.minimum === 'number' && instance < schema.minimum) {
                errors.push({ path: path, key: 'minimum', args: { n: schema.minimum } });
            }
            if (typeof schema.maximum === 'number' && instance > schema.maximum) {
                errors.push({ path: path, key: 'maximum', args: { n: schema.maximum } });
            }
            if (typeof schema.exclusiveMinimum === 'number' && instance <= schema.exclusiveMinimum) {
                errors.push({ path: path, key: 'exclusiveMinimum', args: { n: schema.exclusiveMinimum } });
            }
            if (typeof schema.exclusiveMaximum === 'number' && instance >= schema.exclusiveMaximum) {
                errors.push({ path: path, key: 'exclusiveMaximum', args: { n: schema.exclusiveMaximum } });
            }
            if (typeof schema.multipleOf === 'number' && schema.multipleOf > 0) {
                var q = instance / schema.multipleOf;
                if (Math.abs(q - Math.round(q)) > 1e-9) {
                    errors.push({ path: path, key: 'multipleOf', args: { n: schema.multipleOf } });
                }
            }
        }

        if (Array.isArray(instance)) {
            if (typeof schema.minItems === 'number' && instance.length < schema.minItems) {
                errors.push({ path: path, key: 'minItems', args: { n: schema.minItems } });
            }
            if (typeof schema.maxItems === 'number' && instance.length > schema.maxItems) {
                errors.push({ path: path, key: 'maxItems', args: { n: schema.maxItems } });
            }
            if (schema.uniqueItems === true) {
                for (var i = 0; i < instance.length && errors.length < 1e4; i++) {
                    for (var j = i + 1; j < instance.length; j++) {
                        if (deepEqual(instance[i], instance[j])) {
                            errors.push({ path: path, key: 'unique', args: {} });
                            i = instance.length; // stop
                            break;
                        }
                    }
                }
            }
            if (Array.isArray(schema.items)) {
                for (var k = 0; k < instance.length && k < schema.items.length; k++) {
                    check(instance[k], schema.items[k], path + '[' + k + ']', errors, root, depth + 1);
                }
            } else if (schema.items !== undefined) {
                for (var m = 0; m < instance.length; m++) {
                    check(instance[m], schema.items, path + '[' + m + ']', errors, root, depth + 1);
                }
            }
        }

        if (isPlainObject(instance)) {
            var keys = Object.keys(instance);
            if (typeof schema.minProperties === 'number' && keys.length < schema.minProperties) {
                errors.push({ path: path, key: 'minProperties', args: { n: schema.minProperties } });
            }
            if (typeof schema.maxProperties === 'number' && keys.length > schema.maxProperties) {
                errors.push({ path: path, key: 'maxProperties', args: { n: schema.maxProperties } });
            }
            if (Array.isArray(schema.required)) {
                schema.required.forEach(function (name) {
                    if (!Object.prototype.hasOwnProperty.call(instance, name)) {
                        errors.push({ path: path, key: 'required', args: { name: name } });
                    }
                });
            }
            var props = isPlainObject(schema.properties) ? schema.properties : {};
            keys.forEach(function (key) {
                var childPath = joinKey(path, key);
                if (Object.prototype.hasOwnProperty.call(props, key)) {
                    check(instance[key], props[key], childPath, errors, root, depth + 1);
                } else if (schema.additionalProperties === false) {
                    errors.push({ path: childPath, key: 'additional', args: { name: key } });
                } else if (isPlainObject(schema.additionalProperties)) {
                    check(instance[key], schema.additionalProperties, childPath, errors, root, depth + 1);
                }
            });
        }

        if (Array.isArray(schema.allOf)) {
            schema.allOf.forEach(function (sub) {
                check(instance, sub, path, errors, root, depth + 1);
            });
        }
        if (Array.isArray(schema.anyOf)) {
            var anyOk = schema.anyOf.some(function (sub) {
                return collect(instance, sub, root, depth + 1).length === 0;
            });
            if (!anyOk) {
                errors.push({ path: path, key: 'anyOf', args: { n: schema.anyOf.length } });
            }
        }
        if (Array.isArray(schema.oneOf)) {
            var matches = schema.oneOf.filter(function (sub) {
                return collect(instance, sub, root, depth + 1).length === 0;
            }).length;
            if (matches !== 1) {
                errors.push({ path: path, key: 'oneOf', args: { n: matches } });
            }
        }
        if (schema.not !== undefined) {
            if (collect(instance, schema.not, root, depth + 1).length === 0) {
                errors.push({ path: path, key: 'not', args: {} });
            }
        }
    }

    function collect(instance, schema, root, depth) {
        var errors = [];
        check(instance, schema, '$', errors, root, depth || 0);
        return errors;
    }

    function validate(instance, schema) {
        return collect(instance, schema, schema, 0);
    }

    function formatError(err) {
        var tpl = T[err.key] || err.key;
        return fill(tpl, err.args || {});
    }

    function formatReport(errors) {
        return errors.map(function (e) { return e.path + ': ' + formatError(e); }).join('\n');
    }

    window.JsonSchema = {
        validate: validate,
        formatError: formatError,
        formatReport: formatReport
    };

    // -------------------------------------------------------------- wiring ----

    var mode = document.body ? document.body.getAttribute('data-schema-mode') : null;
    if (mode !== 'validate') return;

    var instanceInput = document.getElementById('instanceInput');
    var schemaInput = document.getElementById('schemaInput');
    if (!instanceInput || !schemaInput) return;

    var result = document.getElementById('result');
    var list = document.getElementById('issueList');
    var instanceCount = document.getElementById('instanceCount');
    var schemaCount = document.getElementById('schemaCount');
    var validateBtn = document.getElementById('validateBtn');
    var exampleBtn = document.getElementById('exampleBtn');
    var clearBtn = document.getElementById('clearBtn');
    var copyBtn = document.getElementById('copyBtn');
    var downloadBtn = document.getElementById('downloadBtn');
    var lastReport = '';

    var EXAMPLE = {
        schema: {
            "$schema": "https://json-schema.org/draft/2020-12/schema",
            "title": "Person",
            "type": "object",
            "required": ["name", "age"],
            "properties": {
                "name": { "type": "string", "minLength": 1 },
                "age": { "type": "integer", "minimum": 0, "maximum": 130 },
                "email": { "type": "string", "pattern": "^[^@]+@[^@]+$" },
                "tags": { "type": "array", "items": { "type": "string" }, "uniqueItems": true }
            },
            "additionalProperties": false
        },
        instance: {
            "name": "Ada",
            "age": 36,
            "email": "ada@example.com",
            "tags": ["math", "math"]
        }
    };

    function paintCounts() {
        instanceCount.textContent = instanceInput.value.length + T.charUnit;
        schemaCount.textContent = schemaInput.value.length + T.charUnit;
    }

    function updateActions() {
        var has = !!lastReport;
        copyBtn.disabled = !has;
        downloadBtn.disabled = !has;
    }

    function setHead(ok, bodyText) {
        result.className = 'result show ' + (ok ? 'valid' : 'invalid');
        result.textContent = '';
        var strong = document.createElement('strong');
        strong.textContent = ok ? T.okHead : T.errHead;
        result.appendChild(strong);
        var span = document.createElement('span');
        span.textContent = bodyText;
        result.appendChild(span);
    }

    function clearAll() {
        list.innerHTML = '';
        lastReport = '';
        result.className = 'result';
        result.textContent = '';
        updateActions();
    }

    function validateNow() {
        paintCounts();
        var docText = instanceInput.value.trim();
        var schemaText = schemaInput.value.trim();
        clearAll();
        if (!docText || !schemaText) {
            setHead(false, T.needBoth);
            return;
        }

        var instance;
        var schema;
        try {
            instance = JSON.parse(docText);
        } catch (e) {
            setHead(false, T.invalidJson + e.message);
            return;
        }
        try {
            schema = JSON.parse(schemaText);
        } catch (e) {
            setHead(false, T.invalidSchemaJson + e.message);
            return;
        }

        var errors = validate(instance, schema);
        if (errors.length === 0) {
            setHead(true, T.validBody);
            return;
        }

        setHead(false, fill(T.summary, { n: errors.length }));

        errors.forEach(function (err) {
            var item = document.createElement('div');
            item.className = 'issue-item';
            var path = document.createElement('code');
            path.className = 'issue-path';
            path.textContent = err.path;
            item.appendChild(path);
            var msg = document.createElement('span');
            msg.className = 'issue-message';
            msg.textContent = formatError(err);
            item.appendChild(msg);
            list.appendChild(item);
        });

        lastReport = T.reportHeader + '\n' + formatReport(errors);
        updateActions();
    }

    validateBtn.addEventListener('click', validateNow);
    instanceInput.addEventListener('input', function () { paintCounts(); clearAll(); });
    schemaInput.addEventListener('input', function () { paintCounts(); clearAll(); });
    [instanceInput, schemaInput].forEach(function (el) {
        el.addEventListener('keydown', function (e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                validateNow();
            }
        });
    });

    exampleBtn.addEventListener('click', function () {
        instanceInput.value = JSON.stringify(EXAMPLE.instance, null, 2);
        schemaInput.value = JSON.stringify(EXAMPLE.schema, null, 2);
        validateNow();
    });

    clearBtn.addEventListener('click', function () {
        instanceInput.value = '';
        schemaInput.value = '';
        clearAll();
        paintCounts();
        instanceInput.focus();
    });

    copyBtn.addEventListener('click', function () {
        if (!lastReport) return;
        var btn = this;
        navigator.clipboard.writeText(lastReport).then(function () {
            btn.textContent = T.copiedLabel;
            setTimeout(function () { btn.textContent = T.copyLabel; }, 1400);
        }).catch(function () {
            btn.textContent = T.copyFailLabel;
            setTimeout(function () { btn.textContent = T.copyLabel; }, 1800);
        });
    });

    downloadBtn.addEventListener('click', function () {
        if (!lastReport) return;
        var blob = new Blob([lastReport], { type: 'text/plain' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'schema-validation.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    paintCounts();
    updateActions();
})();