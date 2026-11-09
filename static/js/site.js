/* site.js: nav toggle, post search, lazy Disqus. Vanilla, no dependencies.
   Progressive enhancement: without it every post is listed, the search form posts to DuckDuckGo
   scoped to the blog, and the comments section links to Disqus. */
(function () {
  'use strict';
  var d = document;

  /* ---------- Nav toggle (from the main site) ---------- */
  var toggle = d.querySelector('.nav__toggle');
  var links = toggle && d.getElementById(toggle.getAttribute('aria-controls'));
  if (toggle && links) {
    var setOpen = function (open) { toggle.setAttribute('aria-expanded', open ? 'true' : 'false'); };
    var isOpen = function () { return toggle.getAttribute('aria-expanded') === 'true'; };
    toggle.hidden = false;
    setOpen(false);
    toggle.addEventListener('click', function () { setOpen(!isOpen()); });
    links.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    d.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen() && !d.querySelector('dialog[open]')) { setOpen(false); toggle.focus(); }
    });
    var narrow = window.matchMedia('(max-width: 60rem)');
    var onChange = function () { if (!narrow.matches) setOpen(false); };
    if (narrow.addEventListener) narrow.addEventListener('change', onChange);
    else if (narrow.addListener) narrow.addListener(onChange);
  }

  /* ---------- Search: combobox over search_index.en.json (Zola fuse_json) ---------- */
  var form = d.querySelector('form.search');
  var input = form && form.querySelector('.search__input');
  var list = form && d.getElementById(input.getAttribute('aria-controls'));
  var status = form && form.querySelector('.search__status');
  if (form && input && list) {
    var MAX = 8;
    var index = null, loading = null, results = [], active = -1;

    var load = function () {
      if (loading) return loading;
      // Same-origin path of the index, so it also loads from a local server or a preview host.
      var url = new URL(input.getAttribute('data-index'), location.href).pathname;
      loading = fetch(url, { credentials: 'same-origin' })
        .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
        .then(function (data) {
          // fuse_json: an array of {title, body, url}. Keep posts only (their path has /posts/<slug>/).
          // Zola lists pages of the transparent posts section twice: keep the first entry per URL.
          var seen = {};
          index = (Array.isArray(data) ? data : []).filter(function (e) {
            if (!e || !e.title || !/\/posts\/[^/]+\/$/.test(e.url || '') || seen[e.url]) return false;
            seen[e.url] = true;
            return true;
          }).map(function (e) {
            return { title: e.title, url: new URL(e.url, location.href).pathname, t: e.title.toLowerCase(), b: (e.body || '').toLowerCase() };
          });
          return index;
        })
        .catch(function () { index = null; loading = null; return null; });
      return loading;
    };

    var setActive = function (i) {
      var opts = list.querySelectorAll('[role="option"]');
      active = opts.length ? (i + opts.length) % opts.length : -1;
      opts.forEach(function (o, n) {
        var on = n === active;
        o.classList.toggle('is-active', on);
        o.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      if (active >= 0) {
        input.setAttribute('aria-activedescendant', opts[active].id);
        if (opts[active].scrollIntoView) opts[active].scrollIntoView({ block: 'nearest' });
      } else {
        input.removeAttribute('aria-activedescendant');
      }
    };

    var close = function () {
      list.hidden = true;
      list.innerHTML = '';
      results = [];
      active = -1;
      input.setAttribute('aria-expanded', 'false');
      input.removeAttribute('aria-activedescendant');
    };

    var say = function (text) { if (status) status.textContent = text; };

    var render = function () {
      var q = input.value.trim().toLowerCase();
      if (!q || !index) { close(); say(''); return; }
      var inTitle = [], inBody = [];
      index.forEach(function (e) {
        var ti = e.t.indexOf(q);
        if (ti >= 0) inTitle.push({ e: e, k: ti });
        else if (e.b.indexOf(q) >= 0) inBody.push({ e: e, k: 0 });
      });
      inTitle.sort(function (a, b) { return a.k - b.k; });
      results = inTitle.concat(inBody).slice(0, MAX).map(function (x) { return x.e; });
      list.innerHTML = '';
      results.forEach(function (e, n) {
        var li = d.createElement('li');
        li.setAttribute('role', 'option');
        li.id = 'search-opt-' + n;
        li.setAttribute('aria-selected', 'false');
        var a = d.createElement('a');
        a.href = e.url;
        a.textContent = e.title;
        a.tabIndex = -1;
        li.appendChild(a);
        list.appendChild(li);
      });
      active = -1;
      input.removeAttribute('aria-activedescendant');
      list.hidden = results.length === 0;
      input.setAttribute('aria-expanded', results.length ? 'true' : 'false');
      say(results.length === 1 ? '1 result' : results.length + ' results');
    };

    input.addEventListener('focus', load);
    input.addEventListener('input', function () {
      if (index) render(); else load().then(render);
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        if (list.hidden) return;
        e.preventDefault();
        setActive(active < 0 && e.key === 'ArrowUp' ? -1 : active + (e.key === 'ArrowDown' ? 1 : -1));
      } else if (e.key === 'Enter') {
        var opt = active >= 0 && list.querySelectorAll('[role="option"] a')[active];
        if (opt) { e.preventDefault(); window.location.href = opt.href; }
      } else if (e.key === 'Escape') {
        if (input.value || !list.hidden) { e.preventDefault(); e.stopPropagation(); input.value = ''; close(); say(''); }
      }
    });
    list.addEventListener('mousedown', function (e) { if (e.target.closest('a')) e.preventDefault(); });
    list.addEventListener('click', function (e) {
      var a = e.target.closest('a');
      if (a) window.location.href = a.href;
    });
    d.addEventListener('click', function (e) { if (!form.contains(e.target)) close(); });
  }

  /* ---------- Wide tables and code blocks: a box that scrolls sideways takes keyboard focus ---------- */
  var scrollers = d.querySelectorAll('.prose table, .prose pre');
  if (scrollers.length) {
    var markScrollers = function () {
      scrollers.forEach(function (el) {
        if (el.scrollWidth > el.clientWidth + 1) el.setAttribute('tabindex', '0');
        else el.removeAttribute('tabindex');
      });
    };
    markScrollers();
    window.addEventListener('resize', markScrollers);
  }

  /* ---------- Disqus: load embed.js only when #comments nears the viewport or on request ---------- */
  var comments = d.getElementById('comments');
  if (comments && d.getElementById('disqus_thread')) {
    var shortname = comments.getAttribute('data-disqus-shortname');
    var button = comments.querySelector('.comments__load');
    var started = false;
    if (typeof window.disqus_config !== 'function') {
      // Fallback when the inline config is missing: the data attributes carry the same values.
      window.disqus_config = function () {
        this.page.url = comments.getAttribute('data-disqus-url');
        this.page.identifier = comments.getAttribute('data-disqus-identifier');
        this.page.title = comments.getAttribute('data-disqus-title');
      };
    }
    var start = function () {
      if (started || !shortname) return;
      started = true;
      if (button) button.hidden = true;
      var s = d.createElement('script');
      s.src = 'https://' + shortname + '.disqus.com/embed.js';
      s.async = true;
      s.setAttribute('data-timestamp', String(+new Date()));
      (d.head || d.body).appendChild(s);
    };
    if (button) {
      button.hidden = false;
      button.addEventListener('click', start);
    }
    // Focus inside the cross-origin Disqus iframe matches no :focus selector on the frame, so mark the thread by hand.
    // window blur covers a focused window; focusout covers tabbing in when the window itself has no focus.
    var thread = d.getElementById('disqus_thread');
    var markFocus = function () {
      var a = d.activeElement;
      thread.classList.toggle('is-focused', !!a && a.tagName === 'IFRAME' && thread.contains(a));
    };
    window.addEventListener('blur', markFocus);
    window.addEventListener('focus', markFocus);
    d.addEventListener('focusin', markFocus);
    d.addEventListener('focusout', function () { setTimeout(markFocus, 0); });
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        if (entries.some(function (en) { return en.isIntersecting; })) { io.disconnect(); start(); }
      }, { rootMargin: '400px 0px' });
      io.observe(comments);
    }
  }
})();
