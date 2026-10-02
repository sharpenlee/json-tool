/* Off-main-thread JSON work for the formatter. Parsing, recursive key sorting and
   stringifying a multi-megabyte document can take hundreds of milliseconds; doing
   it here keeps the page responsive. The message shapes mirror what tool.js sends:
   in  { id, text, mode, indent, sort }
   out { id, ok: true, mode, result }  or  { id, ok: false, mode, error }
   Location/caret rendering stays on the main thread, which already has the text. */
'use strict';

function sortKeysRecursive(obj) {
    if (Array.isArray(obj)) {
        return obj.map(function (item) { return sortKeysRecursive(item); });
    }
    if (obj !== null && typeof obj === 'object') {
        var sorted = {};
        Object.keys(obj).sort().forEach(function (key) {
            sorted[key] = sortKeysRecursive(obj[key]);
        });
        return sorted;
    }
    return obj;
}

self.onmessage = function (event) {
    var data = event.data;
    try {
        var parsed = JSON.parse(data.text);
        var value = data.sort ? sortKeysRecursive(parsed) : parsed;
        var result = data.mode === 'format'
            ? JSON.stringify(value, null, data.indent)
            : JSON.stringify(value);
        self.postMessage({ id: data.id, ok: true, mode: data.mode, result: result });
    } catch (err) {
        self.postMessage({ id: data.id, ok: false, mode: data.mode, error: err.message });
    }
};