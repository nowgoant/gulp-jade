/**
 * Created by majun1 on 2015/3/4.
 */

(function () {
  'use strict';

  var div = document.createElement('div'),
    tel = '<div class="lib-mask"></div>' +
      '<div class="lod-spinn">' +
      '<div class="lod-double-bounce1"></div>' +
      '<div class="lod-double-bounce2"></div>' +
      '<div class="lod-text">加载中...</div>' +
      '</div>';

  div.className = 'lod-Box w100p h100p bfc';
  div.innerHTML = tel;

  document.body.appendChild(div);
}());

