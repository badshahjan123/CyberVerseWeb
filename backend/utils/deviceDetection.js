const UAParser = require('ua-parser-js');
const crypto = require('crypto');

// Generate device ID from user agent and IP
const generateDeviceId = (userAgent, ip) => {
  const data = `${userAgent}-${ip}`;
  return crypto.createHash('sha256').update(data).digest('hex');
};

// Parse device information from user agent
const parseDeviceInfo = (userAgent) => {
  const parser = new UAParser(userAgent);
  const result = parser.getResult();
  
  return {
    browser: `${result.browser.name || 'Unknown'} ${result.browser.version || ''}`.trim(),
    os: `${result.os.name || 'Unknown'} ${result.os.version || ''}`.trim(),
    deviceName: result.device.type 
      ? `${result.device.vendor || ''} ${result.device.model || ''} (${result.device.type})`.trim()
      : `${result.os.name || 'Unknown'} Device`
  };
};

// Get complete device information
const getDeviceInfo = (req) => {
  const userAgent = req.headers['user-agent'] || 'Unknown';
  const ip = req.ip || req.connection.remoteAddress || 'Unknown';
  
  const deviceId = generateDeviceId(userAgent, ip);
  const deviceInfo = parseDeviceInfo(userAgent);
  
  return {
    deviceId,
    ...deviceInfo
  };
};

module.exports = {
  generateDeviceId,
  parseDeviceInfo,
  getDeviceInfo
};