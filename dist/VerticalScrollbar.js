"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DragOverlay = require("./DragOverlay");

var _DragOverlay2 = _interopRequireDefault(_DragOverlay);

require("./VerticalScrollbar.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MODE_HOVERING = "hovering";
var MODE_GROVE_DRAGGING = "grove_dragging";
var MODE_THUMB_DRAGGING = "thumb_dragging";

var VerticalScrollbar = function (_PureComponent) {
  _inherits(VerticalScrollbar, _PureComponent);

  function VerticalScrollbar(props) {
    _classCallCheck(this, VerticalScrollbar);

    var _this = _possibleConstructorReturn(this, (VerticalScrollbar.__proto__ || Object.getPrototypeOf(VerticalScrollbar)).call(this, props));

    _this.startGroveDragging = function (ev) {
      ev.preventDefault();
      ev.stopPropagation();
      var _this$props = _this.props,
          height = _this$props.height,
          realHeight = _this$props.realHeight,
          realRange = _this$props.realRange;

      var domY = ev.clientY - _this.ref.current.getBoundingClientRect().top;

      var scrollStart = domY * realHeight / height - realRange / 2;
      _this.setState({ mode: MODE_GROVE_DRAGGING });
      _this.updateScrollStart(scrollStart);
    };

    _this.startThumbDragging = function (ev) {
      ev.preventDefault();
      ev.stopPropagation();
      _this.snapshot.scrollStart = _this.props.scrollStart;
      _this.snapshot.clientY = ev.clientY;
      _this.setState({ mode: MODE_THUMB_DRAGGING });
    };

    _this.endDragging = function (ev) {
      _this.setState({ mode: MODE_HOVERING });
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

      var domY = ev.clientY - _this.ref.current.getBoundingClientRect().top;
      var scrollStart = _this.snapshot.scrollStart + realHeight / height * (ev.clientY - _this.snapshot.clientY);
      _this.updateScrollStart(scrollStart);
    };

    _this.ref = _react2.default.createRef();
    _this.state = { mode: MODE_HOVERING
    };
    _this.snapshot = {};
    return _this;
  }

  _createClass(VerticalScrollbar, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          width = _props.width,
          height = _props.height,
          color = _props.color,
          realHeight = _props.realHeight,
          realRange = _props.realRange,
          scrollStart = _props.scrollStart;
      var mode = this.state.mode;

      var thumbTop = scrollStart / realHeight * height;
      var thumbHeight = Math.max(10, realRange / realHeight * height);

      if (mode === MODE_HOVERING) {
        return _react2.default.createElement(
          Fragment,
          null,
          _react2.default.createElement(
            "div",
            { className: "VerticalScrollbar-container",
              style: { height: height, width: width },
              onMouseDown: this.startGroveDragging,
              ref: this.ref
            },
            _react2.default.createElement("div", { className: "VerticalScrollbar-grove" }),
            _react2.default.createElement("div", { className: "VerticalScrollbar-thumb",
              style: { height: thumbHeight, top: thumbTop, backgroundColor: color },
              onMouseDown: this.startThumbDragging
            })
          )
        );
      } else if (mode === MODE_GROVE_DRAGGING) {
        return _react2.default.createElement(
          Fragment,
          null,
          _react2.default.createElement(
            "div",
            { className: "VerticalScrollbar-container",
              style: { height: height, width: width },
              ref: this.ref
            },
            _react2.default.createElement("div", { className: "VerticalScrollbar-grove" }),
            _react2.default.createElement("div", { className: "VerticalScrollbar-thumb",
              style: { height: thumbHeight, top: thumbTop, backgroundColor: color },
              onMouseDown: this.startThumbDragging
            })
          ),
          _react2.default.createElement(_DragOverlay2.default, { mouseMoveHandler: this.handleGroveDraggingMouseMove,
            mouseUpHandler: this.endDragging,
            style: { height: thumbHeight, top: thumbTop },
            cursor: "ns-resize" })
        );
      } else if (mode === MODE_THUMB_DRAGGING) {
        return _react2.default.createElement(
          Fragment,
          null,
          _react2.default.createElement(
            "div",
            { className: "VerticalScrollbar-container",
              style: { height: height, width: width },
              ref: this.ref
            },
            _react2.default.createElement("div", { className: "VerticalScrollbar-grove" }),
            _react2.default.createElement("div", { className: "VerticalScrollbar-thumb",
              style: { height: thumbHeight, top: thumbTop, backgroundColor: color },
              onMouseDown: this.startThumbDragging
            })
          ),
          _react2.default.createElement(_DragOverlay2.default, { mouseMoveHandler: this.handleThumbDraggingMouseMove,
            mouseUpHandler: this.endDragging,
            cursor: "ns-resize" })
        );
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
      var _props2 = this.props,
          realHeight = _props2.realHeight,
          realRange = _props2.realRange;

      return Math.max(0, Math.min(realHeight - realRange, scrollStart));
    }
  }]);

  return VerticalScrollbar;
}(_react.PureComponent);

VerticalScrollbar.propTypes = {
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired,
  realHeight: _propTypes2.default.number.isRequired,
  realRange: _propTypes2.default.number.isRequired,
  scrollStart: _propTypes2.default.number.isRequired,
  updateScrollStartHandler: _propTypes2.default.func.isRequired
};

exports.default = VerticalScrollbar;