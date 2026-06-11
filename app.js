(function () {
  "use strict";

  var cfg = window.PRESENTE || {};
  var $ = function (id) { return document.getElementById(id); };

  // Placeholder bonito caso a foto ainda não exista
  var PLACEHOLDER =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#ff4d6d"/><stop offset="1" stop-color="#7a0a23"/>' +
      '</linearGradient></defs><rect width="600" height="600" fill="url(%23g)"/>' +
      '<text x="50%" y="50%" font-family="Inter,sans-serif" font-size="34" fill="rgba(255,255,255,.85)" ' +
      'text-anchor="middle" dy=".35em">coloque sua foto 📷</text></svg>'
    );
  function withFallback(img) {
    img.addEventListener("error", function () { img.src = PLACEHOLDER; });
  }

  // ----------------------------------------------------------------
  //  Preenche os textos a partir do config.js
  // ----------------------------------------------------------------
  function applyConfig() {
    if (cfg.intro) {
      $("intro-de").textContent = cfg.intro.deUm || "Alguém";
      $("intro-sub").textContent = cfg.intro.subtitulo || "";
      $("ver-presente").textContent = cfg.intro.botao || "Ver Presente";
    }

    if (cfg.musica) {
      $("player-title").textContent = cfg.musica.cabecalho || "";
      $("track-title").textContent = cfg.musica.titulo || "";
      $("track-artist").textContent = cfg.musica.artista || "";
      $("audio").src = cfg.musica.arquivo || "";
    }

    if (cfg.casal) {
      $("sobre-title").textContent = cfg.casal.titulo || "Sobre o casal";
      $("couple-names").textContent = cfg.casal.nomes || "";
      $("couple-since").textContent = cfg.casal.desde || "";
      var cp = cfg.casal.fotoDestaque || (cfg.fotos && cfg.fotos[0]);
      if (cp) $("couple-photo").src = cp;
    }

    if (cfg.mensagemFinal) $("msg-final").textContent = cfg.mensagemFinal;

    var host = $("fb-host");
    if (host) {
      var h = window.location.hostname;
      var local = !h || h === "localhost" || h === "127.0.0.1" || h === "[::1]";
      host.textContent = local ? (cfg.intro && cfg.intro.dominio) || "alepraale.vercel.app" : h;
    }
  }

  // ----------------------------------------------------------------
  //  Navegação por ROLAGEM (os botões são só atalhos)
  // ----------------------------------------------------------------
  function irPara(id) {
    var el = $(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  $("ver-presente").addEventListener("click", function () { irPara("player"); tryPlay(); });
  $("back-to-intro").addEventListener("click", function () { irPara("intro"); });
  $("scroll-sobre").addEventListener("click", function () { irPara("sobre"); });
  $("back-to-player").addEventListener("click", function () { irPara("player"); });
  $("scroll-passos").addEventListener("click", function () { irPara("passos"); });
  $("back-to-sobre").addEventListener("click", function () { irPara("sobre"); });

  // Revela o conteúdo ao entrar na tela + toca a música no player
  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("seen");
          if (e.target.id === "player" && e.intersectionRatio > 0.5) tryPlay();
        }
      });
    }, { threshold: [0, 0.5, 0.9] });
    var screens = document.querySelectorAll(".screen");
    for (var i = 0; i < screens.length; i++) obs.observe(screens[i]);
  } else {
    // navegador antigo: mostra tudo
    var all = document.querySelectorAll(".screen");
    for (var j = 0; j < all.length; j++) all[j].classList.add("seen");
  }

  // primeira interação do usuário libera o áudio (autoplay costuma ser bloqueado)
  function primeiraInteracao() {
    var p = $("player").getBoundingClientRect();
    if (p.top < window.innerHeight * 0.5 && p.bottom > window.innerHeight * 0.5) tryPlay();
  }
  ["touchstart", "click", "keydown"].forEach(function (ev) {
    window.addEventListener(ev, primeiraInteracao, { passive: true });
  });

  // ----------------------------------------------------------------
  //  Galeria de fotos no player (troca a cada X segundos)
  // ----------------------------------------------------------------
  var fotos = (cfg.fotos && cfg.fotos.length) ? cfg.fotos : ["assets/photos/foto1.jpg"];
  var fotoIdx = 0;
  var cover = $("cover");
  var dotsWrap = $("cover-dots");

  function buildDots() {
    dotsWrap.innerHTML = "";
    for (var i = 0; i < fotos.length; i++) dotsWrap.appendChild(document.createElement("i"));
  }
  function renderFoto() {
    cover.src = fotos[fotoIdx];
    var dots = dotsWrap.children;
    for (var i = 0; i < dots.length; i++) dots[i].className = (i === fotoIdx ? "on" : "");
  }
  function nextFoto() { fotoIdx = (fotoIdx + 1) % fotos.length; renderFoto(); }
  function prevFoto() { fotoIdx = (fotoIdx - 1 + fotos.length) % fotos.length; renderFoto(); }

  withFallback(cover);
  withFallback($("couple-photo"));
  buildDots();
  renderFoto();
  setInterval(function () { if (!audio.paused) nextFoto(); }, 5000);

  // ----------------------------------------------------------------
  //  Player de áudio
  // ----------------------------------------------------------------
  var audio = $("audio");
  var playBtn = $("play");
  var barFill = $("bar-fill");
  var bar = $("bar");

  function fmt(sec) {
    if (isNaN(sec) || sec < 0) sec = 0;
    var m = Math.floor(sec / 60);
    var s = Math.floor(sec % 60);
    return m + ":" + (s < 10 ? "0" : "") + s;
  }

  function tryPlay() {
    audio.play().then(function () {
      playBtn.textContent = "❚❚";
    }).catch(function () {
      // navegador bloqueou autoplay — usuário toca no botão
      playBtn.textContent = "▶";
    });
  }

  playBtn.addEventListener("click", function () {
    if (audio.paused) { audio.play(); playBtn.textContent = "❚❚"; }
    else { audio.pause(); playBtn.textContent = "▶"; }
  });

  $("next").addEventListener("click", nextFoto);
  $("prev").addEventListener("click", prevFoto);

  audio.addEventListener("play", function () { playBtn.textContent = "❚❚"; });
  audio.addEventListener("pause", function () { playBtn.textContent = "▶"; });

  audio.addEventListener("loadedmetadata", function () {
    $("dur-time").textContent = "-" + fmt(audio.duration);
  });
  audio.addEventListener("timeupdate", function () {
    if (!audio.duration) return;
    var pct = (audio.currentTime / audio.duration) * 100;
    barFill.style.width = pct + "%";
    $("cur-time").textContent = fmt(audio.currentTime);
    $("dur-time").textContent = "-" + fmt(audio.duration - audio.currentTime);
  });
  bar.addEventListener("click", function (e) {
    var rect = bar.getBoundingClientRect();
    var ratio = (e.clientX - rect.left) / rect.width;
    if (audio.duration) audio.currentTime = ratio * audio.duration;
  });

  $("like-btn").addEventListener("click", function () {
    this.style.color = (this.style.color === "rgb(225, 29, 72)" ? "#16b34a" : "#e11d48");
  });

  // ----------------------------------------------------------------
  //  Contador ao vivo (anos, meses, dias, horas, min, seg)
  // ----------------------------------------------------------------
  var inicio = (cfg.casal && cfg.casal.dataInicio) ? cfg.casal.dataInicio : new Date(2021, 0, 1);

  function diffDetalhado(de, ate) {
    var anos = ate.getFullYear() - de.getFullYear();
    var meses = ate.getMonth() - de.getMonth();
    var dias = ate.getDate() - de.getDate();
    var horas = ate.getHours() - de.getHours();
    var min = ate.getMinutes() - de.getMinutes();
    var seg = ate.getSeconds() - de.getSeconds();

    if (seg < 0) { seg += 60; min--; }
    if (min < 0) { min += 60; horas--; }
    if (horas < 0) { horas += 24; dias--; }
    if (dias < 0) {
      var ultimoMes = new Date(ate.getFullYear(), ate.getMonth(), 0).getDate();
      dias += ultimoMes; meses--;
    }
    if (meses < 0) { meses += 12; anos--; }
    return { anos: anos, meses: meses, dias: dias, horas: horas, min: min, seg: seg };
  }

  function tickContador() {
    var d = diffDetalhado(inicio, new Date());
    $("c-anos").textContent = d.anos;
    $("c-meses").textContent = d.meses;
    $("c-dias").textContent = d.dias;
    $("c-horas").textContent = d.horas;
    $("c-min").textContent = d.min;
    $("c-seg").textContent = d.seg;
  }
  tickContador();
  setInterval(tickContador, 1000);

  // ----------------------------------------------------------------
  //  Passos (cards que abrem ao tocar)
  // ----------------------------------------------------------------
  function buildPassos() {
    var ps = cfg.passos || {};
    if (ps.titulo) $("passos-title").textContent = ps.titulo;
    if (ps.subtitulo) $("passos-sub").textContent = ps.subtitulo;

    var lista = $("passos-lista");
    var itens = ps.itens || [];
    for (var i = 0; i < itens.length; i++) {
      var it = itens[i];

      var step = document.createElement("div");
      step.className = "step";

      var head = document.createElement("button");
      head.className = "step-head";
      head.type = "button";

      var badge = document.createElement("span");
      badge.className = "step-badge";
      badge.textContent = "Passo " + (i + 1);

      var hint = document.createElement("span");
      hint.className = "step-hint";
      hint.textContent = "Toque para revelar";

      var plus = document.createElement("span");
      plus.className = "step-plus";
      plus.textContent = "+";

      head.appendChild(badge);
      head.appendChild(hint);
      head.appendChild(plus);

      var reveal = document.createElement("div");
      reveal.className = "step-reveal";
      var inner = document.createElement("div");
      inner.className = "step-reveal-in";

      if (it.titulo) {
        var ttl = document.createElement("h3");
        ttl.className = "step-reveal-title";
        ttl.textContent = it.titulo;
        inner.appendChild(ttl);
      }

      var img = document.createElement("img");
      img.className = "step-foto";
      img.alt = it.titulo || ("Passo " + (i + 1));
      img.src = it.foto || "";
      withFallback(img);
      inner.appendChild(img);

      if (it.legenda && it.legenda !== "...") {
        var cap = document.createElement("p");
        cap.className = "step-legenda";
        cap.textContent = it.legenda;
        inner.appendChild(cap);
      }

      reveal.appendChild(inner);
      step.appendChild(head);
      step.appendChild(reveal);
      lista.appendChild(step);

      head.addEventListener("click", (function (el) {
        return function () { el.classList.toggle("open"); };
      })(step));
    }
  }

  buildPassos();

  // ----------------------------------------------------------------
  //  Carta final + corações caindo ao fundo
  // ----------------------------------------------------------------
  function buildCarta() {
    var c = cfg.carta || {};
    if (c.titulo) $("carta-title").textContent = c.titulo;
    if (c.assinatura) $("carta-assinatura").textContent = c.assinatura;
    var wrap = $("carta-texto");
    if (wrap && c.paragrafos && c.paragrafos.length) {
      wrap.innerHTML = "";
      for (var i = 0; i < c.paragrafos.length; i++) {
        var p = document.createElement("p");
        p.textContent = c.paragrafos[i];
        wrap.appendChild(p);
      }
    }
  }

  function buildHearts() {
    var box = $("hearts-bg");
    if (!box) return;
    var cores = ["#ff4d6d", "#ff8fab", "#ffd9e2", "#ffffff"];
    var N = 42;
    for (var i = 0; i < N; i++) {
      var h = document.createElement("span");
      h.className = "heart";
      h.textContent = "♥";
      var size = 10 + Math.random() * 26;            // 10–36px
      var dur = 7 + Math.random() * 9;               // 7–16s
      var delay = -Math.random() * dur;              // já começa no meio da queda
      var op = 0.25 + Math.random() * 0.4;           // 0.25–0.65
      var sway = (Math.random() * 60 - 30).toFixed(0) + "px";
      var rot = (Math.random() * 120 - 60).toFixed(0) + "deg";
      h.style.left = (Math.random() * 100).toFixed(2) + "%";
      h.style.fontSize = size.toFixed(1) + "px";
      h.style.color = cores[Math.floor(Math.random() * cores.length)];
      h.style.setProperty("--op", op.toFixed(2));
      h.style.setProperty("--sway", sway);
      h.style.setProperty("--rot", rot);
      h.style.animationDuration = dur.toFixed(1) + "s";
      h.style.animationDelay = delay.toFixed(1) + "s";
      box.appendChild(h);
    }
  }

  function setupCarta() {
    var env = $("envelope");
    var hint = $("env-hint");
    var inner = $("carta-inner");
    var carta = $("carta");
    if (!env) return;
    var aberto = false;
    function abrir() {
      if (aberto) return;
      aberto = true;
      env.classList.add("opening");           // aba abre + papel sobe + selo some
      setTimeout(function () {
        env.style.opacity = "0";              // envelope some
        env.style.transform = "scale(.85)";
        hint.style.opacity = "0";
        setTimeout(function () {
          env.style.display = "none";
          hint.style.display = "none";
          inner.style.display = "block";
          void inner.offsetHeight;            // força reflow p/ animar o fade
          carta.classList.add("revealed");    // texto aparece
          $("app").scrollTo({ top: carta.offsetTop, behavior: "smooth" });
        }, 450);
      }, 900);
    }
    env.addEventListener("click", abrir);
  }

  buildCarta();
  buildHearts();
  setupCarta();

  // ----------------------------------------------------------------
  applyConfig();
})();
