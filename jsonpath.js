/* Shared logic for the JSONPath query page (jsonpath.html and its localized
   copies). A focused implementation of the common syntax — root, child, wildcard,
   recursive descent, index, slice, union and simple filters — rather than the
   whole RFC 9535 grammar; the page states which parts are supported. Exposed on
   window.JsonPath for testing. */
(function () {
    'use strict';

    var I18N = {
        en: {
            charUnit: ' characters',
            needBoth: 'Paste a JSON document and a query to run.',
            invalidJson: 'The document is not valid JSON: ',
            invalidQuery: 'The query could not be parsed: ',
            badFilter: 'the filter is not understood',
            errMustStart: "a query must start with $",
            errUnclosed: "the [ is never closed",
            errNameAfterDot: "expected a name after . or ..",
            errUnexpected: "unexpected \"{char}\"",
            okHead: '✓ Matches',
            errHead: '✕ Could not run',
            matchCount: '{n} match(es)',
            noMatches: 'Nothing matched this query.',
            copyLabel: 'Copy results',
            copiedLabel: 'Copied!',
            copyFailLabel: '⚠️ Could not copy',
            downloadLabel: 'Download results',
            reportHeader: 'JSONPath results'
        },
        "es": {
            charUnit: " caracteres",
            needBoth: "Pega un documento JSON y una consulta para ejecutar.",
            invalidJson: "El documento no es JSON válido: ",
            invalidQuery: "No se pudo analizar la consulta: ",
            badFilter: "no se entiende el filtro",
            errMustStart: "una consulta debe empezar por $",
            errUnclosed: "el [ no se cierra",
            errNameAfterDot: "se esperaba un nombre después de . o ..",
            errUnexpected: "\"{char}\" inesperado",
            okHead: "✓ Coincidencias",
            errHead: "✕ No se pudo ejecutar",
            matchCount: "{n} coincidencia(s)",
            noMatches: "Nada coincide con esta consulta.",
            copyLabel: "Copiar resultados",
            copiedLabel: "¡Copiado!",
            copyFailLabel: "⚠️ No se pudo copiar",
            downloadLabel: "Descargar resultados",
            reportHeader: "Resultados de JSONPath",
        },
        "fr": {
            charUnit: " caractères",
            needBoth: "Collez un document JSON et une requête à exécuter.",
            invalidJson: "Le document n'est pas du JSON valide : ",
            invalidQuery: "La requête n'a pas pu être analysée : ",
            badFilter: "le filtre n'est pas compris",
            errMustStart: "une requête doit commencer par $",
            errUnclosed: "le [ n'est jamais fermé",
            errNameAfterDot: "un nom était attendu après . ou ..",
            errUnexpected: "« {char} » inattendu",
            okHead: "✓ Correspondances",
            errHead: "✕ Exécution impossible",
            matchCount: "{n} correspondance(s)",
            noMatches: "Aucun résultat pour cette requête.",
            copyLabel: "Copier les résultats",
            copiedLabel: "Copié !",
            copyFailLabel: "⚠️ Copie impossible",
            downloadLabel: "Télécharger les résultats",
            reportHeader: "Résultats JSONPath",
        },
        "ja": {
            charUnit: "文字",
            needBoth: "実行する JSON ドキュメントとクエリを貼り付けてください。",
            invalidJson: "ドキュメントは有効なJSONではありません: ",
            invalidQuery: "クエリを解析できませんでした: ",
            badFilter: "フィルタを解釈できません",
            errMustStart: "クエリは $ で始まる必要があります",
            errUnclosed: "[ が閉じられていません",
            errNameAfterDot: ". または .. の後に名前が必要です",
            errUnexpected: "予期しない \"{char}\"",
            okHead: "✓ 一致",
            errHead: "✕ 実行できませんでした",
            matchCount: "{n} 件の一致",
            noMatches: "このクエリに一致するものはありません。",
            copyLabel: "結果をコピー",
            copiedLabel: "コピーしました！",
            copyFailLabel: "⚠️ コピーできませんでした",
            downloadLabel: "結果をダウンロード",
            reportHeader: "JSONPath の結果",
        },
        "ko": {
            charUnit: "자",
            needBoth: "실행할 JSON 문서와 쿼리를 붙여넣으세요.",
            invalidJson: "문서가 유효한 JSON이 아닙니다: ",
            invalidQuery: "쿼리를 분석할 수 없습니다: ",
            badFilter: "필터를 이해할 수 없습니다",
            errMustStart: "쿼리는 $로 시작해야 합니다",
            errUnclosed: "[ 가 닫히지 않았습니다",
            errNameAfterDot: ". 또는 .. 뒤에 이름이 필요합니다",
            errUnexpected: "예기치 않은 \"{char}\"",
            okHead: "✓ 일치",
            errHead: "✕ 실행할 수 없음",
            matchCount: "{n}개 일치",
            noMatches: "이 쿼리와 일치하는 항목이 없습니다.",
            copyLabel: "결과 복사",
            copiedLabel: "복사됨!",
            copyFailLabel: "⚠️ 복사하지 못했습니다",
            downloadLabel: "결과 다운로드",
            reportHeader: "JSONPath 결과",
        },
        "pt": {
            charUnit: " caracteres",
            needBoth: "Cole um documento JSON e uma consulta para executar.",
            invalidJson: "O documento não é um JSON válido: ",
            invalidQuery: "Não foi possível analisar a consulta: ",
            badFilter: "o filtro não é compreendido",
            errMustStart: "uma consulta deve começar com $",
            errUnclosed: "o [ nunca é fechado",
            errNameAfterDot: "era esperado um nome após . ou ..",
            errUnexpected: "\"{char}\" inesperado",
            okHead: "✓ Correspondências",
            errHead: "✕ Não foi possível executar",
            matchCount: "{n} correspondência(s)",
            noMatches: "Nada corresponde a esta consulta.",
            copyLabel: "Copiar resultados",
            copiedLabel: "Copiado!",
            copyFailLabel: "⚠️ Não foi possível copiar",
            downloadLabel: "Baixar resultados",
            reportHeader: "Resultados do JSONPath",
        },
        "ru": {
            charUnit: " симв.",
            needBoth: "Вставьте документ JSON и запрос для выполнения.",
            invalidJson: "Документ не является допустимым JSON: ",
            invalidQuery: "Не удалось разобрать запрос: ",
            badFilter: "фильтр не распознан",
            errMustStart: "запрос должен начинаться с $",
            errUnclosed: "скобка [ не закрыта",
            errNameAfterDot: "после . или .. ожидалось имя",
            errUnexpected: "неожиданный \"{char}\"",
            okHead: "✓ Совпадения",
            errHead: "✕ Не удалось выполнить",
            matchCount: "совпадений: {n}",
            noMatches: "По этому запросу ничего не найдено.",
            copyLabel: "Копировать результаты",
            copiedLabel: "Скопировано!",
            copyFailLabel: "⚠️ Не удалось скопировать",
            downloadLabel: "Скачать результаты",
            reportHeader: "Результаты JSONPath",
        },
        "zh-Hans": {
            charUnit: "个字符",
            needBoth: "请粘贴要查询的 JSON 文档和查询表达式。",
            invalidJson: "文档不是有效的 JSON: ",
            invalidQuery: "无法解析查询：",
            badFilter: "无法理解该过滤器",
            errMustStart: "查询必须以 $ 开头",
            errUnclosed: "方括号 [ 没有闭合",
            errNameAfterDot: ". 或 .. 之后需要一个名称",
            errUnexpected: "意外的 \"{char}\"",
            okHead: "✓ 匹配",
            errHead: "✕ 无法执行",
            matchCount: "{n} 个匹配",
            noMatches: "没有匹配该查询的内容。",
            copyLabel: "复制结果",
            copiedLabel: "已复制！",
            copyFailLabel: "⚠️ 无法复制",
            downloadLabel: "下载结果",
            reportHeader: "JSONPath 结果",
        },
        "zh-Hant": {
            charUnit: "個字元",
            needBoth: "請貼上要查詢的 JSON 文件與查詢表示式。",
            invalidJson: "文件不是有效的 JSON: ",
            invalidQuery: "無法解析查詢：",
            badFilter: "無法理解該篩選器",
            errMustStart: "查詢必須以 $ 開頭",
            errUnclosed: "方括號 [ 沒有閉合",
            errNameAfterDot: ". 或 .. 之後需要一個名稱",
            errUnexpected: "意外的 \"{char}\"",
            okHead: "✓ 符合",
            errHead: "✕ 無法執行",
            matchCount: "{n} 個符合",
            noMatches: "沒有符合此查詢的內容。",
            copyLabel: "複製結果",
            copiedLabel: "已複製！",
            copyFailLabel: "⚠️ 無法複製",
            downloadLabel: "下載結果",
            reportHeader: "JSONPath 結果",
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

    function joinKey(parent, key) {
        if (/^[A-Za-z_$][\w$-]*$/.test(key)) return parent + '.' + key;
        return parent + '[' + JSON.stringify(key) + ']';
    }

    // ---------------------------------------------------------------- parse ----

    function splitTop(text, sep) {
        var parts = [];
        var depth = 0;
        var quote = null;
        var start = 0;
        for (var i = 0; i < text.length; i++) {
            var c = text.charAt(i);
            if (quote) {
                if (c === '\\') { i++; continue; }
                if (c === quote) quote = null;
                continue;
            }
            if (c === '"' || c === "'") { quote = c; continue; }
            if (c === '(' || c === '[') { depth++; continue; }
            if (c === ')' || c === ']') { depth--; continue; }
            if (depth === 0 && text.substr(i, sep.length) === sep) {
                parts.push(text.slice(start, i));
                i += sep.length - 1;
                start = i + 1;
            }
        }
        parts.push(text.slice(start));
        return parts;
    }

    function findClose(text, open) {
        var depth = 0;
        var quote = null;
        for (var i = open; i < text.length; i++) {
            var c = text.charAt(i);
            if (quote) {
                if (c === '\\') { i++; continue; }
                if (c === quote) quote = null;
                continue;
            }
            if (c === '"' || c === "'") { quote = c; continue; }
            if (c === '[') depth++;
            else if (c === ']') { depth--; if (depth === 0) return i; }
        }
        return -1;
    }

    function unquote(text) {
        var q = text.charAt(0);
        if ((q === '"' || q === "'") && text.charAt(text.length - 1) === q) {
            return text.slice(1, -1).replace(/\\(.)/g, '$1');
        }
        return null;
    }

    function parseBracket(inner) {
        inner = inner.trim();
        if (inner === '*') return { type: 'wildcard' };
        if (inner.charAt(0) === '?') {
            var body = inner.slice(1).trim();
            if (body.charAt(0) === '(' && body.charAt(body.length - 1) === ')') body = body.slice(1, -1);
            return { type: 'filter', expr: body };
        }
        var selectors = splitTop(inner, ',').map(function (part) {
            part = part.trim();
            var name = unquote(part);
            if (name !== null) return { type: 'child', name: name };
            if (part.indexOf(':') !== -1) {
                var bits = part.split(':');
                return {
                    type: 'slice',
                    start: bits[0] === '' ? null : parseInt(bits[0], 10),
                    end: bits[1] === undefined || bits[1] === '' ? null : parseInt(bits[1], 10),
                    step: bits[2] === undefined || bits[2] === '' ? 1 : parseInt(bits[2], 10)
                };
            }
            if (/^-?\d+$/.test(part)) return { type: 'index', index: parseInt(part, 10) };
            return { type: 'child', name: part };
        });
        if (selectors.length === 1) return selectors[0];
        return { type: 'union', selectors: selectors };
    }

    function readName(text, i) {
        var start = i;
        while (i < text.length && text.charAt(i) !== '.' && text.charAt(i) !== '[') i++;
        if (i === start) return null;
        return { name: text.slice(start, i), i: i };
    }

    function parsePath(query) {
        var q = (query || '').trim();
        if (q.charAt(0) !== '$') throw new Error('errMustStart');
        var i = 1;
        var steps = [];
        while (i < q.length) {
            var c = q.charAt(i);
            if (c === '.') {
                if (q.charAt(i + 1) === '.') {
                    steps.push({ type: 'descend' });
                    i += 2;
                    if (q.charAt(i) === '[') continue;
                    if (q.charAt(i) === '*') { steps.push({ type: 'wildcard' }); i++; continue; }
                    var deep = readName(q, i);
                    if (deep === null) throw new Error('errNameAfterDot');
                    steps.push({ type: 'child', name: deep.name });
                    i = deep.i;
                    continue;
                }
                i++;
                if (q.charAt(i) === '*') { steps.push({ type: 'wildcard' }); i++; continue; }
                var name = readName(q, i);
                if (name === null) throw new Error('errNameAfterDot');
                steps.push({ type: 'child', name: name.name });
                i = name.i;
            } else if (c === '[') {
                var close = findClose(q, i);
                if (close === -1) throw new Error('errUnclosed');
                steps.push(parseBracket(q.slice(i + 1, close)));
                i = close + 1;
            } else {
                throw new Error('errUnexpected:' + c);
            }
        }
        return steps;
    }

    // ------------------------------------------------------------ evaluate ----

    function descendants(node) {
        var out = [node];
        var v = node.value;
        if (Array.isArray(v)) {
            v.forEach(function (el, idx) {
                out = out.concat(descendants({ value: el, path: node.path + '[' + idx + ']' }));
            });
        } else if (v !== null && typeof v === 'object') {
            Object.keys(v).forEach(function (k) {
                out = out.concat(descendants({ value: v[k], path: joinKey(node.path, k) }));
            });
        }
        return out;
    }

    function resolveOperand(text, value) {
        text = text.trim();
        if (text.charAt(0) !== '@') return undefined;
        var rest = text.slice(1);
        if (rest === '') return value;
        try {
            var nodes = evalSteps(value, parsePath('$' + rest));
            return nodes.length ? nodes[0].value : undefined;
        } catch (err) {
            return undefined;
        }
    }

    function literal(text) {
        text = text.trim();
        if (text === 'true') return true;
        if (text === 'false') return false;
        if (text === 'null') return null;
        var str = unquote(text);
        if (str !== null) return str;
        if (/^-?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(text)) return Number(text);
        return undefined;
    }

    function findComparison(expr) {
        var ops = ['==', '!=', '<=', '>=', '<', '>'];
        var quote = null;
        var depth = 0;
        for (var i = 0; i < expr.length; i++) {
            var c = expr.charAt(i);
            if (quote) {
                if (c === '\\') { i++; continue; }
                if (c === quote) quote = null;
                continue;
            }
            if (c === '"' || c === "'") { quote = c; continue; }
            if (c === '(' || c === '[') { depth++; continue; }
            if (c === ')' || c === ']') { depth--; continue; }
            if (depth !== 0) continue;
            for (var k = 0; k < ops.length; k++) {
                var op = ops[k];
                if (expr.substr(i, op.length) === op) {
                    return { left: expr.slice(0, i), op: op, right: expr.slice(i + op.length) };
                }
            }
        }
        return null;
    }

    function compare(left, op, right) {
        if (op === '==') return left === right;
        if (op === '!=') return left !== right;
        var comparable = (typeof left === 'number' && typeof right === 'number') ||
            (typeof left === 'string' && typeof right === 'string');
        if (!comparable) return false;
        if (op === '<') return left < right;
        if (op === '<=') return left <= right;
        if (op === '>') return left > right;
        return left >= right;
    }

    function testFilter(expr, value) {
        expr = (expr || '').trim();
        var ors = splitTop(expr, '||');
        if (ors.length > 1) return ors.some(function (e) { return testFilter(e, value); });
        var ands = splitTop(expr, '&&');
        if (ands.length > 1) return ands.every(function (e) { return testFilter(e, value); });

        var cmp = findComparison(expr);
        if (cmp) {
            var left = resolveOperand(cmp.left, value);
            var right = literal(cmp.right);
            if (left === undefined || right === undefined) {
                throw new Error(T.badFilter);
            }
            return compare(left, cmp.op, right);
        }
        // No comparison: treat it as an existence test on the child.
        var resolved = resolveOperand(expr, value);
        return resolved !== undefined;
    }

    function toArray(value) {
        if (Array.isArray(value)) return value.map(function (v, i) { return { value: v, path: '[' + i + ']', i: i }; });
        if (value !== null && typeof value === 'object') {
            return Object.keys(value).map(function (k) { return { value: value[k], path: k, i: k }; });
        }
        return [];
    }

    function applyStep(nodes, step) {
        var out = [];
        nodes.forEach(function (node) {
            var v = node.value;
            if (step.type === 'child') {
                if (v !== null && typeof v === 'object' && !Array.isArray(v) &&
                    Object.prototype.hasOwnProperty.call(v, step.name)) {
                    out.push({ value: v[step.name], path: joinKey(node.path, step.name) });
                }
            } else if (step.type === 'wildcard') {
                toArray(v).forEach(function (child) {
                    out.push({ value: child.value, path: node.path + (Array.isArray(v) ? child.path : joinKey('', child.path)) });
                });
            } else if (step.type === 'index') {
                if (Array.isArray(v)) {
                    var idx = step.index < 0 ? v.length + step.index : step.index;
                    if (idx >= 0 && idx < v.length) out.push({ value: v[idx], path: node.path + '[' + idx + ']' });
                }
            } else if (step.type === 'slice') {
                if (Array.isArray(v)) {
                    var stepBy = step.step || 1;
                    var start = step.start === null ? (stepBy > 0 ? 0 : v.length - 1) : (step.start < 0 ? v.length + step.start : step.start);
                    var end = step.end === null ? (stepBy > 0 ? v.length : -1) : (step.end < 0 ? v.length + step.end : step.end);
                    if (stepBy > 0) {
                        for (var i2 = Math.max(0, start); i2 < Math.min(v.length, end); i2 += stepBy) {
                            out.push({ value: v[i2], path: node.path + '[' + i2 + ']' });
                        }
                    } else {
                        for (var i3 = Math.min(v.length - 1, start); i3 > Math.max(-1, end); i3 += stepBy) {
                            out.push({ value: v[i3], path: node.path + '[' + i3 + ']' });
                        }
                    }
                }
            } else if (step.type === 'union') {
                step.selectors.forEach(function (sel) { out = out.concat(applyStep([node], sel)); });
            } else if (step.type === 'descend') {
                out = out.concat(descendants(node));
            } else if (step.type === 'filter') {
                toArray(v).forEach(function (child) {
                    if (testFilter(step.expr, child.value)) {
                        out.push({ value: child.value, path: node.path + (Array.isArray(v) ? child.path : joinKey('', child.path)) });
                    }
                });
            }
        });
        return out;
    }

    function evalSteps(root, steps) {
        var nodes = [{ value: root, path: '$' }];
        for (var i = 0; i < steps.length; i++) nodes = applyStep(nodes, steps[i]);
        return nodes;
    }

    /* Run a query against a parsed document. Throws on a query that cannot be
       parsed or whose filter is not understood. */
    function query(root, queryText) {
        return evalSteps(root, parsePath(queryText));
    }

    function formatReport(matches) {
        return matches.map(function (m) {
            return m.path + ' = ' + JSON.stringify(m.value);
        }).join('\n');
    }

    window.JsonPath = {
        query: query,
        parsePath: parsePath,
        formatReport: formatReport
    };

    // -------------------------------------------------------------- wiring ----

    if (!document.body || document.body.getAttribute('data-jsonpath-mode') !== 'query') return;

    var docInput = document.getElementById('docInput');
    var queryInput = document.getElementById('queryInput');
    if (!docInput || !queryInput) return;

    var result = document.getElementById('result');
    var matchList = document.getElementById('matchList');
    var docCount = document.getElementById('docCount');
    var runBtn = document.getElementById('runBtn');
    var exampleBtn = document.getElementById('exampleBtn');
    var clearBtn = document.getElementById('clearBtn');
    var copyBtn = document.getElementById('copyBtn');
    var downloadBtn = document.getElementById('downloadBtn');
    var lastResults = '';

    var EXAMPLE_DOC = {
        store: {
            book: [
                { title: 'Moby Dick', price: 8.99, inStock: true },
                { title: 'The Hobbit', price: 12.5, inStock: false },
                { title: 'Dune', price: 9.99, inStock: true }
            ],
            bicycle: { color: 'red', price: 19.95 }
        }
    };
    var EXAMPLE_QUERY = '$.store.book[?(@.price < 10)].title';

    function paintCounts() {
        docCount.textContent = docInput.value.length + T.charUnit;
    }

    function updateActions() {
        var has = !!lastResults;
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
        matchList.innerHTML = '';
        lastResults = '';
        result.className = 'result';
        result.textContent = '';
        updateActions();
    }

    function run() {
        paintCounts();
        var docText = docInput.value.trim();
        var q = queryInput.value.trim();
        clearAll();
        if (!docText || !q) {
            setHead(false, T.needBoth);
            return;
        }

        var doc;
        try {
            doc = JSON.parse(docText);
        } catch (e) {
            setHead(false, T.invalidJson + e.message);
            return;
        }

        var matches;
        try {
            matches = query(doc, q);
        } catch (e) {
            var parts = String(e.message).split(':');
            var tpl = T[parts[0]];
            setHead(false, T.invalidQuery + (tpl ? fill(tpl, { char: parts[1] || '' }) : e.message));
            return;
        }

        if (matches.length === 0) {
            setHead(false, T.noMatches);
            return;
        }

        setHead(true, fill(T.matchCount, { n: matches.length }));

        matches.forEach(function (m) {
            var item = document.createElement('div');
            item.className = 'match-item';
            var path = document.createElement('code');
            path.className = 'match-path';
            path.textContent = m.path;
            item.appendChild(path);
            var value = document.createElement('span');
            value.className = 'match-value';
            value.textContent = JSON.stringify(m.value);
            item.appendChild(value);
            matchList.appendChild(item);
        });

        lastResults = JSON.stringify(matches.map(function (m) { return m.value; }), null, 2);
        updateActions();
    }

    runBtn.addEventListener('click', run);
    docInput.addEventListener('input', function () { paintCounts(); clearAll(); });
    queryInput.addEventListener('input', clearAll);
    [docInput, queryInput].forEach(function (el) {
        el.addEventListener('keydown', function (e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                run();
            }
        });
    });

    exampleBtn.addEventListener('click', function () {
        docInput.value = JSON.stringify(EXAMPLE_DOC, null, 2);
        queryInput.value = EXAMPLE_QUERY;
        run();
    });

    clearBtn.addEventListener('click', function () {
        docInput.value = '';
        queryInput.value = '';
        clearAll();
        paintCounts();
        docInput.focus();
    });

    copyBtn.addEventListener('click', function () {
        if (!lastResults) return;
        var btn = this;
        navigator.clipboard.writeText(lastResults).then(function () {
            btn.textContent = T.copiedLabel;
            setTimeout(function () { btn.textContent = T.copyLabel; }, 1400);
        }).catch(function () {
            btn.textContent = T.copyFailLabel;
            setTimeout(function () { btn.textContent = T.copyLabel; }, 1800);
        });
    });

    downloadBtn.addEventListener('click', function () {
        if (!lastResults) return;
        var blob = new Blob([lastResults], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'jsonpath-results.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    paintCounts();
    updateActions();
})();