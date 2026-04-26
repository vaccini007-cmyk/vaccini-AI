class Logger {
  static log(message, data = null) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ℹ️  ${message}`, data || '');
  }

  static info(message, data = null) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ℹ️  ${message}`, data || '');
  }

  static error(message, error = null) {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] ❌ ${message}`, error || '');
  }

  static warn(message, data = null) {
    const timestamp = new Date().toISOString();
    console.warn(`[${timestamp}] ⚠️  ${message}`, data || '');
  }

  static success(message, data = null) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ✅ ${message}`, data || '');
  }

  static debug(message, data = null) {
    if (process.env.NODE_ENV === 'development') {
      const timestamp = new Date().toISOString();
      console.log(`[${timestamp}] 🔍 ${message}`, data || '');
    }
  }
}

module.exports = Logger;
