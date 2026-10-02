/* Shared logic for the JSON formatter tool page (index.html at the site root
   and its localized copies under /es, /fr, /ja, /ko, /pt, /ru, /zh, /zh-hant).
   The markup stays in each page; this file holds the behaviour once and the UI
   microcopy for every language, looked up by the page's <html lang>. */
(function () {
    'use strict';

    var I18N = {
        "en": {
            charUnit: " characters",
            emptyOutput: "Please paste valid JSON to format.",
            emptyInput: "Input is empty.",
            invalidPrefix: "Invalid JSON: ",
            nothingToCopy: "Nothing to copy. Please format or minify JSON first.",
            copiedToast: "✅ Copied to clipboard!",
            copyFailToast: "⚠️ Could not copy. Please copy manually.",
            copiedLabel: "Copied!",
            copyLabel: "Copy",
            nothingToDownload: "Nothing to download. Please format or minify JSON first.",
            themeLight: "Light",
            themeDark: "Dark",
            initialOutput: "Your formatted JSON will appear here.",
            whereReported: "Parsing stops at line {line}, column {col}.",
            whereInferred: "No position was reported; the likely spot is line {line}, column {col}.",
            excerptLabel: "Line {line}:",
            caret: "^ here",
            exampleDescription: "A free online JSON formatter with sorting",
            exampleFeatures: ["format", "minify", "validate", "sort keys"],
            exampleAuthor: "JSON Tool Team",
            exampleTags: ["developer", "utility", "online"],
        },
        "es": {
            charUnit: " caracteres",
            emptyOutput: "Pega un JSON válido para formatear.",
            emptyInput: "La entrada está vacía.",
            invalidPrefix: "JSON no válido: ",
            nothingToCopy: "Nada que copiar. Primero formatea o minifica el JSON.",
            copiedToast: "✅ Copiado al portapapeles!",
            copyFailToast: "⚠️ No se pudo copiar. Copia manualmente.",
            copiedLabel: "Copiado!",
            copyLabel: "Copiar",
            nothingToDownload: "Nada que descargar. Primero formatea o minifica el JSON.",
            themeLight: "Claro",
            themeDark: "Oscuro",
            initialOutput: "Tu JSON formateado aparecerá aquí.",
            whereReported: "El análisis se detiene en la línea {line}, columna {col}.",
            whereInferred: "No se indicó una posición; el punto probable es la línea {line}, columna {col}.",
            excerptLabel: "Línea {line}:",
            caret: "^ aquí",
            exampleDescription: "Un formateador de JSON gratuito en línea con ordenación",
            exampleFeatures: ["formato", "minificación", "validación", "ordenación de claves"],
            exampleAuthor: "Equipo de JSON Tool",
            exampleTags: ["desarrollador", "utilidad", "en línea"],
        },
        "fr": {
            charUnit: " caractères",
            emptyOutput: "Collez un JSON valide à formater.",
            emptyInput: "La saisie est vide.",
            invalidPrefix: "JSON non valide : ",
            nothingToCopy: "Rien à copier. Formatez ou minifiez d'abord le JSON.",
            copiedToast: "✅ Copié dans le presse-papiers !",
            copyFailToast: "⚠️ Impossible de copier. Veuillez copier manuellement.",
            copiedLabel: "Copié !",
            copyLabel: "Copier",
            nothingToDownload: "Rien à télécharger. Formatez ou minifiez d'abord le JSON.",
            themeLight: "Clair",
            themeDark: "Sombre",
            initialOutput: "Votre JSON formaté apparaîtra ici.",
            whereReported: "L'analyse s'arrête à la ligne {line}, colonne {col}.",
            whereInferred: "Aucune position n'a été indiquée ; l'endroit probable est la ligne {line}, colonne {col}.",
            excerptLabel: "Ligne {line} :",
            caret: "^ ici",
            exampleDescription: "Un formatteur de JSON gratuit en ligne avec tri",
            exampleFeatures: ["formatage", "minification", "validation", "tri des clés"],
            exampleAuthor: "L'équipe JSON Tool",
            exampleTags: ["développeur", "utilitaire", "en ligne"],
        },
        "ja": {
            charUnit: "文字",
            emptyOutput: "フォーマットする有効なJSONを貼り付けてください。",
            emptyInput: "入力が空です。",
            invalidPrefix: "無効なJSON: ",
            nothingToCopy: "コピーするものがありません。先にJSONをフォーマットまたはミニファイしてください。",
            copiedToast: "✅ クリップボードにコピーしました！",
            copyFailToast: "⚠️ コピーできませんでした。手動でコピーしてください。",
            copiedLabel: "コピーしました！",
            copyLabel: "コピー",
            nothingToDownload: "ダウンロードするものがありません。先にJSONをフォーマットまたはミニファイしてください。",
            themeLight: "ライト",
            themeDark: "ダーク",
            initialOutput: "フォーマットされたJSONがここに表示されます。",
            whereReported: "解析は {line} 行 {col} 列で止まりました。",
            whereInferred: "位置が報告されませんでした。おそらく {line} 行 {col} 列です。",
            excerptLabel: "{line} 行目:",
            caret: "^ ここ",
            exampleDescription: "並べ替え対応の無料オンラインJSONフォーマッター",
            exampleFeatures: ["format", "minify", "validate", "sort keys"],
            exampleAuthor: "JSON Tool チーム",
            exampleTags: ["developer", "utility", "online"],
        },
        "ko": {
            charUnit: "자",
            emptyOutput: "포맷할 유효한 JSON을 붙여넣어 주세요.",
            emptyInput: "입력이 비어 있습니다.",
            invalidPrefix: "잘못된 JSON: ",
            nothingToCopy: "복사할 내용이 없습니다. 먼저 JSON을 포맷하거나 미니파이해 주세요.",
            copiedToast: "✅ 클립보드에 복사되었습니다!",
            copyFailToast: "⚠️ 복사하지 못했습니다. 직접 복사해 주세요.",
            copiedLabel: "복사됨!",
            copyLabel: "복사",
            nothingToDownload: "다운로드할 내용이 없습니다. 먼저 JSON을 포맷하거나 미니파이해 주세요.",
            themeLight: "라이트",
            themeDark: "다크",
            initialOutput: "포맷된 JSON이 여기에 표시됩니다.",
            whereReported: "구문 분석이 {line}행 {col}열에서 멈췄습니다.",
            whereInferred: "위치가 보고되지 않았습니다. 가장 의심되는 곳은 {line}행 {col}열입니다.",
            excerptLabel: "{line}행:",
            caret: "^ 여기",
            exampleDescription: "정렬 기능이 있는 무료 온라인 JSON 포맷터",
            exampleFeatures: ["format", "minify", "validate", "sort keys"],
            exampleAuthor: "JSON Tool 팀",
            exampleTags: ["developer", "utility", "online"],
        },
        "pt": {
            charUnit: " caracteres",
            emptyOutput: "Cole um JSON válido para formatar.",
            emptyInput: "A entrada está vazia.",
            invalidPrefix: "JSON inválido: ",
            nothingToCopy: "Nada para copiar. Primeiro formate ou minimize o JSON.",
            copiedToast: "✅ Copiado para a área de transferência!",
            copyFailToast: "⚠️ Não foi possível copiar. Copie manualmente.",
            copiedLabel: "Copiado!",
            copyLabel: "Copiar",
            nothingToDownload: "Nada para baixar. Primeiro formate ou minimize o JSON.",
            themeLight: "Claro",
            themeDark: "Escuro",
            initialOutput: "Seu JSON formatado aparecerá aqui.",
            whereReported: "A análise para na linha {line}, coluna {col}.",
            whereInferred: "Nenhuma posição foi informada; o ponto provável é a linha {line}, coluna {col}.",
            excerptLabel: "Linha {line}:",
            caret: "^ aqui",
            exampleDescription: "Um formatador de JSON online e gratuito com ordenação",
            exampleFeatures: ["formatação", "minificação", "validação", "ordenação de chaves"],
            exampleAuthor: "Equipe da JSON Tool",
            exampleTags: ["desenvolvedor", "utilitário", "online"],
        },
        "ru": {
            charUnit: " симв.",
            emptyOutput: "Вставьте корректный JSON для форматирования.",
            emptyInput: "Поле ввода пусто.",
            invalidPrefix: "Недопустимый JSON: ",
            nothingToCopy: "Нечего копировать. Сначала отформатируйте или минифицируйте JSON.",
            copiedToast: "✅ Скопировано в буфер обмена!",
            copyFailToast: "⚠️ Не удалось скопировать. Скопируйте вручную.",
            copiedLabel: "Скопировано!",
            copyLabel: "Копировать",
            nothingToDownload: "Нечего скачать. Сначала отформатируйте или минифицируйте JSON.",
            themeLight: "Светлая",
            themeDark: "Тёмная",
            initialOutput: "Здесь появится отформатированный JSON.",
            whereReported: "Разбор останавливается на строке {line}, столбце {col}.",
            whereInferred: "Позиция не указана; вероятное место — строка {line}, столбец {col}.",
            excerptLabel: "Строка {line}:",
            caret: "^ здесь",
            exampleDescription: "Бесплатный онлайн-форматтер JSON с сортировкой",
            exampleFeatures: ["форматирование", "минификация", "валидация", "сортировка ключей"],
            exampleAuthor: "Команда JSON Tool",
            exampleTags: ["разработчик", "утилита", "онлайн"],
        },
        "zh-Hans": {
            charUnit: "个字符",
            emptyOutput: "请粘贴有效的 JSON 进行格式化。",
            emptyInput: "输入为空。",
            invalidPrefix: "无效的 JSON: ",
            nothingToCopy: "没有可复制的内容。请先格式化或压缩 JSON。",
            copiedToast: "✅ 已复制到剪贴板！",
            copyFailToast: "⚠️ 无法复制，请手动复制。",
            copiedLabel: "已复制！",
            copyLabel: "复制",
            nothingToDownload: "没有可下载的内容。请先格式化或压缩 JSON。",
            themeLight: "浅色",
            themeDark: "深色",
            initialOutput: "格式化后的 JSON 将显示在这里。",
            whereReported: "解析在第 {line} 行第 {col} 列停止。",
            whereInferred: "解析器没有给出位置；最可能出问题的是第 {line} 行第 {col} 列。",
            excerptLabel: "第 {line} 行：",
            caret: "^ 此处",
            exampleDescription: "支持排序的免费在线 JSON 格式化工具",
            exampleFeatures: ["format", "minify", "validate", "sort keys"],
            exampleAuthor: "JSON Tool 团队",
            exampleTags: ["developer", "utility", "online"],
        },
        "zh-Hant": {
            charUnit: "個字元",
            emptyOutput: "請貼上有效的 JSON 進行格式化。",
            emptyInput: "輸入為空。",
            invalidPrefix: "無效的 JSON: ",
            nothingToCopy: "沒有可複製的內容。請先格式化或壓縮 JSON。",
            copiedToast: "✅ 已複製到剪貼簿！",
            copyFailToast: "⚠️ 無法複製，請手動複製。",
            copiedLabel: "已複製！",
            copyLabel: "複製",
            nothingToDownload: "沒有可下載的內容。請先格式化或壓縮 JSON。",
            themeLight: "淺色",
            themeDark: "深色",
            initialOutput: "格式化後的 JSON 會顯示在這裡。",
            whereReported: "解析在第 {line} 行、第 {col} 欄停止。",
            whereInferred: "解析器未提供位置；最可能出錯的是第 {line} 行、第 {col} 欄。",
            excerptLabel: "第 {line} 行：",
            caret: "^ 此處",
            exampleDescription: "支援排序的免費線上 JSON 格式化工具",
            exampleFeatures: ["format", "minify", "validate", "sort keys"],
            exampleAuthor: "JSON Tool 團隊",
            exampleTags: ["developer", "utility", "online"],
        }
    };

    function currentLang() {
        var tag = (document.documentElement.getAttribute('lang') || 'en').toLowerCase();
        if (tag.indexOf('zh') === 0) return tag.indexOf('hant') !== -1 ? 'zh-Hant' : 'zh-Hans';
        tag = tag.split('-')[0];
        return I18N[tag] ? tag : 'en';
    }

    var T = I18N[currentLang()];

    // ---- DOM refs ----
    const input = document.getElementById('jsonInput');
    const output = document.getElementById('jsonOutput');
    const lineNumbers = document.getElementById('lineNumbers');
    const errorMsg = document.getElementById('errorMsg');
    const inputCount = document.getElementById('inputCount');
    const outputCount = document.getElementById('outputCount');
    const indentInput = document.getElementById('indentSize');
    const sortToggle = document.getElementById('sortToggle');
    const outputCopyBtn = document.getElementById('outputCopyBtn');
    const exampleBtn = document.getElementById('exampleBtn');

    const formatBtn = document.getElementById('formatBtn');
    const minifyBtn = document.getElementById('minifyBtn');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const clearBtn = document.getElementById('clearBtn');
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const themeLabel = document.getElementById('themeLabel');
    const toast = document.getElementById('toast');

    let toastTimer = null;
    let lastMode = 'format'; // 记录最后一次成功的模式

    // ---- Helpers ----

    function updateCounts() {
        const inText = input.value;
        inputCount.textContent = inText.length + T.charUnit;
        const outText = output.textContent;
        const cleanOut = (outText && !outText.startsWith('Error:')) ? outText : '';
        outputCount.textContent = cleanOut.length + T.charUnit;
    }

    function showError(msg) {
        if (msg) {
            errorMsg.textContent = '⚠️ ' + msg;
            errorMsg.classList.add('visible');
        } else {
            errorMsg.classList.remove('visible');
        }
    }

    function updateLineNumbers(text) {
        const lines = text ? text.split('\n') : [];
        let html = '';
        for (let i = 1; i <= lines.length; i++) {
            html += `<span>${i}</span>`;
        }
        lineNumbers.innerHTML = html;
    }

    function setOutput(text, isError = false) {
        output.textContent = text || '';
        output.classList.toggle('error', isError);
        if (!isError && text && !text.startsWith('Error:')) {
            updateLineNumbers(text);
            outputCopyBtn.classList.add('visible');
        } else {
            updateLineNumbers('');
            outputCopyBtn.classList.remove('visible');
        }
        updateCounts();
    }

    // ---- Recursive key sorting ----
    function sortKeysRecursive(obj) {
        if (Array.isArray(obj)) {
            return obj.map(item => sortKeysRecursive(item));
        } else if (obj !== null && typeof obj === 'object') {
            const sorted = {};
            Object.keys(obj).sort().forEach(key => {
                sorted[key] = sortKeysRecursive(obj[key]);
            });
            return sorted;
        }
        return obj;
    }

    // ---- Parse-error location (same approach as the validator page) ----

    function fill(tpl, values) {
        return tpl.replace(/\{(\w+)\}/g, function (_, key) { return values[key]; });
    }

    function lineColFromIndex(text, at) {
        const before = text.slice(0, at).split('\n');
        return { line: before.length, col: before[before.length - 1].length + 1 };
    }

    // Rough terminal width: CJK and full-width characters occupy two columns.
    function displayWidth(s) {
        let w = 0;
        for (let i = 0; i < s.length; i++) {
            const c = s.charCodeAt(i);
            w += (c >= 0x1100 && (c <= 0x115f || (c >= 0x2e80 && c <= 0xa4cf) ||
                (c >= 0xac00 && c <= 0xd7a3) || (c >= 0xf900 && c <= 0xfaff) ||
                (c >= 0xfe30 && c <= 0xfe6f) || (c >= 0xff00 && c <= 0xff60) ||
                (c >= 0xffe0 && c <= 0xffe6))) ? 2 : 1;
        }
        return w;
    }

    /* Fallback patterns for engines that report an error without a position,
       which V8 does for trailing commas. Ordered by how often they happen. */
    const FAULTS = [
        /,\s*[}\]]/,
        /'/,
        /(^|[^:\\])\/\/|\/\*/,
        /[{,]\s*[A-Za-z_$][\w$]*\s*:/,
        /\b(True|False|None)\b/,
        /\b(NaN|Infinity)\b/,
        /[\u2018\u2019\u201c\u201d]/
    ];

    function locateError(text, message) {
        let m = message.match(/line (\d+) column (\d+)/i);
        let pos = m ? { line: +m[1], col: +m[2] } : null;
        if (!pos) {
            m = message.match(/position (\d+)/i);
            if (m) pos = lineColFromIndex(text, Math.min(+m[1], text.length));
        }
        if (pos) return { line: pos.line, col: pos.col, inferred: false };
        for (let i = 0; i < FAULTS.length; i++) {
            const hit = FAULTS[i].exec(text);
            if (hit) {
                const p = lineColFromIndex(text, hit.index);
                return { line: p.line, col: p.col, inferred: true };
            }
        }
        return null;
    }

    /* The failing line plus a caret under the offending column. Tabs are expanded
       so the caret lines up, and the caret indent is measured in display columns. */
    function excerpt(text, line, col) {
        const lines = text.split('\n');
        if (!lines.length || line > lines.length) return '';
        const raw = lines[line - 1] || '';
        const src = raw.replace(/\t/g, '    ');
        const clipped = src.length > 88 ? src.slice(0, 88) + '…' : src;
        const prefix = fill(T.excerptLabel, { line: line }) + '  ';
        const before = raw.slice(0, col - 1).replace(/\t/g, '    ');
        const pad = displayWidth(prefix + before);
        return prefix + clipped + '\n' + ' '.repeat(pad) + T.caret;
    }

    // ---- Core processing ----
    function processJSON(mode) {
        const raw = input.value.trim();
        if (!raw) {
            setOutput(T.emptyOutput, false);
            showError(T.emptyInput);
            return false;
        }

        let parsed;
        try {
            parsed = JSON.parse(raw);
            showError(null);
        } catch (e) {
            const msg = T.invalidPrefix + e.message;
            const where = locateError(raw, e.message);
            if (where) {
                const tpl = where.inferred ? T.whereInferred : T.whereReported;
                showError(msg + ' ' + fill(tpl, { line: where.line, col: where.col }));
                setOutput(excerpt(raw, where.line, where.col), true);
            } else {
                setOutput(msg, true);
                showError(msg);
            }
            return false;
        }

        // Apply key sorting if enabled
        const shouldSort = sortToggle.checked;
        let data = parsed;
        if (shouldSort) {
            data = sortKeysRecursive(parsed);
        }

        let result;
        if (mode === 'format') {
            const indent = parseInt(indentInput.value, 10);
            const safeIndent = (isNaN(indent) || indent < 1) ? 3 : indent;
            result = JSON.stringify(data, null, safeIndent);
        } else { // minify
            result = JSON.stringify(data);
        }

        setOutput(result, false);
        updateCounts();
        lastMode = mode; // 记录成功使用的模式
        return true;
    }

    const SVG_COPY = '<svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
    const SVG_COPIED = '<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>';

    // ---- Copy to clipboard with feedback ----
    function copyText(text) {
        if (!text || text.startsWith('Error:')) {
            showError(T.nothingToCopy);
            return false;
        }

        navigator.clipboard.writeText(text).then(() => {
            showToast(T.copiedToast);
            // Flash the output copy button
            outputCopyBtn.classList.add('copied');
            outputCopyBtn.innerHTML = SVG_COPIED + ' ' + T.copiedLabel;
            setTimeout(() => {
                outputCopyBtn.classList.remove('copied');
                outputCopyBtn.innerHTML = SVG_COPY + ' ' + T.copyLabel;
            }, 2000);
        }).catch(() => {
            // Fallback
            const ta = document.createElement('textarea');
            ta.value = text;
            document.body.appendChild(ta);
            ta.select();
            try {
                document.execCommand('copy');
                showToast(T.copiedToast);
            } catch (_) {
                showToast(T.copyFailToast);
            }
            document.body.removeChild(ta);
        });
        return true;
    }

    // ---- Toast notification ----
    function showToast(msg) {
        toast.textContent = msg;
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toast.classList.remove('show');
        }, 2200);
    }

    // ---- 重新处理（用于排序切换或缩进变化） ----
    function reprocessWithCurrentMode() {
        const raw = input.value.trim();
        if (!raw) return; // 无输入则不处理
        processJSON(lastMode || 'format');
    }

    // ---- Event listeners ----

    // Format (不再自动复制)
    formatBtn.addEventListener('click', function() {
        gtag('event', 'format_click', { 'event_category': 'engagement' });
        processJSON('format');
    });

    // Minify (不再自动复制)
    minifyBtn.addEventListener('click', function() {
        gtag('event', 'minify_click', { 'event_category': 'engagement' });
        processJSON('minify');
    });

    // Output floating copy
    outputCopyBtn.addEventListener('click', function() {
        const text = output.textContent;
        if (text && !text.startsWith('Error:')) {
            gtag('event', 'copy_result_floating', { 'event_category': 'engagement' });
            copyText(text);
        } else {
            showError(T.nothingToCopy);
        }
    });

    // Bottom Copy button
    copyBtn.addEventListener('click', function() {
        const text = output.textContent;
        if (text && !text.startsWith('Error:')) {
            gtag('event', 'copy_result', { 'event_category': 'engagement' });
            copyText(text);
        } else {
            showError(T.nothingToCopy);
        }
    });

    // Download
    downloadBtn.addEventListener('click', function() {
        const text = output.textContent;
        if (!text || text.startsWith('Error:')) {
            showError(T.nothingToDownload);
            return;
        }
        gtag('event', 'download_result', { 'event_category': 'engagement' });
        const blob = new Blob([text], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'formatted.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showError(null);
    });

    // Clear
    clearBtn.addEventListener('click', function() {
        gtag('event', 'clear_click', { 'event_category': 'engagement' });
        input.value = '';
        setOutput('', false);
        showError(null);
        updateCounts();
        input.focus();
    });

    // ---- Example button ----
    const exampleJSON = {
        "name": "JSON Tool",
        "version": "1.0.0",
        "description": T.exampleDescription,
        "features": T.exampleFeatures,
        "settings": {
            "indent": 3,
            "sort": true,
            "darkMode": false
        },
        "metadata": {
            "created": "2026-01-01",
            "author": T.exampleAuthor,
            "tags": T.exampleTags
        }
    };

    exampleBtn.addEventListener('click', function() {
        gtag('event', 'example_used', { 'event_category': 'engagement' });
        input.value = JSON.stringify(exampleJSON, null, 2);
        updateCounts();
        processJSON('format');
        showError(null);
    });

    // Dark mode
    function toggleTheme() {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        themeIcon.textContent = isDark ? '☀️' : '🌙';
        themeLabel.textContent = isDark ? T.themeLight : T.themeDark;
        localStorage.setItem('json-tool-theme', isDark ? 'dark' : 'light');
    }

    themeToggle.addEventListener('click', toggleTheme);

    // Load saved theme
    const savedTheme = localStorage.getItem('json-tool-theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        themeIcon.textContent = '☀️';
        themeLabel.textContent = T.themeLight;
    }

    // Input: update counts, clear error
    input.addEventListener('input', function() {
        updateCounts();
        showError(null);
    });

    // Keyboard: Ctrl+Enter → Format
    input.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            formatBtn.click();
        }
    });

    // Indent: clamp between 1 and 20 on change
    indentInput.addEventListener('change', function() {
        let val = parseInt(this.value, 10);
        if (isNaN(val) || val < 1) val = 1;
        if (val > 20) val = 20;
        this.value = val;
    });

    // ---- **新增：Indent 变化时自动重新处理** ----
    indentInput.addEventListener('input', function() {
        gtag('event', 'indent_change', {
            'event_category': 'engagement',
            'indent_value': parseInt(this.value, 10) || 3
        });
        reprocessWithCurrentMode();
    });

    // ---- Sort toggle: 自动重新处理 ----
    sortToggle.addEventListener('change', function() {
        gtag('event', 'sort_toggle', {
            'event_category': 'engagement',
            'sort_enabled': this.checked
        });
        reprocessWithCurrentMode();
    });

    // ---- Init ----
    setOutput(T.initialOutput, false);
    updateCounts();
    outputCopyBtn.classList.remove('visible');

})();