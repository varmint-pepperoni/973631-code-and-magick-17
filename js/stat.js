'use strict';

var STATISTICS_OFFSET_LEFT = 100;
var STATISTICS_OFFSET_TOP = 10;
var STATISTICS_WIDTH = 420;
var STATISTICS_HEIGHT = 270;
var LINE_HEIGHT = 20;

window.renderStatistics = function (ctx, names, times) {
  var textOffsetLeft = STATISTICS_OFFSET_LEFT + 20;
  var textOffsetTop = STATISTICS_OFFSET_TOP + 30;

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(STATISTICS_OFFSET_LEFT + 10, STATISTICS_OFFSET_TOP + 10, STATISTICS_WIDTH, STATISTICS_HEIGHT);

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(STATISTICS_OFFSET_LEFT, STATISTICS_OFFSET_TOP, STATISTICS_WIDTH, STATISTICS_HEIGHT);

  ctx.font = '16px PT Mono';
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  ctx.fillText('Ура вы победили!', textOffsetLeft, textOffsetTop);
  ctx.fillText('Список результатов:', textOffsetLeft, textOffsetTop + LINE_HEIGHT);

  drawColumns(ctx, names, times);
};

var getMaxOfArray = function (arr) {
  return Math.max.apply(null, arr);
};

var drawColumns = function (ctx, names, times) {
  var chartHeight = 150;
  var maxTime = getMaxOfArray(times);
  var proportion = chartHeight / maxTime;

  for (var i = 0; i < names.length; i++) {
    drawColumn(ctx, i, names[i], times[i], times[i] * proportion);
  }
};

var drawColumn = function (ctx, index, name, time, height) {
  var columnWidth = 40;
  var columnOffset = 50;
  var columnOuterWidth = columnWidth + columnOffset;
  var chartOffsetLeft = STATISTICS_OFFSET_LEFT + 50;
  var chartOffsetBottom = STATISTICS_OFFSET_TOP + 20;
  var x = chartOffsetLeft + columnOuterWidth * index;
  var y = STATISTICS_HEIGHT - chartOffsetBottom - height;
  var timeY = y - 5;
  var nameY = STATISTICS_HEIGHT - (chartOffsetBottom - LINE_HEIGHT);
  var saturate = Math.round(Math.random() * 100);
  var randomColor = 'hsl(240, ' + saturate + '%, 50%)';

  ctx.fillStyle = (name === 'Вы') ? 'rgba(255, 0, 0, 1)' : randomColor;
  ctx.fillRect(x, y, columnWidth, height);

  ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  ctx.fillText(Math.round(time), x, timeY, columnOuterWidth);
  ctx.fillText(name, x, nameY, columnOuterWidth);
};
