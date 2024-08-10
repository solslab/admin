import { Big, BigSource } from "big.js";
import _ from "lodash";
import moment, { Moment, unitOfTime } from "moment";
import numeral from "numeral";

numeral.nullFormat("-");

const big = (input: BigSource): Big => {
  try {
    return new Big(input);
  } catch (e) {
    return new Big(0);
  }
};

export namespace Format {
  export function checkBase64(str: string) {
    const regex =
      /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    try {
      return regex.test(str);
    } catch (err) {
      return false;
    }
  }

  export function removeInvalidNumber(value: number) {
    if (isNaN(value) || _.isUndefined(value)) {
      return 0;
    } else {
      return value;
    }
  }

  export function removeMarkdown(value: string | undefined) {
    if (!value) {
      return "";
    }
    return value
      .replace(/([*_~`])/g, "")
      .replace("<B>", "")
      .replace("</B>", "")
      .replaceAll("\\n", " ")
      .replaceAll("#", "");
  }

  export function formatHttp(site: string | undefined) {
    const trimmed = site?.trim();
    return trimmed
      ? trimmed.startsWith("http")
        ? trimmed
        : `https://${trimmed}`
      : undefined;
  }
  export function formatHttpNotNull(site: string | undefined) {
    const trimmed = site?.trim();
    return trimmed
      ? trimmed.startsWith("http")
        ? trimmed
        : `https://${trimmed}`
      : "";
  }

  export function capitalize(value: string | undefined) {
    const stringValue = value || "-";
    return /^[A-Z]$/.test(stringValue[0])
      ? stringValue
      : _.capitalize(stringValue);
  }

  export function startCase(value: string | undefined) {
    return _.startCase(value || "-");
  }
  export function titleCase(value: string | undefined) {
    return (
      value?.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }) || "-"
    );
  }
  export function isValidUrl(string: string) {
    try {
      new URL(string);
    } catch (_) {
      return false;
    }

    return true;
  }

  export function dateDiffDays(
    to: string | Date | number,
    from?: string | Date | number,
  ) {
    return moment(from).diff(moment(to), "days") + " days";
  }

  export function dateDiffDdays(
    to: string | Date | number,
    from?: string | Date | number,
  ) {
    const diffDays = moment(from).diff(to, "days");
    if (_.isNaN(diffDays)) {
      return "-";
    }
    return "D" + (diffDays >= 0 ? "+" : "") + diffDays;
  }

  export function dateLeftDays(
    to: string | Date | number,
    from?: string | Date | number,
    appendix = "days remaining",
  ) {
    return moment(to).diff(moment(from), "days") + " " + appendix;
  }

  type DateType = number | string | Date | Moment | undefined;

  export function timeForDataTable(target: DateType) {
    return [
      Format.dateDH(target),
      `${Format.time(target)} (${Format.dateAgo(target)})`,
    ];
  }
  export function duration(arg: {
    target: DateType;
    current?: DateType;
    unit?: unitOfTime.Base;
  }) {
    const { target, current = new Date(), unit = "day" } = arg;
    return moment(current).diff(moment(target), unit);
  }

  export function dateAgo(value: DateType, now?: DateType) {
    const diff = duration({ target: value, unit: "seconds", current: now });
    if (Math.abs(diff) < 60) {
      return `${diff}s ago`;
    }
    return moment(value).fromNow();
  }

  export function date(value: DateType) {
    return moment(value).format("YYYY-MM-DD");
  }

  export function dateNoDash(value: DateType) {
    return moment(value).format("YYYYMMDD");
  }

  export function dateTime(value: DateType) {
    return moment(value).format("YYYY-MM-DD HH:mm:ss");
  }

  export function dateTimePlain(value: DateType) {
    return moment(value).format("YYYYMMDDHHmmss");
  }

  export function dateTimeOnly(value: DateType) {
    return moment(value).format("HH:mm:ss");
  }
  export function dateTimeWithMS(value: DateType) {
    return moment(value).format("YYYY-MM-DD HH:mm:ss.SSS");
  }

  export function dateTimeNoSeconds(value: DateType) {
    return moment(value).format("YYYY-MM-DD HH:mm");
  }
  export function time(value: DateType) {
    return moment(value).format("HH:mm:ss");
  }

  export function dateFull(
    date?: DateType,
    format: string = "MMM Do YYYY, HH:mm",
  ) {
    if (_.isNil(date)) {
      return "-";
    }
    return moment(date).format(format);
  }

  export function dateDH(value: DateType) {
    return moment(value).format("MMM Do, YYYY");
  }

  export function dateTimeDH(value: DateType) {
    return moment(value).format("MMM Do YYYY, HH:mm:ss");
  }

  export function dateTimeDHUTC(value: DateType) {
    return moment(value).utc().format("MMM Do YYYY, HH:mm:ss");
  }

  export function dateTimeDHUTCWithOffset(value: DateType) {
    return moment(value).utc().format("MMM Do YYYY, HH:mm:ssZ");
  }

  export function fromNow(value: DateType) {
    return moment(value).fromNow();
  }

  export function fromNowSimple(value: DateType) {
    moment.locale("en", {
      relativeTime: {
        past: "%s",
        s: "Just Now",
        ss: "%ss ago",
        m: "%d min ago",
        mm: "%d mins ago",
        h: "an hour ago",
        hh: "%d hours ago",
        d: "%d day ago",
        dd: "%d days ago",
        w: "%d week ago",
        ww: "%d weeks ago",
        M: "%d month ago",
        MM: "%d months ago",
        y: "%d year ago",
        yy: "%d years ago",
      },
    });
    return moment(value).fromNow();
  }

  export function float1(value: number | string) {
    const result = numeral(value).format("0,0.0");
    return result === "NaN" ? "0.0" : result;
  }

  export function float2(value: number | string) {
    const result = numeral(value).format("0,0.00");
    return result === "NaN" ? "0.00" : result;
  }

  export function float3(value: number | string) {
    const _cutoff = 1e-3;

    if (Math.abs(Number(value)) < _cutoff) {
      if (Number(value) < 0) {
        return "< " + numeral("0").format("0.000");
      } else if (Number(value) > 0) {
        return "< " + numeral(_cutoff).format("0.000");
      } else {
        return numeral("0").format("0.000");
      }
    } else {
      return `${numeral(value).format("0,0.000")}`;
    }
  }

  export function float4(value: number | string) {
    const result = numeral(value).format("0,0.0000");
    return result === "NaN" ? "0.0000" : result;
  }

  export function float5(value: number | string) {
    const result = numeral(value).format("0,0.00000");
    return result === "NaN" ? "0.00000" : result;
  }

  export function float6(value: number | string, sign?: boolean) {
    const result = numeral(value).format("0,0.000000");
    const _sign = sign ? (Number(value) > 0 ? "+" : "") : "";
    return result === "NaN" ? "0.000000" : _sign + result;
  }

  export function floatWithDecimalNoCutoff(
    value: number | string,
    decimal?: number,
  ) {
    if (value == undefined || isNaN(Number(value))) {
      return "-";
    }
    return decimal
      ? Number.parseFloat(String(value)).toLocaleString(undefined, {
          minimumFractionDigits: decimal,
        })
      : big(value).toString();
  }

  export function floatWithDecimal(
    value: number | string,
    decimal: number,
    noCutoff: boolean = false,
  ) {
    if (!noCutoff && Number(value) < 0.000001 && Number(value) > 0) {
      return "< 0.000001";
    }

    return `${numeral(value).format(`0,0.${"0".repeat(decimal)}`)}`;
  }

  export function updateAt(date: DateType) {
    return date
      ? `Updated at ${moment(date).format("MMMM Do, HH:mm:ss")}`
      : "-";
  }

  export function updateAtUTC(date: DateType) {
    return date
      ? `Updated at ${moment(date).utc(false).format("YYYY-MM-DD HH:mm:ss z")}`
      : "-";
  }

  export function updateAtOnlyDate(date: DateType) {
    return date ? `Updated at ${moment(date).format("MMMM Do, YYYY")}` : "-";
  }

  export function integer(value: number | string | undefined) {
    return isNaN(Number(value))
      ? "-"
      : formatNumberWithCommas(value as number | string);

    function formatNumberWithCommas(number: number | string) {
      // 숫자를 문자열로 변환
      const numberString = number.toString();

      // 소수점을 기준으로 정수 부분과 소수 부분으로 나눔
      const parts = numberString.split(".");
      const integerPart = parts[0];

      // 천 단위로 쉼표를 추가하여 정수 부분을 포맷팅
      const formattedIntegerPart = integerPart.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ",",
      );

      return formattedIntegerPart;
    }
  }

  export function blockHeight(value: number | string | undefined) {
    return isNaN(Number(value)) ? "-" : numeral(value).format("0,0");
  }
  export function percent1(
    value: number | string | undefined,
    cutoff: number | null = null,
    agg: boolean = false,
  ) {
    const _cutoff = cutoff !== null ? (cutoff < 1e-5 ? 1e-5 : cutoff) : 1e-5;

    if (
      value === undefined ||
      isNaN(Number(value)) ||
      Number(value) === Infinity
    ) {
      return "-";
    } else {
      let output = "0.0%";
      if (Number(value) > 0 && Number(value) < _cutoff) {
        output = "< " + numeral(_cutoff).format("0.0%");
      } else {
        output = `${numeral(value).format("0.0%")}`;
      }
      return `${agg && Number(value) > 0 ? "+" : ""}${output}`;
    }
  }

  export function percent2(
    value: number | string | undefined,
    cutoff: number | null = null,
    agg: boolean = false,
  ) {
    const _cutoff = cutoff !== null ? (cutoff < 1e-5 ? 1e-5 : cutoff) : 1e-5;

    if (
      value === undefined ||
      isNaN(Number(value)) ||
      Number(value) === Infinity
    ) {
      return "-";
    } else {
      let output = "0.00%";
      if (Number(value) > 0 && Number(value) < _cutoff) {
        output = "< " + numeral(_cutoff).format("0.00%");
      } else {
        output = `${numeral(value).format("0.00%")}`;
      }
      return `${agg && Number(value) > 0 ? "+" : ""}${output}`;
    }
  }

  export function percent3(
    value: number | string | undefined,
    cutoff: number | null = null,
    agg: boolean = false,
  ) {
    const _cutoff = cutoff !== null ? (cutoff < 1e-5 ? 1e-5 : cutoff) : 1e-5;

    if (
      value === undefined ||
      isNaN(Number(value)) ||
      Number(value) === Infinity
    ) {
      return "-";
    } else {
      let output = "0.000%";
      if (Number(value) > 0 && Number(value) < _cutoff) {
        output = "< " + numeral(_cutoff).format("0.000%");
      } else {
        output = `${numeral(value).format("0.000%")}`;
      }
      return `${agg && Number(value) > 0 ? "+" : ""}${output}`;
    }
  }
  export function percent4(
    value: number | string | undefined,
    cutoff: number | null = null,
    agg: boolean = false,
  ) {
    const _cutoff = cutoff !== null ? (cutoff < 1e-5 ? 1e-5 : cutoff) : 1e-5;

    if (
      value === undefined ||
      isNaN(Number(value)) ||
      Number(value) === Infinity
    ) {
      return "-";
    } else {
      let output = "0.0000%";
      if (Number(value) > 0 && Number(value) < _cutoff) {
        output = "< " + numeral(_cutoff).format("0.0000%");
      } else {
        output = `${numeral(value).format("0.0000%")}`;
      }
      return `${agg && Number(value) > 0 ? "+" : ""}${output}`;
    }
  }

  export function precision(value: number | string | undefined, sd = 2) {
    return value === undefined ? "-" : big(value).toPrecision(sd);
  }
  export function priceOnlySymbol(value: number | string | undefined) {
    if (value === undefined || value === "-") {
      return "-";
    }
    return `$ ${value}`;
  }

  export function price(
    value: number | string | undefined,
    cutoff: number | null = null,
  ) {
    if (isNaN(Number(value))) return "-";

    const price = numeral(value).format("$ 0,0");

    if (cutoff !== null)
      return Number(value) < cutoff || isNaN(Number(value))
        ? "< " + numeral(cutoff).format("$ 0,0")
        : price;

    // value가 숫자지만 너무 작은 값일 때 (e.g. 0.00000000000000012...)
    if (price.includes("NaN")) return "< " + numeral(0).format("$ 0,0");

    return price;
  }
  export function price1(
    value: number | string | undefined,
    cutoff: number | null = null,
  ) {
    if (value === undefined) {
      return "-";
    }

    const _cutoff = cutoff !== null ? (cutoff < 1e-5 ? 1e-5 : cutoff) : 1e-5;

    return Number(value) < _cutoff || isNaN(Number(value))
      ? "< " + numeral("0.1").format("$ 0,0.0")
      : `${numeral(value).format("$ 0,0.0")}`;
  }
  export function price2(
    value: number | string | undefined,
    cutoff: number | null = null,
  ) {
    if (value === undefined) {
      return "-";
    }
    const _cutoff = cutoff !== null ? (cutoff < 1e-2 ? 1e-2 : cutoff) : 1e-2;

    return Number(value) < _cutoff || isNaN(Number(value))
      ? Number(value) == 0
        ? `${numeral(value).format("$ 0,0.00")}`
        : "< " + numeral("0.01").format("$ 0,0.00")
      : `${numeral(value).format("$ 0,0.00")}`;
  }

  export function price3(
    value: number | string | undefined,
    cutoff: number | null = null,
  ) {
    if (value === undefined) {
      return "-";
    }
    const _cutoff = cutoff !== null ? (cutoff < 1e-5 ? 1e-5 : cutoff) : 1e-5;

    return Number(value) < _cutoff || isNaN(Number(value))
      ? "< " + numeral("0.001").format("$ 0,0.000")
      : `${numeral(value).format("$ 0,0.000")}`;
  }
  export function price4(
    value: number | string | undefined,
    cutoff: number | null = null,
  ) {
    if (value === undefined) {
      return "-";
    }
    const _cutoff = cutoff !== null ? (cutoff < 1e-5 ? 1e-5 : cutoff) : 1e-5;

    return Number(value) < _cutoff || isNaN(Number(value))
      ? "< " + numeral("0.0001").format("$ 0,0.0000")
      : `${numeral(value).format("$ 0,0.0000")}`;
  }

  export function rank(value: number | string | undefined) {
    return isNaN(Number(value)) ? "-" : numeral(value).format("0,0o");
  }

  export function getMeanfulFormat(value: number) {
    if (value > 10) {
      return "0,0.00";
    } else if (value > 1.0) {
      return "0,0.000";
    } else if (value > 0.01) {
      return "0,0.0000";
    } else {
      const decimals = value.toString().split(".")[1];
      const decimalsLength = decimals?.length || 0;

      for (let i = 0; i < decimalsLength; i++) {
        if (decimals[i] !== "0") {
          return (
            "0,0." +
            _.range(0, i + 2, 1)
              .map((d) => "0")
              .join("")
          );
        }
      }
    }

    return "0,0.0000";
  }

  export function getMeanfulFormatTight(value: number) {
    if (value > 10) {
      return "0,0.00";
    } else if (value > 1.0) {
      return "0,0.000";
    } else if (value > 0.01) {
      return "0,0.0000";
    } else {
      const decimals = value.toString().split(".")[1];
      const decimalsLength = decimals?.length || 0;

      for (let i = 0; i < decimalsLength; i++) {
        if (decimals[i] !== "0") {
          return (
            "0,0." +
            _.range(0, i + 3, 1)
              .map((d) => "0")
              .join("")
          );
        }
      }
    }
    return "0,0.0000";
  }

  export function getMeanfulFormatTight2x(value: number) {
    if (value > 10) {
      return "0,0.000";
    } else if (value > 1.0) {
      return "0,0.0000";
    } else if (value > 0.01) {
      return "0,0.00000";
    } else {
      const decimals = value.toString().split(".")[1];
      const decimalsLength = decimals?.length || 0;

      for (let i = 0; i < decimalsLength; i++) {
        if (decimals[i] !== "0") {
          return (
            "0,0." +
            _.range(0, i + 4, 1)
              .map((d) => "0")
              .join("")
          );
        }
      }
    }
    return "0,0.0000";
  }
  export function getDeltaOption(std: number, compare: number = 0) {
    return std === compare ? "even" : std > compare ? "rise" : "fall";
  }

  export function getMeanfulFormatLoose(value: number) {
    if (value > 10) {
      return "0,0.0";
    } else if (value > 1.0) {
      return "0,0.00";
    } else if (value > 0.01) {
      return "0,0.000";
    } else {
      const decimals = value.toString().split(".")[1];
      const decimalsLength = decimals?.length || 0;

      for (let i = 0; i < decimalsLength; i++) {
        if (decimals[i] !== "0") {
          return (
            "0,0." +
            _.range(0, i + 1, 1)
              .map((d) => "0")
              .join("")
          );
        }
      }
    }
    return "0,0.0000";
  }

  export function formatAutoFloat(
    value: number | string | undefined,
    cutoff: null | number = null,
  ) {
    return cutoff === null
      ? Format.withFormatter(getMeanfulFormat(Number(value)), Number(value))
      : Number(Number(value)) < cutoff
        ? "< " + cutoff
        : Format.withFormatter(getMeanfulFormat(Number(value)), Number(value));
  }
  export function formatAutoPercent(
    value: number | string | undefined,
    cutoff: null | number = null,
  ) {
    return cutoff === null
      ? Format.withFormatter(
          getMeanfulFormat(Number(value) * 100) + "%",
          Number(value),
        )
      : Number(value) < cutoff
        ? "< " + Number(value) * 100 + "%"
        : Format.withFormatter(
            getMeanfulFormat(Number(value) * 100) + "%",
            Number(value),
          );
  }

  export function formatAutoFloatTight(
    value: number | string | undefined,
    cutoff: null | number = null,
  ) {
    return cutoff === null
      ? Format.withFormatter(
          getMeanfulFormatTight(Number(value)),
          Number(value),
        )
      : Number(value) < cutoff
        ? "< " + cutoff
        : Format.withFormatter(
            getMeanfulFormatTight(Number(value)),
            Number(value),
          );
  }

  export function formatAutoFloatTight2x(
    value: number | string | undefined,
    cutoff: null | number = null,
  ) {
    return cutoff === null
      ? Format.withFormatter(
          getMeanfulFormatTight2x(Number(value)),
          Number(value),
        )
      : Number(value) < cutoff
        ? "< " + cutoff
        : Format.withFormatter(
            getMeanfulFormatTight2x(Number(value)),
            Number(value),
          );
  }

  export function formatAutoFloatLoose(
    value: number | string | undefined,
    cutoff: null | number = null,
  ) {
    return cutoff === null
      ? Format.withFormatter(
          getMeanfulFormatLoose(Number(value)),
          Number(value),
        )
      : Number(value) < cutoff
        ? "< " + cutoff
        : Format.withFormatter(
            getMeanfulFormatLoose(Number(value)),
            Number(value),
          );
  }
  export function formatAutoPercentLoose(
    value: number | string | undefined,
    cutoff: null | number = null,
  ) {
    return cutoff === null
      ? Format.withFormatter(
          getMeanfulFormatLoose(Number(value) * 100) + "%",
          Number(value),
        )
      : Number(value) < cutoff
        ? "< " + cutoff
        : Format.withFormatter(
            getMeanfulFormatLoose(Number(value) * 100) + "%",
            Number(value),
          );
  }
  export function formatAutoPercentTight(
    value: number | string | undefined,
    cutoff: null | number = null,
  ) {
    return cutoff === null
      ? Format.withFormatter(
          getMeanfulFormatTight(Number(value) * 100) + "%",
          Number(value),
        )
      : Number(value) < cutoff
        ? "< " + cutoff
        : Format.withFormatter(
            getMeanfulFormatTight(Number(value) * 100) + "%",
            Number(value),
          );
  }

  export function ellipsis(value: string | undefined, length: number) {
    if (!value) {
      return "";
    }
    return value.length > length ? `${value.substring(0, length)}...` : value;
  }
  export function ellipsisCenter(value: string | undefined, length: number) {
    if (!value) {
      return "";
    }
    return value.length > length
      ? `${value.substring(0, length / 2)}...${value.substring(
          value.length - length / 2,
          value.length,
        )}`
      : value;
  }

  export function graphTrendsDate(
    date?: string | Date | number,
    format: string = "MM/DD HH:mm",
  ) {
    return moment(date).format(format);
  }

  export function graphTrendsDay(
    date?: string | Date | number,
    format: string = "MM/DD",
  ) {
    return moment(date).format(format);
  }

  // 1000000 => 1.00M
  export function dh(value: number | string) {
    const numeralFormatted = numeral(value).format("0,0.00a");
    // value 너무 작은 경우 예외처리 적용
    return numeralFormatted.includes("NaN") ? "0.00" : numeralFormatted;
  }

  export function dhPrice(value: number | string) {
    return numeral(value).format("$ 0,0.00a");
  }

  export function dhNoFloat(value: number | string) {
    return Number(value) < 1000
      ? numeral(value).format("0,0")
      : numeral(value).format("0,0.00a");
  }

  export function dhNoFloatAll(value: number | string): string {
    const numValue = Number(value);

    if (isNaN(numValue) || numValue === 0) {
      return "0";
    } else if (Math.abs(numValue) < 1e-5) {
      return "<0.00001";
    } else {
      return numeral(numValue).format("0,0a");
    }
  }

  export function floatSplit(
    value: number | string | undefined,
    option?: {
      decimal?: number;
      suffix?: string;
    },
  ) {
    const { decimal = 6, suffix } = option || {};
    const origin = Number(value).toFixed(decimal);
    const arr = origin.split(".");
    return {
      integer: Format.integer(arr[0]),
      decimal:
        arr[1] || suffix ? `${arr[1] || 0}${suffix ? " " + suffix : ""}` : "",
      origin: value || 0,
      valid: value !== undefined,
    };
  }

  export function floatHtml(
    value: number | string | undefined,
    option?: {
      decimalFontSize?: number | string;
      decimal?: number;
      formatter?: (arg: string | number | undefined) => string;
      suffix?: string;
      opacity?: number;
    },
  ) {
    const {
      decimal = 6,
      decimalFontSize = 0.72,
      formatter,
      suffix,
      opacity = 0.8,
    } = option || {};
    if (value === undefined) {
      return "-";
    }
    const origin = formatter
      ? formatter(value)
      : Number(value).toFixed(decimal);
    const arr = origin.split(".");

    const integer = Format.integer(arr[0]);
    return (
      `<span data-opensans> ${integer === "-" ? "0" : integer}</span>` +
      (arr[1]
        ? `<span style='display: inline-block; opacity:${opacity}; transform-origin:0% 78%; transform: scale(0.95);' data-mono>.${
            arr[1] || 0
          } ${suffix ? " " + suffix : ""}</span>`
        : "")
    );
  }

  export function integerHtml(value: number | string | undefined) {
    if (value === undefined) {
      return "-";
    }
    const _value = integer(value);
    return `<span data-opensans>${_value}</span>`;
  }

  export function withFormatter(format: string, value: number) {
    return String(value).indexOf("e") < 0 && String(value).indexOf("E") < 0
      ? numeral(value).format(format)
      : formatExponential(value);
  }

  export function formatExponential(value: number) {
    return big(value).toPrecision(2);
  }

  export function utf8ToBase64(str: string) {
    return window.btoa(encodeURIComponent(str));
  }

  export function base64ToUtf8(str: string) {
    return decodeURIComponent(window.atob(str));
  }

  export function plural(
    prefix: string,
    items: any[],
    isStartE: boolean = false,
  ) {
    return `${prefix}${items.length > 1 ? (isStartE ? "es" : "s") : ""}`;
  }

  export function snakeToPascal(string: string | number) {
    return String(string)
      .split("/")
      .map((snake) =>
        snake
          .split("_")
          .map((substr) => substr.charAt(0).toUpperCase() + substr.slice(1))
          .join(" "),
      )
      .join("/");
  }

  export function httpURL(site: string | undefined) {
    return site
      ? site.startsWith("http")
        ? site
        : `https://${site}`
      : undefined;
  }
  export function dateGraph(
    date?: string | Date | number,
    format: string = "MM/DD HH:mm",
  ) {
    return moment(date).format(format);
  }

  export function isZero(...value: number[]) {
    for (const v of value) {
      if (Math.abs(v) < 0.000001) {
        return true;
      }
    }
    return false;
  }

  //현지 시점에서 특정 조건이 유효한지 확인
  export function notOverdue(arg: { startDate: string; dueDate: string }) {
    const { startDate, dueDate } = arg;
    const now = new Date().toISOString();
    return startDate <= now && dueDate >= now;
  }

  export function removeGithubTextIcon(
    value: string | undefined,
    defaultText?: string,
  ) {
    return value ? value.replace(/:.*?:/gi, "") : defaultText;
  }

  export function removeEndSlash(str: string) {
    return str.endsWith("/") ? str.substring(0, str.length - 1) : str;
  }

  export function diff(seconds: number | string) {
    let result: string = "";
    Number(seconds) < 60 && (result = `${Number(seconds)}s`);
    Number(seconds) === 60 && (result = `${Number(seconds) / 60} min`);
    Number(seconds) > 60 &&
      Number(seconds) < 3600 &&
      (result = `${Number(seconds) / 60} mins`);
    Number(seconds) === 3600 && (result = `${Number(seconds) / 3600} hour`);
    Number(seconds) > 3600 &&
      Number(seconds) < 3600 * 24 &&
      (result = `${Number(seconds) / 3600} hours`);
    Number(seconds) === 3600 * 24 &&
      (result = `${Number(seconds) / (3600 * 24)} day`);
    Number(seconds) > 3600 * 24 &&
      (result = `${Number(seconds) / (3600 * 24)} days`);

    return result;
  }
}
