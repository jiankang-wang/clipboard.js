hljs.initHighlightingOnLoad();

document.addEventListener('DOMContentLoaded', function() {
    var clipboard = new Clipboard('.btn');
    var btns = clipboard.triggers;

    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener('success', function(e) {
            e.detail.clearSelection();

            console.info('Action:', e.detail.action);
            console.info('Text:', e.detail.text);

            showTooltip(e.currentTarget, 'Copied!');
        });

        btns[i].addEventListener('error', function(e) {
            showTooltip(e.currentTarget, messageFallback(e.detail.action));
        });

        btns[i].addEventListener('mouseleave', function(e) {
            e.currentTarget.setAttribute('class', 'btn');
            e.currentTarget.removeAttribute('aria-label');
        });
    }

    function showTooltip(elem, msg) {
        elem.setAttribute('class', 'btn tooltipped tooltipped-s');
        elem.setAttribute('aria-label', msg);
    }

    // Simplistic detection, do not use it in production
    function messageFallback(action) {
        var actionMsg = '';
        var actionKey = (action === 'cut' ? 'X' : 'C');

        if(/iPhone|iPad/i.test(navigator.userAgent)) {
            actionMsg = 'No support :(';
        }
        else if (/Mac/i.test(navigator.userAgent)) {
            actionMsg = 'Press ⌘-' + actionKey + ' to ' + action;
        }
        else {
            actionMsg = 'Press Ctrl-' + actionKey + ' to ' + action;
        }

        return actionMsg;
    }
});
