(function($) {
   'use strict';
   var _cache = {},
      _current = {},
      _oldCurrent = {};

   function _display(split) {
      var rst = '';
      split = $.toString(split);

      $.each(_current, function(index, item) {
         if ($.isPlainObject(item) && item.name) {
            rst += item.name + split;
         }
      });

      return rst ? rst.slice(0, rst.length - 1) : '';
   }

   function _getVal(level) {
      var val;
      if (_current) {
         val = _current['.level-' + level];
      }
      return val ? val : {
         id: '',
         name: ''
      };
   }

   function bindTap(selector, context, callback) {
      $(selector, context).tap(callback).tapActive();
   }

   function fromCache(level, id) {
      return _cache && _cache[level + '_' + id];
   }

   function setCache(level, id, data) {
      _cache[level + '_' + id] = data;
      console.log(_cache);
   }

   function loadData(opt, level, index, select, success) {
      var data = fromCache(level, index),
         form,
         url;

      if (data) {
         success(data);
         return;
      }

      url = opt.urls[level];

      if (url) {
         if ($.isFunction(opt.beforeSend)) {
            form = opt.beforeSend(select);
         }
         $.request.send({
            url: url,
            data: form,
            resultLevel: 1,
            success: function(data) {
               var list = [];
               if (data && data.resultData) {
                  if ($.isFunction(opt.success)) {
                     list = opt.success(data.resultData, select);
                     success(list);
                     setCache(level, index, list);
                     return;
                  }

                  if (data.resultData.areaList && data.resultData.areaList.length > 0) {
                     list = data.resultData.areaList;
                     setCache(level, index, list);
                  }

                  success(list);
               } else {
                  success([]);
               }
            }
         });
      } else {
         success([]);
      }
   }

   var _tel = {
         telArea: '<div data-level="#{level}" class="level-#{level} area"></div>',
         telItem: '<div data-index="#{index}" data-id="#{id}" class="js_tap ui-item pr bg-white #{className}">#{name}</div>',
         createItem: function(data, key, opt, level) {
            var rst = '',
               select = _oldCurrent && _oldCurrent[key];
            if (data) {
               $.each(data, function(_, item) {
                  var _temp = {
                     index: _,
                     id: $.toString(item.id),
                     className: '',
                     name: $.toString(item.name)
                  };

                  if (select && select.id === item.id) {
                     _temp.className = 'cur';
                  }

                  if (opt.beforeInitItem) {
                     opt.beforeInitItem(_temp, item, select, level);
                  }

                  rst += $.uiTemplate.bindData(_tel.telItem, _temp);
               });
            }
            return rst;
         },
         createArea: function(level) {
            return $.uiTemplate.bindData(_tel.telArea, {
               level: level
            });
         }
      },
      _defaultOptions = {
         levels: 0,
         dataSource: {},
         urls: {},
         onSelect: $.emptyFun,
         afterSelected: $.emptyFun
      };

   function initArea($wrap, opt, level, id, select) {
      loadData(opt, level, id, select, function(data) {
         if (data && data.length > 0) {
            var selector = '.level-' + level,
               context = $(selector, $wrap),
               html = _tel.createItem(data, selector, opt, level);

            context.siblings().hide();
            context.attr('data-id', id).html(html).show();

            bindTap('.ui-item', context, function() {
               var $this = $(this),
                  $parent = $this.parent(),
                  _level = $parent.attr('data-level'),
                  _pid = $parent.attr('data-id'),
                  _index = $this.attr('data-index'),
                  _id = $this.attr('data-id');

               $.loading.show();

               $('.cur', $parent).removeClass('cur');
               $this.addClass('cur');

               _current[selector] = fromCache(_level, _pid)[_index];

               opt.onSelect(_current[selector]);

               initArea($wrap, opt, _level * 1 + 1, _id, _current[selector]);
            });
         } else {
            console.log(_current);
            opt.afterSelected({
               current: _current,
               display: _display,
               getVal: _getVal
            });
            $wrap.hide();
         }

         $.loading.hide();
      });
   }

   var Select = function(selector, options) {
      var $wrap, opt, html = '<i class="ui-mask w100p h100p"></i><div class ="bfc pa ui-dialog ui-list ft29">';

      if (!$wrap) {
         $wrap = $(selector);
      }

      if (!$wrap || $wrap.length === 0 || !options) {
         return false;
      }

      opt = $.extend({}, _defaultOptions, options);

      $wrap.addClass('bfc ui-dialog-box select-area pa w100p h100p hide');

      for (var i = 0; i < opt.levels; i++) {
         html += _tel.createArea(i);
      }

      html += '</div>';

      $wrap.html(html);

      if (opt.dataSource) {
         $.each(opt.dataSource, function(key, data) {
            _cache[key] = data;
         });
      }

      initArea($wrap, opt, 0, 0, {});

      return {
         show: function() {
            _oldCurrent = _current;
            _current = {};
            for (var i = 0; i < opt.levels; i++) {
               if (i === 0) {
                  $('.level-' + i, selector).show();
               } else {
                  $('.level-' + i, selector).hide();
               }
            }

            $wrap.show();
         }
      };
   };

   $.uiSelect = function(selector, options) {
      return new Select(selector, options);
   };
})(window.Zepto);
