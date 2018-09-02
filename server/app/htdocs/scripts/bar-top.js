'use strict';

function isHovering(selector) {
  return $(selector).data('hover') ? true : false;
}
$(document).ready(function () {
  $('*').hover(function () {
    $(this).data('hover', 1);
  }, function () {
    $(this).data('hover', 0);
  });

  $('body').append('<div id="dropdown" style="display: none"></div>');

  var allowHide = true;

  $('html').click(function () {
    if (isHovering('#dropdown')) return true;
    if (!$('#dropdown').is(':visible')) return true;
    if (!allowHide) return true;
    if (!$('#dropdown').is(':hover')) $('#dropdown').hide();
  });
  $('#bar-top ul li').click(function () {
    var position = $(this).position();
    var html = $(this).children('div').html();
    $('#dropdown').html(html);
    $('#dropdown').css({ top: position.top + 20, left: position.left, position: 'absolute' });
    $('#dropdown').show();
    allowHide = false;
    setTimeout(function () {
      allowHide = true;
    }, 1000);
    return false;
  });
});