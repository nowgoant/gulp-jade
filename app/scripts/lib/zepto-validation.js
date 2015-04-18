/**
 * Created by majun1 on 2015/3/2.
 */

(function ($) {
  'use strict';

  function trim(el) {
    return (''.trim) ? el.val().trim() : $.trim(el.val());
  }

  $.fn.validation = function validation(config) {
    var fields = [],
      items;

    function isFunction(obj) {
      return !!(obj && obj.constructor && obj.call && obj.apply);
    }

    function defaultError(error) { //Default error template
      var msgErrorClass = config.classes && config.classes.message || 'unhappyMessage';
      //return $('<span id="' + error.id + '" class="' + msgErrorClass + '" role="alert">' + error.message + '</span>');
      return {
        id: error.id,
        classes: msgErrorClass,
        message: error.message
      };
    }

    function getError(error) { //Generate error html from either config or default
      if (isFunction(config.errorTemplate)) {
        return config.errorTemplate(error);
      }
      return defaultError(error);
    }

    function handleSubmit() {
      var i, l, isValid = true;
      var errors = false, $this = $(this);
      if (false === $this.isEnable()) {
        console.log($this);
        return false;
      }

      for (i = 0, l = fields.length; i < l; i += 1) {
        if ($.isFunction(config.beforeValid)) {
          isValid = config.beforeValid(fields[i]);
        }

        if (isValid && !fields[i].testValid(true)) {
          errors = true;
          fields[i].focus();
          break;
        }
      }

      if (errors) {
        return false;
      }

      if (isFunction(config.success)) {
        config.success();
      }
    }


    function processField(opts, selector) {
      var field = $(selector);
      var error = {
        message: opts.message || '',
        id: selector.slice(1) + '_unhappy'
      };
      var errorEl = $(error.id).length > 0 ? $(error.id) : getError(error);
      var handleBlur = function () {
        var inputfun = opts.onInput || config.onInput;
        if (isFunction(inputfun)) {
          inputfun.call(this);
        }
      };

      fields.push(field);
      field.testValid = function testValid(submit) {
        var val, gotFunc;
        var el = $(this);
        var errorTarget = (opts.errorTarget && $(opts.errorTarget)) || el;
        var error = false;
        var required = !!el.get(0).attributes.getNamedItem('required') || opts.required;
        var password = (field.attr('type') === 'password');
        var arg = isFunction(opts.arg) ? opts.arg() : opts.arg;
        var fieldErrorClass = config.classes && config.classes.field || 'unhappy';

        // handle control groups (checkboxes, radio)
        if (el.length > 1) {
          val = [];
          el.each(function (i, obj) {
            val.push($(obj).val());
          });
          val = val.join(',');
        } else {
          // clean it or trim it
          if (isFunction(opts.clean)) {
            val = opts.clean(el.val());
          } else if (!password && typeof opts.trim === 'undefined' || opts.trim) {
            val = trim(el);
          } else {
            val = el.val();
          }

          // write it back to the field
          el.val(val);
        }

        // get the value
        gotFunc = ((val.length > 0 || required === 'sometimes') && isFunction(opts.test));

        // check if we've got an error on our hands
        if (submit === true && required === true && val.length === 0) {
          error = true;
        } else if (gotFunc) {
          error = !opts.test(val, arg);
        }

        if (error) {
          errorTarget.addClass(fieldErrorClass);
          if (isFunction(opts.showError)) {
            opts.showError(errorEl);
          } else if (isFunction(config.showError)) {
            config.showError(errorEl);
          }
          return false;
        } else {
          errorTarget.removeClass(fieldErrorClass);
          if (isFunction(opts.hideError)) {
            opts.hideError();
          } else if (isFunction(config.hideError)) {
            config.hideError();
          }
          return true;
        }
      };
      field.bind(opts.when || config.when || 'input', handleBlur);
    }

    function _processField(_, value) {
      processField(value, items);
    }

    for (items in config.fields) {
      if ($.isArray(config.fields[items])) {
        $.each(config.fields[items], _processField);
      } else {
        processField(config.fields[items], items);
      }
    }

    if (config.submitButton) {
      $(config.submitButton).tap(handleSubmit);
    } else {
      this.bind('submit', handleSubmit);
    }
    return this;
  };
}(window.Zepto));
