'use strict';

(function () {
  var STATISTICS_OFFSET_LEFT = 100;
  var STATISTICS_OFFSET_TOP = 10;
  var STATISTICS_WIDTH = 420;
  var STATISTICS_HEIGHT = 270;
  var LINE_HEIGHT = 20;
  var CHART_HEIGHT = 150;
  var CHART_COLUMN_WIDTH = 40;
  var CHART_COLUMN_OFFSET = 50;

  var getMaxOfArray = function (arr) {
    return Math.max.apply(null, arr);
  };

  var drawColumns = function (ctx, names, times) {
    var maxTime = getMaxOfArray(times);
    var proportion = CHART_HEIGHT / maxTime;

    names.forEach(function (name, i) {
      drawColumn(ctx, i, name, times[i], times[i] * proportion);
    });
  };

  var drawColumn = function (ctx, index, name, time, height) {
    var columnOuterWidth = CHART_COLUMN_WIDTH + CHART_COLUMN_OFFSET;
    var chartOffsetLeftWithoutStatisticsOffsetLeft = 50;
    var chartOffsetLeft = STATISTICS_OFFSET_LEFT + chartOffsetLeftWithoutStatisticsOffsetLeft;
    var chartOffsetBottomWithoutStatisticsOffsetTop = 20;
    var chartOffsetBottom = STATISTICS_OFFSET_TOP + chartOffsetBottomWithoutStatisticsOffsetTop;
    var x = chartOffsetLeft + columnOuterWidth * index;
    var y = STATISTICS_HEIGHT - chartOffsetBottom - height;
    var timeYOffset = 5;
    var timeY = y - timeYOffset;
    var nameY = STATISTICS_HEIGHT - (chartOffsetBottom - LINE_HEIGHT);
    var justOneHundredPerсent = 100;
    var saturate = Math.round(Math.random() * justOneHundredPerсent);
    var randomColor = 'hsl(240, ' + saturate + '%, 50%)';

    ctx.fillStyle = (name === 'Вы') ? 'rgba(255, 0, 0, 1)' : randomColor;
    ctx.fillRect(x, y, CHART_COLUMN_WIDTH, height);

    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillText(Math.round(time), x, timeY, columnOuterWidth);
    ctx.fillText(name, x, nameY, columnOuterWidth);
  };

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
})();
