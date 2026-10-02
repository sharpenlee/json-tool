/* Shared logic for the JSON <-> CSV converter pages (json-to-csv.html and
   csv-to-json.html at the site root, plus their localized copies). Each page
   sets data-csv-mode on <body> to say which direction it runs, and carries its
   own visible copy in the markup; only the dynamic messages are looked up here,
   keyed by the page's <html lang>. The pure converters are exposed on
   window.CsvTool so they can be tested and reused. */
(function () {
    'use strict';

    var I18N = {
        en: {
            charUnit: ' characters',
            invalidJson: 'Invalid JSON: ',
            needArray: 'The top level must be an array — of objects, or of rows.',
            okHead: '✓ Converted',
            errHead: '✕ Could not convert',
            resultCsv: '✓ Converted — rows: {rows} · columns: {cols}',
            resultJson: '✓ Converted — objects: {rows}',
            copiedLabel: 'Copied!',
            copyLabel: 'Copy',
            copyFailLabel: '⚠️ Could not copy',
            columnPrefix: 'column'
        },
        es: {
            charUnit: ' caracteres',
            invalidJson: 'JSON no válido: ',
            needArray: 'El nivel superior debe ser un array: de objetos o de filas.',
            okHead: '✓ Convertido',
            errHead: '✕ No se pudo convertir',
            resultCsv: '✓ Convertido — filas: {rows} · columnas: {cols}',
            resultJson: '✓ Convertido — objetos: {rows}',
            copiedLabel: '¡Copiado!',
            copyLabel: 'Copiar',
            copyFailLabel: '⚠️ No se pudo copiar',
            columnPrefix: 'columna'
        },
        fr: {
            charUnit: ' caractères',
            invalidJson: 'JSON non valide : ',
            needArray: 'Le niveau supérieur doit être un tableau — d\'objets ou de lignes.',
            okHead: '✓ Converti',
            errHead: '✕ Conversion impossible',
            resultCsv: '✓ Converti — lignes : {rows} · colonnes : {cols}',
            resultJson: '✓ Converti — objets : {rows}',
            copiedLabel: 'Copié !',
            copyLabel: 'Copier',
            copyFailLabel: '⚠️ Copie impossible',
            columnPrefix: 'colonne'
        },
        ja: {
            charUnit: '文字',
            invalidJson: '無効なJSON: ',
            needArray: '最上位は配列（オブジェクトまたは行の配列）である必要があります。',
            okHead: '✓ 変換しました',
            errHead: '✕ 変換できませんでした',
            resultCsv: '✓ 変換しました — 行: {rows} · 列: {cols}',
            resultJson: '✓ 変換しました — オブジェクト: {rows}',
            copiedLabel: 'コピーしました！',
            copyLabel: 'コピー',
            copyFailLabel: '⚠️ コピーできませんでした',
            columnPrefix: '列'
        },
        ko: {
            charUnit: '자',
            invalidJson: '잘못된 JSON: ',
            needArray: '최상위는 배열(객체 또는 행)이어야 합니다.',
            okHead: '✓ 변환됨',
            errHead: '✕ 변환할 수 없음',
            resultCsv: '✓ 변환됨 — 행: {rows} · 열: {cols}',
            resultJson: '✓ 변환됨 — 객체: {rows}',
            copiedLabel: '복사됨!',
            copyLabel: '복사',
            copyFailLabel: '⚠️ 복사하지 못했습니다',
            columnPrefix: '열'
        },
        pt: {
            charUnit: ' caracteres',
            invalidJson: 'JSON inválido: ',
            needArray: 'O nível superior deve ser um array — de objetos ou de linhas.',
            okHead: '✓ Convertido',
            errHead: '✕ Não foi possível converter',
            resultCsv: '✓ Convertido — linhas: {rows} · colunas: {cols}',
            resultJson: '✓ Convertido — objetos: {rows}',
            copiedLabel: 'Copiado!',
            copyLabel: 'Copiar',
            copyFailLabel: '⚠️ Não foi possível copiar',
            columnPrefix: 'coluna'
        },
        ru: {
            charUnit: ' симв.',
            invalidJson: 'Недопустимый JSON: ',
            needArray: 'Верхний уровень должен быть массивом — объектов или строк.',
            okHead: '✓ Преобразовано',
            errHead: '✕ Не удалось преобразовать',
            resultCsv: '✓ Преобразовано — строк: {rows} · столбцов: {cols}',
            resultJson: '✓ Преобразовано — объектов: {rows}',
            copiedLabel: 'Скопировано!',
            copyLabel: 'Копировать',
            copyFailLabel: '⚠️ Не удалось скопировать',
            columnPrefix: 'столбец'
        },
        'zh-Hans': {
            charUnit: '个字符',
            invalidJson: '无效的 JSON: ',
            needArray: '顶层必须是数组——对象数组或行数组。',
            okHead: '✓ 已转换',
            errHead: '✕ 无法转换',
            resultCsv: '✓ 已转换 — 行：{rows} · 列：{cols}',
            resultJson: '✓ 已转换 — 对象：{rows}',
            copiedLabel: '已复制！',
            copyLabel: '复制',
            copyFailLabel: '⚠️ 无法复制',
            columnPrefix: '列'
        },
        'zh-Hant': {
            charUnit: '個字元',
            invalidJson: '無效的 JSON: ',
            needArray: '頂層必須是陣列——物件陣列或列陣列。',
            okHead: '✓ 已轉換',
            errHead: '✕ 無法轉換',
            resultCsv: '✓ 已轉換 — 列：{rows} · 欄：{cols}',
            resultJson: '✓ 已轉換 — 物件：{rows}',
            copiedLabel: '已複製！',
            copyLabel: '複製',
            copyFailLabel: '⚠️ 無法複製',
            columnPrefix: '欄'
        }
    };

    function currentLang() {
        var tag = (document.documentElement.getAttribute('lang') || 'en').toLowerCase();
        if (tag.indexOf('zh') === 0) return tag.indexOf('hant') !== -1 ? 'zh-Hant' : 'zh-Hans';
        tag = tag.split('-')[0];
        return I18N[tag] ? tag : 'en';
    }

    var T = I18N[currentLang()];

    function fill(tpl, values) {
        return tpl.replace(/\{(\w+)\}/g, function (_, key) {
            return values[key];
        });
    }

    // ---------------------------------------------------------------- core ----

    function cellToString(value) {
        if (value === null || value === undefined) return '';
        if (typeof value === 'object') return JSON.stringify(value);
        return String(value);
    }

    function needsQuote(field, delim) {
        return field.indexOf(delim) !== -1 ||
            field.indexOf('"') !== -1 ||
            field.indexOf('\n') !== -1 ||
            field.indexOf('\r') !== -1 ||
            /^\s|\s$/.test(field);
    }

    function escapeCell(value, delim) {
        var s = cellToString(value);
        if (needsQuote(s, delim)) return '"' + s.replace(/"/g, '""') + '"';
        return s;
    }

    /* JSON value -> CSV text. Accepts an array of objects (column names come
       from the keys), an array of arrays (used as rows verbatim), a single
       object (one row) or an array of scalars (one column). Nested objects and
       arrays are written out as compact JSON, since CSV has no nesting. */
    function jsonToCsv(data, options) {
        var opts = options || {};
        var delim = opts.delimiter || ',';
        var includeHeader = opts.header !== false;

        if (data === null || typeof data !== 'object') {
            throw new Error('needArray');
        }

        var rows = Array.isArray(data) ? data : [data];
        if (rows.length === 0) return '';

        var allArrays = rows.every(function (row) { return Array.isArray(row); });
        if (allArrays) {
            return rows.map(function (row) {
                return row.map(function (cell) { return escapeCell(cell, delim); }).join(delim);
            }).join('\r\n');
        }

        var headers = [];
        var seen = {};
        rows.forEach(function (row) {
            if (row && typeof row === 'object' && !Array.isArray(row)) {
                Object.keys(row).forEach(function (key) {
                    if (!Object.prototype.hasOwnProperty.call(seen, key)) {
                        seen[key] = true;
                        headers.push(key);
                    }
                });
            }
        });

        if (headers.length === 0) {
            return rows.map(function (row) { return escapeCell(row, delim); }).join('\r\n');
        }

        var lines = [];
        if (includeHeader) {
            lines.push(headers.map(function (h) { return escapeCell(h, delim); }).join(delim));
        }
        rows.forEach(function (row) {
            lines.push(headers.map(function (h) {
                var value = (row && typeof row === 'object') ? row[h] : undefined;
                return escapeCell(value, delim);
            }).join(delim));
        });
        return lines.join('\r\n');
    }

    /* RFC 4180 reader: handles quoted fields, doubled quotes inside them, embedded
       delimiters and newlines, and both CRLF and LF line endings. */
    function parseCsv(text, delim) {
        var rows = [];
        var row = [];
        var field = '';
        var inQuotes = false;
        var started = false;
        var i = 0;
        while (i < text.length) {
            var c = text.charAt(i);
            if (inQuotes) {
                if (c === '"') {
                    if (text.charAt(i + 1) === '"') { field += '"'; i += 2; continue; }
                    inQuotes = false; i += 1; continue;
                }
                field += c; i += 1; continue;
            }
            if (c === '"') { inQuotes = true; started = true; i += 1; continue; }
            if (c === delim) { row.push(field); field = ''; started = false; i += 1; continue; }
            if (c === '\r' || c === '\n') {
                row.push(field); field = ''; rows.push(row); row = []; started = false;
                i += (c === '\r' && text.charAt(i + 1) === '\n') ? 2 : 1;
                continue;
            }
            field += c; started = true; i += 1;
        }
        if (started || field !== '' || row.length) { row.push(field); rows.push(row); }
        return rows;
    }

    function coerce(value, detectTypes) {
        if (!detectTypes) return value === undefined ? '' : value;
        if (value === '') return null;
        if (/^-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?$/.test(value)) return Number(value);
        if (value === 'true') return true;
        if (value === 'false') return false;
        if (value === 'null') return null;
        return value;
    }

    /* CSV text -> array of objects, the inverse of the reader above. Type
       detection is opt-in: it only converts to a number when the text has no
       leading zero, so codes like "007" and "0123" stay strings. */
    function csvToJson(text, options) {
        var opts = options || {};
        if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1); // strip a UTF-8 BOM
        var delim = opts.delimiter || ',';
        if (/^\s*$/.test(text)) return [];

        var rows = parseCsv(text, delim);
        if (rows.length === 0) return [];

        var used = {};
        var headers = rows[0].map(function (name, idx) {
            var base = name === '' ? T.columnPrefix + ' ' + (idx + 1) : name;
            var unique = base;
            var n = 2;
            while (Object.prototype.hasOwnProperty.call(used, unique)) {
                unique = base + '_' + n;
                n += 1;
            }
            used[unique] = true;
            return unique;
        });

        var out = [];
        for (var r = 1; r < rows.length; r++) {
            var obj = {};
            for (var c = 0; c < headers.length; c++) {
                obj[headers[c]] = coerce(rows[r][c], opts.detectTypes);
            }
            out.push(obj);
        }
        return out;
    }

    window.CsvTool = {
        jsonToCsv: jsonToCsv,
        csvToJson: csvToJson,
        parseCsv: parseCsv
    };

    // -------------------------------------------------------------- wiring ----

    var mode = document.body ? document.body.getAttribute('data-csv-mode') : null;
    if (mode !== 'to-csv' && mode !== 'to-json') return;

    var input = document.getElementById('csvInput');
    var output = document.getElementById('csvOutput');
    if (!input || !output) return;

    var outputWrap = document.getElementById('outputWrap');
    var inputCount = document.getElementById('inputCount');
    var outputCount = document.getElementById('outputCount');
    var result = document.getElementById('result');
    var stats = document.getElementById('stats');
    var delimSelect = document.getElementById('delimiterSelect');
    var headerToggle = document.getElementById('headerToggle');
    var typeToggle = document.getElementById('typeToggle');
    var bomToggle = document.getElementById('bomToggle');
    var convertBtn = document.getElementById('convertBtn');
    var exampleBtn = document.getElementById('exampleBtn');
    var clearBtn = document.getElementById('clearBtn');
    var copyBtn = document.getElementById('copyBtn');
    var downloadBtn = document.getElementById('downloadBtn');
    var lastOutput = ''; // exact text (keeps CRLF, which a textarea would normalise to LF)

    function delimiter() {
        if (!delimSelect) return ',';
        return delimSelect.value === 'tab' ? '\t' : delimSelect.value;
    }

    function paintCounts() {
        inputCount.textContent = input.value.length + T.charUnit;
        outputCount.textContent = output.value.length + T.charUnit;
    }

    function updateActions() {
        var has = !!lastOutput;
        copyBtn.disabled = !has;
        downloadBtn.disabled = !has;
    }

    function clearResult() {
        result.className = 'result';
        result.textContent = '';
    }

    function showInvalid(head, text) {
        result.className = 'result show invalid';
        result.textContent = '';
        var strong = document.createElement('strong');
        strong.textContent = head;
        result.appendChild(strong);
        var span = document.createElement('span');
        span.textContent = text;
        result.appendChild(span);
    }

    function convert() {
        paintCounts();
        var text = input.value;
        if (!text.trim()) {
            lastOutput = '';
            output.value = '';
            outputWrap.hidden = true;
            stats.innerHTML = '';
            clearResult();
            updateActions();
            return;
        }

        var outText;
        var statRows;
        try {
            if (mode === 'to-csv') {
                var parsed;
                try {
                    parsed = JSON.parse(text);
                } catch (e) {
                    lastOutput = '';
                    output.value = '';
                    outputWrap.hidden = true;
                    stats.innerHTML = '';
                    showInvalid(T.errHead, T.invalidJson + e.message);
                    updateActions();
                    return;
                }
                if (parsed === null || typeof parsed !== 'object') {
                    throw new Error('not-an-object');
                }
                outText = jsonToCsv(parsed, { delimiter: delimiter(), header: headerToggle ? headerToggle.checked : true });
                var rowCount = Array.isArray(parsed) ? parsed.length : 1;
                var colCount = (outText ? outText.split('\r\n')[0].split(delimiter()).length : 0);
                statRows = [['rows', rowCount], ['columns', colCount]];
                result.className = 'result show valid';
                result.textContent = '';
                var ok = document.createElement('strong');
                ok.textContent = T.okHead;
                result.appendChild(ok);
                var body = document.createElement('span');
                body.textContent = fill(T.resultCsv, { rows: rowCount, cols: colCount });
                result.appendChild(body);
            } else {
                var objects = csvToJson(text, { delimiter: delimiter(), detectTypes: typeToggle ? typeToggle.checked : false });
                outText = JSON.stringify(objects, null, 2);
                statRows = [['rows', objects.length]];
                result.className = 'result show valid';
                result.textContent = '';
                var ok2 = document.createElement('strong');
                ok2.textContent = T.okHead;
                result.appendChild(ok2);
                var body2 = document.createElement('span');
                body2.textContent = fill(T.resultJson, { rows: objects.length });
                result.appendChild(body2);
            }
        } catch (e) {
            lastOutput = '';
            output.value = '';
            outputWrap.hidden = true;
            stats.innerHTML = '';
            showInvalid(T.errHead, e.message === 'needArray' || e.message === 'not-an-object' ? T.needArray : e.message);
            updateActions();
            return;
        }

        lastOutput = outText;
        output.value = outText;
        outputWrap.hidden = false;
        stats.innerHTML = '';
        statRows.forEach(function (row, idx) {
            if (idx) stats.appendChild(document.createTextNode(' · '));
            var span = document.createElement('span');
            span.appendChild(document.createTextNode(row[0] + ' '));
            var b = document.createElement('b');
            b.textContent = row[1];
            span.appendChild(b);
            stats.appendChild(span);
        });
        paintCounts();
        updateActions();
    }

    convertBtn.addEventListener('click', convert);
    input.addEventListener('input', paintCounts);
    input.addEventListener('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            convert();
        }
    });
    if (delimSelect) delimSelect.addEventListener('change', function () { if (input.value.trim()) convert(); });
    if (headerToggle) headerToggle.addEventListener('change', function () { if (input.value.trim()) convert(); });
    if (typeToggle) typeToggle.addEventListener('change', function () { if (input.value.trim()) convert(); });

    exampleBtn.addEventListener('click', function () {
        input.value = exampleBtn.getAttribute('data-example') || '';
        convert();
        input.focus();
    });

    clearBtn.addEventListener('click', function () {
        input.value = '';
        lastOutput = '';
        output.value = '';
        outputWrap.hidden = true;
        stats.innerHTML = '';
        clearResult();
        paintCounts();
        updateActions();
        input.focus();
    });

    copyBtn.addEventListener('click', function () {
        if (!lastOutput) return;
        var btn = this;
        navigator.clipboard.writeText(lastOutput).then(function () {
            btn.textContent = T.copiedLabel;
            setTimeout(function () { btn.textContent = T.copyLabel; }, 1400);
        }).catch(function () {
            btn.textContent = T.copyFailLabel;
            setTimeout(function () { btn.textContent = T.copyLabel; }, 1800);
        });
    });

    downloadBtn.addEventListener('click', function () {
        if (!lastOutput) return;
        var isCsv = mode === 'to-csv';
        var prefix = (isCsv && bomToggle && bomToggle.checked) ? '\ufeff' : '';
        var blob = new Blob([prefix + lastOutput], { type: isCsv ? 'text/csv' : 'application/json' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = isCsv ? 'data.csv' : 'data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    paintCounts();
    updateActions();
})();