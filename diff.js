/* Shared logic for the JSON diff pages (json-diff.html at the site root and
   its localized copies). The comparison is structural, not textual: both
   documents are parsed, then walked together, so key order and whitespace
   never register as differences. The pure comparison is exposed on
   window.JsonDiff so it can be tested and reused. */
(function () {
    'use strict';

    var I18N = {
        en: {
            charUnit: ' characters',
            needBoth: 'Paste JSON in both fields to compare.',
            invalidLeft: 'Left document — invalid JSON: ',
            invalidRight: 'Right document — invalid JSON: ',
            okHead: '✓ Identical',
            diffHead: '✕ Different',
            errHead: '✕ Could not compare',
            identicalBody: 'The two documents are identical: same keys, same order-independent structure, same values.',
            summary: '{added} added · {removed} removed · {changed} changed',
            copyLabel: 'Copy report',
            copiedLabel: 'Copied!',
            copyFailLabel: '⚠️ Could not copy',
            downloadLabel: 'Download report',
            reportHeader: 'JSON diff report'
        },
        es: {
            charUnit: ' caracteres',
            needBoth: 'Pega JSON en ambos campos para comparar.',
            invalidLeft: 'Documento izquierdo, JSON no válido: ',
            invalidRight: 'Documento derecho, JSON no válido: ',
            okHead: '✓ Idénticos',
            diffHead: '✕ Diferentes',
            errHead: '✕ No se pudo comparar',
            identicalBody: 'Los dos documentos son idénticos: mismas claves, misma estructura independiente del orden, mismos valores.',
            summary: '{added} añadidos · {removed} eliminados · {changed} cambiados',
            copyLabel: 'Copiar informe',
            copiedLabel: '¡Copiado!',
            copyFailLabel: '⚠️ No se pudo copiar',
            downloadLabel: 'Descargar informe',
            reportHeader: 'Informe de diferencias JSON'
        },
        fr: {
            charUnit: ' caractères',
            needBoth: 'Collez du JSON dans les deux champs pour comparer.',
            invalidLeft: 'Document de gauche, JSON non valide : ',
            invalidRight: 'Document de droite, JSON non valide : ',
            okHead: '✓ Identiques',
            diffHead: '✕ Différents',
            errHead: '✕ Comparaison impossible',
            identicalBody: 'Les deux documents sont identiques : mêmes clés, même structure indépendante de l\'ordre, mêmes valeurs.',
            summary: '{added} ajouts · {removed} suppressions · {changed} modifications',
            copyLabel: 'Copier le rapport',
            copiedLabel: 'Copié !',
            copyFailLabel: '⚠️ Copie impossible',
            downloadLabel: 'Télécharger le rapport',
            reportHeader: 'Rapport de différences JSON'
        },
        ja: {
            charUnit: '文字',
            needBoth: '比較するには両方の欄に JSON を貼り付けてください。',
            invalidLeft: '左のドキュメント、無効なJSON: ',
            invalidRight: '右のドキュメント、無効なJSON: ',
            okHead: '✓ 一致',
            diffHead: '✕ 相違あり',
            errHead: '✕ 比較できませんでした',
            identicalBody: '2 つのドキュメントは同一です。キーも、順序に依存しない構造も、値も同じです。',
            summary: '追加 {added} · 削除 {removed} · 変更 {changed}',
            copyLabel: 'レポートをコピー',
            copiedLabel: 'コピーしました！',
            copyFailLabel: '⚠️ コピーできませんでした',
            downloadLabel: 'レポートをダウンロード',
            reportHeader: 'JSON 差分レポート'
        },
        ko: {
            charUnit: '자',
            needBoth: '비교하려면 두 필드 모두에 JSON을 붙여넣으세요.',
            invalidLeft: '왼쪽 문서, 잘못된 JSON: ',
            invalidRight: '오른쪽 문서, 잘못된 JSON: ',
            okHead: '✓ 동일함',
            diffHead: '✕ 다름',
            errHead: '✕ 비교할 수 없음',
            identicalBody: '두 문서는 동일합니다. 키도, 순서와 무관한 구조도, 값도 같습니다.',
            summary: '추가 {added} · 삭제 {removed} · 변경 {changed}',
            copyLabel: '보고서 복사',
            copiedLabel: '복사됨!',
            copyFailLabel: '⚠️ 복사하지 못했습니다',
            downloadLabel: '보고서 다운로드',
            reportHeader: 'JSON 차이 보고서'
        },
        pt: {
            charUnit: ' caracteres',
            needBoth: 'Cole JSON nos dois campos para comparar.',
            invalidLeft: 'Documento da esquerda, JSON inválido: ',
            invalidRight: 'Documento da direita, JSON inválido: ',
            okHead: '✓ Idênticos',
            diffHead: '✕ Diferentes',
            errHead: '✕ Não foi possível comparar',
            identicalBody: 'Os dois documentos são idênticos: mesmas chaves, mesma estrutura independente da ordem, mesmos valores.',
            summary: '{added} adicionados · {removed} removidos · {changed} alterados',
            copyLabel: 'Copiar relatório',
            copiedLabel: 'Copiado!',
            copyFailLabel: '⚠️ Não foi possível copiar',
            downloadLabel: 'Baixar relatório',
            reportHeader: 'Relatório de diferenças JSON'
        },
        ru: {
            charUnit: ' симв.',
            needBoth: 'Вставьте JSON в оба поля, чтобы сравнить.',
            invalidLeft: 'Левый документ, недопустимый JSON: ',
            invalidRight: 'Правый документ, недопустимый JSON: ',
            okHead: '✓ Идентичны',
            diffHead: '✕ Есть различия',
            errHead: '✕ Не удалось сравнить',
            identicalBody: 'Документы идентичны: те же ключи, одна и та же структура независимо от порядка, те же значения.',
            summary: 'добавлено {added} · удалено {removed} · изменено {changed}',
            copyLabel: 'Копировать отчёт',
            copiedLabel: 'Скопировано!',
            copyFailLabel: '⚠️ Не удалось скопировать',
            downloadLabel: 'Скачать отчёт',
            reportHeader: 'Отчёт о различиях JSON'
        },
        'zh-Hans': {
            charUnit: '个字符',
            needBoth: '请在两个输入框中都粘贴 JSON 再比较。',
            invalidLeft: '左侧文档，无效的 JSON: ',
            invalidRight: '右侧文档，无效的 JSON: ',
            okHead: '✓ 完全一致',
            diffHead: '✕ 存在差异',
            errHead: '✕ 无法比较',
            identicalBody: '两个文档完全一致：键相同，与顺序无关的结构相同，值也相同。',
            summary: '新增 {added} · 删除 {removed} · 修改 {changed}',
            copyLabel: '复制报告',
            copiedLabel: '已复制！',
            copyFailLabel: '⚠️ 无法复制',
            downloadLabel: '下载报告',
            reportHeader: 'JSON 差异报告'
        },
        'zh-Hant': {
            charUnit: '個字元',
            needBoth: '請在兩個輸入欄中都貼上 JSON 再比較。',
            invalidLeft: '左側文件，無效的 JSON: ',
            invalidRight: '右側文件，無效的 JSON: ',
            okHead: '✓ 完全一致',
            diffHead: '✕ 存在差異',
            errHead: '✕ 無法比較',
            identicalBody: '兩份文件完全一致：鍵相同，與順序無關的結構相同，值也相同。',
            summary: '新增 {added} · 刪除 {removed} · 修改 {changed}',
            copyLabel: '複製報告',
            copiedLabel: '已複製！',
            copyFailLabel: '⚠️ 無法複製',
            downloadLabel: '下載報告',
            reportHeader: 'JSON 差異報告'
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
        return tpl.replace(/\{(\w+)\}/g, function (_, key) { return values[key]; });
    }

    // ---------------------------------------------------------------- core ----

    function isObject(value) {
        return value !== null && typeof value === 'object' && !Array.isArray(value);
    }

    function joinKey(parent, key) {
        if (/^[A-Za-z_$][\w$]*$/.test(key)) return parent + '.' + key;
        return parent + '[' + JSON.stringify(key) + ']';
    }

    function render(value) {
        return JSON.stringify(value);
    }

    function walk(a, b, path, out) {
        if (Array.isArray(a) || Array.isArray(b)) {
            if (!Array.isArray(a) || !Array.isArray(b)) {
                out.push({ path: path, kind: 'changed', from: a, to: b });
                return;
            }
            var n = Math.max(a.length, b.length);
            for (var i = 0; i < n; i++) {
                var ip = path + '[' + i + ']';
                if (i >= a.length) out.push({ path: ip, kind: 'added', to: b[i] });
                else if (i >= b.length) out.push({ path: ip, kind: 'removed', from: a[i] });
                else walk(a[i], b[i], ip, out);
            }
            return;
        }

        var aObj = isObject(a);
        var bObj = isObject(b);
        if (aObj !== bObj) {
            out.push({ path: path, kind: 'changed', from: a, to: b });
            return;
        }
        if (!aObj) {
            if (a !== b) out.push({ path: path, kind: 'changed', from: a, to: b });
            return;
        }

        var keys = [];
        var seen = {};
        Object.keys(a).forEach(function (k) { if (!seen[k]) { seen[k] = 1; keys.push(k); } });
        Object.keys(b).forEach(function (k) { if (!seen[k]) { seen[k] = 1; keys.push(k); } });
        keys.forEach(function (k) {
            var hasA = Object.prototype.hasOwnProperty.call(a, k);
            var hasB = Object.prototype.hasOwnProperty.call(b, k);
            var kp = joinKey(path, k);
            if (hasA && !hasB) out.push({ path: kp, kind: 'removed', from: a[k] });
            else if (!hasA && hasB) out.push({ path: kp, kind: 'added', to: b[k] });
            else walk(a[k], b[k], kp, out);
        });
    }

    /* Structural diff of two parsed JSON values. Returns every difference as
       { path, kind, from, to }. Two documents that differ only in key order or
       whitespace produce no changes. */
    function diffJson(a, b) {
        var changes = [];
        walk(a, b, '$', changes);
        var summary = { added: 0, removed: 0, changed: 0 };
        changes.forEach(function (c) { summary[c.kind] += 1; });
        return { changes: changes, summary: summary };
    }

    /* Plain-text rendering of the changes, the shape a patch review expects. */
    function formatReport(changes) {
        return changes.map(function (c) {
            if (c.kind === 'added') return '+ ' + c.path + ': ' + render(c.to);
            if (c.kind === 'removed') return '- ' + c.path + ': ' + render(c.from);
            return '~ ' + c.path + ': ' + render(c.from) + ' -> ' + render(c.to);
        }).join('\n');
    }

    window.JsonDiff = {
        diffJson: diffJson,
        formatReport: formatReport
    };

    // -------------------------------------------------------------- wiring ----

    var mode = document.body ? document.body.getAttribute('data-diff-mode') : null;
    if (mode !== 'json-diff') return;

    var left = document.getElementById('leftInput');
    var right = document.getElementById('rightInput');
    if (!left || !right) return;

    var diffOutput = document.getElementById('diffOutput');
    var result = document.getElementById('result');
    var leftCount = document.getElementById('leftCount');
    var rightCount = document.getElementById('rightCount');
    var compareBtn = document.getElementById('compareBtn');
    var exampleBtn = document.getElementById('exampleBtn');
    var clearBtn = document.getElementById('clearBtn');
    var copyBtn = document.getElementById('copyBtn');
    var downloadBtn = document.getElementById('downloadBtn');
    var lastReport = '';

    function paintCounts() {
        leftCount.textContent = left.value.length + T.charUnit;
        rightCount.textContent = right.value.length + T.charUnit;
    }

    function updateActions() {
        var has = !!lastReport;
        copyBtn.disabled = !has;
        downloadBtn.disabled = !has;
    }

    function setHead(kind, bodyText) {
        result.className = 'result show ' + (kind === 'ok' ? 'valid' : (kind === 'diff' ? 'diff' : 'invalid'));
        result.textContent = '';
        var strong = document.createElement('strong');
        strong.textContent = kind === 'ok' ? T.okHead : (kind === 'diff' ? T.diffHead : T.errHead);
        result.appendChild(strong);
        var span = document.createElement('span');
        span.textContent = bodyText;
        result.appendChild(span);
    }

    function clearAll() {
        diffOutput.innerHTML = '';
        result.className = 'result';
        result.textContent = '';
        lastReport = '';
        updateActions();
    }

    function compare() {
        paintCounts();
        var l = left.value.trim();
        var r = right.value.trim();
        if (!l || !r) {
            clearAll();
            setHead('err', T.needBoth);
            return;
        }

        var leftData;
        var rightData;
        try {
            leftData = JSON.parse(l);
        } catch (e) {
            clearAll();
            setHead('err', T.invalidLeft + e.message);
            return;
        }
        try {
            rightData = JSON.parse(r);
        } catch (e) {
            clearAll();
            setHead('err', T.invalidRight + e.message);
            return;
        }

        var diff = diffJson(leftData, rightData);
        diffOutput.innerHTML = '';

        if (diff.changes.length === 0) {
            setHead('ok', T.identicalBody);
            lastReport = '';
            updateActions();
            return;
        }

        setHead('diff', fill(T.summary, {
            added: diff.summary.added,
            removed: diff.summary.removed,
            changed: diff.summary.changed
        }));

        var list = document.createElement('div');
        list.className = 'diff-list';
        diff.changes.forEach(function (c) {
            var item = document.createElement('div');
            item.className = 'diff-item ' + c.kind;

            var kind = document.createElement('span');
            kind.className = 'diff-kind';
            kind.textContent = c.kind === 'added' ? '+' : (c.kind === 'removed' ? '-' : '~');
            item.appendChild(kind);

            var path = document.createElement('code');
            path.className = 'diff-path';
            path.textContent = c.path;
            item.appendChild(path);

            var value = document.createElement('span');
            value.className = 'diff-value';
            if (c.kind === 'added') {
                value.textContent = render(c.to);
            } else if (c.kind === 'removed') {
                value.textContent = render(c.from);
            } else {
                value.textContent = render(c.from) + ' → ' + render(c.to);
            }
            item.appendChild(value);

            list.appendChild(item);
        });
        diffOutput.appendChild(list);

        lastReport = T.reportHeader + '\n' + formatReport(diff.changes);
        updateActions();
    }

    compareBtn.addEventListener('click', compare);
    left.addEventListener('input', function () { paintCounts(); clearAll(); });
    right.addEventListener('input', function () { paintCounts(); clearAll(); });
    [left, right].forEach(function (el) {
        el.addEventListener('keydown', function (e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                compare();
            }
        });
    });

    exampleBtn.addEventListener('click', function () {
        var ex = exampleBtn.getAttribute('data-example');
        if (ex) {
            var pair = JSON.parse(ex);
            left.value = JSON.stringify(pair.left, null, 2);
            right.value = JSON.stringify(pair.right, null, 2);
        }
        compare();
        left.focus();
    });

    clearBtn.addEventListener('click', function () {
        left.value = '';
        right.value = '';
        clearAll();
        paintCounts();
        left.focus();
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
        a.download = 'json-diff.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    paintCounts();
    updateActions();
})();