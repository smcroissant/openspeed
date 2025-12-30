export type Locale = 'en' | 'fr' | 'es' | 'it' | 'de' | 'ja';

export const locales: Locale[] = ['en', 'fr', 'es', 'it', 'de', 'ja'];
export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
  it: 'Italiano',
  de: 'Deutsch',
  ja: '日本語',
};

export const hasLocale = (locale: string): locale is Locale =>
  locales.includes(locale as Locale);

// Inline dictionaries for client-side use
export const dictionaries: Record<Locale, Dictionary> = {
  en: {
    meta: {
      title: "OpenSpeed - Free Internet Speed Test | Check Your Connection",
      description: "Test your internet connection speed instantly with OpenSpeed. Measure download speed, upload speed, ping, and jitter with our fast, accurate, and free speed test tool.",
      ogTitle: "OpenSpeed - Free Internet Speed Test",
      ogDescription: "Test your internet speed instantly. Measure download, upload, ping, and jitter with our free speed test.",
    },
    header: { subtitle: "Test your internet connection speed" },
    speedTest: { start: "GO", startHint: "start test", tapToStop: "tap to stop", cancel: "Cancel", runAgain: "Run Again" },
    phases: { idle: "Ready", ping: "Ping", latency: "Latency", download: "Download", upload: "Upload", complete: "Complete", done: "Done" },
    results: { title: "Your Speed Test Results", download: "Download", upload: "Upload", ping: "Ping", jitter: "Jitter" },
    server: { label: "Server", yourLocation: "Your location", poweredBy: "Powered by", auto: "Auto (Nearest)", selectServer: "Select server", changeServer: "Change server" },
    footer: { text: "Free internet speed test - Check your download, upload, ping & jitter" },
    accessibility: { speedTestAriaLabel: "Speed test controls and results", runAgainAriaLabel: "Run speed test again", cancelAriaLabel: "Cancel speed test", statusAriaLabel: "Speed test status" },
    schema: { featureList: ["Download speed test", "Upload speed test", "Ping/latency measurement", "Jitter measurement", "Real-time results"] },
  },
  fr: {
    meta: {
      title: "OpenSpeed - Test de Vitesse Internet Gratuit | Vérifiez Votre Connexion",
      description: "Testez la vitesse de votre connexion Internet instantanément avec OpenSpeed. Mesurez la vitesse de téléchargement, d'envoi, le ping et la gigue avec notre outil de test de vitesse rapide, précis et gratuit.",
      ogTitle: "OpenSpeed - Test de Vitesse Internet Gratuit",
      ogDescription: "Testez votre vitesse Internet instantanément. Mesurez téléchargement, envoi, ping et gigue avec notre test de vitesse gratuit.",
    },
    header: { subtitle: "Testez la vitesse de votre connexion Internet" },
    speedTest: { start: "GO", startHint: "lancer le test", tapToStop: "appuyez pour arrêter", cancel: "Annuler", runAgain: "Relancer" },
    phases: { idle: "Prêt", ping: "Ping", latency: "Latence", download: "Téléchargement", upload: "Envoi", complete: "Terminé", done: "Fini" },
    results: { title: "Vos Résultats de Test de Vitesse", download: "Téléchargement", upload: "Envoi", ping: "Ping", jitter: "Gigue" },
    server: { label: "Serveur", yourLocation: "Votre position", poweredBy: "Propulsé par", auto: "Auto (Le plus proche)", selectServer: "Choisir un serveur", changeServer: "Changer de serveur" },
    footer: { text: "Test de vitesse Internet gratuit - Verifiez telechargement, envoi, ping et gigue" },
    accessibility: { speedTestAriaLabel: "Contrôles et résultats du test de vitesse", runAgainAriaLabel: "Relancer le test de vitesse", cancelAriaLabel: "Annuler le test de vitesse", statusAriaLabel: "État du test de vitesse" },
    schema: { featureList: ["Test de vitesse de téléchargement", "Test de vitesse d'envoi", "Mesure du ping/latence", "Mesure de la gigue", "Résultats en temps réel"] },
  },
  es: {
    meta: {
      title: "OpenSpeed - Test de Velocidad de Internet Gratis | Comprueba Tu Conexión",
      description: "Prueba la velocidad de tu conexión a Internet instantáneamente con OpenSpeed. Mide velocidad de descarga, subida, ping y jitter con nuestra herramienta de test de velocidad rápida, precisa y gratuita.",
      ogTitle: "OpenSpeed - Test de Velocidad de Internet Gratis",
      ogDescription: "Prueba tu velocidad de Internet instantáneamente. Mide descarga, subida, ping y jitter con nuestro test de velocidad gratuito.",
    },
    header: { subtitle: "Prueba la velocidad de tu conexión a Internet" },
    speedTest: { start: "IR", startHint: "iniciar prueba", tapToStop: "toca para detener", cancel: "Cancelar", runAgain: "Repetir" },
    phases: { idle: "Listo", ping: "Ping", latency: "Latencia", download: "Descarga", upload: "Subida", complete: "Completado", done: "Hecho" },
    results: { title: "Tus Resultados del Test de Velocidad", download: "Descarga", upload: "Subida", ping: "Ping", jitter: "Jitter" },
    server: { label: "Servidor", yourLocation: "Tu ubicación", poweredBy: "Desarrollado con", auto: "Auto (Más cercano)", selectServer: "Seleccionar servidor", changeServer: "Cambiar servidor" },
    footer: { text: "Test de velocidad de Internet gratis - Comprueba descarga, subida, ping y jitter" },
    accessibility: { speedTestAriaLabel: "Controles y resultados del test de velocidad", runAgainAriaLabel: "Ejecutar test de velocidad de nuevo", cancelAriaLabel: "Cancelar test de velocidad", statusAriaLabel: "Estado del test de velocidad" },
    schema: { featureList: ["Test de velocidad de descarga", "Test de velocidad de subida", "Medición de ping/latencia", "Medición de jitter", "Resultados en tiempo real"] },
  },
  it: {
    meta: {
      title: "OpenSpeed - Test Velocità Internet Gratuito | Verifica la Tua Connessione",
      description: "Testa la velocità della tua connessione Internet istantaneamente con OpenSpeed. Misura velocità di download, upload, ping e jitter con il nostro strumento di test velocità veloce, preciso e gratuito.",
      ogTitle: "OpenSpeed - Test Velocità Internet Gratuito",
      ogDescription: "Testa la tua velocità Internet istantaneamente. Misura download, upload, ping e jitter con il nostro test di velocità gratuito.",
    },
    header: { subtitle: "Testa la velocità della tua connessione Internet" },
    speedTest: { start: "VAI", startHint: "avvia test", tapToStop: "tocca per fermare", cancel: "Annulla", runAgain: "Riprova" },
    phases: { idle: "Pronto", ping: "Ping", latency: "Latenza", download: "Download", upload: "Upload", complete: "Completato", done: "Fatto" },
    results: { title: "I Tuoi Risultati del Test di Velocità", download: "Download", upload: "Upload", ping: "Ping", jitter: "Jitter" },
    server: { label: "Server", yourLocation: "La tua posizione", poweredBy: "Alimentato da", auto: "Auto (Più vicino)", selectServer: "Seleziona server", changeServer: "Cambia server" },
    footer: { text: "Test velocita Internet gratuito - Verifica download, upload, ping e jitter" },
    accessibility: { speedTestAriaLabel: "Controlli e risultati del test di velocità", runAgainAriaLabel: "Esegui di nuovo il test di velocità", cancelAriaLabel: "Annulla test di velocità", statusAriaLabel: "Stato del test di velocità" },
    schema: { featureList: ["Test velocità download", "Test velocità upload", "Misurazione ping/latenza", "Misurazione jitter", "Risultati in tempo reale"] },
  },
  de: {
    meta: {
      title: "OpenSpeed - Kostenloser Internet-Geschwindigkeitstest | Überprüfen Sie Ihre Verbindung",
      description: "Testen Sie Ihre Internetverbindungsgeschwindigkeit sofort mit OpenSpeed. Messen Sie Download-Geschwindigkeit, Upload-Geschwindigkeit, Ping und Jitter mit unserem schnellen, genauen und kostenlosen Geschwindigkeitstest-Tool.",
      ogTitle: "OpenSpeed - Kostenloser Internet-Geschwindigkeitstest",
      ogDescription: "Testen Sie Ihre Internetgeschwindigkeit sofort. Messen Sie Download, Upload, Ping und Jitter mit unserem kostenlosen Geschwindigkeitstest.",
    },
    header: { subtitle: "Testen Sie Ihre Internetverbindungsgeschwindigkeit" },
    speedTest: { start: "LOS", startHint: "Test starten", tapToStop: "tippen zum Stoppen", cancel: "Abbrechen", runAgain: "Erneut testen" },
    phases: { idle: "Bereit", ping: "Ping", latency: "Latenz", download: "Download", upload: "Upload", complete: "Abgeschlossen", done: "Fertig" },
    results: { title: "Ihre Geschwindigkeitstest-Ergebnisse", download: "Download", upload: "Upload", ping: "Ping", jitter: "Jitter" },
    server: { label: "Server", yourLocation: "Ihr Standort", poweredBy: "Betrieben von", auto: "Auto (Nächster)", selectServer: "Server auswählen", changeServer: "Server ändern" },
    footer: { text: "Kostenloser Internet-Geschwindigkeitstest - Prufen Sie Download, Upload, Ping & Jitter" },
    accessibility: { speedTestAriaLabel: "Steuerung und Ergebnisse des Geschwindigkeitstests", runAgainAriaLabel: "Geschwindigkeitstest erneut ausführen", cancelAriaLabel: "Geschwindigkeitstest abbrechen", statusAriaLabel: "Status des Geschwindigkeitstests" },
    schema: { featureList: ["Download-Geschwindigkeitstest", "Upload-Geschwindigkeitstest", "Ping/Latenz-Messung", "Jitter-Messung", "Echtzeit-Ergebnisse"] },
  },
  ja: {
    meta: {
      title: "OpenSpeed - 無料インターネット速度テスト | 接続をチェック",
      description: "OpenSpeedでインターネット接続速度を即座にテストしましょう。高速で正確な無料速度テストツールで、ダウンロード速度、アップロード速度、ping、ジッターを測定します。",
      ogTitle: "OpenSpeed - 無料インターネット速度テスト",
      ogDescription: "インターネット速度を即座にテスト。無料速度テストでダウンロード、アップロード、ping、ジッターを測定。",
    },
    header: { subtitle: "インターネット接続速度をテスト" },
    speedTest: { start: "開始", startHint: "テスト開始", tapToStop: "タップして停止", cancel: "キャンセル", runAgain: "再テスト" },
    phases: { idle: "準備完了", ping: "Ping", latency: "レイテンシ", download: "ダウンロード", upload: "アップロード", complete: "完了", done: "完了" },
    results: { title: "速度テスト結果", download: "ダウンロード", upload: "アップロード", ping: "Ping", jitter: "ジッター" },
    server: { label: "サーバー", yourLocation: "あなたの場所", poweredBy: "提供", auto: "自動（最寄り）", selectServer: "サーバーを選択", changeServer: "サーバーを変更" },
    footer: { text: "Free internet speed test - Download, upload, ping, jitter" },
    accessibility: { speedTestAriaLabel: "速度テストの操作と結果", runAgainAriaLabel: "速度テストを再実行", cancelAriaLabel: "速度テストをキャンセル", statusAriaLabel: "速度テストの状態" },
    schema: { featureList: ["ダウンロード速度テスト", "アップロード速度テスト", "ping/レイテンシ測定", "ジッター測定", "リアルタイム結果"] },
  },
};

export interface Dictionary {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  header: { subtitle: string };
  speedTest: { start: string; startHint: string; tapToStop: string; cancel: string; runAgain: string };
  phases: { idle: string; ping: string; latency: string; download: string; upload: string; complete: string; done: string };
  results: { title: string; download: string; upload: string; ping: string; jitter: string };
  server: { label: string; yourLocation: string; poweredBy: string; auto: string; selectServer: string; changeServer: string };
  footer: { text: string };
  accessibility: { speedTestAriaLabel: string; runAgainAriaLabel: string; cancelAriaLabel: string; statusAriaLabel: string };
  schema: { featureList: string[] };
}

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale] || dictionaries.en;

