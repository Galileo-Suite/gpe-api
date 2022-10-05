import { dateMath, dateTimeParse, PanelModel, rangeUtil, TimeRange } from '@grafana/data';
import { GrafanaDashboard, Panel } from '../types';

export interface TimeOverrideResult {
  timeRange: TimeRange;
  timeInfo: string;
}

interface PanelModelWithTime extends Partial<PanelModel> {
  timeFrom?: string
  timeShift?: string
  hideTimeOverride?: boolean
}

export function applyPanelTimeOverrides(panel: PanelModelWithTime, timeRange: TimeRange): TimeOverrideResult {
  const newTimeData = {
    timeInfo: '',
    timeRange: timeRange,
  };

  if (panel.timeFrom) {
    const timeFromInterpolated = panel.timeFrom
    const timeFromInfo = rangeUtil.describeTextRange(timeFromInterpolated);
    if (timeFromInfo.invalid) {
      newTimeData.timeInfo = 'invalid time override';
      return newTimeData;
    }

    if (typeof timeRange.raw.from === 'string') {
      const timeFromDate = dateMath.parse(timeFromInfo.from)!;
      newTimeData.timeInfo = timeFromInfo.display;
      newTimeData.timeRange = {
        from: timeFromDate,
        to: dateMath.parse(timeFromInfo.to)!,
        raw: {
          from: timeFromInfo.from,
          to: timeFromInfo.to,
        },
      };
    }
  }

  if (panel.timeShift) {
    const timeShiftInterpolated = panel.timeShift
    const timeShiftInfo = rangeUtil.describeTextRange(timeShiftInterpolated);
    if (timeShiftInfo.invalid) {
      newTimeData.timeInfo = 'invalid timeshift';
      return newTimeData;
    }

    const timeShift = '-' + timeShiftInterpolated;
    newTimeData.timeInfo += ' timeshift ' + timeShift;
    const from = dateMath.parseDateMath(timeShift, newTimeData.timeRange.from, false)!;
    const to = dateMath.parseDateMath(timeShift, newTimeData.timeRange.to, true)!;

    newTimeData.timeRange = {
      from,
      to,
      raw: {
        from,
        to,
      },
    };
  }

  if (panel.hideTimeOverride) {
    newTimeData.timeInfo = '';
  }

  return newTimeData;
}

export const getTimeRangeOfPanelInDashboard = (dashboard: GrafanaDashboard, panel: Panel) => {

  const dashboardTimeRange: TimeRange = {
    from: dateTimeParse(dashboard.time.from),
    to: dateTimeParse(dashboard.time.to),
    raw: dashboard.time
  }
  const {timeRange} = applyPanelTimeOverrides(panel, dashboardTimeRange)
  return timeRange
}
