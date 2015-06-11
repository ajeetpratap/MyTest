/* Custom Webservices */

var webservice = require('webService');

/**Push Notification Device Registaration*/
exports.register_device = function(_app_id, _type, _token, callback) {
  _app_id = typeof _app_id !== 'undefined' ? _app_id : '12108';
  _type = typeof _type !== 'undefined' ? _type : 'ios';
  var header_data = [];
  var endpoint = 'http://studio.m2serve.net/m2serve/push_notification/register_device.json';
  var param = {
    'app_id': _app_id,
    'type': _type,
    'token': _token
  };
  webservice.callWebServiceJSON('POST', endpoint, param, header_data, 'json', false, function(e) {
    callback(e);
  }, true);
}; /**Subscribe Push Notification Channel*/
exports.subscribe_channel = function(_app_id, _device_id, _channel, callback) {
  _app_id = typeof _app_id !== 'undefined' ? _app_id : '12108';
  var header_data = [];
  var endpoint = 'http://studio.m2serve.net/m2serve/push_notification/subscribe_channel.json';
  var param = {
    'app_id': _app_id,
    'device_id': _device_id,
    'channel': _channel
  };
  webservice.callWebServiceJSON('POST', endpoint, param, header_data, 'json', false, function(e) {
    callback(e);
  }, true);
}; /**Unsubscribe Push Notification Channel*/
exports.unsubscribe_channel = function(_app_id, _device_id, _channel, callback) {
  _app_id = typeof _app_id !== 'undefined' ? _app_id : '12108';
  var header_data = [];
  var endpoint = 'http://studio.m2serve.net/m2serve/push_notification/unsubscribe_channel.json';
  var param = {
    'app_id': _app_id,
    'device_id': _device_id,
    'channel': _channel
  };
  webservice.callWebServiceJSON('POST', endpoint, param, header_data, 'json', false, function(e) {
    callback(e);
  }, true);
}; /**Send Push Notification*/
exports.send_push_message = function(_app_id, _message, _sound, _alert, _badge, _badge_count, _device, _channel, callback) {
  _app_id = typeof _app_id !== 'undefined' ? _app_id : '12108';
  var header_data = [];
  var endpoint = 'http://studio.m2serve.net/m2serve/push_notification/send_push_message.json';
  var param = {
    'app_id': _app_id,
    'message': _message,
    'sound': _sound,
    'alert': _alert,
    'badge': _badge,
    'badge_count': _badge_count,
    'device': _device,
    'channel': _channel
  };
  webservice.callWebServiceJSON('POST', endpoint, param, header_data, 'json', false, function(e) {
    callback(e);
  }, true);
};