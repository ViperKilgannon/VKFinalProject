import jquery from "jquery";

jquery.ajaxPrefilter(options => {
  if (!options.xhrFields) options.xhrFields = {};
  options.xhrFields.withCredentials = true;
});
