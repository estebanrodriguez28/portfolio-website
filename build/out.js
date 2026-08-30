(() => {
  // node_modules/motion-utils/dist/es/array.mjs
  function addUniqueItem(arr, item) {
    if (arr.indexOf(item) === -1)
      arr.push(item);
  }
  function removeItem(arr, item) {
    const index = arr.indexOf(item);
    if (index > -1)
      arr.splice(index, 1);
  }

  // node_modules/motion-utils/dist/es/clamp.mjs
  var clamp = (min, max, v2) => {
    if (v2 > max)
      return max;
    if (v2 < min)
      return min;
    return v2;
  };

  // node_modules/motion-utils/dist/es/format-error-message.mjs
  function formatErrorMessage(message, errorCode) {
    return errorCode ? `${message}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${errorCode}` : message;
  }

  // node_modules/motion-utils/dist/es/errors.mjs
  var warning = () => {
  };
  var invariant = () => {
  };
  if (typeof process !== "undefined" && true) {
    warning = (check, message, errorCode) => {
      if (!check && typeof console !== "undefined") {
        console.warn(formatErrorMessage(message, errorCode));
      }
    };
    invariant = (check, message, errorCode) => {
      if (!check) {
        throw new Error(formatErrorMessage(message, errorCode));
      }
    };
  }

  // node_modules/motion-utils/dist/es/global-config.mjs
  var MotionGlobalConfig = {};

  // node_modules/motion-utils/dist/es/is-numerical-string.mjs
  var isNumericalString = (v2) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(v2);

  // node_modules/motion-utils/dist/es/is-object.mjs
  function isObject(value) {
    return typeof value === "object" && value !== null;
  }

  // node_modules/motion-utils/dist/es/is-zero-value-string.mjs
  var isZeroValueString = (v2) => /^0[^.\s]+$/u.test(v2);

  // node_modules/motion-utils/dist/es/memo.mjs
  // @__NO_SIDE_EFFECTS__
  function memo(callback) {
    let result;
    return () => {
      if (result === void 0)
        result = callback();
      return result;
    };
  }

  // node_modules/motion-utils/dist/es/noop.mjs
  var noop = /* @__NO_SIDE_EFFECTS__ */ (any) => any;

  // node_modules/motion-utils/dist/es/pipe.mjs
  var combineFunctions = (a2, b2) => (v2) => b2(a2(v2));
  var pipe = (...transformers) => transformers.reduce(combineFunctions);

  // node_modules/motion-utils/dist/es/progress.mjs
  var progress = /* @__NO_SIDE_EFFECTS__ */ (from, to, value) => {
    const toFromDifference = to - from;
    return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
  };

  // node_modules/motion-utils/dist/es/subscription-manager.mjs
  var SubscriptionManager = class {
    constructor() {
      this.subscriptions = [];
    }
    add(handler) {
      addUniqueItem(this.subscriptions, handler);
      return () => removeItem(this.subscriptions, handler);
    }
    notify(a2, b2, c2) {
      const numSubscriptions = this.subscriptions.length;
      if (!numSubscriptions)
        return;
      if (numSubscriptions === 1) {
        this.subscriptions[0](a2, b2, c2);
      } else {
        for (let i2 = 0; i2 < numSubscriptions; i2++) {
          const handler = this.subscriptions[i2];
          handler && handler(a2, b2, c2);
        }
      }
    }
    getSize() {
      return this.subscriptions.length;
    }
    clear() {
      this.subscriptions.length = 0;
    }
  };

  // node_modules/motion-utils/dist/es/time-conversion.mjs
  var secondsToMilliseconds = /* @__NO_SIDE_EFFECTS__ */ (seconds) => seconds * 1e3;
  var millisecondsToSeconds = /* @__NO_SIDE_EFFECTS__ */ (milliseconds) => milliseconds / 1e3;

  // node_modules/motion-utils/dist/es/velocity-per-second.mjs
  function velocityPerSecond(velocity, frameDuration) {
    return frameDuration ? velocity * (1e3 / frameDuration) : 0;
  }

  // node_modules/motion-utils/dist/es/warn-once.mjs
  var warned = /* @__PURE__ */ new Set();
  function warnOnce(condition, message, errorCode) {
    if (condition || warned.has(message))
      return;
    console.warn(formatErrorMessage(message, errorCode));
    warned.add(message);
  }

  // node_modules/motion-utils/dist/es/wrap.mjs
  var wrap = (min, max, v2) => {
    const rangeSize = max - min;
    return ((v2 - min) % rangeSize + rangeSize) % rangeSize + min;
  };

  // node_modules/motion-utils/dist/es/easing/cubic-bezier.mjs
  var calcBezier = (t2, a1, a2) => (((1 - 3 * a2 + 3 * a1) * t2 + (3 * a2 - 6 * a1)) * t2 + 3 * a1) * t2;
  var subdivisionPrecision = 1e-7;
  var subdivisionMaxIterations = 12;
  function binarySubdivide(x2, lowerBound, upperBound, mX1, mX2) {
    let currentX;
    let currentT;
    let i2 = 0;
    do {
      currentT = lowerBound + (upperBound - lowerBound) / 2;
      currentX = calcBezier(currentT, mX1, mX2) - x2;
      if (currentX > 0) {
        upperBound = currentT;
      } else {
        lowerBound = currentT;
      }
    } while (Math.abs(currentX) > subdivisionPrecision && ++i2 < subdivisionMaxIterations);
    return currentT;
  }
  function cubicBezier(mX1, mY1, mX2, mY2) {
    if (mX1 === mY1 && mX2 === mY2)
      return noop;
    const getTForX = (aX) => binarySubdivide(aX, 0, 1, mX1, mX2);
    return (t2) => t2 === 0 || t2 === 1 ? t2 : calcBezier(getTForX(t2), mY1, mY2);
  }

  // node_modules/motion-utils/dist/es/easing/modifiers/mirror.mjs
  var mirrorEasing = (easing) => (p2) => p2 <= 0.5 ? easing(2 * p2) / 2 : (2 - easing(2 * (1 - p2))) / 2;

  // node_modules/motion-utils/dist/es/easing/modifiers/reverse.mjs
  var reverseEasing = (easing) => (p2) => 1 - easing(1 - p2);

  // node_modules/motion-utils/dist/es/easing/back.mjs
  var backOut = /* @__PURE__ */ cubicBezier(0.33, 1.53, 0.69, 0.99);
  var backIn = /* @__PURE__ */ reverseEasing(backOut);
  var backInOut = /* @__PURE__ */ mirrorEasing(backIn);

  // node_modules/motion-utils/dist/es/easing/anticipate.mjs
  var anticipate = (p2) => p2 >= 1 ? 1 : (p2 *= 2) < 1 ? 0.5 * backIn(p2) : 0.5 * (2 - Math.pow(2, -10 * (p2 - 1)));

  // node_modules/motion-utils/dist/es/easing/circ.mjs
  var circIn = (p2) => 1 - Math.sin(Math.acos(p2));
  var circOut = reverseEasing(circIn);
  var circInOut = mirrorEasing(circIn);

  // node_modules/motion-utils/dist/es/easing/ease.mjs
  var easeIn = /* @__PURE__ */ cubicBezier(0.42, 0, 1, 1);
  var easeOut = /* @__PURE__ */ cubicBezier(0, 0, 0.58, 1);
  var easeInOut = /* @__PURE__ */ cubicBezier(0.42, 0, 0.58, 1);

  // node_modules/motion-utils/dist/es/easing/utils/is-easing-array.mjs
  var isEasingArray = (ease2) => {
    return Array.isArray(ease2) && typeof ease2[0] !== "number";
  };

  // node_modules/motion-utils/dist/es/easing/utils/get-easing-for-segment.mjs
  function getEasingForSegment(easing, i2) {
    return isEasingArray(easing) ? easing[wrap(0, easing.length, i2)] : easing;
  }

  // node_modules/motion-utils/dist/es/easing/utils/is-bezier-definition.mjs
  var isBezierDefinition = (easing) => Array.isArray(easing) && typeof easing[0] === "number";

  // node_modules/motion-utils/dist/es/easing/utils/map.mjs
  var easingLookup = {
    linear: noop,
    easeIn,
    easeInOut,
    easeOut,
    circIn,
    circInOut,
    circOut,
    backIn,
    backInOut,
    backOut,
    anticipate
  };
  var isValidEasing = (easing) => {
    return typeof easing === "string";
  };
  var easingDefinitionToFunction = (definition) => {
    if (isBezierDefinition(definition)) {
      invariant(definition.length === 4, `Cubic bezier arrays must contain four numerical values.`, "cubic-bezier-length");
      const [x1, y1, x2, y2] = definition;
      return cubicBezier(x1, y1, x2, y2);
    } else if (isValidEasing(definition)) {
      invariant(easingLookup[definition] !== void 0, `Invalid easing type '${definition}'`, "invalid-easing-type");
      return easingLookup[definition];
    }
    return definition;
  };

  // node_modules/motion-dom/dist/es/frameloop/order.mjs
  var stepsOrder = [
    "setup",
    // Compute
    "read",
    // Read
    "resolveKeyframes",
    // Write/Read/Write/Read
    "preUpdate",
    // Compute
    "update",
    // Compute
    "preRender",
    // Compute
    "render",
    // Write
    "postRender"
    // Compute
  ];

  // node_modules/motion-dom/dist/es/stats/buffer.mjs
  var statsBuffer = {
    value: null,
    addProjectionMetrics: null
  };

  // node_modules/motion-dom/dist/es/frameloop/render-step.mjs
  function createRenderStep(runNextFrame, stepName) {
    let thisFrame = /* @__PURE__ */ new Set();
    let nextFrame = /* @__PURE__ */ new Set();
    let isProcessing = false;
    let flushNextFrame = false;
    const toKeepAlive = /* @__PURE__ */ new WeakSet();
    let latestFrameData = {
      delta: 0,
      timestamp: 0,
      isProcessing: false
    };
    let numCalls = 0;
    function triggerCallback(callback) {
      if (toKeepAlive.has(callback)) {
        step.schedule(callback);
        runNextFrame();
      }
      numCalls++;
      callback(latestFrameData);
    }
    const step = {
      /**
       * Schedule a process to run on the next frame.
       */
      schedule: (callback, keepAlive = false, immediate = false) => {
        const addToCurrentFrame = immediate && isProcessing;
        const queue = addToCurrentFrame ? thisFrame : nextFrame;
        if (keepAlive)
          toKeepAlive.add(callback);
        queue.add(callback);
        return callback;
      },
      /**
       * Cancel the provided callback from running on the next frame.
       */
      cancel: (callback) => {
        nextFrame.delete(callback);
        toKeepAlive.delete(callback);
      },
      /**
       * Execute all schedule callbacks.
       */
      process: (frameData2) => {
        latestFrameData = frameData2;
        if (isProcessing) {
          flushNextFrame = true;
          return;
        }
        isProcessing = true;
        const prevFrame = thisFrame;
        thisFrame = nextFrame;
        nextFrame = prevFrame;
        thisFrame.forEach(triggerCallback);
        if (stepName && statsBuffer.value) {
          statsBuffer.value.frameloop[stepName].push(numCalls);
        }
        numCalls = 0;
        thisFrame.clear();
        isProcessing = false;
        if (flushNextFrame) {
          flushNextFrame = false;
          step.process(frameData2);
        }
      }
    };
    return step;
  }

  // node_modules/motion-dom/dist/es/frameloop/batcher.mjs
  var maxElapsed = 40;
  function createRenderBatcher(scheduleNextBatch, allowKeepAlive) {
    let runNextFrame = false;
    let useDefaultElapsed = true;
    const state = {
      delta: 0,
      timestamp: 0,
      isProcessing: false
    };
    const flagRunNextFrame = () => runNextFrame = true;
    const steps = stepsOrder.reduce((acc, key) => {
      acc[key] = createRenderStep(flagRunNextFrame, allowKeepAlive ? key : void 0);
      return acc;
    }, {});
    const { setup, read, resolveKeyframes, preUpdate, update, preRender, render: render3, postRender } = steps;
    const processBatch = () => {
      const useManualTiming = MotionGlobalConfig.useManualTiming;
      const timestamp = useManualTiming ? state.timestamp : performance.now();
      runNextFrame = false;
      if (!useManualTiming) {
        state.delta = useDefaultElapsed ? 1e3 / 60 : Math.max(Math.min(timestamp - state.timestamp, maxElapsed), 1);
      }
      state.timestamp = timestamp;
      state.isProcessing = true;
      setup.process(state);
      read.process(state);
      resolveKeyframes.process(state);
      preUpdate.process(state);
      update.process(state);
      preRender.process(state);
      render3.process(state);
      postRender.process(state);
      state.isProcessing = false;
      if (runNextFrame && allowKeepAlive) {
        useDefaultElapsed = false;
        scheduleNextBatch(processBatch);
      }
    };
    const wake = () => {
      runNextFrame = true;
      useDefaultElapsed = true;
      if (!state.isProcessing) {
        scheduleNextBatch(processBatch);
      }
    };
    const schedule = stepsOrder.reduce((acc, key) => {
      const step = steps[key];
      acc[key] = (process2, keepAlive = false, immediate = false) => {
        if (!runNextFrame)
          wake();
        return step.schedule(process2, keepAlive, immediate);
      };
      return acc;
    }, {});
    const cancel = (process2) => {
      for (let i2 = 0; i2 < stepsOrder.length; i2++) {
        steps[stepsOrder[i2]].cancel(process2);
      }
    };
    return { schedule, cancel, state, steps };
  }

  // node_modules/motion-dom/dist/es/frameloop/frame.mjs
  var { schedule: frame, cancel: cancelFrame, state: frameData, steps: frameSteps } = /* @__PURE__ */ createRenderBatcher(typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : noop, true);

  // node_modules/motion-dom/dist/es/frameloop/sync-time.mjs
  var now;
  function clearTime() {
    now = void 0;
  }
  var time = {
    now: () => {
      if (now === void 0) {
        time.set(frameData.isProcessing || MotionGlobalConfig.useManualTiming ? frameData.timestamp : performance.now());
      }
      return now;
    },
    set: (newTime) => {
      now = newTime;
      queueMicrotask(clearTime);
    }
  };

  // node_modules/motion-dom/dist/es/stats/animation-count.mjs
  var activeAnimations = {
    layout: 0,
    mainThread: 0,
    waapi: 0
  };

  // node_modules/motion-dom/dist/es/animation/utils/is-css-variable.mjs
  var checkStringStartsWith = (token) => (key) => typeof key === "string" && key.startsWith(token);
  var isCSSVariableName = /* @__PURE__ */ checkStringStartsWith("--");
  var startsAsVariableToken = /* @__PURE__ */ checkStringStartsWith("var(--");
  var isCSSVariableToken = (value) => {
    const startsWithToken = startsAsVariableToken(value);
    if (!startsWithToken)
      return false;
    return singleCssVariableRegex.test(value.split("/*")[0].trim());
  };
  var singleCssVariableRegex = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
  function containsCSSVariable(value) {
    if (typeof value !== "string")
      return false;
    return value.split("/*")[0].includes("var(--");
  }

  // node_modules/motion-dom/dist/es/value/types/numbers/index.mjs
  var number = {
    test: (v2) => typeof v2 === "number",
    parse: parseFloat,
    transform: (v2) => v2
  };
  var alpha = {
    ...number,
    transform: (v2) => clamp(0, 1, v2)
  };
  var scale = {
    ...number,
    default: 1
  };

  // node_modules/motion-dom/dist/es/value/types/utils/sanitize.mjs
  var sanitize = (v2) => Math.round(v2 * 1e5) / 1e5;

  // node_modules/motion-dom/dist/es/value/types/utils/float-regex.mjs
  var floatRegex = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;

  // node_modules/motion-dom/dist/es/value/types/utils/is-nullish.mjs
  function isNullish(v2) {
    return v2 == null;
  }

  // node_modules/motion-dom/dist/es/value/types/utils/single-color-regex.mjs
  var singleColorRegex = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;

  // node_modules/motion-dom/dist/es/value/types/color/utils.mjs
  var isColorString = (type, testProp) => (v2) => {
    return Boolean(typeof v2 === "string" && singleColorRegex.test(v2) && v2.startsWith(type) || testProp && !isNullish(v2) && Object.prototype.hasOwnProperty.call(v2, testProp));
  };
  var splitColor = (aName, bName, cName) => (v2) => {
    if (typeof v2 !== "string")
      return v2;
    const [a2, b2, c2, alpha2] = v2.match(floatRegex);
    return {
      [aName]: parseFloat(a2),
      [bName]: parseFloat(b2),
      [cName]: parseFloat(c2),
      alpha: alpha2 !== void 0 ? parseFloat(alpha2) : 1
    };
  };

  // node_modules/motion-dom/dist/es/value/types/color/rgba.mjs
  var clampRgbUnit = (v2) => clamp(0, 255, v2);
  var rgbUnit = {
    ...number,
    transform: (v2) => Math.round(clampRgbUnit(v2))
  };
  var rgba = {
    test: /* @__PURE__ */ isColorString("rgb", "red"),
    parse: /* @__PURE__ */ splitColor("red", "green", "blue"),
    transform: ({ red, green, blue, alpha: alpha$1 = 1 }) => "rgba(" + rgbUnit.transform(red) + ", " + rgbUnit.transform(green) + ", " + rgbUnit.transform(blue) + ", " + sanitize(alpha.transform(alpha$1)) + ")"
  };

  // node_modules/motion-dom/dist/es/value/types/color/hex.mjs
  function parseHex(v2) {
    let r2 = "";
    let g2 = "";
    let b2 = "";
    let a2 = "";
    if (v2.length > 5) {
      r2 = v2.substring(1, 3);
      g2 = v2.substring(3, 5);
      b2 = v2.substring(5, 7);
      a2 = v2.substring(7, 9);
    } else {
      r2 = v2.substring(1, 2);
      g2 = v2.substring(2, 3);
      b2 = v2.substring(3, 4);
      a2 = v2.substring(4, 5);
      r2 += r2;
      g2 += g2;
      b2 += b2;
      a2 += a2;
    }
    return {
      red: parseInt(r2, 16),
      green: parseInt(g2, 16),
      blue: parseInt(b2, 16),
      alpha: a2 ? parseInt(a2, 16) / 255 : 1
    };
  }
  var hex = {
    test: /* @__PURE__ */ isColorString("#"),
    parse: parseHex,
    transform: rgba.transform
  };

  // node_modules/motion-dom/dist/es/value/types/numbers/units.mjs
  var createUnitType = /* @__NO_SIDE_EFFECTS__ */ (unit) => ({
    test: (v2) => typeof v2 === "string" && v2.endsWith(unit) && v2.split(" ").length === 1,
    parse: parseFloat,
    transform: (v2) => `${v2}${unit}`
  });
  var degrees = /* @__PURE__ */ createUnitType("deg");
  var percent = /* @__PURE__ */ createUnitType("%");
  var px = /* @__PURE__ */ createUnitType("px");
  var vh = /* @__PURE__ */ createUnitType("vh");
  var vw = /* @__PURE__ */ createUnitType("vw");
  var progressPercentage = /* @__PURE__ */ (() => ({
    ...percent,
    parse: (v2) => percent.parse(v2) / 100,
    transform: (v2) => percent.transform(v2 * 100)
  }))();

  // node_modules/motion-dom/dist/es/value/types/color/hsla.mjs
  var hsla = {
    test: /* @__PURE__ */ isColorString("hsl", "hue"),
    parse: /* @__PURE__ */ splitColor("hue", "saturation", "lightness"),
    transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 }) => {
      return "hsla(" + Math.round(hue) + ", " + percent.transform(sanitize(saturation)) + ", " + percent.transform(sanitize(lightness)) + ", " + sanitize(alpha.transform(alpha$1)) + ")";
    }
  };

  // node_modules/motion-dom/dist/es/value/types/color/index.mjs
  var color = {
    test: (v2) => rgba.test(v2) || hex.test(v2) || hsla.test(v2),
    parse: (v2) => {
      if (rgba.test(v2)) {
        return rgba.parse(v2);
      } else if (hsla.test(v2)) {
        return hsla.parse(v2);
      } else {
        return hex.parse(v2);
      }
    },
    transform: (v2) => {
      return typeof v2 === "string" ? v2 : v2.hasOwnProperty("red") ? rgba.transform(v2) : hsla.transform(v2);
    },
    getAnimatableNone: (v2) => {
      const parsed = color.parse(v2);
      parsed.alpha = 0;
      return color.transform(parsed);
    }
  };

  // node_modules/motion-dom/dist/es/value/types/utils/color-regex.mjs
  var colorRegex = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;

  // node_modules/motion-dom/dist/es/value/types/complex/index.mjs
  function test(v2) {
    return isNaN(v2) && typeof v2 === "string" && (v2.match(floatRegex)?.length || 0) + (v2.match(colorRegex)?.length || 0) > 0;
  }
  var NUMBER_TOKEN = "number";
  var COLOR_TOKEN = "color";
  var VAR_TOKEN = "var";
  var VAR_FUNCTION_TOKEN = "var(";
  var SPLIT_TOKEN = "${}";
  var complexRegex = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
  function analyseComplexValue(value) {
    const originalValue = value.toString();
    const values = [];
    const indexes = {
      color: [],
      number: [],
      var: []
    };
    const types = [];
    let i2 = 0;
    const tokenised = originalValue.replace(complexRegex, (parsedValue) => {
      if (color.test(parsedValue)) {
        indexes.color.push(i2);
        types.push(COLOR_TOKEN);
        values.push(color.parse(parsedValue));
      } else if (parsedValue.startsWith(VAR_FUNCTION_TOKEN)) {
        indexes.var.push(i2);
        types.push(VAR_TOKEN);
        values.push(parsedValue);
      } else {
        indexes.number.push(i2);
        types.push(NUMBER_TOKEN);
        values.push(parseFloat(parsedValue));
      }
      ++i2;
      return SPLIT_TOKEN;
    });
    const split = tokenised.split(SPLIT_TOKEN);
    return { values, split, indexes, types };
  }
  function parseComplexValue(v2) {
    return analyseComplexValue(v2).values;
  }
  function buildTransformer({ split, types }) {
    const numSections = split.length;
    return (v2) => {
      let output = "";
      for (let i2 = 0; i2 < numSections; i2++) {
        output += split[i2];
        if (v2[i2] !== void 0) {
          const type = types[i2];
          if (type === NUMBER_TOKEN) {
            output += sanitize(v2[i2]);
          } else if (type === COLOR_TOKEN) {
            output += color.transform(v2[i2]);
          } else {
            output += v2[i2];
          }
        }
      }
      return output;
    };
  }
  function createTransformer(source) {
    return buildTransformer(analyseComplexValue(source));
  }
  var convertNumbersToZero = (v2) => typeof v2 === "number" ? 0 : color.test(v2) ? color.getAnimatableNone(v2) : v2;
  var convertToZero = (value, splitBefore) => {
    if (typeof value === "number") {
      return splitBefore?.trim().endsWith("/") ? value : 0;
    }
    return convertNumbersToZero(value);
  };
  function getAnimatableNone(v2) {
    const info = analyseComplexValue(v2);
    const transformer = buildTransformer(info);
    return transformer(info.values.map((value, i2) => convertToZero(value, info.split[i2])));
  }
  var complex = {
    test,
    parse: parseComplexValue,
    createTransformer,
    getAnimatableNone
  };

  // node_modules/motion-dom/dist/es/value/types/color/hsla-to-rgba.mjs
  function hueToRgb(p2, q2, t2) {
    if (t2 < 0)
      t2 += 1;
    if (t2 > 1)
      t2 -= 1;
    if (t2 < 1 / 6)
      return p2 + (q2 - p2) * 6 * t2;
    if (t2 < 1 / 2)
      return q2;
    if (t2 < 2 / 3)
      return p2 + (q2 - p2) * (2 / 3 - t2) * 6;
    return p2;
  }
  function hslaToRgba({ hue, saturation, lightness, alpha: alpha2 }) {
    hue /= 360;
    saturation /= 100;
    lightness /= 100;
    let red = 0;
    let green = 0;
    let blue = 0;
    if (!saturation) {
      red = green = blue = lightness;
    } else {
      const q2 = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
      const p2 = 2 * lightness - q2;
      red = hueToRgb(p2, q2, hue + 1 / 3);
      green = hueToRgb(p2, q2, hue);
      blue = hueToRgb(p2, q2, hue - 1 / 3);
    }
    return {
      red: Math.round(red * 255),
      green: Math.round(green * 255),
      blue: Math.round(blue * 255),
      alpha: alpha2
    };
  }

  // node_modules/motion-dom/dist/es/utils/mix/immediate.mjs
  function mixImmediate(a2, b2) {
    return (p2) => p2 > 0 ? b2 : a2;
  }

  // node_modules/motion-dom/dist/es/utils/mix/number.mjs
  var mixNumber = (from, to, progress2) => {
    return from + (to - from) * progress2;
  };

  // node_modules/motion-dom/dist/es/utils/mix/color.mjs
  var mixLinearColor = (from, to, v2) => {
    const fromExpo = from * from;
    const expo = v2 * (to * to - fromExpo) + fromExpo;
    return expo < 0 ? 0 : Math.sqrt(expo);
  };
  var colorTypes = [hex, rgba, hsla];
  var getColorType = (v2) => colorTypes.find((type) => type.test(v2));
  function asRGBA(color2) {
    const type = getColorType(color2);
    warning(Boolean(type), `'${color2}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable");
    if (!Boolean(type))
      return false;
    let model = type.parse(color2);
    if (type === hsla) {
      model = hslaToRgba(model);
    }
    return model;
  }
  var mixColor = (from, to) => {
    const fromRGBA = asRGBA(from);
    const toRGBA = asRGBA(to);
    if (!fromRGBA || !toRGBA) {
      return mixImmediate(from, to);
    }
    const blended = { ...fromRGBA };
    return (v2) => {
      blended.red = mixLinearColor(fromRGBA.red, toRGBA.red, v2);
      blended.green = mixLinearColor(fromRGBA.green, toRGBA.green, v2);
      blended.blue = mixLinearColor(fromRGBA.blue, toRGBA.blue, v2);
      blended.alpha = mixNumber(fromRGBA.alpha, toRGBA.alpha, v2);
      return rgba.transform(blended);
    };
  };

  // node_modules/motion-dom/dist/es/utils/mix/visibility.mjs
  var invisibleValues = /* @__PURE__ */ new Set(["none", "hidden"]);
  function mixVisibility(origin, target) {
    if (invisibleValues.has(origin)) {
      return (p2) => p2 <= 0 ? origin : target;
    } else {
      return (p2) => p2 >= 1 ? target : origin;
    }
  }

  // node_modules/motion-dom/dist/es/utils/mix/complex.mjs
  function mixNumber2(a2, b2) {
    return (p2) => mixNumber(a2, b2, p2);
  }
  function getMixer(a2) {
    if (typeof a2 === "number") {
      return mixNumber2;
    } else if (typeof a2 === "string") {
      return isCSSVariableToken(a2) ? mixImmediate : color.test(a2) ? mixColor : mixComplex;
    } else if (Array.isArray(a2)) {
      return mixArray;
    } else if (typeof a2 === "object") {
      return color.test(a2) ? mixColor : mixObject;
    }
    return mixImmediate;
  }
  function mixArray(a2, b2) {
    const output = [...a2];
    const numValues = output.length;
    const blendValue = a2.map((v2, i2) => getMixer(v2)(v2, b2[i2]));
    return (p2) => {
      for (let i2 = 0; i2 < numValues; i2++) {
        output[i2] = blendValue[i2](p2);
      }
      return output;
    };
  }
  function mixObject(a2, b2) {
    const output = { ...a2, ...b2 };
    const blendValue = {};
    for (const key in output) {
      if (a2[key] !== void 0 && b2[key] !== void 0) {
        blendValue[key] = getMixer(a2[key])(a2[key], b2[key]);
      }
    }
    return (v2) => {
      for (const key in blendValue) {
        output[key] = blendValue[key](v2);
      }
      return output;
    };
  }
  function matchOrder(origin, target) {
    const orderedOrigin = [];
    const pointers = { color: 0, var: 0, number: 0 };
    for (let i2 = 0; i2 < target.values.length; i2++) {
      const type = target.types[i2];
      const originIndex = origin.indexes[type][pointers[type]];
      const originValue = origin.values[originIndex] ?? 0;
      orderedOrigin[i2] = originValue;
      pointers[type]++;
    }
    return orderedOrigin;
  }
  var mixComplex = (origin, target) => {
    const template = complex.createTransformer(target);
    const originStats = analyseComplexValue(origin);
    const targetStats = analyseComplexValue(target);
    const canInterpolate = originStats.indexes.var.length === targetStats.indexes.var.length && originStats.indexes.color.length === targetStats.indexes.color.length && originStats.indexes.number.length >= targetStats.indexes.number.length;
    if (canInterpolate) {
      if (invisibleValues.has(origin) && !targetStats.values.length || invisibleValues.has(target) && !originStats.values.length) {
        return mixVisibility(origin, target);
      }
      return pipe(mixArray(matchOrder(originStats, targetStats), targetStats.values), template);
    } else {
      warning(true, `Complex values '${origin}' and '${target}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different");
      return mixImmediate(origin, target);
    }
  };

  // node_modules/motion-dom/dist/es/utils/mix/index.mjs
  function mix(from, to, p2) {
    if (typeof from === "number" && typeof to === "number" && typeof p2 === "number") {
      return mixNumber(from, to, p2);
    }
    const mixer = getMixer(from);
    return mixer(from, to);
  }

  // node_modules/motion-dom/dist/es/animation/drivers/frame.mjs
  var frameloopDriver = (update) => {
    const passTimestamp = ({ timestamp }) => update(timestamp);
    return {
      start: (keepAlive = true) => frame.update(passTimestamp, keepAlive),
      stop: () => cancelFrame(passTimestamp),
      /**
       * If we're processing this frame we can use the
       * framelocked timestamp to keep things in sync.
       */
      now: () => frameData.isProcessing ? frameData.timestamp : time.now()
    };
  };

  // node_modules/motion-dom/dist/es/animation/waapi/utils/linear.mjs
  var generateLinearEasing = (easing, duration, resolution = 10) => {
    let points = "";
    const numPoints = Math.max(Math.round(duration / resolution), 2);
    for (let i2 = 0; i2 < numPoints; i2++) {
      points += Math.round(easing(i2 / (numPoints - 1)) * 1e4) / 1e4 + ", ";
    }
    return `linear(${points.substring(0, points.length - 2)})`;
  };

  // node_modules/motion-dom/dist/es/animation/generators/utils/calc-duration.mjs
  var maxGeneratorDuration = 2e4;
  function calcGeneratorDuration(generator) {
    let duration = 0;
    const timeStep = 50;
    let state = generator.next(duration);
    while (!state.done && duration < maxGeneratorDuration) {
      duration += timeStep;
      state = generator.next(duration);
    }
    return duration >= maxGeneratorDuration ? Infinity : duration;
  }

  // node_modules/motion-dom/dist/es/animation/generators/utils/create-generator-easing.mjs
  function createGeneratorEasing(options, scale2 = 100, createGenerator) {
    const generator = createGenerator({ ...options, keyframes: [0, scale2] });
    const duration = Math.min(calcGeneratorDuration(generator), maxGeneratorDuration);
    return {
      type: "keyframes",
      ease: (progress2) => {
        return generator.next(duration * progress2).value / scale2;
      },
      duration: millisecondsToSeconds(duration)
    };
  }

  // node_modules/motion-dom/dist/es/animation/generators/spring.mjs
  var springDefaults = {
    // Default spring physics
    stiffness: 100,
    damping: 10,
    mass: 1,
    velocity: 0,
    // Default duration/bounce-based options
    duration: 800,
    // in ms
    bounce: 0.3,
    visualDuration: 0.3,
    // in seconds
    // Rest thresholds
    restSpeed: {
      granular: 0.01,
      default: 2
    },
    restDelta: {
      granular: 5e-3,
      default: 0.5
    },
    // Limits
    minDuration: 0.01,
    // in seconds
    maxDuration: 10,
    // in seconds
    minDamping: 0.05,
    maxDamping: 1
  };
  function calcAngularFreq(undampedFreq, dampingRatio) {
    return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
  }
  var rootIterations = 12;
  function approximateRoot(envelope, derivative, initialGuess) {
    let result = initialGuess;
    for (let i2 = 1; i2 < rootIterations; i2++) {
      result = result - envelope(result) / derivative(result);
    }
    return result;
  }
  var safeMin = 1e-3;
  function findSpring({ duration = springDefaults.duration, bounce = springDefaults.bounce, velocity = springDefaults.velocity, mass = springDefaults.mass }) {
    let envelope;
    let derivative;
    warning(duration <= secondsToMilliseconds(springDefaults.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
    let dampingRatio = 1 - bounce;
    dampingRatio = clamp(springDefaults.minDamping, springDefaults.maxDamping, dampingRatio);
    duration = clamp(springDefaults.minDuration, springDefaults.maxDuration, millisecondsToSeconds(duration));
    if (dampingRatio < 1) {
      envelope = (undampedFreq2) => {
        const exponentialDecay = undampedFreq2 * dampingRatio;
        const delta = exponentialDecay * duration;
        const a2 = exponentialDecay - velocity;
        const b2 = calcAngularFreq(undampedFreq2, dampingRatio);
        const c2 = Math.exp(-delta);
        return safeMin - a2 / b2 * c2;
      };
      derivative = (undampedFreq2) => {
        const exponentialDecay = undampedFreq2 * dampingRatio;
        const delta = exponentialDecay * duration;
        const d2 = delta * velocity + velocity;
        const e2 = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq2, 2) * duration;
        const f2 = Math.exp(-delta);
        const g2 = calcAngularFreq(Math.pow(undampedFreq2, 2), dampingRatio);
        const factor = -envelope(undampedFreq2) + safeMin > 0 ? -1 : 1;
        return factor * ((d2 - e2) * f2) / g2;
      };
    } else {
      envelope = (undampedFreq2) => {
        const a2 = Math.exp(-undampedFreq2 * duration);
        const b2 = (undampedFreq2 - velocity) * duration + 1;
        return -safeMin + a2 * b2;
      };
      derivative = (undampedFreq2) => {
        const a2 = Math.exp(-undampedFreq2 * duration);
        const b2 = (velocity - undampedFreq2) * (duration * duration);
        return a2 * b2;
      };
    }
    const initialGuess = 5 / duration;
    const undampedFreq = approximateRoot(envelope, derivative, initialGuess);
    duration = secondsToMilliseconds(duration);
    if (isNaN(undampedFreq)) {
      return {
        stiffness: springDefaults.stiffness,
        damping: springDefaults.damping,
        duration
      };
    } else {
      const stiffness = Math.pow(undampedFreq, 2) * mass;
      return {
        stiffness,
        damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
        duration
      };
    }
  }
  var durationKeys = ["duration", "bounce"];
  var physicsKeys = ["stiffness", "damping", "mass"];
  function isSpringType(options, keys) {
    return keys.some((key) => options[key] !== void 0);
  }
  function getSpringOptions(options) {
    let springOptions = {
      velocity: springDefaults.velocity,
      stiffness: springDefaults.stiffness,
      damping: springDefaults.damping,
      mass: springDefaults.mass,
      isResolvedFromDuration: false,
      ...options
    };
    if (!isSpringType(options, physicsKeys) && isSpringType(options, durationKeys)) {
      springOptions.velocity = 0;
      if (options.visualDuration) {
        const visualDuration = options.visualDuration;
        const root = 2 * Math.PI / (visualDuration * 1.2);
        const stiffness = root * root;
        const damping = 2 * clamp(0.05, 1, 1 - (options.bounce || 0)) * Math.sqrt(stiffness);
        springOptions = {
          ...springOptions,
          mass: springDefaults.mass,
          stiffness,
          damping
        };
      } else {
        const derived = findSpring({ ...options, velocity: 0 });
        springOptions = {
          ...springOptions,
          ...derived,
          mass: springDefaults.mass
        };
        springOptions.isResolvedFromDuration = true;
      }
    }
    return springOptions;
  }
  function spring(optionsOrVisualDuration = springDefaults.visualDuration, bounce = springDefaults.bounce) {
    const options = typeof optionsOrVisualDuration !== "object" ? {
      visualDuration: optionsOrVisualDuration,
      keyframes: [0, 1],
      bounce
    } : optionsOrVisualDuration;
    let { restSpeed, restDelta } = options;
    const origin = options.keyframes[0];
    const target = options.keyframes[options.keyframes.length - 1];
    const state = { done: false, value: origin };
    const { stiffness, damping, mass, duration, velocity, isResolvedFromDuration } = getSpringOptions({
      ...options,
      velocity: -millisecondsToSeconds(options.velocity || 0)
    });
    const initialVelocity = velocity || 0;
    const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
    const initialDelta = target - origin;
    const undampedAngularFreq = millisecondsToSeconds(Math.sqrt(stiffness / mass));
    const isGranularScale = Math.abs(initialDelta) < 5;
    restSpeed || (restSpeed = isGranularScale ? springDefaults.restSpeed.granular : springDefaults.restSpeed.default);
    restDelta || (restDelta = isGranularScale ? springDefaults.restDelta.granular : springDefaults.restDelta.default);
    let resolveSpring;
    let resolveVelocity;
    let angularFreq;
    let A2;
    let sinCoeff;
    let cosCoeff;
    if (dampingRatio < 1) {
      angularFreq = calcAngularFreq(undampedAngularFreq, dampingRatio);
      A2 = (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq;
      resolveSpring = (t2) => {
        const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t2);
        return target - envelope * (A2 * Math.sin(angularFreq * t2) + initialDelta * Math.cos(angularFreq * t2));
      };
      sinCoeff = dampingRatio * undampedAngularFreq * A2 + initialDelta * angularFreq;
      cosCoeff = dampingRatio * undampedAngularFreq * initialDelta - A2 * angularFreq;
      resolveVelocity = (t2) => {
        const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t2);
        return envelope * (sinCoeff * Math.sin(angularFreq * t2) + cosCoeff * Math.cos(angularFreq * t2));
      };
    } else if (dampingRatio === 1) {
      resolveSpring = (t2) => target - Math.exp(-undampedAngularFreq * t2) * (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t2);
      const C2 = initialVelocity + undampedAngularFreq * initialDelta;
      resolveVelocity = (t2) => Math.exp(-undampedAngularFreq * t2) * (undampedAngularFreq * C2 * t2 - initialVelocity);
    } else {
      const dampedAngularFreq = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
      resolveSpring = (t2) => {
        const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t2);
        const freqForT = Math.min(dampedAngularFreq * t2, 300);
        return target - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) * Math.sinh(freqForT) + dampedAngularFreq * initialDelta * Math.cosh(freqForT)) / dampedAngularFreq;
      };
      const P2 = (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / dampedAngularFreq;
      const sinhCoeff = dampingRatio * undampedAngularFreq * P2 - initialDelta * dampedAngularFreq;
      const coshCoeff = dampingRatio * undampedAngularFreq * initialDelta - P2 * dampedAngularFreq;
      resolveVelocity = (t2) => {
        const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t2);
        const freqForT = Math.min(dampedAngularFreq * t2, 300);
        return envelope * (sinhCoeff * Math.sinh(freqForT) + coshCoeff * Math.cosh(freqForT));
      };
    }
    const generator = {
      calculatedDuration: isResolvedFromDuration ? duration || null : null,
      velocity: (t2) => secondsToMilliseconds(resolveVelocity(t2)),
      next: (t2) => {
        if (!isResolvedFromDuration && dampingRatio < 1) {
          const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t2);
          const sin = Math.sin(angularFreq * t2);
          const cos = Math.cos(angularFreq * t2);
          const current2 = target - envelope * (A2 * sin + initialDelta * cos);
          const currentVelocity = secondsToMilliseconds(envelope * (sinCoeff * sin + cosCoeff * cos));
          state.done = Math.abs(currentVelocity) <= restSpeed && Math.abs(target - current2) <= restDelta;
          state.value = state.done ? target : current2;
          return state;
        }
        const current = resolveSpring(t2);
        if (!isResolvedFromDuration) {
          const currentVelocity = secondsToMilliseconds(resolveVelocity(t2));
          state.done = Math.abs(currentVelocity) <= restSpeed && Math.abs(target - current) <= restDelta;
        } else {
          state.done = t2 >= duration;
        }
        state.value = state.done ? target : current;
        return state;
      },
      toString: () => {
        const calculatedDuration = Math.min(calcGeneratorDuration(generator), maxGeneratorDuration);
        const easing = generateLinearEasing((progress2) => generator.next(calculatedDuration * progress2).value, calculatedDuration, 30);
        return calculatedDuration + "ms " + easing;
      },
      toTransition: () => {
      }
    };
    return generator;
  }
  spring.applyToOptions = (options) => {
    const generatorOptions = createGeneratorEasing(options, 100, spring);
    options.ease = generatorOptions.ease;
    options.duration = secondsToMilliseconds(generatorOptions.duration);
    options.type = "keyframes";
    return options;
  };

  // node_modules/motion-dom/dist/es/animation/generators/utils/velocity.mjs
  var velocitySampleDuration = 5;
  function getGeneratorVelocity(resolveValue, t2, current) {
    const prevT = Math.max(t2 - velocitySampleDuration, 0);
    return velocityPerSecond(current - resolveValue(prevT), t2 - prevT);
  }

  // node_modules/motion-dom/dist/es/animation/generators/inertia.mjs
  function inertia({ keyframes: keyframes2, velocity = 0, power = 0.8, timeConstant = 325, bounceDamping = 10, bounceStiffness = 500, modifyTarget, min, max, restDelta = 0.5, restSpeed }) {
    const origin = keyframes2[0];
    const state = {
      done: false,
      value: origin
    };
    const isOutOfBounds = (v2) => min !== void 0 && v2 < min || max !== void 0 && v2 > max;
    const nearestBoundary = (v2) => {
      if (min === void 0)
        return max;
      if (max === void 0)
        return min;
      return Math.abs(min - v2) < Math.abs(max - v2) ? min : max;
    };
    let amplitude = power * velocity;
    const ideal = origin + amplitude;
    const target = modifyTarget === void 0 ? ideal : modifyTarget(ideal);
    if (target !== ideal)
      amplitude = target - origin;
    const calcDelta = (t2) => -amplitude * Math.exp(-t2 / timeConstant);
    const calcLatest = (t2) => target + calcDelta(t2);
    const applyFriction = (t2) => {
      const delta = calcDelta(t2);
      const latest = calcLatest(t2);
      state.done = Math.abs(delta) <= restDelta;
      state.value = state.done ? target : latest;
    };
    let timeReachedBoundary;
    let spring$1;
    const checkCatchBoundary = (t2) => {
      if (!isOutOfBounds(state.value))
        return;
      timeReachedBoundary = t2;
      spring$1 = spring({
        keyframes: [state.value, nearestBoundary(state.value)],
        velocity: getGeneratorVelocity(calcLatest, t2, state.value),
        // TODO: This should be passing * 1000
        damping: bounceDamping,
        stiffness: bounceStiffness,
        restDelta,
        restSpeed
      });
    };
    checkCatchBoundary(0);
    return {
      calculatedDuration: null,
      next: (t2) => {
        let hasUpdatedFrame = false;
        if (!spring$1 && timeReachedBoundary === void 0) {
          hasUpdatedFrame = true;
          applyFriction(t2);
          checkCatchBoundary(t2);
        }
        if (timeReachedBoundary !== void 0 && t2 >= timeReachedBoundary) {
          return spring$1.next(t2 - timeReachedBoundary);
        } else {
          !hasUpdatedFrame && applyFriction(t2);
          return state;
        }
      }
    };
  }

  // node_modules/motion-dom/dist/es/utils/interpolate.mjs
  function createMixers(output, ease2, customMixer) {
    const mixers = [];
    const mixerFactory = customMixer || MotionGlobalConfig.mix || mix;
    const numMixers = output.length - 1;
    for (let i2 = 0; i2 < numMixers; i2++) {
      let mixer = mixerFactory(output[i2], output[i2 + 1]);
      if (ease2) {
        const easingFunction = Array.isArray(ease2) ? ease2[i2] || noop : ease2;
        mixer = pipe(easingFunction, mixer);
      }
      mixers.push(mixer);
    }
    return mixers;
  }
  function interpolate(input, output, { clamp: isClamp = true, ease: ease2, mixer } = {}) {
    const inputLength = input.length;
    invariant(inputLength === output.length, "Both input and output ranges must be the same length", "range-length");
    if (inputLength === 1)
      return () => output[0];
    if (inputLength === 2 && output[0] === output[1])
      return () => output[1];
    const isZeroDeltaRange = input[0] === input[1];
    if (input[0] > input[inputLength - 1]) {
      input = [...input].reverse();
      output = [...output].reverse();
    }
    const mixers = createMixers(output, ease2, mixer);
    const numMixers = mixers.length;
    const interpolator = (v2) => {
      if (isZeroDeltaRange && v2 < input[0])
        return output[0];
      let i2 = 0;
      if (numMixers > 1) {
        for (; i2 < input.length - 2; i2++) {
          if (v2 < input[i2 + 1])
            break;
        }
      }
      const progressInRange = progress(input[i2], input[i2 + 1], v2);
      return mixers[i2](progressInRange);
    };
    return isClamp ? (v2) => interpolator(clamp(input[0], input[inputLength - 1], v2)) : interpolator;
  }

  // node_modules/motion-dom/dist/es/animation/keyframes/offsets/fill.mjs
  function fillOffset(offset, remaining) {
    const min = offset[offset.length - 1];
    for (let i2 = 1; i2 <= remaining; i2++) {
      const offsetProgress = progress(0, remaining, i2);
      offset.push(mixNumber(min, 1, offsetProgress));
    }
  }

  // node_modules/motion-dom/dist/es/animation/keyframes/offsets/default.mjs
  function defaultOffset(arr) {
    const offset = [0];
    fillOffset(offset, arr.length - 1);
    return offset;
  }

  // node_modules/motion-dom/dist/es/animation/keyframes/offsets/time.mjs
  function convertOffsetToTimes(offset, duration) {
    return offset.map((o2) => o2 * duration);
  }

  // node_modules/motion-dom/dist/es/animation/generators/keyframes.mjs
  function defaultEasing(values, easing) {
    return values.map(() => easing || easeInOut).splice(0, values.length - 1);
  }
  function keyframes({ duration = 300, keyframes: keyframeValues, times, ease: ease2 = "easeInOut" }) {
    const easingFunctions = isEasingArray(ease2) ? ease2.map(easingDefinitionToFunction) : easingDefinitionToFunction(ease2);
    const state = {
      done: false,
      value: keyframeValues[0]
    };
    const absoluteTimes = convertOffsetToTimes(
      // Only use the provided offsets if they're the correct length
      // TODO Maybe we should warn here if there's a length mismatch
      times && times.length === keyframeValues.length ? times : defaultOffset(keyframeValues),
      duration
    );
    const mapTimeToKeyframe = interpolate(absoluteTimes, keyframeValues, {
      ease: Array.isArray(easingFunctions) ? easingFunctions : defaultEasing(keyframeValues, easingFunctions)
    });
    return {
      calculatedDuration: duration,
      next: (t2) => {
        state.value = mapTimeToKeyframe(t2);
        state.done = t2 >= duration;
        return state;
      }
    };
  }

  // node_modules/motion-dom/dist/es/animation/keyframes/get-final.mjs
  var isNotNull = (value) => value !== null;
  function getFinalKeyframe(keyframes2, { repeat, repeatType = "loop" }, finalKeyframe, speed = 1) {
    const resolvedKeyframes = keyframes2.filter(isNotNull);
    const useFirstKeyframe = speed < 0 || repeat && repeatType !== "loop" && repeat % 2 === 1;
    const index = useFirstKeyframe ? 0 : resolvedKeyframes.length - 1;
    return !index || finalKeyframe === void 0 ? resolvedKeyframes[index] : finalKeyframe;
  }

  // node_modules/motion-dom/dist/es/animation/utils/replace-transition-type.mjs
  var transitionTypeMap = {
    decay: inertia,
    inertia,
    tween: keyframes,
    keyframes,
    spring
  };
  function replaceTransitionType(transition) {
    if (typeof transition.type === "string") {
      transition.type = transitionTypeMap[transition.type];
    }
  }

  // node_modules/motion-dom/dist/es/animation/utils/WithPromise.mjs
  var WithPromise = class {
    constructor() {
      this.updateFinished();
    }
    get finished() {
      return this._finished;
    }
    updateFinished() {
      this._finished = new Promise((resolve) => {
        this.resolve = resolve;
      });
    }
    notifyFinished() {
      this.resolve();
    }
    /**
     * Allows the animation to be awaited.
     *
     * @deprecated Use `finished` instead.
     */
    then(onResolve, onReject) {
      return this.finished.then(onResolve, onReject);
    }
  };

  // node_modules/motion-dom/dist/es/animation/JSAnimation.mjs
  var percentToProgress = (percent2) => percent2 / 100;
  var JSAnimation = class extends WithPromise {
    constructor(options) {
      super();
      this.state = "idle";
      this.startTime = null;
      this.isStopped = false;
      this.currentTime = 0;
      this.holdTime = null;
      this.playbackSpeed = 1;
      this.delayState = {
        done: false,
        value: void 0
      };
      this.stop = () => {
        const { motionValue: motionValue2 } = this.options;
        if (motionValue2 && motionValue2.updatedAt !== time.now()) {
          this.tick(time.now());
        }
        this.isStopped = true;
        if (this.state === "idle")
          return;
        this.teardown();
        this.options.onStop?.();
      };
      activeAnimations.mainThread++;
      this.options = options;
      this.initAnimation();
      this.play();
      if (options.autoplay === false)
        this.pause();
    }
    initAnimation() {
      const { options } = this;
      replaceTransitionType(options);
      const { type = keyframes, repeat = 0, repeatDelay = 0, repeatType, velocity = 0 } = options;
      let { keyframes: keyframes$1 } = options;
      const generatorFactory = type || keyframes;
      if (generatorFactory !== keyframes) {
        invariant(keyframes$1.length <= 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${keyframes$1}`, "spring-two-frames");
      }
      if (generatorFactory !== keyframes && typeof keyframes$1[0] !== "number") {
        this.mixKeyframes = pipe(percentToProgress, mix(keyframes$1[0], keyframes$1[1]));
        keyframes$1 = [0, 100];
      }
      const generator = generatorFactory({ ...options, keyframes: keyframes$1 });
      if (repeatType === "mirror") {
        this.mirroredGenerator = generatorFactory({
          ...options,
          keyframes: [...keyframes$1].reverse(),
          velocity: -velocity
        });
      }
      if (generator.calculatedDuration === null) {
        generator.calculatedDuration = calcGeneratorDuration(generator);
      }
      const { calculatedDuration } = generator;
      this.calculatedDuration = calculatedDuration;
      this.resolvedDuration = calculatedDuration + repeatDelay;
      this.totalDuration = this.resolvedDuration * (repeat + 1) - repeatDelay;
      this.generator = generator;
    }
    updateTime(timestamp) {
      const animationTime = Math.round(timestamp - this.startTime) * this.playbackSpeed;
      if (this.holdTime !== null) {
        this.currentTime = this.holdTime;
      } else {
        this.currentTime = animationTime;
      }
    }
    tick(timestamp, sample = false) {
      const { generator, totalDuration, mixKeyframes, mirroredGenerator, resolvedDuration, calculatedDuration } = this;
      if (this.startTime === null)
        return generator.next(0);
      const { delay = 0, keyframes: keyframes2, repeat, repeatType, repeatDelay, type, onUpdate, finalKeyframe } = this.options;
      if (this.speed > 0) {
        this.startTime = Math.min(this.startTime, timestamp);
      } else if (this.speed < 0) {
        this.startTime = Math.min(timestamp - totalDuration / this.speed, this.startTime);
      }
      if (sample) {
        this.currentTime = timestamp;
      } else {
        this.updateTime(timestamp);
      }
      const timeWithoutDelay = this.currentTime - delay * (this.playbackSpeed >= 0 ? 1 : -1);
      const isInDelayPhase = this.playbackSpeed >= 0 ? timeWithoutDelay < 0 : timeWithoutDelay > totalDuration;
      this.currentTime = Math.max(timeWithoutDelay, 0);
      if (this.state === "finished" && this.holdTime === null) {
        this.currentTime = totalDuration;
      }
      let elapsed = this.currentTime;
      let frameGenerator = generator;
      if (repeat) {
        const progress2 = Math.min(this.currentTime, totalDuration) / resolvedDuration;
        let currentIteration = Math.floor(progress2);
        let iterationProgress = progress2 % 1;
        if (!iterationProgress && progress2 >= 1) {
          iterationProgress = 1;
        }
        iterationProgress === 1 && currentIteration--;
        currentIteration = Math.min(currentIteration, repeat + 1);
        const isOddIteration = Boolean(currentIteration % 2);
        if (isOddIteration) {
          if (repeatType === "reverse") {
            iterationProgress = 1 - iterationProgress;
            if (repeatDelay) {
              iterationProgress -= repeatDelay / resolvedDuration;
            }
          } else if (repeatType === "mirror") {
            frameGenerator = mirroredGenerator;
          }
        }
        elapsed = clamp(0, 1, iterationProgress) * resolvedDuration;
      }
      let state;
      if (isInDelayPhase) {
        this.delayState.value = keyframes2[0];
        state = this.delayState;
      } else {
        state = frameGenerator.next(elapsed);
      }
      if (mixKeyframes && !isInDelayPhase) {
        state.value = mixKeyframes(state.value);
      }
      let { done } = state;
      if (!isInDelayPhase && calculatedDuration !== null) {
        done = this.playbackSpeed >= 0 ? this.currentTime >= totalDuration : this.currentTime <= 0;
      }
      const isAnimationFinished = this.holdTime === null && (this.state === "finished" || this.state === "running" && done);
      if (isAnimationFinished && type !== inertia) {
        state.value = getFinalKeyframe(keyframes2, this.options, finalKeyframe, this.speed);
      }
      if (onUpdate) {
        onUpdate(state.value);
      }
      if (isAnimationFinished) {
        this.finish();
      }
      return state;
    }
    /**
     * Allows the returned animation to be awaited or promise-chained. Currently
     * resolves when the animation finishes at all but in a future update could/should
     * reject if its cancels.
     */
    then(resolve, reject) {
      return this.finished.then(resolve, reject);
    }
    get duration() {
      return millisecondsToSeconds(this.calculatedDuration);
    }
    get iterationDuration() {
      const { delay = 0 } = this.options || {};
      return this.duration + millisecondsToSeconds(delay);
    }
    get time() {
      return millisecondsToSeconds(this.currentTime);
    }
    set time(newTime) {
      newTime = secondsToMilliseconds(newTime);
      this.currentTime = newTime;
      if (this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0) {
        this.holdTime = newTime;
      } else if (this.driver) {
        this.startTime = this.driver.now() - newTime / this.playbackSpeed;
      }
      if (this.driver) {
        this.driver.start(false);
      } else {
        this.startTime = 0;
        this.state = "paused";
        this.holdTime = newTime;
        this.tick(newTime);
      }
    }
    /**
     * Returns the generator's velocity at the current time in units/second.
     * Uses the analytical derivative when available (springs), avoiding
     * the MotionValue's frame-dependent velocity estimation.
     */
    getGeneratorVelocity() {
      const t2 = this.currentTime;
      if (t2 <= 0)
        return this.options.velocity || 0;
      if (this.generator.velocity) {
        return this.generator.velocity(t2);
      }
      const current = this.generator.next(t2).value;
      return getGeneratorVelocity((s2) => this.generator.next(s2).value, t2, current);
    }
    get speed() {
      return this.playbackSpeed;
    }
    set speed(newSpeed) {
      const hasChanged = this.playbackSpeed !== newSpeed;
      if (hasChanged && this.driver) {
        this.updateTime(time.now());
      }
      this.playbackSpeed = newSpeed;
      if (hasChanged && this.driver) {
        this.time = millisecondsToSeconds(this.currentTime);
      }
    }
    play() {
      if (this.isStopped)
        return;
      const { driver = frameloopDriver, startTime } = this.options;
      if (!this.driver) {
        this.driver = driver((timestamp) => this.tick(timestamp));
      }
      this.options.onPlay?.();
      const now2 = this.driver.now();
      if (this.state === "finished") {
        this.updateFinished();
        this.startTime = now2;
      } else if (this.holdTime !== null) {
        this.startTime = now2 - this.holdTime;
      } else if (!this.startTime) {
        this.startTime = startTime ?? now2;
      }
      if (this.state === "finished" && this.speed < 0) {
        this.startTime += this.calculatedDuration;
      }
      this.holdTime = null;
      this.state = "running";
      this.driver.start();
    }
    pause() {
      this.state = "paused";
      this.updateTime(time.now());
      this.holdTime = this.currentTime;
    }
    complete() {
      if (this.state !== "running") {
        this.play();
      }
      this.state = "finished";
      this.holdTime = null;
    }
    finish() {
      this.notifyFinished();
      this.teardown();
      this.state = "finished";
      this.options.onComplete?.();
    }
    cancel() {
      this.holdTime = null;
      this.startTime = 0;
      this.tick(0);
      this.teardown();
      this.options.onCancel?.();
    }
    teardown() {
      this.state = "idle";
      this.stopDriver();
      this.startTime = this.holdTime = null;
      activeAnimations.mainThread--;
    }
    stopDriver() {
      if (!this.driver)
        return;
      this.driver.stop();
      this.driver = void 0;
    }
    sample(sampleTime) {
      this.startTime = 0;
      return this.tick(sampleTime, true);
    }
    attachTimeline(timeline) {
      if (this.options.allowFlatten) {
        this.options.type = "keyframes";
        this.options.ease = "linear";
        this.initAnimation();
      }
      this.driver?.stop();
      return timeline.observe(this);
    }
  };

  // node_modules/motion-dom/dist/es/animation/keyframes/utils/fill-wildcards.mjs
  function fillWildcards(keyframes2) {
    for (let i2 = 1; i2 < keyframes2.length; i2++) {
      keyframes2[i2] ?? (keyframes2[i2] = keyframes2[i2 - 1]);
    }
  }

  // node_modules/motion-dom/dist/es/render/dom/parse-transform.mjs
  var radToDeg = (rad) => rad * 180 / Math.PI;
  var rotate = (v2) => {
    const angle = radToDeg(Math.atan2(v2[1], v2[0]));
    return rebaseAngle(angle);
  };
  var matrix2dParsers = {
    x: 4,
    y: 5,
    translateX: 4,
    translateY: 5,
    scaleX: 0,
    scaleY: 3,
    scale: (v2) => (Math.abs(v2[0]) + Math.abs(v2[3])) / 2,
    rotate,
    rotateZ: rotate,
    skewX: (v2) => radToDeg(Math.atan(v2[1])),
    skewY: (v2) => radToDeg(Math.atan(v2[2])),
    skew: (v2) => (Math.abs(v2[1]) + Math.abs(v2[2])) / 2
  };
  var rebaseAngle = (angle) => {
    angle = angle % 360;
    if (angle < 0)
      angle += 360;
    return angle;
  };
  var rotateZ = rotate;
  var scaleX = (v2) => Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1]);
  var scaleY = (v2) => Math.sqrt(v2[4] * v2[4] + v2[5] * v2[5]);
  var matrix3dParsers = {
    x: 12,
    y: 13,
    z: 14,
    translateX: 12,
    translateY: 13,
    translateZ: 14,
    scaleX,
    scaleY,
    scale: (v2) => (scaleX(v2) + scaleY(v2)) / 2,
    rotateX: (v2) => rebaseAngle(radToDeg(Math.atan2(v2[6], v2[5]))),
    rotateY: (v2) => rebaseAngle(radToDeg(Math.atan2(-v2[2], v2[0]))),
    rotateZ,
    rotate: rotateZ,
    skewX: (v2) => radToDeg(Math.atan(v2[4])),
    skewY: (v2) => radToDeg(Math.atan(v2[1])),
    skew: (v2) => (Math.abs(v2[1]) + Math.abs(v2[4])) / 2
  };
  function defaultTransformValue(name) {
    return name.includes("scale") ? 1 : 0;
  }
  function parseValueFromTransform(transform, name) {
    if (!transform || transform === "none") {
      return defaultTransformValue(name);
    }
    const matrix3dMatch = transform.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
    let parsers;
    let match;
    if (matrix3dMatch) {
      parsers = matrix3dParsers;
      match = matrix3dMatch;
    } else {
      const matrix2dMatch = transform.match(/^matrix\(([-\d.e\s,]+)\)$/u);
      parsers = matrix2dParsers;
      match = matrix2dMatch;
    }
    if (!match) {
      return defaultTransformValue(name);
    }
    const valueParser = parsers[name];
    const values = match[1].split(",").map(convertTransformToNumber);
    return typeof valueParser === "function" ? valueParser(values) : values[valueParser];
  }
  var readTransformValue = (instance, name) => {
    const { transform = "none" } = getComputedStyle(instance);
    return parseValueFromTransform(transform, name);
  };
  function convertTransformToNumber(value) {
    return parseFloat(value.trim());
  }

  // node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs
  var transformPropOrder = [
    "transformPerspective",
    "x",
    "y",
    "z",
    "translateX",
    "translateY",
    "translateZ",
    "scale",
    "scaleX",
    "scaleY",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "skew",
    "skewX",
    "skewY"
  ];
  var transformProps = /* @__PURE__ */ (() => new Set(transformPropOrder))();

  // node_modules/motion-dom/dist/es/animation/keyframes/utils/unit-conversion.mjs
  var isNumOrPxType = (v2) => v2 === number || v2 === px;
  var transformKeys = /* @__PURE__ */ new Set(["x", "y", "z"]);
  var nonTranslationalTransformKeys = transformPropOrder.filter((key) => !transformKeys.has(key));
  function removeNonTranslationalTransform(visualElement) {
    const removedTransforms = [];
    nonTranslationalTransformKeys.forEach((key) => {
      const value = visualElement.getValue(key);
      if (value !== void 0) {
        removedTransforms.push([key, value.get()]);
        value.set(key.startsWith("scale") ? 1 : 0);
      }
    });
    return removedTransforms;
  }
  var positionalValues = {
    // Dimensions
    width: ({ x: x2 }, { paddingLeft = "0", paddingRight = "0", boxSizing }) => {
      const width = x2.max - x2.min;
      return boxSizing === "border-box" ? width : width - parseFloat(paddingLeft) - parseFloat(paddingRight);
    },
    height: ({ y: y2 }, { paddingTop = "0", paddingBottom = "0", boxSizing }) => {
      const height = y2.max - y2.min;
      return boxSizing === "border-box" ? height : height - parseFloat(paddingTop) - parseFloat(paddingBottom);
    },
    top: (_bbox, { top }) => parseFloat(top),
    left: (_bbox, { left }) => parseFloat(left),
    bottom: ({ y: y2 }, { top }) => parseFloat(top) + (y2.max - y2.min),
    right: ({ x: x2 }, { left }) => parseFloat(left) + (x2.max - x2.min),
    // Transform
    x: (_bbox, { transform }) => parseValueFromTransform(transform, "x"),
    y: (_bbox, { transform }) => parseValueFromTransform(transform, "y")
  };
  positionalValues.translateX = positionalValues.x;
  positionalValues.translateY = positionalValues.y;

  // node_modules/motion-dom/dist/es/animation/keyframes/KeyframesResolver.mjs
  var toResolve = /* @__PURE__ */ new Set();
  var isScheduled = false;
  var anyNeedsMeasurement = false;
  var isForced = false;
  function measureAllKeyframes() {
    if (anyNeedsMeasurement) {
      const resolversToMeasure = Array.from(toResolve).filter((resolver) => resolver.needsMeasurement);
      const elementsToMeasure = new Set(resolversToMeasure.map((resolver) => resolver.element));
      const transformsToRestore = /* @__PURE__ */ new Map();
      elementsToMeasure.forEach((element) => {
        const removedTransforms = removeNonTranslationalTransform(element);
        if (!removedTransforms.length)
          return;
        transformsToRestore.set(element, removedTransforms);
        element.render();
      });
      resolversToMeasure.forEach((resolver) => resolver.measureInitialState());
      elementsToMeasure.forEach((element) => {
        element.render();
        const restore = transformsToRestore.get(element);
        if (restore) {
          restore.forEach(([key, value]) => {
            element.getValue(key)?.set(value);
          });
        }
      });
      resolversToMeasure.forEach((resolver) => resolver.measureEndState());
      resolversToMeasure.forEach((resolver) => {
        if (resolver.suspendedScrollY !== void 0) {
          window.scrollTo(0, resolver.suspendedScrollY);
        }
      });
    }
    anyNeedsMeasurement = false;
    isScheduled = false;
    toResolve.forEach((resolver) => resolver.complete(isForced));
    toResolve.clear();
  }
  function readAllKeyframes() {
    toResolve.forEach((resolver) => {
      resolver.readKeyframes();
      if (resolver.needsMeasurement) {
        anyNeedsMeasurement = true;
      }
    });
  }
  function flushKeyframeResolvers() {
    isForced = true;
    readAllKeyframes();
    measureAllKeyframes();
    isForced = false;
  }
  var KeyframeResolver = class {
    constructor(unresolvedKeyframes, onComplete, name, motionValue2, element, isAsync = false) {
      this.state = "pending";
      this.isAsync = false;
      this.needsMeasurement = false;
      this.unresolvedKeyframes = [...unresolvedKeyframes];
      this.onComplete = onComplete;
      this.name = name;
      this.motionValue = motionValue2;
      this.element = element;
      this.isAsync = isAsync;
    }
    scheduleResolve() {
      this.state = "scheduled";
      if (this.isAsync) {
        toResolve.add(this);
        if (!isScheduled) {
          isScheduled = true;
          frame.read(readAllKeyframes);
          frame.resolveKeyframes(measureAllKeyframes);
        }
      } else {
        this.readKeyframes();
        this.complete();
      }
    }
    readKeyframes() {
      const { unresolvedKeyframes, name, element, motionValue: motionValue2 } = this;
      if (unresolvedKeyframes[0] === null) {
        const currentValue = motionValue2?.get();
        const finalKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
        if (currentValue !== void 0) {
          unresolvedKeyframes[0] = currentValue;
        } else if (element && name) {
          const valueAsRead = element.readValue(name, finalKeyframe);
          if (valueAsRead !== void 0 && valueAsRead !== null) {
            unresolvedKeyframes[0] = valueAsRead;
          }
        }
        if (unresolvedKeyframes[0] === void 0) {
          unresolvedKeyframes[0] = finalKeyframe;
        }
        if (motionValue2 && currentValue === void 0) {
          motionValue2.set(unresolvedKeyframes[0]);
        }
      }
      fillWildcards(unresolvedKeyframes);
    }
    setFinalKeyframe() {
    }
    measureInitialState() {
    }
    renderEndStyles() {
    }
    measureEndState() {
    }
    complete(isForcedComplete = false) {
      this.state = "complete";
      this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, isForcedComplete);
      toResolve.delete(this);
    }
    cancel() {
      if (this.state === "scheduled") {
        toResolve.delete(this);
        this.state = "pending";
      }
    }
    resume() {
      if (this.state === "pending")
        this.scheduleResolve();
    }
  };

  // node_modules/motion-dom/dist/es/render/dom/is-css-var.mjs
  var isCSSVar = (name) => name.startsWith("--");

  // node_modules/motion-dom/dist/es/render/dom/style-set.mjs
  function setStyle(element, name, value) {
    isCSSVar(name) ? element.style.setProperty(name, value) : element.style[name] = value;
  }

  // node_modules/motion-dom/dist/es/utils/supports/flags.mjs
  var supportsFlags = {};

  // node_modules/motion-dom/dist/es/utils/supports/memo.mjs
  function memoSupports(callback, supportsFlag) {
    const memoized = memo(callback);
    return () => supportsFlags[supportsFlag] ?? memoized();
  }

  // node_modules/motion-dom/dist/es/utils/supports/scroll-timeline.mjs
  var supportsScrollTimeline = /* @__PURE__ */ memoSupports(() => window.ScrollTimeline !== void 0, "scrollTimeline");

  // node_modules/motion-dom/dist/es/utils/supports/linear-easing.mjs
  var supportsLinearEasing = /* @__PURE__ */ memoSupports(() => {
    try {
      document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
    } catch (e2) {
      return false;
    }
    return true;
  }, "linearEasing");

  // node_modules/motion-dom/dist/es/animation/waapi/easing/cubic-bezier.mjs
  var cubicBezierAsString = ([a2, b2, c2, d2]) => `cubic-bezier(${a2}, ${b2}, ${c2}, ${d2})`;

  // node_modules/motion-dom/dist/es/animation/waapi/easing/supported.mjs
  var supportedWaapiEasing = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: /* @__PURE__ */ cubicBezierAsString([0, 0.65, 0.55, 1]),
    circOut: /* @__PURE__ */ cubicBezierAsString([0.55, 0, 1, 0.45]),
    backIn: /* @__PURE__ */ cubicBezierAsString([0.31, 0.01, 0.66, -0.59]),
    backOut: /* @__PURE__ */ cubicBezierAsString([0.33, 1.53, 0.69, 0.99])
  };

  // node_modules/motion-dom/dist/es/animation/waapi/easing/map-easing.mjs
  function mapEasingToNativeEasing(easing, duration) {
    if (!easing) {
      return void 0;
    } else if (typeof easing === "function") {
      return supportsLinearEasing() ? generateLinearEasing(easing, duration) : "ease-out";
    } else if (isBezierDefinition(easing)) {
      return cubicBezierAsString(easing);
    } else if (Array.isArray(easing)) {
      return easing.map((segmentEasing) => mapEasingToNativeEasing(segmentEasing, duration) || supportedWaapiEasing.easeOut);
    } else {
      return supportedWaapiEasing[easing];
    }
  }

  // node_modules/motion-dom/dist/es/animation/waapi/start-waapi-animation.mjs
  function startWaapiAnimation(element, valueName, keyframes2, { delay = 0, duration = 300, repeat = 0, repeatType = "loop", ease: ease2 = "easeOut", times } = {}, pseudoElement = void 0) {
    const keyframeOptions = {
      [valueName]: keyframes2
    };
    if (times)
      keyframeOptions.offset = times;
    const easing = mapEasingToNativeEasing(ease2, duration);
    if (Array.isArray(easing))
      keyframeOptions.easing = easing;
    if (statsBuffer.value) {
      activeAnimations.waapi++;
    }
    const options = {
      delay,
      duration,
      easing: !Array.isArray(easing) ? easing : "linear",
      fill: "both",
      iterations: repeat + 1,
      direction: repeatType === "reverse" ? "alternate" : "normal"
    };
    if (pseudoElement)
      options.pseudoElement = pseudoElement;
    const animation = element.animate(keyframeOptions, options);
    if (statsBuffer.value) {
      animation.finished.finally(() => {
        activeAnimations.waapi--;
      });
    }
    return animation;
  }

  // node_modules/motion-dom/dist/es/animation/generators/utils/is-generator.mjs
  function isGenerator(type) {
    return typeof type === "function" && "applyToOptions" in type;
  }

  // node_modules/motion-dom/dist/es/animation/waapi/utils/apply-generator.mjs
  function applyGeneratorOptions({ type, ...options }) {
    if (isGenerator(type) && supportsLinearEasing()) {
      return type.applyToOptions(options);
    } else {
      options.duration ?? (options.duration = 300);
      options.ease ?? (options.ease = "easeOut");
    }
    return options;
  }

  // node_modules/motion-dom/dist/es/animation/NativeAnimation.mjs
  var NativeAnimation = class extends WithPromise {
    constructor(options) {
      super();
      this.finishedTime = null;
      this.isStopped = false;
      this.manualStartTime = null;
      if (!options)
        return;
      const { element, name, keyframes: keyframes2, pseudoElement, allowFlatten = false, finalKeyframe, onComplete } = options;
      this.isPseudoElement = Boolean(pseudoElement);
      this.allowFlatten = allowFlatten;
      this.options = options;
      invariant(typeof options.type !== "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
      const transition = applyGeneratorOptions(options);
      this.animation = startWaapiAnimation(element, name, keyframes2, transition, pseudoElement);
      if (transition.autoplay === false) {
        this.animation.pause();
      }
      this.animation.onfinish = () => {
        this.finishedTime = this.time;
        if (!pseudoElement) {
          const keyframe = getFinalKeyframe(keyframes2, this.options, finalKeyframe, this.speed);
          if (this.updateMotionValue) {
            this.updateMotionValue(keyframe);
          }
          setStyle(element, name, keyframe);
          this.animation.cancel();
        }
        onComplete?.();
        this.notifyFinished();
      };
    }
    play() {
      if (this.isStopped)
        return;
      this.manualStartTime = null;
      this.animation.play();
      if (this.state === "finished") {
        this.updateFinished();
      }
    }
    pause() {
      this.animation.pause();
    }
    complete() {
      this.animation.finish?.();
    }
    cancel() {
      try {
        this.animation.cancel();
      } catch (e2) {
      }
    }
    stop() {
      if (this.isStopped)
        return;
      this.isStopped = true;
      const { state } = this;
      if (state === "idle" || state === "finished") {
        return;
      }
      if (this.updateMotionValue) {
        this.updateMotionValue();
      } else {
        this.commitStyles();
      }
      if (!this.isPseudoElement)
        this.cancel();
    }
    /**
     * WAAPI doesn't natively have any interruption capabilities.
     *
     * In this method, we commit styles back to the DOM before cancelling
     * the animation.
     *
     * This is designed to be overridden by NativeAnimationExtended, which
     * will create a renderless JS animation and sample it twice to calculate
     * its current value, "previous" value, and therefore allow
     * Motion to also correctly calculate velocity for any subsequent animation
     * while deferring the commit until the next animation frame.
     */
    commitStyles() {
      const element = this.options?.element;
      if (!this.isPseudoElement && element?.isConnected) {
        this.animation.commitStyles?.();
      }
    }
    get duration() {
      const duration = this.animation.effect?.getComputedTiming?.().duration || 0;
      return millisecondsToSeconds(Number(duration));
    }
    get iterationDuration() {
      const { delay = 0 } = this.options || {};
      return this.duration + millisecondsToSeconds(delay);
    }
    get time() {
      return millisecondsToSeconds(Number(this.animation.currentTime) || 0);
    }
    set time(newTime) {
      const wasFinished = this.finishedTime !== null;
      this.manualStartTime = null;
      this.finishedTime = null;
      this.animation.currentTime = secondsToMilliseconds(newTime);
      if (wasFinished) {
        this.animation.pause();
      }
    }
    /**
     * The playback speed of the animation.
     * 1 = normal speed, 2 = double speed, 0.5 = half speed.
     */
    get speed() {
      return this.animation.playbackRate;
    }
    set speed(newSpeed) {
      if (newSpeed < 0)
        this.finishedTime = null;
      this.animation.playbackRate = newSpeed;
    }
    get state() {
      return this.finishedTime !== null ? "finished" : this.animation.playState;
    }
    get startTime() {
      return this.manualStartTime ?? Number(this.animation.startTime);
    }
    set startTime(newStartTime) {
      this.manualStartTime = this.animation.startTime = newStartTime;
    }
    /**
     * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
     */
    attachTimeline({ timeline, rangeStart, rangeEnd, observe: observe2 }) {
      if (this.allowFlatten) {
        this.animation.effect?.updateTiming({ easing: "linear" });
      }
      this.animation.onfinish = null;
      if (timeline && supportsScrollTimeline()) {
        this.animation.timeline = timeline;
        if (rangeStart)
          this.animation.rangeStart = rangeStart;
        if (rangeEnd)
          this.animation.rangeEnd = rangeEnd;
        return noop;
      } else {
        return observe2(this);
      }
    }
  };

  // node_modules/motion-dom/dist/es/animation/waapi/utils/unsupported-easing.mjs
  var unsupportedEasingFunctions = {
    anticipate,
    backInOut,
    circInOut
  };
  function isUnsupportedEase(key) {
    return key in unsupportedEasingFunctions;
  }
  function replaceStringEasing(transition) {
    if (typeof transition.ease === "string" && isUnsupportedEase(transition.ease)) {
      transition.ease = unsupportedEasingFunctions[transition.ease];
    }
  }

  // node_modules/motion-dom/dist/es/animation/NativeAnimationExtended.mjs
  var sampleDelta = 10;
  var NativeAnimationExtended = class extends NativeAnimation {
    constructor(options) {
      replaceStringEasing(options);
      replaceTransitionType(options);
      super(options);
      if (options.startTime !== void 0 && options.autoplay !== false) {
        this.startTime = options.startTime;
      }
      this.options = options;
    }
    /**
     * WAAPI doesn't natively have any interruption capabilities.
     *
     * Rather than read committed styles back out of the DOM, we can
     * create a renderless JS animation and sample it twice to calculate
     * its current value, "previous" value, and therefore allow
     * Motion to calculate velocity for any subsequent animation.
     */
    updateMotionValue(value) {
      const { motionValue: motionValue2, onUpdate, onComplete, element, ...options } = this.options;
      if (!motionValue2)
        return;
      if (value !== void 0) {
        motionValue2.set(value);
        return;
      }
      const sampleAnimation = new JSAnimation({
        ...options,
        autoplay: false
      });
      const sampleTime = Math.max(sampleDelta, time.now() - this.startTime);
      const delta = clamp(0, sampleDelta, sampleTime - sampleDelta);
      const current = sampleAnimation.sample(sampleTime).value;
      const { name } = this.options;
      if (element && name)
        setStyle(element, name, current);
      motionValue2.setWithVelocity(sampleAnimation.sample(Math.max(0, sampleTime - delta)).value, current, delta);
      sampleAnimation.stop();
    }
  };

  // node_modules/motion-dom/dist/es/animation/utils/is-animatable.mjs
  var isAnimatable = (value, name) => {
    if (name === "zIndex")
      return false;
    if (typeof value === "number" || Array.isArray(value))
      return true;
    if (typeof value === "string" && // It's animatable if we have a string
    (complex.test(value) || value === "0") && // And it contains numbers and/or colors
    !value.startsWith("url(")) {
      return true;
    }
    return false;
  };

  // node_modules/motion-dom/dist/es/animation/utils/can-animate.mjs
  function hasKeyframesChanged(keyframes2) {
    const current = keyframes2[0];
    if (keyframes2.length === 1)
      return true;
    for (let i2 = 0; i2 < keyframes2.length; i2++) {
      if (keyframes2[i2] !== current)
        return true;
    }
  }
  function canAnimate(keyframes2, name, type, velocity) {
    const originKeyframe = keyframes2[0];
    if (originKeyframe === null) {
      return false;
    }
    if (name === "display" || name === "visibility")
      return true;
    const targetKeyframe = keyframes2[keyframes2.length - 1];
    const isOriginAnimatable = isAnimatable(originKeyframe, name);
    const isTargetAnimatable = isAnimatable(targetKeyframe, name);
    warning(isOriginAnimatable === isTargetAnimatable, `You are trying to animate ${name} from "${originKeyframe}" to "${targetKeyframe}". "${isOriginAnimatable ? targetKeyframe : originKeyframe}" is not an animatable value.`, "value-not-animatable");
    if (!isOriginAnimatable || !isTargetAnimatable) {
      return false;
    }
    return hasKeyframesChanged(keyframes2) || (type === "spring" || isGenerator(type)) && velocity;
  }

  // node_modules/motion-dom/dist/es/animation/utils/make-animation-instant.mjs
  function makeAnimationInstant(options) {
    options.duration = 0;
    options.type = "keyframes";
  }

  // node_modules/motion-dom/dist/es/animation/waapi/utils/accelerated-values.mjs
  var acceleratedValues = /* @__PURE__ */ new Set([
    "opacity",
    "clipPath",
    "filter",
    "transform"
    // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
    // or until we implement support for linear() easing.
    // "background-color"
  ]);

  // node_modules/motion-dom/dist/es/animation/waapi/utils/is-browser-color.mjs
  var browserColorFunctions = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
  function hasBrowserOnlyColors(keyframes2) {
    for (let i2 = 0; i2 < keyframes2.length; i2++) {
      if (typeof keyframes2[i2] === "string" && browserColorFunctions.test(keyframes2[i2])) {
        return true;
      }
    }
    return false;
  }

  // node_modules/motion-dom/dist/es/animation/waapi/supports/waapi.mjs
  var colorProperties = /* @__PURE__ */ new Set([
    "color",
    "backgroundColor",
    "outlineColor",
    "fill",
    "stroke",
    "borderColor",
    "borderTopColor",
    "borderRightColor",
    "borderBottomColor",
    "borderLeftColor"
  ]);
  var supportsWaapi = /* @__PURE__ */ memo(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
  function supportsBrowserAnimation(options) {
    const { motionValue: motionValue2, name, repeatDelay, repeatType, damping, type, keyframes: keyframes2 } = options;
    const subject = motionValue2?.owner?.current;
    if (!(subject instanceof HTMLElement)) {
      return false;
    }
    const { onUpdate, transformTemplate } = motionValue2.owner.getProps();
    return supportsWaapi() && name && /**
     * Force WAAPI for color properties with browser-only color formats
     * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
     */
    (acceleratedValues.has(name) || colorProperties.has(name) && hasBrowserOnlyColors(keyframes2)) && (name !== "transform" || !transformTemplate) && /**
     * If we're outputting values to onUpdate then we can't use WAAPI as there's
     * no way to read the value from WAAPI every frame.
     */
    !onUpdate && !repeatDelay && repeatType !== "mirror" && damping !== 0 && type !== "inertia";
  }

  // node_modules/motion-dom/dist/es/animation/AsyncMotionValueAnimation.mjs
  var MAX_RESOLVE_DELAY = 40;
  var AsyncMotionValueAnimation = class extends WithPromise {
    constructor({ autoplay = true, delay = 0, type = "keyframes", repeat = 0, repeatDelay = 0, repeatType = "loop", keyframes: keyframes2, name, motionValue: motionValue2, element, ...options }) {
      super();
      this.stop = () => {
        if (this._animation) {
          this._animation.stop();
          this.stopTimeline?.();
        }
        this.keyframeResolver?.cancel();
      };
      this.createdAt = time.now();
      const optionsWithDefaults = {
        autoplay,
        delay,
        type,
        repeat,
        repeatDelay,
        repeatType,
        name,
        motionValue: motionValue2,
        element,
        ...options
      };
      const KeyframeResolver$1 = element?.KeyframeResolver || KeyframeResolver;
      this.keyframeResolver = new KeyframeResolver$1(keyframes2, (resolvedKeyframes, finalKeyframe, forced) => this.onKeyframesResolved(resolvedKeyframes, finalKeyframe, optionsWithDefaults, !forced), name, motionValue2, element);
      this.keyframeResolver?.scheduleResolve();
    }
    onKeyframesResolved(keyframes2, finalKeyframe, options, sync) {
      this.keyframeResolver = void 0;
      const { name, type, velocity, delay, isHandoff, onUpdate } = options;
      this.resolvedAt = time.now();
      let canAnimateValue = true;
      if (!canAnimate(keyframes2, name, type, velocity)) {
        canAnimateValue = false;
        if (MotionGlobalConfig.instantAnimations || !delay) {
          onUpdate?.(getFinalKeyframe(keyframes2, options, finalKeyframe));
        }
        keyframes2[0] = keyframes2[keyframes2.length - 1];
        makeAnimationInstant(options);
        options.repeat = 0;
      }
      const startTime = sync ? !this.resolvedAt ? this.createdAt : this.resolvedAt - this.createdAt > MAX_RESOLVE_DELAY ? this.resolvedAt : this.createdAt : void 0;
      const resolvedOptions = {
        startTime,
        finalKeyframe,
        ...options,
        keyframes: keyframes2
      };
      const useWaapi = canAnimateValue && !isHandoff && supportsBrowserAnimation(resolvedOptions);
      const element = resolvedOptions.motionValue?.owner?.current;
      let animation;
      if (useWaapi) {
        try {
          animation = new NativeAnimationExtended({
            ...resolvedOptions,
            element
          });
        } catch {
          animation = new JSAnimation(resolvedOptions);
        }
      } else {
        animation = new JSAnimation(resolvedOptions);
      }
      animation.finished.then(() => {
        this.notifyFinished();
      }).catch(noop);
      if (this.pendingTimeline) {
        this.stopTimeline = animation.attachTimeline(this.pendingTimeline);
        this.pendingTimeline = void 0;
      }
      this._animation = animation;
    }
    get finished() {
      if (!this._animation) {
        return this._finished;
      } else {
        return this.animation.finished;
      }
    }
    then(onResolve, _onReject) {
      return this.finished.finally(onResolve).then(() => {
      });
    }
    get animation() {
      if (!this._animation) {
        this.keyframeResolver?.resume();
        flushKeyframeResolvers();
      }
      return this._animation;
    }
    get duration() {
      return this.animation.duration;
    }
    get iterationDuration() {
      return this.animation.iterationDuration;
    }
    get time() {
      return this.animation.time;
    }
    set time(newTime) {
      this.animation.time = newTime;
    }
    get speed() {
      return this.animation.speed;
    }
    get state() {
      return this.animation.state;
    }
    set speed(newSpeed) {
      this.animation.speed = newSpeed;
    }
    get startTime() {
      return this.animation.startTime;
    }
    attachTimeline(timeline) {
      if (this._animation) {
        this.stopTimeline = this.animation.attachTimeline(timeline);
      } else {
        this.pendingTimeline = timeline;
      }
      return () => this.stop();
    }
    play() {
      this.animation.play();
    }
    pause() {
      this.animation.pause();
    }
    complete() {
      this.animation.complete();
    }
    cancel() {
      if (this._animation) {
        this.animation.cancel();
      }
      this.keyframeResolver?.cancel();
    }
  };

  // node_modules/motion-dom/dist/es/animation/GroupAnimation.mjs
  var GroupAnimation = class {
    constructor(animations) {
      this.stop = () => this.runAll("stop");
      this.animations = animations.filter(Boolean);
    }
    get finished() {
      return Promise.all(this.animations.map((animation) => animation.finished));
    }
    /**
     * TODO: Filter out cancelled or stopped animations before returning
     */
    getAll(propName) {
      return this.animations[0][propName];
    }
    setAll(propName, newValue) {
      for (let i2 = 0; i2 < this.animations.length; i2++) {
        this.animations[i2][propName] = newValue;
      }
    }
    attachTimeline(timeline) {
      const subscriptions = this.animations.map((animation) => animation.attachTimeline(timeline));
      return () => {
        subscriptions.forEach((cancel, i2) => {
          cancel && cancel();
          this.animations[i2].stop();
        });
      };
    }
    get time() {
      return this.getAll("time");
    }
    set time(time2) {
      this.setAll("time", time2);
    }
    get speed() {
      return this.getAll("speed");
    }
    set speed(speed) {
      this.setAll("speed", speed);
    }
    get state() {
      return this.getAll("state");
    }
    get startTime() {
      return this.getAll("startTime");
    }
    get duration() {
      return getMax(this.animations, "duration");
    }
    get iterationDuration() {
      return getMax(this.animations, "iterationDuration");
    }
    runAll(methodName) {
      this.animations.forEach((controls) => controls[methodName]());
    }
    play() {
      this.runAll("play");
    }
    pause() {
      this.runAll("pause");
    }
    cancel() {
      this.runAll("cancel");
    }
    complete() {
      this.runAll("complete");
    }
  };
  function getMax(animations, propName) {
    let max = 0;
    for (let i2 = 0; i2 < animations.length; i2++) {
      const value = animations[i2][propName];
      if (value !== null && value > max) {
        max = value;
      }
    }
    return max;
  }

  // node_modules/motion-dom/dist/es/animation/GroupAnimationWithThen.mjs
  var GroupAnimationWithThen = class extends GroupAnimation {
    then(onResolve, _onReject) {
      return this.finished.finally(onResolve).then(() => {
      });
    }
  };

  // node_modules/motion-dom/dist/es/animation/utils/css-variables-conversion.mjs
  var splitCSSVariableRegex = (
    // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
    /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
  );
  function parseCSSVariable(current) {
    const match = splitCSSVariableRegex.exec(current);
    if (!match)
      return [,];
    const [, token1, token2, fallback] = match;
    return [`--${token1 ?? token2}`, fallback];
  }
  var maxDepth = 4;
  function getVariableValue(current, element, depth = 1) {
    invariant(depth <= maxDepth, `Max CSS variable fallback depth detected in property "${current}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
    const [token, fallback] = parseCSSVariable(current);
    if (!token)
      return;
    const resolved = window.getComputedStyle(element).getPropertyValue(token);
    if (resolved) {
      const trimmed = resolved.trim();
      return isNumericalString(trimmed) ? parseFloat(trimmed) : trimmed;
    }
    return isCSSVariableToken(fallback) ? getVariableValue(fallback, element, depth + 1) : fallback;
  }

  // node_modules/motion-dom/dist/es/animation/utils/default-transitions.mjs
  var underDampedSpring = {
    type: "spring",
    stiffness: 500,
    damping: 25,
    restSpeed: 10
  };
  var criticallyDampedSpring = (target) => ({
    type: "spring",
    stiffness: 550,
    damping: target === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10
  });
  var keyframesTransition = {
    type: "keyframes",
    duration: 0.8
  };
  var ease = {
    type: "keyframes",
    ease: [0.25, 0.1, 0.35, 1],
    duration: 0.3
  };
  var getDefaultTransition = (valueKey, { keyframes: keyframes2 }) => {
    if (keyframes2.length > 2) {
      return keyframesTransition;
    } else if (transformProps.has(valueKey)) {
      return valueKey.startsWith("scale") ? criticallyDampedSpring(keyframes2[1]) : underDampedSpring;
    }
    return ease;
  };

  // node_modules/motion-dom/dist/es/animation/utils/resolve-transition.mjs
  function resolveTransition(transition, parentTransition) {
    if (transition?.inherit && parentTransition) {
      const { inherit: _2, ...rest } = transition;
      return { ...parentTransition, ...rest };
    }
    return transition;
  }

  // node_modules/motion-dom/dist/es/animation/utils/get-value-transition.mjs
  function getValueTransition(transition, key) {
    const valueTransition = transition?.[key] ?? transition?.["default"] ?? transition;
    if (valueTransition !== transition) {
      return resolveTransition(valueTransition, transition);
    }
    return valueTransition;
  }

  // node_modules/motion-dom/dist/es/animation/utils/is-transition-defined.mjs
  var orchestrationKeys = /* @__PURE__ */ new Set([
    "when",
    "delay",
    "delayChildren",
    "staggerChildren",
    "staggerDirection",
    "repeat",
    "repeatType",
    "repeatDelay",
    "from",
    "elapsed"
  ]);
  function isTransitionDefined(transition) {
    for (const key in transition) {
      if (!orchestrationKeys.has(key))
        return true;
    }
    return false;
  }

  // node_modules/motion-dom/dist/es/animation/interfaces/motion-value.mjs
  var animateMotionValue = (name, value, target, transition = {}, element, isHandoff) => (onComplete) => {
    const valueTransition = getValueTransition(transition, name) || {};
    const delay = valueTransition.delay || transition.delay || 0;
    let { elapsed = 0 } = transition;
    elapsed = elapsed - secondsToMilliseconds(delay);
    const options = {
      keyframes: Array.isArray(target) ? target : [null, target],
      ease: "easeOut",
      velocity: value.getVelocity(),
      ...valueTransition,
      delay: -elapsed,
      onUpdate: (v2) => {
        value.set(v2);
        valueTransition.onUpdate && valueTransition.onUpdate(v2);
      },
      onComplete: () => {
        onComplete();
        valueTransition.onComplete && valueTransition.onComplete();
      },
      name,
      motionValue: value,
      element: isHandoff ? void 0 : element
    };
    if (!isTransitionDefined(valueTransition)) {
      Object.assign(options, getDefaultTransition(name, options));
    }
    options.duration && (options.duration = secondsToMilliseconds(options.duration));
    options.repeatDelay && (options.repeatDelay = secondsToMilliseconds(options.repeatDelay));
    if (options.from !== void 0) {
      options.keyframes[0] = options.from;
    }
    let shouldSkip = false;
    if (options.type === false || options.duration === 0 && !options.repeatDelay) {
      makeAnimationInstant(options);
      if (options.delay === 0) {
        shouldSkip = true;
      }
    }
    if (MotionGlobalConfig.instantAnimations || MotionGlobalConfig.skipAnimations || element?.shouldSkipAnimations) {
      shouldSkip = true;
      makeAnimationInstant(options);
      options.delay = 0;
    }
    options.allowFlatten = !valueTransition.type && !valueTransition.ease;
    if (shouldSkip && !isHandoff && value.get() !== void 0) {
      const finalKeyframe = getFinalKeyframe(options.keyframes, valueTransition);
      if (finalKeyframe !== void 0) {
        frame.update(() => {
          options.onUpdate(finalKeyframe);
          options.onComplete();
        });
        return;
      }
    }
    return valueTransition.isSync ? new JSAnimation(options) : new AsyncMotionValueAnimation(options);
  };

  // node_modules/motion-dom/dist/es/render/utils/resolve-variants.mjs
  function getValueState(visualElement) {
    const state = [{}, {}];
    visualElement?.values.forEach((value, key) => {
      state[0][key] = value.get();
      state[1][key] = value.getVelocity();
    });
    return state;
  }
  function resolveVariantFromProps(props, definition, custom, visualElement) {
    if (typeof definition === "function") {
      const [current, velocity] = getValueState(visualElement);
      definition = definition(custom !== void 0 ? custom : props.custom, current, velocity);
    }
    if (typeof definition === "string") {
      definition = props.variants && props.variants[definition];
    }
    if (typeof definition === "function") {
      const [current, velocity] = getValueState(visualElement);
      definition = definition(custom !== void 0 ? custom : props.custom, current, velocity);
    }
    return definition;
  }

  // node_modules/motion-dom/dist/es/render/utils/resolve-dynamic-variants.mjs
  function resolveVariant(visualElement, definition, custom) {
    const props = visualElement.getProps();
    return resolveVariantFromProps(props, definition, custom !== void 0 ? custom : props.custom, visualElement);
  }

  // node_modules/motion-dom/dist/es/render/utils/keys-position.mjs
  var positionalKeys = /* @__PURE__ */ new Set([
    "width",
    "height",
    "top",
    "left",
    "right",
    "bottom",
    ...transformPropOrder
  ]);

  // node_modules/motion-dom/dist/es/value/index.mjs
  var MAX_VELOCITY_DELTA = 30;
  var isFloat = (value) => {
    return !isNaN(parseFloat(value));
  };
  var collectMotionValues = {
    current: void 0
  };
  var MotionValue = class {
    /**
     * @param init - The initiating value
     * @param config - Optional configuration options
     *
     * -  `transformer`: A function to transform incoming values with.
     */
    constructor(init, options = {}) {
      this.canTrackVelocity = null;
      this.events = {};
      this.updateAndNotify = (v2) => {
        const currentTime = time.now();
        if (this.updatedAt !== currentTime) {
          this.setPrevFrameValue();
        }
        this.prev = this.current;
        this.setCurrent(v2);
        if (this.current !== this.prev) {
          this.events.change?.notify(this.current);
          if (this.dependents) {
            for (const dependent of this.dependents) {
              dependent.dirty();
            }
          }
        }
      };
      this.hasAnimated = false;
      this.setCurrent(init);
      this.owner = options.owner;
    }
    setCurrent(current) {
      this.current = current;
      this.updatedAt = time.now();
      if (this.canTrackVelocity === null && current !== void 0) {
        this.canTrackVelocity = isFloat(this.current);
      }
    }
    setPrevFrameValue(prevFrameValue = this.current) {
      this.prevFrameValue = prevFrameValue;
      this.prevUpdatedAt = this.updatedAt;
    }
    /**
     * Adds a function that will be notified when the `MotionValue` is updated.
     *
     * It returns a function that, when called, will cancel the subscription.
     *
     * When calling `onChange` inside a React component, it should be wrapped with the
     * `useEffect` hook. As it returns an unsubscribe function, this should be returned
     * from the `useEffect` function to ensure you don't add duplicate subscribers..
     *
     * ```jsx
     * export const MyComponent = () => {
     *   const x = useMotionValue(0)
     *   const y = useMotionValue(0)
     *   const opacity = useMotionValue(1)
     *
     *   useEffect(() => {
     *     function updateOpacity() {
     *       const maxXY = Math.max(x.get(), y.get())
     *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
     *       opacity.set(newOpacity)
     *     }
     *
     *     const unsubscribeX = x.on("change", updateOpacity)
     *     const unsubscribeY = y.on("change", updateOpacity)
     *
     *     return () => {
     *       unsubscribeX()
     *       unsubscribeY()
     *     }
     *   }, [])
     *
     *   return <motion.div style={{ x }} />
     * }
     * ```
     *
     * @param subscriber - A function that receives the latest value.
     * @returns A function that, when called, will cancel this subscription.
     *
     * @deprecated
     */
    onChange(subscription) {
      if (true) {
        warnOnce(false, `value.onChange(callback) is deprecated. Switch to value.on("change", callback).`);
      }
      return this.on("change", subscription);
    }
    on(eventName, callback) {
      if (!this.events[eventName]) {
        this.events[eventName] = new SubscriptionManager();
      }
      const unsubscribe = this.events[eventName].add(callback);
      if (eventName === "change") {
        return () => {
          unsubscribe();
          frame.read(() => {
            if (!this.events.change.getSize()) {
              this.stop();
            }
          });
        };
      }
      return unsubscribe;
    }
    clearListeners() {
      for (const eventManagers in this.events) {
        this.events[eventManagers].clear();
      }
    }
    /**
     * Attaches a passive effect to the `MotionValue`.
     */
    attach(passiveEffect, stopPassiveEffect) {
      this.passiveEffect = passiveEffect;
      this.stopPassiveEffect = stopPassiveEffect;
    }
    /**
     * Sets the state of the `MotionValue`.
     *
     * @remarks
     *
     * ```jsx
     * const x = useMotionValue(0)
     * x.set(10)
     * ```
     *
     * @param latest - Latest value to set.
     * @param render - Whether to notify render subscribers. Defaults to `true`
     *
     * @public
     */
    set(v2) {
      if (!this.passiveEffect) {
        this.updateAndNotify(v2);
      } else {
        this.passiveEffect(v2, this.updateAndNotify);
      }
    }
    setWithVelocity(prev, current, delta) {
      this.set(current);
      this.prev = void 0;
      this.prevFrameValue = prev;
      this.prevUpdatedAt = this.updatedAt - delta;
    }
    /**
     * Set the state of the `MotionValue`, stopping any active animations,
     * effects, and resets velocity to `0`.
     */
    jump(v2, endAnimation = true) {
      this.updateAndNotify(v2);
      this.prev = v2;
      this.prevUpdatedAt = this.prevFrameValue = void 0;
      endAnimation && this.stop();
      if (this.stopPassiveEffect)
        this.stopPassiveEffect();
    }
    dirty() {
      this.events.change?.notify(this.current);
    }
    addDependent(dependent) {
      if (!this.dependents) {
        this.dependents = /* @__PURE__ */ new Set();
      }
      this.dependents.add(dependent);
    }
    removeDependent(dependent) {
      if (this.dependents) {
        this.dependents.delete(dependent);
      }
    }
    /**
     * Returns the latest state of `MotionValue`
     *
     * @returns - The latest state of `MotionValue`
     *
     * @public
     */
    get() {
      if (collectMotionValues.current) {
        collectMotionValues.current.push(this);
      }
      return this.current;
    }
    /**
     * @public
     */
    getPrevious() {
      return this.prev;
    }
    /**
     * Returns the latest velocity of `MotionValue`
     *
     * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
     *
     * @public
     */
    getVelocity() {
      const currentTime = time.now();
      if (!this.canTrackVelocity || this.prevFrameValue === void 0 || currentTime - this.updatedAt > MAX_VELOCITY_DELTA) {
        return 0;
      }
      const delta = Math.min(this.updatedAt - this.prevUpdatedAt, MAX_VELOCITY_DELTA);
      return velocityPerSecond(parseFloat(this.current) - parseFloat(this.prevFrameValue), delta);
    }
    /**
     * Registers a new animation to control this `MotionValue`. Only one
     * animation can drive a `MotionValue` at one time.
     *
     * ```jsx
     * value.start()
     * ```
     *
     * @param animation - A function that starts the provided animation
     */
    start(startAnimation) {
      this.stop();
      return new Promise((resolve) => {
        this.hasAnimated = true;
        this.animation = startAnimation(resolve);
        if (this.events.animationStart) {
          this.events.animationStart.notify();
        }
      }).then(() => {
        if (this.events.animationComplete) {
          this.events.animationComplete.notify();
        }
        this.clearAnimation();
      });
    }
    /**
     * Stop the currently active animation.
     *
     * @public
     */
    stop() {
      if (this.animation) {
        this.animation.stop();
        if (this.events.animationCancel) {
          this.events.animationCancel.notify();
        }
      }
      this.clearAnimation();
    }
    /**
     * Returns `true` if this value is currently animating.
     *
     * @public
     */
    isAnimating() {
      return !!this.animation;
    }
    clearAnimation() {
      delete this.animation;
    }
    /**
     * Destroy and clean up subscribers to this `MotionValue`.
     *
     * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
     * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
     * created a `MotionValue` via the `motionValue` function.
     *
     * @public
     */
    destroy() {
      this.dependents?.clear();
      this.events.destroy?.notify();
      this.clearListeners();
      this.stop();
      if (this.stopPassiveEffect) {
        this.stopPassiveEffect();
      }
    }
  };
  function motionValue(init, options) {
    return new MotionValue(init, options);
  }

  // node_modules/motion-dom/dist/es/render/utils/is-keyframes-target.mjs
  var isKeyframesTarget = (v2) => {
    return Array.isArray(v2);
  };

  // node_modules/motion-dom/dist/es/render/utils/setters.mjs
  function setMotionValue(visualElement, key, value) {
    if (visualElement.hasValue(key)) {
      visualElement.getValue(key).set(value);
    } else {
      visualElement.addValue(key, motionValue(value));
    }
  }
  function resolveFinalValueInKeyframes(v2) {
    return isKeyframesTarget(v2) ? v2[v2.length - 1] || 0 : v2;
  }
  function setTarget(visualElement, definition) {
    const resolved = resolveVariant(visualElement, definition);
    let { transitionEnd = {}, transition = {}, ...target } = resolved || {};
    target = { ...target, ...transitionEnd };
    for (const key in target) {
      const value = resolveFinalValueInKeyframes(target[key]);
      setMotionValue(visualElement, key, value);
    }
  }

  // node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs
  var isMotionValue = (value) => Boolean(value && value.getVelocity);

  // node_modules/motion-dom/dist/es/value/will-change/is.mjs
  function isWillChangeMotionValue(value) {
    return Boolean(isMotionValue(value) && value.add);
  }

  // node_modules/motion-dom/dist/es/value/will-change/add-will-change.mjs
  function addValueToWillChange(visualElement, key) {
    const willChange = visualElement.getValue("willChange");
    if (isWillChangeMotionValue(willChange)) {
      return willChange.add(key);
    } else if (!willChange && MotionGlobalConfig.WillChange) {
      const newWillChange = new MotionGlobalConfig.WillChange("auto");
      visualElement.addValue("willChange", newWillChange);
      newWillChange.add(key);
    }
  }

  // node_modules/motion-dom/dist/es/render/dom/utils/camel-to-dash.mjs
  function camelToDash(str) {
    return str.replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`);
  }

  // node_modules/motion-dom/dist/es/animation/optimized-appear/data-id.mjs
  var optimizedAppearDataId = "framerAppearId";
  var optimizedAppearDataAttribute = "data-" + camelToDash(optimizedAppearDataId);

  // node_modules/motion-dom/dist/es/animation/optimized-appear/get-appear-id.mjs
  function getOptimisedAppearId(visualElement) {
    return visualElement.props[optimizedAppearDataAttribute];
  }

  // node_modules/motion-dom/dist/es/animation/interfaces/visual-element-target.mjs
  function shouldBlockAnimation({ protectedKeys, needsAnimating }, key) {
    const shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;
    needsAnimating[key] = false;
    return shouldBlock;
  }
  function animateTarget(visualElement, targetAndTransition, { delay = 0, transitionOverride, type } = {}) {
    let { transition, transitionEnd, ...target } = targetAndTransition;
    const defaultTransition = visualElement.getDefaultTransition();
    transition = transition ? resolveTransition(transition, defaultTransition) : defaultTransition;
    const reduceMotion = transition?.reduceMotion;
    if (transitionOverride)
      transition = transitionOverride;
    const animations = [];
    const animationTypeState = type && visualElement.animationState && visualElement.animationState.getState()[type];
    for (const key in target) {
      const value = visualElement.getValue(key, visualElement.latestValues[key] ?? null);
      const valueTarget = target[key];
      if (valueTarget === void 0 || animationTypeState && shouldBlockAnimation(animationTypeState, key)) {
        continue;
      }
      const valueTransition = {
        delay,
        ...getValueTransition(transition || {}, key)
      };
      const currentValue = value.get();
      if (currentValue !== void 0 && !value.isAnimating() && !Array.isArray(valueTarget) && valueTarget === currentValue && !valueTransition.velocity) {
        frame.update(() => value.set(valueTarget));
        continue;
      }
      let isHandoff = false;
      if (window.MotionHandoffAnimation) {
        const appearId = getOptimisedAppearId(visualElement);
        if (appearId) {
          const startTime = window.MotionHandoffAnimation(appearId, key, frame);
          if (startTime !== null) {
            valueTransition.startTime = startTime;
            isHandoff = true;
          }
        }
      }
      addValueToWillChange(visualElement, key);
      const shouldReduceMotion = reduceMotion ?? visualElement.shouldReduceMotion;
      value.start(animateMotionValue(key, value, valueTarget, shouldReduceMotion && positionalKeys.has(key) ? { type: false } : valueTransition, visualElement, isHandoff));
      const animation = value.animation;
      if (animation) {
        animations.push(animation);
      }
    }
    if (transitionEnd) {
      const applyTransitionEnd = () => frame.update(() => {
        transitionEnd && setTarget(visualElement, transitionEnd);
      });
      if (animations.length) {
        Promise.all(animations).then(applyTransitionEnd);
      } else {
        applyTransitionEnd();
      }
    }
    return animations;
  }

  // node_modules/motion-dom/dist/es/value/types/auto.mjs
  var auto = {
    test: (v2) => v2 === "auto",
    parse: (v2) => v2
  };

  // node_modules/motion-dom/dist/es/value/types/test.mjs
  var testValueType = (v2) => (type) => type.test(v2);

  // node_modules/motion-dom/dist/es/value/types/dimensions.mjs
  var dimensionValueTypes = [number, px, percent, degrees, vw, vh, auto];
  var findDimensionValueType = (v2) => dimensionValueTypes.find(testValueType(v2));

  // node_modules/motion-dom/dist/es/animation/keyframes/utils/is-none.mjs
  function isNone(value) {
    if (typeof value === "number") {
      return value === 0;
    } else if (value !== null) {
      return value === "none" || value === "0" || isZeroValueString(value);
    } else {
      return true;
    }
  }

  // node_modules/motion-dom/dist/es/value/types/complex/filter.mjs
  var maxDefaults = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
  function applyDefaultFilter(v2) {
    const [name, value] = v2.slice(0, -1).split("(");
    if (name === "drop-shadow")
      return v2;
    const [number2] = value.match(floatRegex) || [];
    if (!number2)
      return v2;
    const unit = value.replace(number2, "");
    let defaultValue = maxDefaults.has(name) ? 1 : 0;
    if (number2 !== value)
      defaultValue *= 100;
    return name + "(" + defaultValue + unit + ")";
  }
  var functionRegex = /\b([a-z-]*)\(.*?\)/gu;
  var filter = {
    ...complex,
    getAnimatableNone: (v2) => {
      const functions2 = v2.match(functionRegex);
      return functions2 ? functions2.map(applyDefaultFilter).join(" ") : v2;
    }
  };

  // node_modules/motion-dom/dist/es/value/types/complex/mask.mjs
  var mask = {
    ...complex,
    getAnimatableNone: (v2) => {
      const parsed = complex.parse(v2);
      const transformer = complex.createTransformer(v2);
      return transformer(parsed.map((v3) => typeof v3 === "number" ? 0 : typeof v3 === "object" ? { ...v3, alpha: 1 } : v3));
    }
  };

  // node_modules/motion-dom/dist/es/value/types/int.mjs
  var int = {
    ...number,
    transform: Math.round
  };

  // node_modules/motion-dom/dist/es/value/types/maps/transform.mjs
  var transformValueTypes = {
    rotate: degrees,
    rotateX: degrees,
    rotateY: degrees,
    rotateZ: degrees,
    scale,
    scaleX: scale,
    scaleY: scale,
    scaleZ: scale,
    skew: degrees,
    skewX: degrees,
    skewY: degrees,
    distance: px,
    translateX: px,
    translateY: px,
    translateZ: px,
    x: px,
    y: px,
    z: px,
    perspective: px,
    transformPerspective: px,
    opacity: alpha,
    originX: progressPercentage,
    originY: progressPercentage,
    originZ: px
  };

  // node_modules/motion-dom/dist/es/value/types/maps/number.mjs
  var numberValueTypes = {
    // Border props
    borderWidth: px,
    borderTopWidth: px,
    borderRightWidth: px,
    borderBottomWidth: px,
    borderLeftWidth: px,
    borderRadius: px,
    borderTopLeftRadius: px,
    borderTopRightRadius: px,
    borderBottomRightRadius: px,
    borderBottomLeftRadius: px,
    // Positioning props
    width: px,
    maxWidth: px,
    height: px,
    maxHeight: px,
    top: px,
    right: px,
    bottom: px,
    left: px,
    inset: px,
    insetBlock: px,
    insetBlockStart: px,
    insetBlockEnd: px,
    insetInline: px,
    insetInlineStart: px,
    insetInlineEnd: px,
    // Spacing props
    padding: px,
    paddingTop: px,
    paddingRight: px,
    paddingBottom: px,
    paddingLeft: px,
    paddingBlock: px,
    paddingBlockStart: px,
    paddingBlockEnd: px,
    paddingInline: px,
    paddingInlineStart: px,
    paddingInlineEnd: px,
    margin: px,
    marginTop: px,
    marginRight: px,
    marginBottom: px,
    marginLeft: px,
    marginBlock: px,
    marginBlockStart: px,
    marginBlockEnd: px,
    marginInline: px,
    marginInlineStart: px,
    marginInlineEnd: px,
    // Typography
    fontSize: px,
    // Misc
    backgroundPositionX: px,
    backgroundPositionY: px,
    ...transformValueTypes,
    zIndex: int,
    // SVG
    fillOpacity: alpha,
    strokeOpacity: alpha,
    numOctaves: int
  };

  // node_modules/motion-dom/dist/es/value/types/maps/defaults.mjs
  var defaultValueTypes = {
    ...numberValueTypes,
    // Color props
    color,
    backgroundColor: color,
    outlineColor: color,
    fill: color,
    stroke: color,
    // Border props
    borderColor: color,
    borderTopColor: color,
    borderRightColor: color,
    borderBottomColor: color,
    borderLeftColor: color,
    filter,
    WebkitFilter: filter,
    mask,
    WebkitMask: mask
  };
  var getDefaultValueType = (key) => defaultValueTypes[key];

  // node_modules/motion-dom/dist/es/value/types/utils/animatable-none.mjs
  var customTypes = /* @__PURE__ */ new Set([filter, mask]);
  function getAnimatableNone2(key, value) {
    let defaultValueType = getDefaultValueType(key);
    if (!customTypes.has(defaultValueType))
      defaultValueType = complex;
    return defaultValueType.getAnimatableNone ? defaultValueType.getAnimatableNone(value) : void 0;
  }

  // node_modules/motion-dom/dist/es/animation/keyframes/utils/make-none-animatable.mjs
  var invalidTemplates = /* @__PURE__ */ new Set(["auto", "none", "0"]);
  function makeNoneKeyframesAnimatable(unresolvedKeyframes, noneKeyframeIndexes, name) {
    let i2 = 0;
    let animatableTemplate = void 0;
    while (i2 < unresolvedKeyframes.length && !animatableTemplate) {
      const keyframe = unresolvedKeyframes[i2];
      if (typeof keyframe === "string" && !invalidTemplates.has(keyframe) && analyseComplexValue(keyframe).values.length) {
        animatableTemplate = unresolvedKeyframes[i2];
      }
      i2++;
    }
    if (animatableTemplate && name) {
      for (const noneIndex of noneKeyframeIndexes) {
        unresolvedKeyframes[noneIndex] = getAnimatableNone2(name, animatableTemplate);
      }
    }
  }

  // node_modules/motion-dom/dist/es/animation/keyframes/DOMKeyframesResolver.mjs
  var DOMKeyframesResolver = class extends KeyframeResolver {
    constructor(unresolvedKeyframes, onComplete, name, motionValue2, element) {
      super(unresolvedKeyframes, onComplete, name, motionValue2, element, true);
    }
    readKeyframes() {
      const { unresolvedKeyframes, element, name } = this;
      if (!element || !element.current)
        return;
      super.readKeyframes();
      for (let i2 = 0; i2 < unresolvedKeyframes.length; i2++) {
        let keyframe = unresolvedKeyframes[i2];
        if (typeof keyframe === "string") {
          keyframe = keyframe.trim();
          if (isCSSVariableToken(keyframe)) {
            const resolved = getVariableValue(keyframe, element.current);
            if (resolved !== void 0) {
              unresolvedKeyframes[i2] = resolved;
            }
            if (i2 === unresolvedKeyframes.length - 1) {
              this.finalKeyframe = keyframe;
            }
          }
        }
      }
      this.resolveNoneKeyframes();
      if (!positionalKeys.has(name) || unresolvedKeyframes.length !== 2) {
        return;
      }
      const [origin, target] = unresolvedKeyframes;
      const originType = findDimensionValueType(origin);
      const targetType = findDimensionValueType(target);
      const originHasVar = containsCSSVariable(origin);
      const targetHasVar = containsCSSVariable(target);
      if (originHasVar !== targetHasVar && positionalValues[name]) {
        this.needsMeasurement = true;
        return;
      }
      if (originType === targetType)
        return;
      if (isNumOrPxType(originType) && isNumOrPxType(targetType)) {
        for (let i2 = 0; i2 < unresolvedKeyframes.length; i2++) {
          const value = unresolvedKeyframes[i2];
          if (typeof value === "string") {
            unresolvedKeyframes[i2] = parseFloat(value);
          }
        }
      } else if (positionalValues[name]) {
        this.needsMeasurement = true;
      }
    }
    resolveNoneKeyframes() {
      const { unresolvedKeyframes, name } = this;
      const noneKeyframeIndexes = [];
      for (let i2 = 0; i2 < unresolvedKeyframes.length; i2++) {
        if (unresolvedKeyframes[i2] === null || isNone(unresolvedKeyframes[i2])) {
          noneKeyframeIndexes.push(i2);
        }
      }
      if (noneKeyframeIndexes.length) {
        makeNoneKeyframesAnimatable(unresolvedKeyframes, noneKeyframeIndexes, name);
      }
    }
    measureInitialState() {
      const { element, unresolvedKeyframes, name } = this;
      if (!element || !element.current)
        return;
      if (name === "height") {
        this.suspendedScrollY = window.pageYOffset;
      }
      this.measuredOrigin = positionalValues[name](element.measureViewportBox(), window.getComputedStyle(element.current));
      unresolvedKeyframes[0] = this.measuredOrigin;
      const measureKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
      if (measureKeyframe !== void 0) {
        element.getValue(name, measureKeyframe).jump(measureKeyframe, false);
      }
    }
    measureEndState() {
      const { element, name, unresolvedKeyframes } = this;
      if (!element || !element.current)
        return;
      const value = element.getValue(name);
      value && value.jump(this.measuredOrigin, false);
      const finalKeyframeIndex = unresolvedKeyframes.length - 1;
      const finalKeyframe = unresolvedKeyframes[finalKeyframeIndex];
      unresolvedKeyframes[finalKeyframeIndex] = positionalValues[name](element.measureViewportBox(), window.getComputedStyle(element.current));
      if (finalKeyframe !== null && this.finalKeyframe === void 0) {
        this.finalKeyframe = finalKeyframe;
      }
      if (this.removedTransforms?.length) {
        this.removedTransforms.forEach(([unsetTransformName, unsetTransformValue]) => {
          element.getValue(unsetTransformName).set(unsetTransformValue);
        });
      }
      this.resolveNoneKeyframes();
    }
  };

  // node_modules/motion-dom/dist/es/utils/resolve-elements.mjs
  function resolveElements(elementOrSelector, scope, selectorCache) {
    if (elementOrSelector == null) {
      return [];
    }
    if (elementOrSelector instanceof EventTarget) {
      return [elementOrSelector];
    } else if (typeof elementOrSelector === "string") {
      let root = document;
      if (scope) {
        root = scope.current;
      }
      const elements = selectorCache?.[elementOrSelector] ?? root.querySelectorAll(elementOrSelector);
      return elements ? Array.from(elements) : [];
    }
    return Array.from(elementOrSelector).filter((element) => element != null);
  }

  // node_modules/motion-dom/dist/es/value/types/utils/get-as-type.mjs
  var getValueAsType = (value, type) => {
    return type && typeof value === "number" ? type.transform(value) : value;
  };

  // node_modules/motion-dom/dist/es/frameloop/microtask.mjs
  var { schedule: microtask, cancel: cancelMicrotask } = /* @__PURE__ */ createRenderBatcher(queueMicrotask, false);

  // node_modules/motion-dom/dist/es/gestures/drag/state/is-active.mjs
  var isDragging = {
    x: false,
    y: false
  };
  function isDragActive() {
    return isDragging.x || isDragging.y;
  }

  // node_modules/motion-dom/dist/es/gestures/utils/setup.mjs
  function setupGesture(elementOrSelector, options) {
    const elements = resolveElements(elementOrSelector);
    const gestureAbortController = new AbortController();
    const eventOptions = {
      passive: true,
      ...options,
      signal: gestureAbortController.signal
    };
    const cancel = () => gestureAbortController.abort();
    return [elements, eventOptions, cancel];
  }

  // node_modules/motion-dom/dist/es/gestures/hover.mjs
  function isValidHover(event) {
    return !(event.pointerType === "touch" || isDragActive());
  }
  function hover(elementOrSelector, onHoverStart, options = {}) {
    const [elements, eventOptions, cancel] = setupGesture(elementOrSelector, options);
    elements.forEach((element) => {
      let isPressed = false;
      let deferredHoverEnd = false;
      let hoverEndCallback;
      const removePointerLeave = () => {
        element.removeEventListener("pointerleave", onPointerLeave);
      };
      const endHover = (event) => {
        if (hoverEndCallback) {
          hoverEndCallback(event);
          hoverEndCallback = void 0;
        }
        removePointerLeave();
      };
      const onPointerUp = (event) => {
        isPressed = false;
        window.removeEventListener("pointerup", onPointerUp);
        window.removeEventListener("pointercancel", onPointerUp);
        if (deferredHoverEnd) {
          deferredHoverEnd = false;
          endHover(event);
        }
      };
      const onPointerDown = () => {
        isPressed = true;
        window.addEventListener("pointerup", onPointerUp, eventOptions);
        window.addEventListener("pointercancel", onPointerUp, eventOptions);
      };
      const onPointerLeave = (leaveEvent) => {
        if (leaveEvent.pointerType === "touch")
          return;
        if (isPressed) {
          deferredHoverEnd = true;
          return;
        }
        endHover(leaveEvent);
      };
      const onPointerEnter = (enterEvent) => {
        if (!isValidHover(enterEvent))
          return;
        deferredHoverEnd = false;
        const onHoverEnd = onHoverStart(element, enterEvent);
        if (typeof onHoverEnd !== "function")
          return;
        hoverEndCallback = onHoverEnd;
        element.addEventListener("pointerleave", onPointerLeave, eventOptions);
      };
      element.addEventListener("pointerenter", onPointerEnter, eventOptions);
      element.addEventListener("pointerdown", onPointerDown, eventOptions);
    });
    return cancel;
  }

  // node_modules/motion-dom/dist/es/utils/is-svg-element.mjs
  function isSVGElement(element) {
    return isObject(element) && "ownerSVGElement" in element;
  }

  // node_modules/motion-dom/dist/es/utils/is-svg-svg-element.mjs
  function isSVGSVGElement(element) {
    return isSVGElement(element) && element.tagName === "svg";
  }

  // node_modules/motion-dom/dist/es/utils/stagger.mjs
  function getOriginIndex(from, total) {
    if (from === "first") {
      return 0;
    } else {
      const lastIndex = total - 1;
      return from === "last" ? lastIndex : lastIndex / 2;
    }
  }
  function stagger(duration = 0.1, { startDelay = 0, from = 0, ease: ease2 } = {}) {
    return (i2, total) => {
      const fromIndex = typeof from === "number" ? from : getOriginIndex(from, total);
      const distance = Math.abs(fromIndex - i2);
      let delay = duration * distance;
      if (ease2) {
        const maxDelay = total * duration;
        const easingFunction = easingDefinitionToFunction(ease2);
        delay = easingFunction(delay / maxDelay) * maxDelay;
      }
      return startDelay + delay;
    };
  }

  // node_modules/motion-dom/dist/es/value/types/utils/find.mjs
  var valueTypes = [...dimensionValueTypes, color, complex];
  var findValueType = (v2) => valueTypes.find(testValueType(v2));

  // node_modules/motion-dom/dist/es/projection/geometry/models.mjs
  var createAxis = () => ({ min: 0, max: 0 });
  var createBox = () => ({
    x: createAxis(),
    y: createAxis()
  });

  // node_modules/motion-dom/dist/es/render/store.mjs
  var visualElementStore = /* @__PURE__ */ new WeakMap();

  // node_modules/motion-dom/dist/es/render/utils/is-animation-controls.mjs
  function isAnimationControls(v2) {
    return v2 !== null && typeof v2 === "object" && typeof v2.start === "function";
  }

  // node_modules/motion-dom/dist/es/render/utils/is-variant-label.mjs
  function isVariantLabel(v2) {
    return typeof v2 === "string" || Array.isArray(v2);
  }

  // node_modules/motion-dom/dist/es/render/utils/variant-props.mjs
  var variantPriorityOrder = [
    "animate",
    "whileInView",
    "whileFocus",
    "whileHover",
    "whileTap",
    "whileDrag",
    "exit"
  ];
  var variantProps = ["initial", ...variantPriorityOrder];

  // node_modules/motion-dom/dist/es/render/utils/is-controlling-variants.mjs
  function isControllingVariants(props) {
    return isAnimationControls(props.animate) || variantProps.some((name) => isVariantLabel(props[name]));
  }
  function isVariantNode(props) {
    return Boolean(isControllingVariants(props) || props.variants);
  }

  // node_modules/motion-dom/dist/es/render/utils/motion-values.mjs
  function updateMotionValuesFromProps(element, next, prev) {
    for (const key in next) {
      const nextValue = next[key];
      const prevValue = prev[key];
      if (isMotionValue(nextValue)) {
        element.addValue(key, nextValue);
      } else if (isMotionValue(prevValue)) {
        element.addValue(key, motionValue(nextValue, { owner: element }));
      } else if (prevValue !== nextValue) {
        if (element.hasValue(key)) {
          const existingValue = element.getValue(key);
          if (existingValue.liveStyle === true) {
            existingValue.jump(nextValue);
          } else if (!existingValue.hasAnimated) {
            existingValue.set(nextValue);
          }
        } else {
          const latestValue = element.getStaticValue(key);
          element.addValue(key, motionValue(latestValue !== void 0 ? latestValue : nextValue, { owner: element }));
        }
      }
    }
    for (const key in prev) {
      if (next[key] === void 0)
        element.removeValue(key);
    }
    return next;
  }

  // node_modules/motion-dom/dist/es/render/utils/reduced-motion/state.mjs
  var prefersReducedMotion = { current: null };
  var hasReducedMotionListener = { current: false };

  // node_modules/motion-dom/dist/es/render/utils/reduced-motion/index.mjs
  var isBrowser = typeof window !== "undefined";
  function initPrefersReducedMotion() {
    hasReducedMotionListener.current = true;
    if (!isBrowser)
      return;
    if (window.matchMedia) {
      const motionMediaQuery = window.matchMedia("(prefers-reduced-motion)");
      const setReducedMotionPreferences = () => prefersReducedMotion.current = motionMediaQuery.matches;
      motionMediaQuery.addEventListener("change", setReducedMotionPreferences);
      setReducedMotionPreferences();
    } else {
      prefersReducedMotion.current = false;
    }
  }

  // node_modules/motion-dom/dist/es/render/VisualElement.mjs
  var propEventHandlers = [
    "AnimationStart",
    "AnimationComplete",
    "Update",
    "BeforeLayoutMeasure",
    "LayoutMeasure",
    "LayoutAnimationStart",
    "LayoutAnimationComplete"
  ];
  var featureDefinitions = {};
  var VisualElement = class {
    /**
     * This method takes React props and returns found MotionValues. For example, HTML
     * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
     *
     * This isn't an abstract method as it needs calling in the constructor, but it is
     * intended to be one.
     */
    scrapeMotionValuesFromProps(_props, _prevProps, _visualElement) {
      return {};
    }
    constructor({ parent, props, presenceContext, reducedMotionConfig, skipAnimations, blockInitialAnimation, visualState }, options = {}) {
      this.current = null;
      this.children = /* @__PURE__ */ new Set();
      this.isVariantNode = false;
      this.isControllingVariants = false;
      this.shouldReduceMotion = null;
      this.shouldSkipAnimations = false;
      this.values = /* @__PURE__ */ new Map();
      this.KeyframeResolver = KeyframeResolver;
      this.features = {};
      this.valueSubscriptions = /* @__PURE__ */ new Map();
      this.prevMotionValues = {};
      this.hasBeenMounted = false;
      this.events = {};
      this.propEventSubscriptions = {};
      this.notifyUpdate = () => this.notify("Update", this.latestValues);
      this.render = () => {
        if (!this.current)
          return;
        this.triggerBuild();
        this.renderInstance(this.current, this.renderState, this.props.style, this.projection);
      };
      this.renderScheduledAt = 0;
      this.scheduleRender = () => {
        const now2 = time.now();
        if (this.renderScheduledAt < now2) {
          this.renderScheduledAt = now2;
          frame.render(this.render, false, true);
        }
      };
      const { latestValues, renderState } = visualState;
      this.latestValues = latestValues;
      this.baseTarget = { ...latestValues };
      this.initialValues = props.initial ? { ...latestValues } : {};
      this.renderState = renderState;
      this.parent = parent;
      this.props = props;
      this.presenceContext = presenceContext;
      this.depth = parent ? parent.depth + 1 : 0;
      this.reducedMotionConfig = reducedMotionConfig;
      this.skipAnimationsConfig = skipAnimations;
      this.options = options;
      this.blockInitialAnimation = Boolean(blockInitialAnimation);
      this.isControllingVariants = isControllingVariants(props);
      this.isVariantNode = isVariantNode(props);
      if (this.isVariantNode) {
        this.variantChildren = /* @__PURE__ */ new Set();
      }
      this.manuallyAnimateOnMount = Boolean(parent && parent.current);
      const { willChange, ...initialMotionValues } = this.scrapeMotionValuesFromProps(props, {}, this);
      for (const key in initialMotionValues) {
        const value = initialMotionValues[key];
        if (latestValues[key] !== void 0 && isMotionValue(value)) {
          value.set(latestValues[key]);
        }
      }
    }
    mount(instance) {
      if (this.hasBeenMounted) {
        for (const key in this.initialValues) {
          this.values.get(key)?.jump(this.initialValues[key]);
          this.latestValues[key] = this.initialValues[key];
        }
      }
      this.current = instance;
      visualElementStore.set(instance, this);
      if (this.projection && !this.projection.instance) {
        this.projection.mount(instance);
      }
      if (this.parent && this.isVariantNode && !this.isControllingVariants) {
        this.removeFromVariantTree = this.parent.addVariantChild(this);
      }
      this.values.forEach((value, key) => this.bindToMotionValue(key, value));
      if (this.reducedMotionConfig === "never") {
        this.shouldReduceMotion = false;
      } else if (this.reducedMotionConfig === "always") {
        this.shouldReduceMotion = true;
      } else {
        if (!hasReducedMotionListener.current) {
          initPrefersReducedMotion();
        }
        this.shouldReduceMotion = prefersReducedMotion.current;
      }
      if (true) {
        warnOnce(this.shouldReduceMotion !== true, "You have Reduced Motion enabled on your device. Animations may not appear as expected.", "reduced-motion-disabled");
      }
      this.shouldSkipAnimations = this.skipAnimationsConfig ?? false;
      this.parent?.addChild(this);
      this.update(this.props, this.presenceContext);
      this.hasBeenMounted = true;
    }
    unmount() {
      this.projection && this.projection.unmount();
      cancelFrame(this.notifyUpdate);
      cancelFrame(this.render);
      this.valueSubscriptions.forEach((remove) => remove());
      this.valueSubscriptions.clear();
      this.removeFromVariantTree && this.removeFromVariantTree();
      this.parent?.removeChild(this);
      for (const key in this.events) {
        this.events[key].clear();
      }
      for (const key in this.features) {
        const feature = this.features[key];
        if (feature) {
          feature.unmount();
          feature.isMounted = false;
        }
      }
      this.current = null;
    }
    addChild(child) {
      this.children.add(child);
      this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set());
      this.enteringChildren.add(child);
    }
    removeChild(child) {
      this.children.delete(child);
      this.enteringChildren && this.enteringChildren.delete(child);
    }
    bindToMotionValue(key, value) {
      if (this.valueSubscriptions.has(key)) {
        this.valueSubscriptions.get(key)();
      }
      if (value.accelerate && acceleratedValues.has(key) && this.current instanceof HTMLElement) {
        const { factory, keyframes: keyframes2, times, ease: ease2, duration } = value.accelerate;
        const animation = new NativeAnimation({
          element: this.current,
          name: key,
          keyframes: keyframes2,
          times,
          ease: ease2,
          duration: secondsToMilliseconds(duration)
        });
        const cleanup = factory(animation);
        this.valueSubscriptions.set(key, () => {
          cleanup();
          animation.cancel();
        });
        return;
      }
      const valueIsTransform = transformProps.has(key);
      if (valueIsTransform && this.onBindTransform) {
        this.onBindTransform();
      }
      const removeOnChange = value.on("change", (latestValue) => {
        this.latestValues[key] = latestValue;
        this.props.onUpdate && frame.preRender(this.notifyUpdate);
        if (valueIsTransform && this.projection) {
          this.projection.isTransformDirty = true;
        }
        this.scheduleRender();
      });
      let removeSyncCheck;
      if (typeof window !== "undefined" && window.MotionCheckAppearSync) {
        removeSyncCheck = window.MotionCheckAppearSync(this, key, value);
      }
      this.valueSubscriptions.set(key, () => {
        removeOnChange();
        if (removeSyncCheck)
          removeSyncCheck();
        if (value.owner)
          value.stop();
      });
    }
    sortNodePosition(other) {
      if (!this.current || !this.sortInstanceNodePosition || this.type !== other.type) {
        return 0;
      }
      return this.sortInstanceNodePosition(this.current, other.current);
    }
    updateFeatures() {
      let key = "animation";
      for (key in featureDefinitions) {
        const featureDefinition = featureDefinitions[key];
        if (!featureDefinition)
          continue;
        const { isEnabled, Feature: FeatureConstructor } = featureDefinition;
        if (!this.features[key] && FeatureConstructor && isEnabled(this.props)) {
          this.features[key] = new FeatureConstructor(this);
        }
        if (this.features[key]) {
          const feature = this.features[key];
          if (feature.isMounted) {
            feature.update();
          } else {
            feature.mount();
            feature.isMounted = true;
          }
        }
      }
    }
    triggerBuild() {
      this.build(this.renderState, this.latestValues, this.props);
    }
    /**
     * Measure the current viewport box with or without transforms.
     * Only measures axis-aligned boxes, rotate and skew must be manually
     * removed with a re-render to work.
     */
    measureViewportBox() {
      return this.current ? this.measureInstanceViewportBox(this.current, this.props) : createBox();
    }
    getStaticValue(key) {
      return this.latestValues[key];
    }
    setStaticValue(key, value) {
      this.latestValues[key] = value;
    }
    /**
     * Update the provided props. Ensure any newly-added motion values are
     * added to our map, old ones removed, and listeners updated.
     */
    update(props, presenceContext) {
      if (props.transformTemplate || this.props.transformTemplate) {
        this.scheduleRender();
      }
      this.prevProps = this.props;
      this.props = props;
      this.prevPresenceContext = this.presenceContext;
      this.presenceContext = presenceContext;
      for (let i2 = 0; i2 < propEventHandlers.length; i2++) {
        const key = propEventHandlers[i2];
        if (this.propEventSubscriptions[key]) {
          this.propEventSubscriptions[key]();
          delete this.propEventSubscriptions[key];
        }
        const listenerName = "on" + key;
        const listener2 = props[listenerName];
        if (listener2) {
          this.propEventSubscriptions[key] = this.on(key, listener2);
        }
      }
      this.prevMotionValues = updateMotionValuesFromProps(this, this.scrapeMotionValuesFromProps(props, this.prevProps || {}, this), this.prevMotionValues);
      if (this.handleChildMotionValue) {
        this.handleChildMotionValue();
      }
    }
    getProps() {
      return this.props;
    }
    /**
     * Returns the variant definition with a given name.
     */
    getVariant(name) {
      return this.props.variants ? this.props.variants[name] : void 0;
    }
    /**
     * Returns the defined default transition on this component.
     */
    getDefaultTransition() {
      return this.props.transition;
    }
    getTransformPagePoint() {
      return this.props.transformPagePoint;
    }
    getClosestVariantNode() {
      return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
    }
    /**
     * Add a child visual element to our set of children.
     */
    addVariantChild(child) {
      const closestVariantNode = this.getClosestVariantNode();
      if (closestVariantNode) {
        closestVariantNode.variantChildren && closestVariantNode.variantChildren.add(child);
        return () => closestVariantNode.variantChildren.delete(child);
      }
    }
    /**
     * Add a motion value and bind it to this visual element.
     */
    addValue(key, value) {
      const existingValue = this.values.get(key);
      if (value !== existingValue) {
        if (existingValue)
          this.removeValue(key);
        this.bindToMotionValue(key, value);
        this.values.set(key, value);
        this.latestValues[key] = value.get();
      }
    }
    /**
     * Remove a motion value and unbind any active subscriptions.
     */
    removeValue(key) {
      this.values.delete(key);
      const unsubscribe = this.valueSubscriptions.get(key);
      if (unsubscribe) {
        unsubscribe();
        this.valueSubscriptions.delete(key);
      }
      delete this.latestValues[key];
      this.removeValueFromRenderState(key, this.renderState);
    }
    /**
     * Check whether we have a motion value for this key
     */
    hasValue(key) {
      return this.values.has(key);
    }
    getValue(key, defaultValue) {
      if (this.props.values && this.props.values[key]) {
        return this.props.values[key];
      }
      let value = this.values.get(key);
      if (value === void 0 && defaultValue !== void 0) {
        value = motionValue(defaultValue === null ? void 0 : defaultValue, { owner: this });
        this.addValue(key, value);
      }
      return value;
    }
    /**
     * If we're trying to animate to a previously unencountered value,
     * we need to check for it in our state and as a last resort read it
     * directly from the instance (which might have performance implications).
     */
    readValue(key, target) {
      let value = this.latestValues[key] !== void 0 || !this.current ? this.latestValues[key] : this.getBaseTargetFromProps(this.props, key) ?? this.readValueFromInstance(this.current, key, this.options);
      if (value !== void 0 && value !== null) {
        if (typeof value === "string" && (isNumericalString(value) || isZeroValueString(value))) {
          value = parseFloat(value);
        } else if (!findValueType(value) && complex.test(target)) {
          value = getAnimatableNone2(key, target);
        }
        this.setBaseTarget(key, isMotionValue(value) ? value.get() : value);
      }
      return isMotionValue(value) ? value.get() : value;
    }
    /**
     * Set the base target to later animate back to. This is currently
     * only hydrated on creation and when we first read a value.
     */
    setBaseTarget(key, value) {
      this.baseTarget[key] = value;
    }
    /**
     * Find the base target for a value thats been removed from all animation
     * props.
     */
    getBaseTarget(key) {
      const { initial: initial2 } = this.props;
      let valueFromInitial;
      if (typeof initial2 === "string" || typeof initial2 === "object") {
        const variant = resolveVariantFromProps(this.props, initial2, this.presenceContext?.custom);
        if (variant) {
          valueFromInitial = variant[key];
        }
      }
      if (initial2 && valueFromInitial !== void 0) {
        return valueFromInitial;
      }
      const target = this.getBaseTargetFromProps(this.props, key);
      if (target !== void 0 && !isMotionValue(target))
        return target;
      return this.initialValues[key] !== void 0 && valueFromInitial === void 0 ? void 0 : this.baseTarget[key];
    }
    on(eventName, callback) {
      if (!this.events[eventName]) {
        this.events[eventName] = new SubscriptionManager();
      }
      return this.events[eventName].add(callback);
    }
    notify(eventName, ...args) {
      if (this.events[eventName]) {
        this.events[eventName].notify(...args);
      }
    }
    scheduleRenderMicrotask() {
      microtask.render(this.render);
    }
  };

  // node_modules/motion-dom/dist/es/render/dom/DOMVisualElement.mjs
  var DOMVisualElement = class extends VisualElement {
    constructor() {
      super(...arguments);
      this.KeyframeResolver = DOMKeyframesResolver;
    }
    sortInstanceNodePosition(a2, b2) {
      return a2.compareDocumentPosition(b2) & 2 ? 1 : -1;
    }
    getBaseTargetFromProps(props, key) {
      const style = props.style;
      return style ? style[key] : void 0;
    }
    removeValueFromRenderState(key, { vars, style }) {
      delete vars[key];
      delete style[key];
    }
    handleChildMotionValue() {
      if (this.childSubscription) {
        this.childSubscription();
        delete this.childSubscription;
      }
      const { children } = this.props;
      if (isMotionValue(children)) {
        this.childSubscription = children.on("change", (latest) => {
          if (this.current) {
            this.current.textContent = `${latest}`;
          }
        });
      }
    }
  };

  // node_modules/motion-dom/dist/es/projection/geometry/conversion.mjs
  function convertBoundingBoxToBox({ top, left, right, bottom }) {
    return {
      x: { min: left, max: right },
      y: { min: top, max: bottom }
    };
  }
  function transformBoxPoints(point, transformPoint) {
    if (!transformPoint)
      return point;
    const topLeft = transformPoint({ x: point.left, y: point.top });
    const bottomRight = transformPoint({ x: point.right, y: point.bottom });
    return {
      top: topLeft.y,
      left: topLeft.x,
      bottom: bottomRight.y,
      right: bottomRight.x
    };
  }

  // node_modules/motion-dom/dist/es/projection/utils/measure.mjs
  function measureViewportBox(instance, transformPoint) {
    return convertBoundingBoxToBox(transformBoxPoints(instance.getBoundingClientRect(), transformPoint));
  }

  // node_modules/motion-dom/dist/es/render/html/utils/build-transform.mjs
  var translateAlias = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective"
  };
  var numTransforms = transformPropOrder.length;
  function buildTransform(latestValues, transform, transformTemplate) {
    let transformString = "";
    let transformIsDefault = true;
    for (let i2 = 0; i2 < numTransforms; i2++) {
      const key = transformPropOrder[i2];
      const value = latestValues[key];
      if (value === void 0)
        continue;
      let valueIsDefault = true;
      if (typeof value === "number") {
        valueIsDefault = value === (key.startsWith("scale") ? 1 : 0);
      } else {
        const parsed = parseFloat(value);
        valueIsDefault = key.startsWith("scale") ? parsed === 1 : parsed === 0;
      }
      if (!valueIsDefault || transformTemplate) {
        const valueAsType = getValueAsType(value, numberValueTypes[key]);
        if (!valueIsDefault) {
          transformIsDefault = false;
          const transformName = translateAlias[key] || key;
          transformString += `${transformName}(${valueAsType}) `;
        }
        if (transformTemplate) {
          transform[key] = valueAsType;
        }
      }
    }
    transformString = transformString.trim();
    if (transformTemplate) {
      transformString = transformTemplate(transform, transformIsDefault ? "" : transformString);
    } else if (transformIsDefault) {
      transformString = "none";
    }
    return transformString;
  }

  // node_modules/motion-dom/dist/es/render/html/utils/build-styles.mjs
  function buildHTMLStyles(state, latestValues, transformTemplate) {
    const { style, vars, transformOrigin } = state;
    let hasTransform = false;
    let hasTransformOrigin = false;
    for (const key in latestValues) {
      const value = latestValues[key];
      if (transformProps.has(key)) {
        hasTransform = true;
        continue;
      } else if (isCSSVariableName(key)) {
        vars[key] = value;
        continue;
      } else {
        const valueAsType = getValueAsType(value, numberValueTypes[key]);
        if (key.startsWith("origin")) {
          hasTransformOrigin = true;
          transformOrigin[key] = valueAsType;
        } else {
          style[key] = valueAsType;
        }
      }
    }
    if (!latestValues.transform) {
      if (hasTransform || transformTemplate) {
        style.transform = buildTransform(latestValues, state.transform, transformTemplate);
      } else if (style.transform) {
        style.transform = "none";
      }
    }
    if (hasTransformOrigin) {
      const { originX = "50%", originY = "50%", originZ = 0 } = transformOrigin;
      style.transformOrigin = `${originX} ${originY} ${originZ}`;
    }
  }

  // node_modules/motion-dom/dist/es/render/html/utils/render.mjs
  function renderHTML(element, { style, vars }, styleProp, projection) {
    const elementStyle = element.style;
    let key;
    for (key in style) {
      elementStyle[key] = style[key];
    }
    projection?.applyProjectionStyles(elementStyle, styleProp);
    for (key in vars) {
      elementStyle.setProperty(key, vars[key]);
    }
  }

  // node_modules/motion-dom/dist/es/projection/styles/scale-border-radius.mjs
  function pixelsToPercent(pixels, axis) {
    if (axis.max === axis.min)
      return 0;
    return pixels / (axis.max - axis.min) * 100;
  }
  var correctBorderRadius = {
    correct: (latest, node) => {
      if (!node.target)
        return latest;
      if (typeof latest === "string") {
        if (px.test(latest)) {
          latest = parseFloat(latest);
        } else {
          return latest;
        }
      }
      const x2 = pixelsToPercent(latest, node.target.x);
      const y2 = pixelsToPercent(latest, node.target.y);
      return `${x2}% ${y2}%`;
    }
  };

  // node_modules/motion-dom/dist/es/projection/styles/scale-box-shadow.mjs
  var correctBoxShadow = {
    correct: (latest, { treeScale, projectionDelta }) => {
      const original = latest;
      const shadow = complex.parse(latest);
      if (shadow.length > 5)
        return original;
      const template = complex.createTransformer(latest);
      const offset = typeof shadow[0] !== "number" ? 1 : 0;
      const xScale = projectionDelta.x.scale * treeScale.x;
      const yScale = projectionDelta.y.scale * treeScale.y;
      shadow[0 + offset] /= xScale;
      shadow[1 + offset] /= yScale;
      const averageScale = mixNumber(xScale, yScale, 0.5);
      if (typeof shadow[2 + offset] === "number")
        shadow[2 + offset] /= averageScale;
      if (typeof shadow[3 + offset] === "number")
        shadow[3 + offset] /= averageScale;
      return template(shadow);
    }
  };

  // node_modules/motion-dom/dist/es/projection/styles/scale-correction.mjs
  var scaleCorrectors = {
    borderRadius: {
      ...correctBorderRadius,
      applyTo: [
        "borderTopLeftRadius",
        "borderTopRightRadius",
        "borderBottomLeftRadius",
        "borderBottomRightRadius"
      ]
    },
    borderTopLeftRadius: correctBorderRadius,
    borderTopRightRadius: correctBorderRadius,
    borderBottomLeftRadius: correctBorderRadius,
    borderBottomRightRadius: correctBorderRadius,
    boxShadow: correctBoxShadow
  };

  // node_modules/motion-dom/dist/es/render/utils/is-forced-motion-value.mjs
  function isForcedMotionValue(key, { layout, layoutId }) {
    return transformProps.has(key) || key.startsWith("origin") || (layout || layoutId !== void 0) && (!!scaleCorrectors[key] || key === "opacity");
  }

  // node_modules/motion-dom/dist/es/render/html/utils/scrape-motion-values.mjs
  function scrapeMotionValuesFromProps(props, prevProps, visualElement) {
    const style = props.style;
    const prevStyle = prevProps?.style;
    const newValues = {};
    if (!style)
      return newValues;
    for (const key in style) {
      if (isMotionValue(style[key]) || prevStyle && isMotionValue(prevStyle[key]) || isForcedMotionValue(key, props) || visualElement?.getValue(key)?.liveStyle !== void 0) {
        newValues[key] = style[key];
      }
    }
    return newValues;
  }

  // node_modules/motion-dom/dist/es/render/html/HTMLVisualElement.mjs
  function getComputedStyle2(element) {
    return window.getComputedStyle(element);
  }
  var HTMLVisualElement = class extends DOMVisualElement {
    constructor() {
      super(...arguments);
      this.type = "html";
      this.renderInstance = renderHTML;
    }
    readValueFromInstance(instance, key) {
      if (transformProps.has(key)) {
        return this.projection?.isProjecting ? defaultTransformValue(key) : readTransformValue(instance, key);
      } else {
        const computedStyle = getComputedStyle2(instance);
        const value = (isCSSVariableName(key) ? computedStyle.getPropertyValue(key) : computedStyle[key]) || 0;
        return typeof value === "string" ? value.trim() : value;
      }
    }
    measureInstanceViewportBox(instance, { transformPagePoint }) {
      return measureViewportBox(instance, transformPagePoint);
    }
    build(renderState, latestValues, props) {
      buildHTMLStyles(renderState, latestValues, props.transformTemplate);
    }
    scrapeMotionValuesFromProps(props, prevProps, visualElement) {
      return scrapeMotionValuesFromProps(props, prevProps, visualElement);
    }
  };

  // node_modules/motion-dom/dist/es/render/object/ObjectVisualElement.mjs
  function isObjectKey(key, object) {
    return key in object;
  }
  var ObjectVisualElement = class extends VisualElement {
    constructor() {
      super(...arguments);
      this.type = "object";
    }
    readValueFromInstance(instance, key) {
      if (isObjectKey(key, instance)) {
        const value = instance[key];
        if (typeof value === "string" || typeof value === "number") {
          return value;
        }
      }
      return void 0;
    }
    getBaseTargetFromProps() {
      return void 0;
    }
    removeValueFromRenderState(key, renderState) {
      delete renderState.output[key];
    }
    measureInstanceViewportBox() {
      return createBox();
    }
    build(renderState, latestValues) {
      Object.assign(renderState.output, latestValues);
    }
    renderInstance(instance, { output }) {
      Object.assign(instance, output);
    }
    sortInstanceNodePosition() {
      return 0;
    }
  };

  // node_modules/motion-dom/dist/es/render/svg/utils/path.mjs
  var dashKeys = {
    offset: "stroke-dashoffset",
    array: "stroke-dasharray"
  };
  var camelKeys = {
    offset: "strokeDashoffset",
    array: "strokeDasharray"
  };
  function buildSVGPath(attrs, length, spacing = 1, offset = 0, useDashCase = true) {
    attrs.pathLength = 1;
    const keys = useDashCase ? dashKeys : camelKeys;
    attrs[keys.offset] = `${-offset}`;
    attrs[keys.array] = `${length} ${spacing}`;
  }

  // node_modules/motion-dom/dist/es/render/svg/utils/build-attrs.mjs
  var cssMotionPathProperties = [
    "offsetDistance",
    "offsetPath",
    "offsetRotate",
    "offsetAnchor"
  ];
  function buildSVGAttrs(state, {
    attrX,
    attrY,
    attrScale,
    pathLength,
    pathSpacing = 1,
    pathOffset = 0,
    // This is object creation, which we try to avoid per-frame.
    ...latest
  }, isSVGTag2, transformTemplate, styleProp) {
    buildHTMLStyles(state, latest, transformTemplate);
    if (isSVGTag2) {
      if (state.style.viewBox) {
        state.attrs.viewBox = state.style.viewBox;
      }
      return;
    }
    state.attrs = state.style;
    state.style = {};
    const { attrs, style } = state;
    if (attrs.transform) {
      style.transform = attrs.transform;
      delete attrs.transform;
    }
    if (style.transform || attrs.transformOrigin) {
      style.transformOrigin = attrs.transformOrigin ?? "50% 50%";
      delete attrs.transformOrigin;
    }
    if (style.transform) {
      style.transformBox = styleProp?.transformBox ?? "fill-box";
      delete attrs.transformBox;
    }
    for (const key of cssMotionPathProperties) {
      if (attrs[key] !== void 0) {
        style[key] = attrs[key];
        delete attrs[key];
      }
    }
    if (attrX !== void 0)
      attrs.x = attrX;
    if (attrY !== void 0)
      attrs.y = attrY;
    if (attrScale !== void 0)
      attrs.scale = attrScale;
    if (pathLength !== void 0) {
      buildSVGPath(attrs, pathLength, pathSpacing, pathOffset, false);
    }
  }

  // node_modules/motion-dom/dist/es/render/svg/utils/camel-case-attrs.mjs
  var camelCaseAttributes = /* @__PURE__ */ new Set([
    "baseFrequency",
    "diffuseConstant",
    "kernelMatrix",
    "kernelUnitLength",
    "keySplines",
    "keyTimes",
    "limitingConeAngle",
    "markerHeight",
    "markerWidth",
    "numOctaves",
    "targetX",
    "targetY",
    "surfaceScale",
    "specularConstant",
    "specularExponent",
    "stdDeviation",
    "tableValues",
    "viewBox",
    "gradientTransform",
    "pathLength",
    "startOffset",
    "textLength",
    "lengthAdjust"
  ]);

  // node_modules/motion-dom/dist/es/render/svg/utils/is-svg-tag.mjs
  var isSVGTag = (tag) => typeof tag === "string" && tag.toLowerCase() === "svg";

  // node_modules/motion-dom/dist/es/render/svg/utils/render.mjs
  function renderSVG(element, renderState, _styleProp, projection) {
    renderHTML(element, renderState, void 0, projection);
    for (const key in renderState.attrs) {
      element.setAttribute(!camelCaseAttributes.has(key) ? camelToDash(key) : key, renderState.attrs[key]);
    }
  }

  // node_modules/motion-dom/dist/es/render/svg/utils/scrape-motion-values.mjs
  function scrapeMotionValuesFromProps2(props, prevProps, visualElement) {
    const newValues = scrapeMotionValuesFromProps(props, prevProps, visualElement);
    for (const key in props) {
      if (isMotionValue(props[key]) || isMotionValue(prevProps[key])) {
        const targetKey = transformPropOrder.indexOf(key) !== -1 ? "attr" + key.charAt(0).toUpperCase() + key.substring(1) : key;
        newValues[targetKey] = props[key];
      }
    }
    return newValues;
  }

  // node_modules/motion-dom/dist/es/render/svg/SVGVisualElement.mjs
  var SVGVisualElement = class extends DOMVisualElement {
    constructor() {
      super(...arguments);
      this.type = "svg";
      this.isSVGTag = false;
      this.measureInstanceViewportBox = createBox;
    }
    getBaseTargetFromProps(props, key) {
      return props[key];
    }
    readValueFromInstance(instance, key) {
      if (transformProps.has(key)) {
        const defaultType = getDefaultValueType(key);
        return defaultType ? defaultType.default || 0 : 0;
      }
      key = !camelCaseAttributes.has(key) ? camelToDash(key) : key;
      return instance.getAttribute(key);
    }
    scrapeMotionValuesFromProps(props, prevProps, visualElement) {
      return scrapeMotionValuesFromProps2(props, prevProps, visualElement);
    }
    build(renderState, latestValues, props) {
      buildSVGAttrs(renderState, latestValues, this.isSVGTag, props.transformTemplate, props.style);
    }
    renderInstance(instance, renderState, styleProp, projection) {
      renderSVG(instance, renderState, styleProp, projection);
    }
    mount(instance) {
      this.isSVGTag = isSVGTag(instance.tagName);
      super.mount(instance);
    }
  };

  // node_modules/motion-dom/dist/es/animation/animate/single-value.mjs
  function animateSingleValue(value, keyframes2, options) {
    const motionValue$1 = isMotionValue(value) ? value : motionValue(value);
    motionValue$1.start(animateMotionValue("", motionValue$1, keyframes2, options));
    return motionValue$1.animation;
  }

  // node_modules/framer-motion/dist/es/animation/utils/is-dom-keyframes.mjs
  function isDOMKeyframes(keyframes2) {
    return typeof keyframes2 === "object" && !Array.isArray(keyframes2);
  }

  // node_modules/framer-motion/dist/es/animation/animate/resolve-subjects.mjs
  function resolveSubjects(subject, keyframes2, scope, selectorCache) {
    if (subject == null) {
      return [];
    }
    if (typeof subject === "string" && isDOMKeyframes(keyframes2)) {
      return resolveElements(subject, scope, selectorCache);
    } else if (subject instanceof NodeList) {
      return Array.from(subject);
    } else if (Array.isArray(subject)) {
      return subject.filter((s2) => s2 != null);
    } else {
      return [subject];
    }
  }

  // node_modules/framer-motion/dist/es/animation/sequence/utils/calc-repeat-duration.mjs
  function calculateRepeatDuration(duration, repeat, _repeatDelay) {
    return duration * (repeat + 1);
  }

  // node_modules/framer-motion/dist/es/animation/sequence/utils/calc-time.mjs
  function calcNextTime(current, next, prev, labels) {
    if (typeof next === "number") {
      return next;
    } else if (next.startsWith("-") || next.startsWith("+")) {
      return Math.max(0, current + parseFloat(next));
    } else if (next === "<") {
      return prev;
    } else if (next.startsWith("<")) {
      return Math.max(0, prev + parseFloat(next.slice(1)));
    } else {
      return labels.get(next) ?? current;
    }
  }

  // node_modules/framer-motion/dist/es/animation/sequence/utils/edit.mjs
  function eraseKeyframes(sequence, startTime, endTime) {
    for (let i2 = 0; i2 < sequence.length; i2++) {
      const keyframe = sequence[i2];
      if (keyframe.at > startTime && keyframe.at < endTime) {
        removeItem(sequence, keyframe);
        i2--;
      }
    }
  }
  function addKeyframes(sequence, keyframes2, easing, offset, startTime, endTime) {
    eraseKeyframes(sequence, startTime, endTime);
    for (let i2 = 0; i2 < keyframes2.length; i2++) {
      sequence.push({
        value: keyframes2[i2],
        at: mixNumber(startTime, endTime, offset[i2]),
        easing: getEasingForSegment(easing, i2)
      });
    }
  }

  // node_modules/framer-motion/dist/es/animation/sequence/utils/normalize-times.mjs
  function normalizeTimes(times, repeat) {
    for (let i2 = 0; i2 < times.length; i2++) {
      times[i2] = times[i2] / (repeat + 1);
    }
  }

  // node_modules/framer-motion/dist/es/animation/sequence/utils/sort.mjs
  function compareByTime(a2, b2) {
    if (a2.at === b2.at) {
      if (a2.value === null)
        return 1;
      if (b2.value === null)
        return -1;
      return 0;
    } else {
      return a2.at - b2.at;
    }
  }

  // node_modules/framer-motion/dist/es/animation/sequence/create.mjs
  var defaultSegmentEasing = "easeInOut";
  var MAX_REPEAT = 20;
  function createAnimationsFromSequence(sequence, { defaultTransition = {}, ...sequenceTransition } = {}, scope, generators) {
    const defaultDuration = defaultTransition.duration || 0.3;
    const animationDefinitions = /* @__PURE__ */ new Map();
    const sequences = /* @__PURE__ */ new Map();
    const elementCache = {};
    const timeLabels = /* @__PURE__ */ new Map();
    let prevTime = 0;
    let currentTime = 0;
    let totalDuration = 0;
    for (let i2 = 0; i2 < sequence.length; i2++) {
      const segment = sequence[i2];
      if (typeof segment === "string") {
        timeLabels.set(segment, currentTime);
        continue;
      } else if (!Array.isArray(segment)) {
        timeLabels.set(segment.name, calcNextTime(currentTime, segment.at, prevTime, timeLabels));
        continue;
      }
      let [subject, keyframes2, transition = {}] = segment;
      if (transition.at !== void 0) {
        currentTime = calcNextTime(currentTime, transition.at, prevTime, timeLabels);
      }
      let maxDuration = 0;
      const resolveValueSequence = (valueKeyframes, valueTransition, valueSequence, elementIndex = 0, numSubjects = 0) => {
        const valueKeyframesAsList = keyframesAsList(valueKeyframes);
        const { delay = 0, times = defaultOffset(valueKeyframesAsList), type = defaultTransition.type || "keyframes", repeat, repeatType, repeatDelay = 0, ...remainingTransition } = valueTransition;
        let { ease: ease2 = defaultTransition.ease || "easeOut", duration } = valueTransition;
        const calculatedDelay = typeof delay === "function" ? delay(elementIndex, numSubjects) : delay;
        const numKeyframes = valueKeyframesAsList.length;
        const createGenerator = isGenerator(type) ? type : generators?.[type || "keyframes"];
        if (numKeyframes <= 2 && createGenerator) {
          let absoluteDelta = 100;
          if (numKeyframes === 2 && isNumberKeyframesArray(valueKeyframesAsList)) {
            const delta = valueKeyframesAsList[1] - valueKeyframesAsList[0];
            absoluteDelta = Math.abs(delta);
          }
          const springTransition = {
            ...defaultTransition,
            ...remainingTransition
          };
          if (duration !== void 0) {
            springTransition.duration = secondsToMilliseconds(duration);
          }
          const springEasing = createGeneratorEasing(springTransition, absoluteDelta, createGenerator);
          ease2 = springEasing.ease;
          duration = springEasing.duration;
        }
        duration ?? (duration = defaultDuration);
        const startTime = currentTime + calculatedDelay;
        if (times.length === 1 && times[0] === 0) {
          times[1] = 1;
        }
        const remainder = times.length - valueKeyframesAsList.length;
        remainder > 0 && fillOffset(times, remainder);
        valueKeyframesAsList.length === 1 && valueKeyframesAsList.unshift(null);
        if (repeat) {
          invariant(repeat < MAX_REPEAT, "Repeat count too high, must be less than 20", "repeat-count-high");
          duration = calculateRepeatDuration(duration, repeat);
          const originalKeyframes = [...valueKeyframesAsList];
          const originalTimes = [...times];
          ease2 = Array.isArray(ease2) ? [...ease2] : [ease2];
          const originalEase = [...ease2];
          for (let repeatIndex = 0; repeatIndex < repeat; repeatIndex++) {
            valueKeyframesAsList.push(...originalKeyframes);
            for (let keyframeIndex = 0; keyframeIndex < originalKeyframes.length; keyframeIndex++) {
              times.push(originalTimes[keyframeIndex] + (repeatIndex + 1));
              ease2.push(keyframeIndex === 0 ? "linear" : getEasingForSegment(originalEase, keyframeIndex - 1));
            }
          }
          normalizeTimes(times, repeat);
        }
        const targetTime = startTime + duration;
        addKeyframes(valueSequence, valueKeyframesAsList, ease2, times, startTime, targetTime);
        maxDuration = Math.max(calculatedDelay + duration, maxDuration);
        totalDuration = Math.max(targetTime, totalDuration);
      };
      if (isMotionValue(subject)) {
        const subjectSequence = getSubjectSequence(subject, sequences);
        resolveValueSequence(keyframes2, transition, getValueSequence("default", subjectSequence));
      } else {
        const subjects = resolveSubjects(subject, keyframes2, scope, elementCache);
        const numSubjects = subjects.length;
        for (let subjectIndex = 0; subjectIndex < numSubjects; subjectIndex++) {
          keyframes2 = keyframes2;
          transition = transition;
          const thisSubject = subjects[subjectIndex];
          const subjectSequence = getSubjectSequence(thisSubject, sequences);
          for (const key in keyframes2) {
            resolveValueSequence(keyframes2[key], getValueTransition2(transition, key), getValueSequence(key, subjectSequence), subjectIndex, numSubjects);
          }
        }
      }
      prevTime = currentTime;
      currentTime += maxDuration;
    }
    sequences.forEach((valueSequences, element) => {
      for (const key in valueSequences) {
        const valueSequence = valueSequences[key];
        valueSequence.sort(compareByTime);
        const keyframes2 = [];
        const valueOffset = [];
        const valueEasing = [];
        for (let i2 = 0; i2 < valueSequence.length; i2++) {
          const { at: at2, value, easing } = valueSequence[i2];
          keyframes2.push(value);
          valueOffset.push(progress(0, totalDuration, at2));
          valueEasing.push(easing || "easeOut");
        }
        if (valueOffset[0] !== 0) {
          valueOffset.unshift(0);
          keyframes2.unshift(keyframes2[0]);
          valueEasing.unshift(defaultSegmentEasing);
        }
        if (valueOffset[valueOffset.length - 1] !== 1) {
          valueOffset.push(1);
          keyframes2.push(null);
        }
        if (!animationDefinitions.has(element)) {
          animationDefinitions.set(element, {
            keyframes: {},
            transition: {}
          });
        }
        const definition = animationDefinitions.get(element);
        definition.keyframes[key] = keyframes2;
        const { type: _type, ...remainingDefaultTransition } = defaultTransition;
        definition.transition[key] = {
          ...remainingDefaultTransition,
          duration: totalDuration,
          ease: valueEasing,
          times: valueOffset,
          ...sequenceTransition
        };
      }
    });
    return animationDefinitions;
  }
  function getSubjectSequence(subject, sequences) {
    !sequences.has(subject) && sequences.set(subject, {});
    return sequences.get(subject);
  }
  function getValueSequence(name, sequences) {
    if (!sequences[name])
      sequences[name] = [];
    return sequences[name];
  }
  function keyframesAsList(keyframes2) {
    return Array.isArray(keyframes2) ? keyframes2 : [keyframes2];
  }
  function getValueTransition2(transition, key) {
    return transition && transition[key] ? {
      ...transition,
      ...transition[key]
    } : { ...transition };
  }
  var isNumber = (keyframe) => typeof keyframe === "number";
  var isNumberKeyframesArray = (keyframes2) => keyframes2.every(isNumber);

  // node_modules/framer-motion/dist/es/animation/utils/create-visual-element.mjs
  function createDOMVisualElement(element) {
    const options = {
      presenceContext: null,
      props: {},
      visualState: {
        renderState: {
          transform: {},
          transformOrigin: {},
          style: {},
          vars: {},
          attrs: {}
        },
        latestValues: {}
      }
    };
    const node = isSVGElement(element) && !isSVGSVGElement(element) ? new SVGVisualElement(options) : new HTMLVisualElement(options);
    node.mount(element);
    visualElementStore.set(element, node);
  }
  function createObjectVisualElement(subject) {
    const options = {
      presenceContext: null,
      props: {},
      visualState: {
        renderState: {
          output: {}
        },
        latestValues: {}
      }
    };
    const node = new ObjectVisualElement(options);
    node.mount(subject);
    visualElementStore.set(subject, node);
  }

  // node_modules/framer-motion/dist/es/animation/animate/subject.mjs
  function isSingleValue(subject, keyframes2) {
    return isMotionValue(subject) || typeof subject === "number" || typeof subject === "string" && !isDOMKeyframes(keyframes2);
  }
  function animateSubject(subject, keyframes2, options, scope) {
    const animations = [];
    if (isSingleValue(subject, keyframes2)) {
      animations.push(animateSingleValue(subject, isDOMKeyframes(keyframes2) ? keyframes2.default || keyframes2 : keyframes2, options ? options.default || options : options));
    } else {
      if (subject == null) {
        return animations;
      }
      const subjects = resolveSubjects(subject, keyframes2, scope);
      const numSubjects = subjects.length;
      invariant(Boolean(numSubjects), "No valid elements provided.", "no-valid-elements");
      for (let i2 = 0; i2 < numSubjects; i2++) {
        const thisSubject = subjects[i2];
        const createVisualElement = thisSubject instanceof Element ? createDOMVisualElement : createObjectVisualElement;
        if (!visualElementStore.has(thisSubject)) {
          createVisualElement(thisSubject);
        }
        const visualElement = visualElementStore.get(thisSubject);
        const transition = { ...options };
        if ("delay" in transition && typeof transition.delay === "function") {
          transition.delay = transition.delay(i2, numSubjects);
        }
        animations.push(...animateTarget(visualElement, { ...keyframes2, transition }, {}));
      }
    }
    return animations;
  }

  // node_modules/framer-motion/dist/es/animation/animate/sequence.mjs
  function animateSequence(sequence, options, scope) {
    const animations = [];
    const processedSequence = sequence.map((segment) => {
      if (Array.isArray(segment) && typeof segment[0] === "function") {
        const callback = segment[0];
        const mv = motionValue(0);
        mv.on("change", callback);
        if (segment.length === 1) {
          return [mv, [0, 1]];
        } else if (segment.length === 2) {
          return [mv, [0, 1], segment[1]];
        } else {
          return [mv, segment[1], segment[2]];
        }
      }
      return segment;
    });
    const animationDefinitions = createAnimationsFromSequence(processedSequence, options, scope, { spring });
    animationDefinitions.forEach(({ keyframes: keyframes2, transition }, subject) => {
      animations.push(...animateSubject(subject, keyframes2, transition));
    });
    return animations;
  }

  // node_modules/framer-motion/dist/es/animation/animate/index.mjs
  function isSequence(value) {
    return Array.isArray(value) && value.some(Array.isArray);
  }
  function createScopedAnimate(options = {}) {
    const { scope, reduceMotion } = options;
    function scopedAnimate(subjectOrSequence, optionsOrKeyframes, options2) {
      let animations = [];
      let animationOnComplete;
      if (isSequence(subjectOrSequence)) {
        const { onComplete, ...sequenceOptions } = optionsOrKeyframes || {};
        if (typeof onComplete === "function") {
          animationOnComplete = onComplete;
        }
        animations = animateSequence(subjectOrSequence, reduceMotion !== void 0 ? { reduceMotion, ...sequenceOptions } : sequenceOptions, scope);
      } else {
        const { onComplete, ...rest } = options2 || {};
        if (typeof onComplete === "function") {
          animationOnComplete = onComplete;
        }
        animations = animateSubject(subjectOrSequence, optionsOrKeyframes, reduceMotion !== void 0 ? { reduceMotion, ...rest } : rest, scope);
      }
      const animation = new GroupAnimationWithThen(animations);
      if (animationOnComplete) {
        animation.finished.then(animationOnComplete);
      }
      if (scope) {
        scope.animations.push(animation);
        animation.finished.then(() => {
          removeItem(scope.animations, animation);
        });
      }
      return animation;
    }
    return scopedAnimate;
  }
  var animate = createScopedAnimate();

  // node_modules/@fortawesome/fontawesome-svg-core/index.mjs
  function _arrayLikeToArray(r2, a2) {
    (null == a2 || a2 > r2.length) && (a2 = r2.length);
    for (var e2 = 0, n2 = Array(a2); e2 < a2; e2++) n2[e2] = r2[e2];
    return n2;
  }
  function _arrayWithHoles(r2) {
    if (Array.isArray(r2)) return r2;
  }
  function _arrayWithoutHoles(r2) {
    if (Array.isArray(r2)) return _arrayLikeToArray(r2);
  }
  function _classCallCheck(a2, n2) {
    if (!(a2 instanceof n2)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties(e2, r2) {
    for (var t2 = 0; t2 < r2.length; t2++) {
      var o2 = r2[t2];
      o2.enumerable = o2.enumerable || false, o2.configurable = true, "value" in o2 && (o2.writable = true), Object.defineProperty(e2, _toPropertyKey(o2.key), o2);
    }
  }
  function _createClass(e2, r2, t2) {
    return r2 && _defineProperties(e2.prototype, r2), t2 && _defineProperties(e2, t2), Object.defineProperty(e2, "prototype", {
      writable: false
    }), e2;
  }
  function _createForOfIteratorHelper(r2, e2) {
    var t2 = "undefined" != typeof Symbol && r2[Symbol.iterator] || r2["@@iterator"];
    if (!t2) {
      if (Array.isArray(r2) || (t2 = _unsupportedIterableToArray(r2)) || e2 && r2 && "number" == typeof r2.length) {
        t2 && (r2 = t2);
        var n2 = 0, F2 = function() {
        };
        return {
          s: F2,
          n: function() {
            return n2 >= r2.length ? {
              done: true
            } : {
              done: false,
              value: r2[n2++]
            };
          },
          e: function(r3) {
            throw r3;
          },
          f: F2
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var o2, a2 = true, u2 = false;
    return {
      s: function() {
        t2 = t2.call(r2);
      },
      n: function() {
        var r3 = t2.next();
        return a2 = r3.done, r3;
      },
      e: function(r3) {
        u2 = true, o2 = r3;
      },
      f: function() {
        try {
          a2 || null == t2.return || t2.return();
        } finally {
          if (u2) throw o2;
        }
      }
    };
  }
  function _defineProperty(e2, r2, t2) {
    return (r2 = _toPropertyKey(r2)) in e2 ? Object.defineProperty(e2, r2, {
      value: t2,
      enumerable: true,
      configurable: true,
      writable: true
    }) : e2[r2] = t2, e2;
  }
  function _iterableToArray(r2) {
    if ("undefined" != typeof Symbol && null != r2[Symbol.iterator] || null != r2["@@iterator"]) return Array.from(r2);
  }
  function _iterableToArrayLimit(r2, l2) {
    var t2 = null == r2 ? null : "undefined" != typeof Symbol && r2[Symbol.iterator] || r2["@@iterator"];
    if (null != t2) {
      var e2, n2, i2, u2, a2 = [], f2 = true, o2 = false;
      try {
        if (i2 = (t2 = t2.call(r2)).next, 0 === l2) {
          if (Object(t2) !== t2) return;
          f2 = false;
        } else for (; !(f2 = (e2 = i2.call(t2)).done) && (a2.push(e2.value), a2.length !== l2); f2 = true) ;
      } catch (r3) {
        o2 = true, n2 = r3;
      } finally {
        try {
          if (!f2 && null != t2.return && (u2 = t2.return(), Object(u2) !== u2)) return;
        } finally {
          if (o2) throw n2;
        }
      }
      return a2;
    }
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function ownKeys(e2, r2) {
    var t2 = Object.keys(e2);
    if (Object.getOwnPropertySymbols) {
      var o2 = Object.getOwnPropertySymbols(e2);
      r2 && (o2 = o2.filter(function(r3) {
        return Object.getOwnPropertyDescriptor(e2, r3).enumerable;
      })), t2.push.apply(t2, o2);
    }
    return t2;
  }
  function _objectSpread2(e2) {
    for (var r2 = 1; r2 < arguments.length; r2++) {
      var t2 = null != arguments[r2] ? arguments[r2] : {};
      r2 % 2 ? ownKeys(Object(t2), true).forEach(function(r3) {
        _defineProperty(e2, r3, t2[r3]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t2)) : ownKeys(Object(t2)).forEach(function(r3) {
        Object.defineProperty(e2, r3, Object.getOwnPropertyDescriptor(t2, r3));
      });
    }
    return e2;
  }
  function _slicedToArray(r2, e2) {
    return _arrayWithHoles(r2) || _iterableToArrayLimit(r2, e2) || _unsupportedIterableToArray(r2, e2) || _nonIterableRest();
  }
  function _toConsumableArray(r2) {
    return _arrayWithoutHoles(r2) || _iterableToArray(r2) || _unsupportedIterableToArray(r2) || _nonIterableSpread();
  }
  function _toPrimitive(t2, r2) {
    if ("object" != typeof t2 || !t2) return t2;
    var e2 = t2[Symbol.toPrimitive];
    if (void 0 !== e2) {
      var i2 = e2.call(t2, r2 || "default");
      if ("object" != typeof i2) return i2;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r2 ? String : Number)(t2);
  }
  function _toPropertyKey(t2) {
    var i2 = _toPrimitive(t2, "string");
    return "symbol" == typeof i2 ? i2 : i2 + "";
  }
  function _typeof(o2) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o3) {
      return typeof o3;
    } : function(o3) {
      return o3 && "function" == typeof Symbol && o3.constructor === Symbol && o3 !== Symbol.prototype ? "symbol" : typeof o3;
    }, _typeof(o2);
  }
  function _unsupportedIterableToArray(r2, a2) {
    if (r2) {
      if ("string" == typeof r2) return _arrayLikeToArray(r2, a2);
      var t2 = {}.toString.call(r2).slice(8, -1);
      return "Object" === t2 && r2.constructor && (t2 = r2.constructor.name), "Map" === t2 || "Set" === t2 ? Array.from(r2) : "Arguments" === t2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t2) ? _arrayLikeToArray(r2, a2) : void 0;
    }
  }
  var noop2 = function noop3() {
  };
  var _WINDOW = {};
  var _DOCUMENT = {};
  var _MUTATION_OBSERVER = null;
  var _PERFORMANCE = {
    mark: noop2,
    measure: noop2
  };
  try {
    if (typeof window !== "undefined") _WINDOW = window;
    if (typeof document !== "undefined") _DOCUMENT = document;
    if (typeof MutationObserver !== "undefined") _MUTATION_OBSERVER = MutationObserver;
    if (typeof performance !== "undefined") _PERFORMANCE = performance;
  } catch (e2) {
  }
  var _ref = _WINDOW.navigator || {};
  var _ref$userAgent = _ref.userAgent;
  var userAgent = _ref$userAgent === void 0 ? "" : _ref$userAgent;
  var WINDOW = _WINDOW;
  var DOCUMENT = _DOCUMENT;
  var MUTATION_OBSERVER = _MUTATION_OBSERVER;
  var PERFORMANCE = _PERFORMANCE;
  var IS_BROWSER = !!WINDOW.document;
  var IS_DOM = !!DOCUMENT.documentElement && !!DOCUMENT.head && typeof DOCUMENT.addEventListener === "function" && typeof DOCUMENT.createElement === "function";
  var IS_IE = ~userAgent.indexOf("MSIE") || ~userAgent.indexOf("Trident/");
  var _cl;
  var Z = /fa(k|kd|s|r|l|t|d|dr|dl|dt|b|slr|slpr|wsb|tl|ns|nds|es|gt|jr|jfr|jdr|usb|ufsb|udsb|cr|ss|sr|sl|st|sds|sdr|sdl|sdt|sldr|slpdr|pr|ms|vs)?[\-\ ]/;
  var $2 = /Font ?Awesome ?([567 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit|Notdog Duo|Notdog|Chisel|Etch|Graphite|Thumbprint|Jelly Fill|Jelly Duo|Jelly|Utility|Utility Fill|Utility Duo|Slab Press|Slab|Slab Duo|Slab Press Duo|Pixel|Mosaic|Vellum|Whiteboard)?.*/i;
  var rl = {
    classic: {
      fa: "solid",
      fas: "solid",
      "fa-solid": "solid",
      far: "regular",
      "fa-regular": "regular",
      fal: "light",
      "fa-light": "light",
      fat: "thin",
      "fa-thin": "thin",
      fab: "brands",
      "fa-brands": "brands"
    },
    duotone: {
      fa: "solid",
      fad: "solid",
      "fa-solid": "solid",
      "fa-duotone": "solid",
      fadr: "regular",
      "fa-regular": "regular",
      fadl: "light",
      "fa-light": "light",
      fadt: "thin",
      "fa-thin": "thin"
    },
    sharp: {
      fa: "solid",
      fass: "solid",
      "fa-solid": "solid",
      fasr: "regular",
      "fa-regular": "regular",
      fasl: "light",
      "fa-light": "light",
      fast: "thin",
      "fa-thin": "thin"
    },
    "sharp-duotone": {
      fa: "solid",
      fasds: "solid",
      "fa-solid": "solid",
      fasdr: "regular",
      "fa-regular": "regular",
      fasdl: "light",
      "fa-light": "light",
      fasdt: "thin",
      "fa-thin": "thin"
    },
    slab: {
      "fa-regular": "regular",
      faslr: "regular"
    },
    "slab-press": {
      "fa-regular": "regular",
      faslpr: "regular"
    },
    "slab-duo": {
      "fa-regular": "regular",
      fasldr: "regular"
    },
    "slab-press-duo": {
      "fa-regular": "regular",
      faslpdr: "regular"
    },
    thumbprint: {
      "fa-light": "light",
      fatl: "light"
    },
    vellum: {
      "fa-solid": "solid",
      favs: "solid"
    },
    pixel: {
      "fa-regular": "regular",
      fapr: "regular"
    },
    mosaic: {
      "fa-solid": "solid",
      fams: "solid"
    },
    whiteboard: {
      "fa-semibold": "semibold",
      fawsb: "semibold"
    },
    notdog: {
      "fa-solid": "solid",
      fans: "solid"
    },
    "notdog-duo": {
      "fa-solid": "solid",
      fands: "solid"
    },
    etch: {
      "fa-solid": "solid",
      faes: "solid"
    },
    graphite: {
      "fa-thin": "thin",
      fagt: "thin"
    },
    jelly: {
      "fa-regular": "regular",
      fajr: "regular"
    },
    "jelly-fill": {
      "fa-regular": "regular",
      fajfr: "regular"
    },
    "jelly-duo": {
      "fa-regular": "regular",
      fajdr: "regular"
    },
    chisel: {
      "fa-regular": "regular",
      facr: "regular"
    },
    utility: {
      "fa-semibold": "semibold",
      fausb: "semibold"
    },
    "utility-duo": {
      "fa-semibold": "semibold",
      faudsb: "semibold"
    },
    "utility-fill": {
      "fa-semibold": "semibold",
      faufsb: "semibold"
    }
  };
  var il = {
    GROUP: "duotone-group",
    SWAP_OPACITY: "swap-opacity",
    PRIMARY: "primary",
    SECONDARY: "secondary"
  };
  var dl = ["fa-classic", "fa-duotone", "fa-sharp", "fa-sharp-duotone", "fa-thumbprint", "fa-whiteboard", "fa-notdog", "fa-notdog-duo", "fa-chisel", "fa-etch", "fa-graphite", "fa-jelly", "fa-jelly-fill", "fa-jelly-duo", "fa-slab", "fa-slab-press", "fa-slab-press-duo", "fa-slab-duo", "fa-mosaic", "fa-pixel", "fa-vellum", "fa-utility", "fa-utility-duo", "fa-utility-fill"];
  var u = "classic";
  var l = "duotone";
  var h = "sharp";
  var t = "sharp-duotone";
  var g = "chisel";
  var n = "etch";
  var m = "graphite";
  var p = "jelly";
  var s = "jelly-duo";
  var y = "jelly-fill";
  var w = "mosaic";
  var x = "notdog";
  var e = "notdog-duo";
  var b = "pixel";
  var c = "slab";
  var o = "slab-duo";
  var I = "slab-press";
  var a = "slab-press-duo";
  var r = "thumbprint";
  var v = "utility";
  var i = "utility-duo";
  var F = "utility-fill";
  var d = "vellum";
  var S = "whiteboard";
  var A = "Classic";
  var P = "Duotone";
  var j = "Sharp";
  var B = "Sharp Duotone";
  var N = "Chisel";
  var D = "Etch";
  var k = "Graphite";
  var T = "Jelly";
  var C = "Jelly Duo";
  var W = "Jelly Fill";
  var R = "Mosaic";
  var K = "Notdog";
  var L = "Notdog Duo";
  var U = "Pixel";
  var J = "Slab";
  var _ = "Slab Duo";
  var M = "Slab Press";
  var E = "Slab Press Duo";
  var G = "Thumbprint";
  var V = "Utility";
  var z = "Utility Duo";
  var O = "Utility Fill";
  var Y = "Vellum";
  var q = "Whiteboard";
  var xl = [u, l, h, t, g, n, m, p, s, y, w, x, e, b, c, o, I, a, r, v, i, F, d, S];
  var cl = (_cl = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_cl, u, A), l, P), h, j), t, B), g, N), n, D), m, k), p, T), s, C), y, W), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_cl, w, R), x, K), e, L), b, U), c, J), o, _), I, M), a, E), r, G), v, V), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_cl, i, z), F, O), d, Y), S, q));
  var Al = {
    classic: {
      900: "fas",
      400: "far",
      normal: "far",
      300: "fal",
      100: "fat"
    },
    duotone: {
      900: "fad",
      400: "fadr",
      300: "fadl",
      100: "fadt"
    },
    sharp: {
      900: "fass",
      400: "fasr",
      300: "fasl",
      100: "fast"
    },
    "sharp-duotone": {
      900: "fasds",
      400: "fasdr",
      300: "fasdl",
      100: "fasdt"
    },
    slab: {
      400: "faslr"
    },
    "slab-press": {
      400: "faslpr"
    },
    "slab-duo": {
      400: "fasldr"
    },
    "slab-press-duo": {
      400: "faslpdr"
    },
    vellum: {
      900: "favs"
    },
    mosaic: {
      900: "fams"
    },
    pixel: {
      400: "fapr"
    },
    whiteboard: {
      600: "fawsb"
    },
    thumbprint: {
      300: "fatl"
    },
    notdog: {
      900: "fans"
    },
    "notdog-duo": {
      900: "fands"
    },
    etch: {
      900: "faes"
    },
    graphite: {
      100: "fagt"
    },
    chisel: {
      400: "facr"
    },
    jelly: {
      400: "fajr"
    },
    "jelly-fill": {
      400: "fajfr"
    },
    "jelly-duo": {
      400: "fajdr"
    },
    utility: {
      600: "fausb"
    },
    "utility-duo": {
      600: "faudsb"
    },
    "utility-fill": {
      600: "faufsb"
    }
  };
  var zl = {
    "Font Awesome 7 Free": {
      900: "fas",
      400: "far"
    },
    "Font Awesome 7 Pro": {
      900: "fas",
      400: "far",
      normal: "far",
      300: "fal",
      100: "fat"
    },
    "Font Awesome 7 Brands": {
      400: "fab",
      normal: "fab"
    },
    "Font Awesome 7 Duotone": {
      900: "fad",
      400: "fadr",
      normal: "fadr",
      300: "fadl",
      100: "fadt"
    },
    "Font Awesome 7 Sharp": {
      900: "fass",
      400: "fasr",
      normal: "fasr",
      300: "fasl",
      100: "fast"
    },
    "Font Awesome 7 Sharp Duotone": {
      900: "fasds",
      400: "fasdr",
      normal: "fasdr",
      300: "fasdl",
      100: "fasdt"
    },
    "Font Awesome 7 Jelly": {
      400: "fajr",
      normal: "fajr"
    },
    "Font Awesome 7 Jelly Fill": {
      400: "fajfr",
      normal: "fajfr"
    },
    "Font Awesome 7 Jelly Duo": {
      400: "fajdr",
      normal: "fajdr"
    },
    "Font Awesome 7 Slab": {
      400: "faslr",
      normal: "faslr"
    },
    "Font Awesome 7 Slab Press": {
      400: "faslpr",
      normal: "faslpr"
    },
    "Font Awesome 7 Slab Duo": {
      400: "fasldr",
      normal: "fasldr"
    },
    "Font Awesome 7 Slab Press Duo": {
      400: "faslpdr",
      normal: "faslpdr"
    },
    "Font Awesome 7 Pixel": {
      400: "fapr",
      normal: "fapr"
    },
    "Font Awesome 7 Mosaic": {
      900: "fams",
      normal: "fams"
    },
    "Font Awesome 7 Vellum": {
      900: "favs",
      normal: "favs"
    },
    "Font Awesome 7 Thumbprint": {
      300: "fatl",
      normal: "fatl"
    },
    "Font Awesome 7 Notdog": {
      900: "fans",
      normal: "fans"
    },
    "Font Awesome 7 Notdog Duo": {
      900: "fands",
      normal: "fands"
    },
    "Font Awesome 7 Etch": {
      900: "faes",
      normal: "faes"
    },
    "Font Awesome 7 Graphite": {
      100: "fagt",
      normal: "fagt"
    },
    "Font Awesome 7 Chisel": {
      400: "facr",
      normal: "facr"
    },
    "Font Awesome 7 Whiteboard": {
      600: "fawsb",
      normal: "fawsb"
    },
    "Font Awesome 7 Utility": {
      600: "fausb",
      normal: "fausb"
    },
    "Font Awesome 7 Utility Duo": {
      600: "faudsb",
      normal: "faudsb"
    },
    "Font Awesome 7 Utility Fill": {
      600: "faufsb",
      normal: "faufsb"
    }
  };
  var Ql = /* @__PURE__ */ new Map([["classic", {
    defaultShortPrefixId: "fas",
    defaultStyleId: "solid",
    styleIds: ["solid", "regular", "light", "thin", "brands"],
    futureStyleIds: [],
    defaultFontWeight: 900
  }], ["duotone", {
    defaultShortPrefixId: "fad",
    defaultStyleId: "solid",
    styleIds: ["solid", "regular", "light", "thin"],
    futureStyleIds: [],
    defaultFontWeight: 900
  }], ["sharp", {
    defaultShortPrefixId: "fass",
    defaultStyleId: "solid",
    styleIds: ["solid", "regular", "light", "thin"],
    futureStyleIds: [],
    defaultFontWeight: 900
  }], ["sharp-duotone", {
    defaultShortPrefixId: "fasds",
    defaultStyleId: "solid",
    styleIds: ["solid", "regular", "light", "thin"],
    futureStyleIds: [],
    defaultFontWeight: 900
  }], ["chisel", {
    defaultShortPrefixId: "facr",
    defaultStyleId: "regular",
    styleIds: ["regular"],
    futureStyleIds: [],
    defaultFontWeight: 400
  }], ["etch", {
    defaultShortPrefixId: "faes",
    defaultStyleId: "solid",
    styleIds: ["solid"],
    futureStyleIds: [],
    defaultFontWeight: 900
  }], ["graphite", {
    defaultShortPrefixId: "fagt",
    defaultStyleId: "thin",
    styleIds: ["thin"],
    futureStyleIds: [],
    defaultFontWeight: 100
  }], ["jelly", {
    defaultShortPrefixId: "fajr",
    defaultStyleId: "regular",
    styleIds: ["regular"],
    futureStyleIds: [],
    defaultFontWeight: 400
  }], ["jelly-duo", {
    defaultShortPrefixId: "fajdr",
    defaultStyleId: "regular",
    styleIds: ["regular"],
    futureStyleIds: [],
    defaultFontWeight: 400
  }], ["jelly-fill", {
    defaultShortPrefixId: "fajfr",
    defaultStyleId: "regular",
    styleIds: ["regular"],
    futureStyleIds: [],
    defaultFontWeight: 400
  }], ["mosaic", {
    defaultShortPrefixId: "fams",
    defaultStyleId: "solid",
    styleIds: ["solid"],
    futureStyleIds: [],
    defaultFontWeight: 900
  }], ["notdog", {
    defaultShortPrefixId: "fans",
    defaultStyleId: "solid",
    styleIds: ["solid"],
    futureStyleIds: [],
    defaultFontWeight: 900
  }], ["notdog-duo", {
    defaultShortPrefixId: "fands",
    defaultStyleId: "solid",
    styleIds: ["solid"],
    futureStyleIds: [],
    defaultFontWeight: 900
  }], ["pixel", {
    defaultShortPrefixId: "fapr",
    defaultStyleId: "regular",
    styleIds: ["regular"],
    futureStyleIds: [],
    defaultFontWeight: 400
  }], ["slab", {
    defaultShortPrefixId: "faslr",
    defaultStyleId: "regular",
    styleIds: ["regular"],
    futureStyleIds: [],
    defaultFontWeight: 400
  }], ["slab-duo", {
    defaultShortPrefixId: "fasldr",
    defaultStyleId: "regular",
    styleIds: ["regular"],
    futureStyleIds: [],
    defaultFontWeight: 400
  }], ["slab-press", {
    defaultShortPrefixId: "faslpr",
    defaultStyleId: "regular",
    styleIds: ["regular"],
    futureStyleIds: [],
    defaultFontWeight: 400
  }], ["slab-press-duo", {
    defaultShortPrefixId: "faslpdr",
    defaultStyleId: "regular",
    styleIds: ["regular"],
    futureStyleIds: [],
    defaultFontWeight: 400
  }], ["thumbprint", {
    defaultShortPrefixId: "fatl",
    defaultStyleId: "light",
    styleIds: ["light"],
    futureStyleIds: [],
    defaultFontWeight: 300
  }], ["utility", {
    defaultShortPrefixId: "fausb",
    defaultStyleId: "semibold",
    styleIds: ["semibold"],
    futureStyleIds: [],
    defaultFontWeight: 600
  }], ["utility-duo", {
    defaultShortPrefixId: "faudsb",
    defaultStyleId: "semibold",
    styleIds: ["semibold"],
    futureStyleIds: [],
    defaultFontWeight: 600
  }], ["utility-fill", {
    defaultShortPrefixId: "faufsb",
    defaultStyleId: "semibold",
    styleIds: ["semibold"],
    futureStyleIds: [],
    defaultFontWeight: 600
  }], ["vellum", {
    defaultShortPrefixId: "favs",
    defaultStyleId: "solid",
    styleIds: ["solid"],
    futureStyleIds: [],
    defaultFontWeight: 900
  }], ["whiteboard", {
    defaultShortPrefixId: "fawsb",
    defaultStyleId: "semibold",
    styleIds: ["semibold"],
    futureStyleIds: [],
    defaultFontWeight: 600
  }]]);
  var $l = {
    chisel: {
      regular: "facr"
    },
    classic: {
      brands: "fab",
      light: "fal",
      regular: "far",
      solid: "fas",
      thin: "fat"
    },
    duotone: {
      light: "fadl",
      regular: "fadr",
      solid: "fad",
      thin: "fadt"
    },
    etch: {
      solid: "faes"
    },
    graphite: {
      thin: "fagt"
    },
    jelly: {
      regular: "fajr"
    },
    "jelly-duo": {
      regular: "fajdr"
    },
    "jelly-fill": {
      regular: "fajfr"
    },
    mosaic: {
      solid: "fams"
    },
    notdog: {
      solid: "fans"
    },
    "notdog-duo": {
      solid: "fands"
    },
    pixel: {
      regular: "fapr"
    },
    sharp: {
      light: "fasl",
      regular: "fasr",
      solid: "fass",
      thin: "fast"
    },
    "sharp-duotone": {
      light: "fasdl",
      regular: "fasdr",
      solid: "fasds",
      thin: "fasdt"
    },
    slab: {
      regular: "faslr"
    },
    "slab-duo": {
      regular: "fasldr"
    },
    "slab-press": {
      regular: "faslpr"
    },
    "slab-press-duo": {
      regular: "faslpdr"
    },
    thumbprint: {
      light: "fatl"
    },
    utility: {
      semibold: "fausb"
    },
    "utility-duo": {
      semibold: "faudsb"
    },
    "utility-fill": {
      semibold: "faufsb"
    },
    vellum: {
      solid: "favs"
    },
    whiteboard: {
      semibold: "fawsb"
    }
  };
  var at = ["fak", "fa-kit", "fakd", "fa-kit-duotone"];
  var rt = {
    kit: {
      fak: "kit",
      "fa-kit": "kit"
    },
    "kit-duotone": {
      fakd: "kit-duotone",
      "fa-kit-duotone": "kit-duotone"
    }
  };
  var it = ["kit"];
  var H = "kit";
  var f = "kit-duotone";
  var Q = "Kit";
  var X = "Kit Duotone";
  var ht = _defineProperty(_defineProperty({}, H, Q), f, X);
  var mt = {
    kit: {
      "fa-kit": "fak"
    },
    "kit-duotone": {
      "fa-kit-duotone": "fakd"
    }
  };
  var ct = {
    "Font Awesome Kit": {
      400: "fak",
      normal: "fak"
    },
    "Font Awesome Kit Duotone": {
      400: "fakd",
      normal: "fakd"
    }
  };
  var It = {
    kit: {
      fak: "fa-kit"
    },
    "kit-duotone": {
      fakd: "fa-kit-duotone"
    }
  };
  var St = {
    kit: {
      kit: "fak"
    },
    "kit-duotone": {
      "kit-duotone": "fakd"
    }
  };
  var _jl;
  var l$1 = {
    GROUP: "duotone-group",
    SWAP_OPACITY: "swap-opacity",
    PRIMARY: "primary",
    SECONDARY: "secondary"
  };
  var n$1 = ["fa-classic", "fa-duotone", "fa-sharp", "fa-sharp-duotone", "fa-thumbprint", "fa-whiteboard", "fa-notdog", "fa-notdog-duo", "fa-chisel", "fa-etch", "fa-graphite", "fa-jelly", "fa-jelly-fill", "fa-jelly-duo", "fa-slab", "fa-slab-press", "fa-slab-press-duo", "fa-slab-duo", "fa-mosaic", "fa-pixel", "fa-vellum", "fa-utility", "fa-utility-duo", "fa-utility-fill"];
  var g$1 = "classic";
  var a$1 = "duotone";
  var m$1 = "sharp";
  var t$1 = "sharp-duotone";
  var p$1 = "chisel";
  var y$1 = "etch";
  var b$1 = "graphite";
  var w$1 = "jelly";
  var e$1 = "jelly-duo";
  var x$1 = "jelly-fill";
  var c$1 = "mosaic";
  var I$1 = "notdog";
  var o$1 = "notdog-duo";
  var v$1 = "pixel";
  var F$1 = "slab";
  var r$1 = "slab-duo";
  var S$1 = "slab-press";
  var i$1 = "slab-press-duo";
  var d$1 = "thumbprint";
  var A$1 = "utility";
  var f$1 = "utility-duo";
  var P$1 = "utility-fill";
  var u$1 = "vellum";
  var j$1 = "whiteboard";
  var B$1 = "Classic";
  var N$1 = "Duotone";
  var D$1 = "Sharp";
  var k$1 = "Sharp Duotone";
  var C$1 = "Chisel";
  var T$1 = "Etch";
  var L$1 = "Graphite";
  var W$1 = "Jelly";
  var R$1 = "Jelly Duo";
  var K$1 = "Jelly Fill";
  var U$1 = "Mosaic";
  var J$1 = "Notdog";
  var _$1 = "Notdog Duo";
  var M$1 = "Pixel";
  var E$1 = "Slab";
  var G$1 = "Slab Duo";
  var O$1 = "Slab Press";
  var V$1 = "Slab Press Duo";
  var z$1 = "Thumbprint";
  var Y$1 = "Utility";
  var $$1 = "Utility Duo";
  var q$1 = "Utility Fill";
  var H$1 = "Vellum";
  var Q$1 = "Whiteboard";
  var jl$1 = (_jl = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_jl, g$1, B$1), a$1, N$1), m$1, D$1), t$1, k$1), p$1, C$1), y$1, T$1), b$1, L$1), w$1, W$1), e$1, R$1), x$1, K$1), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_jl, c$1, U$1), I$1, J$1), o$1, _$1), v$1, M$1), F$1, E$1), r$1, G$1), S$1, O$1), i$1, V$1), d$1, z$1), A$1, Y$1), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_jl, f$1, $$1), P$1, q$1), u$1, H$1), j$1, Q$1));
  var X$1 = "kit";
  var h$1 = "kit-duotone";
  var Z$1 = "Kit";
  var ll$1 = "Kit Duotone";
  var ws = _defineProperty(_defineProperty({}, X$1, Z$1), h$1, ll$1);
  var ra = {
    classic: {
      "fa-brands": "fab",
      "fa-duotone": "fad",
      "fa-light": "fal",
      "fa-regular": "far",
      "fa-solid": "fas",
      "fa-thin": "fat"
    },
    duotone: {
      "fa-regular": "fadr",
      "fa-light": "fadl",
      "fa-thin": "fadt"
    },
    sharp: {
      "fa-solid": "fass",
      "fa-regular": "fasr",
      "fa-light": "fasl",
      "fa-thin": "fast"
    },
    "sharp-duotone": {
      "fa-solid": "fasds",
      "fa-regular": "fasdr",
      "fa-light": "fasdl",
      "fa-thin": "fasdt"
    },
    slab: {
      "fa-regular": "faslr"
    },
    "slab-press": {
      "fa-regular": "faslpr"
    },
    "slab-duo": {
      "fa-regular": "fasldr"
    },
    "slab-press-duo": {
      "fa-regular": "faslpdr"
    },
    pixel: {
      "fa-regular": "fapr"
    },
    mosaic: {
      "fa-solid": "fams"
    },
    vellum: {
      "fa-solid": "favs"
    },
    whiteboard: {
      "fa-semibold": "fawsb"
    },
    thumbprint: {
      "fa-light": "fatl"
    },
    notdog: {
      "fa-solid": "fans"
    },
    "notdog-duo": {
      "fa-solid": "fands"
    },
    etch: {
      "fa-solid": "faes"
    },
    graphite: {
      "fa-thin": "fagt"
    },
    jelly: {
      "fa-regular": "fajr"
    },
    "jelly-fill": {
      "fa-regular": "fajfr"
    },
    "jelly-duo": {
      "fa-regular": "fajdr"
    },
    chisel: {
      "fa-regular": "facr"
    },
    utility: {
      "fa-semibold": "fausb"
    },
    "utility-duo": {
      "fa-semibold": "faudsb"
    },
    "utility-fill": {
      "fa-semibold": "faufsb"
    }
  };
  var al$1 = {
    classic: ["fas", "far", "fal", "fat", "fad"],
    duotone: ["fadr", "fadl", "fadt"],
    sharp: ["fass", "fasr", "fasl", "fast"],
    "sharp-duotone": ["fasds", "fasdr", "fasdl", "fasdt"],
    slab: ["faslr"],
    "slab-press": ["faslpr"],
    "slab-duo": ["fasldr"],
    "slab-press-duo": ["faslpdr"],
    pixel: ["fapr"],
    mosaic: ["fams"],
    vellum: ["favs"],
    whiteboard: ["fawsb"],
    thumbprint: ["fatl"],
    notdog: ["fans"],
    "notdog-duo": ["fands"],
    etch: ["faes"],
    graphite: ["fagt"],
    jelly: ["fajr"],
    "jelly-fill": ["fajfr"],
    "jelly-duo": ["fajdr"],
    chisel: ["facr"],
    utility: ["fausb"],
    "utility-duo": ["faudsb"],
    "utility-fill": ["faufsb"]
  };
  var da = {
    classic: {
      fab: "fa-brands",
      fad: "fa-duotone",
      fal: "fa-light",
      far: "fa-regular",
      fas: "fa-solid",
      fat: "fa-thin"
    },
    duotone: {
      fadr: "fa-regular",
      fadl: "fa-light",
      fadt: "fa-thin"
    },
    sharp: {
      fass: "fa-solid",
      fasr: "fa-regular",
      fasl: "fa-light",
      fast: "fa-thin"
    },
    "sharp-duotone": {
      fasds: "fa-solid",
      fasdr: "fa-regular",
      fasdl: "fa-light",
      fasdt: "fa-thin"
    },
    slab: {
      faslr: "fa-regular"
    },
    "slab-press": {
      faslpr: "fa-regular"
    },
    "slab-duo": {
      fasldr: "fa-regular"
    },
    "slab-press-duo": {
      faslpdr: "fa-regular"
    },
    pixel: {
      fapr: "fa-regular"
    },
    mosaic: {
      fams: "fa-solid"
    },
    vellum: {
      favs: "fa-solid"
    },
    whiteboard: {
      fawsb: "fa-semibold"
    },
    thumbprint: {
      fatl: "fa-light"
    },
    notdog: {
      fans: "fa-solid"
    },
    "notdog-duo": {
      fands: "fa-solid"
    },
    etch: {
      faes: "fa-solid"
    },
    graphite: {
      fagt: "fa-thin"
    },
    jelly: {
      fajr: "fa-regular"
    },
    "jelly-fill": {
      fajfr: "fa-regular"
    },
    "jelly-duo": {
      fajdr: "fa-regular"
    },
    chisel: {
      facr: "fa-regular"
    },
    utility: {
      fausb: "fa-semibold"
    },
    "utility-duo": {
      faudsb: "fa-semibold"
    },
    "utility-fill": {
      faufsb: "fa-semibold"
    }
  };
  var tl = ["fa-solid", "fa-regular", "fa-light", "fa-thin", "fa-duotone", "fa-brands", "fa-semibold"];
  var ha = ["fa", "fas", "far", "fal", "fat", "fad", "fadr", "fadl", "fadt", "fab", "fass", "fasr", "fasl", "fast", "fasds", "fasdr", "fasdl", "fasdt", "faslr", "faslpr", "fasldr", "faslpdr", "fapr", "fams", "favs", "fawsb", "fatl", "fans", "fands", "faes", "fagt", "fajr", "fajfr", "fajdr", "facr", "fausb", "faudsb", "faufsb"].concat(n$1, tl);
  var el$1 = ["solid", "regular", "light", "thin", "duotone", "brands", "semibold"];
  var sl$1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var ol$1 = sl$1.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  var rl$1 = ["aw", "fw", "pull-left", "pull-right"];
  var ga = [].concat(_toConsumableArray(Object.keys(al$1)), el$1, rl$1, ["2xs", "xs", "sm", "lg", "xl", "2xl", "beat", "beat-fade", "border", "bounce", "buzz", "canvas-square", "canvas-roomy", "fade", "flip-360", "flip-both", "flip-horizontal", "flip-vertical", "flip", "float", "inverse", "jello", "layers", "layers-bottom-left", "layers-bottom-right", "layers-counter", "layers-text", "layers-top-left", "layers-top-right", "li", "pull-end", "pull-start", "pulse", "rotate-180", "rotate-270", "rotate-90", "rotate-by", "shake", "spin-pulse", "spin-reverse", "spin", "spin-snap", "spin-snap-4", "spin-snap-8", "stack-1x", "stack-2x", "stack", "swing", "ul", "wag", "width-auto", "width-fixed", l$1.GROUP, l$1.SWAP_OPACITY, l$1.PRIMARY, l$1.SECONDARY]).concat(sl$1.map(function(s2) {
    return "".concat(s2, "x");
  })).concat(ol$1.map(function(s2) {
    return "w-".concat(s2);
  }));
  var wa = {
    "Font Awesome 5 Free": {
      900: "fas",
      400: "far"
    },
    "Font Awesome 5 Pro": {
      900: "fas",
      400: "far",
      normal: "far",
      300: "fal"
    },
    "Font Awesome 5 Brands": {
      400: "fab",
      normal: "fab"
    },
    "Font Awesome 5 Duotone": {
      900: "fad"
    }
  };
  var NAMESPACE_IDENTIFIER = "___FONT_AWESOME___";
  var UNITS_IN_GRID = 16;
  var DEFAULT_CSS_PREFIX = "fa";
  var DEFAULT_REPLACEMENT_CLASS = "svg-inline--fa";
  var DATA_FA_I2SVG = "data-fa-i2svg";
  var DATA_FA_PSEUDO_ELEMENT = "data-fa-pseudo-element";
  var DATA_FA_PSEUDO_ELEMENT_PENDING = "data-fa-pseudo-element-pending";
  var DATA_PREFIX = "data-prefix";
  var DATA_ICON = "data-icon";
  var HTML_CLASS_I2SVG_BASE_CLASS = "fontawesome-i2svg";
  var MUTATION_APPROACH_ASYNC = "async";
  var TAGNAMES_TO_SKIP_FOR_PSEUDOELEMENTS = ["HTML", "HEAD", "STYLE", "SCRIPT"];
  var PSEUDO_ELEMENTS = ["::before", "::after", ":before", ":after"];
  var PRODUCTION = (function() {
    try {
      return false;
    } catch (e$$1) {
      return false;
    }
  })();
  function familyProxy(obj) {
    return new Proxy(obj, {
      get: function get2(target, prop) {
        return prop in target ? target[prop] : target[u];
      }
    });
  }
  var _PREFIX_TO_STYLE = _objectSpread2({}, rl);
  _PREFIX_TO_STYLE[u] = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, {
    "fa-duotone": "duotone"
  }), rl[u]), rt["kit"]), rt["kit-duotone"]);
  var PREFIX_TO_STYLE = familyProxy(_PREFIX_TO_STYLE);
  var _STYLE_TO_PREFIX = _objectSpread2({}, $l);
  _STYLE_TO_PREFIX[u] = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, {
    duotone: "fad"
  }), _STYLE_TO_PREFIX[u]), St["kit"]), St["kit-duotone"]);
  var STYLE_TO_PREFIX = familyProxy(_STYLE_TO_PREFIX);
  var _PREFIX_TO_LONG_STYLE = _objectSpread2({}, da);
  _PREFIX_TO_LONG_STYLE[u] = _objectSpread2(_objectSpread2({}, _PREFIX_TO_LONG_STYLE[u]), It["kit"]);
  var PREFIX_TO_LONG_STYLE = familyProxy(_PREFIX_TO_LONG_STYLE);
  var _LONG_STYLE_TO_PREFIX = _objectSpread2({}, ra);
  _LONG_STYLE_TO_PREFIX[u] = _objectSpread2(_objectSpread2({}, _LONG_STYLE_TO_PREFIX[u]), mt["kit"]);
  var LONG_STYLE_TO_PREFIX = familyProxy(_LONG_STYLE_TO_PREFIX);
  var ICON_SELECTION_SYNTAX_PATTERN = Z;
  var LAYERS_TEXT_CLASSNAME = "fa-layers-text";
  var FONT_FAMILY_PATTERN = $2;
  var _FONT_WEIGHT_TO_PREFIX = _objectSpread2({}, Al);
  var FONT_WEIGHT_TO_PREFIX = familyProxy(_FONT_WEIGHT_TO_PREFIX);
  var ATTRIBUTES_WATCHED_FOR_MUTATION = ["class", "data-prefix", "data-icon", "data-fa-transform", "data-fa-mask"];
  var DUOTONE_CLASSES = il;
  var RESERVED_CLASSES = [].concat(_toConsumableArray(it), _toConsumableArray(ga));
  var initial = WINDOW.FontAwesomeConfig || {};
  function getAttrConfig(attr) {
    var element = DOCUMENT.querySelector("script[" + attr + "]");
    if (element) {
      return element.getAttribute(attr);
    }
  }
  function coerce(val) {
    if (val === "") return true;
    if (val === "false") return false;
    if (val === "true") return true;
    return val;
  }
  if (DOCUMENT && typeof DOCUMENT.querySelector === "function") {
    attrs = [["data-family-prefix", "familyPrefix"], ["data-css-prefix", "cssPrefix"], ["data-family-default", "familyDefault"], ["data-style-default", "styleDefault"], ["data-replacement-class", "replacementClass"], ["data-auto-replace-svg", "autoReplaceSvg"], ["data-auto-add-css", "autoAddCss"], ["data-search-pseudo-elements", "searchPseudoElements"], ["data-search-pseudo-elements-warnings", "searchPseudoElementsWarnings"], ["data-search-pseudo-elements-full-scan", "searchPseudoElementsFullScan"], ["data-observe-mutations", "observeMutations"], ["data-mutate-approach", "mutateApproach"], ["data-keep-original-source", "keepOriginalSource"], ["data-measure-performance", "measurePerformance"], ["data-show-missing-icons", "showMissingIcons"]];
    attrs.forEach(function(_ref2) {
      var _ref22 = _slicedToArray(_ref2, 2), attr = _ref22[0], key = _ref22[1];
      var val = coerce(getAttrConfig(attr));
      if (val !== void 0 && val !== null) {
        initial[key] = val;
      }
    });
  }
  var attrs;
  var _default = {
    styleDefault: "solid",
    familyDefault: u,
    cssPrefix: DEFAULT_CSS_PREFIX,
    replacementClass: DEFAULT_REPLACEMENT_CLASS,
    autoReplaceSvg: true,
    autoAddCss: true,
    searchPseudoElements: false,
    searchPseudoElementsWarnings: true,
    searchPseudoElementsFullScan: false,
    observeMutations: true,
    mutateApproach: "async",
    keepOriginalSource: true,
    measurePerformance: false,
    showMissingIcons: true
  };
  if (initial.familyPrefix) {
    initial.cssPrefix = initial.familyPrefix;
  }
  var _config = _objectSpread2(_objectSpread2({}, _default), initial);
  if (!_config.autoReplaceSvg) _config.observeMutations = false;
  var config = {};
  Object.keys(_default).forEach(function(key) {
    Object.defineProperty(config, key, {
      enumerable: true,
      set: function set2(val) {
        _config[key] = val;
        _onChangeCb.forEach(function(cb) {
          return cb(config);
        });
      },
      get: function get2() {
        return _config[key];
      }
    });
  });
  Object.defineProperty(config, "familyPrefix", {
    enumerable: true,
    set: function set(val) {
      _config.cssPrefix = val;
      _onChangeCb.forEach(function(cb) {
        return cb(config);
      });
    },
    get: function get() {
      return _config.cssPrefix;
    }
  });
  WINDOW.FontAwesomeConfig = config;
  var _onChangeCb = [];
  function onChange(cb) {
    _onChangeCb.push(cb);
    return function() {
      _onChangeCb.splice(_onChangeCb.indexOf(cb), 1);
    };
  }
  var d$2 = UNITS_IN_GRID;
  var meaninglessTransform = {
    size: 16,
    x: 0,
    y: 0,
    rotate: 0,
    flipX: false,
    flipY: false
  };
  function insertCss(css2) {
    if (!css2 || !IS_DOM) {
      return;
    }
    var style = DOCUMENT.createElement("style");
    style.setAttribute("type", "text/css");
    style.innerHTML = css2;
    var headChildren = DOCUMENT.head.childNodes;
    var beforeChild = null;
    for (var i2 = headChildren.length - 1; i2 > -1; i2--) {
      var child = headChildren[i2];
      var tagName = (child.tagName || "").toUpperCase();
      if (["STYLE", "LINK"].indexOf(tagName) > -1) {
        beforeChild = child;
      }
    }
    DOCUMENT.head.insertBefore(style, beforeChild);
    return css2;
  }
  var idPool = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  function nextUniqueId() {
    var size = 12;
    var id = "";
    while (size-- > 0) {
      id += idPool[Math.random() * 62 | 0];
    }
    return id;
  }
  function toArray(obj) {
    var array = [];
    for (var i2 = (obj || []).length >>> 0; i2--; ) {
      array[i2] = obj[i2];
    }
    return array;
  }
  function classArray(node) {
    if (node.classList) {
      return toArray(node.classList);
    } else {
      return (node.getAttribute("class") || "").split(" ").filter(function(i2) {
        return i2;
      });
    }
  }
  function htmlEscape(str) {
    return "".concat(str).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function joinAttributes(attributes) {
    return Object.keys(attributes || {}).reduce(function(acc, attributeName) {
      return acc + "".concat(attributeName, '="').concat(htmlEscape(attributes[attributeName]), '" ');
    }, "").trim();
  }
  function joinStyles(styles2) {
    return Object.keys(styles2 || {}).reduce(function(acc, styleName) {
      return acc + "".concat(styleName, ": ").concat(styles2[styleName].trim(), ";");
    }, "");
  }
  function transformIsMeaningful(transform) {
    return transform.size !== meaninglessTransform.size || transform.x !== meaninglessTransform.x || transform.y !== meaninglessTransform.y || transform.rotate !== meaninglessTransform.rotate || transform.flipX || transform.flipY;
  }
  function transformForSvg(_ref2) {
    var transform = _ref2.transform, containerWidth = _ref2.containerWidth, iconWidth = _ref2.iconWidth;
    var outer = {
      transform: "translate(".concat(containerWidth / 2, " 256)")
    };
    var innerTranslate = "translate(".concat(transform.x * 32, ", ").concat(transform.y * 32, ") ");
    var innerScale = "scale(".concat(transform.size / 16 * (transform.flipX ? -1 : 1), ", ").concat(transform.size / 16 * (transform.flipY ? -1 : 1), ") ");
    var innerRotate = "rotate(".concat(transform.rotate, " 0 0)");
    var inner = {
      transform: "".concat(innerTranslate, " ").concat(innerScale, " ").concat(innerRotate)
    };
    var path = {
      transform: "translate(".concat(iconWidth / 2 * -1, " -256)")
    };
    return {
      outer,
      inner,
      path
    };
  }
  function transformForCss(_ref2) {
    var transform = _ref2.transform, _ref2$width = _ref2.width, width = _ref2$width === void 0 ? UNITS_IN_GRID : _ref2$width, _ref2$height = _ref2.height, height = _ref2$height === void 0 ? UNITS_IN_GRID : _ref2$height, _ref2$startCentered = _ref2.startCentered, startCentered = _ref2$startCentered === void 0 ? false : _ref2$startCentered;
    var val = "";
    if (startCentered && IS_IE) {
      val += "translate(".concat(transform.x / d$2 - width / 2, "em, ").concat(transform.y / d$2 - height / 2, "em) ");
    } else if (startCentered) {
      val += "translate(calc(-50% + ".concat(transform.x / d$2, "em), calc(-50% + ").concat(transform.y / d$2, "em)) ");
    } else {
      val += "translate(".concat(transform.x / d$2, "em, ").concat(transform.y / d$2, "em) ");
    }
    val += "scale(".concat(transform.size / d$2 * (transform.flipX ? -1 : 1), ", ").concat(transform.size / d$2 * (transform.flipY ? -1 : 1), ") ");
    val += "rotate(".concat(transform.rotate, "deg) ");
    return val;
  }
  var baseStyles = ":root, :host {\n  --fa-font-solid: normal 900 1em/1 'Font Awesome 7 Free';\n  --fa-font-regular: normal 400 1em/1 'Font Awesome 7 Free';\n  --fa-font-light: normal 300 1em/1 'Font Awesome 7 Pro';\n  --fa-font-thin: normal 100 1em/1 'Font Awesome 7 Pro';\n  --fa-font-duotone: normal 900 1em/1 'Font Awesome 7 Duotone';\n  --fa-font-duotone-regular: normal 400 1em/1 'Font Awesome 7 Duotone';\n  --fa-font-duotone-light: normal 300 1em/1 'Font Awesome 7 Duotone';\n  --fa-font-duotone-thin: normal 100 1em/1 'Font Awesome 7 Duotone';\n  --fa-font-brands: normal 400 1em/1 'Font Awesome 7 Brands';\n  --fa-font-sharp-solid: normal 900 1em/1 'Font Awesome 7 Sharp';\n  --fa-font-sharp-regular: normal 400 1em/1 'Font Awesome 7 Sharp';\n  --fa-font-sharp-light: normal 300 1em/1 'Font Awesome 7 Sharp';\n  --fa-font-sharp-thin: normal 100 1em/1 'Font Awesome 7 Sharp';\n  --fa-font-sharp-duotone-solid: normal 900 1em/1 'Font Awesome 7 Sharp Duotone';\n  --fa-font-sharp-duotone-regular: normal 400 1em/1 'Font Awesome 7 Sharp Duotone';\n  --fa-font-sharp-duotone-light: normal 300 1em/1 'Font Awesome 7 Sharp Duotone';\n  --fa-font-sharp-duotone-thin: normal 100 1em/1 'Font Awesome 7 Sharp Duotone';\n  --fa-font-slab-regular: normal 400 1em/1 'Font Awesome 7 Slab';\n  --fa-font-slab-press-regular: normal 400 1em/1 'Font Awesome 7 Slab Press';\n  --fa-font-slab-duo-regular: normal 400 1em/1 'Font Awesome 7 Slab Duo';\n  --fa-font-slab-press-duo-regular: normal 400 1em/1 'Font Awesome 7 Slab Press Duo';\n  --fa-font-pixel-regular: normal 400 1em/1 'Font Awesome 7 Pixel';\n  --fa-font-mosaic-solid: normal 900 1em/1 'Font Awesome 7 Mosaic';\n  --fa-font-vellum-solid: normal 900 1em/1 'Font Awesome 7 Vellum';\n  --fa-font-whiteboard-semibold: normal 600 1em/1 'Font Awesome 7 Whiteboard';\n  --fa-font-thumbprint-light: normal 300 1em/1 'Font Awesome 7 Thumbprint';\n  --fa-font-notdog-solid: normal 900 1em/1 'Font Awesome 7 Notdog';\n  --fa-font-notdog-duo-solid: normal 900 1em/1 'Font Awesome 7 Notdog Duo';\n  --fa-font-etch-solid: normal 900 1em/1 'Font Awesome 7 Etch';\n  --fa-font-graphite-thin: normal 100 1em/1 'Font Awesome 7 Graphite';\n  --fa-font-jelly-regular: normal 400 1em/1 'Font Awesome 7 Jelly';\n  --fa-font-jelly-fill-regular: normal 400 1em/1 'Font Awesome 7 Jelly Fill';\n  --fa-font-jelly-duo-regular: normal 400 1em/1 'Font Awesome 7 Jelly Duo';\n  --fa-font-chisel-regular: normal 400 1em/1 'Font Awesome 7 Chisel';\n  --fa-font-utility-semibold: normal 600 1em/1 'Font Awesome 7 Utility';\n  --fa-font-utility-duo-semibold: normal 600 1em/1 'Font Awesome 7 Utility Duo';\n  --fa-font-utility-fill-semibold: normal 600 1em/1 'Font Awesome 7 Utility Fill';\n}\n\n.svg-inline--fa {\n  box-sizing: content-box;\n  display: var(--fa-display, inline-block);\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n  width: var(--fa-width, 1.25em);\n}\n.svg-inline--fa.fa-2xs {\n  vertical-align: 0.1em;\n}\n.svg-inline--fa.fa-xs {\n  vertical-align: 0em;\n}\n.svg-inline--fa.fa-sm {\n  vertical-align: -0.0714285714em;\n}\n.svg-inline--fa.fa-lg {\n  vertical-align: -0.2em;\n}\n.svg-inline--fa.fa-xl {\n  vertical-align: -0.25em;\n}\n.svg-inline--fa.fa-2xl {\n  vertical-align: -0.3125em;\n}\n.svg-inline--fa.fa-pull-left,\n.svg-inline--fa .fa-pull-start {\n  float: inline-start;\n  margin-inline-end: var(--fa-pull-margin, 0.3em);\n}\n.svg-inline--fa.fa-pull-right,\n.svg-inline--fa .fa-pull-end {\n  float: inline-end;\n  margin-inline-start: var(--fa-pull-margin, 0.3em);\n}\n.svg-inline--fa.fa-li {\n  width: var(--fa-li-width, 2em);\n  inset-inline-start: calc(-1 * var(--fa-li-width, 2em));\n  inset-block-start: 0.25em; /* syncing vertical alignment with Web Font rendering */\n}\n\n.fa-layers-counter, .fa-layers-text {\n  display: inline-block;\n  position: absolute;\n  text-align: center;\n}\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -0.125em;\n  width: var(--fa-width, 1.25em);\n}\n.fa-layers .svg-inline--fa {\n  inset: 0;\n  margin: auto;\n  position: absolute;\n  transform-origin: center center;\n}\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  transform-origin: center center;\n}\n\n.fa-layers-counter {\n  background-color: var(--fa-counter-background-color, #ff253a);\n  border-radius: var(--fa-counter-border-radius, 1em);\n  box-sizing: border-box;\n  color: var(--fa-inverse, #fff);\n  line-height: var(--fa-counter-line-height, 1);\n  max-width: var(--fa-counter-max-width, 5em);\n  min-width: var(--fa-counter-min-width, 1.5em);\n  overflow: hidden;\n  padding: var(--fa-counter-padding, 0.25em 0.5em);\n  right: var(--fa-right, 0);\n  text-overflow: ellipsis;\n  top: var(--fa-top, 0);\n  transform: scale(var(--fa-counter-scale, 0.25));\n  transform-origin: top right;\n}\n\n.fa-layers-bottom-right {\n  bottom: var(--fa-bottom, 0);\n  right: var(--fa-right, 0);\n  top: auto;\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: bottom right;\n}\n\n.fa-layers-bottom-left {\n  bottom: var(--fa-bottom, 0);\n  left: var(--fa-left, 0);\n  right: auto;\n  top: auto;\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: bottom left;\n}\n\n.fa-layers-top-right {\n  top: var(--fa-top, 0);\n  right: var(--fa-right, 0);\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: top right;\n}\n\n.fa-layers-top-left {\n  left: var(--fa-left, 0);\n  right: auto;\n  top: var(--fa-top, 0);\n  transform: scale(var(--fa-layers-scale, 0.25));\n  transform-origin: top left;\n}\n\n.fa-1x {\n  font-size: 1em;\n}\n\n.fa-2x {\n  font-size: 2em;\n}\n\n.fa-3x {\n  font-size: 3em;\n}\n\n.fa-4x {\n  font-size: 4em;\n}\n\n.fa-5x {\n  font-size: 5em;\n}\n\n.fa-6x {\n  font-size: 6em;\n}\n\n.fa-7x {\n  font-size: 7em;\n}\n\n.fa-8x {\n  font-size: 8em;\n}\n\n.fa-9x {\n  font-size: 9em;\n}\n\n.fa-10x {\n  font-size: 10em;\n}\n\n.fa-2xs {\n  font-size: calc(10 / 16 * 1em); /* converts a 10px size into an em-based value that's relative to the scale's 16px base */\n  line-height: calc(1 / 10 * 1em); /* sets the line-height of the icon back to that of it's parent */\n  vertical-align: calc((6 / 10 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */\n}\n\n.fa-xs {\n  font-size: calc(12 / 16 * 1em); /* converts a 12px size into an em-based value that's relative to the scale's 16px base */\n  line-height: calc(1 / 12 * 1em); /* sets the line-height of the icon back to that of it's parent */\n  vertical-align: calc((6 / 12 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */\n}\n\n.fa-sm {\n  font-size: calc(14 / 16 * 1em); /* converts a 14px size into an em-based value that's relative to the scale's 16px base */\n  line-height: calc(1 / 14 * 1em); /* sets the line-height of the icon back to that of it's parent */\n  vertical-align: calc((6 / 14 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */\n}\n\n.fa-lg {\n  font-size: calc(20 / 16 * 1em); /* converts a 20px size into an em-based value that's relative to the scale's 16px base */\n  line-height: calc(1 / 20 * 1em); /* sets the line-height of the icon back to that of it's parent */\n  vertical-align: calc((6 / 20 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */\n}\n\n.fa-xl {\n  font-size: calc(24 / 16 * 1em); /* converts a 24px size into an em-based value that's relative to the scale's 16px base */\n  line-height: calc(1 / 24 * 1em); /* sets the line-height of the icon back to that of it's parent */\n  vertical-align: calc((6 / 24 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */\n}\n\n.fa-2xl {\n  font-size: calc(32 / 16 * 1em); /* converts a 32px size into an em-based value that's relative to the scale's 16px base */\n  line-height: calc(1 / 32 * 1em); /* sets the line-height of the icon back to that of it's parent */\n  vertical-align: calc((6 / 32 - 0.375) * 1em); /* vertically centers the icon taking into account the surrounding text's descender */\n}\n\n.fa-width-auto {\n  --fa-width: auto;\n}\n\n.fa-fw,\n.fa-width-fixed {\n  --fa-width: 1.25em;\n}\n\n.fa-canvas-square {\n  padding-block: 0.125em;\n  margin-block-end: -0.125em;\n}\n\n.fa-canvas-roomy {\n  padding-block: 0.25em;\n  padding-inline: 0.125em;\n  margin-block-end: -0.25em;\n  box-sizing: content-box;\n}\n\n.fa-ul {\n  list-style-type: none;\n  margin-inline-start: var(--fa-li-margin, 2.5em);\n  padding-inline-start: 0;\n}\n.fa-ul > li {\n  position: relative;\n}\n\n.fa-li {\n  inset-inline-start: calc(-1 * var(--fa-li-width, 2em));\n  position: absolute;\n  text-align: center;\n  width: var(--fa-li-width, 2em);\n  line-height: inherit;\n}\n\n/* Heads Up: Bordered Icons will not be supported in the future!\n  - This feature will be deprecated in the next major release of Font Awesome (v8)!\n  - You may continue to use it in this version *v7), but it will not be supported in Font Awesome v8.\n*/\n/* Notes:\n* --@{v.$css-prefix}-border-width = 1/16 by default (to render as ~1px based on a 16px default font-size)\n* --@{v.$css-prefix}-border-padding =\n  ** 3/16 for vertical padding (to give ~2px of vertical whitespace around an icon considering it's vertical alignment)\n  ** 4/16 for horizontal padding (to give ~4px of horizontal whitespace around an icon)\n*/\n.fa-border {\n  border-color: var(--fa-border-color, #eee);\n  border-radius: var(--fa-border-radius, 0.1em);\n  border-style: var(--fa-border-style, solid);\n  border-width: var(--fa-border-width, 0.0625em);\n  box-sizing: var(--fa-border-box-sizing, content-box);\n  padding: var(--fa-border-padding, 0.1875em 0.25em);\n}\n\n.fa-pull-left,\n.fa-pull-start {\n  float: inline-start;\n  margin-inline-end: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-pull-right,\n.fa-pull-end {\n  float: inline-end;\n  margin-inline-start: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-beat {\n  animation-name: fa-beat;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-bounce {\n  animation-name: fa-bounce;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));\n}\n\n.fa-fade {\n  animation-name: fa-fade;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-beat-fade {\n  animation-name: fa-beat-fade;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-flip {\n  animation-name: fa-flip;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1.5s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-flip-360 {\n  animation-name: fa-flip-360;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-shake {\n  animation-name: fa-shake;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 0.75s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-spin {\n  animation-name: fa-spin;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 2s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin-reverse {\n  --fa-animation-direction: reverse;\n}\n\n.fa-pulse,\n.fa-spin-pulse {\n  animation-name: fa-spin;\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, steps(8));\n}\n\n.fa-spin-snap {\n  animation-name: fa-spin-snap;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 3s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin-snap-4 {\n  animation-name: fa-spin-snap-4;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 2.4s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin-snap-8 {\n  animation-name: fa-spin-snap-8;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 4s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-buzz {\n  animation-name: fa-buzz;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 0.6s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-wag {\n  animation-name: fa-wag;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 0.9s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, ease-out);\n  transform-origin: bottom center;\n}\n\n.fa-float {\n  animation-name: fa-float;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 3s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, ease-in-out);\n  will-change: transform;\n}\n\n.fa-swing {\n  animation-name: fa-swing;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 1.2s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, ease-out);\n  transform-origin: top center;\n}\n\n.fa-jello {\n  animation-name: fa-jello;\n  animation-delay: var(--fa-animation-delay, 0s);\n  animation-direction: var(--fa-animation-direction, normal);\n  animation-duration: var(--fa-animation-duration, 0.9s);\n  animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  animation-timing-function: var(--fa-animation-timing, ease-out);\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .fa-beat,\n  .fa-bounce,\n  .fa-fade,\n  .fa-beat-fade,\n  .fa-flip,\n  .fa-flip-360,\n  .fa-pulse,\n  .fa-shake,\n  .fa-spin,\n  .fa-spin-pulse,\n  .fa-buzz,\n  .fa-float,\n  .fa-jello,\n  .fa-spin-snap,\n  .fa-spin-snap-4,\n  .fa-spin-snap-8,\n  .fa-swing,\n  .fa-wag {\n    animation: none !important;\n    transition: none !important;\n  }\n}\n@keyframes fa-beat {\n  0% {\n    transform: scale(1);\n  }\n  25% {\n    transform: scale(calc(1.25 * var(--fa-beat-scale, 1.25)));\n  }\n  45% {\n    transform: scale(calc(1.22 * var(--fa-beat-scale, 1.22)));\n  }\n  65% {\n    transform: scale(calc(1.25 * var(--fa-beat-scale, 1.25)));\n  }\n  90% {\n    transform: scale(1);\n  }\n}\n@keyframes fa-bounce {\n  0% {\n    transform: scale(1, 1) translateY(0);\n    animation-timing-function: var(--fa-animation-timing);\n  }\n  14% {\n    transform: scale(var(--fa-bounce-start-scale-x, 1.06), var(--fa-bounce-start-scale-y, 0.94)) translateY(var(--fa-bounce-anticipation, 3px));\n    animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);\n  }\n  32% {\n    transform: scale(var(--fa-bounce-jump-scale-x, 0.94), var(--fa-bounce-jump-scale-y, 1.12)) translateY(calc(-1 * var(--fa-bounce-height, 0.5em)));\n    animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);\n  }\n  52% {\n    transform: scale(1, 1) translateY(calc(-1 * var(--fa-bounce-height, 0.5em) * 1.1));\n    animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);\n  }\n  70% {\n    transform: scale(var(--fa-bounce-land-scale-x, 1.06), var(--fa-bounce-land-scale-y, 0.92)) translateY(0);\n    animation-timing-function: cubic-bezier(0.33, 0.33, 0.66, 1);\n  }\n  85% {\n    transform: scale(0.98, 1.04) translateY(calc(-2px * var(--fa-bounce-rebound, 1)));\n    animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);\n  }\n  100% {\n    transform: scale(1, 1) translateY(0);\n  }\n}\n@keyframes fa-fade {\n  0% {\n    opacity: 1;\n    transform: scale(1);\n    animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);\n  }\n  40% {\n    opacity: var(--fa-fade-opacity, 0.4);\n    transform: scale(0.98);\n    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);\n  }\n  100% {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n@keyframes fa-beat-fade {\n  0% {\n    opacity: var(--fa-beat-fade-opacity, 0.4);\n    transform: scale(1);\n    animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);\n  }\n  25% {\n    opacity: calc(var(--fa-beat-fade-opacity, 0.4) + 0.4);\n    transform: scale(var(--fa-beat-fade-scale, 1.28));\n    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);\n  }\n  45% {\n    opacity: 1;\n    transform: scale(var(--fa-beat-fade-scale, 1.25));\n    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  }\n  65% {\n    opacity: calc(var(--fa-beat-fade-opacity, 0.4) + 0.4);\n    transform: scale(var(--fa-beat-fade-scale, 1.28));\n    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);\n  }\n  100% {\n    opacity: var(--fa-beat-fade-opacity, 0.4);\n    transform: scale(1);\n  }\n}\n@keyframes fa-flip {\n  0% {\n    transform: perspective(2em) scale(1) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), 0deg);\n    animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);\n  }\n  8% {\n    transform: perspective(2em) scale(var(--fa-flip-anticipation-scale, 0.95)) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), 0deg);\n    animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);\n  }\n  35% {\n    transform: perspective(2em) scale(1) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), calc(var(--fa-flip-angle, -360deg) * 0.6));\n    animation-timing-function: linear;\n  }\n  65% {\n    transform: perspective(2em) scale(1) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), calc(var(--fa-flip-angle, -360deg) * 0.5));\n    animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);\n  }\n  92% {\n    transform: perspective(2em) scale(1) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), calc(var(--fa-flip-angle, -360deg) * var(--fa-flip-overshoot, 1.04)));\n    animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);\n  }\n  100% {\n    transform: perspective(2em) scale(1) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -360deg));\n  }\n}\n@keyframes fa-flip-360 {\n  0% {\n    transform: perspective(2em) scale(1) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), 0deg);\n    animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);\n  }\n  8% {\n    transform: perspective(2em) scale(var(--fa-flip-anticipation-scale, 0.95)) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), 0deg);\n    animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);\n  }\n  50% {\n    transform: perspective(2em) scale(1) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), calc(var(--fa-flip-angle, -360deg) * 0.6));\n    animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);\n  }\n  80% {\n    transform: perspective(2em) scale(1) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), calc(var(--fa-flip-angle, -360deg) * var(--fa-flip-overshoot, 1.04)));\n    animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);\n  }\n  100% {\n    transform: perspective(2em) scale(1) rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -360deg));\n  }\n}\n@keyframes fa-shake {\n  0% {\n    transform: rotate(0deg);\n    animation-timing-function: cubic-bezier(0.2, 0, 0.8, 1);\n  }\n  8% {\n    transform: rotate(35deg) translateX(1px);\n    animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);\n  }\n  20% {\n    transform: rotate(-22deg) translateX(-1px);\n    animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);\n  }\n  35% {\n    transform: rotate(15deg) translateX(1px);\n    animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);\n  }\n  50% {\n    transform: rotate(-9deg);\n    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);\n  }\n  65% {\n    transform: rotate(5deg);\n    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);\n  }\n  78% {\n    transform: rotate(-3deg);\n    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);\n  }\n  90% {\n    transform: rotate(1deg);\n    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  }\n  100% {\n    transform: rotate(0deg);\n  }\n}\n@keyframes fa-spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n@keyframes fa-spin-snap {\n  0% {\n    transform: rotate(0deg);\n    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);\n  }\n  12% {\n    transform: rotate(60deg);\n    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);\n  }\n  16.67% {\n    transform: rotate(60deg);\n    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);\n  }\n  28.67% {\n    transform: rotate(120deg);\n    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);\n  }\n  33.33% {\n    transform: rotate(120deg);\n    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);\n  }\n  45.33% {\n    transform: rotate(180deg);\n    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);\n  }\n  50% {\n    transform: rotate(180deg);\n    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);\n  }\n  62% {\n    transform: rotate(240deg);\n    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);\n  }\n  66.67% {\n    transform: rotate(240deg);\n    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);\n  }\n  78.67% {\n    transform: rotate(300deg);\n    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);\n  }\n  83.33% {\n    transform: rotate(300deg);\n    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);\n  }\n  95.33% {\n    transform: rotate(360deg);\n    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n@keyframes fa-spin-snap-4 {\n  0% {\n    transform: rotate(0deg);\n    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);\n  }\n  15% {\n    transform: rotate(90deg);\n    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);\n  }\n  25% {\n    transform: rotate(90deg);\n    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);\n  }\n  40% {\n    transform: rotate(180deg);\n    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);\n  }\n  50% {\n    transform: rotate(180deg);\n    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);\n  }\n  65% {\n    transform: rotate(270deg);\n    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);\n  }\n  75% {\n    transform: rotate(270deg);\n    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);\n  }\n  90% {\n    transform: rotate(360deg);\n    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n@keyframes fa-spin-snap-8 {\n  0% {\n    transform: rotate(0deg);\n    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);\n  }\n  9% {\n    transform: rotate(45deg);\n    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);\n  }\n  12.5% {\n    transform: rotate(45deg);\n    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);\n  }\n  21.5% {\n    transform: rotate(90deg);\n    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);\n  }\n  25% {\n    transform: rotate(90deg);\n    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);\n  }\n  34% {\n    transform: rotate(135deg);\n    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);\n  }\n  37.5% {\n    transform: rotate(135deg);\n    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);\n  }\n  46.5% {\n    transform: rotate(180deg);\n    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);\n  }\n  50% {\n    transform: rotate(180deg);\n    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);\n  }\n  59% {\n    transform: rotate(225deg);\n    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);\n  }\n  62.5% {\n    transform: rotate(225deg);\n    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);\n  }\n  71.5% {\n    transform: rotate(270deg);\n    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);\n  }\n  75% {\n    transform: rotate(270deg);\n    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);\n  }\n  84% {\n    transform: rotate(315deg);\n    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);\n  }\n  87.5% {\n    transform: rotate(315deg);\n    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);\n  }\n  96.5% {\n    transform: rotate(360deg);\n    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n@keyframes fa-buzz {\n  0% {\n    transform: translateX(0) rotate(0deg);\n    animation-timing-function: cubic-bezier(0.1, 0, 0.9, 1);\n  }\n  5% {\n    transform: translateX(var(--fa-buzz-distance, 4px)) rotate(0.5deg);\n  }\n  10% {\n    transform: translateX(calc(-1 * var(--fa-buzz-distance, 4px))) rotate(-0.5deg);\n  }\n  15% {\n    transform: translateX(var(--fa-buzz-distance, 4px)) rotate(0.3deg);\n  }\n  20% {\n    transform: translateX(calc(-1 * var(--fa-buzz-distance, 4px))) rotate(-0.3deg);\n  }\n  25% {\n    transform: translateX(calc(var(--fa-buzz-distance, 4px) * 0.7)) rotate(0.2deg);\n  }\n  30% {\n    transform: translateX(calc(-1 * var(--fa-buzz-distance, 4px) * 0.7)) rotate(-0.2deg);\n  }\n  35% {\n    transform: translateX(calc(var(--fa-buzz-distance, 4px) * 0.4)) rotate(0.1deg);\n  }\n  40% {\n    transform: translateX(0) rotate(0deg);\n  }\n  100% {\n    transform: translateX(0) rotate(0deg);\n  }\n}\n@keyframes fa-wag {\n  0% {\n    transform: rotate(0deg);\n    animation-timing-function: cubic-bezier(0.2, 0, 0.6, 1);\n  }\n  12% {\n    transform: rotate(var(--fa-wag-angle, 12deg));\n    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  }\n  24% {\n    transform: rotate(2deg);\n    animation-timing-function: cubic-bezier(0.2, 0, 0.6, 1);\n  }\n  36% {\n    transform: rotate(calc(var(--fa-wag-angle, 12deg) * 0.85));\n    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  }\n  48% {\n    transform: rotate(1deg);\n    animation-timing-function: cubic-bezier(0.2, 0, 0.6, 1);\n  }\n  58% {\n    transform: rotate(calc(var(--fa-wag-angle, 12deg) * 0.6));\n    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  }\n  68% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(0deg);\n  }\n}\n@keyframes fa-float {\n  0% {\n    transform: translateY(0) translateX(0) rotate(0deg) scale(var(--fa-float-squash-x, 1.02), var(--fa-float-squash-y, 0.98));\n    animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);\n  }\n  15% {\n    transform: translateY(calc(-0.4 * var(--fa-float-height, 6px))) translateX(var(--fa-float-drift, 1px)) rotate(var(--fa-float-tilt, 1deg)) scale(1, 1);\n    animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);\n  }\n  35% {\n    transform: translateY(calc(-1 * var(--fa-float-height, 6px))) translateX(0) rotate(0deg) scale(var(--fa-float-stretch-x, 0.98), var(--fa-float-stretch-y, 1.03));\n    animation-timing-function: cubic-bezier(0.5, 0, 0.5, 0);\n  }\n  50% {\n    transform: translateY(calc(-0.92 * var(--fa-float-height, 6px))) translateX(calc(-0.5 * var(--fa-float-drift, 1px))) rotate(calc(-0.5 * var(--fa-float-tilt, 1deg))) scale(0.995, 1.01);\n    animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);\n  }\n  70% {\n    transform: translateY(calc(-0.3 * var(--fa-float-height, 6px))) translateX(calc(-1 * var(--fa-float-drift, 1px))) rotate(calc(-1 * var(--fa-float-tilt, 1deg))) scale(1, 1);\n    animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);\n  }\n  90% {\n    transform: translateY(calc(0.05 * var(--fa-float-height, 6px))) translateX(0) rotate(0deg) scale(var(--fa-float-squash-x, 1.02), var(--fa-float-squash-y, 0.98));\n    animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);\n  }\n  100% {\n    transform: translateY(0) translateX(0) rotate(0deg) scale(var(--fa-float-squash-x, 1.02), var(--fa-float-squash-y, 0.98));\n  }\n}\n@keyframes fa-swing {\n  0% {\n    transform: rotate(0deg);\n    animation-timing-function: cubic-bezier(0.2, 0, 0.8, 1);\n  }\n  8% {\n    transform: rotate(var(--fa-swing-angle, 22deg));\n    animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);\n  }\n  18% {\n    transform: rotate(calc(-1 * var(--fa-swing-angle, 22deg) * 0.85));\n    animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);\n  }\n  28% {\n    transform: rotate(calc(var(--fa-swing-angle, 22deg) * 0.65));\n    animation-timing-function: cubic-bezier(0.35, 0, 0.65, 1);\n  }\n  38% {\n    transform: rotate(calc(-1 * var(--fa-swing-angle, 22deg) * 0.45));\n    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);\n  }\n  48% {\n    transform: rotate(calc(var(--fa-swing-angle, 22deg) * 0.25));\n    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);\n  }\n  56% {\n    transform: rotate(calc(-1 * var(--fa-swing-angle, 22deg) * 0.1));\n    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);\n  }\n  64% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(0deg);\n  }\n}\n@keyframes fa-jello {\n  0% {\n    transform: scale(1, 1);\n    animation-timing-function: cubic-bezier(0.2, 0, 0.8, 1);\n  }\n  12% {\n    transform: scale(var(--fa-jello-scale-x, 1.15), calc(2 - var(--fa-jello-scale-x, 1.15)));\n    animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);\n  }\n  24% {\n    transform: scale(calc(2 - var(--fa-jello-scale-y, 1.12)), var(--fa-jello-scale-y, 1.12));\n    animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);\n  }\n  36% {\n    transform: scale(calc(1 + (var(--fa-jello-scale-x, 1.15) - 1) * 0.5), calc(2 - (1 + (var(--fa-jello-scale-x, 1.15) - 1) * 0.5)));\n    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);\n  }\n  48% {\n    transform: scale(calc(2 - (1 + (var(--fa-jello-scale-y, 1.12) - 1) * 0.3)), calc(1 + (var(--fa-jello-scale-y, 1.12) - 1) * 0.3));\n    animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);\n  }\n  58% {\n    transform: scale(1.02, 0.98);\n    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  }\n  68% {\n    transform: scale(1, 1);\n  }\n  100% {\n    transform: scale(1, 1);\n  }\n}\n.fa-rotate-90 {\n  transform: rotate(90deg);\n}\n\n.fa-rotate-180 {\n  transform: rotate(180deg);\n}\n\n.fa-rotate-270 {\n  transform: rotate(270deg);\n}\n\n.fa-flip-horizontal {\n  transform: scale(-1, 1);\n}\n\n.fa-flip-vertical {\n  transform: scale(1, -1);\n}\n\n.fa-flip-both,\n.fa-flip-horizontal.fa-flip-vertical {\n  transform: scale(-1, -1);\n}\n\n.fa-rotate-by {\n  transform: rotate(var(--fa-rotate-angle, 0));\n}\n\n.svg-inline--fa .fa-primary {\n  fill: var(--fa-primary-color, currentColor);\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa .fa-secondary {\n  fill: var(--fa-secondary-color, currentColor);\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-primary {\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-secondary {\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa mask .fa-primary,\n.svg-inline--fa mask .fa-secondary {\n  fill: black;\n}\n\n.svg-inline--fa.fa-inverse {\n  fill: var(--fa-inverse, #fff);\n}\n\n.fa-stack {\n  display: inline-block;\n  height: 2em;\n  line-height: 2em;\n  position: relative;\n  vertical-align: middle;\n  width: 2.5em;\n}\n\n.fa-inverse {\n  color: var(--fa-inverse, #fff);\n}\n\n.svg-inline--fa.fa-stack-1x {\n  --fa-width: 1.25em;\n  height: 1em;\n  width: var(--fa-width);\n}\n.svg-inline--fa.fa-stack-2x {\n  --fa-width: 2.5em;\n  height: 2em;\n  width: var(--fa-width);\n}\n\n.fa-stack-1x,\n.fa-stack-2x {\n  inset: 0;\n  margin: auto;\n  position: absolute;\n  z-index: var(--fa-stack-z-index, auto);\n}";
  function css() {
    var dcp = DEFAULT_CSS_PREFIX;
    var drc = DEFAULT_REPLACEMENT_CLASS;
    var fp = config.cssPrefix;
    var rc = config.replacementClass;
    var s2 = baseStyles;
    if (fp !== dcp || rc !== drc) {
      var dPatt = new RegExp("\\.".concat(dcp, "\\-"), "g");
      var customPropPatt = new RegExp("\\--".concat(dcp, "\\-"), "g");
      var rPatt = new RegExp("\\.".concat(drc), "g");
      s2 = s2.replace(dPatt, ".".concat(fp, "-")).replace(customPropPatt, "--".concat(fp, "-")).replace(rPatt, ".".concat(rc));
    }
    return s2;
  }
  var _cssInserted = false;
  function ensureCss() {
    if (config.autoAddCss && !_cssInserted) {
      insertCss(css());
      _cssInserted = true;
    }
  }
  var InjectCSS = {
    mixout: function mixout() {
      return {
        dom: {
          css,
          insertCss: ensureCss
        }
      };
    },
    hooks: function hooks() {
      return {
        beforeDOMElementCreation: function beforeDOMElementCreation() {
          ensureCss();
        },
        beforeI2svg: function beforeI2svg() {
          ensureCss();
        }
      };
    }
  };
  var w$2 = WINDOW || {};
  if (!w$2[NAMESPACE_IDENTIFIER]) w$2[NAMESPACE_IDENTIFIER] = {};
  if (!w$2[NAMESPACE_IDENTIFIER].styles) w$2[NAMESPACE_IDENTIFIER].styles = {};
  if (!w$2[NAMESPACE_IDENTIFIER].hooks) w$2[NAMESPACE_IDENTIFIER].hooks = {};
  if (!w$2[NAMESPACE_IDENTIFIER].shims) w$2[NAMESPACE_IDENTIFIER].shims = [];
  var namespace = w$2[NAMESPACE_IDENTIFIER];
  var functions = [];
  var _listener = function listener() {
    DOCUMENT.removeEventListener("DOMContentLoaded", _listener);
    loaded = 1;
    functions.map(function(fn) {
      return fn();
    });
  };
  var loaded = false;
  if (IS_DOM) {
    loaded = (DOCUMENT.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(DOCUMENT.readyState);
    if (!loaded) DOCUMENT.addEventListener("DOMContentLoaded", _listener);
  }
  function domready(fn) {
    if (!IS_DOM) return;
    loaded ? setTimeout(fn, 0) : functions.push(fn);
  }
  function toHtml(abstractNodes) {
    var tag = abstractNodes.tag, _abstractNodes$attrib = abstractNodes.attributes, attributes = _abstractNodes$attrib === void 0 ? {} : _abstractNodes$attrib, _abstractNodes$childr = abstractNodes.children, children = _abstractNodes$childr === void 0 ? [] : _abstractNodes$childr;
    if (typeof abstractNodes === "string") {
      return htmlEscape(abstractNodes);
    } else {
      return "<".concat(tag, " ").concat(joinAttributes(attributes), ">").concat(children.map(toHtml).join(""), "</").concat(tag, ">");
    }
  }
  function iconFromMapping(mapping, prefix, iconName) {
    if (mapping && mapping[prefix] && mapping[prefix][iconName]) {
      return {
        prefix,
        iconName,
        icon: mapping[prefix][iconName]
      };
    }
  }
  var bindInternal4 = function bindInternal42(func, thisContext) {
    return function(a2, b2, c2, d2) {
      return func.call(thisContext, a2, b2, c2, d2);
    };
  };
  var reduce = function fastReduceObject(subject, fn, initialValue, thisContext) {
    var keys = Object.keys(subject), length = keys.length, iterator = thisContext !== void 0 ? bindInternal4(fn, thisContext) : fn, i2, key, result;
    if (initialValue === void 0) {
      i2 = 1;
      result = subject[keys[0]];
    } else {
      i2 = 0;
      result = initialValue;
    }
    for (; i2 < length; i2++) {
      key = keys[i2];
      result = iterator(result, subject[key], key, subject);
    }
    return result;
  };
  function toHex(unicode) {
    if (_toConsumableArray(unicode).length !== 1) return null;
    return unicode.codePointAt(0).toString(16);
  }
  function normalizeIcons(icons) {
    return Object.keys(icons).reduce(function(acc, iconName) {
      var icon3 = icons[iconName];
      var expanded = !!icon3.icon;
      if (expanded) {
        acc[icon3.iconName] = icon3.icon;
      } else {
        acc[iconName] = icon3;
      }
      return acc;
    }, {});
  }
  function defineIcons(prefix, icons) {
    var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    var _params$skipHooks = params.skipHooks, skipHooks = _params$skipHooks === void 0 ? false : _params$skipHooks;
    var normalized = normalizeIcons(icons);
    if (typeof namespace.hooks.addPack === "function" && !skipHooks) {
      namespace.hooks.addPack(prefix, normalizeIcons(icons));
    } else {
      namespace.styles[prefix] = _objectSpread2(_objectSpread2({}, namespace.styles[prefix] || {}), normalized);
    }
    if (prefix === "fas") {
      defineIcons("fa", icons);
    }
  }
  var styles = namespace.styles;
  var shims = namespace.shims;
  var FAMILY_NAMES = Object.keys(PREFIX_TO_LONG_STYLE);
  var PREFIXES_FOR_FAMILY = FAMILY_NAMES.reduce(function(acc, familyId) {
    acc[familyId] = Object.keys(PREFIX_TO_LONG_STYLE[familyId]);
    return acc;
  }, {});
  var _defaultUsablePrefix = null;
  var _byUnicode = {};
  var _byLigature = {};
  var _byOldName = {};
  var _byOldUnicode = {};
  var _byAlias = {};
  function isReserved(name) {
    return ~RESERVED_CLASSES.indexOf(name);
  }
  function getIconName(cssPrefix, cls) {
    var parts = cls.split("-");
    var prefix = parts[0];
    var iconName = parts.slice(1).join("-");
    if (prefix === cssPrefix && iconName !== "" && !isReserved(iconName)) {
      return iconName;
    } else {
      return null;
    }
  }
  var build = function build2() {
    var lookup = function lookup2(reducer) {
      return reduce(styles, function(o$$1, style, prefix) {
        o$$1[prefix] = reduce(style, reducer, {});
        return o$$1;
      }, {});
    };
    _byUnicode = lookup(function(acc, icon3, iconName) {
      if (icon3[3]) {
        acc[icon3[3]] = iconName;
      }
      if (icon3[2]) {
        var aliases = icon3[2].filter(function(a$$1) {
          return typeof a$$1 === "number";
        });
        aliases.forEach(function(alias) {
          acc[alias.toString(16)] = iconName;
        });
      }
      return acc;
    });
    _byLigature = lookup(function(acc, icon3, iconName) {
      acc[iconName] = iconName;
      if (icon3[2]) {
        var aliases = icon3[2].filter(function(a$$1) {
          return typeof a$$1 === "string";
        });
        aliases.forEach(function(alias) {
          acc[alias] = iconName;
        });
      }
      return acc;
    });
    _byAlias = lookup(function(acc, icon3, iconName) {
      var aliases = icon3[2];
      acc[iconName] = iconName;
      aliases.forEach(function(alias) {
        acc[alias] = iconName;
      });
      return acc;
    });
    var hasRegular = "far" in styles || config.autoFetchSvg;
    var shimLookups = reduce(shims, function(acc, shim) {
      var maybeNameMaybeUnicode = shim[0];
      var prefix = shim[1];
      var iconName = shim[2];
      if (prefix === "far" && !hasRegular) {
        prefix = "fas";
      }
      if (typeof maybeNameMaybeUnicode === "string") {
        acc.names[maybeNameMaybeUnicode] = {
          prefix,
          iconName
        };
      }
      if (typeof maybeNameMaybeUnicode === "number") {
        acc.unicodes[maybeNameMaybeUnicode.toString(16)] = {
          prefix,
          iconName
        };
      }
      return acc;
    }, {
      names: {},
      unicodes: {}
    });
    _byOldName = shimLookups.names;
    _byOldUnicode = shimLookups.unicodes;
    _defaultUsablePrefix = getCanonicalPrefix(config.styleDefault, {
      family: config.familyDefault
    });
  };
  onChange(function(c$$1) {
    _defaultUsablePrefix = getCanonicalPrefix(c$$1.styleDefault, {
      family: config.familyDefault
    });
  });
  build();
  function byUnicode(prefix, unicode) {
    return (_byUnicode[prefix] || {})[unicode];
  }
  function byLigature(prefix, ligature) {
    return (_byLigature[prefix] || {})[ligature];
  }
  function byAlias(prefix, alias) {
    return (_byAlias[prefix] || {})[alias];
  }
  function byOldName(name) {
    return _byOldName[name] || {
      prefix: null,
      iconName: null
    };
  }
  function byOldUnicode(unicode) {
    var oldUnicode = _byOldUnicode[unicode];
    var newUnicode = byUnicode("fas", unicode);
    return oldUnicode || (newUnicode ? {
      prefix: "fas",
      iconName: newUnicode
    } : null) || {
      prefix: null,
      iconName: null
    };
  }
  function getDefaultUsablePrefix() {
    return _defaultUsablePrefix;
  }
  var emptyCanonicalIcon = function emptyCanonicalIcon2() {
    return {
      prefix: null,
      iconName: null,
      rest: []
    };
  };
  function getFamilyId(values) {
    var family = u;
    var famProps = FAMILY_NAMES.reduce(function(acc, familyId) {
      acc[familyId] = "".concat(config.cssPrefix, "-").concat(familyId);
      return acc;
    }, {});
    xl.forEach(function(familyId) {
      if (values.includes(famProps[familyId]) || values.some(function(v$$1) {
        return PREFIXES_FOR_FAMILY[familyId].includes(v$$1);
      })) {
        family = familyId;
      }
    });
    return family;
  }
  function getCanonicalPrefix(styleOrPrefix) {
    var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var _params$family = params.family, family = _params$family === void 0 ? u : _params$family;
    var style = PREFIX_TO_STYLE[family][styleOrPrefix];
    if (family === l && !styleOrPrefix) {
      return "fad";
    }
    var prefix = STYLE_TO_PREFIX[family][styleOrPrefix] || STYLE_TO_PREFIX[family][style];
    var defined = styleOrPrefix in namespace.styles ? styleOrPrefix : null;
    var result = prefix || defined || null;
    return result;
  }
  function moveNonFaClassesToRest(classNames) {
    var rest = [];
    var iconName = null;
    classNames.forEach(function(cls) {
      var result = getIconName(config.cssPrefix, cls);
      if (result) {
        iconName = result;
      } else if (cls) {
        rest.push(cls);
      }
    });
    return {
      iconName,
      rest
    };
  }
  function sortedUniqueValues(arr) {
    return arr.sort().filter(function(value, index, arr2) {
      return arr2.indexOf(value) === index;
    });
  }
  var _faCombinedClasses = ha.concat(at);
  function getCanonicalIcon(values) {
    var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var _params$skipLookups = params.skipLookups, skipLookups = _params$skipLookups === void 0 ? false : _params$skipLookups;
    var givenPrefix = null;
    var faStyleOrFamilyClasses = sortedUniqueValues(values.filter(function(cls) {
      return _faCombinedClasses.includes(cls);
    }));
    var nonStyleOrFamilyClasses = sortedUniqueValues(values.filter(function(cls) {
      return !_faCombinedClasses.includes(cls);
    }));
    var faStyles = faStyleOrFamilyClasses.filter(function(cls) {
      givenPrefix = cls;
      return !dl.includes(cls);
    });
    var _faStyles = _slicedToArray(faStyles, 1), _faStyles$ = _faStyles[0], styleFromValues = _faStyles$ === void 0 ? null : _faStyles$;
    var family = getFamilyId(faStyleOrFamilyClasses);
    var canonical = _objectSpread2(_objectSpread2({}, moveNonFaClassesToRest(nonStyleOrFamilyClasses)), {}, {
      prefix: getCanonicalPrefix(styleFromValues, {
        family
      })
    });
    return _objectSpread2(_objectSpread2(_objectSpread2({}, canonical), getDefaultCanonicalPrefix({
      values,
      family,
      styles,
      config,
      canonical,
      givenPrefix
    })), applyShimAndAlias(skipLookups, givenPrefix, canonical));
  }
  function applyShimAndAlias(skipLookups, givenPrefix, canonical) {
    var prefix = canonical.prefix, iconName = canonical.iconName;
    if (skipLookups || !prefix || !iconName) {
      return {
        prefix,
        iconName
      };
    }
    var shim = givenPrefix === "fa" ? byOldName(iconName) : {};
    var aliasIconName = byAlias(prefix, iconName);
    iconName = shim.iconName || aliasIconName || iconName;
    prefix = shim.prefix || prefix;
    if (prefix === "far" && !styles["far"] && styles["fas"] && !config.autoFetchSvg) {
      prefix = "fas";
    }
    return {
      prefix,
      iconName
    };
  }
  var newCanonicalFamilies = xl.filter(function(familyId) {
    return familyId !== u || familyId !== l;
  });
  var newCanonicalStyles = Object.keys(da).filter(function(key) {
    return key !== u;
  }).map(function(key) {
    return Object.keys(da[key]);
  }).flat();
  function getDefaultCanonicalPrefix(prefixOptions) {
    var values = prefixOptions.values, family = prefixOptions.family, canonical = prefixOptions.canonical, _prefixOptions$givenP = prefixOptions.givenPrefix, givenPrefix = _prefixOptions$givenP === void 0 ? "" : _prefixOptions$givenP, _prefixOptions$styles = prefixOptions.styles, styles2 = _prefixOptions$styles === void 0 ? {} : _prefixOptions$styles, _prefixOptions$config = prefixOptions.config, config$$1 = _prefixOptions$config === void 0 ? {} : _prefixOptions$config;
    var isDuotoneFamily = family === l;
    var valuesHasDuotone = values.includes("fa-duotone") || values.includes("fad");
    var defaultFamilyIsDuotone = config$$1.familyDefault === "duotone";
    var canonicalPrefixIsDuotone = canonical.prefix === "fad" || canonical.prefix === "fa-duotone";
    if (!isDuotoneFamily && (valuesHasDuotone || defaultFamilyIsDuotone || canonicalPrefixIsDuotone)) {
      canonical.prefix = "fad";
    }
    if (values.includes("fa-brands") || values.includes("fab")) {
      canonical.prefix = "fab";
    }
    if (!canonical.prefix && newCanonicalFamilies.includes(family)) {
      var validPrefix = Object.keys(styles2).find(function(key) {
        return newCanonicalStyles.includes(key);
      });
      if (validPrefix || config$$1.autoFetchSvg) {
        var defaultPrefix = Ql.get(family).defaultShortPrefixId;
        canonical.prefix = defaultPrefix;
        canonical.iconName = byAlias(canonical.prefix, canonical.iconName) || canonical.iconName;
      }
    }
    if (canonical.prefix === "fa" || givenPrefix === "fa") {
      canonical.prefix = getDefaultUsablePrefix() || "fas";
    }
    return canonical;
  }
  var Library = /* @__PURE__ */ (function() {
    function Library2() {
      _classCallCheck(this, Library2);
      this.definitions = {};
    }
    return _createClass(Library2, [{
      key: "add",
      value: function add() {
        var _this = this;
        for (var _len = arguments.length, definitions = new Array(_len), _key = 0; _key < _len; _key++) {
          definitions[_key] = arguments[_key];
        }
        var additions = definitions.reduce(this._pullDefinitions, {});
        Object.keys(additions).forEach(function(key) {
          _this.definitions[key] = _objectSpread2(_objectSpread2({}, _this.definitions[key] || {}), additions[key]);
          defineIcons(key, additions[key]);
          var longPrefix = PREFIX_TO_LONG_STYLE[u][key];
          if (longPrefix) defineIcons(longPrefix, additions[key]);
          build();
        });
      }
    }, {
      key: "reset",
      value: function reset() {
        this.definitions = {};
      }
    }, {
      key: "_pullDefinitions",
      value: function _pullDefinitions(additions, definition) {
        var normalized = definition.prefix && definition.iconName && definition.icon ? {
          0: definition
        } : definition;
        Object.keys(normalized).map(function(key) {
          var _normalized$key = normalized[key], prefix = _normalized$key.prefix, iconName = _normalized$key.iconName, icon3 = _normalized$key.icon;
          var aliases = icon3[2];
          if (!additions[prefix]) additions[prefix] = {};
          if (aliases.length > 0) {
            aliases.forEach(function(alias) {
              if (typeof alias === "string") {
                additions[prefix][alias] = icon3;
              }
            });
          }
          additions[prefix][iconName] = icon3;
        });
        return additions;
      }
    }]);
  })();
  var _plugins = [];
  var _hooks = {};
  var providers = {};
  var defaultProviderKeys = Object.keys(providers);
  function registerPlugins(nextPlugins, _ref2) {
    var obj = _ref2.mixoutsTo;
    _plugins = nextPlugins;
    _hooks = {};
    Object.keys(providers).forEach(function(k2) {
      if (defaultProviderKeys.indexOf(k2) === -1) {
        delete providers[k2];
      }
    });
    _plugins.forEach(function(plugin) {
      var mixout8 = plugin.mixout ? plugin.mixout() : {};
      Object.keys(mixout8).forEach(function(tk) {
        if (typeof mixout8[tk] === "function") {
          obj[tk] = mixout8[tk];
        }
        if (_typeof(mixout8[tk]) === "object") {
          Object.keys(mixout8[tk]).forEach(function(sk) {
            if (!obj[tk]) {
              obj[tk] = {};
            }
            obj[tk][sk] = mixout8[tk][sk];
          });
        }
      });
      if (plugin.hooks) {
        var hooks8 = plugin.hooks();
        Object.keys(hooks8).forEach(function(hook) {
          if (!_hooks[hook]) {
            _hooks[hook] = [];
          }
          _hooks[hook].push(hooks8[hook]);
        });
      }
      if (plugin.provides) {
        plugin.provides(providers);
      }
    });
    return obj;
  }
  function chainHooks(hook, accumulator) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }
    var hookFns = _hooks[hook] || [];
    hookFns.forEach(function(hookFn) {
      accumulator = hookFn.apply(null, [accumulator].concat(args));
    });
    return accumulator;
  }
  function callHooks(hook) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    var hookFns = _hooks[hook] || [];
    hookFns.forEach(function(hookFn) {
      hookFn.apply(null, args);
    });
    return void 0;
  }
  function callProvided() {
    var hook = arguments[0];
    var args = Array.prototype.slice.call(arguments, 1);
    return providers[hook] ? providers[hook].apply(null, args) : void 0;
  }
  function findIconDefinition(iconLookup) {
    if (iconLookup.prefix === "fa") {
      iconLookup.prefix = "fas";
    }
    var iconName = iconLookup.iconName;
    var prefix = iconLookup.prefix || getDefaultUsablePrefix();
    if (!iconName) return;
    iconName = byAlias(prefix, iconName) || iconName;
    return iconFromMapping(library.definitions, prefix, iconName) || iconFromMapping(namespace.styles, prefix, iconName);
  }
  var library = new Library();
  var noAuto = function noAuto2() {
    config.autoReplaceSvg = false;
    config.observeMutations = false;
    callHooks("noAuto");
  };
  var dom = {
    i2svg: function i2svg() {
      var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      if (IS_DOM) {
        callHooks("beforeI2svg", params);
        callProvided("pseudoElements2svg", params);
        return callProvided("i2svg", params);
      } else {
        return Promise.reject(new Error("Operation requires a DOM of some kind."));
      }
    },
    watch: function watch() {
      var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      var autoReplaceSvgRoot = params.autoReplaceSvgRoot;
      if (config.autoReplaceSvg === false) {
        config.autoReplaceSvg = true;
      }
      config.observeMutations = true;
      domready(function() {
        autoReplace({
          autoReplaceSvgRoot
        });
        callHooks("watch", params);
      });
    }
  };
  var parse = {
    icon: function icon(_icon) {
      if (_icon === null) {
        return null;
      }
      if (_typeof(_icon) === "object" && _icon.prefix && _icon.iconName) {
        return {
          prefix: _icon.prefix,
          iconName: byAlias(_icon.prefix, _icon.iconName) || _icon.iconName
        };
      }
      if (Array.isArray(_icon) && _icon.length === 2) {
        var iconName = _icon[1].indexOf("fa-") === 0 ? _icon[1].slice(3) : _icon[1];
        var prefix = getCanonicalPrefix(_icon[0]);
        return {
          prefix,
          iconName: byAlias(prefix, iconName) || iconName
        };
      }
      if (typeof _icon === "string" && (_icon.indexOf("".concat(config.cssPrefix, "-")) > -1 || _icon.match(ICON_SELECTION_SYNTAX_PATTERN))) {
        var canonicalIcon = getCanonicalIcon(_icon.split(" "), {
          skipLookups: true
        });
        return {
          prefix: canonicalIcon.prefix || getDefaultUsablePrefix(),
          iconName: byAlias(canonicalIcon.prefix, canonicalIcon.iconName) || canonicalIcon.iconName
        };
      }
      if (typeof _icon === "string") {
        var _prefix = getDefaultUsablePrefix();
        return {
          prefix: _prefix,
          iconName: byAlias(_prefix, _icon) || _icon
        };
      }
    }
  };
  var api = {
    noAuto,
    config,
    dom,
    parse,
    library,
    findIconDefinition,
    toHtml
  };
  var autoReplace = function autoReplace2() {
    var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var _params$autoReplaceSv = params.autoReplaceSvgRoot, autoReplaceSvgRoot = _params$autoReplaceSv === void 0 ? DOCUMENT : _params$autoReplaceSv;
    if ((Object.keys(namespace.styles).length > 0 || config.autoFetchSvg) && IS_DOM && config.autoReplaceSvg) api.dom.i2svg({
      node: autoReplaceSvgRoot
    });
  };
  function domVariants(val, abstractCreator) {
    Object.defineProperty(val, "abstract", {
      get: abstractCreator
    });
    Object.defineProperty(val, "html", {
      get: function get2() {
        return val.abstract.map(function(a2) {
          return toHtml(a2);
        });
      }
    });
    Object.defineProperty(val, "node", {
      get: function get2() {
        if (!IS_DOM) return void 0;
        var container = DOCUMENT.createElement("div");
        container.innerHTML = val.html;
        return container.children;
      }
    });
    return val;
  }
  function asIcon(_ref2) {
    var children = _ref2.children, main = _ref2.main, mask2 = _ref2.mask, attributes = _ref2.attributes, styles2 = _ref2.styles, transform = _ref2.transform;
    if (transformIsMeaningful(transform) && main.found && !mask2.found) {
      var width = main.width, height = main.height;
      var offset = {
        x: width / height / 2,
        y: 0.5
      };
      attributes["style"] = joinStyles(_objectSpread2(_objectSpread2({}, styles2), {}, {
        "transform-origin": "".concat(offset.x + transform.x / 16, "em ").concat(offset.y + transform.y / 16, "em")
      }));
    }
    return [{
      tag: "svg",
      attributes,
      children
    }];
  }
  function asSymbol(_ref2) {
    var prefix = _ref2.prefix, iconName = _ref2.iconName, children = _ref2.children, attributes = _ref2.attributes, symbol = _ref2.symbol;
    var id = symbol === true ? "".concat(prefix, "-").concat(config.cssPrefix, "-").concat(iconName) : symbol;
    return [{
      tag: "svg",
      attributes: {
        style: "display: none;"
      },
      children: [{
        tag: "symbol",
        attributes: _objectSpread2(_objectSpread2({}, attributes), {}, {
          id
        }),
        children
      }]
    }];
  }
  function isLabeled(attributes) {
    var labels = ["aria-label", "aria-labelledby", "title", "role"];
    return labels.some(function(label) {
      return label in attributes;
    });
  }
  function makeInlineSvgAbstract(params) {
    var _params$icons = params.icons, main = _params$icons.main, mask2 = _params$icons.mask, prefix = params.prefix, iconName = params.iconName, transform = params.transform, symbol = params.symbol, maskId = params.maskId, extra = params.extra, _params$watchable = params.watchable, watchable = _params$watchable === void 0 ? false : _params$watchable;
    var _ref2 = mask2.found ? mask2 : main, width = _ref2.width, height = _ref2.height;
    var attrClass = [config.replacementClass, iconName ? "".concat(config.cssPrefix, "-").concat(iconName) : ""].filter(function(c2) {
      return extra.classes.indexOf(c2) === -1;
    }).filter(function(c2) {
      return c2 !== "" || !!c2;
    }).concat(extra.classes).join(" ");
    var content = {
      children: [],
      attributes: _objectSpread2(_objectSpread2({}, extra.attributes), {}, {
        "data-prefix": prefix,
        "data-icon": iconName,
        "class": attrClass,
        "role": extra.attributes.role || "img",
        "viewBox": "0 0 ".concat(width, " ").concat(height)
      })
    };
    if (!isLabeled(extra.attributes) && !extra.attributes["aria-hidden"]) {
      content.attributes["aria-hidden"] = "true";
    }
    if (watchable) {
      content.attributes[DATA_FA_I2SVG] = "";
    }
    var args = _objectSpread2(_objectSpread2({}, content), {}, {
      prefix,
      iconName,
      main,
      mask: mask2,
      maskId,
      transform,
      symbol,
      styles: _objectSpread2({}, extra.styles)
    });
    var _ref22 = mask2.found && main.found ? callProvided("generateAbstractMask", args) || {
      children: [],
      attributes: {}
    } : callProvided("generateAbstractIcon", args) || {
      children: [],
      attributes: {}
    }, children = _ref22.children, attributes = _ref22.attributes;
    args.children = children;
    args.attributes = attributes;
    if (symbol) {
      return asSymbol(args);
    } else {
      return asIcon(args);
    }
  }
  function makeLayersTextAbstract(params) {
    var content = params.content, width = params.width, height = params.height, transform = params.transform, extra = params.extra, _params$watchable2 = params.watchable, watchable = _params$watchable2 === void 0 ? false : _params$watchable2;
    var attributes = _objectSpread2(_objectSpread2({}, extra.attributes), {}, {
      class: extra.classes.join(" ")
    });
    if (watchable) {
      attributes[DATA_FA_I2SVG] = "";
    }
    var styles2 = _objectSpread2({}, extra.styles);
    if (transformIsMeaningful(transform)) {
      styles2["transform"] = transformForCss({
        transform,
        startCentered: true,
        width,
        height
      });
      styles2["-webkit-transform"] = styles2["transform"];
    }
    var styleString = joinStyles(styles2);
    if (styleString.length > 0) {
      attributes["style"] = styleString;
    }
    var val = [];
    val.push({
      tag: "span",
      attributes,
      children: [content]
    });
    return val;
  }
  function makeLayersCounterAbstract(params) {
    var content = params.content, extra = params.extra;
    var attributes = _objectSpread2(_objectSpread2({}, extra.attributes), {}, {
      class: extra.classes.join(" ")
    });
    var styleString = joinStyles(extra.styles);
    if (styleString.length > 0) {
      attributes["style"] = styleString;
    }
    var val = [];
    val.push({
      tag: "span",
      attributes,
      children: [content]
    });
    return val;
  }
  var styles$1 = namespace.styles;
  function asFoundIcon(icon3) {
    var width = icon3[0];
    var height = icon3[1];
    var _icon$slice = icon3.slice(4), _icon$slice2 = _slicedToArray(_icon$slice, 1), vectorData = _icon$slice2[0];
    var element = null;
    if (Array.isArray(vectorData)) {
      element = {
        tag: "g",
        attributes: {
          class: "".concat(config.cssPrefix, "-").concat(DUOTONE_CLASSES.GROUP)
        },
        children: [{
          tag: "path",
          attributes: {
            class: "".concat(config.cssPrefix, "-").concat(DUOTONE_CLASSES.SECONDARY),
            fill: "currentColor",
            d: vectorData[0]
          }
        }, {
          tag: "path",
          attributes: {
            class: "".concat(config.cssPrefix, "-").concat(DUOTONE_CLASSES.PRIMARY),
            fill: "currentColor",
            d: vectorData[1]
          }
        }]
      };
    } else {
      element = {
        tag: "path",
        attributes: {
          fill: "currentColor",
          d: vectorData
        }
      };
    }
    return {
      found: true,
      width,
      height,
      icon: element
    };
  }
  var missingIconResolutionMixin = {
    found: false,
    width: 512,
    height: 512
  };
  function maybeNotifyMissing(iconName, prefix) {
    if (!PRODUCTION && !config.showMissingIcons && iconName) {
      console.error('Icon with name "'.concat(iconName, '" and prefix "').concat(prefix, '" is missing.'));
    }
  }
  function findIcon(iconName, prefix) {
    var givenPrefix = prefix;
    if (prefix === "fa" && config.styleDefault !== null) {
      prefix = getDefaultUsablePrefix();
    }
    return new Promise(function(resolve, reject) {
      if (givenPrefix === "fa") {
        var shim = byOldName(iconName) || {};
        iconName = shim.iconName || iconName;
        prefix = shim.prefix || prefix;
      }
      if (iconName && prefix && styles$1[prefix] && styles$1[prefix][iconName]) {
        var icon3 = styles$1[prefix][iconName];
        return resolve(asFoundIcon(icon3));
      }
      maybeNotifyMissing(iconName, prefix);
      resolve(_objectSpread2(_objectSpread2({}, missingIconResolutionMixin), {}, {
        icon: config.showMissingIcons && iconName ? callProvided("missingIconAbstract") || {} : {}
      }));
    });
  }
  var noop$1 = function noop4() {
  };
  var p$2 = config.measurePerformance && PERFORMANCE && PERFORMANCE.mark && PERFORMANCE.measure ? PERFORMANCE : {
    mark: noop$1,
    measure: noop$1
  };
  var preamble = 'FA "7.3.1"';
  var begin = function begin2(name) {
    p$2.mark("".concat(preamble, " ").concat(name, " begins"));
    return function() {
      return end(name);
    };
  };
  var end = function end2(name) {
    p$2.mark("".concat(preamble, " ").concat(name, " ends"));
    p$2.measure("".concat(preamble, " ").concat(name), "".concat(preamble, " ").concat(name, " begins"), "".concat(preamble, " ").concat(name, " ends"));
  };
  var perf = {
    begin,
    end
  };
  var noop$2 = function noop5() {
  };
  function isWatched(node) {
    var i2svg2 = node.getAttribute ? node.getAttribute(DATA_FA_I2SVG) : null;
    return typeof i2svg2 === "string";
  }
  function hasPrefixAndIcon(node) {
    var prefix = node.getAttribute ? node.getAttribute(DATA_PREFIX) : null;
    var icon3 = node.getAttribute ? node.getAttribute(DATA_ICON) : null;
    return prefix && icon3;
  }
  function hasBeenReplaced(node) {
    return node && node.classList && node.classList.contains && node.classList.contains(config.replacementClass);
  }
  function getMutator() {
    if (config.autoReplaceSvg === true) {
      return mutators.replace;
    }
    var mutator = mutators[config.autoReplaceSvg];
    return mutator || mutators.replace;
  }
  function createElementNS(tag) {
    return DOCUMENT.createElementNS("http://www.w3.org/2000/svg", tag);
  }
  function createElement(tag) {
    return DOCUMENT.createElement(tag);
  }
  function convertSVG(abstractObj) {
    var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var _params$ceFn = params.ceFn, ceFn = _params$ceFn === void 0 ? abstractObj.tag === "svg" ? createElementNS : createElement : _params$ceFn;
    if (typeof abstractObj === "string") {
      return DOCUMENT.createTextNode(abstractObj);
    }
    var tag = ceFn(abstractObj.tag);
    Object.keys(abstractObj.attributes || []).forEach(function(key) {
      tag.setAttribute(key, abstractObj.attributes[key]);
    });
    var children = abstractObj.children || [];
    children.forEach(function(child) {
      tag.appendChild(convertSVG(child, {
        ceFn
      }));
    });
    return tag;
  }
  function nodeAsComment(node) {
    var comment = " ".concat(node.outerHTML, " ");
    comment = "".concat(comment, "Font Awesome fontawesome.com ");
    return comment;
  }
  var mutators = {
    replace: function replace(mutation) {
      var node = mutation[0];
      if (node.parentNode) {
        mutation[1].forEach(function(abstract) {
          node.parentNode.insertBefore(convertSVG(abstract), node);
        });
        if (node.getAttribute(DATA_FA_I2SVG) === null && config.keepOriginalSource) {
          var comment = DOCUMENT.createComment(nodeAsComment(node));
          node.parentNode.replaceChild(comment, node);
        } else {
          node.remove();
        }
      }
    },
    nest: function nest(mutation) {
      var node = mutation[0];
      var abstract = mutation[1];
      if (~classArray(node).indexOf(config.replacementClass)) {
        return mutators.replace(mutation);
      }
      var forSvg = new RegExp("".concat(config.cssPrefix, "-.*"));
      delete abstract[0].attributes.id;
      if (abstract[0].attributes.class) {
        var splitClasses = abstract[0].attributes.class.split(" ").reduce(function(acc, cls) {
          if (cls === config.replacementClass || cls.match(forSvg)) {
            acc.toSvg.push(cls);
          } else {
            acc.toNode.push(cls);
          }
          return acc;
        }, {
          toNode: [],
          toSvg: []
        });
        abstract[0].attributes.class = splitClasses.toSvg.join(" ");
        if (splitClasses.toNode.length === 0) {
          node.removeAttribute("class");
        } else {
          node.setAttribute("class", splitClasses.toNode.join(" "));
        }
      }
      var newInnerHTML = abstract.map(function(a2) {
        return toHtml(a2);
      }).join("\n");
      node.setAttribute(DATA_FA_I2SVG, "");
      node.innerHTML = newInnerHTML;
    }
  };
  function performOperationSync(op) {
    op();
  }
  function perform(mutations, callback) {
    var callbackFunction = typeof callback === "function" ? callback : noop$2;
    if (mutations.length === 0) {
      callbackFunction();
    } else {
      var frame2 = performOperationSync;
      if (config.mutateApproach === MUTATION_APPROACH_ASYNC) {
        frame2 = WINDOW.requestAnimationFrame || performOperationSync;
      }
      frame2(function() {
        var mutator = getMutator();
        var mark = perf.begin("mutate");
        mutations.map(mutator);
        mark();
        callbackFunction();
      });
    }
  }
  var disabled = false;
  function disableObservation() {
    disabled = true;
  }
  function enableObservation() {
    disabled = false;
  }
  var mo = null;
  function observe(options) {
    if (!MUTATION_OBSERVER) {
      return;
    }
    if (!config.observeMutations) {
      return;
    }
    var _options$treeCallback = options.treeCallback, treeCallback = _options$treeCallback === void 0 ? noop$2 : _options$treeCallback, _options$nodeCallback = options.nodeCallback, nodeCallback = _options$nodeCallback === void 0 ? noop$2 : _options$nodeCallback, _options$pseudoElemen = options.pseudoElementsCallback, pseudoElementsCallback = _options$pseudoElemen === void 0 ? noop$2 : _options$pseudoElemen, _options$observeMutat = options.observeMutationsRoot, observeMutationsRoot = _options$observeMutat === void 0 ? DOCUMENT : _options$observeMutat;
    mo = new MUTATION_OBSERVER(function(objects) {
      if (disabled) return;
      var defaultPrefix = getDefaultUsablePrefix();
      toArray(objects).forEach(function(mutationRecord) {
        if (mutationRecord.type === "childList" && mutationRecord.addedNodes.length > 0 && !isWatched(mutationRecord.addedNodes[0])) {
          if (config.searchPseudoElements) {
            pseudoElementsCallback(mutationRecord.target);
          }
          treeCallback(mutationRecord.target);
        }
        if (mutationRecord.type === "attributes" && mutationRecord.target.parentNode && config.searchPseudoElements) {
          pseudoElementsCallback([mutationRecord.target], true);
        }
        if (mutationRecord.type === "attributes" && isWatched(mutationRecord.target) && ~ATTRIBUTES_WATCHED_FOR_MUTATION.indexOf(mutationRecord.attributeName)) {
          if (mutationRecord.attributeName === "class" && hasPrefixAndIcon(mutationRecord.target)) {
            var _getCanonicalIcon = getCanonicalIcon(classArray(mutationRecord.target)), prefix = _getCanonicalIcon.prefix, iconName = _getCanonicalIcon.iconName;
            mutationRecord.target.setAttribute(DATA_PREFIX, prefix || defaultPrefix);
            if (iconName) mutationRecord.target.setAttribute(DATA_ICON, iconName);
          } else if (hasBeenReplaced(mutationRecord.target)) {
            nodeCallback(mutationRecord.target);
          }
        }
      });
    });
    if (!IS_DOM) return;
    mo.observe(observeMutationsRoot, {
      childList: true,
      attributes: true,
      characterData: true,
      subtree: true
    });
  }
  function disconnect() {
    if (!mo) return;
    mo.disconnect();
  }
  function styleParser(node) {
    var style = node.getAttribute("style");
    var val = [];
    if (style) {
      val = style.split(";").reduce(function(acc, style2) {
        var styles2 = style2.split(":");
        var prop = styles2[0];
        var value = styles2.slice(1);
        if (prop && value.length > 0) {
          acc[prop] = value.join(":").trim();
        }
        return acc;
      }, {});
    }
    return val;
  }
  function classParser(node) {
    var existingPrefix = node.getAttribute("data-prefix");
    var existingIconName = node.getAttribute("data-icon");
    var innerText = node.innerText !== void 0 ? node.innerText.trim() : "";
    var val = getCanonicalIcon(classArray(node));
    if (!val.prefix) {
      val.prefix = getDefaultUsablePrefix();
    }
    if (existingPrefix && existingIconName) {
      val.prefix = existingPrefix;
      val.iconName = existingIconName;
    }
    if (val.iconName && val.prefix) {
      return val;
    }
    if (val.prefix && innerText.length > 0) {
      val.iconName = byLigature(val.prefix, node.innerText) || byUnicode(val.prefix, toHex(node.innerText));
    }
    if (!val.iconName && config.autoFetchSvg && node.firstChild && node.firstChild.nodeType === Node.TEXT_NODE) {
      val.iconName = node.firstChild.data;
    }
    return val;
  }
  function attributesParser(node) {
    var extraAttributes = toArray(node.attributes).reduce(function(acc, attr) {
      if (acc.name !== "class" && acc.name !== "style") {
        acc[attr.name] = attr.value;
      }
      return acc;
    }, {});
    return extraAttributes;
  }
  function blankMeta() {
    return {
      iconName: null,
      prefix: null,
      transform: meaninglessTransform,
      symbol: false,
      mask: {
        iconName: null,
        prefix: null,
        rest: []
      },
      maskId: null,
      extra: {
        classes: [],
        styles: {},
        attributes: {}
      }
    };
  }
  function parseMeta(node) {
    var parser = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      styleParser: true
    };
    var _classParser = classParser(node), iconName = _classParser.iconName, prefix = _classParser.prefix, extraClasses = _classParser.rest;
    var extraAttributes = attributesParser(node);
    var pluginMeta = chainHooks("parseNodeAttributes", {}, node);
    var extraStyles = parser.styleParser ? styleParser(node) : [];
    return _objectSpread2({
      iconName,
      prefix,
      transform: meaninglessTransform,
      mask: {
        iconName: null,
        prefix: null,
        rest: []
      },
      maskId: null,
      symbol: false,
      extra: {
        classes: extraClasses,
        styles: extraStyles,
        attributes: extraAttributes
      }
    }, pluginMeta);
  }
  var styles$2 = namespace.styles;
  function generateMutation(node) {
    var nodeMeta = config.autoReplaceSvg === "nest" ? parseMeta(node, {
      styleParser: false
    }) : parseMeta(node);
    if (~nodeMeta.extra.classes.indexOf(LAYERS_TEXT_CLASSNAME)) {
      return callProvided("generateLayersText", node, nodeMeta);
    } else {
      return callProvided("generateSvgReplacementMutation", node, nodeMeta);
    }
  }
  function getKnownPrefixes() {
    return [].concat(_toConsumableArray(at), _toConsumableArray(ha));
  }
  function onTree(root) {
    var callback = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    if (!IS_DOM) return Promise.resolve();
    var htmlClassList = DOCUMENT.documentElement.classList;
    var hclAdd = function hclAdd2(suffix) {
      return htmlClassList.add("".concat(HTML_CLASS_I2SVG_BASE_CLASS, "-").concat(suffix));
    };
    var hclRemove = function hclRemove2(suffix) {
      return htmlClassList.remove("".concat(HTML_CLASS_I2SVG_BASE_CLASS, "-").concat(suffix));
    };
    var prefixes = config.autoFetchSvg ? getKnownPrefixes() : dl.concat(Object.keys(styles$2));
    if (!prefixes.includes("fa")) {
      prefixes.push("fa");
    }
    var prefixesDomQuery = [".".concat(LAYERS_TEXT_CLASSNAME, ":not([").concat(DATA_FA_I2SVG, "])")].concat(prefixes.map(function(p$$1) {
      return ".".concat(p$$1, ":not([").concat(DATA_FA_I2SVG, "])");
    })).join(", ");
    if (prefixesDomQuery.length === 0) {
      return Promise.resolve();
    }
    var candidates = [];
    try {
      candidates = toArray(root.querySelectorAll(prefixesDomQuery));
    } catch (e$$1) {
    }
    if (candidates.length > 0) {
      hclAdd("pending");
      hclRemove("complete");
    } else {
      return Promise.resolve();
    }
    var mark = perf.begin("onTree");
    var mutations = candidates.reduce(function(acc, node) {
      try {
        var mutation = generateMutation(node);
        if (mutation) {
          acc.push(mutation);
        }
      } catch (e$$1) {
        if (!PRODUCTION) {
          if (e$$1.name === "MissingIcon") {
            console.error(e$$1);
          }
        }
      }
      return acc;
    }, []);
    return new Promise(function(resolve, reject) {
      Promise.all(mutations).then(function(resolvedMutations) {
        perform(resolvedMutations, function() {
          hclAdd("active");
          hclAdd("complete");
          hclRemove("pending");
          if (typeof callback === "function") callback();
          mark();
          resolve();
        });
      }).catch(function(e$$1) {
        mark();
        reject(e$$1);
      });
    });
  }
  function onNode(node) {
    var callback = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    generateMutation(node).then(function(mutation) {
      if (mutation) {
        perform([mutation], callback);
      }
    });
  }
  function resolveIcons(next) {
    return function(maybeIconDefinition) {
      var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var iconDefinition = (maybeIconDefinition || {}).icon ? maybeIconDefinition : findIconDefinition(maybeIconDefinition || {});
      var mask2 = params.mask;
      if (mask2) {
        mask2 = (mask2 || {}).icon ? mask2 : findIconDefinition(mask2 || {});
      }
      return next(iconDefinition, _objectSpread2(_objectSpread2({}, params), {}, {
        mask: mask2
      }));
    };
  }
  var render = function render2(iconDefinition) {
    var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var _params$transform = params.transform, transform = _params$transform === void 0 ? meaninglessTransform : _params$transform, _params$symbol = params.symbol, symbol = _params$symbol === void 0 ? false : _params$symbol, _params$mask = params.mask, mask2 = _params$mask === void 0 ? null : _params$mask, _params$maskId = params.maskId, maskId = _params$maskId === void 0 ? null : _params$maskId, _params$classes = params.classes, classes = _params$classes === void 0 ? [] : _params$classes, _params$attributes = params.attributes, attributes = _params$attributes === void 0 ? {} : _params$attributes, _params$styles = params.styles, styles2 = _params$styles === void 0 ? {} : _params$styles;
    if (!iconDefinition) return;
    var prefix = iconDefinition.prefix, iconName = iconDefinition.iconName, icon3 = iconDefinition.icon;
    return domVariants(_objectSpread2({
      type: "icon"
    }, iconDefinition), function() {
      callHooks("beforeDOMElementCreation", {
        iconDefinition,
        params
      });
      return makeInlineSvgAbstract({
        icons: {
          main: asFoundIcon(icon3),
          mask: mask2 ? asFoundIcon(mask2.icon) : {
            found: false,
            width: null,
            height: null,
            icon: {}
          }
        },
        prefix,
        iconName,
        transform: _objectSpread2(_objectSpread2({}, meaninglessTransform), transform),
        symbol,
        maskId,
        extra: {
          attributes,
          styles: styles2,
          classes
        }
      });
    });
  };
  var ReplaceElements = {
    mixout: function mixout2() {
      return {
        icon: resolveIcons(render)
      };
    },
    hooks: function hooks2() {
      return {
        mutationObserverCallbacks: function mutationObserverCallbacks(accumulator) {
          accumulator.treeCallback = onTree;
          accumulator.nodeCallback = onNode;
          return accumulator;
        }
      };
    },
    provides: function provides(providers$$1) {
      providers$$1.i2svg = function(params) {
        var _params$node = params.node, node = _params$node === void 0 ? DOCUMENT : _params$node, _params$callback = params.callback, callback = _params$callback === void 0 ? function() {
        } : _params$callback;
        return onTree(node, callback);
      };
      providers$$1.generateSvgReplacementMutation = function(node, nodeMeta) {
        var iconName = nodeMeta.iconName, prefix = nodeMeta.prefix, transform = nodeMeta.transform, symbol = nodeMeta.symbol, mask2 = nodeMeta.mask, maskId = nodeMeta.maskId, extra = nodeMeta.extra;
        return new Promise(function(resolve, reject) {
          Promise.all([findIcon(iconName, prefix), mask2.iconName ? findIcon(mask2.iconName, mask2.prefix) : Promise.resolve({
            found: false,
            width: 512,
            height: 512,
            icon: {}
          })]).then(function(_ref2) {
            var _ref22 = _slicedToArray(_ref2, 2), main = _ref22[0], mask3 = _ref22[1];
            resolve([node, makeInlineSvgAbstract({
              icons: {
                main,
                mask: mask3
              },
              prefix,
              iconName,
              transform,
              symbol,
              maskId,
              extra,
              watchable: true
            })]);
          }).catch(reject);
        });
      };
      providers$$1.generateAbstractIcon = function(_ref3) {
        var children = _ref3.children, attributes = _ref3.attributes, main = _ref3.main, transform = _ref3.transform, styles2 = _ref3.styles;
        var styleString = joinStyles(styles2);
        if (styleString.length > 0) {
          attributes["style"] = styleString;
        }
        var nextChild;
        if (transformIsMeaningful(transform)) {
          nextChild = callProvided("generateAbstractTransformGrouping", {
            main,
            transform,
            containerWidth: main.width,
            iconWidth: main.width
          });
        }
        children.push(nextChild || main.icon);
        return {
          children,
          attributes
        };
      };
    }
  };
  var Layers = {
    mixout: function mixout3() {
      return {
        layer: function layer2(assembler) {
          var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          var _params$classes = params.classes, classes = _params$classes === void 0 ? [] : _params$classes;
          return domVariants({
            type: "layer"
          }, function() {
            callHooks("beforeDOMElementCreation", {
              assembler,
              params
            });
            var children = [];
            assembler(function(args) {
              Array.isArray(args) ? args.map(function(a2) {
                children = children.concat(a2.abstract);
              }) : children = children.concat(args.abstract);
            });
            return [{
              tag: "span",
              attributes: {
                class: ["".concat(config.cssPrefix, "-layers")].concat(_toConsumableArray(classes)).join(" ")
              },
              children
            }];
          });
        }
      };
    }
  };
  var LayersCounter = {
    mixout: function mixout4() {
      return {
        counter: function counter2(content) {
          var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          var _params$title = params.title, title = _params$title === void 0 ? null : _params$title, _params$classes = params.classes, classes = _params$classes === void 0 ? [] : _params$classes, _params$attributes = params.attributes, attributes = _params$attributes === void 0 ? {} : _params$attributes, _params$styles = params.styles, styles2 = _params$styles === void 0 ? {} : _params$styles;
          return domVariants({
            type: "counter",
            content
          }, function() {
            callHooks("beforeDOMElementCreation", {
              content,
              params
            });
            return makeLayersCounterAbstract({
              content: content.toString(),
              title,
              extra: {
                attributes,
                styles: styles2,
                classes: ["".concat(config.cssPrefix, "-layers-counter")].concat(_toConsumableArray(classes))
              }
            });
          });
        }
      };
    }
  };
  var LayersText = {
    mixout: function mixout5() {
      return {
        text: function text2(content) {
          var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          var _params$transform = params.transform, transform = _params$transform === void 0 ? meaninglessTransform : _params$transform, _params$classes = params.classes, classes = _params$classes === void 0 ? [] : _params$classes, _params$attributes = params.attributes, attributes = _params$attributes === void 0 ? {} : _params$attributes, _params$styles = params.styles, styles2 = _params$styles === void 0 ? {} : _params$styles;
          return domVariants({
            type: "text",
            content
          }, function() {
            callHooks("beforeDOMElementCreation", {
              content,
              params
            });
            return makeLayersTextAbstract({
              content,
              transform: _objectSpread2(_objectSpread2({}, meaninglessTransform), transform),
              extra: {
                attributes,
                styles: styles2,
                classes: ["".concat(config.cssPrefix, "-layers-text")].concat(_toConsumableArray(classes))
              }
            });
          });
        }
      };
    },
    provides: function provides2(providers$$1) {
      providers$$1.generateLayersText = function(node, nodeMeta) {
        var transform = nodeMeta.transform, extra = nodeMeta.extra;
        var width = null;
        var height = null;
        if (IS_IE) {
          var computedFontSize = parseInt(getComputedStyle(node).fontSize, 10);
          var boundingClientRect = node.getBoundingClientRect();
          width = boundingClientRect.width / computedFontSize;
          height = boundingClientRect.height / computedFontSize;
        }
        return Promise.resolve([node, makeLayersTextAbstract({
          content: node.innerHTML,
          width,
          height,
          transform,
          extra,
          watchable: true
        })]);
      };
    }
  };
  var CLEAN_CONTENT_PATTERN = new RegExp('"', "ug");
  var SECONDARY_UNICODE_RANGE = [1105920, 1112319];
  var _FONT_FAMILY_WEIGHT_TO_PREFIX = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, {
    FontAwesome: {
      normal: "fas",
      400: "fas"
    }
  }), zl), wa), ct);
  var FONT_FAMILY_WEIGHT_TO_PREFIX = Object.keys(_FONT_FAMILY_WEIGHT_TO_PREFIX).reduce(function(acc, key) {
    acc[key.toLowerCase()] = _FONT_FAMILY_WEIGHT_TO_PREFIX[key];
    return acc;
  }, {});
  var FONT_FAMILY_WEIGHT_FALLBACK = Object.keys(FONT_FAMILY_WEIGHT_TO_PREFIX).reduce(function(acc, fontFamily) {
    var weights = FONT_FAMILY_WEIGHT_TO_PREFIX[fontFamily];
    acc[fontFamily] = weights[900] || _toConsumableArray(Object.entries(weights))[0][1];
    return acc;
  }, {});
  function hexValueFromContent(content) {
    var cleaned = content.replace(CLEAN_CONTENT_PATTERN, "");
    return toHex(_toConsumableArray(cleaned)[0] || "");
  }
  function isSecondaryLayer(styles2) {
    var hasStylisticSet = styles2.getPropertyValue("font-feature-settings").includes("ss01");
    var content = styles2.getPropertyValue("content");
    var cleaned = content.replace(CLEAN_CONTENT_PATTERN, "");
    var codePoint = cleaned.codePointAt(0);
    var isPrependTen = codePoint >= SECONDARY_UNICODE_RANGE[0] && codePoint <= SECONDARY_UNICODE_RANGE[1];
    var isDoubled = cleaned.length === 2 ? cleaned[0] === cleaned[1] : false;
    return isPrependTen || isDoubled || hasStylisticSet;
  }
  function getPrefix(fontFamily, fontWeight) {
    var fontFamilySanitized = fontFamily.replace(/^['"]|['"]$/g, "").toLowerCase();
    var fontWeightInteger = parseInt(fontWeight);
    var fontWeightSanitized = isNaN(fontWeightInteger) ? "normal" : fontWeightInteger;
    return (FONT_FAMILY_WEIGHT_TO_PREFIX[fontFamilySanitized] || {})[fontWeightSanitized] || FONT_FAMILY_WEIGHT_FALLBACK[fontFamilySanitized];
  }
  function replaceForPosition(node, position) {
    var pendingAttribute = "".concat(DATA_FA_PSEUDO_ELEMENT_PENDING).concat(position.replace(":", "-"));
    return new Promise(function(resolve, reject) {
      if (node.getAttribute(pendingAttribute) !== null) {
        return resolve();
      }
      var children = toArray(node.children);
      var alreadyProcessedPseudoElement = children.filter(function(c$$1) {
        return c$$1.getAttribute(DATA_FA_PSEUDO_ELEMENT) === position;
      })[0];
      var styles2 = WINDOW.getComputedStyle(node, position);
      var fontFamily = styles2.getPropertyValue("font-family");
      var fontFamilyMatch = fontFamily.match(FONT_FAMILY_PATTERN);
      var fontWeight = styles2.getPropertyValue("font-weight");
      var content = styles2.getPropertyValue("content");
      if (alreadyProcessedPseudoElement && !fontFamilyMatch) {
        node.removeChild(alreadyProcessedPseudoElement);
        return resolve();
      } else if (fontFamilyMatch && content !== "none" && content !== "") {
        var _content = styles2.getPropertyValue("content");
        var prefix = getPrefix(fontFamily, fontWeight);
        var hexValue = hexValueFromContent(_content);
        var isV4 = fontFamilyMatch[0].startsWith("FontAwesome");
        var isSecondary = isSecondaryLayer(styles2);
        var iconName = byUnicode(prefix, hexValue);
        var iconIdentifier = iconName;
        if (isV4) {
          var iconName4 = byOldUnicode(hexValue);
          if (iconName4.iconName && iconName4.prefix) {
            iconName = iconName4.iconName;
            prefix = iconName4.prefix;
          }
        }
        if (iconName && !isSecondary && (!alreadyProcessedPseudoElement || alreadyProcessedPseudoElement.getAttribute(DATA_PREFIX) !== prefix || alreadyProcessedPseudoElement.getAttribute(DATA_ICON) !== iconIdentifier)) {
          node.setAttribute(pendingAttribute, iconIdentifier);
          if (alreadyProcessedPseudoElement) {
            node.removeChild(alreadyProcessedPseudoElement);
          }
          var meta = blankMeta();
          var extra = meta.extra;
          extra.attributes[DATA_FA_PSEUDO_ELEMENT] = position;
          findIcon(iconName, prefix).then(function(main) {
            var abstract = makeInlineSvgAbstract(_objectSpread2(_objectSpread2({}, meta), {}, {
              icons: {
                main,
                mask: emptyCanonicalIcon()
              },
              prefix,
              iconName: iconIdentifier,
              extra,
              watchable: true
            }));
            var element = DOCUMENT.createElementNS("http://www.w3.org/2000/svg", "svg");
            if (position === "::before") {
              node.insertBefore(element, node.firstChild);
            } else {
              node.appendChild(element);
            }
            element.outerHTML = abstract.map(function(a$$1) {
              return toHtml(a$$1);
            }).join("\n");
            node.removeAttribute(pendingAttribute);
            resolve();
          }).catch(reject);
        } else {
          resolve();
        }
      } else {
        resolve();
      }
    });
  }
  function replace2(node) {
    return Promise.all([replaceForPosition(node, "::before"), replaceForPosition(node, "::after")]);
  }
  function processable(node) {
    return node.parentNode !== document.head && !~TAGNAMES_TO_SKIP_FOR_PSEUDOELEMENTS.indexOf(node.tagName.toUpperCase()) && !node.getAttribute(DATA_FA_PSEUDO_ELEMENT) && (!node.parentNode || node.parentNode.tagName !== "svg");
  }
  var hasPseudoElement = function hasPseudoElement2(selector) {
    return !!selector && PSEUDO_ELEMENTS.some(function(pseudoSelector) {
      return selector.includes(pseudoSelector);
    });
  };
  var parseCSSRuleForPseudos = function parseCSSRuleForPseudos2(selectorText) {
    if (!selectorText) return [];
    var selectorSet = /* @__PURE__ */ new Set();
    var selectors = selectorText.split(/,(?![^()]*\))/).map(function(s$$1) {
      return s$$1.trim();
    });
    selectors = selectors.flatMap(function(selector2) {
      return selector2.includes("(") ? selector2 : selector2.split(",").map(function(s$$1) {
        return s$$1.trim();
      });
    });
    var _iterator = _createForOfIteratorHelper(selectors), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var selector = _step.value;
        if (hasPseudoElement(selector)) {
          var selectorWithoutPseudo = PSEUDO_ELEMENTS.reduce(function(acc, pseudoSelector) {
            return acc.replace(pseudoSelector, "");
          }, selector);
          if (selectorWithoutPseudo !== "" && selectorWithoutPseudo !== "*") {
            selectorSet.add(selectorWithoutPseudo);
          }
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return selectorSet;
  };
  function searchPseudoElements(root) {
    var useAsNodeList = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    if (!IS_DOM) return;
    var nodeList;
    if (useAsNodeList) {
      nodeList = root;
    } else if (config.searchPseudoElementsFullScan) {
      nodeList = root.querySelectorAll("*");
    } else {
      var selectorSet = /* @__PURE__ */ new Set();
      var _iterator2 = _createForOfIteratorHelper(document.styleSheets), _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
          var stylesheet = _step2.value;
          try {
            var _iterator3 = _createForOfIteratorHelper(stylesheet.cssRules), _step3;
            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
                var rule = _step3.value;
                var parsedSelectors = parseCSSRuleForPseudos(rule.selectorText);
                var _iterator4 = _createForOfIteratorHelper(parsedSelectors), _step4;
                try {
                  for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
                    var selector = _step4.value;
                    selectorSet.add(selector);
                  }
                } catch (err) {
                  _iterator4.e(err);
                } finally {
                  _iterator4.f();
                }
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
          } catch (e$$1) {
            if (config.searchPseudoElementsWarnings) {
              console.warn("Font Awesome: cannot parse stylesheet: ".concat(stylesheet.href, " (").concat(e$$1.message, ')\nIf it declares any Font Awesome CSS pseudo-elements, they will not be rendered as SVG icons. Add crossorigin="anonymous" to the <link>, enable searchPseudoElementsFullScan for slower but more thorough DOM parsing, or suppress this warning by setting searchPseudoElementsWarnings to false.'));
            }
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      if (!selectorSet.size) return;
      var cleanSelectors = Array.from(selectorSet).join(", ");
      try {
        nodeList = root.querySelectorAll(cleanSelectors);
      } catch (_unused) {
      }
    }
    return new Promise(function(resolve, reject) {
      var operations = toArray(nodeList).filter(processable).map(replace2);
      var end3 = perf.begin("searchPseudoElements");
      disableObservation();
      Promise.all(operations).then(function() {
        end3();
        enableObservation();
        resolve();
      }).catch(function() {
        end3();
        enableObservation();
        reject();
      });
    });
  }
  var PseudoElements = {
    hooks: function hooks3() {
      return {
        mutationObserverCallbacks: function mutationObserverCallbacks(accumulator) {
          accumulator.pseudoElementsCallback = searchPseudoElements;
          return accumulator;
        }
      };
    },
    provides: function provides3(providers2) {
      providers2.pseudoElements2svg = function(params) {
        var _params$node = params.node, node = _params$node === void 0 ? DOCUMENT : _params$node;
        if (config.searchPseudoElements) {
          searchPseudoElements(node);
        }
      };
    }
  };
  var _unwatched = false;
  var MutationObserver$1 = {
    mixout: function mixout6() {
      return {
        dom: {
          unwatch: function unwatch() {
            disableObservation();
            _unwatched = true;
          }
        }
      };
    },
    hooks: function hooks4() {
      return {
        bootstrap: function bootstrap() {
          observe(chainHooks("mutationObserverCallbacks", {}));
        },
        noAuto: function noAuto3() {
          disconnect();
        },
        watch: function watch2(params) {
          var observeMutationsRoot = params.observeMutationsRoot;
          if (_unwatched) {
            enableObservation();
          } else {
            observe(chainHooks("mutationObserverCallbacks", {
              observeMutationsRoot
            }));
          }
        }
      };
    }
  };
  var parseTransformString = function parseTransformString2(transformString) {
    var transform = {
      size: 16,
      x: 0,
      y: 0,
      flipX: false,
      flipY: false,
      rotate: 0
    };
    return transformString.toLowerCase().split(" ").reduce(function(acc, n2) {
      var parts = n2.toLowerCase().split("-");
      var first = parts[0];
      var rest = parts.slice(1).join("-");
      if (first && rest === "h") {
        acc.flipX = true;
        return acc;
      }
      if (first && rest === "v") {
        acc.flipY = true;
        return acc;
      }
      rest = parseFloat(rest);
      if (isNaN(rest)) {
        return acc;
      }
      switch (first) {
        case "grow":
          acc.size = acc.size + rest;
          break;
        case "shrink":
          acc.size = acc.size - rest;
          break;
        case "left":
          acc.x = acc.x - rest;
          break;
        case "right":
          acc.x = acc.x + rest;
          break;
        case "up":
          acc.y = acc.y - rest;
          break;
        case "down":
          acc.y = acc.y + rest;
          break;
        case "rotate":
          acc.rotate = acc.rotate + rest;
          break;
      }
      return acc;
    }, transform);
  };
  var PowerTransforms = {
    mixout: function mixout7() {
      return {
        parse: {
          transform: function transform(transformString) {
            return parseTransformString(transformString);
          }
        }
      };
    },
    hooks: function hooks5() {
      return {
        parseNodeAttributes: function parseNodeAttributes(accumulator, node) {
          var transformString = node.getAttribute("data-fa-transform");
          if (transformString) {
            accumulator.transform = parseTransformString(transformString);
          }
          return accumulator;
        }
      };
    },
    provides: function provides4(providers2) {
      providers2.generateAbstractTransformGrouping = function(_ref2) {
        var main = _ref2.main, transform = _ref2.transform, containerWidth = _ref2.containerWidth, iconWidth = _ref2.iconWidth;
        var outer = {
          transform: "translate(".concat(containerWidth / 2, " 256)")
        };
        var innerTranslate = "translate(".concat(transform.x * 32, ", ").concat(transform.y * 32, ") ");
        var innerScale = "scale(".concat(transform.size / 16 * (transform.flipX ? -1 : 1), ", ").concat(transform.size / 16 * (transform.flipY ? -1 : 1), ") ");
        var innerRotate = "rotate(".concat(transform.rotate, " 0 0)");
        var inner = {
          transform: "".concat(innerTranslate, " ").concat(innerScale, " ").concat(innerRotate)
        };
        var path = {
          transform: "translate(".concat(iconWidth / 2 * -1, " -256)")
        };
        var operations = {
          outer,
          inner,
          path
        };
        return {
          tag: "g",
          attributes: _objectSpread2({}, operations.outer),
          children: [{
            tag: "g",
            attributes: _objectSpread2({}, operations.inner),
            children: [{
              tag: main.icon.tag,
              children: main.icon.children,
              attributes: _objectSpread2(_objectSpread2({}, main.icon.attributes), operations.path)
            }]
          }]
        };
      };
    }
  };
  var ALL_SPACE = {
    x: 0,
    y: 0,
    width: "100%",
    height: "100%"
  };
  function fillBlack(abstract) {
    var force = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    if (abstract.attributes && (abstract.attributes.fill || force)) {
      abstract.attributes.fill = "black";
    }
    return abstract;
  }
  function deGroup(abstract) {
    if (abstract.tag === "g") {
      return abstract.children;
    } else {
      return [abstract];
    }
  }
  var Masks = {
    hooks: function hooks6() {
      return {
        parseNodeAttributes: function parseNodeAttributes(accumulator, node) {
          var maskData = node.getAttribute("data-fa-mask");
          var mask2 = !maskData ? emptyCanonicalIcon() : getCanonicalIcon(maskData.split(" ").map(function(i2) {
            return i2.trim();
          }));
          if (!mask2.prefix) {
            mask2.prefix = getDefaultUsablePrefix();
          }
          accumulator.mask = mask2;
          accumulator.maskId = node.getAttribute("data-fa-mask-id");
          return accumulator;
        }
      };
    },
    provides: function provides5(providers2) {
      providers2.generateAbstractMask = function(_ref2) {
        var children = _ref2.children, attributes = _ref2.attributes, main = _ref2.main, mask2 = _ref2.mask, explicitMaskId = _ref2.maskId, transform = _ref2.transform;
        var mainWidth = main.width, mainPath = main.icon;
        var maskWidth = mask2.width, maskPath = mask2.icon;
        var trans = transformForSvg({
          transform,
          containerWidth: maskWidth,
          iconWidth: mainWidth
        });
        var maskRect = {
          tag: "rect",
          attributes: _objectSpread2(_objectSpread2({}, ALL_SPACE), {}, {
            fill: "white"
          })
        };
        var maskInnerGroupChildrenMixin = mainPath.children ? {
          children: mainPath.children.map(fillBlack)
        } : {};
        var maskInnerGroup = {
          tag: "g",
          attributes: _objectSpread2({}, trans.inner),
          children: [fillBlack(_objectSpread2({
            tag: mainPath.tag,
            attributes: _objectSpread2(_objectSpread2({}, mainPath.attributes), trans.path)
          }, maskInnerGroupChildrenMixin))]
        };
        var maskOuterGroup = {
          tag: "g",
          attributes: _objectSpread2({}, trans.outer),
          children: [maskInnerGroup]
        };
        var maskId = "mask-".concat(explicitMaskId || nextUniqueId());
        var clipId = "clip-".concat(explicitMaskId || nextUniqueId());
        var maskTag = {
          tag: "mask",
          attributes: _objectSpread2(_objectSpread2({}, ALL_SPACE), {}, {
            id: maskId,
            maskUnits: "userSpaceOnUse",
            maskContentUnits: "userSpaceOnUse"
          }),
          children: [maskRect, maskOuterGroup]
        };
        var defs = {
          tag: "defs",
          children: [{
            tag: "clipPath",
            attributes: {
              id: clipId
            },
            children: deGroup(maskPath)
          }, maskTag]
        };
        children.push(defs, {
          tag: "rect",
          attributes: _objectSpread2({
            "fill": "currentColor",
            "clip-path": "url(#".concat(clipId, ")"),
            "mask": "url(#".concat(maskId, ")")
          }, ALL_SPACE)
        });
        return {
          children,
          attributes
        };
      };
    }
  };
  var MissingIconIndicator = {
    provides: function provides6(providers2) {
      var reduceMotion = false;
      if (WINDOW.matchMedia) {
        reduceMotion = WINDOW.matchMedia("(prefers-reduced-motion: reduce)").matches;
      }
      providers2.missingIconAbstract = function() {
        var gChildren = [];
        var FILL = {
          fill: "currentColor"
        };
        var ANIMATION_BASE = {
          attributeType: "XML",
          repeatCount: "indefinite",
          dur: "2s"
        };
        gChildren.push({
          tag: "path",
          attributes: _objectSpread2(_objectSpread2({}, FILL), {}, {
            d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"
          })
        });
        var OPACITY_ANIMATE = _objectSpread2(_objectSpread2({}, ANIMATION_BASE), {}, {
          attributeName: "opacity"
        });
        var dot = {
          tag: "circle",
          attributes: _objectSpread2(_objectSpread2({}, FILL), {}, {
            cx: "256",
            cy: "364",
            r: "28"
          }),
          children: []
        };
        if (!reduceMotion) {
          dot.children.push({
            tag: "animate",
            attributes: _objectSpread2(_objectSpread2({}, ANIMATION_BASE), {}, {
              attributeName: "r",
              values: "28;14;28;28;14;28;"
            })
          }, {
            tag: "animate",
            attributes: _objectSpread2(_objectSpread2({}, OPACITY_ANIMATE), {}, {
              values: "1;0;1;1;0;1;"
            })
          });
        }
        gChildren.push(dot);
        gChildren.push({
          tag: "path",
          attributes: _objectSpread2(_objectSpread2({}, FILL), {}, {
            opacity: "1",
            d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"
          }),
          children: reduceMotion ? [] : [{
            tag: "animate",
            attributes: _objectSpread2(_objectSpread2({}, OPACITY_ANIMATE), {}, {
              values: "1;0;0;0;0;1;"
            })
          }]
        });
        if (!reduceMotion) {
          gChildren.push({
            tag: "path",
            attributes: _objectSpread2(_objectSpread2({}, FILL), {}, {
              opacity: "0",
              d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"
            }),
            children: [{
              tag: "animate",
              attributes: _objectSpread2(_objectSpread2({}, OPACITY_ANIMATE), {}, {
                values: "0;0;1;1;0;0;"
              })
            }]
          });
        }
        return {
          tag: "g",
          attributes: {
            class: "missing"
          },
          children: gChildren
        };
      };
    }
  };
  var SvgSymbols = {
    hooks: function hooks7() {
      return {
        parseNodeAttributes: function parseNodeAttributes(accumulator, node) {
          var symbolData = node.getAttribute("data-fa-symbol");
          var symbol = symbolData === null ? false : symbolData === "" ? true : symbolData;
          accumulator["symbol"] = symbol;
          return accumulator;
        }
      };
    }
  };
  var plugins = [InjectCSS, ReplaceElements, Layers, LayersCounter, LayersText, PseudoElements, MutationObserver$1, PowerTransforms, Masks, MissingIconIndicator, SvgSymbols];
  registerPlugins(plugins, {
    mixoutsTo: api
  });
  var noAuto$1 = api.noAuto;
  var config$1 = api.config;
  var library$1 = api.library;
  var dom$1 = api.dom;
  var parse$1 = api.parse;
  var findIconDefinition$1 = api.findIconDefinition;
  var toHtml$1 = api.toHtml;
  var icon2 = api.icon;
  var layer = api.layer;
  var text = api.text;
  var counter = api.counter;

  // node_modules/@fortawesome/free-solid-svg-icons/index.mjs
  var faEnvelope = {
    prefix: "fas",
    iconName: "envelope",
    icon: [512, 512, [128386, 9993, 61443], "f0e0", "M48 64c-26.5 0-48 21.5-48 48 0 15.1 7.1 29.3 19.2 38.4l208 156c17.1 12.8 40.5 12.8 57.6 0l208-156c12.1-9.1 19.2-23.3 19.2-38.4 0-26.5-21.5-48-48-48L48 64zM0 196L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-188-198.4 148.8c-34.1 25.6-81.1 25.6-115.2 0L0 196z"]
  };

  // node_modules/@fortawesome/free-brands-svg-icons/index.mjs
  var faSquareGithub = {
    prefix: "fab",
    iconName: "square-github",
    icon: [448, 512, ["github-square"], "f092", "M384 32c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32l320 0zM223.7 96c-88.4 0-159.7 72.2-159.7 160.6 0 69.4 44.1 126.9 103.4 148.4 8.4 3.1 16.6-2.5 16.6-10.9l0-25c-4.4 1.9-10 3.1-15 3.1-20.6 0-32.8-11.2-41.6-32.2-3.4-8.4-7.2-13.4-14.4-14.4-3.7-.3-5-1.9-5-3.8 0-3.7 6.2-6.6 12.5-6.6 9.1 0 16.9 5.6 25 17.2 6.2 9.1 12.8 13.1 20.6 13.1s12.8-2.8 20-10c5.3-5.3 9.4-10 13.1-13.1-41.3-5-70.3-34.7-70.3-73.1 0-15.6 5.6-32.5 15-43.8-4.1-10.3-3.4-32.2 1.2-41.2 12.5-1.6 29.4 5 39.4 14.1 11.9-3.7 24.4-5.6 39.7-5.6s27.8 1.9 39.1 5.3c9.7-8.8 26.9-15.3 39.4-13.8 4.4 8.4 5 30.3 .9 40.9 10 11.9 15.3 27.8 15.3 44.1 0 38.4-29.1 67.5-70.9 72.8 10.6 6.9 17.8 21.9 17.8 39.1l0 32.5c0 9.4 7.8 14.7 17.2 10.9 56.6-21.6 100.9-78.1 100.9-148.1 0-88.4-71.9-160.6-160.3-160.6z"]
  };
  var faSquareLinkedin = {
    prefix: "fab",
    iconName: "square-linkedin",
    icon: [448, 512, [], "e7d0", "M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm5 170.2l66.5 0 0 213.8-66.5 0 0-213.8zm71.7-67.7a38.5 38.5 0 1 1 -77 0 38.5 38.5 0 1 1 77 0zM317.9 416l0-104c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9l0 105.8-66.4 0 0-213.8 63.7 0 0 29.2 .9 0c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9l0 117.2-66.4 0z"]
  };

  // src/app.js
  library$1.add(faEnvelope, faSquareGithub, faSquareLinkedin);
  dom$1.watch();
  var is_touch_device = () => {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0 || window.PointerEvent && window.matchMedia("(pointer: coarse)").matches;
  };
  if (history.scrollRestoration) {
    history.scrollRestoration = "manual";
  }
  if (window.location.hash) {
    window.location.hash = "";
  }
  var nav_scroll = () => {
    var lastScrollTop = 0;
    $(window).scroll(function() {
      var st = $(this).scrollTop();
      if (st === 0) {
        if ($(".navigation").hasClass("slide-up")) {
          $(".navigation").removeClass("slide-up");
        }
      }
      if (st > 20) {
        $(".navigation").css("filter", "drop-shadow(0px -1px 8px black)");
      } else {
        $(".navigation").css("filter", "drop-shadow(0px 0px black)");
      }
      if (st > 100) {
        if (st > lastScrollTop) {
          $(".navigation").addClass("slide-up");
        } else {
          $(".navigation").removeClass("slide-up");
        }
      }
      lastScrollTop = st;
    });
  };
  function reset_page() {
    $("#letter-e").click(
      () => {
        location.reload();
      }
    );
  }
  function open_dropdown() {
    $("#footer-dropdown").click(
      function() {
        let dropdown_state = $(".dropdown-content").css("display");
        if (dropdown_state == "none") {
          $(".dropdown-content").css("display", "block");
        } else {
          $(".dropdown-content").css("display", "");
        }
      }
    );
  }
  function toggle_mobile_menu() {
    $(".hamburger").click(
      function() {
        const mobile_nav_open = $(".nav-links").hasClass("active");
        if (mobile_nav_open) {
          close_mobile_menu();
        } else {
          $(".nav-links").addClass("active");
          animate_hamburger();
          $(".hamburger").attr("aria-expanded", "true");
          $("body").css("overflow", "hidden");
        }
      }
    );
  }
  var animate_hamburger = () => {
    const hamburger_bars = [
      [".hamburger .bar:nth-child(2) ", { opacity: 0 }],
      [".hamburger .bar:nth-child(3)", { width: "35px", transform: "translateY(-12px)" }],
      [".hamburger .bar:nth-child(1)", { transform: "translateY(13px)" }],
      // Pause for a second when the bars meet in middle for dramatic effect with delay
      [".hamburger .bar:nth-child(1)", { transform: "translateY(12px) rotate(45deg)" }, { delay: 0.1 }],
      [".hamburger .bar:nth-child(3)", { transform: "translateY(-13px) rotate(-45deg)" }],
      // Starts animating nav links 0.25 seconds from start of animation sequence
      [".nav-links li", { opacity: 1, y: [-50, 0] }, { delay: stagger(0.08), at: 0.25 }]
    ];
    animate(
      hamburger_bars,
      {
        // each item in sequence has duration of 0.1 seconds
        defaultTransition: { duration: 0.1 }
      }
    );
  };
  var reverse_hamburger_animation = () => {
    const hamburger_bars = [
      [".hamburger .bar:nth-child(1)", { transform: "rotate(0deg)" }],
      [".hamburger .bar:nth-child(3)", { transform: "rotate(0deg) ", width: "25px" }],
      [".hamburger .bar:nth-child(2) ", { opacity: 1 }]
    ];
    animate(
      hamburger_bars,
      {
        defaultTransition: { duration: 0.1 }
      }
    );
  };
  var mobile_nav_links = () => {
    if (is_touch_device()) {
      $(".nav-links a").click(
        function() {
          close_mobile_menu();
        }
      );
    }
  };
  var close_mobile_menu = () => {
    animate(".nav-links li", { opacity: 0, y: [0, -50] }, { delay: stagger(0.05) });
    reverse_hamburger_animation();
    $(".nav-links").removeClass("active");
    $("body").css("overflow", "visible");
    $(".hamburger").attr("aria-expanded", "false");
  };
  var add_accessibility = () => {
    $(".hamburger").attr("aria-label", "Toggle navigation menu");
    $(".hamburger").attr("aria-expanded", "false");
    $(".hamburger").attr("role", "button");
    $(".hamburger").attr("tabindex", "0");
    $(".hamburger").on(
      "keydown",
      (e2) => {
        if (e2.key === "Enter" || e2.key === " ") {
          e2.preventDefault();
          $(".hamburger").click();
        }
      }
    );
  };
  var generate_random_substring = (length, symbols) => {
    let random_substring = "";
    for (let i2 = 0; i2 <= length; i2++) {
      random_substring += symbols.charAt(Math.floor(Math.random() * symbols.length));
    }
    return random_substring;
  };
  var scramble_text = (latest, count, element, target_string, symbols) => {
    element.text(
      function() {
        if (latest === 1) {
          return target_string;
        }
        if (count % 4 === 0) {
          return generate_random_substring(target_string.length, symbols);
        }
      }
    );
  };
  async function animate_hero() {
    const chars = ["\u{1F600}", "\u{1F603}", "\u{1F604}", "\u{1F601}", "\u{1F606}", "\u{1F605}"];
    const blocks = "\u2588\u2593\u2592\u2591";
    const binary = "01";
    const hex2 = "0123456789ABCDEF";
    const katakana = "\u30A2\u30A4\u30A6\u30A8\u30AA\u30AB\u30AD\u30AF\u30B1\u30B3\u30B5\u30B7\u30B9\u30BB\u30BD\u30BF\u30C1\u30C4\u30C6\u30C8\u30CA\u30CB\u30CC\u30CD\u30CE\u30CF\u30D2\u30D5\u30D8\u30DB\u30DE\u30DF\u30E0\u30E1\u30E2\u30E4\u30E6\u30E8\u30E9\u30EA\u30EB\u30EC\u30ED\u30EF\u30F2\u30F3";
    const dots = "\u2801\u2802\u2803\u2804\u2805\u2806\u2807\u2808\u2809\u280A\u280B\u280C\u280D\u280E\u280F";
    const name = "Esteban Rodriguez";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`\u2591\u2592\u2593\u2588\u2580\u2584\u25A0\u25A1\u25AA\u25AB\u25CF\u25CB\u25C6\u25C7\u25C8\u25CA\u203B\u2020\u2021";
    const name_element = $(".bold");
    const title_element = $(".title");
    let count = 0;
    const titles = ["Full-Stack Developer", "Front-End Engineer", "Web Developer"];
    const sequence = [
      [".navigation", { opacity: 1 }, { duration: 0.5 }],
      ["#letter-e", { opacity: 1 }, { duration: 0.25 }],
      ["#code-image", { opacity: 1, y: [35, 0] }, { duration: 0.25 }],
      [
        // On each value, by default latests counts from 0 to 1, for each of those values
        // between 0 and 1, runs callback to scramble the text
        (latest) => {
          scramble_text(latest, count, name_element, name, symbols);
          count++;
        },
        { at: "<-0.2", duration: 1 }
      ],
      [
        (latest) => {
          scramble_text(latest, count, title_element, titles[0], symbols);
          count++;
        },
        {
          duration: 1
        }
      ],
      [".github-linkedin", { opacity: 1 }, { at: "<+0.5", duration: 1 }],
      [".mail-icon", { opacity: 1 }, { at: "<+0.5", duration: 1 }]
    ];
    if (is_touch_device()) {
      sequence.splice(2, 0, [".hamburger .bar", { opacity: 1, y: [-15, 0] }, { delay: stagger(0.06) }]);
    } else {
      sequence.splice(2, 0, [".nav-links li", { opacity: 1, y: [-35, 0] }, { delay: stagger(0.06) }]);
    }
    const hero_animation = animate(sequence);
    await hero_animation;
    default_hover_states();
    scramble_text_infinte(symbols, titles);
  }
  var scramble_text_infinte = (symbols, titles) => {
    let is_repeating = false;
    let current_title = 0;
    let next_title = 0;
    let count = 0;
    animate(
      0,
      1,
      {
        duration: 1.5,
        ease: "circOut",
        // on each frame of the animation (a value between 0-1), set the elements text 
        // to a random substring in the symbols string with onUpdate callback
        onUpdate: (latest) => {
          if (is_repeating === false || latest < 1) {
            $(".title").text(
              function() {
                if (latest === 1) {
                  current_title++;
                  next_title = current_title + 1;
                  if (current_title > titles.length - 1) {
                    current_title = 0;
                  }
                  if (next_title > titles.length - 1) {
                    next_title = 0;
                  }
                  is_repeating = true;
                  return titles[current_title];
                }
                is_repeating = false;
                count++;
                if (count % 6 === 0) {
                  return generate_random_substring(titles[next_title].length, symbols);
                }
              }
            );
          }
        },
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 2
      }
    );
  };
  var default_hover_states = () => {
    hover(
      ".default-hover-state",
      (element) => {
        element.style.cursor = "pointer";
        animate(element, { opacity: 0.5, transform: "translateY(-6px)" });
        return () => {
          animate(element, { opacity: 1, transform: "translateY(0px)" });
        };
      }
    );
  };
  $(document).ready(function() {
    $(window).scrollTop(0);
    nav_scroll();
    reset_page();
    add_accessibility();
    animate_hero();
    open_dropdown();
    toggle_mobile_menu();
    mobile_nav_links();
  });
})();
/*! Bundled license information:

@fortawesome/fontawesome-svg-core/index.mjs:
@fortawesome/free-solid-svg-icons/index.mjs:
@fortawesome/free-brands-svg-icons/index.mjs:
  (*!
   * Font Awesome Free 7.3.1 by @fontawesome - https://fontawesome.com
   * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
   * Copyright 2026 Fonticons, Inc.
   *)
*/
