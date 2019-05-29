"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DragOverlay = _interopRequireDefault(require("./DragOverlay"));

require("./VerticalScrollbar.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var MODE_HOVERING = "hovering";
var MODE_GROVE_DRAGGING = "grove_dragging";
var MODE_THUMB_DRAGGING = "thumb_dragging";

var VerticalScrollbar =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(VerticalScrollbar, _PureComponent);

  function VerticalScrollbar(props) {
    var _this;

    _classCallCheck(this, VerticalScrollbar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VerticalScrollbar).call(this, props));

    _this.startGroveDragging = function (ev) {
      ev.preventDefault();
      ev.stopPropagation();
      var _this$props = _this.props,
          height = _this$props.height,
          realHeight = _this$props.realHeight,
          realRange = _this$props.realRange;

      var domY = ev.clientY - _this.ref.current.getBoundingClientRect().top;

      var scrollStart = domY * realHeight / height - realRange / 2;

      _this.setState({
        mode: MODE_GROVE_DRAGGING
      });

      _this.updateScrollStart(scrollStart);
    };

    _this.startThumbDragging = function (ev) {
      ev.preventDefault();
      ev.stopPropagation();
      _this.snapshot.scrollStart = _this.props.scrollStart;
      _this.snapshot.clientY = ev.clientY;

      _this.setState({
        mode: MODE_THUMB_DRAGGING
      });
    };

    _this.endDragging = function (ev) {
      _this.setState({
        mode: MODE_HOVERING
      });
    };

    _this.handleGroveDraggingMouseMove = function (ev) {
      var _this$props2 = _this.props,
          height = _this$props2.height,
          realHeight = _this$props2.realHeight,
          realRange = _this$props2.realRange;

      var domY = ev.clientY - _this.ref.current.getBoundingClientRect().top;

      var scrollStart = domY * realHeight / height - realRange / 2;

      _this.updateScrollStart(scrollStart);
    };

    _this.handleThumbDraggingMouseMove = function (ev) {
      var _this$props3 = _this.props,
          height = _this$props3.height,
          realHeight = _this$props3.realHeight;
      var scrollStart = _this.snapshot.scrollStart + realHeight / height * (ev.clientY - _this.snapshot.clientY);

      _this.updateScrollStart(scrollStart);
    };

    _this.ref = _react.default.createRef();
    _this.state = {
      mode: MODE_HOVERING
    };
    _this.snapshot = {};
    return _this;
  }

  _createClass(VerticalScrollbar, [{
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          width = _this$props4.width,
          height = _this$props4.height,
          color = _this$props4.color,
          realHeight = _this$props4.realHeight,
          realRange = _this$props4.realRange,
          scrollStart = _this$props4.scrollStart;
      var mode = this.state.mode;
      var thumbTop = scrollStart / realHeight * height;
      var thumbHeight = Math.max(10, realRange / realHeight * height);

      if (mode === MODE_HOVERING) {
        return _react.default.createElement(_react.Fragment, null, _react.default.createElement("div", {
          className: "VerticalScrollbar-container",
          style: {
            height: height,
            width: width
          },
          onMouseDown: this.startGroveDragging,
          ref: this.ref
        }, _react.default.createElement("div", {
          className: "VerticalScrollbar-grove"
        }), _react.default.createElement("div", {
          className: "VerticalScrollbar-thumb",
          style: {
            height: thumbHeight,
            top: thumbTop,
            backgroundColor: color
          },
          onMouseDown: this.startThumbDragging
        })));
      } else if (mode === MODE_GROVE_DRAGGING) {
        return _react.default.createElement(_react.Fragment, null, _react.default.createElement("div", {
          className: "VerticalScrollbar-container",
          style: {
            height: height,
            width: width
          },
          ref: this.ref
        }, _react.default.createElement("div", {
          className: "VerticalScrollbar-grove"
        }), _react.default.createElement("div", {
          className: "VerticalScrollbar-thumb",
          style: {
            height: thumbHeight,
            top: thumbTop,
            backgroundColor: color
          },
          onMouseDown: this.startThumbDragging
        })), _react.default.createElement(_DragOverlay.default, {
          mouseMoveHandler: this.handleGroveDraggingMouseMove,
          mouseUpHandler: this.endDragging,
          style: {
            height: thumbHeight,
            top: thumbTop
          },
          cursor: "ns-resize"
        }));
      } else if (mode === MODE_THUMB_DRAGGING) {
        return _react.default.createElement(_react.Fragment, null, _react.default.createElement("div", {
          className: "VerticalScrollbar-container",
          style: {
            height: height,
            width: width
          },
          ref: this.ref
        }, _react.default.createElement("div", {
          className: "VerticalScrollbar-grove"
        }), _react.default.createElement("div", {
          className: "VerticalScrollbar-thumb",
          style: {
            height: thumbHeight,
            top: thumbTop,
            backgroundColor: color
          },
          onMouseDown: this.startThumbDragging
        })), _react.default.createElement(_DragOverlay.default, {
          mouseMoveHandler: this.handleThumbDraggingMouseMove,
          mouseUpHandler: this.endDragging,
          cursor: "ns-resize"
        }));
      } else {
        throw new TypeError("Unknown mode", mode);
      }
    }
  }, {
    key: "updateScrollStart",
    value: function updateScrollStart(scrollStart) {
      var updateScrollStartHandler = this.props.updateScrollStartHandler;
      scrollStart = this.capScrollStart(scrollStart);

      if (updateScrollStartHandler && this.props.scrollStart !== scrollStart) {
        updateScrollStartHandler(scrollStart);
      }
    }
  }, {
    key: "capScrollStart",
    value: function capScrollStart(scrollStart) {
      var _this$props5 = this.props,
          realHeight = _this$props5.realHeight,
          realRange = _this$props5.realRange;
      return Math.max(0, Math.min(realHeight - realRange, scrollStart));
    }
  }]);

  return VerticalScrollbar;
}(_react.PureComponent);

VerticalScrollbar.propTypes = {
  width: _propTypes.default.number.isRequired,
  height: _propTypes.default.number.isRequired,
  realHeight: _propTypes.default.number.isRequired,
  realRange: _propTypes.default.number.isRequired,
  scrollStart: _propTypes.default.number.isRequired,
  updateScrollStartHandler: _propTypes.default.func.isRequired
};
var _default = VerticalScrollbar;
exports.default = _default;