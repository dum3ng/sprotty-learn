(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i = decorators.length - 1, decorator; i >= 0; i--)
      if (decorator = decorators[i])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp(target, key, result);
    return result;
  };

  // node_modules/sprotty-protocol/lib/utils/object.js
  var require_object = __commonJS({
    "node_modules/sprotty-protocol/lib/utils/object.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.safeAssign = exports.hasOwnProperty = exports.isObject = void 0;
      function isObject(data) {
        return typeof data === "object" && data !== null;
      }
      exports.isObject = isObject;
      function hasOwnProperty(arg, key, type) {
        if (!isObject(arg)) {
          return false;
        }
        if (Array.isArray(key)) {
          for (const k of key) {
            if (!Object.prototype.hasOwnProperty.call(arg, k)) {
              return false;
            }
            if (typeof type === "string" && typeof arg[k] !== type) {
              return false;
            } else if (typeof type === "function" && !type(arg[k])) {
              return false;
            }
          }
        } else {
          if (!Object.prototype.hasOwnProperty.call(arg, key)) {
            return false;
          }
          if (typeof type === "string") {
            return typeof arg[key] === type;
          }
          if (typeof type === "function") {
            return type(arg[key]);
          }
        }
        return true;
      }
      exports.hasOwnProperty = hasOwnProperty;
      function safeAssign(target, partial) {
        return Object.assign(target, partial);
      }
      exports.safeAssign = safeAssign;
    }
  });

  // node_modules/sprotty-protocol/lib/actions.js
  var require_actions = __commonJS({
    "node_modules/sprotty-protocol/lib/actions.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ReconnectAction = exports.ApplyLabelEditAction = exports.DeleteElementAction = exports.CreateElementAction = exports.HoverFeedbackAction = exports.MoveAction = exports.RedoAction = exports.UndoAction = exports.BringToFrontAction = exports.SetViewportAction = exports.FitToScreenAction = exports.CenterAction = exports.LayoutAction = exports.OpenAction = exports.CollapseExpandAllAction = exports.CollapseExpandAction = exports.SelectAllAction = exports.SelectAction = exports.LoggingAction = exports.ComputedBoundsAction = exports.RequestBoundsAction = exports.SetBoundsAction = exports.SetPopupModelAction = exports.RequestPopupModelAction = exports.UpdateModelAction = exports.SetModelAction = exports.RequestModelAction = exports.RejectAction = exports.isResponseAction = exports.generateRequestId = exports.isRequestAction = exports.isAction = exports.isActionMessage = void 0;
      var object_1 = require_object();
      function isActionMessage(object) {
        return (0, object_1.hasOwnProperty)(object, "action");
      }
      exports.isActionMessage = isActionMessage;
      function isAction(object) {
        return (0, object_1.hasOwnProperty)(object, "kind", "string");
      }
      exports.isAction = isAction;
      function isRequestAction(object) {
        return (0, object_1.hasOwnProperty)(object, "requestId", "string");
      }
      exports.isRequestAction = isRequestAction;
      var nextRequestId = 1;
      function generateRequestId() {
        return (nextRequestId++).toString();
      }
      exports.generateRequestId = generateRequestId;
      function isResponseAction(object) {
        return (0, object_1.hasOwnProperty)(object, "responseId", "string") && object.responseId !== "";
      }
      exports.isResponseAction = isResponseAction;
      var RejectAction;
      (function(RejectAction2) {
        RejectAction2.KIND = "rejectRequest";
        function create(options) {
          return {
            kind: RejectAction2.KIND,
            message: options.message,
            detail: options.detail,
            responseId: options.requestId
          };
        }
        RejectAction2.create = create;
      })(RejectAction = exports.RejectAction || (exports.RejectAction = {}));
      var RequestModelAction;
      (function(RequestModelAction2) {
        RequestModelAction2.KIND = "requestModel";
        function create(options) {
          return {
            kind: RequestModelAction2.KIND,
            options,
            requestId: generateRequestId()
          };
        }
        RequestModelAction2.create = create;
      })(RequestModelAction = exports.RequestModelAction || (exports.RequestModelAction = {}));
      var SetModelAction;
      (function(SetModelAction2) {
        SetModelAction2.KIND = "setModel";
        function create(newRoot, requestId = "") {
          return {
            kind: SetModelAction2.KIND,
            newRoot,
            responseId: requestId
          };
        }
        SetModelAction2.create = create;
      })(SetModelAction = exports.SetModelAction || (exports.SetModelAction = {}));
      var UpdateModelAction;
      (function(UpdateModelAction2) {
        UpdateModelAction2.KIND = "updateModel";
        function create(input, options = {}) {
          if (Array.isArray(input)) {
            return {
              kind: UpdateModelAction2.KIND,
              matches: input,
              animate: options.animate,
              cause: options.cause
            };
          } else {
            return {
              kind: UpdateModelAction2.KIND,
              newRoot: input,
              animate: options.animate,
              cause: options.cause
            };
          }
        }
        UpdateModelAction2.create = create;
      })(UpdateModelAction = exports.UpdateModelAction || (exports.UpdateModelAction = {}));
      var RequestPopupModelAction;
      (function(RequestPopupModelAction2) {
        RequestPopupModelAction2.KIND = "requestPopupModel";
        function create(options) {
          return {
            kind: RequestPopupModelAction2.KIND,
            elementId: options.elementId,
            bounds: options.bounds,
            requestId: generateRequestId()
          };
        }
        RequestPopupModelAction2.create = create;
      })(RequestPopupModelAction = exports.RequestPopupModelAction || (exports.RequestPopupModelAction = {}));
      var SetPopupModelAction;
      (function(SetPopupModelAction2) {
        SetPopupModelAction2.KIND = "setPopupModel";
        function create(newRoot, requestId = "") {
          return {
            kind: SetPopupModelAction2.KIND,
            newRoot,
            responseId: requestId
          };
        }
        SetPopupModelAction2.create = create;
      })(SetPopupModelAction = exports.SetPopupModelAction || (exports.SetPopupModelAction = {}));
      var SetBoundsAction;
      (function(SetBoundsAction2) {
        SetBoundsAction2.KIND = "setBounds";
        function create(bounds) {
          return {
            kind: SetBoundsAction2.KIND,
            bounds
          };
        }
        SetBoundsAction2.create = create;
      })(SetBoundsAction = exports.SetBoundsAction || (exports.SetBoundsAction = {}));
      var RequestBoundsAction;
      (function(RequestBoundsAction2) {
        RequestBoundsAction2.KIND = "requestBounds";
        function create(newRoot) {
          return {
            kind: RequestBoundsAction2.KIND,
            newRoot,
            requestId: generateRequestId()
          };
        }
        RequestBoundsAction2.create = create;
      })(RequestBoundsAction = exports.RequestBoundsAction || (exports.RequestBoundsAction = {}));
      var ComputedBoundsAction;
      (function(ComputedBoundsAction2) {
        ComputedBoundsAction2.KIND = "computedBounds";
        function create(bounds, options = {}) {
          var _a;
          return {
            kind: ComputedBoundsAction2.KIND,
            bounds,
            revision: options.revision,
            alignments: options.alignments,
            responseId: (_a = options.requestId) !== null && _a !== void 0 ? _a : ""
          };
        }
        ComputedBoundsAction2.create = create;
      })(ComputedBoundsAction = exports.ComputedBoundsAction || (exports.ComputedBoundsAction = {}));
      var LoggingAction;
      (function(LoggingAction2) {
        LoggingAction2.KIND = "logging";
        function create(options) {
          return Object.assign({ kind: LoggingAction2.KIND }, options);
        }
        LoggingAction2.create = create;
      })(LoggingAction = exports.LoggingAction || (exports.LoggingAction = {}));
      var SelectAction;
      (function(SelectAction2) {
        SelectAction2.KIND = "elementSelected";
        function create(options) {
          var _a, _b;
          return {
            kind: SelectAction2.KIND,
            selectedElementsIDs: (_a = options.selectedElementsIDs) !== null && _a !== void 0 ? _a : [],
            deselectedElementsIDs: (_b = options.deselectedElementsIDs) !== null && _b !== void 0 ? _b : []
          };
        }
        SelectAction2.create = create;
      })(SelectAction = exports.SelectAction || (exports.SelectAction = {}));
      var SelectAllAction;
      (function(SelectAllAction2) {
        SelectAllAction2.KIND = "allSelected";
        function create(options = {}) {
          var _a;
          return {
            kind: SelectAllAction2.KIND,
            select: (_a = options.select) !== null && _a !== void 0 ? _a : true
          };
        }
        SelectAllAction2.create = create;
      })(SelectAllAction = exports.SelectAllAction || (exports.SelectAllAction = {}));
      var CollapseExpandAction;
      (function(CollapseExpandAction2) {
        CollapseExpandAction2.KIND = "collapseExpand";
        function create(options) {
          var _a, _b;
          return {
            kind: CollapseExpandAction2.KIND,
            expandIds: (_a = options.expandIds) !== null && _a !== void 0 ? _a : [],
            collapseIds: (_b = options.collapseIds) !== null && _b !== void 0 ? _b : []
          };
        }
        CollapseExpandAction2.create = create;
      })(CollapseExpandAction = exports.CollapseExpandAction || (exports.CollapseExpandAction = {}));
      var CollapseExpandAllAction;
      (function(CollapseExpandAllAction2) {
        CollapseExpandAllAction2.KIND = "collapseExpandAll";
        function create(options = {}) {
          var _a;
          return {
            kind: CollapseExpandAllAction2.KIND,
            expand: (_a = options.expand) !== null && _a !== void 0 ? _a : true
          };
        }
        CollapseExpandAllAction2.create = create;
      })(CollapseExpandAllAction = exports.CollapseExpandAllAction || (exports.CollapseExpandAllAction = {}));
      var OpenAction;
      (function(OpenAction2) {
        OpenAction2.KIND = "open";
        function create(elementId) {
          return {
            kind: OpenAction2.KIND,
            elementId
          };
        }
        OpenAction2.create = create;
      })(OpenAction = exports.OpenAction || (exports.OpenAction = {}));
      var LayoutAction;
      (function(LayoutAction2) {
        LayoutAction2.KIND = "layout";
        function create(options = {}) {
          return {
            kind: LayoutAction2.KIND,
            layoutType: options.layoutType,
            elementIds: options.elementIds
          };
        }
        LayoutAction2.create = create;
      })(LayoutAction = exports.LayoutAction || (exports.LayoutAction = {}));
      var CenterAction;
      (function(CenterAction2) {
        CenterAction2.KIND = "center";
        function create(elementIds, options = {}) {
          var _a, _b;
          return {
            kind: CenterAction2.KIND,
            elementIds,
            animate: (_a = options.animate) !== null && _a !== void 0 ? _a : true,
            retainZoom: (_b = options.retainZoom) !== null && _b !== void 0 ? _b : false
          };
        }
        CenterAction2.create = create;
      })(CenterAction = exports.CenterAction || (exports.CenterAction = {}));
      var FitToScreenAction;
      (function(FitToScreenAction2) {
        FitToScreenAction2.KIND = "fit";
        function create(elementIds, options = {}) {
          var _a;
          return {
            kind: FitToScreenAction2.KIND,
            elementIds,
            padding: options.padding,
            maxZoom: options.maxZoom,
            animate: (_a = options.animate) !== null && _a !== void 0 ? _a : true
          };
        }
        FitToScreenAction2.create = create;
      })(FitToScreenAction = exports.FitToScreenAction || (exports.FitToScreenAction = {}));
      var SetViewportAction;
      (function(SetViewportAction2) {
        SetViewportAction2.KIND = "viewport";
        function create(elementId, newViewport, options = {}) {
          var _a;
          return {
            kind: SetViewportAction2.KIND,
            elementId,
            newViewport,
            animate: (_a = options.animate) !== null && _a !== void 0 ? _a : true
          };
        }
        SetViewportAction2.create = create;
      })(SetViewportAction = exports.SetViewportAction || (exports.SetViewportAction = {}));
      var BringToFrontAction;
      (function(BringToFrontAction2) {
        BringToFrontAction2.KIND = "bringToFront";
        function create(elementIDs) {
          return {
            kind: BringToFrontAction2.KIND,
            elementIDs
          };
        }
        BringToFrontAction2.create = create;
      })(BringToFrontAction = exports.BringToFrontAction || (exports.BringToFrontAction = {}));
      var UndoAction;
      (function(UndoAction2) {
        UndoAction2.KIND = "undo";
        function create() {
          return {
            kind: UndoAction2.KIND
          };
        }
        UndoAction2.create = create;
      })(UndoAction = exports.UndoAction || (exports.UndoAction = {}));
      var RedoAction;
      (function(RedoAction2) {
        RedoAction2.KIND = "redo";
        function create() {
          return {
            kind: RedoAction2.KIND
          };
        }
        RedoAction2.create = create;
      })(RedoAction = exports.RedoAction || (exports.RedoAction = {}));
      var MoveAction;
      (function(MoveAction2) {
        MoveAction2.KIND = "move";
        function create(moves, options = {}) {
          var _a, _b;
          return {
            kind: MoveAction2.KIND,
            moves,
            animate: (_a = options.animate) !== null && _a !== void 0 ? _a : true,
            finished: (_b = options.finished) !== null && _b !== void 0 ? _b : false
          };
        }
        MoveAction2.create = create;
      })(MoveAction = exports.MoveAction || (exports.MoveAction = {}));
      var HoverFeedbackAction;
      (function(HoverFeedbackAction2) {
        HoverFeedbackAction2.KIND = "hoverFeedback";
        function create(options) {
          return {
            kind: HoverFeedbackAction2.KIND,
            mouseoverElement: options.mouseoverElement,
            mouseIsOver: options.mouseIsOver
          };
        }
        HoverFeedbackAction2.create = create;
      })(HoverFeedbackAction = exports.HoverFeedbackAction || (exports.HoverFeedbackAction = {}));
      var CreateElementAction;
      (function(CreateElementAction2) {
        CreateElementAction2.KIND = "createElement";
        function create(elementSchema, options) {
          return {
            kind: CreateElementAction2.KIND,
            elementSchema,
            containerId: options.containerId
          };
        }
        CreateElementAction2.create = create;
      })(CreateElementAction = exports.CreateElementAction || (exports.CreateElementAction = {}));
      var DeleteElementAction;
      (function(DeleteElementAction2) {
        DeleteElementAction2.KIND = "delete";
        function create(elementIds) {
          return {
            kind: DeleteElementAction2.KIND,
            elementIds
          };
        }
        DeleteElementAction2.create = create;
      })(DeleteElementAction = exports.DeleteElementAction || (exports.DeleteElementAction = {}));
      var ApplyLabelEditAction;
      (function(ApplyLabelEditAction2) {
        ApplyLabelEditAction2.KIND = "applyLabelEdit";
        function create(labelId, text) {
          return {
            kind: ApplyLabelEditAction2.KIND,
            labelId,
            text
          };
        }
        ApplyLabelEditAction2.create = create;
      })(ApplyLabelEditAction = exports.ApplyLabelEditAction || (exports.ApplyLabelEditAction = {}));
      var ReconnectAction;
      (function(ReconnectAction2) {
        ReconnectAction2.KIND = "reconnect";
        function create(options) {
          return {
            kind: ReconnectAction2.KIND,
            routableId: options.routableId,
            newSourceId: options.newSourceId,
            newTargetId: options.newTargetId
          };
        }
        ReconnectAction2.create = create;
      })(ReconnectAction = exports.ReconnectAction || (exports.ReconnectAction = {}));
    }
  });

  // node_modules/sprotty/lib/base/actions/action.js
  var require_action = __commonJS({
    "node_modules/sprotty/lib/base/actions/action.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isLabeledAction = exports.LabeledAction = exports.RejectAction = exports.isResponseAction = exports.generateRequestId = exports.isRequestAction = exports.isAction = void 0;
      var actions_1 = require_actions();
      var object_1 = require_object();
      function isAction(object) {
        return (0, object_1.hasOwnProperty)(object, "kind", "string");
      }
      exports.isAction = isAction;
      function isRequestAction(object) {
        return isAction(object) && (0, object_1.hasOwnProperty)(object, "requestId", "string");
      }
      exports.isRequestAction = isRequestAction;
      exports.generateRequestId = actions_1.generateRequestId;
      function isResponseAction(object) {
        return isAction(object) && (0, object_1.hasOwnProperty)(object, "responseId", "string") && object.responseId !== "";
      }
      exports.isResponseAction = isResponseAction;
      var RejectAction = class {
        constructor(message, responseId, detail) {
          this.message = message;
          this.responseId = responseId;
          this.detail = detail;
          this.kind = RejectAction.KIND;
        }
      };
      exports.RejectAction = RejectAction;
      RejectAction.KIND = "rejectRequest";
      var LabeledAction = class {
        constructor(label, actions, icon) {
          this.label = label;
          this.actions = actions;
          this.icon = icon;
        }
      };
      exports.LabeledAction = LabeledAction;
      function isLabeledAction(element) {
        return element !== void 0 && element.label !== void 0 && element.actions !== void 0;
      }
      exports.isLabeledAction = isLabeledAction;
    }
  });

  // node_modules/inversify/lib/constants/metadata_keys.js
  var require_metadata_keys = __commonJS({
    "node_modules/inversify/lib/constants/metadata_keys.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.NON_CUSTOM_TAG_KEYS = exports.POST_CONSTRUCT = exports.DESIGN_PARAM_TYPES = exports.PARAM_TYPES = exports.TAGGED_PROP = exports.TAGGED = exports.MULTI_INJECT_TAG = exports.INJECT_TAG = exports.OPTIONAL_TAG = exports.UNMANAGED_TAG = exports.NAME_TAG = exports.NAMED_TAG = void 0;
      exports.NAMED_TAG = "named";
      exports.NAME_TAG = "name";
      exports.UNMANAGED_TAG = "unmanaged";
      exports.OPTIONAL_TAG = "optional";
      exports.INJECT_TAG = "inject";
      exports.MULTI_INJECT_TAG = "multi_inject";
      exports.TAGGED = "inversify:tagged";
      exports.TAGGED_PROP = "inversify:tagged_props";
      exports.PARAM_TYPES = "inversify:paramtypes";
      exports.DESIGN_PARAM_TYPES = "design:paramtypes";
      exports.POST_CONSTRUCT = "post_construct";
      function getNonCustomTagKeys() {
        return [
          exports.INJECT_TAG,
          exports.MULTI_INJECT_TAG,
          exports.NAME_TAG,
          exports.UNMANAGED_TAG,
          exports.NAMED_TAG,
          exports.OPTIONAL_TAG
        ];
      }
      exports.NON_CUSTOM_TAG_KEYS = getNonCustomTagKeys();
    }
  });

  // node_modules/inversify/lib/constants/literal_types.js
  var require_literal_types = __commonJS({
    "node_modules/inversify/lib/constants/literal_types.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.TargetTypeEnum = exports.BindingTypeEnum = exports.BindingScopeEnum = void 0;
      var BindingScopeEnum = {
        Request: "Request",
        Singleton: "Singleton",
        Transient: "Transient"
      };
      exports.BindingScopeEnum = BindingScopeEnum;
      var BindingTypeEnum = {
        ConstantValue: "ConstantValue",
        Constructor: "Constructor",
        DynamicValue: "DynamicValue",
        Factory: "Factory",
        Function: "Function",
        Instance: "Instance",
        Invalid: "Invalid",
        Provider: "Provider"
      };
      exports.BindingTypeEnum = BindingTypeEnum;
      var TargetTypeEnum = {
        ClassProperty: "ClassProperty",
        ConstructorArgument: "ConstructorArgument",
        Variable: "Variable"
      };
      exports.TargetTypeEnum = TargetTypeEnum;
    }
  });

  // node_modules/inversify/lib/utils/id.js
  var require_id = __commonJS({
    "node_modules/inversify/lib/utils/id.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.id = void 0;
      var idCounter = 0;
      function id() {
        return idCounter++;
      }
      exports.id = id;
    }
  });

  // node_modules/inversify/lib/bindings/binding.js
  var require_binding = __commonJS({
    "node_modules/inversify/lib/bindings/binding.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Binding = void 0;
      var literal_types_1 = require_literal_types();
      var id_1 = require_id();
      var Binding = function() {
        function Binding2(serviceIdentifier, scope) {
          this.id = id_1.id();
          this.activated = false;
          this.serviceIdentifier = serviceIdentifier;
          this.scope = scope;
          this.type = literal_types_1.BindingTypeEnum.Invalid;
          this.constraint = function(request) {
            return true;
          };
          this.implementationType = null;
          this.cache = null;
          this.factory = null;
          this.provider = null;
          this.onActivation = null;
          this.dynamicValue = null;
        }
        Binding2.prototype.clone = function() {
          var clone = new Binding2(this.serviceIdentifier, this.scope);
          clone.activated = clone.scope === literal_types_1.BindingScopeEnum.Singleton ? this.activated : false;
          clone.implementationType = this.implementationType;
          clone.dynamicValue = this.dynamicValue;
          clone.scope = this.scope;
          clone.type = this.type;
          clone.factory = this.factory;
          clone.provider = this.provider;
          clone.constraint = this.constraint;
          clone.onActivation = this.onActivation;
          clone.cache = this.cache;
          return clone;
        };
        return Binding2;
      }();
      exports.Binding = Binding;
    }
  });

  // node_modules/inversify/lib/constants/error_msgs.js
  var require_error_msgs = __commonJS({
    "node_modules/inversify/lib/constants/error_msgs.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.STACK_OVERFLOW = exports.CIRCULAR_DEPENDENCY_IN_FACTORY = exports.POST_CONSTRUCT_ERROR = exports.MULTIPLE_POST_CONSTRUCT_METHODS = exports.CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK = exports.CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE = exports.CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE = exports.CONTAINER_OPTIONS_MUST_BE_AN_OBJECT = exports.ARGUMENTS_LENGTH_MISMATCH = exports.INVALID_DECORATOR_OPERATION = exports.INVALID_TO_SELF_VALUE = exports.INVALID_FUNCTION_BINDING = exports.INVALID_MIDDLEWARE_RETURN = exports.NO_MORE_SNAPSHOTS_AVAILABLE = exports.INVALID_BINDING_TYPE = exports.NOT_IMPLEMENTED = exports.CIRCULAR_DEPENDENCY = exports.UNDEFINED_INJECT_ANNOTATION = exports.MISSING_INJECT_ANNOTATION = exports.MISSING_INJECTABLE_ANNOTATION = exports.NOT_REGISTERED = exports.CANNOT_UNBIND = exports.AMBIGUOUS_MATCH = exports.KEY_NOT_FOUND = exports.NULL_ARGUMENT = exports.DUPLICATED_METADATA = exports.DUPLICATED_INJECTABLE_DECORATOR = void 0;
      exports.DUPLICATED_INJECTABLE_DECORATOR = "Cannot apply @injectable decorator multiple times.";
      exports.DUPLICATED_METADATA = "Metadata key was used more than once in a parameter:";
      exports.NULL_ARGUMENT = "NULL argument";
      exports.KEY_NOT_FOUND = "Key Not Found";
      exports.AMBIGUOUS_MATCH = "Ambiguous match found for serviceIdentifier:";
      exports.CANNOT_UNBIND = "Could not unbind serviceIdentifier:";
      exports.NOT_REGISTERED = "No matching bindings found for serviceIdentifier:";
      exports.MISSING_INJECTABLE_ANNOTATION = "Missing required @injectable annotation in:";
      exports.MISSING_INJECT_ANNOTATION = "Missing required @inject or @multiInject annotation in:";
      var UNDEFINED_INJECT_ANNOTATION = function(name) {
        return "@inject called with undefined this could mean that the class " + name + " has a circular dependency problem. You can use a LazyServiceIdentifer to  overcome this limitation.";
      };
      exports.UNDEFINED_INJECT_ANNOTATION = UNDEFINED_INJECT_ANNOTATION;
      exports.CIRCULAR_DEPENDENCY = "Circular dependency found:";
      exports.NOT_IMPLEMENTED = "Sorry, this feature is not fully implemented yet.";
      exports.INVALID_BINDING_TYPE = "Invalid binding type:";
      exports.NO_MORE_SNAPSHOTS_AVAILABLE = "No snapshot available to restore.";
      exports.INVALID_MIDDLEWARE_RETURN = "Invalid return type in middleware. Middleware must return!";
      exports.INVALID_FUNCTION_BINDING = "Value provided to function binding must be a function!";
      exports.INVALID_TO_SELF_VALUE = "The toSelf function can only be applied when a constructor is used as service identifier";
      exports.INVALID_DECORATOR_OPERATION = "The @inject @multiInject @tagged and @named decorators must be applied to the parameters of a class constructor or a class property.";
      var ARGUMENTS_LENGTH_MISMATCH = function() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          values[_i] = arguments[_i];
        }
        return "The number of constructor arguments in the derived class " + (values[0] + " must be >= than the number of constructor arguments of its base class.");
      };
      exports.ARGUMENTS_LENGTH_MISMATCH = ARGUMENTS_LENGTH_MISMATCH;
      exports.CONTAINER_OPTIONS_MUST_BE_AN_OBJECT = "Invalid Container constructor argument. Container options must be an object.";
      exports.CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE = "Invalid Container option. Default scope must be a string ('singleton' or 'transient').";
      exports.CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE = "Invalid Container option. Auto bind injectable must be a boolean";
      exports.CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK = "Invalid Container option. Skip base check must be a boolean";
      exports.MULTIPLE_POST_CONSTRUCT_METHODS = "Cannot apply @postConstruct decorator multiple times in the same class";
      var POST_CONSTRUCT_ERROR = function() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          values[_i] = arguments[_i];
        }
        return "@postConstruct error in class " + values[0] + ": " + values[1];
      };
      exports.POST_CONSTRUCT_ERROR = POST_CONSTRUCT_ERROR;
      var CIRCULAR_DEPENDENCY_IN_FACTORY = function() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          values[_i] = arguments[_i];
        }
        return "It looks like there is a circular dependency " + ("in one of the '" + values[0] + "' bindings. Please investigate bindings with") + ("service identifier '" + values[1] + "'.");
      };
      exports.CIRCULAR_DEPENDENCY_IN_FACTORY = CIRCULAR_DEPENDENCY_IN_FACTORY;
      exports.STACK_OVERFLOW = "Maximum call stack size exceeded";
    }
  });

  // node_modules/inversify/lib/planning/metadata_reader.js
  var require_metadata_reader = __commonJS({
    "node_modules/inversify/lib/planning/metadata_reader.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.MetadataReader = void 0;
      var METADATA_KEY = require_metadata_keys();
      var MetadataReader = function() {
        function MetadataReader2() {
        }
        MetadataReader2.prototype.getConstructorMetadata = function(constructorFunc) {
          var compilerGeneratedMetadata = Reflect.getMetadata(METADATA_KEY.PARAM_TYPES, constructorFunc);
          var userGeneratedMetadata = Reflect.getMetadata(METADATA_KEY.TAGGED, constructorFunc);
          return {
            compilerGeneratedMetadata,
            userGeneratedMetadata: userGeneratedMetadata || {}
          };
        };
        MetadataReader2.prototype.getPropertiesMetadata = function(constructorFunc) {
          var userGeneratedMetadata = Reflect.getMetadata(METADATA_KEY.TAGGED_PROP, constructorFunc) || [];
          return userGeneratedMetadata;
        };
        return MetadataReader2;
      }();
      exports.MetadataReader = MetadataReader;
    }
  });

  // node_modules/inversify/lib/bindings/binding_count.js
  var require_binding_count = __commonJS({
    "node_modules/inversify/lib/bindings/binding_count.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.BindingCount = void 0;
      var BindingCount = {
        MultipleBindingsAvailable: 2,
        NoBindingsAvailable: 0,
        OnlyOneBindingAvailable: 1
      };
      exports.BindingCount = BindingCount;
    }
  });

  // node_modules/inversify/lib/utils/exceptions.js
  var require_exceptions = __commonJS({
    "node_modules/inversify/lib/utils/exceptions.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isStackOverflowExeption = void 0;
      var ERROR_MSGS = require_error_msgs();
      function isStackOverflowExeption(error) {
        return error instanceof RangeError || error.message === ERROR_MSGS.STACK_OVERFLOW;
      }
      exports.isStackOverflowExeption = isStackOverflowExeption;
    }
  });

  // node_modules/inversify/lib/utils/serialization.js
  var require_serialization = __commonJS({
    "node_modules/inversify/lib/utils/serialization.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.circularDependencyToException = exports.listMetadataForTarget = exports.listRegisteredBindingsForServiceIdentifier = exports.getServiceIdentifierAsString = exports.getFunctionName = void 0;
      var ERROR_MSGS = require_error_msgs();
      function getServiceIdentifierAsString(serviceIdentifier) {
        if (typeof serviceIdentifier === "function") {
          var _serviceIdentifier = serviceIdentifier;
          return _serviceIdentifier.name;
        } else if (typeof serviceIdentifier === "symbol") {
          return serviceIdentifier.toString();
        } else {
          var _serviceIdentifier = serviceIdentifier;
          return _serviceIdentifier;
        }
      }
      exports.getServiceIdentifierAsString = getServiceIdentifierAsString;
      function listRegisteredBindingsForServiceIdentifier(container, serviceIdentifier, getBindings) {
        var registeredBindingsList = "";
        var registeredBindings = getBindings(container, serviceIdentifier);
        if (registeredBindings.length !== 0) {
          registeredBindingsList = "\nRegistered bindings:";
          registeredBindings.forEach(function(binding) {
            var name = "Object";
            if (binding.implementationType !== null) {
              name = getFunctionName(binding.implementationType);
            }
            registeredBindingsList = registeredBindingsList + "\n " + name;
            if (binding.constraint.metaData) {
              registeredBindingsList = registeredBindingsList + " - " + binding.constraint.metaData;
            }
          });
        }
        return registeredBindingsList;
      }
      exports.listRegisteredBindingsForServiceIdentifier = listRegisteredBindingsForServiceIdentifier;
      function alreadyDependencyChain(request, serviceIdentifier) {
        if (request.parentRequest === null) {
          return false;
        } else if (request.parentRequest.serviceIdentifier === serviceIdentifier) {
          return true;
        } else {
          return alreadyDependencyChain(request.parentRequest, serviceIdentifier);
        }
      }
      function dependencyChainToString(request) {
        function _createStringArr(req, result) {
          if (result === void 0) {
            result = [];
          }
          var serviceIdentifier = getServiceIdentifierAsString(req.serviceIdentifier);
          result.push(serviceIdentifier);
          if (req.parentRequest !== null) {
            return _createStringArr(req.parentRequest, result);
          }
          return result;
        }
        var stringArr = _createStringArr(request);
        return stringArr.reverse().join(" --> ");
      }
      function circularDependencyToException(request) {
        request.childRequests.forEach(function(childRequest) {
          if (alreadyDependencyChain(childRequest, childRequest.serviceIdentifier)) {
            var services = dependencyChainToString(childRequest);
            throw new Error(ERROR_MSGS.CIRCULAR_DEPENDENCY + " " + services);
          } else {
            circularDependencyToException(childRequest);
          }
        });
      }
      exports.circularDependencyToException = circularDependencyToException;
      function listMetadataForTarget(serviceIdentifierString, target) {
        if (target.isTagged() || target.isNamed()) {
          var m_1 = "";
          var namedTag = target.getNamedTag();
          var otherTags = target.getCustomTags();
          if (namedTag !== null) {
            m_1 += namedTag.toString() + "\n";
          }
          if (otherTags !== null) {
            otherTags.forEach(function(tag) {
              m_1 += tag.toString() + "\n";
            });
          }
          return " " + serviceIdentifierString + "\n " + serviceIdentifierString + " - " + m_1;
        } else {
          return " " + serviceIdentifierString;
        }
      }
      exports.listMetadataForTarget = listMetadataForTarget;
      function getFunctionName(v) {
        if (v.name) {
          return v.name;
        } else {
          var name_1 = v.toString();
          var match = name_1.match(/^function\s*([^\s(]+)/);
          return match ? match[1] : "Anonymous function: " + name_1;
        }
      }
      exports.getFunctionName = getFunctionName;
    }
  });

  // node_modules/inversify/lib/planning/context.js
  var require_context = __commonJS({
    "node_modules/inversify/lib/planning/context.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Context = void 0;
      var id_1 = require_id();
      var Context = function() {
        function Context2(container) {
          this.id = id_1.id();
          this.container = container;
        }
        Context2.prototype.addPlan = function(plan) {
          this.plan = plan;
        };
        Context2.prototype.setCurrentRequest = function(currentRequest) {
          this.currentRequest = currentRequest;
        };
        return Context2;
      }();
      exports.Context = Context;
    }
  });

  // node_modules/inversify/lib/planning/metadata.js
  var require_metadata = __commonJS({
    "node_modules/inversify/lib/planning/metadata.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Metadata = void 0;
      var METADATA_KEY = require_metadata_keys();
      var Metadata = function() {
        function Metadata2(key, value) {
          this.key = key;
          this.value = value;
        }
        Metadata2.prototype.toString = function() {
          if (this.key === METADATA_KEY.NAMED_TAG) {
            return "named: " + this.value.toString() + " ";
          } else {
            return "tagged: { key:" + this.key.toString() + ", value: " + this.value + " }";
          }
        };
        return Metadata2;
      }();
      exports.Metadata = Metadata;
    }
  });

  // node_modules/inversify/lib/planning/plan.js
  var require_plan = __commonJS({
    "node_modules/inversify/lib/planning/plan.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Plan = void 0;
      var Plan = function() {
        function Plan2(parentContext, rootRequest) {
          this.parentContext = parentContext;
          this.rootRequest = rootRequest;
        }
        return Plan2;
      }();
      exports.Plan = Plan;
    }
  });

  // node_modules/inversify/lib/annotation/decorator_utils.js
  var require_decorator_utils = __commonJS({
    "node_modules/inversify/lib/annotation/decorator_utils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.tagProperty = exports.tagParameter = exports.decorate = void 0;
      var ERROR_MSGS = require_error_msgs();
      var METADATA_KEY = require_metadata_keys();
      function tagParameter(annotationTarget, propertyName, parameterIndex, metadata) {
        var metadataKey = METADATA_KEY.TAGGED;
        _tagParameterOrProperty(metadataKey, annotationTarget, propertyName, metadata, parameterIndex);
      }
      exports.tagParameter = tagParameter;
      function tagProperty(annotationTarget, propertyName, metadata) {
        var metadataKey = METADATA_KEY.TAGGED_PROP;
        _tagParameterOrProperty(metadataKey, annotationTarget.constructor, propertyName, metadata);
      }
      exports.tagProperty = tagProperty;
      function _tagParameterOrProperty(metadataKey, annotationTarget, propertyName, metadata, parameterIndex) {
        var paramsOrPropertiesMetadata = {};
        var isParameterDecorator = typeof parameterIndex === "number";
        var key = parameterIndex !== void 0 && isParameterDecorator ? parameterIndex.toString() : propertyName;
        if (isParameterDecorator && propertyName !== void 0) {
          throw new Error(ERROR_MSGS.INVALID_DECORATOR_OPERATION);
        }
        if (Reflect.hasOwnMetadata(metadataKey, annotationTarget)) {
          paramsOrPropertiesMetadata = Reflect.getMetadata(metadataKey, annotationTarget);
        }
        var paramOrPropertyMetadata = paramsOrPropertiesMetadata[key];
        if (!Array.isArray(paramOrPropertyMetadata)) {
          paramOrPropertyMetadata = [];
        } else {
          for (var _i = 0, paramOrPropertyMetadata_1 = paramOrPropertyMetadata; _i < paramOrPropertyMetadata_1.length; _i++) {
            var m = paramOrPropertyMetadata_1[_i];
            if (m.key === metadata.key) {
              throw new Error(ERROR_MSGS.DUPLICATED_METADATA + " " + m.key.toString());
            }
          }
        }
        paramOrPropertyMetadata.push(metadata);
        paramsOrPropertiesMetadata[key] = paramOrPropertyMetadata;
        Reflect.defineMetadata(metadataKey, paramsOrPropertiesMetadata, annotationTarget);
      }
      function _decorate(decorators, target) {
        Reflect.decorate(decorators, target);
      }
      function _param(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      }
      function decorate(decorator, target, parameterIndex) {
        if (typeof parameterIndex === "number") {
          _decorate([_param(parameterIndex, decorator)], target);
        } else if (typeof parameterIndex === "string") {
          Reflect.decorate([decorator], target, parameterIndex);
        } else {
          _decorate([decorator], target);
        }
      }
      exports.decorate = decorate;
    }
  });

  // node_modules/inversify/lib/annotation/inject.js
  var require_inject = __commonJS({
    "node_modules/inversify/lib/annotation/inject.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.inject = exports.LazyServiceIdentifer = void 0;
      var error_msgs_1 = require_error_msgs();
      var METADATA_KEY = require_metadata_keys();
      var metadata_1 = require_metadata();
      var decorator_utils_1 = require_decorator_utils();
      var LazyServiceIdentifer = function() {
        function LazyServiceIdentifer2(cb) {
          this._cb = cb;
        }
        LazyServiceIdentifer2.prototype.unwrap = function() {
          return this._cb();
        };
        return LazyServiceIdentifer2;
      }();
      exports.LazyServiceIdentifer = LazyServiceIdentifer;
      function inject(serviceIdentifier) {
        return function(target, targetKey, index) {
          if (serviceIdentifier === void 0) {
            throw new Error(error_msgs_1.UNDEFINED_INJECT_ANNOTATION(target.name));
          }
          var metadata = new metadata_1.Metadata(METADATA_KEY.INJECT_TAG, serviceIdentifier);
          if (typeof index === "number") {
            decorator_utils_1.tagParameter(target, targetKey, index, metadata);
          } else {
            decorator_utils_1.tagProperty(target, targetKey, metadata);
          }
        };
      }
      exports.inject = inject;
    }
  });

  // node_modules/inversify/lib/planning/queryable_string.js
  var require_queryable_string = __commonJS({
    "node_modules/inversify/lib/planning/queryable_string.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.QueryableString = void 0;
      var QueryableString = function() {
        function QueryableString2(str) {
          this.str = str;
        }
        QueryableString2.prototype.startsWith = function(searchString) {
          return this.str.indexOf(searchString) === 0;
        };
        QueryableString2.prototype.endsWith = function(searchString) {
          var reverseString = "";
          var reverseSearchString = searchString.split("").reverse().join("");
          reverseString = this.str.split("").reverse().join("");
          return this.startsWith.call({ str: reverseString }, reverseSearchString);
        };
        QueryableString2.prototype.contains = function(searchString) {
          return this.str.indexOf(searchString) !== -1;
        };
        QueryableString2.prototype.equals = function(compareString) {
          return this.str === compareString;
        };
        QueryableString2.prototype.value = function() {
          return this.str;
        };
        return QueryableString2;
      }();
      exports.QueryableString = QueryableString;
    }
  });

  // node_modules/inversify/lib/planning/target.js
  var require_target = __commonJS({
    "node_modules/inversify/lib/planning/target.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Target = void 0;
      var METADATA_KEY = require_metadata_keys();
      var id_1 = require_id();
      var metadata_1 = require_metadata();
      var queryable_string_1 = require_queryable_string();
      var Target = function() {
        function Target2(type, name, serviceIdentifier, namedOrTagged) {
          this.id = id_1.id();
          this.type = type;
          this.serviceIdentifier = serviceIdentifier;
          this.name = new queryable_string_1.QueryableString(name || "");
          this.metadata = new Array();
          var metadataItem = null;
          if (typeof namedOrTagged === "string") {
            metadataItem = new metadata_1.Metadata(METADATA_KEY.NAMED_TAG, namedOrTagged);
          } else if (namedOrTagged instanceof metadata_1.Metadata) {
            metadataItem = namedOrTagged;
          }
          if (metadataItem !== null) {
            this.metadata.push(metadataItem);
          }
        }
        Target2.prototype.hasTag = function(key) {
          for (var _i = 0, _a = this.metadata; _i < _a.length; _i++) {
            var m = _a[_i];
            if (m.key === key) {
              return true;
            }
          }
          return false;
        };
        Target2.prototype.isArray = function() {
          return this.hasTag(METADATA_KEY.MULTI_INJECT_TAG);
        };
        Target2.prototype.matchesArray = function(name) {
          return this.matchesTag(METADATA_KEY.MULTI_INJECT_TAG)(name);
        };
        Target2.prototype.isNamed = function() {
          return this.hasTag(METADATA_KEY.NAMED_TAG);
        };
        Target2.prototype.isTagged = function() {
          return this.metadata.some(function(metadata) {
            return METADATA_KEY.NON_CUSTOM_TAG_KEYS.every(function(key) {
              return metadata.key !== key;
            });
          });
        };
        Target2.prototype.isOptional = function() {
          return this.matchesTag(METADATA_KEY.OPTIONAL_TAG)(true);
        };
        Target2.prototype.getNamedTag = function() {
          if (this.isNamed()) {
            return this.metadata.filter(function(m) {
              return m.key === METADATA_KEY.NAMED_TAG;
            })[0];
          }
          return null;
        };
        Target2.prototype.getCustomTags = function() {
          if (this.isTagged()) {
            return this.metadata.filter(function(metadata) {
              return METADATA_KEY.NON_CUSTOM_TAG_KEYS.every(function(key) {
                return metadata.key !== key;
              });
            });
          } else {
            return null;
          }
        };
        Target2.prototype.matchesNamedTag = function(name) {
          return this.matchesTag(METADATA_KEY.NAMED_TAG)(name);
        };
        Target2.prototype.matchesTag = function(key) {
          var _this = this;
          return function(value) {
            for (var _i = 0, _a = _this.metadata; _i < _a.length; _i++) {
              var m = _a[_i];
              if (m.key === key && m.value === value) {
                return true;
              }
            }
            return false;
          };
        };
        return Target2;
      }();
      exports.Target = Target;
    }
  });

  // node_modules/inversify/lib/planning/reflection_utils.js
  var require_reflection_utils = __commonJS({
    "node_modules/inversify/lib/planning/reflection_utils.js"(exports) {
      "use strict";
      var __spreadArray = exports && exports.__spreadArray || function(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
          to[j] = from[i];
        return to;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getFunctionName = exports.getBaseClassDependencyCount = exports.getDependencies = void 0;
      var inject_1 = require_inject();
      var ERROR_MSGS = require_error_msgs();
      var literal_types_1 = require_literal_types();
      var METADATA_KEY = require_metadata_keys();
      var serialization_1 = require_serialization();
      Object.defineProperty(exports, "getFunctionName", { enumerable: true, get: function() {
        return serialization_1.getFunctionName;
      } });
      var target_1 = require_target();
      function getDependencies(metadataReader, func) {
        var constructorName = serialization_1.getFunctionName(func);
        var targets = getTargets(metadataReader, constructorName, func, false);
        return targets;
      }
      exports.getDependencies = getDependencies;
      function getTargets(metadataReader, constructorName, func, isBaseClass) {
        var metadata = metadataReader.getConstructorMetadata(func);
        var serviceIdentifiers = metadata.compilerGeneratedMetadata;
        if (serviceIdentifiers === void 0) {
          var msg = ERROR_MSGS.MISSING_INJECTABLE_ANNOTATION + " " + constructorName + ".";
          throw new Error(msg);
        }
        var constructorArgsMetadata = metadata.userGeneratedMetadata;
        var keys = Object.keys(constructorArgsMetadata);
        var hasUserDeclaredUnknownInjections = func.length === 0 && keys.length > 0;
        var hasOptionalParameters = keys.length > func.length;
        var iterations = hasUserDeclaredUnknownInjections || hasOptionalParameters ? keys.length : func.length;
        var constructorTargets = getConstructorArgsAsTargets(isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata, iterations);
        var propertyTargets = getClassPropsAsTargets(metadataReader, func);
        var targets = __spreadArray(__spreadArray([], constructorTargets), propertyTargets);
        return targets;
      }
      function getConstructorArgsAsTarget(index, isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata) {
        var targetMetadata = constructorArgsMetadata[index.toString()] || [];
        var metadata = formatTargetMetadata(targetMetadata);
        var isManaged = metadata.unmanaged !== true;
        var serviceIdentifier = serviceIdentifiers[index];
        var injectIdentifier = metadata.inject || metadata.multiInject;
        serviceIdentifier = injectIdentifier ? injectIdentifier : serviceIdentifier;
        if (serviceIdentifier instanceof inject_1.LazyServiceIdentifer) {
          serviceIdentifier = serviceIdentifier.unwrap();
        }
        if (isManaged) {
          var isObject = serviceIdentifier === Object;
          var isFunction = serviceIdentifier === Function;
          var isUndefined = serviceIdentifier === void 0;
          var isUnknownType = isObject || isFunction || isUndefined;
          if (!isBaseClass && isUnknownType) {
            var msg = ERROR_MSGS.MISSING_INJECT_ANNOTATION + " argument " + index + " in class " + constructorName + ".";
            throw new Error(msg);
          }
          var target = new target_1.Target(literal_types_1.TargetTypeEnum.ConstructorArgument, metadata.targetName, serviceIdentifier);
          target.metadata = targetMetadata;
          return target;
        }
        return null;
      }
      function getConstructorArgsAsTargets(isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata, iterations) {
        var targets = [];
        for (var i = 0; i < iterations; i++) {
          var index = i;
          var target = getConstructorArgsAsTarget(index, isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata);
          if (target !== null) {
            targets.push(target);
          }
        }
        return targets;
      }
      function getClassPropsAsTargets(metadataReader, constructorFunc) {
        var classPropsMetadata = metadataReader.getPropertiesMetadata(constructorFunc);
        var targets = [];
        var keys = Object.keys(classPropsMetadata);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
          var key = keys_1[_i];
          var targetMetadata = classPropsMetadata[key];
          var metadata = formatTargetMetadata(classPropsMetadata[key]);
          var targetName = metadata.targetName || key;
          var serviceIdentifier = metadata.inject || metadata.multiInject;
          var target = new target_1.Target(literal_types_1.TargetTypeEnum.ClassProperty, targetName, serviceIdentifier);
          target.metadata = targetMetadata;
          targets.push(target);
        }
        var baseConstructor = Object.getPrototypeOf(constructorFunc.prototype).constructor;
        if (baseConstructor !== Object) {
          var baseTargets = getClassPropsAsTargets(metadataReader, baseConstructor);
          targets = __spreadArray(__spreadArray([], targets), baseTargets);
        }
        return targets;
      }
      function getBaseClassDependencyCount(metadataReader, func) {
        var baseConstructor = Object.getPrototypeOf(func.prototype).constructor;
        if (baseConstructor !== Object) {
          var baseConstructorName = serialization_1.getFunctionName(baseConstructor);
          var targets = getTargets(metadataReader, baseConstructorName, baseConstructor, true);
          var metadata = targets.map(function(t) {
            return t.metadata.filter(function(m) {
              return m.key === METADATA_KEY.UNMANAGED_TAG;
            });
          });
          var unmanagedCount = [].concat.apply([], metadata).length;
          var dependencyCount = targets.length - unmanagedCount;
          if (dependencyCount > 0) {
            return dependencyCount;
          } else {
            return getBaseClassDependencyCount(metadataReader, baseConstructor);
          }
        } else {
          return 0;
        }
      }
      exports.getBaseClassDependencyCount = getBaseClassDependencyCount;
      function formatTargetMetadata(targetMetadata) {
        var targetMetadataMap = {};
        targetMetadata.forEach(function(m) {
          targetMetadataMap[m.key.toString()] = m.value;
        });
        return {
          inject: targetMetadataMap[METADATA_KEY.INJECT_TAG],
          multiInject: targetMetadataMap[METADATA_KEY.MULTI_INJECT_TAG],
          targetName: targetMetadataMap[METADATA_KEY.NAME_TAG],
          unmanaged: targetMetadataMap[METADATA_KEY.UNMANAGED_TAG]
        };
      }
    }
  });

  // node_modules/inversify/lib/planning/request.js
  var require_request = __commonJS({
    "node_modules/inversify/lib/planning/request.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Request = void 0;
      var id_1 = require_id();
      var Request = function() {
        function Request2(serviceIdentifier, parentContext, parentRequest, bindings, target) {
          this.id = id_1.id();
          this.serviceIdentifier = serviceIdentifier;
          this.parentContext = parentContext;
          this.parentRequest = parentRequest;
          this.target = target;
          this.childRequests = [];
          this.bindings = Array.isArray(bindings) ? bindings : [bindings];
          this.requestScope = parentRequest === null ? /* @__PURE__ */ new Map() : null;
        }
        Request2.prototype.addChildRequest = function(serviceIdentifier, bindings, target) {
          var child = new Request2(serviceIdentifier, this.parentContext, this, bindings, target);
          this.childRequests.push(child);
          return child;
        };
        return Request2;
      }();
      exports.Request = Request;
    }
  });

  // node_modules/inversify/lib/planning/planner.js
  var require_planner = __commonJS({
    "node_modules/inversify/lib/planning/planner.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getBindingDictionary = exports.createMockRequest = exports.plan = void 0;
      var binding_count_1 = require_binding_count();
      var ERROR_MSGS = require_error_msgs();
      var literal_types_1 = require_literal_types();
      var METADATA_KEY = require_metadata_keys();
      var exceptions_1 = require_exceptions();
      var serialization_1 = require_serialization();
      var context_1 = require_context();
      var metadata_1 = require_metadata();
      var plan_1 = require_plan();
      var reflection_utils_1 = require_reflection_utils();
      var request_1 = require_request();
      var target_1 = require_target();
      function getBindingDictionary(cntnr) {
        return cntnr._bindingDictionary;
      }
      exports.getBindingDictionary = getBindingDictionary;
      function _createTarget(isMultiInject, targetType, serviceIdentifier, name, key, value) {
        var metadataKey = isMultiInject ? METADATA_KEY.MULTI_INJECT_TAG : METADATA_KEY.INJECT_TAG;
        var injectMetadata = new metadata_1.Metadata(metadataKey, serviceIdentifier);
        var target = new target_1.Target(targetType, name, serviceIdentifier, injectMetadata);
        if (key !== void 0) {
          var tagMetadata = new metadata_1.Metadata(key, value);
          target.metadata.push(tagMetadata);
        }
        return target;
      }
      function _getActiveBindings(metadataReader, avoidConstraints, context, parentRequest, target) {
        var bindings = getBindings(context.container, target.serviceIdentifier);
        var activeBindings = [];
        if (bindings.length === binding_count_1.BindingCount.NoBindingsAvailable && context.container.options.autoBindInjectable && typeof target.serviceIdentifier === "function" && metadataReader.getConstructorMetadata(target.serviceIdentifier).compilerGeneratedMetadata) {
          context.container.bind(target.serviceIdentifier).toSelf();
          bindings = getBindings(context.container, target.serviceIdentifier);
        }
        if (!avoidConstraints) {
          activeBindings = bindings.filter(function(binding) {
            var request = new request_1.Request(binding.serviceIdentifier, context, parentRequest, binding, target);
            return binding.constraint(request);
          });
        } else {
          activeBindings = bindings;
        }
        _validateActiveBindingCount(target.serviceIdentifier, activeBindings, target, context.container);
        return activeBindings;
      }
      function _validateActiveBindingCount(serviceIdentifier, bindings, target, container) {
        switch (bindings.length) {
          case binding_count_1.BindingCount.NoBindingsAvailable:
            if (target.isOptional()) {
              return bindings;
            } else {
              var serviceIdentifierString = serialization_1.getServiceIdentifierAsString(serviceIdentifier);
              var msg = ERROR_MSGS.NOT_REGISTERED;
              msg += serialization_1.listMetadataForTarget(serviceIdentifierString, target);
              msg += serialization_1.listRegisteredBindingsForServiceIdentifier(container, serviceIdentifierString, getBindings);
              throw new Error(msg);
            }
          case binding_count_1.BindingCount.OnlyOneBindingAvailable:
            if (!target.isArray()) {
              return bindings;
            }
          case binding_count_1.BindingCount.MultipleBindingsAvailable:
          default:
            if (!target.isArray()) {
              var serviceIdentifierString = serialization_1.getServiceIdentifierAsString(serviceIdentifier);
              var msg = ERROR_MSGS.AMBIGUOUS_MATCH + " " + serviceIdentifierString;
              msg += serialization_1.listRegisteredBindingsForServiceIdentifier(container, serviceIdentifierString, getBindings);
              throw new Error(msg);
            } else {
              return bindings;
            }
        }
      }
      function _createSubRequests(metadataReader, avoidConstraints, serviceIdentifier, context, parentRequest, target) {
        var activeBindings;
        var childRequest;
        if (parentRequest === null) {
          activeBindings = _getActiveBindings(metadataReader, avoidConstraints, context, null, target);
          childRequest = new request_1.Request(serviceIdentifier, context, null, activeBindings, target);
          var thePlan = new plan_1.Plan(context, childRequest);
          context.addPlan(thePlan);
        } else {
          activeBindings = _getActiveBindings(metadataReader, avoidConstraints, context, parentRequest, target);
          childRequest = parentRequest.addChildRequest(target.serviceIdentifier, activeBindings, target);
        }
        activeBindings.forEach(function(binding) {
          var subChildRequest = null;
          if (target.isArray()) {
            subChildRequest = childRequest.addChildRequest(binding.serviceIdentifier, binding, target);
          } else {
            if (binding.cache) {
              return;
            }
            subChildRequest = childRequest;
          }
          if (binding.type === literal_types_1.BindingTypeEnum.Instance && binding.implementationType !== null) {
            var dependencies = reflection_utils_1.getDependencies(metadataReader, binding.implementationType);
            if (!context.container.options.skipBaseClassChecks) {
              var baseClassDependencyCount = reflection_utils_1.getBaseClassDependencyCount(metadataReader, binding.implementationType);
              if (dependencies.length < baseClassDependencyCount) {
                var error = ERROR_MSGS.ARGUMENTS_LENGTH_MISMATCH(reflection_utils_1.getFunctionName(binding.implementationType));
                throw new Error(error);
              }
            }
            dependencies.forEach(function(dependency) {
              _createSubRequests(metadataReader, false, dependency.serviceIdentifier, context, subChildRequest, dependency);
            });
          }
        });
      }
      function getBindings(container, serviceIdentifier) {
        var bindings = [];
        var bindingDictionary = getBindingDictionary(container);
        if (bindingDictionary.hasKey(serviceIdentifier)) {
          bindings = bindingDictionary.get(serviceIdentifier);
        } else if (container.parent !== null) {
          bindings = getBindings(container.parent, serviceIdentifier);
        }
        return bindings;
      }
      function plan(metadataReader, container, isMultiInject, targetType, serviceIdentifier, key, value, avoidConstraints) {
        if (avoidConstraints === void 0) {
          avoidConstraints = false;
        }
        var context = new context_1.Context(container);
        var target = _createTarget(isMultiInject, targetType, serviceIdentifier, "", key, value);
        try {
          _createSubRequests(metadataReader, avoidConstraints, serviceIdentifier, context, null, target);
          return context;
        } catch (error) {
          if (exceptions_1.isStackOverflowExeption(error)) {
            if (context.plan) {
              serialization_1.circularDependencyToException(context.plan.rootRequest);
            }
          }
          throw error;
        }
      }
      exports.plan = plan;
      function createMockRequest(container, serviceIdentifier, key, value) {
        var target = new target_1.Target(literal_types_1.TargetTypeEnum.Variable, "", serviceIdentifier, new metadata_1.Metadata(key, value));
        var context = new context_1.Context(container);
        var request = new request_1.Request(serviceIdentifier, context, null, [], target);
        return request;
      }
      exports.createMockRequest = createMockRequest;
    }
  });

  // node_modules/inversify/lib/resolution/instantiation.js
  var require_instantiation = __commonJS({
    "node_modules/inversify/lib/resolution/instantiation.js"(exports) {
      "use strict";
      var __spreadArray = exports && exports.__spreadArray || function(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
          to[j] = from[i];
        return to;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.resolveInstance = void 0;
      var error_msgs_1 = require_error_msgs();
      var literal_types_1 = require_literal_types();
      var METADATA_KEY = require_metadata_keys();
      function _injectProperties(instance, childRequests, resolveRequest) {
        var propertyInjectionsRequests = childRequests.filter(function(childRequest) {
          return childRequest.target !== null && childRequest.target.type === literal_types_1.TargetTypeEnum.ClassProperty;
        });
        var propertyInjections = propertyInjectionsRequests.map(resolveRequest);
        propertyInjectionsRequests.forEach(function(r, index) {
          var propertyName = "";
          propertyName = r.target.name.value();
          var injection = propertyInjections[index];
          instance[propertyName] = injection;
        });
        return instance;
      }
      function _createInstance(Func, injections) {
        return new (Func.bind.apply(Func, __spreadArray([void 0], injections)))();
      }
      function _postConstruct(constr, result) {
        if (Reflect.hasMetadata(METADATA_KEY.POST_CONSTRUCT, constr)) {
          var data = Reflect.getMetadata(METADATA_KEY.POST_CONSTRUCT, constr);
          try {
            result[data.value]();
          } catch (e) {
            throw new Error(error_msgs_1.POST_CONSTRUCT_ERROR(constr.name, e.message));
          }
        }
      }
      function resolveInstance(constr, childRequests, resolveRequest) {
        var result = null;
        if (childRequests.length > 0) {
          var constructorInjectionsRequests = childRequests.filter(function(childRequest) {
            return childRequest.target !== null && childRequest.target.type === literal_types_1.TargetTypeEnum.ConstructorArgument;
          });
          var constructorInjections = constructorInjectionsRequests.map(resolveRequest);
          result = _createInstance(constr, constructorInjections);
          result = _injectProperties(result, childRequests, resolveRequest);
        } else {
          result = new constr();
        }
        _postConstruct(constr, result);
        return result;
      }
      exports.resolveInstance = resolveInstance;
    }
  });

  // node_modules/inversify/lib/resolution/resolver.js
  var require_resolver = __commonJS({
    "node_modules/inversify/lib/resolution/resolver.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.resolve = void 0;
      var ERROR_MSGS = require_error_msgs();
      var literal_types_1 = require_literal_types();
      var exceptions_1 = require_exceptions();
      var serialization_1 = require_serialization();
      var instantiation_1 = require_instantiation();
      var invokeFactory = function(factoryType, serviceIdentifier, fn) {
        try {
          return fn();
        } catch (error) {
          if (exceptions_1.isStackOverflowExeption(error)) {
            throw new Error(ERROR_MSGS.CIRCULAR_DEPENDENCY_IN_FACTORY(factoryType, serviceIdentifier.toString()));
          } else {
            throw error;
          }
        }
      };
      var _resolveRequest = function(requestScope) {
        return function(request) {
          request.parentContext.setCurrentRequest(request);
          var bindings = request.bindings;
          var childRequests = request.childRequests;
          var targetIsAnArray = request.target && request.target.isArray();
          var targetParentIsNotAnArray = !request.parentRequest || !request.parentRequest.target || !request.target || !request.parentRequest.target.matchesArray(request.target.serviceIdentifier);
          if (targetIsAnArray && targetParentIsNotAnArray) {
            return childRequests.map(function(childRequest) {
              var _f = _resolveRequest(requestScope);
              return _f(childRequest);
            });
          } else {
            var result = null;
            if (request.target.isOptional() && bindings.length === 0) {
              return void 0;
            }
            var binding_1 = bindings[0];
            var isSingleton = binding_1.scope === literal_types_1.BindingScopeEnum.Singleton;
            var isRequestSingleton = binding_1.scope === literal_types_1.BindingScopeEnum.Request;
            if (isSingleton && binding_1.activated) {
              return binding_1.cache;
            }
            if (isRequestSingleton && requestScope !== null && requestScope.has(binding_1.id)) {
              return requestScope.get(binding_1.id);
            }
            if (binding_1.type === literal_types_1.BindingTypeEnum.ConstantValue) {
              result = binding_1.cache;
              binding_1.activated = true;
            } else if (binding_1.type === literal_types_1.BindingTypeEnum.Function) {
              result = binding_1.cache;
              binding_1.activated = true;
            } else if (binding_1.type === literal_types_1.BindingTypeEnum.Constructor) {
              result = binding_1.implementationType;
            } else if (binding_1.type === literal_types_1.BindingTypeEnum.DynamicValue && binding_1.dynamicValue !== null) {
              result = invokeFactory("toDynamicValue", binding_1.serviceIdentifier, function() {
                return binding_1.dynamicValue(request.parentContext);
              });
            } else if (binding_1.type === literal_types_1.BindingTypeEnum.Factory && binding_1.factory !== null) {
              result = invokeFactory("toFactory", binding_1.serviceIdentifier, function() {
                return binding_1.factory(request.parentContext);
              });
            } else if (binding_1.type === literal_types_1.BindingTypeEnum.Provider && binding_1.provider !== null) {
              result = invokeFactory("toProvider", binding_1.serviceIdentifier, function() {
                return binding_1.provider(request.parentContext);
              });
            } else if (binding_1.type === literal_types_1.BindingTypeEnum.Instance && binding_1.implementationType !== null) {
              result = instantiation_1.resolveInstance(binding_1.implementationType, childRequests, _resolveRequest(requestScope));
            } else {
              var serviceIdentifier = serialization_1.getServiceIdentifierAsString(request.serviceIdentifier);
              throw new Error(ERROR_MSGS.INVALID_BINDING_TYPE + " " + serviceIdentifier);
            }
            if (typeof binding_1.onActivation === "function") {
              result = binding_1.onActivation(request.parentContext, result);
            }
            if (isSingleton) {
              binding_1.cache = result;
              binding_1.activated = true;
            }
            if (isRequestSingleton && requestScope !== null && !requestScope.has(binding_1.id)) {
              requestScope.set(binding_1.id, result);
            }
            return result;
          }
        };
      };
      function resolve(context) {
        var _f = _resolveRequest(context.plan.rootRequest.requestScope);
        return _f(context.plan.rootRequest);
      }
      exports.resolve = resolve;
    }
  });

  // node_modules/inversify/lib/syntax/constraint_helpers.js
  var require_constraint_helpers = __commonJS({
    "node_modules/inversify/lib/syntax/constraint_helpers.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.typeConstraint = exports.namedConstraint = exports.taggedConstraint = exports.traverseAncerstors = void 0;
      var METADATA_KEY = require_metadata_keys();
      var metadata_1 = require_metadata();
      var traverseAncerstors = function(request, constraint) {
        var parent = request.parentRequest;
        if (parent !== null) {
          return constraint(parent) ? true : traverseAncerstors(parent, constraint);
        } else {
          return false;
        }
      };
      exports.traverseAncerstors = traverseAncerstors;
      var taggedConstraint = function(key) {
        return function(value) {
          var constraint = function(request) {
            return request !== null && request.target !== null && request.target.matchesTag(key)(value);
          };
          constraint.metaData = new metadata_1.Metadata(key, value);
          return constraint;
        };
      };
      exports.taggedConstraint = taggedConstraint;
      var namedConstraint = taggedConstraint(METADATA_KEY.NAMED_TAG);
      exports.namedConstraint = namedConstraint;
      var typeConstraint = function(type) {
        return function(request) {
          var binding = null;
          if (request !== null) {
            binding = request.bindings[0];
            if (typeof type === "string") {
              var serviceIdentifier = binding.serviceIdentifier;
              return serviceIdentifier === type;
            } else {
              var constructor = request.bindings[0].implementationType;
              return type === constructor;
            }
          }
          return false;
        };
      };
      exports.typeConstraint = typeConstraint;
    }
  });

  // node_modules/inversify/lib/syntax/binding_when_syntax.js
  var require_binding_when_syntax = __commonJS({
    "node_modules/inversify/lib/syntax/binding_when_syntax.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.BindingWhenSyntax = void 0;
      var binding_on_syntax_1 = require_binding_on_syntax();
      var constraint_helpers_1 = require_constraint_helpers();
      var BindingWhenSyntax = function() {
        function BindingWhenSyntax2(binding) {
          this._binding = binding;
        }
        BindingWhenSyntax2.prototype.when = function(constraint) {
          this._binding.constraint = constraint;
          return new binding_on_syntax_1.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax2.prototype.whenTargetNamed = function(name) {
          this._binding.constraint = constraint_helpers_1.namedConstraint(name);
          return new binding_on_syntax_1.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax2.prototype.whenTargetIsDefault = function() {
          this._binding.constraint = function(request) {
            var targetIsDefault = request.target !== null && !request.target.isNamed() && !request.target.isTagged();
            return targetIsDefault;
          };
          return new binding_on_syntax_1.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax2.prototype.whenTargetTagged = function(tag, value) {
          this._binding.constraint = constraint_helpers_1.taggedConstraint(tag)(value);
          return new binding_on_syntax_1.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax2.prototype.whenInjectedInto = function(parent) {
          this._binding.constraint = function(request) {
            return constraint_helpers_1.typeConstraint(parent)(request.parentRequest);
          };
          return new binding_on_syntax_1.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax2.prototype.whenParentNamed = function(name) {
          this._binding.constraint = function(request) {
            return constraint_helpers_1.namedConstraint(name)(request.parentRequest);
          };
          return new binding_on_syntax_1.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax2.prototype.whenParentTagged = function(tag, value) {
          this._binding.constraint = function(request) {
            return constraint_helpers_1.taggedConstraint(tag)(value)(request.parentRequest);
          };
          return new binding_on_syntax_1.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax2.prototype.whenAnyAncestorIs = function(ancestor) {
          this._binding.constraint = function(request) {
            return constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.typeConstraint(ancestor));
          };
          return new binding_on_syntax_1.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax2.prototype.whenNoAncestorIs = function(ancestor) {
          this._binding.constraint = function(request) {
            return !constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.typeConstraint(ancestor));
          };
          return new binding_on_syntax_1.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax2.prototype.whenAnyAncestorNamed = function(name) {
          this._binding.constraint = function(request) {
            return constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.namedConstraint(name));
          };
          return new binding_on_syntax_1.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax2.prototype.whenNoAncestorNamed = function(name) {
          this._binding.constraint = function(request) {
            return !constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.namedConstraint(name));
          };
          return new binding_on_syntax_1.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax2.prototype.whenAnyAncestorTagged = function(tag, value) {
          this._binding.constraint = function(request) {
            return constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.taggedConstraint(tag)(value));
          };
          return new binding_on_syntax_1.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax2.prototype.whenNoAncestorTagged = function(tag, value) {
          this._binding.constraint = function(request) {
            return !constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.taggedConstraint(tag)(value));
          };
          return new binding_on_syntax_1.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax2.prototype.whenAnyAncestorMatches = function(constraint) {
          this._binding.constraint = function(request) {
            return constraint_helpers_1.traverseAncerstors(request, constraint);
          };
          return new binding_on_syntax_1.BindingOnSyntax(this._binding);
        };
        BindingWhenSyntax2.prototype.whenNoAncestorMatches = function(constraint) {
          this._binding.constraint = function(request) {
            return !constraint_helpers_1.traverseAncerstors(request, constraint);
          };
          return new binding_on_syntax_1.BindingOnSyntax(this._binding);
        };
        return BindingWhenSyntax2;
      }();
      exports.BindingWhenSyntax = BindingWhenSyntax;
    }
  });

  // node_modules/inversify/lib/syntax/binding_on_syntax.js
  var require_binding_on_syntax = __commonJS({
    "node_modules/inversify/lib/syntax/binding_on_syntax.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.BindingOnSyntax = void 0;
      var binding_when_syntax_1 = require_binding_when_syntax();
      var BindingOnSyntax = function() {
        function BindingOnSyntax2(binding) {
          this._binding = binding;
        }
        BindingOnSyntax2.prototype.onActivation = function(handler) {
          this._binding.onActivation = handler;
          return new binding_when_syntax_1.BindingWhenSyntax(this._binding);
        };
        return BindingOnSyntax2;
      }();
      exports.BindingOnSyntax = BindingOnSyntax;
    }
  });

  // node_modules/inversify/lib/syntax/binding_when_on_syntax.js
  var require_binding_when_on_syntax = __commonJS({
    "node_modules/inversify/lib/syntax/binding_when_on_syntax.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.BindingWhenOnSyntax = void 0;
      var binding_on_syntax_1 = require_binding_on_syntax();
      var binding_when_syntax_1 = require_binding_when_syntax();
      var BindingWhenOnSyntax = function() {
        function BindingWhenOnSyntax2(binding) {
          this._binding = binding;
          this._bindingWhenSyntax = new binding_when_syntax_1.BindingWhenSyntax(this._binding);
          this._bindingOnSyntax = new binding_on_syntax_1.BindingOnSyntax(this._binding);
        }
        BindingWhenOnSyntax2.prototype.when = function(constraint) {
          return this._bindingWhenSyntax.when(constraint);
        };
        BindingWhenOnSyntax2.prototype.whenTargetNamed = function(name) {
          return this._bindingWhenSyntax.whenTargetNamed(name);
        };
        BindingWhenOnSyntax2.prototype.whenTargetIsDefault = function() {
          return this._bindingWhenSyntax.whenTargetIsDefault();
        };
        BindingWhenOnSyntax2.prototype.whenTargetTagged = function(tag, value) {
          return this._bindingWhenSyntax.whenTargetTagged(tag, value);
        };
        BindingWhenOnSyntax2.prototype.whenInjectedInto = function(parent) {
          return this._bindingWhenSyntax.whenInjectedInto(parent);
        };
        BindingWhenOnSyntax2.prototype.whenParentNamed = function(name) {
          return this._bindingWhenSyntax.whenParentNamed(name);
        };
        BindingWhenOnSyntax2.prototype.whenParentTagged = function(tag, value) {
          return this._bindingWhenSyntax.whenParentTagged(tag, value);
        };
        BindingWhenOnSyntax2.prototype.whenAnyAncestorIs = function(ancestor) {
          return this._bindingWhenSyntax.whenAnyAncestorIs(ancestor);
        };
        BindingWhenOnSyntax2.prototype.whenNoAncestorIs = function(ancestor) {
          return this._bindingWhenSyntax.whenNoAncestorIs(ancestor);
        };
        BindingWhenOnSyntax2.prototype.whenAnyAncestorNamed = function(name) {
          return this._bindingWhenSyntax.whenAnyAncestorNamed(name);
        };
        BindingWhenOnSyntax2.prototype.whenAnyAncestorTagged = function(tag, value) {
          return this._bindingWhenSyntax.whenAnyAncestorTagged(tag, value);
        };
        BindingWhenOnSyntax2.prototype.whenNoAncestorNamed = function(name) {
          return this._bindingWhenSyntax.whenNoAncestorNamed(name);
        };
        BindingWhenOnSyntax2.prototype.whenNoAncestorTagged = function(tag, value) {
          return this._bindingWhenSyntax.whenNoAncestorTagged(tag, value);
        };
        BindingWhenOnSyntax2.prototype.whenAnyAncestorMatches = function(constraint) {
          return this._bindingWhenSyntax.whenAnyAncestorMatches(constraint);
        };
        BindingWhenOnSyntax2.prototype.whenNoAncestorMatches = function(constraint) {
          return this._bindingWhenSyntax.whenNoAncestorMatches(constraint);
        };
        BindingWhenOnSyntax2.prototype.onActivation = function(handler) {
          return this._bindingOnSyntax.onActivation(handler);
        };
        return BindingWhenOnSyntax2;
      }();
      exports.BindingWhenOnSyntax = BindingWhenOnSyntax;
    }
  });

  // node_modules/inversify/lib/syntax/binding_in_syntax.js
  var require_binding_in_syntax = __commonJS({
    "node_modules/inversify/lib/syntax/binding_in_syntax.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.BindingInSyntax = void 0;
      var literal_types_1 = require_literal_types();
      var binding_when_on_syntax_1 = require_binding_when_on_syntax();
      var BindingInSyntax = function() {
        function BindingInSyntax2(binding) {
          this._binding = binding;
        }
        BindingInSyntax2.prototype.inRequestScope = function() {
          this._binding.scope = literal_types_1.BindingScopeEnum.Request;
          return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
        };
        BindingInSyntax2.prototype.inSingletonScope = function() {
          this._binding.scope = literal_types_1.BindingScopeEnum.Singleton;
          return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
        };
        BindingInSyntax2.prototype.inTransientScope = function() {
          this._binding.scope = literal_types_1.BindingScopeEnum.Transient;
          return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
        };
        return BindingInSyntax2;
      }();
      exports.BindingInSyntax = BindingInSyntax;
    }
  });

  // node_modules/inversify/lib/syntax/binding_in_when_on_syntax.js
  var require_binding_in_when_on_syntax = __commonJS({
    "node_modules/inversify/lib/syntax/binding_in_when_on_syntax.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.BindingInWhenOnSyntax = void 0;
      var binding_in_syntax_1 = require_binding_in_syntax();
      var binding_on_syntax_1 = require_binding_on_syntax();
      var binding_when_syntax_1 = require_binding_when_syntax();
      var BindingInWhenOnSyntax = function() {
        function BindingInWhenOnSyntax2(binding) {
          this._binding = binding;
          this._bindingWhenSyntax = new binding_when_syntax_1.BindingWhenSyntax(this._binding);
          this._bindingOnSyntax = new binding_on_syntax_1.BindingOnSyntax(this._binding);
          this._bindingInSyntax = new binding_in_syntax_1.BindingInSyntax(binding);
        }
        BindingInWhenOnSyntax2.prototype.inRequestScope = function() {
          return this._bindingInSyntax.inRequestScope();
        };
        BindingInWhenOnSyntax2.prototype.inSingletonScope = function() {
          return this._bindingInSyntax.inSingletonScope();
        };
        BindingInWhenOnSyntax2.prototype.inTransientScope = function() {
          return this._bindingInSyntax.inTransientScope();
        };
        BindingInWhenOnSyntax2.prototype.when = function(constraint) {
          return this._bindingWhenSyntax.when(constraint);
        };
        BindingInWhenOnSyntax2.prototype.whenTargetNamed = function(name) {
          return this._bindingWhenSyntax.whenTargetNamed(name);
        };
        BindingInWhenOnSyntax2.prototype.whenTargetIsDefault = function() {
          return this._bindingWhenSyntax.whenTargetIsDefault();
        };
        BindingInWhenOnSyntax2.prototype.whenTargetTagged = function(tag, value) {
          return this._bindingWhenSyntax.whenTargetTagged(tag, value);
        };
        BindingInWhenOnSyntax2.prototype.whenInjectedInto = function(parent) {
          return this._bindingWhenSyntax.whenInjectedInto(parent);
        };
        BindingInWhenOnSyntax2.prototype.whenParentNamed = function(name) {
          return this._bindingWhenSyntax.whenParentNamed(name);
        };
        BindingInWhenOnSyntax2.prototype.whenParentTagged = function(tag, value) {
          return this._bindingWhenSyntax.whenParentTagged(tag, value);
        };
        BindingInWhenOnSyntax2.prototype.whenAnyAncestorIs = function(ancestor) {
          return this._bindingWhenSyntax.whenAnyAncestorIs(ancestor);
        };
        BindingInWhenOnSyntax2.prototype.whenNoAncestorIs = function(ancestor) {
          return this._bindingWhenSyntax.whenNoAncestorIs(ancestor);
        };
        BindingInWhenOnSyntax2.prototype.whenAnyAncestorNamed = function(name) {
          return this._bindingWhenSyntax.whenAnyAncestorNamed(name);
        };
        BindingInWhenOnSyntax2.prototype.whenAnyAncestorTagged = function(tag, value) {
          return this._bindingWhenSyntax.whenAnyAncestorTagged(tag, value);
        };
        BindingInWhenOnSyntax2.prototype.whenNoAncestorNamed = function(name) {
          return this._bindingWhenSyntax.whenNoAncestorNamed(name);
        };
        BindingInWhenOnSyntax2.prototype.whenNoAncestorTagged = function(tag, value) {
          return this._bindingWhenSyntax.whenNoAncestorTagged(tag, value);
        };
        BindingInWhenOnSyntax2.prototype.whenAnyAncestorMatches = function(constraint) {
          return this._bindingWhenSyntax.whenAnyAncestorMatches(constraint);
        };
        BindingInWhenOnSyntax2.prototype.whenNoAncestorMatches = function(constraint) {
          return this._bindingWhenSyntax.whenNoAncestorMatches(constraint);
        };
        BindingInWhenOnSyntax2.prototype.onActivation = function(handler) {
          return this._bindingOnSyntax.onActivation(handler);
        };
        return BindingInWhenOnSyntax2;
      }();
      exports.BindingInWhenOnSyntax = BindingInWhenOnSyntax;
    }
  });

  // node_modules/inversify/lib/syntax/binding_to_syntax.js
  var require_binding_to_syntax = __commonJS({
    "node_modules/inversify/lib/syntax/binding_to_syntax.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.BindingToSyntax = void 0;
      var ERROR_MSGS = require_error_msgs();
      var literal_types_1 = require_literal_types();
      var binding_in_when_on_syntax_1 = require_binding_in_when_on_syntax();
      var binding_when_on_syntax_1 = require_binding_when_on_syntax();
      var BindingToSyntax = function() {
        function BindingToSyntax2(binding) {
          this._binding = binding;
        }
        BindingToSyntax2.prototype.to = function(constructor) {
          this._binding.type = literal_types_1.BindingTypeEnum.Instance;
          this._binding.implementationType = constructor;
          return new binding_in_when_on_syntax_1.BindingInWhenOnSyntax(this._binding);
        };
        BindingToSyntax2.prototype.toSelf = function() {
          if (typeof this._binding.serviceIdentifier !== "function") {
            throw new Error("" + ERROR_MSGS.INVALID_TO_SELF_VALUE);
          }
          var self2 = this._binding.serviceIdentifier;
          return this.to(self2);
        };
        BindingToSyntax2.prototype.toConstantValue = function(value) {
          this._binding.type = literal_types_1.BindingTypeEnum.ConstantValue;
          this._binding.cache = value;
          this._binding.dynamicValue = null;
          this._binding.implementationType = null;
          this._binding.scope = literal_types_1.BindingScopeEnum.Singleton;
          return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
        };
        BindingToSyntax2.prototype.toDynamicValue = function(func) {
          this._binding.type = literal_types_1.BindingTypeEnum.DynamicValue;
          this._binding.cache = null;
          this._binding.dynamicValue = func;
          this._binding.implementationType = null;
          return new binding_in_when_on_syntax_1.BindingInWhenOnSyntax(this._binding);
        };
        BindingToSyntax2.prototype.toConstructor = function(constructor) {
          this._binding.type = literal_types_1.BindingTypeEnum.Constructor;
          this._binding.implementationType = constructor;
          this._binding.scope = literal_types_1.BindingScopeEnum.Singleton;
          return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
        };
        BindingToSyntax2.prototype.toFactory = function(factory) {
          this._binding.type = literal_types_1.BindingTypeEnum.Factory;
          this._binding.factory = factory;
          this._binding.scope = literal_types_1.BindingScopeEnum.Singleton;
          return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
        };
        BindingToSyntax2.prototype.toFunction = function(func) {
          if (typeof func !== "function") {
            throw new Error(ERROR_MSGS.INVALID_FUNCTION_BINDING);
          }
          var bindingWhenOnSyntax = this.toConstantValue(func);
          this._binding.type = literal_types_1.BindingTypeEnum.Function;
          this._binding.scope = literal_types_1.BindingScopeEnum.Singleton;
          return bindingWhenOnSyntax;
        };
        BindingToSyntax2.prototype.toAutoFactory = function(serviceIdentifier) {
          this._binding.type = literal_types_1.BindingTypeEnum.Factory;
          this._binding.factory = function(context) {
            var autofactory = function() {
              return context.container.get(serviceIdentifier);
            };
            return autofactory;
          };
          this._binding.scope = literal_types_1.BindingScopeEnum.Singleton;
          return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
        };
        BindingToSyntax2.prototype.toProvider = function(provider) {
          this._binding.type = literal_types_1.BindingTypeEnum.Provider;
          this._binding.provider = provider;
          this._binding.scope = literal_types_1.BindingScopeEnum.Singleton;
          return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
        };
        BindingToSyntax2.prototype.toService = function(service) {
          this.toDynamicValue(function(context) {
            return context.container.get(service);
          });
        };
        return BindingToSyntax2;
      }();
      exports.BindingToSyntax = BindingToSyntax;
    }
  });

  // node_modules/inversify/lib/container/container_snapshot.js
  var require_container_snapshot = __commonJS({
    "node_modules/inversify/lib/container/container_snapshot.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ContainerSnapshot = void 0;
      var ContainerSnapshot = function() {
        function ContainerSnapshot2() {
        }
        ContainerSnapshot2.of = function(bindings, middleware) {
          var snapshot = new ContainerSnapshot2();
          snapshot.bindings = bindings;
          snapshot.middleware = middleware;
          return snapshot;
        };
        return ContainerSnapshot2;
      }();
      exports.ContainerSnapshot = ContainerSnapshot;
    }
  });

  // node_modules/inversify/lib/container/lookup.js
  var require_lookup = __commonJS({
    "node_modules/inversify/lib/container/lookup.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Lookup = void 0;
      var ERROR_MSGS = require_error_msgs();
      var Lookup = function() {
        function Lookup2() {
          this._map = /* @__PURE__ */ new Map();
        }
        Lookup2.prototype.getMap = function() {
          return this._map;
        };
        Lookup2.prototype.add = function(serviceIdentifier, value) {
          if (serviceIdentifier === null || serviceIdentifier === void 0) {
            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
          }
          if (value === null || value === void 0) {
            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
          }
          var entry = this._map.get(serviceIdentifier);
          if (entry !== void 0) {
            entry.push(value);
            this._map.set(serviceIdentifier, entry);
          } else {
            this._map.set(serviceIdentifier, [value]);
          }
        };
        Lookup2.prototype.get = function(serviceIdentifier) {
          if (serviceIdentifier === null || serviceIdentifier === void 0) {
            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
          }
          var entry = this._map.get(serviceIdentifier);
          if (entry !== void 0) {
            return entry;
          } else {
            throw new Error(ERROR_MSGS.KEY_NOT_FOUND);
          }
        };
        Lookup2.prototype.remove = function(serviceIdentifier) {
          if (serviceIdentifier === null || serviceIdentifier === void 0) {
            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
          }
          if (!this._map.delete(serviceIdentifier)) {
            throw new Error(ERROR_MSGS.KEY_NOT_FOUND);
          }
        };
        Lookup2.prototype.removeByCondition = function(condition) {
          var _this = this;
          this._map.forEach(function(entries, key) {
            var updatedEntries = entries.filter(function(entry) {
              return !condition(entry);
            });
            if (updatedEntries.length > 0) {
              _this._map.set(key, updatedEntries);
            } else {
              _this._map.delete(key);
            }
          });
        };
        Lookup2.prototype.hasKey = function(serviceIdentifier) {
          if (serviceIdentifier === null || serviceIdentifier === void 0) {
            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
          }
          return this._map.has(serviceIdentifier);
        };
        Lookup2.prototype.clone = function() {
          var copy = new Lookup2();
          this._map.forEach(function(value, key) {
            value.forEach(function(b) {
              return copy.add(key, b.clone());
            });
          });
          return copy;
        };
        Lookup2.prototype.traverse = function(func) {
          this._map.forEach(function(value, key) {
            func(key, value);
          });
        };
        return Lookup2;
      }();
      exports.Lookup = Lookup;
    }
  });

  // node_modules/inversify/lib/container/container.js
  var require_container = __commonJS({
    "node_modules/inversify/lib/container/container.js"(exports) {
      "use strict";
      var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      var __generator = exports && exports.__generator || function(thisArg, body) {
        var _ = { label: 0, sent: function() {
          if (t[0] & 1)
            throw t[1];
          return t[1];
        }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f)
            throw new TypeError("Generator is already executing.");
          while (_)
            try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                return t;
              if (y = 0, t)
                op = [op[0] & 2, t.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t = op;
                  break;
                case 4:
                  _.label++;
                  return { value: op[1], done: false };
                case 5:
                  _.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _.ops.pop();
                  _.trys.pop();
                  continue;
                default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _ = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                    _.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _.label < t[1]) {
                    _.label = t[1];
                    t = op;
                    break;
                  }
                  if (t && _.label < t[2]) {
                    _.label = t[2];
                    _.ops.push(op);
                    break;
                  }
                  if (t[2])
                    _.ops.pop();
                  _.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _);
            } catch (e) {
              op = [6, e];
              y = 0;
            } finally {
              f = t = 0;
            }
          if (op[0] & 5)
            throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      var __spreadArray = exports && exports.__spreadArray || function(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
          to[j] = from[i];
        return to;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Container = void 0;
      var binding_1 = require_binding();
      var ERROR_MSGS = require_error_msgs();
      var literal_types_1 = require_literal_types();
      var METADATA_KEY = require_metadata_keys();
      var metadata_reader_1 = require_metadata_reader();
      var planner_1 = require_planner();
      var resolver_1 = require_resolver();
      var binding_to_syntax_1 = require_binding_to_syntax();
      var id_1 = require_id();
      var serialization_1 = require_serialization();
      var container_snapshot_1 = require_container_snapshot();
      var lookup_1 = require_lookup();
      var Container2 = function() {
        function Container3(containerOptions) {
          this._appliedMiddleware = [];
          var options = containerOptions || {};
          if (typeof options !== "object") {
            throw new Error("" + ERROR_MSGS.CONTAINER_OPTIONS_MUST_BE_AN_OBJECT);
          }
          if (options.defaultScope === void 0) {
            options.defaultScope = literal_types_1.BindingScopeEnum.Transient;
          } else if (options.defaultScope !== literal_types_1.BindingScopeEnum.Singleton && options.defaultScope !== literal_types_1.BindingScopeEnum.Transient && options.defaultScope !== literal_types_1.BindingScopeEnum.Request) {
            throw new Error("" + ERROR_MSGS.CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE);
          }
          if (options.autoBindInjectable === void 0) {
            options.autoBindInjectable = false;
          } else if (typeof options.autoBindInjectable !== "boolean") {
            throw new Error("" + ERROR_MSGS.CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE);
          }
          if (options.skipBaseClassChecks === void 0) {
            options.skipBaseClassChecks = false;
          } else if (typeof options.skipBaseClassChecks !== "boolean") {
            throw new Error("" + ERROR_MSGS.CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK);
          }
          this.options = {
            autoBindInjectable: options.autoBindInjectable,
            defaultScope: options.defaultScope,
            skipBaseClassChecks: options.skipBaseClassChecks
          };
          this.id = id_1.id();
          this._bindingDictionary = new lookup_1.Lookup();
          this._snapshots = [];
          this._middleware = null;
          this.parent = null;
          this._metadataReader = new metadata_reader_1.MetadataReader();
        }
        Container3.merge = function(container1, container2) {
          var container3 = [];
          for (var _i = 2; _i < arguments.length; _i++) {
            container3[_i - 2] = arguments[_i];
          }
          var container = new Container3();
          var targetContainers = __spreadArray([container1, container2], container3).map(function(targetContainer) {
            return planner_1.getBindingDictionary(targetContainer);
          });
          var bindingDictionary = planner_1.getBindingDictionary(container);
          function copyDictionary(origin, destination) {
            origin.traverse(function(key, value) {
              value.forEach(function(binding) {
                destination.add(binding.serviceIdentifier, binding.clone());
              });
            });
          }
          targetContainers.forEach(function(targetBindingDictionary) {
            copyDictionary(targetBindingDictionary, bindingDictionary);
          });
          return container;
        };
        Container3.prototype.load = function() {
          var modules = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            modules[_i] = arguments[_i];
          }
          var getHelpers = this._getContainerModuleHelpersFactory();
          for (var _a = 0, modules_1 = modules; _a < modules_1.length; _a++) {
            var currentModule = modules_1[_a];
            var containerModuleHelpers = getHelpers(currentModule.id);
            currentModule.registry(containerModuleHelpers.bindFunction, containerModuleHelpers.unbindFunction, containerModuleHelpers.isboundFunction, containerModuleHelpers.rebindFunction);
          }
        };
        Container3.prototype.loadAsync = function() {
          var modules = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            modules[_i] = arguments[_i];
          }
          return __awaiter(this, void 0, void 0, function() {
            var getHelpers, _a, modules_2, currentModule, containerModuleHelpers;
            return __generator(this, function(_b) {
              switch (_b.label) {
                case 0:
                  getHelpers = this._getContainerModuleHelpersFactory();
                  _a = 0, modules_2 = modules;
                  _b.label = 1;
                case 1:
                  if (!(_a < modules_2.length))
                    return [3, 4];
                  currentModule = modules_2[_a];
                  containerModuleHelpers = getHelpers(currentModule.id);
                  return [4, currentModule.registry(containerModuleHelpers.bindFunction, containerModuleHelpers.unbindFunction, containerModuleHelpers.isboundFunction, containerModuleHelpers.rebindFunction)];
                case 2:
                  _b.sent();
                  _b.label = 3;
                case 3:
                  _a++;
                  return [3, 1];
                case 4:
                  return [2];
              }
            });
          });
        };
        Container3.prototype.unload = function() {
          var _this = this;
          var modules = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            modules[_i] = arguments[_i];
          }
          var conditionFactory = function(expected) {
            return function(item) {
              return item.moduleId === expected;
            };
          };
          modules.forEach(function(module2) {
            var condition = conditionFactory(module2.id);
            _this._bindingDictionary.removeByCondition(condition);
          });
        };
        Container3.prototype.bind = function(serviceIdentifier) {
          var scope = this.options.defaultScope || literal_types_1.BindingScopeEnum.Transient;
          var binding = new binding_1.Binding(serviceIdentifier, scope);
          this._bindingDictionary.add(serviceIdentifier, binding);
          return new binding_to_syntax_1.BindingToSyntax(binding);
        };
        Container3.prototype.rebind = function(serviceIdentifier) {
          this.unbind(serviceIdentifier);
          return this.bind(serviceIdentifier);
        };
        Container3.prototype.unbind = function(serviceIdentifier) {
          try {
            this._bindingDictionary.remove(serviceIdentifier);
          } catch (e) {
            throw new Error(ERROR_MSGS.CANNOT_UNBIND + " " + serialization_1.getServiceIdentifierAsString(serviceIdentifier));
          }
        };
        Container3.prototype.unbindAll = function() {
          this._bindingDictionary = new lookup_1.Lookup();
        };
        Container3.prototype.isBound = function(serviceIdentifier) {
          var bound = this._bindingDictionary.hasKey(serviceIdentifier);
          if (!bound && this.parent) {
            bound = this.parent.isBound(serviceIdentifier);
          }
          return bound;
        };
        Container3.prototype.isBoundNamed = function(serviceIdentifier, named) {
          return this.isBoundTagged(serviceIdentifier, METADATA_KEY.NAMED_TAG, named);
        };
        Container3.prototype.isBoundTagged = function(serviceIdentifier, key, value) {
          var bound = false;
          if (this._bindingDictionary.hasKey(serviceIdentifier)) {
            var bindings = this._bindingDictionary.get(serviceIdentifier);
            var request_1 = planner_1.createMockRequest(this, serviceIdentifier, key, value);
            bound = bindings.some(function(b) {
              return b.constraint(request_1);
            });
          }
          if (!bound && this.parent) {
            bound = this.parent.isBoundTagged(serviceIdentifier, key, value);
          }
          return bound;
        };
        Container3.prototype.snapshot = function() {
          this._snapshots.push(container_snapshot_1.ContainerSnapshot.of(this._bindingDictionary.clone(), this._middleware));
        };
        Container3.prototype.restore = function() {
          var snapshot = this._snapshots.pop();
          if (snapshot === void 0) {
            throw new Error(ERROR_MSGS.NO_MORE_SNAPSHOTS_AVAILABLE);
          }
          this._bindingDictionary = snapshot.bindings;
          this._middleware = snapshot.middleware;
        };
        Container3.prototype.createChild = function(containerOptions) {
          var child = new Container3(containerOptions || this.options);
          child.parent = this;
          return child;
        };
        Container3.prototype.applyMiddleware = function() {
          var middlewares = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            middlewares[_i] = arguments[_i];
          }
          this._appliedMiddleware = this._appliedMiddleware.concat(middlewares);
          var initial = this._middleware ? this._middleware : this._planAndResolve();
          this._middleware = middlewares.reduce(function(prev, curr) {
            return curr(prev);
          }, initial);
        };
        Container3.prototype.applyCustomMetadataReader = function(metadataReader) {
          this._metadataReader = metadataReader;
        };
        Container3.prototype.get = function(serviceIdentifier) {
          return this._get(false, false, literal_types_1.TargetTypeEnum.Variable, serviceIdentifier);
        };
        Container3.prototype.getTagged = function(serviceIdentifier, key, value) {
          return this._get(false, false, literal_types_1.TargetTypeEnum.Variable, serviceIdentifier, key, value);
        };
        Container3.prototype.getNamed = function(serviceIdentifier, named) {
          return this.getTagged(serviceIdentifier, METADATA_KEY.NAMED_TAG, named);
        };
        Container3.prototype.getAll = function(serviceIdentifier) {
          return this._get(true, true, literal_types_1.TargetTypeEnum.Variable, serviceIdentifier);
        };
        Container3.prototype.getAllTagged = function(serviceIdentifier, key, value) {
          return this._get(false, true, literal_types_1.TargetTypeEnum.Variable, serviceIdentifier, key, value);
        };
        Container3.prototype.getAllNamed = function(serviceIdentifier, named) {
          return this.getAllTagged(serviceIdentifier, METADATA_KEY.NAMED_TAG, named);
        };
        Container3.prototype.resolve = function(constructorFunction) {
          var tempContainer = this.createChild();
          tempContainer.bind(constructorFunction).toSelf();
          this._appliedMiddleware.forEach(function(m) {
            tempContainer.applyMiddleware(m);
          });
          return tempContainer.get(constructorFunction);
        };
        Container3.prototype._getContainerModuleHelpersFactory = function() {
          var _this = this;
          var setModuleId = function(bindingToSyntax, moduleId) {
            bindingToSyntax._binding.moduleId = moduleId;
          };
          var getBindFunction = function(moduleId) {
            return function(serviceIdentifier) {
              var _bind = _this.bind.bind(_this);
              var bindingToSyntax = _bind(serviceIdentifier);
              setModuleId(bindingToSyntax, moduleId);
              return bindingToSyntax;
            };
          };
          var getUnbindFunction = function(moduleId) {
            return function(serviceIdentifier) {
              var _unbind = _this.unbind.bind(_this);
              _unbind(serviceIdentifier);
            };
          };
          var getIsboundFunction = function(moduleId) {
            return function(serviceIdentifier) {
              var _isBound = _this.isBound.bind(_this);
              return _isBound(serviceIdentifier);
            };
          };
          var getRebindFunction = function(moduleId) {
            return function(serviceIdentifier) {
              var _rebind = _this.rebind.bind(_this);
              var bindingToSyntax = _rebind(serviceIdentifier);
              setModuleId(bindingToSyntax, moduleId);
              return bindingToSyntax;
            };
          };
          return function(mId) {
            return {
              bindFunction: getBindFunction(mId),
              isboundFunction: getIsboundFunction(mId),
              rebindFunction: getRebindFunction(mId),
              unbindFunction: getUnbindFunction(mId)
            };
          };
        };
        Container3.prototype._get = function(avoidConstraints, isMultiInject, targetType, serviceIdentifier, key, value) {
          var result = null;
          var defaultArgs = {
            avoidConstraints,
            contextInterceptor: function(context) {
              return context;
            },
            isMultiInject,
            key,
            serviceIdentifier,
            targetType,
            value
          };
          if (this._middleware) {
            result = this._middleware(defaultArgs);
            if (result === void 0 || result === null) {
              throw new Error(ERROR_MSGS.INVALID_MIDDLEWARE_RETURN);
            }
          } else {
            result = this._planAndResolve()(defaultArgs);
          }
          return result;
        };
        Container3.prototype._planAndResolve = function() {
          var _this = this;
          return function(args) {
            var context = planner_1.plan(_this._metadataReader, _this, args.isMultiInject, args.targetType, args.serviceIdentifier, args.key, args.value, args.avoidConstraints);
            context = args.contextInterceptor(context);
            var result = resolver_1.resolve(context);
            return result;
          };
        };
        return Container3;
      }();
      exports.Container = Container2;
    }
  });

  // node_modules/inversify/lib/container/container_module.js
  var require_container_module = __commonJS({
    "node_modules/inversify/lib/container/container_module.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.AsyncContainerModule = exports.ContainerModule = void 0;
      var id_1 = require_id();
      var ContainerModule2 = function() {
        function ContainerModule3(registry) {
          this.id = id_1.id();
          this.registry = registry;
        }
        return ContainerModule3;
      }();
      exports.ContainerModule = ContainerModule2;
      var AsyncContainerModule = function() {
        function AsyncContainerModule2(registry) {
          this.id = id_1.id();
          this.registry = registry;
        }
        return AsyncContainerModule2;
      }();
      exports.AsyncContainerModule = AsyncContainerModule;
    }
  });

  // node_modules/inversify/lib/annotation/injectable.js
  var require_injectable = __commonJS({
    "node_modules/inversify/lib/annotation/injectable.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.injectable = void 0;
      var ERRORS_MSGS = require_error_msgs();
      var METADATA_KEY = require_metadata_keys();
      function injectable2() {
        return function(target) {
          if (Reflect.hasOwnMetadata(METADATA_KEY.PARAM_TYPES, target)) {
            throw new Error(ERRORS_MSGS.DUPLICATED_INJECTABLE_DECORATOR);
          }
          var types = Reflect.getMetadata(METADATA_KEY.DESIGN_PARAM_TYPES, target) || [];
          Reflect.defineMetadata(METADATA_KEY.PARAM_TYPES, types, target);
          return target;
        };
      }
      exports.injectable = injectable2;
    }
  });

  // node_modules/inversify/lib/annotation/tagged.js
  var require_tagged = __commonJS({
    "node_modules/inversify/lib/annotation/tagged.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.tagged = void 0;
      var metadata_1 = require_metadata();
      var decorator_utils_1 = require_decorator_utils();
      function tagged(metadataKey, metadataValue) {
        return function(target, targetKey, index) {
          var metadata = new metadata_1.Metadata(metadataKey, metadataValue);
          if (typeof index === "number") {
            decorator_utils_1.tagParameter(target, targetKey, index, metadata);
          } else {
            decorator_utils_1.tagProperty(target, targetKey, metadata);
          }
        };
      }
      exports.tagged = tagged;
    }
  });

  // node_modules/inversify/lib/annotation/named.js
  var require_named = __commonJS({
    "node_modules/inversify/lib/annotation/named.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.named = void 0;
      var METADATA_KEY = require_metadata_keys();
      var metadata_1 = require_metadata();
      var decorator_utils_1 = require_decorator_utils();
      function named(name) {
        return function(target, targetKey, index) {
          var metadata = new metadata_1.Metadata(METADATA_KEY.NAMED_TAG, name);
          if (typeof index === "number") {
            decorator_utils_1.tagParameter(target, targetKey, index, metadata);
          } else {
            decorator_utils_1.tagProperty(target, targetKey, metadata);
          }
        };
      }
      exports.named = named;
    }
  });

  // node_modules/inversify/lib/annotation/optional.js
  var require_optional = __commonJS({
    "node_modules/inversify/lib/annotation/optional.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.optional = void 0;
      var METADATA_KEY = require_metadata_keys();
      var metadata_1 = require_metadata();
      var decorator_utils_1 = require_decorator_utils();
      function optional() {
        return function(target, targetKey, index) {
          var metadata = new metadata_1.Metadata(METADATA_KEY.OPTIONAL_TAG, true);
          if (typeof index === "number") {
            decorator_utils_1.tagParameter(target, targetKey, index, metadata);
          } else {
            decorator_utils_1.tagProperty(target, targetKey, metadata);
          }
        };
      }
      exports.optional = optional;
    }
  });

  // node_modules/inversify/lib/annotation/unmanaged.js
  var require_unmanaged = __commonJS({
    "node_modules/inversify/lib/annotation/unmanaged.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.unmanaged = void 0;
      var METADATA_KEY = require_metadata_keys();
      var metadata_1 = require_metadata();
      var decorator_utils_1 = require_decorator_utils();
      function unmanaged() {
        return function(target, targetKey, index) {
          var metadata = new metadata_1.Metadata(METADATA_KEY.UNMANAGED_TAG, true);
          decorator_utils_1.tagParameter(target, targetKey, index, metadata);
        };
      }
      exports.unmanaged = unmanaged;
    }
  });

  // node_modules/inversify/lib/annotation/multi_inject.js
  var require_multi_inject = __commonJS({
    "node_modules/inversify/lib/annotation/multi_inject.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.multiInject = void 0;
      var METADATA_KEY = require_metadata_keys();
      var metadata_1 = require_metadata();
      var decorator_utils_1 = require_decorator_utils();
      function multiInject(serviceIdentifier) {
        return function(target, targetKey, index) {
          var metadata = new metadata_1.Metadata(METADATA_KEY.MULTI_INJECT_TAG, serviceIdentifier);
          if (typeof index === "number") {
            decorator_utils_1.tagParameter(target, targetKey, index, metadata);
          } else {
            decorator_utils_1.tagProperty(target, targetKey, metadata);
          }
        };
      }
      exports.multiInject = multiInject;
    }
  });

  // node_modules/inversify/lib/annotation/target_name.js
  var require_target_name = __commonJS({
    "node_modules/inversify/lib/annotation/target_name.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.targetName = void 0;
      var METADATA_KEY = require_metadata_keys();
      var metadata_1 = require_metadata();
      var decorator_utils_1 = require_decorator_utils();
      function targetName(name) {
        return function(target, targetKey, index) {
          var metadata = new metadata_1.Metadata(METADATA_KEY.NAME_TAG, name);
          decorator_utils_1.tagParameter(target, targetKey, index, metadata);
        };
      }
      exports.targetName = targetName;
    }
  });

  // node_modules/inversify/lib/annotation/post_construct.js
  var require_post_construct = __commonJS({
    "node_modules/inversify/lib/annotation/post_construct.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.postConstruct = void 0;
      var ERRORS_MSGS = require_error_msgs();
      var METADATA_KEY = require_metadata_keys();
      var metadata_1 = require_metadata();
      function postConstruct() {
        return function(target, propertyKey, descriptor) {
          var metadata = new metadata_1.Metadata(METADATA_KEY.POST_CONSTRUCT, propertyKey);
          if (Reflect.hasOwnMetadata(METADATA_KEY.POST_CONSTRUCT, target.constructor)) {
            throw new Error(ERRORS_MSGS.MULTIPLE_POST_CONSTRUCT_METHODS);
          }
          Reflect.defineMetadata(METADATA_KEY.POST_CONSTRUCT, metadata, target.constructor);
        };
      }
      exports.postConstruct = postConstruct;
    }
  });

  // node_modules/inversify/lib/utils/binding_utils.js
  var require_binding_utils = __commonJS({
    "node_modules/inversify/lib/utils/binding_utils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.multiBindToService = void 0;
      var multiBindToService = function(container) {
        return function(service) {
          return function() {
            var types = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              types[_i] = arguments[_i];
            }
            return types.forEach(function(t) {
              return container.bind(t).toService(service);
            });
          };
        };
      };
      exports.multiBindToService = multiBindToService;
    }
  });

  // node_modules/inversify/lib/inversify.js
  var require_inversify = __commonJS({
    "node_modules/inversify/lib/inversify.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.multiBindToService = exports.getServiceIdentifierAsString = exports.typeConstraint = exports.namedConstraint = exports.taggedConstraint = exports.traverseAncerstors = exports.decorate = exports.id = exports.MetadataReader = exports.postConstruct = exports.targetName = exports.multiInject = exports.unmanaged = exports.optional = exports.LazyServiceIdentifer = exports.inject = exports.named = exports.tagged = exports.injectable = exports.ContainerModule = exports.AsyncContainerModule = exports.TargetTypeEnum = exports.BindingTypeEnum = exports.BindingScopeEnum = exports.Container = exports.METADATA_KEY = void 0;
      var keys = require_metadata_keys();
      exports.METADATA_KEY = keys;
      var container_1 = require_container();
      Object.defineProperty(exports, "Container", { enumerable: true, get: function() {
        return container_1.Container;
      } });
      var literal_types_1 = require_literal_types();
      Object.defineProperty(exports, "BindingScopeEnum", { enumerable: true, get: function() {
        return literal_types_1.BindingScopeEnum;
      } });
      Object.defineProperty(exports, "BindingTypeEnum", { enumerable: true, get: function() {
        return literal_types_1.BindingTypeEnum;
      } });
      Object.defineProperty(exports, "TargetTypeEnum", { enumerable: true, get: function() {
        return literal_types_1.TargetTypeEnum;
      } });
      var container_module_1 = require_container_module();
      Object.defineProperty(exports, "AsyncContainerModule", { enumerable: true, get: function() {
        return container_module_1.AsyncContainerModule;
      } });
      Object.defineProperty(exports, "ContainerModule", { enumerable: true, get: function() {
        return container_module_1.ContainerModule;
      } });
      var injectable_1 = require_injectable();
      Object.defineProperty(exports, "injectable", { enumerable: true, get: function() {
        return injectable_1.injectable;
      } });
      var tagged_1 = require_tagged();
      Object.defineProperty(exports, "tagged", { enumerable: true, get: function() {
        return tagged_1.tagged;
      } });
      var named_1 = require_named();
      Object.defineProperty(exports, "named", { enumerable: true, get: function() {
        return named_1.named;
      } });
      var inject_1 = require_inject();
      Object.defineProperty(exports, "inject", { enumerable: true, get: function() {
        return inject_1.inject;
      } });
      Object.defineProperty(exports, "LazyServiceIdentifer", { enumerable: true, get: function() {
        return inject_1.LazyServiceIdentifer;
      } });
      var optional_1 = require_optional();
      Object.defineProperty(exports, "optional", { enumerable: true, get: function() {
        return optional_1.optional;
      } });
      var unmanaged_1 = require_unmanaged();
      Object.defineProperty(exports, "unmanaged", { enumerable: true, get: function() {
        return unmanaged_1.unmanaged;
      } });
      var multi_inject_1 = require_multi_inject();
      Object.defineProperty(exports, "multiInject", { enumerable: true, get: function() {
        return multi_inject_1.multiInject;
      } });
      var target_name_1 = require_target_name();
      Object.defineProperty(exports, "targetName", { enumerable: true, get: function() {
        return target_name_1.targetName;
      } });
      var post_construct_1 = require_post_construct();
      Object.defineProperty(exports, "postConstruct", { enumerable: true, get: function() {
        return post_construct_1.postConstruct;
      } });
      var metadata_reader_1 = require_metadata_reader();
      Object.defineProperty(exports, "MetadataReader", { enumerable: true, get: function() {
        return metadata_reader_1.MetadataReader;
      } });
      var id_1 = require_id();
      Object.defineProperty(exports, "id", { enumerable: true, get: function() {
        return id_1.id;
      } });
      var decorator_utils_1 = require_decorator_utils();
      Object.defineProperty(exports, "decorate", { enumerable: true, get: function() {
        return decorator_utils_1.decorate;
      } });
      var constraint_helpers_1 = require_constraint_helpers();
      Object.defineProperty(exports, "traverseAncerstors", { enumerable: true, get: function() {
        return constraint_helpers_1.traverseAncerstors;
      } });
      Object.defineProperty(exports, "taggedConstraint", { enumerable: true, get: function() {
        return constraint_helpers_1.taggedConstraint;
      } });
      Object.defineProperty(exports, "namedConstraint", { enumerable: true, get: function() {
        return constraint_helpers_1.namedConstraint;
      } });
      Object.defineProperty(exports, "typeConstraint", { enumerable: true, get: function() {
        return constraint_helpers_1.typeConstraint;
      } });
      var serialization_1 = require_serialization();
      Object.defineProperty(exports, "getServiceIdentifierAsString", { enumerable: true, get: function() {
        return serialization_1.getServiceIdentifierAsString;
      } });
      var binding_utils_1 = require_binding_utils();
      Object.defineProperty(exports, "multiBindToService", { enumerable: true, get: function() {
        return binding_utils_1.multiBindToService;
      } });
    }
  });

  // node_modules/sprotty-protocol/lib/utils/async.js
  var require_async = __commonJS({
    "node_modules/sprotty-protocol/lib/utils/async.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Deferred = void 0;
      var Deferred = class {
        constructor() {
          this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
          });
        }
      };
      exports.Deferred = Deferred;
    }
  });

  // node_modules/sprotty/lib/base/types.js
  var require_types = __commonJS({
    "node_modules/sprotty/lib/base/types.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.TYPES = void 0;
      exports.TYPES = {
        Action: Symbol("Action"),
        IActionDispatcher: Symbol("IActionDispatcher"),
        IActionDispatcherProvider: Symbol("IActionDispatcherProvider"),
        IActionHandlerInitializer: Symbol("IActionHandlerInitializer"),
        ActionHandlerRegistration: Symbol("ActionHandlerRegistration"),
        ActionHandlerRegistryProvider: Symbol("ActionHandlerRegistryProvider"),
        IAnchorComputer: Symbol("IAnchor"),
        AnimationFrameSyncer: Symbol("AnimationFrameSyncer"),
        /** @deprecated deprecated since 0.12.0 - please use `configureButtonHandler` */
        IButtonHandler: Symbol("IButtonHandler"),
        IButtonHandlerRegistration: Symbol("IButtonHandlerRegistration"),
        ICommandPaletteActionProvider: Symbol("ICommandPaletteActionProvider"),
        ICommandPaletteActionProviderRegistry: Symbol("ICommandPaletteActionProviderRegistry"),
        CommandRegistration: Symbol("CommandRegistration"),
        ICommandStack: Symbol("ICommandStack"),
        CommandStackOptions: Symbol("CommandStackOptions"),
        ICommandStackProvider: Symbol("ICommandStackProvider"),
        IContextMenuItemProvider: Symbol.for("IContextMenuProvider"),
        IContextMenuProviderRegistry: Symbol.for("IContextMenuProviderRegistry"),
        IContextMenuService: Symbol.for("IContextMenuService"),
        IContextMenuServiceProvider: Symbol.for("IContextMenuServiceProvider"),
        DOMHelper: Symbol("DOMHelper"),
        IDiagramLocker: Symbol("IDiagramLocker"),
        IEdgeRouter: Symbol("IEdgeRouter"),
        IEdgeRoutePostprocessor: Symbol("IEdgeRoutePostprocessor"),
        IEditLabelValidationDecorator: Symbol("IEditLabelValidationDecorator"),
        IEditLabelValidator: Symbol("IEditLabelValidator"),
        HiddenModelViewer: Symbol("HiddenModelViewer"),
        HiddenVNodePostprocessor: Symbol("HiddenVNodeDecorator"),
        HoverState: Symbol("HoverState"),
        KeyListener: Symbol("KeyListener"),
        LayoutRegistration: Symbol("LayoutRegistration"),
        LayoutRegistry: Symbol("LayoutRegistry"),
        Layouter: Symbol("Layouter"),
        LogLevel: Symbol("LogLevel"),
        ILogger: Symbol("ILogger"),
        IModelFactory: Symbol("IModelFactory"),
        IModelLayoutEngine: Symbol("IModelLayoutEngine"),
        ModelRendererFactory: Symbol("ModelRendererFactory"),
        ModelSource: Symbol("ModelSource"),
        ModelSourceProvider: Symbol("ModelSourceProvider"),
        ModelViewer: Symbol("ModelViewer"),
        MouseListener: Symbol("MouseListener"),
        PatcherProvider: Symbol("PatcherProvider"),
        IPopupModelProvider: Symbol("IPopupModelProvider"),
        PopupModelViewer: Symbol("PopupModelViewer"),
        PopupMouseListener: Symbol("PopupMouseListener"),
        PopupVNodePostprocessor: Symbol("PopupVNodeDecorator"),
        SModelElementRegistration: Symbol("SModelElementRegistration"),
        SModelRegistry: Symbol("SModelRegistry"),
        ISnapper: Symbol("ISnapper"),
        SvgExporter: Symbol("SvgExporter"),
        IToolManager: Symbol("IToolManager"),
        IUIExtension: Symbol("IUIExtension"),
        UIExtensionRegistry: Symbol("UIExtensionRegistry"),
        IVNodePostprocessor: Symbol("IVNodePostprocessor"),
        ViewRegistration: Symbol("ViewRegistration"),
        ViewRegistry: Symbol("ViewRegistry"),
        IViewer: Symbol("IViewer"),
        ViewerOptions: Symbol("ViewerOptions"),
        IViewerProvider: Symbol("IViewerProvider")
      };
    }
  });

  // node_modules/sprotty/lib/utils/registry.js
  var require_registry = __commonJS({
    "node_modules/sprotty/lib/utils/registry.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.MultiInstanceRegistry = exports.InstanceRegistry = exports.FactoryRegistry = exports.ProviderRegistry = void 0;
      var inversify_1 = require_inversify();
      var ProviderRegistry = class ProviderRegistry {
        constructor() {
          this.elements = /* @__PURE__ */ new Map();
        }
        register(key, cstr) {
          if (key === void 0)
            throw new Error("Key is undefined");
          if (this.hasKey(key))
            throw new Error("Key is already registered: " + key);
          this.elements.set(key, cstr);
        }
        deregister(key) {
          if (key === void 0)
            throw new Error("Key is undefined");
          this.elements.delete(key);
        }
        hasKey(key) {
          return this.elements.has(key);
        }
        get(key, arg) {
          const existingCstr = this.elements.get(key);
          if (existingCstr)
            return new existingCstr(arg);
          else
            return this.missing(key, arg);
        }
        missing(key, arg) {
          throw new Error("Unknown registry key: " + key);
        }
      };
      ProviderRegistry = __decorate([
        (0, inversify_1.injectable)()
      ], ProviderRegistry);
      exports.ProviderRegistry = ProviderRegistry;
      var FactoryRegistry = class FactoryRegistry {
        constructor() {
          this.elements = /* @__PURE__ */ new Map();
        }
        register(key, factory) {
          if (key === void 0)
            throw new Error("Key is undefined");
          if (this.hasKey(key))
            throw new Error("Key is already registered: " + key);
          this.elements.set(key, factory);
        }
        deregister(key) {
          if (key === void 0)
            throw new Error("Key is undefined");
          this.elements.delete(key);
        }
        hasKey(key) {
          return this.elements.has(key);
        }
        get(key, arg) {
          const existingFactory = this.elements.get(key);
          if (existingFactory)
            return existingFactory(arg);
          else
            return this.missing(key, arg);
        }
        missing(key, arg) {
          throw new Error("Unknown registry key: " + key);
        }
      };
      FactoryRegistry = __decorate([
        (0, inversify_1.injectable)()
      ], FactoryRegistry);
      exports.FactoryRegistry = FactoryRegistry;
      var InstanceRegistry = class InstanceRegistry {
        constructor() {
          this.elements = /* @__PURE__ */ new Map();
        }
        register(key, instance) {
          if (key === void 0)
            throw new Error("Key is undefined");
          if (this.hasKey(key))
            throw new Error("Key is already registered: " + key);
          this.elements.set(key, instance);
        }
        deregister(key) {
          if (key === void 0)
            throw new Error("Key is undefined");
          this.elements.delete(key);
        }
        hasKey(key) {
          return this.elements.has(key);
        }
        get(key) {
          const existingInstance = this.elements.get(key);
          if (existingInstance)
            return existingInstance;
          else
            return this.missing(key);
        }
        missing(key) {
          throw new Error("Unknown registry key: " + key);
        }
      };
      InstanceRegistry = __decorate([
        (0, inversify_1.injectable)()
      ], InstanceRegistry);
      exports.InstanceRegistry = InstanceRegistry;
      var MultiInstanceRegistry = class MultiInstanceRegistry {
        constructor() {
          this.elements = /* @__PURE__ */ new Map();
        }
        register(key, instance) {
          if (key === void 0)
            throw new Error("Key is undefined");
          const instances = this.elements.get(key);
          if (instances !== void 0)
            instances.push(instance);
          else
            this.elements.set(key, [instance]);
        }
        deregisterAll(key) {
          if (key === void 0)
            throw new Error("Key is undefined");
          this.elements.delete(key);
        }
        get(key) {
          const existingInstances = this.elements.get(key);
          if (existingInstances !== void 0)
            return existingInstances;
          else
            return [];
        }
      };
      MultiInstanceRegistry = __decorate([
        (0, inversify_1.injectable)()
      ], MultiInstanceRegistry);
      exports.MultiInstanceRegistry = MultiInstanceRegistry;
    }
  });

  // node_modules/sprotty-protocol/lib/utils/geometry.js
  var require_geometry = __commonJS({
    "node_modules/sprotty-protocol/lib/utils/geometry.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.almostEquals = exports.toRadians = exports.toDegrees = exports.Bounds = exports.isBounds = exports.Dimension = exports.centerOfLine = exports.angleBetweenPoints = exports.angleOfPoint = exports.Point = void 0;
      var object_1 = require_object();
      var Point;
      (function(Point2) {
        Point2.ORIGIN = Object.freeze({
          x: 0,
          y: 0
        });
        function add(p1, p2) {
          return {
            x: p1.x + p2.x,
            y: p1.y + p2.y
          };
        }
        Point2.add = add;
        function subtract(p1, p2) {
          return {
            x: p1.x - p2.x,
            y: p1.y - p2.y
          };
        }
        Point2.subtract = subtract;
        function equals(point1, point2) {
          return point1.x === point2.x && point1.y === point2.y;
        }
        Point2.equals = equals;
        function shiftTowards(point, refPoint, distance) {
          const diff = subtract(refPoint, point);
          const normalized = normalize(diff);
          const shift = { x: normalized.x * distance, y: normalized.y * distance };
          return add(point, shift);
        }
        Point2.shiftTowards = shiftTowards;
        function normalize(point) {
          const mag = magnitude(point);
          if (mag === 0 || mag === 1) {
            return Point2.ORIGIN;
          }
          return {
            x: point.x / mag,
            y: point.y / mag
          };
        }
        Point2.normalize = normalize;
        function magnitude(point) {
          return Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2));
        }
        Point2.magnitude = magnitude;
        function linear(p0, p1, lambda) {
          return {
            x: (1 - lambda) * p0.x + lambda * p1.x,
            y: (1 - lambda) * p0.y + lambda * p1.y
          };
        }
        Point2.linear = linear;
        function euclideanDistance(a, b) {
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          return Math.sqrt(dx * dx + dy * dy);
        }
        Point2.euclideanDistance = euclideanDistance;
        function manhattanDistance(a, b) {
          return Math.abs(b.x - a.x) + Math.abs(b.y - a.y);
        }
        Point2.manhattanDistance = manhattanDistance;
        function maxDistance(a, b) {
          return Math.max(Math.abs(b.x - a.x), Math.abs(b.y - a.y));
        }
        Point2.maxDistance = maxDistance;
      })(Point = exports.Point || (exports.Point = {}));
      function angleOfPoint(p) {
        return Math.atan2(p.y, p.x);
      }
      exports.angleOfPoint = angleOfPoint;
      function angleBetweenPoints(a, b) {
        const lengthProduct = Math.sqrt((a.x * a.x + a.y * a.y) * (b.x * b.x + b.y * b.y));
        if (isNaN(lengthProduct) || lengthProduct === 0)
          return NaN;
        const dotProduct = a.x * b.x + a.y * b.y;
        return Math.acos(dotProduct / lengthProduct);
      }
      exports.angleBetweenPoints = angleBetweenPoints;
      function centerOfLine(s, e) {
        const b = {
          x: s.x > e.x ? e.x : s.x,
          y: s.y > e.y ? e.y : s.y,
          width: Math.abs(e.x - s.x),
          height: Math.abs(e.y - s.y)
        };
        return Bounds.center(b);
      }
      exports.centerOfLine = centerOfLine;
      var Dimension;
      (function(Dimension2) {
        Dimension2.EMPTY = Object.freeze({
          width: -1,
          height: -1
        });
        function isValid(d) {
          return d.width >= 0 && d.height >= 0;
        }
        Dimension2.isValid = isValid;
      })(Dimension = exports.Dimension || (exports.Dimension = {}));
      function isBounds(element) {
        return (0, object_1.hasOwnProperty)(element, ["x", "y", "width", "height"]);
      }
      exports.isBounds = isBounds;
      var Bounds;
      (function(Bounds2) {
        Bounds2.EMPTY = Object.freeze({
          x: 0,
          y: 0,
          width: -1,
          height: -1
        });
        function combine(b0, b1) {
          if (!Dimension.isValid(b0))
            return Dimension.isValid(b1) ? b1 : Bounds2.EMPTY;
          if (!Dimension.isValid(b1))
            return b0;
          const minX = Math.min(b0.x, b1.x);
          const minY = Math.min(b0.y, b1.y);
          const maxX = Math.max(b0.x + (b0.width >= 0 ? b0.width : 0), b1.x + (b1.width >= 0 ? b1.width : 0));
          const maxY = Math.max(b0.y + (b0.height >= 0 ? b0.height : 0), b1.y + (b1.height >= 0 ? b1.height : 0));
          return {
            x: minX,
            y: minY,
            width: maxX - minX,
            height: maxY - minY
          };
        }
        Bounds2.combine = combine;
        function translate(b, p) {
          return {
            x: b.x + p.x,
            y: b.y + p.y,
            width: b.width,
            height: b.height
          };
        }
        Bounds2.translate = translate;
        function center(b) {
          return {
            x: b.x + (b.width >= 0 ? 0.5 * b.width : 0),
            y: b.y + (b.height >= 0 ? 0.5 * b.height : 0)
          };
        }
        Bounds2.center = center;
        function includes(b, p) {
          return p.x >= b.x && p.x <= b.x + b.width && p.y >= b.y && p.y <= b.y + b.height;
        }
        Bounds2.includes = includes;
      })(Bounds = exports.Bounds || (exports.Bounds = {}));
      function toDegrees(a) {
        return a * 180 / Math.PI;
      }
      exports.toDegrees = toDegrees;
      function toRadians(a) {
        return a * Math.PI / 180;
      }
      exports.toRadians = toRadians;
      function almostEquals(a, b) {
        return Math.abs(a - b) < 1e-3;
      }
      exports.almostEquals = almostEquals;
    }
  });

  // node_modules/sprotty/lib/utils/iterable.js
  var require_iterable = __commonJS({
    "node_modules/sprotty/lib/utils/iterable.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.mapIterable = exports.filterIterable = exports.DONE_RESULT = exports.toArray = exports.FluentIterableImpl = void 0;
      var FluentIterableImpl = class {
        constructor(startFn, nextFn) {
          this.startFn = startFn;
          this.nextFn = nextFn;
        }
        [Symbol.iterator]() {
          const iterator = {
            state: this.startFn(),
            next: () => this.nextFn(iterator.state),
            [Symbol.iterator]: () => iterator
          };
          return iterator;
        }
        filter(callback) {
          return filterIterable(this, callback);
        }
        map(callback) {
          return mapIterable(this, callback);
        }
        forEach(callback) {
          const iterator = this[Symbol.iterator]();
          let index = 0;
          let result;
          do {
            result = iterator.next();
            if (result.value !== void 0)
              callback(result.value, index);
            index++;
          } while (!result.done);
        }
        indexOf(element) {
          const iterator = this[Symbol.iterator]();
          let index = 0;
          let result;
          do {
            result = iterator.next();
            if (result.value === element)
              return index;
            index++;
          } while (!result.done);
          return -1;
        }
      };
      exports.FluentIterableImpl = FluentIterableImpl;
      function toArray(input) {
        if (input.constructor === Array) {
          return input;
        }
        const result = [];
        input.forEach((element) => result.push(element));
        return result;
      }
      exports.toArray = toArray;
      exports.DONE_RESULT = Object.freeze({ done: true, value: void 0 });
      function filterIterable(input, callback) {
        return new FluentIterableImpl(() => createIterator(input), (iterator) => {
          let result;
          do {
            result = iterator.next();
          } while (!result.done && !callback(result.value));
          return result;
        });
      }
      exports.filterIterable = filterIterable;
      function mapIterable(input, callback) {
        return new FluentIterableImpl(() => createIterator(input), (iterator) => {
          const { done, value } = iterator.next();
          if (done)
            return exports.DONE_RESULT;
          else
            return { done: false, value: callback(value) };
        });
      }
      exports.mapIterable = mapIterable;
      function createIterator(collection) {
        const method = collection[Symbol.iterator];
        if (typeof method === "function") {
          return method.call(collection);
        }
        const length = collection.length;
        if (typeof length === "number" && length >= 0) {
          return new ArrayIterator(collection);
        }
        return { next: () => exports.DONE_RESULT };
      }
      var ArrayIterator = class {
        constructor(array) {
          this.array = array;
          this.index = 0;
        }
        next() {
          if (this.index < this.array.length)
            return { done: false, value: this.array[this.index++] };
          else
            return exports.DONE_RESULT;
        }
        [Symbol.iterator]() {
          return this;
        }
      };
    }
  });

  // node_modules/sprotty/lib/base/model/smodel.js
  var require_smodel = __commonJS({
    "node_modules/sprotty/lib/base/model/smodel.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ModelIndexImpl = exports.createRandomId = exports.SModelRoot = exports.SChildElement = exports.SParentElement = exports.isParent = exports.SModelElement = void 0;
      var geometry_1 = require_geometry();
      var iterable_1 = require_iterable();
      var SModelElement = class {
        get root() {
          let current = this;
          while (current) {
            if (current instanceof SModelRoot)
              return current;
            else if (current instanceof SChildElement)
              current = current.parent;
            else
              current = void 0;
          }
          throw new Error("Element has no root");
        }
        get index() {
          return this.root.index;
        }
        /**
         * A feature is a symbol identifying some functionality that can be enabled or disabled for
         * a model element. The set of supported features is determined by the `features` property.
         */
        hasFeature(feature) {
          return this.features !== void 0 && this.features.has(feature);
        }
      };
      exports.SModelElement = SModelElement;
      function isParent(element) {
        const children = element.children;
        return children !== void 0 && children.constructor === Array;
      }
      exports.isParent = isParent;
      var SParentElement = class extends SModelElement {
        constructor() {
          super(...arguments);
          this.children = [];
        }
        add(child, index) {
          const children = this.children;
          if (index === void 0) {
            children.push(child);
          } else {
            if (index < 0 || index > this.children.length) {
              throw new Error(`Child index ${index} out of bounds (0..${children.length})`);
            }
            children.splice(index, 0, child);
          }
          child.parent = this;
          this.index.add(child);
        }
        remove(child) {
          const children = this.children;
          const i = children.indexOf(child);
          if (i < 0) {
            throw new Error(`No such child ${child.id}`);
          }
          children.splice(i, 1);
          this.index.remove(child);
        }
        removeAll(filter) {
          const children = this.children;
          if (filter !== void 0) {
            for (let i = children.length - 1; i >= 0; i--) {
              if (filter(children[i])) {
                const child = children.splice(i, 1)[0];
                this.index.remove(child);
              }
            }
          } else {
            children.forEach((child) => {
              this.index.remove(child);
            });
            children.splice(0, children.length);
          }
        }
        move(child, newIndex) {
          const children = this.children;
          const i = children.indexOf(child);
          if (i === -1) {
            throw new Error(`No such child ${child.id}`);
          } else {
            if (newIndex < 0 || newIndex > children.length - 1) {
              throw new Error(`Child index ${newIndex} out of bounds (0..${children.length})`);
            }
            children.splice(i, 1);
            children.splice(newIndex, 0, child);
          }
        }
        /**
         * Transform the given bounds from the local coordinate system of this element to the coordinate
         * system of its parent. This function should consider any transformation that is applied to the
         * view of this element and its contents.
         * The base implementation assumes that this element does not define a local coordinate system,
         * so it leaves the bounds unchanged.
         */
        localToParent(point) {
          return (0, geometry_1.isBounds)(point) ? point : { x: point.x, y: point.y, width: -1, height: -1 };
        }
        /**
         * Transform the given bounds from the coordinate system of this element's parent to its local
         * coordinate system. This function should consider any transformation that is applied to the
         * view of this element and its contents.
         * The base implementation assumes that this element does not define a local coordinate system,
         * so it leaves the bounds unchanged.
         */
        parentToLocal(point) {
          return (0, geometry_1.isBounds)(point) ? point : { x: point.x, y: point.y, width: -1, height: -1 };
        }
      };
      exports.SParentElement = SParentElement;
      var SChildElement = class extends SParentElement {
      };
      exports.SChildElement = SChildElement;
      var SModelRoot = class extends SParentElement {
        constructor(index = new ModelIndexImpl()) {
          super();
          this.canvasBounds = geometry_1.Bounds.EMPTY;
          Object.defineProperty(this, "index", {
            value: index,
            writable: false
          });
        }
      };
      exports.SModelRoot = SModelRoot;
      var ID_CHARS = "0123456789abcdefghijklmnopqrstuvwxyz";
      function createRandomId(length = 8) {
        let id = "";
        for (let i = 0; i < length; i++) {
          id += ID_CHARS.charAt(Math.floor(Math.random() * ID_CHARS.length));
        }
        return id;
      }
      exports.createRandomId = createRandomId;
      var ModelIndexImpl = class {
        constructor() {
          this.id2element = /* @__PURE__ */ new Map();
        }
        add(element) {
          if (!element.id) {
            do {
              element.id = createRandomId();
            } while (this.contains(element));
          } else if (this.contains(element)) {
            throw new Error("Duplicate ID in model: " + element.id);
          }
          this.id2element.set(element.id, element);
          if (element instanceof SParentElement) {
            for (const child of element.children) {
              this.add(child);
            }
          }
        }
        remove(element) {
          this.id2element.delete(element.id);
          if (element instanceof SParentElement) {
            for (const child of element.children) {
              this.remove(child);
            }
          }
        }
        contains(element) {
          return this.id2element.has(element.id);
        }
        getById(id) {
          return this.id2element.get(id);
        }
        getAttachedElements(element) {
          return [];
        }
        all() {
          return (0, iterable_1.mapIterable)(this.id2element, ([key, value]) => value);
        }
      };
      exports.ModelIndexImpl = ModelIndexImpl;
    }
  });

  // node_modules/sprotty/lib/base/model/smodel-factory.js
  var require_smodel_factory = __commonJS({
    "node_modules/sprotty/lib/base/model/smodel-factory.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      var __param = exports && exports.__param || function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createFeatureSet = exports.EMPTY_ROOT = exports.SModelFactory = exports.SModelRegistry = void 0;
      var inversify_1 = require_inversify();
      var types_1 = require_types();
      var registry_1 = require_registry();
      var smodel_1 = require_smodel();
      var SModelRegistry = class SModelRegistry extends registry_1.FactoryRegistry {
        constructor(registrations) {
          super();
          registrations.forEach((registration) => {
            let defaultFeatures = this.getDefaultFeatures(registration.constr);
            if (!defaultFeatures && registration.features && registration.features.enable)
              defaultFeatures = [];
            if (defaultFeatures) {
              const featureSet = createFeatureSet(defaultFeatures, registration.features);
              this.register(registration.type, () => {
                const element = new registration.constr();
                element.features = featureSet;
                return element;
              });
            } else {
              this.register(registration.type, () => new registration.constr());
            }
          });
        }
        getDefaultFeatures(constr) {
          let obj = constr;
          do {
            const defaultFeatures = obj.DEFAULT_FEATURES;
            if (defaultFeatures)
              return defaultFeatures;
            obj = Object.getPrototypeOf(obj);
          } while (obj);
          return void 0;
        }
      };
      SModelRegistry = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.multiInject)(types_1.TYPES.SModelElementRegistration)),
        __param(0, (0, inversify_1.optional)()),
        __metadata("design:paramtypes", [Array])
      ], SModelRegistry);
      exports.SModelRegistry = SModelRegistry;
      var SModelFactory = class SModelFactory {
        createElement(schema, parent) {
          let child;
          if (this.registry.hasKey(schema.type)) {
            const regElement = this.registry.get(schema.type, void 0);
            if (!(regElement instanceof smodel_1.SChildElement))
              throw new Error(`Element with type ${schema.type} was expected to be an SChildElement.`);
            child = regElement;
          } else {
            child = new smodel_1.SChildElement();
          }
          return this.initializeChild(child, schema, parent);
        }
        createRoot(schema) {
          let root;
          if (this.registry.hasKey(schema.type)) {
            const regElement = this.registry.get(schema.type, void 0);
            if (!(regElement instanceof smodel_1.SModelRoot))
              throw new Error(`Element with type ${schema.type} was expected to be an SModelRoot.`);
            root = regElement;
          } else {
            root = new smodel_1.SModelRoot();
          }
          return this.initializeRoot(root, schema);
        }
        createSchema(element) {
          const schema = {};
          for (const key in element) {
            if (!this.isReserved(element, key)) {
              const value = element[key];
              if (typeof value !== "function")
                schema[key] = value;
            }
          }
          if (element instanceof smodel_1.SParentElement)
            schema["children"] = element.children.map((child) => this.createSchema(child));
          return schema;
        }
        initializeElement(element, schema) {
          for (const key in schema) {
            if (!this.isReserved(element, key)) {
              const value = schema[key];
              if (typeof value !== "function")
                element[key] = value;
            }
          }
          return element;
        }
        isReserved(element, propertyName) {
          if (["children", "parent", "index"].indexOf(propertyName) >= 0)
            return true;
          let obj = element;
          do {
            const descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
            if (descriptor !== void 0)
              return descriptor.get !== void 0;
            obj = Object.getPrototypeOf(obj);
          } while (obj);
          return false;
        }
        initializeParent(parent, schema) {
          this.initializeElement(parent, schema);
          if ((0, smodel_1.isParent)(schema)) {
            parent.children = schema.children.map((childSchema) => this.createElement(childSchema, parent));
          }
          return parent;
        }
        initializeChild(child, schema, parent) {
          this.initializeParent(child, schema);
          if (parent !== void 0) {
            child.parent = parent;
          }
          return child;
        }
        initializeRoot(root, schema) {
          this.initializeParent(root, schema);
          root.index.add(root);
          return root;
        }
      };
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.SModelRegistry),
        __metadata("design:type", SModelRegistry)
      ], SModelFactory.prototype, "registry", void 0);
      SModelFactory = __decorate([
        (0, inversify_1.injectable)()
      ], SModelFactory);
      exports.SModelFactory = SModelFactory;
      exports.EMPTY_ROOT = Object.freeze({
        type: "NONE",
        id: "EMPTY"
      });
      function createFeatureSet(defaults, custom) {
        const featureSet = new Set(defaults);
        if (custom && custom.enable) {
          for (const f of custom.enable) {
            featureSet.add(f);
          }
        }
        if (custom && custom.disable) {
          for (const f of custom.disable) {
            featureSet.delete(f);
          }
        }
        return featureSet;
      }
      exports.createFeatureSet = createFeatureSet;
    }
  });

  // node_modules/sprotty/lib/base/animations/animation-frame-syncer.js
  var require_animation_frame_syncer = __commonJS({
    "node_modules/sprotty/lib/base/animations/animation-frame-syncer.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.AnimationFrameSyncer = void 0;
      var inversify_1 = require_inversify();
      var AnimationFrameSyncer = class AnimationFrameSyncer {
        constructor() {
          this.tasks = [];
          this.endTasks = [];
          this.triggered = false;
        }
        isAvailable() {
          return typeof requestAnimationFrame === "function";
        }
        onNextFrame(task) {
          this.tasks.push(task);
          this.trigger();
        }
        onEndOfNextFrame(task) {
          this.endTasks.push(task);
          this.trigger();
        }
        trigger() {
          if (!this.triggered) {
            this.triggered = true;
            if (this.isAvailable())
              requestAnimationFrame((time) => this.run(time));
            else
              setTimeout((time) => this.run(time));
          }
        }
        run(time) {
          const tasks = this.tasks;
          const endTasks = this.endTasks;
          this.triggered = false;
          this.tasks = [];
          this.endTasks = [];
          tasks.forEach((task) => task.call(void 0, time));
          endTasks.forEach((task) => task.call(void 0, time));
        }
      };
      AnimationFrameSyncer = __decorate([
        (0, inversify_1.injectable)()
      ], AnimationFrameSyncer);
      exports.AnimationFrameSyncer = AnimationFrameSyncer;
    }
  });

  // node_modules/sprotty/lib/base/actions/action-dispatcher.js
  var require_action_dispatcher = __commonJS({
    "node_modules/sprotty/lib/base/actions/action-dispatcher.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ActionDispatcher = void 0;
      var inversify_1 = require_inversify();
      var actions_1 = require_actions();
      var async_1 = require_async();
      var types_1 = require_types();
      var smodel_factory_1 = require_smodel_factory();
      var animation_frame_syncer_1 = require_animation_frame_syncer();
      var ActionDispatcher = class ActionDispatcher {
        constructor() {
          this.postponedActions = [];
          this.requests = /* @__PURE__ */ new Map();
        }
        initialize() {
          if (!this.initialized) {
            this.initialized = this.actionHandlerRegistryProvider().then((registry) => {
              this.actionHandlerRegistry = registry;
              this.handleAction(actions_1.SetModelAction.create(smodel_factory_1.EMPTY_ROOT)).catch(() => {
              });
            });
          }
          return this.initialized;
        }
        /**
         * Dispatch an action by querying all handlers that are registered for its kind.
         * The returned promise is resolved when all handler results (commands or actions)
         * have been processed.
         */
        dispatch(action) {
          return this.initialize().then(() => {
            if (this.blockUntil !== void 0) {
              return this.handleBlocked(action, this.blockUntil);
            } else if (this.diagramLocker.isAllowed(action)) {
              return this.handleAction(action);
            }
            return void 0;
          });
        }
        /**
         * Calls `dispatch` on every action in the given array. The returned promise
         * is resolved when the promises of all `dispatch` calls have been resolved.
         */
        dispatchAll(actions) {
          return Promise.all(actions.map((action) => this.dispatch(action)));
        }
        /**
         * Dispatch a request. The returned promise is resolved when a response with matching
         * identifier is dispatched. That response is _not_ passed to the registered action
         * handlers. Instead, it is the responsibility of the caller of this method to handle
         * the response properly. For example, it can be sent to the registered handlers by
         * passing it again to the `dispatch` method.
         */
        request(action) {
          if (!action.requestId) {
            return Promise.reject(new Error("Request without requestId"));
          }
          const deferred = new async_1.Deferred();
          this.requests.set(action.requestId, deferred);
          this.dispatch(action).catch(() => {
          });
          return deferred.promise;
        }
        handleAction(action) {
          if (action.kind === actions_1.UndoAction.KIND) {
            return this.commandStack.undo().then(() => {
            });
          }
          if (action.kind === actions_1.RedoAction.KIND) {
            return this.commandStack.redo().then(() => {
            });
          }
          if ((0, actions_1.isResponseAction)(action)) {
            const deferred = this.requests.get(action.responseId);
            if (deferred !== void 0) {
              this.requests.delete(action.responseId);
              if (action.kind === actions_1.RejectAction.KIND) {
                const rejectAction = action;
                deferred.reject(new Error(rejectAction.message));
                this.logger.warn(this, `Request with id ${action.responseId} failed.`, rejectAction.message, rejectAction.detail);
              } else {
                deferred.resolve(action);
              }
              return Promise.resolve();
            }
            this.logger.log(this, "No matching request for response", action);
          }
          const handlers = this.actionHandlerRegistry.get(action.kind);
          if (handlers.length === 0) {
            this.logger.warn(this, "Missing handler for action", action);
            const error = new Error(`Missing handler for action '${action.kind}'`);
            if ((0, actions_1.isRequestAction)(action)) {
              const deferred = this.requests.get(action.requestId);
              if (deferred !== void 0) {
                this.requests.delete(action.requestId);
                deferred.reject(error);
              }
            }
            return Promise.reject(error);
          }
          this.logger.log(this, "Handle", action);
          const promises = [];
          for (const handler of handlers) {
            const result = handler.handle(action);
            if ((0, actions_1.isAction)(result)) {
              promises.push(this.dispatch(result));
            } else if (result !== void 0) {
              promises.push(this.commandStack.execute(result));
              this.blockUntil = result.blockUntil;
            }
          }
          return Promise.all(promises);
        }
        handleBlocked(action, predicate) {
          if (predicate(action)) {
            this.blockUntil = void 0;
            const result = this.handleAction(action);
            const actions = this.postponedActions;
            this.postponedActions = [];
            for (const a of actions) {
              this.dispatch(a.action).then(a.resolve, a.reject);
            }
            return result;
          } else {
            this.logger.log(this, "Action is postponed due to block condition", action);
            return new Promise((resolve, reject) => {
              this.postponedActions.push({ action, resolve, reject });
            });
          }
        }
      };
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.ActionHandlerRegistryProvider),
        __metadata("design:type", Function)
      ], ActionDispatcher.prototype, "actionHandlerRegistryProvider", void 0);
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.ICommandStack),
        __metadata("design:type", Object)
      ], ActionDispatcher.prototype, "commandStack", void 0);
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.ILogger),
        __metadata("design:type", Object)
      ], ActionDispatcher.prototype, "logger", void 0);
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.AnimationFrameSyncer),
        __metadata("design:type", animation_frame_syncer_1.AnimationFrameSyncer)
      ], ActionDispatcher.prototype, "syncer", void 0);
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.IDiagramLocker),
        __metadata("design:type", Object)
      ], ActionDispatcher.prototype, "diagramLocker", void 0);
      ActionDispatcher = __decorate([
        (0, inversify_1.injectable)()
      ], ActionDispatcher);
      exports.ActionDispatcher = ActionDispatcher;
    }
  });

  // node_modules/sprotty/lib/utils/inversify.js
  var require_inversify2 = __commonJS({
    "node_modules/sprotty/lib/utils/inversify.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isInjectable = void 0;
      function isInjectable(constr) {
        return Reflect.getMetadata("inversify:paramtypes", constr) !== void 0;
      }
      exports.isInjectable = isInjectable;
    }
  });

  // node_modules/sprotty/lib/base/actions/action-handler.js
  var require_action_handler = __commonJS({
    "node_modules/sprotty/lib/base/actions/action-handler.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      var __param = exports && exports.__param || function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.onAction = exports.configureActionHandler = exports.ActionHandlerRegistry = void 0;
      var inversify_1 = require_inversify();
      var types_1 = require_types();
      var registry_1 = require_registry();
      var inversify_2 = require_inversify2();
      var ActionHandlerRegistry = class ActionHandlerRegistry extends registry_1.MultiInstanceRegistry {
        constructor(registrations, initializers) {
          super();
          registrations.forEach((registration) => this.register(registration.actionKind, registration.factory()));
          initializers.forEach((initializer) => this.initializeActionHandler(initializer));
        }
        initializeActionHandler(initializer) {
          initializer.initialize(this);
        }
      };
      ActionHandlerRegistry = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.multiInject)(types_1.TYPES.ActionHandlerRegistration)),
        __param(0, (0, inversify_1.optional)()),
        __param(1, (0, inversify_1.multiInject)(types_1.TYPES.IActionHandlerInitializer)),
        __param(1, (0, inversify_1.optional)()),
        __metadata("design:paramtypes", [Array, Array])
      ], ActionHandlerRegistry);
      exports.ActionHandlerRegistry = ActionHandlerRegistry;
      function configureActionHandler(context, kind, constr) {
        if (typeof constr === "function") {
          if (!(0, inversify_2.isInjectable)(constr)) {
            throw new Error(`Action handlers should be @injectable: ${constr.name}`);
          }
          if (!context.isBound(constr)) {
            context.bind(constr).toSelf();
          }
        }
        context.bind(types_1.TYPES.ActionHandlerRegistration).toDynamicValue((ctx) => ({
          actionKind: kind,
          factory: () => ctx.container.get(constr)
        }));
      }
      exports.configureActionHandler = configureActionHandler;
      function onAction(context, kind, handle) {
        context.bind(types_1.TYPES.ActionHandlerRegistration).toConstantValue({
          actionKind: kind,
          factory: () => ({ handle })
        });
      }
      exports.onAction = onAction;
    }
  });

  // node_modules/sprotty/lib/base/actions/diagram-locker.js
  var require_diagram_locker = __commonJS({
    "node_modules/sprotty/lib/base/actions/diagram-locker.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.DefaultDiagramLocker = void 0;
      var inversify_1 = require_inversify();
      var DefaultDiagramLocker = class DefaultDiagramLocker {
        isAllowed(action) {
          return true;
        }
      };
      DefaultDiagramLocker = __decorate([
        (0, inversify_1.injectable)()
      ], DefaultDiagramLocker);
      exports.DefaultDiagramLocker = DefaultDiagramLocker;
    }
  });

  // node_modules/sprotty/lib/base/animations/easing.js
  var require_easing = __commonJS({
    "node_modules/sprotty/lib/base/animations/easing.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.easeInOut = void 0;
      function easeInOut(x) {
        if (x < 0.5)
          return x * x * 2;
        else
          return 1 - (1 - x) * (1 - x) * 2;
      }
      exports.easeInOut = easeInOut;
    }
  });

  // node_modules/sprotty/lib/base/animations/animation.js
  var require_animation = __commonJS({
    "node_modules/sprotty/lib/base/animations/animation.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.CompoundAnimation = exports.Animation = void 0;
      var easing_1 = require_easing();
      var Animation = class {
        constructor(context, ease = easing_1.easeInOut) {
          this.context = context;
          this.ease = ease;
        }
        start() {
          return new Promise((resolve, reject) => {
            let start = void 0;
            let frames = 0;
            const lambda = (time) => {
              frames++;
              let dtime;
              if (start === void 0) {
                start = time;
                dtime = 0;
              } else {
                dtime = time - start;
              }
              const t = Math.min(1, dtime / this.context.duration);
              const current = this.tween(this.ease(t), this.context);
              this.context.modelChanged.update(current);
              if (t === 1) {
                this.context.logger.log(this, frames * 1e3 / this.context.duration + " fps");
                resolve(current);
              } else {
                this.context.syncer.onNextFrame(lambda);
              }
            };
            if (this.context.syncer.isAvailable()) {
              this.context.syncer.onNextFrame(lambda);
            } else {
              const finalModel = this.tween(1, this.context);
              resolve(finalModel);
            }
          });
        }
      };
      exports.Animation = Animation;
      var CompoundAnimation = class extends Animation {
        constructor(model, context, components = [], ease = easing_1.easeInOut) {
          super(context, ease);
          this.model = model;
          this.context = context;
          this.components = components;
          this.ease = ease;
        }
        include(animation) {
          this.components.push(animation);
          return this;
        }
        tween(t, context) {
          for (const a of this.components) {
            a.tween(t, context);
          }
          return this.model;
        }
      };
      exports.CompoundAnimation = CompoundAnimation;
    }
  });

  // node_modules/sprotty/lib/base/commands/command.js
  var require_command = __commonJS({
    "node_modules/sprotty/lib/base/commands/command.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ResetCommand = exports.SystemCommand = exports.PopupCommand = exports.HiddenCommand = exports.MergeableCommand = exports.Command = void 0;
      var inversify_1 = require_inversify();
      var Command = class Command {
      };
      Command = __decorate([
        (0, inversify_1.injectable)()
      ], Command);
      exports.Command = Command;
      var MergeableCommand = class MergeableCommand extends Command {
        /**
         * Tries to merge the given command with this.
         *
         * @param command
         * @param context
         */
        merge(command, context) {
          return false;
        }
      };
      MergeableCommand = __decorate([
        (0, inversify_1.injectable)()
      ], MergeableCommand);
      exports.MergeableCommand = MergeableCommand;
      var HiddenCommand = class HiddenCommand extends Command {
        undo(context) {
          context.logger.error(this, "Cannot undo a hidden command");
          return context.root;
        }
        redo(context) {
          context.logger.error(this, "Cannot redo a hidden command");
          return context.root;
        }
      };
      HiddenCommand = __decorate([
        (0, inversify_1.injectable)()
      ], HiddenCommand);
      exports.HiddenCommand = HiddenCommand;
      var PopupCommand = class PopupCommand extends Command {
      };
      PopupCommand = __decorate([
        (0, inversify_1.injectable)()
      ], PopupCommand);
      exports.PopupCommand = PopupCommand;
      var SystemCommand = class SystemCommand extends Command {
      };
      SystemCommand = __decorate([
        (0, inversify_1.injectable)()
      ], SystemCommand);
      exports.SystemCommand = SystemCommand;
      var ResetCommand = class ResetCommand extends Command {
      };
      ResetCommand = __decorate([
        (0, inversify_1.injectable)()
      ], ResetCommand);
      exports.ResetCommand = ResetCommand;
    }
  });

  // node_modules/sprotty/lib/base/commands/command-registration.js
  var require_command_registration = __commonJS({
    "node_modules/sprotty/lib/base/commands/command-registration.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      var __param = exports && exports.__param || function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.configureCommand = exports.CommandActionHandlerInitializer = exports.CommandActionHandler = void 0;
      var inversify_1 = require_inversify();
      var inversify_2 = require_inversify2();
      var types_1 = require_types();
      var CommandActionHandler = class {
        constructor(commandRegistration) {
          this.commandRegistration = commandRegistration;
        }
        handle(action) {
          return this.commandRegistration.factory(action);
        }
      };
      exports.CommandActionHandler = CommandActionHandler;
      var CommandActionHandlerInitializer = class CommandActionHandlerInitializer {
        constructor(registrations) {
          this.registrations = registrations;
        }
        initialize(registry) {
          this.registrations.forEach((registration) => registry.register(registration.kind, new CommandActionHandler(registration)));
        }
      };
      CommandActionHandlerInitializer = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.multiInject)(types_1.TYPES.CommandRegistration)),
        __param(0, (0, inversify_1.optional)()),
        __metadata("design:paramtypes", [Array])
      ], CommandActionHandlerInitializer);
      exports.CommandActionHandlerInitializer = CommandActionHandlerInitializer;
      function configureCommand(context, constr) {
        if (!(0, inversify_2.isInjectable)(constr)) {
          throw new Error(`Commands should be @injectable: ${constr.name}`);
        }
        if (!context.isBound(constr)) {
          context.bind(constr).toSelf();
        }
        context.bind(types_1.TYPES.CommandRegistration).toDynamicValue((ctx) => ({
          kind: constr.KIND,
          factory: (action) => {
            const childContainer = new inversify_1.Container();
            childContainer.parent = ctx.container;
            childContainer.bind(types_1.TYPES.Action).toConstantValue(action);
            return childContainer.get(constr);
          }
        }));
      }
      exports.configureCommand = configureCommand;
    }
  });

  // node_modules/sprotty/lib/base/commands/command-stack-options.js
  var require_command_stack_options = __commonJS({
    "node_modules/sprotty/lib/base/commands/command-stack-options.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.overrideCommandStackOptions = void 0;
      var object_1 = require_object();
      var types_1 = require_types();
      function overrideCommandStackOptions(container, options) {
        const defaultOptions = container.get(types_1.TYPES.CommandStackOptions);
        (0, object_1.safeAssign)(defaultOptions, options);
        return defaultOptions;
      }
      exports.overrideCommandStackOptions = overrideCommandStackOptions;
    }
  });

  // node_modules/sprotty/lib/base/commands/command-stack.js
  var require_command_stack = __commonJS({
    "node_modules/sprotty/lib/base/commands/command-stack.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.CommandStack = void 0;
      var inversify_1 = require_inversify();
      var types_1 = require_types();
      var smodel_factory_1 = require_smodel_factory();
      var smodel_1 = require_smodel();
      var animation_frame_syncer_1 = require_animation_frame_syncer();
      var command_1 = require_command();
      var CommandStack = class CommandStack {
        constructor() {
          this.undoStack = [];
          this.redoStack = [];
          this.offStack = [];
        }
        initialize() {
          this.currentPromise = Promise.resolve({
            main: {
              model: this.modelFactory.createRoot(smodel_factory_1.EMPTY_ROOT),
              modelChanged: false
            },
            hidden: {
              model: this.modelFactory.createRoot(smodel_factory_1.EMPTY_ROOT),
              modelChanged: false
            },
            popup: {
              model: this.modelFactory.createRoot(smodel_factory_1.EMPTY_ROOT),
              modelChanged: false
            }
          });
        }
        get currentModel() {
          return this.currentPromise.then((state) => state.main.model);
        }
        executeAll(commands) {
          commands.forEach((command) => {
            this.logger.log(this, "Executing", command);
            this.handleCommand(command, command.execute, this.mergeOrPush);
          });
          return this.thenUpdate();
        }
        execute(command) {
          this.logger.log(this, "Executing", command);
          this.handleCommand(command, command.execute, this.mergeOrPush);
          return this.thenUpdate();
        }
        undo() {
          this.undoOffStackSystemCommands();
          this.undoPreceedingSystemCommands();
          const command = this.undoStack[this.undoStack.length - 1];
          if (command !== void 0 && !this.isBlockUndo(command)) {
            this.undoStack.pop();
            this.logger.log(this, "Undoing", command);
            this.handleCommand(command, command.undo, (c, context) => {
              this.redoStack.push(c);
            });
          }
          return this.thenUpdate();
        }
        redo() {
          this.undoOffStackSystemCommands();
          const command = this.redoStack.pop();
          if (command !== void 0) {
            this.logger.log(this, "Redoing", command);
            this.handleCommand(command, command.redo, (c, context) => {
              this.pushToUndoStack(c);
            });
          }
          this.redoFollowingSystemCommands();
          return this.thenUpdate();
        }
        /**
         * Chains the current promise with another Promise that performs the
         * given operation on the given command.
         *
         * @param beforeResolve a function that is called directly before
         *      resolving the Promise to return the new model. Usually puts the
         *      command on the appropriate stack.
         */
        handleCommand(command, operation, beforeResolve) {
          this.currentPromise = this.currentPromise.then((state) => new Promise((resolve) => {
            let target;
            if (command instanceof command_1.HiddenCommand)
              target = "hidden";
            else if (command instanceof command_1.PopupCommand)
              target = "popup";
            else
              target = "main";
            const context = this.createContext(state.main.model);
            let commandResult;
            try {
              commandResult = operation.call(command, context);
            } catch (error) {
              this.logger.error(this, "Failed to execute command:", error);
              commandResult = state[target].model;
            }
            const newState = copyState(state);
            if (commandResult instanceof Promise) {
              commandResult.then((newModel) => {
                if (target === "main")
                  beforeResolve.call(this, command, context);
                newState[target] = { model: newModel, modelChanged: true };
                resolve(newState);
              });
            } else if (commandResult instanceof smodel_1.SModelRoot) {
              if (target === "main")
                beforeResolve.call(this, command, context);
              newState[target] = { model: commandResult, modelChanged: true };
              resolve(newState);
            } else {
              if (target === "main")
                beforeResolve.call(this, command, context);
              newState[target] = {
                model: commandResult.model,
                modelChanged: state[target].modelChanged || commandResult.modelChanged,
                cause: commandResult.cause
              };
              resolve(newState);
            }
          }));
        }
        pushToUndoStack(command) {
          this.undoStack.push(command);
          if (this.options.undoHistoryLimit >= 0 && this.undoStack.length > this.options.undoHistoryLimit)
            this.undoStack.splice(0, this.undoStack.length - this.options.undoHistoryLimit);
        }
        /**
         * Notifies the Viewer to render the new model and/or the new hidden model
         * and returns a Promise for the new model.
         */
        thenUpdate() {
          this.currentPromise = this.currentPromise.then((state) => {
            const newState = copyState(state);
            if (state.hidden.modelChanged) {
              this.updateHidden(state.hidden.model, state.hidden.cause);
              newState.hidden.modelChanged = false;
              newState.hidden.cause = void 0;
            }
            if (state.main.modelChanged) {
              this.update(state.main.model, state.main.cause);
              newState.main.modelChanged = false;
              newState.main.cause = void 0;
            }
            if (state.popup.modelChanged) {
              this.updatePopup(state.popup.model, state.popup.cause);
              newState.popup.modelChanged = false;
              newState.popup.cause = void 0;
            }
            return newState;
          });
          return this.currentModel;
        }
        /**
         * Notify the `ModelViewer` that the model has changed.
         */
        update(model, cause) {
          if (this.modelViewer === void 0) {
            this.modelViewer = this.viewerProvider.modelViewer;
          }
          this.modelViewer.update(model, cause);
        }
        /**
         * Notify the `HiddenModelViewer` that the hidden model has changed.
         */
        updateHidden(model, cause) {
          if (this.hiddenModelViewer === void 0) {
            this.hiddenModelViewer = this.viewerProvider.hiddenModelViewer;
          }
          this.hiddenModelViewer.update(model, cause);
        }
        /**
         * Notify the `PopupModelViewer` that the popup model has changed.
         */
        updatePopup(model, cause) {
          if (this.popupModelViewer === void 0) {
            this.popupModelViewer = this.viewerProvider.popupModelViewer;
          }
          this.popupModelViewer.update(model, cause);
        }
        /**
         * Handling of commands after their execution.
         *
         * Hidden commands are not pushed to any stack.
         *
         * System commands are pushed to the <code>offStack</code> when the redo
         * stack is not empty, allowing to undo the before a redo to keep the chain
         * of commands consistent.
         *
         * Mergable commands are merged if possible.
         */
        mergeOrPush(command, context) {
          if (this.isBlockUndo(command)) {
            this.undoStack = [];
            this.redoStack = [];
            this.offStack = [];
            this.pushToUndoStack(command);
            return;
          }
          if (this.isPushToOffStack(command) && this.redoStack.length > 0) {
            if (this.offStack.length > 0) {
              const lastCommand = this.offStack[this.offStack.length - 1];
              if (lastCommand instanceof command_1.MergeableCommand && lastCommand.merge(command, context))
                return;
            }
            this.offStack.push(command);
            return;
          }
          if (this.isPushToUndoStack(command)) {
            this.offStack.forEach((c) => this.undoStack.push(c));
            this.offStack = [];
            this.redoStack = [];
            if (this.undoStack.length > 0) {
              const lastCommand = this.undoStack[this.undoStack.length - 1];
              if (lastCommand instanceof command_1.MergeableCommand && lastCommand.merge(command, context))
                return;
            }
            this.pushToUndoStack(command);
          }
        }
        /**
         * Reverts all system commands on the offStack.
         */
        undoOffStackSystemCommands() {
          let command = this.offStack.pop();
          while (command !== void 0) {
            this.logger.log(this, "Undoing off-stack", command);
            this.handleCommand(command, command.undo, () => {
            });
            command = this.offStack.pop();
          }
        }
        /**
         * System commands should be transparent to the user, so this method
         * is called from <code>undo()</code> to revert all system commands
         * at the top of the undoStack.
         */
        undoPreceedingSystemCommands() {
          let command = this.undoStack[this.undoStack.length - 1];
          while (command !== void 0 && this.isPushToOffStack(command)) {
            this.undoStack.pop();
            this.logger.log(this, "Undoing", command);
            this.handleCommand(command, command.undo, (c, context) => {
              this.redoStack.push(c);
            });
            command = this.undoStack[this.undoStack.length - 1];
          }
        }
        /**
         * System commands should be transparent to the user, so this method
         * is called from <code>redo()</code> to re-execute all system commands
         * at the top of the redoStack.
         */
        redoFollowingSystemCommands() {
          let command = this.redoStack[this.redoStack.length - 1];
          while (command !== void 0 && this.isPushToOffStack(command)) {
            this.redoStack.pop();
            this.logger.log(this, "Redoing ", command);
            this.handleCommand(command, command.redo, (c, context) => {
              this.pushToUndoStack(c);
            });
            command = this.redoStack[this.redoStack.length - 1];
          }
        }
        /**
         * Assembles the context object that is passed to the commands execution method.
         */
        createContext(currentModel) {
          return {
            root: currentModel,
            modelChanged: this,
            modelFactory: this.modelFactory,
            duration: this.options.defaultDuration,
            logger: this.logger,
            syncer: this.syncer
          };
        }
        isPushToOffStack(command) {
          return command instanceof command_1.SystemCommand;
        }
        isPushToUndoStack(command) {
          return !(command instanceof command_1.HiddenCommand);
        }
        isBlockUndo(command) {
          return command instanceof command_1.ResetCommand;
        }
      };
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.IModelFactory),
        __metadata("design:type", Object)
      ], CommandStack.prototype, "modelFactory", void 0);
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.IViewerProvider),
        __metadata("design:type", Object)
      ], CommandStack.prototype, "viewerProvider", void 0);
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.ILogger),
        __metadata("design:type", Object)
      ], CommandStack.prototype, "logger", void 0);
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.AnimationFrameSyncer),
        __metadata("design:type", animation_frame_syncer_1.AnimationFrameSyncer)
      ], CommandStack.prototype, "syncer", void 0);
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.CommandStackOptions),
        __metadata("design:type", Object)
      ], CommandStack.prototype, "options", void 0);
      __decorate([
        (0, inversify_1.postConstruct)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
      ], CommandStack.prototype, "initialize", null);
      CommandStack = __decorate([
        (0, inversify_1.injectable)()
      ], CommandStack);
      exports.CommandStack = CommandStack;
      function copyState(state) {
        return {
          main: Object.assign({}, state.main),
          hidden: Object.assign({}, state.hidden),
          popup: Object.assign({}, state.popup)
        };
      }
    }
  });

  // node_modules/sprotty-protocol/lib/action-handler.js
  var require_action_handler2 = __commonJS({
    "node_modules/sprotty-protocol/lib/action-handler.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ServerActionHandlerRegistry = void 0;
      var ServerActionHandlerRegistry = class {
        constructor() {
          this.handlers = /* @__PURE__ */ new Map();
        }
        /**
         * Returns the action handlers for the given action kind, or `undefined` if there are none.
         */
        getHandler(kind) {
          return this.handlers.get(kind);
        }
        /**
         * Add an action handler to be called when an action of the specified kind is received.
         */
        onAction(kind, handler) {
          if (this.handlers.has(kind)) {
            this.handlers.get(kind).push(handler);
          } else {
            this.handlers.set(kind, [handler]);
          }
        }
        /**
         * Remove an action handler that was previously added with `onAction`.
         */
        removeActionHandler(kind, handler) {
          const list = this.handlers.get(kind);
          if (list) {
            const index = list.indexOf(handler);
            if (index >= 0) {
              list.splice(index, 1);
            }
          }
        }
      };
      exports.ServerActionHandlerRegistry = ServerActionHandlerRegistry;
    }
  });

  // node_modules/sprotty-protocol/lib/utils/model-utils.js
  var require_model_utils = __commonJS({
    "node_modules/sprotty-protocol/lib/utils/model-utils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SModelIndex = exports.findElement = exports.getSubType = exports.getBasicType = exports.applyBounds = exports.cloneModel = void 0;
      function cloneModel(model) {
        return JSON.parse(JSON.stringify(model));
      }
      exports.cloneModel = cloneModel;
      function applyBounds(root, action) {
        const index = new SModelIndex();
        index.add(root);
        for (const b of action.bounds) {
          const element = index.getById(b.elementId);
          if (element) {
            const bae = element;
            if (b.newPosition) {
              bae.position = { x: b.newPosition.x, y: b.newPosition.y };
            }
            if (b.newSize) {
              bae.size = { width: b.newSize.width, height: b.newSize.height };
            }
          }
        }
        if (action.alignments) {
          for (const a of action.alignments) {
            const element = index.getById(a.elementId);
            if (element) {
              const alignable = element;
              alignable.alignment = { x: a.newAlignment.x, y: a.newAlignment.y };
            }
          }
        }
      }
      exports.applyBounds = applyBounds;
      function getBasicType(element) {
        if (!element.type) {
          return "";
        }
        const colonIndex = element.type.indexOf(":");
        return colonIndex >= 0 ? element.type.substring(0, colonIndex) : element.type;
      }
      exports.getBasicType = getBasicType;
      function getSubType(schema) {
        if (!schema.type) {
          return "";
        }
        const colonIndex = schema.type.indexOf(":");
        return colonIndex >= 0 ? schema.type.substring(colonIndex + 1) : schema.type;
      }
      exports.getSubType = getSubType;
      function findElement(parent, elementId) {
        if (parent.id === elementId)
          return parent;
        if (parent.children !== void 0) {
          for (const child of parent.children) {
            const result = findElement(child, elementId);
            if (result !== void 0)
              return result;
          }
        }
        return void 0;
      }
      exports.findElement = findElement;
      var SModelIndex = class {
        constructor() {
          this.id2element = /* @__PURE__ */ new Map();
          this.id2parent = /* @__PURE__ */ new Map();
        }
        add(element) {
          if (!element.id) {
            throw new Error("Model element has no ID.");
          } else if (this.contains(element)) {
            throw new Error("Duplicate ID in model: " + element.id);
          }
          this.id2element.set(element.id, element);
          if (Array.isArray(element.children)) {
            for (const child of element.children) {
              this.add(child);
              this.id2parent.set(child.id, element);
            }
          }
        }
        remove(element) {
          this.id2element.delete(element.id);
          if (Array.isArray(element.children)) {
            for (const child of element.children) {
              this.id2parent.delete(child.id);
              this.remove(child);
            }
          }
        }
        contains(element) {
          return this.id2element.has(element.id);
        }
        getById(id) {
          return this.id2element.get(id);
        }
        getParent(id) {
          return this.id2parent.get(id);
        }
        getRoot(element) {
          let current = element;
          while (current) {
            const parent = this.id2parent.get(current.id);
            if (parent === void 0) {
              return current;
            }
            current = parent;
          }
          throw new Error("Element has no root");
        }
      };
      exports.SModelIndex = SModelIndex;
    }
  });

  // node_modules/sprotty-protocol/lib/diagram-server.js
  var require_diagram_server = __commonJS({
    "node_modules/sprotty-protocol/lib/diagram-server.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.DiagramServer = void 0;
      var action_handler_1 = require_action_handler2();
      var actions_1 = require_actions();
      var async_1 = require_async();
      var model_utils_1 = require_model_utils();
      var DiagramServer = class {
        constructor(dispatch, services) {
          this.state = {
            currentRoot: {
              type: "NONE",
              id: "ROOT"
            },
            revision: 0
          };
          this.requests = /* @__PURE__ */ new Map();
          this.dispatch = dispatch;
          this.diagramGenerator = services.DiagramGenerator;
          this.layoutEngine = services.ModelLayoutEngine;
          this.actionHandlerRegistry = services.ServerActionHandlerRegistry;
        }
        /**
         * @deprecated Use the `ServerActionHandlerRegistry` service instead
         */
        onAction(kind, handler) {
          if (!this.actionHandlerRegistry) {
            this.actionHandlerRegistry = new action_handler_1.ServerActionHandlerRegistry();
          }
          this.actionHandlerRegistry.onAction(kind, handler);
        }
        /**
         * @deprecated Use the `ServerActionHandlerRegistry` service instead
         */
        removeActionHandler(kind, handler) {
          if (this.actionHandlerRegistry) {
            this.actionHandlerRegistry.removeActionHandler(kind, handler);
          }
        }
        /**
         * Set the model and submit it to the client.
         */
        setModel(newRoot) {
          newRoot.revision = ++this.state.revision;
          this.state.currentRoot = newRoot;
          return this.submitModel(newRoot, false);
        }
        /**
         * Update the model to a new state and submit it to the client.
         */
        updateModel(newRoot) {
          newRoot.revision = ++this.state.revision;
          this.state.currentRoot = newRoot;
          return this.submitModel(newRoot, true);
        }
        /**
         * Whether the client needs to compute the layout of parts of the model. This affects the behavior
         * of `submitModel`.
         *
         * This setting is determined by the `DiagramOptions` that are received with the `RequestModelAction`
         * from the client. If the client does not specify whether it needs client layout, the default value
         * is `true`.
         */
        get needsClientLayout() {
          if (this.state.options && this.state.options.needsClientLayout !== void 0) {
            return !!this.state.options.needsClientLayout;
          }
          return true;
        }
        /**
         * Whether the server needs to compute the layout of parts of the model. This affects the behavior
         * of `submitModel`.
         *
         * This setting is determined by the `DiagramOptions` that are received with the `RequestModelAction`
         * from the client. If the client does not specify whether it needs server layout, the default value
         * is `false`.
         */
        get needsServerLayout() {
          if (this.state.options && this.state.options.needsServerLayout !== void 0) {
            return !!this.state.options.needsServerLayout;
          }
          return false;
        }
        /**
         * Called when an action is received from the client.
         */
        accept(action) {
          if ((0, actions_1.isResponseAction)(action)) {
            const id = action.responseId;
            const future = this.requests.get(id);
            if (future) {
              this.requests.delete(id);
              if (action.kind === actions_1.RejectAction.KIND) {
                const rejectAction = action;
                future.reject(new Error(rejectAction.message));
                console.warn(`Request with id ${action.responseId} failed: ${rejectAction.message}`, rejectAction.detail);
              } else {
                future.resolve(action);
              }
              return Promise.resolve();
            }
            console.info("No matching request for response:", action);
          }
          return this.handleAction(action);
        }
        /**
         * Send a request action to the client. The resulting promise is resolved when a matching
         * response is received and rejected when a `RejectAction` is received.
         */
        request(action) {
          if (!action.requestId) {
            action.requestId = "server_" + (0, actions_1.generateRequestId)();
          }
          const future = new async_1.Deferred();
          this.requests.set(action.requestId, future);
          this.dispatch(action).catch((err) => {
            this.requests.delete(action.requestId);
            future.reject(err);
          });
          return future.promise;
        }
        /**
         * Send a `RejectAction` to the client to notify that a request could not be fulfilled.
         */
        rejectRemoteRequest(action, error) {
          if (action && (0, actions_1.isRequestAction)(action)) {
            this.dispatch({
              kind: actions_1.RejectAction.KIND,
              responseId: action.requestId,
              message: error.message,
              detail: error.stack
            });
          }
        }
        handleAction(action) {
          var _a;
          const handlers = (_a = this.actionHandlerRegistry) === null || _a === void 0 ? void 0 : _a.getHandler(action.kind);
          if (handlers && handlers.length === 1) {
            return handlers[0](action, this.state, this);
          } else if (handlers && handlers.length > 1) {
            return Promise.all(handlers.map((h) => h(action, this.state, this)));
          }
          switch (action.kind) {
            case actions_1.RequestModelAction.KIND:
              return this.handleRequestModel(action);
            case actions_1.ComputedBoundsAction.KIND:
              return this.handleComputedBounds(action);
            case actions_1.LayoutAction.KIND:
              return this.handleLayout(action);
          }
          console.warn(`Unhandled action from client: ${action.kind}`);
          return Promise.resolve();
        }
        async handleRequestModel(action) {
          var _a;
          this.state.options = action.options;
          try {
            const newRoot = await this.diagramGenerator.generate({
              options: (_a = this.state.options) !== null && _a !== void 0 ? _a : {},
              state: this.state
            });
            newRoot.revision = ++this.state.revision;
            this.state.currentRoot = newRoot;
            await this.submitModel(this.state.currentRoot, false, action);
          } catch (err) {
            this.rejectRemoteRequest(action, err);
            console.error("Failed to generate diagram:", err);
          }
        }
        /**
         * Submit a model to the client after it has been updated in the server state.
         */
        async submitModel(newRoot, update, cause) {
          if (this.needsClientLayout) {
            if (!this.needsServerLayout) {
              this.dispatch({ kind: actions_1.RequestBoundsAction.KIND, newRoot });
            } else {
              const request = actions_1.RequestBoundsAction.create(newRoot);
              const response = await this.request(request);
              const currentRoot = this.state.currentRoot;
              if (response.revision === currentRoot.revision) {
                (0, model_utils_1.applyBounds)(currentRoot, response);
                await this.doSubmitModel(currentRoot, update, cause);
              } else {
                this.rejectRemoteRequest(cause, new Error(`Model revision does not match: ${response.revision}`));
              }
            }
          } else {
            await this.doSubmitModel(newRoot, update, cause);
          }
        }
        async doSubmitModel(newRoot, update, cause) {
          if (newRoot.revision !== this.state.revision) {
            return;
          }
          if (this.needsServerLayout && this.layoutEngine) {
            newRoot = await this.layoutEngine.layout(newRoot);
          }
          const modelType = newRoot.type;
          if (cause && cause.kind === actions_1.RequestModelAction.KIND) {
            const requestId = cause.requestId;
            const response = actions_1.SetModelAction.create(newRoot, requestId);
            await this.dispatch(response);
          } else if (update && modelType === this.state.lastSubmittedModelType) {
            await this.dispatch({ kind: actions_1.UpdateModelAction.KIND, newRoot, cause });
          } else {
            await this.dispatch({ kind: actions_1.SetModelAction.KIND, newRoot });
          }
          this.state.lastSubmittedModelType = modelType;
        }
        handleComputedBounds(action) {
          if (action.revision !== this.state.currentRoot.revision) {
            return Promise.reject();
          }
          (0, model_utils_1.applyBounds)(this.state.currentRoot, action);
          return Promise.resolve();
        }
        async handleLayout(action) {
          if (!this.layoutEngine) {
            return;
          }
          if (!this.needsServerLayout) {
            let newRoot = (0, model_utils_1.cloneModel)(this.state.currentRoot);
            newRoot = await this.layoutEngine.layout(newRoot);
            newRoot.revision = ++this.state.revision;
            this.state.currentRoot = newRoot;
          }
          await this.doSubmitModel(this.state.currentRoot, true, action);
        }
      };
      exports.DiagramServer = DiagramServer;
    }
  });

  // node_modules/sprotty-protocol/lib/diagram-services.js
  var require_diagram_services = __commonJS({
    "node_modules/sprotty-protocol/lib/diagram-services.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/sprotty-protocol/lib/model.js
  var require_model = __commonJS({
    "node_modules/sprotty-protocol/lib/model.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isZoomable = exports.isScrollable = void 0;
      var object_1 = require_object();
      function isScrollable(element) {
        return (0, object_1.hasOwnProperty)(element, "scroll");
      }
      exports.isScrollable = isScrollable;
      function isZoomable(element) {
        return (0, object_1.hasOwnProperty)(element, "zoom");
      }
      exports.isZoomable = isZoomable;
    }
  });

  // node_modules/sprotty-protocol/lib/utils/json.js
  var require_json = __commonJS({
    "node_modules/sprotty-protocol/lib/utils/json.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/sprotty-protocol/lib/index.js
  var require_lib = __commonJS({
    "node_modules/sprotty-protocol/lib/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_actions(), exports);
      __exportStar(require_diagram_server(), exports);
      __exportStar(require_diagram_services(), exports);
      __exportStar(require_model(), exports);
      __exportStar(require_async(), exports);
      __exportStar(require_geometry(), exports);
      __exportStar(require_json(), exports);
      __exportStar(require_model_utils(), exports);
      __exportStar(require_object(), exports);
    }
  });

  // node_modules/sprotty/lib/utils/browser.js
  var require_browser = __commonJS({
    "node_modules/sprotty/lib/utils/browser.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.hitsMouseEvent = exports.getWindowScroll = exports.isCrossSite = exports.isMac = exports.isCtrlOrCmd = void 0;
      var sprotty_protocol_1 = require_lib();
      function isCtrlOrCmd(event) {
        if (isMac())
          return event.metaKey;
        else
          return event.ctrlKey;
      }
      exports.isCtrlOrCmd = isCtrlOrCmd;
      function isMac() {
        return window.navigator.userAgent.indexOf("Mac") !== -1;
      }
      exports.isMac = isMac;
      function isCrossSite(url) {
        if (url && typeof window !== "undefined" && window.location) {
          let baseURL = "";
          if (window.location.protocol)
            baseURL += window.location.protocol + "//";
          if (window.location.host)
            baseURL += window.location.host;
          return baseURL.length > 0 && !url.startsWith(baseURL);
        }
        return false;
      }
      exports.isCrossSite = isCrossSite;
      function getWindowScroll() {
        if (typeof window === "undefined") {
          return sprotty_protocol_1.Point.ORIGIN;
        }
        return {
          x: window.pageXOffset,
          y: window.pageYOffset
        };
      }
      exports.getWindowScroll = getWindowScroll;
      function hitsMouseEvent(child, event) {
        const clientRect = child.getBoundingClientRect();
        return event.clientX >= clientRect.left && event.clientX <= clientRect.right && event.clientY >= clientRect.top && event.clientY <= clientRect.bottom;
      }
      exports.hitsMouseEvent = hitsMouseEvent;
    }
  });

  // node_modules/sprotty/lib/base/features/initialize-canvas.js
  var require_initialize_canvas = __commonJS({
    "node_modules/sprotty/lib/base/features/initialize-canvas.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      var __param = exports && exports.__param || function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.InitializeCanvasBoundsCommand = exports.InitializeCanvasBoundsAction = exports.CanvasBoundsInitializer = void 0;
      var inversify_1 = require_inversify();
      var geometry_1 = require_geometry();
      var types_1 = require_types();
      var smodel_1 = require_smodel();
      var command_1 = require_command();
      var browser_1 = require_browser();
      var CanvasBoundsInitializer = class CanvasBoundsInitializer {
        decorate(vnode, element) {
          if (element instanceof smodel_1.SModelRoot && !geometry_1.Dimension.isValid(element.canvasBounds)) {
            this.rootAndVnode = [element, vnode];
          }
          return vnode;
        }
        postUpdate() {
          if (this.rootAndVnode !== void 0) {
            const domElement = this.rootAndVnode[1].elm;
            const oldBounds = this.rootAndVnode[0].canvasBounds;
            if (domElement !== void 0) {
              const newBounds = this.getBoundsInPage(domElement);
              if (!((0, geometry_1.almostEquals)(newBounds.x, oldBounds.x) && (0, geometry_1.almostEquals)(newBounds.y, oldBounds.y) && (0, geometry_1.almostEquals)(newBounds.width, oldBounds.width) && (0, geometry_1.almostEquals)(newBounds.height, oldBounds.width)))
                this.actionDispatcher.dispatch(InitializeCanvasBoundsAction.create(newBounds));
            }
            this.rootAndVnode = void 0;
          }
        }
        getBoundsInPage(element) {
          const bounds = element.getBoundingClientRect();
          const scroll = (0, browser_1.getWindowScroll)();
          return {
            x: bounds.left + scroll.x,
            y: bounds.top + scroll.y,
            width: bounds.width,
            height: bounds.height
          };
        }
      };
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.IActionDispatcher),
        __metadata("design:type", Object)
      ], CanvasBoundsInitializer.prototype, "actionDispatcher", void 0);
      CanvasBoundsInitializer = __decorate([
        (0, inversify_1.injectable)()
      ], CanvasBoundsInitializer);
      exports.CanvasBoundsInitializer = CanvasBoundsInitializer;
      var InitializeCanvasBoundsAction;
      (function(InitializeCanvasBoundsAction2) {
        InitializeCanvasBoundsAction2.KIND = "initializeCanvasBounds";
        function create(newCanvasBounds) {
          return {
            kind: InitializeCanvasBoundsAction2.KIND,
            newCanvasBounds
          };
        }
        InitializeCanvasBoundsAction2.create = create;
      })(InitializeCanvasBoundsAction = exports.InitializeCanvasBoundsAction || (exports.InitializeCanvasBoundsAction = {}));
      var InitializeCanvasBoundsCommand = class InitializeCanvasBoundsCommand extends command_1.SystemCommand {
        constructor(action) {
          super();
          this.action = action;
        }
        execute(context) {
          this.newCanvasBounds = this.action.newCanvasBounds;
          context.root.canvasBounds = this.newCanvasBounds;
          return context.root;
        }
        undo(context) {
          return context.root;
        }
        redo(context) {
          return context.root;
        }
      };
      InitializeCanvasBoundsCommand.KIND = InitializeCanvasBoundsAction.KIND;
      InitializeCanvasBoundsCommand = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(types_1.TYPES.Action)),
        __metadata("design:paramtypes", [Object])
      ], InitializeCanvasBoundsCommand);
      exports.InitializeCanvasBoundsCommand = InitializeCanvasBoundsCommand;
    }
  });

  // node_modules/sprotty/lib/base/features/set-model.js
  var require_set_model = __commonJS({
    "node_modules/sprotty/lib/base/features/set-model.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      var __param = exports && exports.__param || function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SetModelCommand = exports.SetModelAction = exports.RequestModelAction = void 0;
      var inversify_1 = require_inversify();
      var actions_1 = require_actions();
      var command_1 = require_command();
      var types_1 = require_types();
      var initialize_canvas_1 = require_initialize_canvas();
      var RequestModelAction = class {
        constructor(options, requestId = "") {
          this.options = options;
          this.requestId = requestId;
          this.kind = RequestModelAction.KIND;
        }
        /** Factory function to dispatch a request with the `IActionDispatcher` */
        static create(options) {
          return new RequestModelAction(options, (0, actions_1.generateRequestId)());
        }
      };
      exports.RequestModelAction = RequestModelAction;
      RequestModelAction.KIND = "requestModel";
      var SetModelAction = class {
        constructor(newRoot, responseId = "") {
          this.newRoot = newRoot;
          this.responseId = responseId;
          this.kind = SetModelAction.KIND;
        }
      };
      exports.SetModelAction = SetModelAction;
      SetModelAction.KIND = "setModel";
      var SetModelCommand = class SetModelCommand extends command_1.ResetCommand {
        constructor(action) {
          super();
          this.action = action;
        }
        execute(context) {
          this.oldRoot = context.modelFactory.createRoot(context.root);
          this.newRoot = context.modelFactory.createRoot(this.action.newRoot);
          return this.newRoot;
        }
        undo(context) {
          return this.oldRoot;
        }
        redo(context) {
          return this.newRoot;
        }
        get blockUntil() {
          return (action) => action.kind === initialize_canvas_1.InitializeCanvasBoundsCommand.KIND;
        }
      };
      SetModelCommand.KIND = actions_1.SetModelAction.KIND;
      SetModelCommand = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(types_1.TYPES.Action)),
        __metadata("design:paramtypes", [Object])
      ], SetModelCommand);
      exports.SetModelCommand = SetModelCommand;
    }
  });

  // node_modules/sprotty/lib/base/model/smodel-extension.js
  var require_smodel_extension = __commonJS({
    "node_modules/sprotty/lib/base/model/smodel-extension.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/sprotty/lib/base/model/smodel-utils.js
  var require_smodel_utils = __commonJS({
    "node_modules/sprotty/lib/base/model/smodel-utils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.transformToRootBounds = exports.containsSome = exports.translateBounds = exports.translatePoint = exports.findParentByFeature = exports.findParent = exports.findElement = exports.getSubType = exports.getBasicType = exports.registerModelElement = void 0;
      var types_1 = require_types();
      var smodel_1 = require_smodel();
      function registerModelElement(context, type, constr, features) {
        context.bind(types_1.TYPES.SModelElementRegistration).toConstantValue({
          type,
          constr,
          features
        });
      }
      exports.registerModelElement = registerModelElement;
      function getBasicType(schema) {
        if (!schema.type)
          return "";
        const colonIndex = schema.type.indexOf(":");
        if (colonIndex >= 0)
          return schema.type.substring(0, colonIndex);
        else
          return schema.type;
      }
      exports.getBasicType = getBasicType;
      function getSubType(schema) {
        if (!schema.type)
          return "";
        const colonIndex = schema.type.indexOf(":");
        if (colonIndex >= 0)
          return schema.type.substring(colonIndex + 1);
        else
          return schema.type;
      }
      exports.getSubType = getSubType;
      function findElement(parent, elementId) {
        if (parent.id === elementId)
          return parent;
        if (parent.children !== void 0) {
          for (const child of parent.children) {
            const result = findElement(child, elementId);
            if (result !== void 0)
              return result;
          }
        }
        return void 0;
      }
      exports.findElement = findElement;
      function findParent(element, predicate) {
        let current = element;
        while (current !== void 0) {
          if (predicate(current))
            return current;
          else if (current instanceof smodel_1.SChildElement)
            current = current.parent;
          else
            current = void 0;
        }
        return current;
      }
      exports.findParent = findParent;
      function findParentByFeature(element, predicate) {
        let current = element;
        while (current !== void 0) {
          if (predicate(current))
            return current;
          else if (current instanceof smodel_1.SChildElement)
            current = current.parent;
          else
            current = void 0;
        }
        return current;
      }
      exports.findParentByFeature = findParentByFeature;
      function translatePoint(point, source, target) {
        if (source !== target) {
          while (source instanceof smodel_1.SChildElement) {
            point = source.localToParent(point);
            source = source.parent;
            if (source === target)
              return point;
          }
          const targetTrace = [];
          while (target instanceof smodel_1.SChildElement) {
            targetTrace.push(target);
            target = target.parent;
          }
          if (source !== target)
            throw new Error("Incompatible source and target: " + source.id + ", " + target.id);
          for (let i = targetTrace.length - 1; i >= 0; i--) {
            point = targetTrace[i].parentToLocal(point);
          }
        }
        return point;
      }
      exports.translatePoint = translatePoint;
      function translateBounds(bounds, source, target) {
        const upperLeft = translatePoint(bounds, source, target);
        const lowerRight = translatePoint({ x: bounds.x + bounds.width, y: bounds.y + bounds.height }, source, target);
        return {
          x: upperLeft.x,
          y: upperLeft.y,
          width: lowerRight.x - upperLeft.x,
          height: lowerRight.y - upperLeft.y
        };
      }
      exports.translateBounds = translateBounds;
      function containsSome(root, element) {
        const test = (el) => root.index.getById(el.id) !== void 0;
        const find = (elements) => elements.some((el) => test(el) || find(el.children));
        return find([element]);
      }
      exports.containsSome = containsSome;
      function transformToRootBounds(parent, bounds) {
        while (parent instanceof smodel_1.SChildElement) {
          bounds = parent.localToParent(bounds);
          parent = parent.parent;
        }
        return bounds;
      }
      exports.transformToRootBounds = transformToRootBounds;
    }
  });

  // node_modules/sprotty/lib/base/tool-manager/tool.js
  var require_tool = __commonJS({
    "node_modules/sprotty/lib/base/tool-manager/tool.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.EnableDefaultToolsAction = exports.EnableToolsAction = void 0;
      var EnableToolsAction;
      (function(EnableToolsAction2) {
        EnableToolsAction2.KIND = "enable-tools";
        function create(toolIds) {
          return {
            kind: EnableToolsAction2.KIND,
            toolIds
          };
        }
        EnableToolsAction2.create = create;
      })(EnableToolsAction = exports.EnableToolsAction || (exports.EnableToolsAction = {}));
      var EnableDefaultToolsAction;
      (function(EnableDefaultToolsAction2) {
        EnableDefaultToolsAction2.KIND = "enable-default-tools";
        function create() {
          return {
            kind: EnableDefaultToolsAction2.KIND
          };
        }
        EnableDefaultToolsAction2.create = create;
      })(EnableDefaultToolsAction = exports.EnableDefaultToolsAction || (exports.EnableDefaultToolsAction = {}));
    }
  });

  // node_modules/sprotty/lib/base/views/vnode-utils.js
  var require_vnode_utils = __commonJS({
    "node_modules/sprotty/lib/base/views/vnode-utils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getAttrs = exports.on = exports.mergeStyle = exports.copyClassesFromElement = exports.copyClassesFromVNode = exports.setNamespace = exports.setClass = exports.setAttr = void 0;
      function setAttr(vnode, name, value) {
        getAttrs(vnode)[name] = value;
      }
      exports.setAttr = setAttr;
      function setClass(vnode, name, value) {
        getClass(vnode)[name] = value;
      }
      exports.setClass = setClass;
      function setNamespace(node, ns) {
        if (node.data === void 0)
          node.data = {};
        node.data.ns = ns;
        const children = node.children;
        if (children !== void 0) {
          for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (typeof child !== "string")
              setNamespace(child, ns);
          }
        }
      }
      exports.setNamespace = setNamespace;
      function copyClassesFromVNode(source, target) {
        const classList = getClass(source);
        Object.keys(classList).forEach((c) => setClass(target, c, true));
      }
      exports.copyClassesFromVNode = copyClassesFromVNode;
      function copyClassesFromElement(element, target) {
        const classList = element.classList;
        for (let i = 0; i < classList.length; i++) {
          const item = classList.item(i);
          if (item)
            setClass(target, item, true);
        }
      }
      exports.copyClassesFromElement = copyClassesFromElement;
      function mergeStyle(vnode, style) {
        getData(vnode).style = Object.assign(Object.assign({}, getData(vnode).style || {}), style);
      }
      exports.mergeStyle = mergeStyle;
      function on(vnode, event, listener) {
        const val = getOn(vnode);
        if (val[event]) {
          throw new Error("EventListener for " + event + " already registered on VNode");
        }
        val[event] = listener;
      }
      exports.on = on;
      function getAttrs(vnode) {
        const data = getData(vnode);
        if (!data.attrs)
          data.attrs = {};
        return data.attrs;
      }
      exports.getAttrs = getAttrs;
      function getData(vnode) {
        if (!vnode.data)
          vnode.data = {};
        return vnode.data;
      }
      function getClass(vnode) {
        const data = getData(vnode);
        if (!data.class)
          data.class = {};
        return data.class;
      }
      function getOn(vnode) {
        const data = getData(vnode);
        if (!data.on)
          data.on = {};
        return data.on;
      }
    }
  });

  // node_modules/sprotty/lib/base/views/key-tool.js
  var require_key_tool = __commonJS({
    "node_modules/sprotty/lib/base/views/key-tool.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      var __param = exports && exports.__param || function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.KeyListener = exports.KeyTool = void 0;
      var inversify_1 = require_inversify();
      var types_1 = require_types();
      var smodel_1 = require_smodel();
      var vnode_utils_1 = require_vnode_utils();
      var KeyTool = class KeyTool {
        constructor(keyListeners = []) {
          this.keyListeners = keyListeners;
        }
        register(keyListener) {
          this.keyListeners.push(keyListener);
        }
        deregister(keyListener) {
          const index = this.keyListeners.indexOf(keyListener);
          if (index >= 0)
            this.keyListeners.splice(index, 1);
        }
        handleEvent(methodName, model, event) {
          const actions = this.keyListeners.map((listener) => listener[methodName].apply(listener, [model, event])).reduce((a, b) => a.concat(b));
          if (actions.length > 0) {
            event.preventDefault();
            this.actionDispatcher.dispatchAll(actions);
          }
        }
        keyDown(element, event) {
          this.handleEvent("keyDown", element, event);
        }
        keyUp(element, event) {
          this.handleEvent("keyUp", element, event);
        }
        focus() {
        }
        decorate(vnode, element) {
          if (element instanceof smodel_1.SModelRoot) {
            (0, vnode_utils_1.on)(vnode, "focus", this.focus.bind(this, element));
            (0, vnode_utils_1.on)(vnode, "keydown", this.keyDown.bind(this, element));
            (0, vnode_utils_1.on)(vnode, "keyup", this.keyUp.bind(this, element));
          }
          return vnode;
        }
        postUpdate() {
        }
      };
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.IActionDispatcher),
        __metadata("design:type", Object)
      ], KeyTool.prototype, "actionDispatcher", void 0);
      KeyTool = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.multiInject)(types_1.TYPES.KeyListener)),
        __param(0, (0, inversify_1.optional)()),
        __metadata("design:paramtypes", [Array])
      ], KeyTool);
      exports.KeyTool = KeyTool;
      var KeyListener = class KeyListener {
        keyDown(element, event) {
          return [];
        }
        keyUp(element, event) {
          return [];
        }
      };
      KeyListener = __decorate([
        (0, inversify_1.injectable)()
      ], KeyListener);
      exports.KeyListener = KeyListener;
    }
  });

  // node_modules/sprotty/lib/utils/keyboard.js
  var require_keyboard = __commonJS({
    "node_modules/sprotty/lib/utils/keyboard.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getActualCode = exports.matchesKeystroke = void 0;
      var browser_1 = require_browser();
      function matchesKeystroke(event, code, ...modifiers) {
        if (getActualCode(event) !== code)
          return false;
        if ((0, browser_1.isMac)()) {
          if (event.ctrlKey !== modifiers.findIndex((m) => m === "ctrl") >= 0)
            return false;
          if (event.metaKey !== modifiers.findIndex((m) => m === "meta" || m === "ctrlCmd") >= 0)
            return false;
        } else {
          if (event.ctrlKey !== modifiers.findIndex((m) => m === "ctrl" || m === "ctrlCmd") >= 0)
            return false;
          if (event.metaKey !== modifiers.findIndex((m) => m === "meta") >= 0)
            return false;
        }
        if (event.altKey !== modifiers.findIndex((m) => m === "alt") >= 0)
          return false;
        if (event.shiftKey !== modifiers.findIndex((m) => m === "shift") >= 0)
          return false;
        return true;
      }
      exports.matchesKeystroke = matchesKeystroke;
      function getActualCode(event) {
        if (event.keyCode) {
          const result = STRING_CODE[event.keyCode];
          if (result !== void 0)
            return result;
        }
        return event.code;
      }
      exports.getActualCode = getActualCode;
      var STRING_CODE = new Array(256);
      (() => {
        function addKeyCode(stringCode, numericCode) {
          if (STRING_CODE[numericCode] === void 0)
            STRING_CODE[numericCode] = stringCode;
        }
        addKeyCode("Pause", 3);
        addKeyCode("Backspace", 8);
        addKeyCode("Tab", 9);
        addKeyCode("Enter", 13);
        addKeyCode("ShiftLeft", 16);
        addKeyCode("ShiftRight", 16);
        addKeyCode("ControlLeft", 17);
        addKeyCode("ControlRight", 17);
        addKeyCode("AltLeft", 18);
        addKeyCode("AltRight", 18);
        addKeyCode("CapsLock", 20);
        addKeyCode("Escape", 27);
        addKeyCode("Space", 32);
        addKeyCode("PageUp", 33);
        addKeyCode("PageDown", 34);
        addKeyCode("End", 35);
        addKeyCode("Home", 36);
        addKeyCode("ArrowLeft", 37);
        addKeyCode("ArrowUp", 38);
        addKeyCode("ArrowRight", 39);
        addKeyCode("ArrowDown", 40);
        addKeyCode("Insert", 45);
        addKeyCode("Delete", 46);
        addKeyCode("Digit1", 49);
        addKeyCode("Digit2", 50);
        addKeyCode("Digit3", 51);
        addKeyCode("Digit4", 52);
        addKeyCode("Digit5", 53);
        addKeyCode("Digit6", 54);
        addKeyCode("Digit7", 55);
        addKeyCode("Digit8", 56);
        addKeyCode("Digit9", 57);
        addKeyCode("Digit0", 48);
        addKeyCode("KeyA", 65);
        addKeyCode("KeyB", 66);
        addKeyCode("KeyC", 67);
        addKeyCode("KeyD", 68);
        addKeyCode("KeyE", 69);
        addKeyCode("KeyF", 70);
        addKeyCode("KeyG", 71);
        addKeyCode("KeyH", 72);
        addKeyCode("KeyI", 73);
        addKeyCode("KeyJ", 74);
        addKeyCode("KeyK", 75);
        addKeyCode("KeyL", 76);
        addKeyCode("KeyM", 77);
        addKeyCode("KeyN", 78);
        addKeyCode("KeyO", 79);
        addKeyCode("KeyP", 80);
        addKeyCode("KeyQ", 81);
        addKeyCode("KeyR", 82);
        addKeyCode("KeyS", 83);
        addKeyCode("KeyT", 84);
        addKeyCode("KeyU", 85);
        addKeyCode("KeyV", 86);
        addKeyCode("KeyW", 87);
        addKeyCode("KeyX", 88);
        addKeyCode("KeyY", 89);
        addKeyCode("KeyZ", 90);
        addKeyCode("OSLeft", 91);
        addKeyCode("MetaLeft", 91);
        addKeyCode("OSRight", 92);
        addKeyCode("MetaRight", 92);
        addKeyCode("ContextMenu", 93);
        addKeyCode("Numpad0", 96);
        addKeyCode("Numpad1", 97);
        addKeyCode("Numpad2", 98);
        addKeyCode("Numpad3", 99);
        addKeyCode("Numpad4", 100);
        addKeyCode("Numpad5", 101);
        addKeyCode("Numpad6", 102);
        addKeyCode("Numpad7", 103);
        addKeyCode("Numpad8", 104);
        addKeyCode("Numpad9", 105);
        addKeyCode("NumpadMultiply", 106);
        addKeyCode("NumpadAdd", 107);
        addKeyCode("NumpadSeparator", 108);
        addKeyCode("NumpadSubtract", 109);
        addKeyCode("NumpadDecimal", 110);
        addKeyCode("NumpadDivide", 111);
        addKeyCode("F1", 112);
        addKeyCode("F2", 113);
        addKeyCode("F3", 114);
        addKeyCode("F4", 115);
        addKeyCode("F5", 116);
        addKeyCode("F6", 117);
        addKeyCode("F7", 118);
        addKeyCode("F8", 119);
        addKeyCode("F9", 120);
        addKeyCode("F10", 121);
        addKeyCode("F11", 122);
        addKeyCode("F12", 123);
        addKeyCode("F13", 124);
        addKeyCode("F14", 125);
        addKeyCode("F15", 126);
        addKeyCode("F16", 127);
        addKeyCode("F17", 128);
        addKeyCode("F18", 129);
        addKeyCode("F19", 130);
        addKeyCode("F20", 131);
        addKeyCode("F21", 132);
        addKeyCode("F22", 133);
        addKeyCode("F23", 134);
        addKeyCode("F24", 135);
        addKeyCode("NumLock", 144);
        addKeyCode("ScrollLock", 145);
        addKeyCode("Semicolon", 186);
        addKeyCode("Equal", 187);
        addKeyCode("Comma", 188);
        addKeyCode("Minus", 189);
        addKeyCode("Period", 190);
        addKeyCode("Slash", 191);
        addKeyCode("Backquote", 192);
        addKeyCode("IntlRo", 193);
        addKeyCode("BracketLeft", 219);
        addKeyCode("Backslash", 220);
        addKeyCode("BracketRight", 221);
        addKeyCode("Quote", 222);
        addKeyCode("IntlYen", 255);
      })();
    }
  });

  // node_modules/sprotty/lib/base/tool-manager/tool-manager.js
  var require_tool_manager = __commonJS({
    "node_modules/sprotty/lib/base/tool-manager/tool-manager.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.DefaultToolsEnablingKeyListener = exports.ToolManagerActionHandler = exports.ToolManager = void 0;
      var inversify_1 = require_inversify();
      var types_1 = require_types();
      var tool_1 = require_tool();
      var key_tool_1 = require_key_tool();
      var keyboard_1 = require_keyboard();
      var ToolManager = class ToolManager {
        constructor() {
          this.tools = [];
          this.defaultTools = [];
          this.actives = [];
        }
        get managedTools() {
          return this.defaultTools.concat(this.tools);
        }
        get activeTools() {
          return this.actives;
        }
        disableActiveTools() {
          this.actives.forEach((tool) => tool.disable());
          this.actives.splice(0, this.actives.length);
        }
        enableDefaultTools() {
          this.enable(this.defaultTools.map((tool) => tool.id));
        }
        enable(toolIds) {
          this.disableActiveTools();
          const tools = toolIds.map((id) => this.tool(id));
          tools.forEach((tool) => {
            if (tool !== void 0) {
              tool.enable();
              this.actives.push(tool);
            }
          });
        }
        tool(toolId) {
          return this.managedTools.find((tool) => tool.id === toolId);
        }
        registerDefaultTools(...tools) {
          for (const tool of tools) {
            this.defaultTools.push(tool);
          }
        }
        registerTools(...tools) {
          for (const tool of tools) {
            this.tools.push(tool);
          }
        }
      };
      ToolManager = __decorate([
        (0, inversify_1.injectable)()
      ], ToolManager);
      exports.ToolManager = ToolManager;
      var ToolManagerActionHandler = class ToolManagerActionHandler {
        handle(action) {
          switch (action.kind) {
            case tool_1.EnableDefaultToolsAction.KIND:
              this.toolManager.enableDefaultTools();
              break;
            case tool_1.EnableToolsAction.KIND:
              this.toolManager.enable(action.toolIds);
              break;
          }
        }
      };
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.IToolManager),
        __metadata("design:type", Object)
      ], ToolManagerActionHandler.prototype, "toolManager", void 0);
      ToolManagerActionHandler = __decorate([
        (0, inversify_1.injectable)()
      ], ToolManagerActionHandler);
      exports.ToolManagerActionHandler = ToolManagerActionHandler;
      var DefaultToolsEnablingKeyListener = class DefaultToolsEnablingKeyListener extends key_tool_1.KeyListener {
        keyDown(element, event) {
          if ((0, keyboard_1.matchesKeystroke)(event, "Escape")) {
            return [tool_1.EnableDefaultToolsAction.create()];
          }
          return [];
        }
      };
      DefaultToolsEnablingKeyListener = __decorate([
        (0, inversify_1.injectable)()
      ], DefaultToolsEnablingKeyListener);
      exports.DefaultToolsEnablingKeyListener = DefaultToolsEnablingKeyListener;
    }
  });

  // node_modules/sprotty/lib/base/ui-extensions/ui-extension-registry.js
  var require_ui_extension_registry = __commonJS({
    "node_modules/sprotty/lib/base/ui-extensions/ui-extension-registry.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      var __param = exports && exports.__param || function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SetUIExtensionVisibilityCommand = exports.SetUIExtensionVisibilityAction = exports.UIExtensionRegistry = void 0;
      var inversify_1 = require_inversify();
      var registry_1 = require_registry();
      var command_1 = require_command();
      var types_1 = require_types();
      var UIExtensionRegistry = class UIExtensionRegistry extends registry_1.InstanceRegistry {
        constructor(extensions = []) {
          super();
          extensions.forEach((extension) => this.register(extension.id(), extension));
        }
      };
      UIExtensionRegistry = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.multiInject)(types_1.TYPES.IUIExtension)),
        __param(0, (0, inversify_1.optional)()),
        __metadata("design:paramtypes", [Array])
      ], UIExtensionRegistry);
      exports.UIExtensionRegistry = UIExtensionRegistry;
      var SetUIExtensionVisibilityAction;
      (function(SetUIExtensionVisibilityAction2) {
        SetUIExtensionVisibilityAction2.KIND = "setUIExtensionVisibility";
        function create(options) {
          var _a;
          return {
            kind: SetUIExtensionVisibilityAction2.KIND,
            extensionId: options.extensionId,
            visible: options.visible,
            contextElementsId: (_a = options.contextElementsId) !== null && _a !== void 0 ? _a : []
          };
        }
        SetUIExtensionVisibilityAction2.create = create;
      })(SetUIExtensionVisibilityAction = exports.SetUIExtensionVisibilityAction || (exports.SetUIExtensionVisibilityAction = {}));
      var SetUIExtensionVisibilityCommand = class SetUIExtensionVisibilityCommand extends command_1.SystemCommand {
        constructor(action) {
          super();
          this.action = action;
        }
        execute(context) {
          const extension = this.registry.get(this.action.extensionId);
          if (extension) {
            this.action.visible ? extension.show(context.root, ...this.action.contextElementsId) : extension.hide();
          }
          return { model: context.root, modelChanged: false };
        }
        undo(context) {
          return { model: context.root, modelChanged: false };
        }
        redo(context) {
          return { model: context.root, modelChanged: false };
        }
      };
      SetUIExtensionVisibilityCommand.KIND = SetUIExtensionVisibilityAction.KIND;
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.UIExtensionRegistry),
        __metadata("design:type", UIExtensionRegistry)
      ], SetUIExtensionVisibilityCommand.prototype, "registry", void 0);
      SetUIExtensionVisibilityCommand = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(types_1.TYPES.Action)),
        __metadata("design:paramtypes", [Object])
      ], SetUIExtensionVisibilityCommand);
      exports.SetUIExtensionVisibilityCommand = SetUIExtensionVisibilityCommand;
    }
  });

  // node_modules/sprotty/lib/base/ui-extensions/ui-extension.js
  var require_ui_extension = __commonJS({
    "node_modules/sprotty/lib/base/ui-extensions/ui-extension.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.AbstractUIExtension = void 0;
      var inversify_1 = require_inversify();
      var types_1 = require_types();
      var AbstractUIExtension = class AbstractUIExtension {
        show(root, ...contextElementIds) {
          this.activeElement = document.activeElement;
          if (!this.containerElement) {
            if (!this.initialize())
              return;
          }
          this.onBeforeShow(this.containerElement, root, ...contextElementIds);
          this.setContainerVisible(true);
        }
        hide() {
          this.setContainerVisible(false);
          this.restoreFocus();
          this.activeElement = null;
        }
        restoreFocus() {
          const focusedElement = this.activeElement;
          if (focusedElement) {
            focusedElement.focus();
          }
        }
        initialize() {
          const baseDiv = document.getElementById(this.options.baseDiv);
          if (!baseDiv) {
            this.logger.warn(this, `Could not obtain sprotty base container for initializing UI extension ${this.id}`, this);
            return false;
          }
          this.containerElement = this.getOrCreateContainer(baseDiv.id);
          this.initializeContents(this.containerElement);
          if (baseDiv) {
            baseDiv.insertBefore(this.containerElement, baseDiv.firstChild);
          }
          return true;
        }
        getOrCreateContainer(baseDivId) {
          let container = document.getElementById(this.id());
          if (container === null) {
            container = document.createElement("div");
            container.id = baseDivId + "_" + this.id();
            container.classList.add(this.containerClass());
          }
          return container;
        }
        setContainerVisible(visible) {
          if (this.containerElement) {
            if (visible) {
              this.containerElement.style.visibility = "visible";
              this.containerElement.style.opacity = "1";
            } else {
              this.containerElement.style.visibility = "hidden";
              this.containerElement.style.opacity = "0";
            }
          }
        }
        /**
         * Updates the `containerElement` under the given `context` before it becomes visible.
         *
         * Subclasses may override this method to, for instance, modifying the position of the
         * `containerElement`, add or remove elements, etc. depending on the specified `root`
         * or `contextElementIds`.
         */
        onBeforeShow(containerElement, root, ...contextElementIds) {
        }
      };
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.ViewerOptions),
        __metadata("design:type", Object)
      ], AbstractUIExtension.prototype, "options", void 0);
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.ILogger),
        __metadata("design:type", Object)
      ], AbstractUIExtension.prototype, "logger", void 0);
      AbstractUIExtension = __decorate([
        (0, inversify_1.injectable)()
      ], AbstractUIExtension);
      exports.AbstractUIExtension = AbstractUIExtension;
    }
  });

  // node_modules/sprotty/lib/base/views/dom-helper.js
  var require_dom_helper = __commonJS({
    "node_modules/sprotty/lib/base/views/dom-helper.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.DOMHelper = void 0;
      var inversify_1 = require_inversify();
      var types_1 = require_types();
      var DOMHelper = class DOMHelper {
        getPrefix() {
          const prefix = this.viewerOptions !== void 0 && this.viewerOptions.baseDiv !== void 0 ? this.viewerOptions.baseDiv + "_" : "";
          return prefix;
        }
        createUniqueDOMElementId(element) {
          return this.getPrefix() + element.id;
        }
        findSModelIdByDOMElement(element) {
          return element.id.replace(this.getPrefix(), "");
        }
      };
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.ViewerOptions),
        __metadata("design:type", Object)
      ], DOMHelper.prototype, "viewerOptions", void 0);
      DOMHelper = __decorate([
        (0, inversify_1.injectable)()
      ], DOMHelper);
      exports.DOMHelper = DOMHelper;
    }
  });

  // node_modules/sprotty/lib/base/views/mouse-tool.js
  var require_mouse_tool = __commonJS({
    "node_modules/sprotty/lib/base/views/mouse-tool.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      var __param = exports && exports.__param || function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.MousePositionTracker = exports.MouseListener = exports.PopupMouseTool = exports.MouseTool = void 0;
      var inversify_1 = require_inversify();
      var actions_1 = require_actions();
      var smodel_1 = require_smodel();
      var types_1 = require_types();
      var dom_helper_1 = require_dom_helper();
      var vnode_utils_1 = require_vnode_utils();
      var MouseTool = class MouseTool {
        constructor(mouseListeners = []) {
          this.mouseListeners = mouseListeners;
        }
        register(mouseListener) {
          this.mouseListeners.push(mouseListener);
        }
        deregister(mouseListener) {
          const index = this.mouseListeners.indexOf(mouseListener);
          if (index >= 0)
            this.mouseListeners.splice(index, 1);
        }
        getTargetElement(model, event) {
          let target = event.target;
          const index = model.index;
          while (target) {
            if (target.id) {
              const element = index.getById(this.domHelper.findSModelIdByDOMElement(target));
              if (element !== void 0)
                return element;
            }
            target = target.parentNode;
          }
          return void 0;
        }
        handleEvent(methodName, model, event) {
          this.focusOnMouseEvent(methodName, model);
          const element = this.getTargetElement(model, event);
          if (!element)
            return;
          const actions = this.mouseListeners.map((listener) => listener[methodName](element, event)).reduce((a, b) => a.concat(b));
          if (actions.length > 0) {
            event.preventDefault();
            for (const actionOrPromise of actions) {
              if ((0, actions_1.isAction)(actionOrPromise)) {
                this.actionDispatcher.dispatch(actionOrPromise);
              } else {
                actionOrPromise.then((action) => {
                  this.actionDispatcher.dispatch(action);
                });
              }
            }
          }
        }
        focusOnMouseEvent(methodName, model) {
          if (document && methodName === "mouseDown") {
            const domElement = document.getElementById(this.domHelper.createUniqueDOMElementId(model));
            if (domElement !== null && typeof domElement.focus === "function")
              domElement.focus();
          }
        }
        mouseOver(model, event) {
          this.handleEvent("mouseOver", model, event);
        }
        mouseOut(model, event) {
          this.handleEvent("mouseOut", model, event);
        }
        mouseEnter(model, event) {
          this.handleEvent("mouseEnter", model, event);
        }
        mouseLeave(model, event) {
          this.handleEvent("mouseLeave", model, event);
        }
        mouseDown(model, event) {
          this.handleEvent("mouseDown", model, event);
        }
        mouseMove(model, event) {
          this.handleEvent("mouseMove", model, event);
        }
        mouseUp(model, event) {
          this.handleEvent("mouseUp", model, event);
        }
        wheel(model, event) {
          this.handleEvent("wheel", model, event);
        }
        contextMenu(model, event) {
          event.preventDefault();
          this.handleEvent("contextMenu", model, event);
        }
        doubleClick(model, event) {
          this.handleEvent("doubleClick", model, event);
        }
        decorate(vnode, element) {
          if (element instanceof smodel_1.SModelRoot) {
            (0, vnode_utils_1.on)(vnode, "mouseover", this.mouseOver.bind(this, element));
            (0, vnode_utils_1.on)(vnode, "mouseout", this.mouseOut.bind(this, element));
            (0, vnode_utils_1.on)(vnode, "mouseenter", this.mouseEnter.bind(this, element));
            (0, vnode_utils_1.on)(vnode, "mouseleave", this.mouseLeave.bind(this, element));
            (0, vnode_utils_1.on)(vnode, "mousedown", this.mouseDown.bind(this, element));
            (0, vnode_utils_1.on)(vnode, "mouseup", this.mouseUp.bind(this, element));
            (0, vnode_utils_1.on)(vnode, "mousemove", this.mouseMove.bind(this, element));
            (0, vnode_utils_1.on)(vnode, "wheel", this.wheel.bind(this, element));
            (0, vnode_utils_1.on)(vnode, "contextmenu", this.contextMenu.bind(this, element));
            (0, vnode_utils_1.on)(vnode, "dblclick", this.doubleClick.bind(this, element));
            (0, vnode_utils_1.on)(vnode, "dragover", (event) => this.handleEvent("dragOver", element, event));
            (0, vnode_utils_1.on)(vnode, "drop", (event) => this.handleEvent("drop", element, event));
          }
          vnode = this.mouseListeners.reduce((n, listener) => listener.decorate(n, element), vnode);
          return vnode;
        }
        postUpdate() {
        }
      };
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.IActionDispatcher),
        __metadata("design:type", Object)
      ], MouseTool.prototype, "actionDispatcher", void 0);
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.DOMHelper),
        __metadata("design:type", dom_helper_1.DOMHelper)
      ], MouseTool.prototype, "domHelper", void 0);
      MouseTool = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.multiInject)(types_1.TYPES.MouseListener)),
        __param(0, (0, inversify_1.optional)()),
        __metadata("design:paramtypes", [Array])
      ], MouseTool);
      exports.MouseTool = MouseTool;
      var PopupMouseTool = class PopupMouseTool extends MouseTool {
        constructor(mouseListeners = []) {
          super(mouseListeners);
          this.mouseListeners = mouseListeners;
        }
      };
      PopupMouseTool = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.multiInject)(types_1.TYPES.PopupMouseListener)),
        __param(0, (0, inversify_1.optional)()),
        __metadata("design:paramtypes", [Array])
      ], PopupMouseTool);
      exports.PopupMouseTool = PopupMouseTool;
      var MouseListener = class MouseListener {
        mouseOver(target, event) {
          return [];
        }
        mouseOut(target, event) {
          return [];
        }
        mouseEnter(target, event) {
          return [];
        }
        mouseLeave(target, event) {
          return [];
        }
        mouseDown(target, event) {
          return [];
        }
        mouseMove(target, event) {
          return [];
        }
        mouseUp(target, event) {
          return [];
        }
        wheel(target, event) {
          return [];
        }
        doubleClick(target, event) {
          return [];
        }
        contextMenu(target, event) {
          return [];
        }
        dragOver(target, event) {
          return [];
        }
        drop(target, event) {
          return [];
        }
        decorate(vnode, element) {
          return vnode;
        }
      };
      MouseListener = __decorate([
        (0, inversify_1.injectable)()
      ], MouseListener);
      exports.MouseListener = MouseListener;
      var MousePositionTracker = class MousePositionTracker extends MouseListener {
        mouseMove(target, event) {
          this.lastPosition = target.root.parentToLocal({ x: event.offsetX, y: event.offsetY });
          return [];
        }
        /**
         * Returns the last tracked mouse cursor position relative to the diagram root or `undefined`
         * if no mouse cursor position was ever tracked yet.
         */
        get lastPositionOnDiagram() {
          return this.lastPosition;
        }
      };
      MousePositionTracker = __decorate([
        (0, inversify_1.injectable)()
      ], MousePositionTracker);
      exports.MousePositionTracker = MousePositionTracker;
    }
  });

  // node_modules/snabbdom/build/snabbdom.cjs.js
  var require_snabbdom_cjs = __commonJS({
    "node_modules/snabbdom/build/snabbdom.cjs.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function createElement(tagName2, options) {
        return document.createElement(tagName2, options);
      }
      function createElementNS(namespaceURI, qualifiedName, options) {
        return document.createElementNS(namespaceURI, qualifiedName, options);
      }
      function createDocumentFragment() {
        return parseFragment(document.createDocumentFragment());
      }
      function createTextNode(text) {
        return document.createTextNode(text);
      }
      function createComment(text) {
        return document.createComment(text);
      }
      function insertBefore(parentNode2, newNode, referenceNode) {
        if (isDocumentFragment$1(parentNode2)) {
          let node = parentNode2;
          while (node && isDocumentFragment$1(node)) {
            const fragment2 = parseFragment(node);
            node = fragment2.parent;
          }
          parentNode2 = node !== null && node !== void 0 ? node : parentNode2;
        }
        if (isDocumentFragment$1(newNode)) {
          newNode = parseFragment(newNode, parentNode2);
        }
        if (referenceNode && isDocumentFragment$1(referenceNode)) {
          referenceNode = parseFragment(referenceNode).firstChildNode;
        }
        parentNode2.insertBefore(newNode, referenceNode);
      }
      function removeChild(node, child) {
        node.removeChild(child);
      }
      function appendChild(node, child) {
        if (isDocumentFragment$1(child)) {
          child = parseFragment(child, node);
        }
        node.appendChild(child);
      }
      function parentNode(node) {
        if (isDocumentFragment$1(node)) {
          while (node && isDocumentFragment$1(node)) {
            const fragment2 = parseFragment(node);
            node = fragment2.parent;
          }
          return node !== null && node !== void 0 ? node : null;
        }
        return node.parentNode;
      }
      function nextSibling(node) {
        var _a;
        if (isDocumentFragment$1(node)) {
          const fragment2 = parseFragment(node);
          const parent = parentNode(fragment2);
          if (parent && fragment2.lastChildNode) {
            const children = Array.from(parent.childNodes);
            const index = children.indexOf(fragment2.lastChildNode);
            return (_a = children[index + 1]) !== null && _a !== void 0 ? _a : null;
          }
          return null;
        }
        return node.nextSibling;
      }
      function tagName(elm) {
        return elm.tagName;
      }
      function setTextContent(node, text) {
        node.textContent = text;
      }
      function getTextContent(node) {
        return node.textContent;
      }
      function isElement$1(node) {
        return node.nodeType === 1;
      }
      function isText(node) {
        return node.nodeType === 3;
      }
      function isComment(node) {
        return node.nodeType === 8;
      }
      function isDocumentFragment$1(node) {
        return node.nodeType === 11;
      }
      function parseFragment(fragmentNode, parentNode2) {
        var _a, _b, _c;
        const fragment2 = fragmentNode;
        (_a = fragment2.parent) !== null && _a !== void 0 ? _a : fragment2.parent = parentNode2 !== null && parentNode2 !== void 0 ? parentNode2 : null;
        (_b = fragment2.firstChildNode) !== null && _b !== void 0 ? _b : fragment2.firstChildNode = fragmentNode.firstChild;
        (_c = fragment2.lastChildNode) !== null && _c !== void 0 ? _c : fragment2.lastChildNode = fragmentNode.lastChild;
        return fragment2;
      }
      var htmlDomApi = {
        createElement,
        createElementNS,
        createTextNode,
        createDocumentFragment,
        createComment,
        insertBefore,
        removeChild,
        appendChild,
        parentNode,
        nextSibling,
        tagName,
        setTextContent,
        getTextContent,
        isElement: isElement$1,
        isText,
        isComment,
        isDocumentFragment: isDocumentFragment$1
      };
      function vnode(sel, data, children, text, elm) {
        const key = data === void 0 ? void 0 : data.key;
        return { sel, data, children, text, elm, key };
      }
      var array = Array.isArray;
      function primitive(s) {
        return typeof s === "string" || typeof s === "number" || s instanceof String || s instanceof Number;
      }
      function isUndef(s) {
        return s === void 0;
      }
      function isDef(s) {
        return s !== void 0;
      }
      var emptyNode = vnode("", {}, [], void 0, void 0);
      function sameVnode(vnode1, vnode2) {
        var _a, _b;
        const isSameKey = vnode1.key === vnode2.key;
        const isSameIs = ((_a = vnode1.data) === null || _a === void 0 ? void 0 : _a.is) === ((_b = vnode2.data) === null || _b === void 0 ? void 0 : _b.is);
        const isSameSel = vnode1.sel === vnode2.sel;
        const isSameTextOrFragment = !vnode1.sel && vnode1.sel === vnode2.sel ? typeof vnode1.text === typeof vnode2.text : true;
        return isSameSel && isSameKey && isSameIs && isSameTextOrFragment;
      }
      function documentFragmentIsNotSupported() {
        throw new Error("The document fragment is not supported on this platform.");
      }
      function isElement(api, vnode2) {
        return api.isElement(vnode2);
      }
      function isDocumentFragment(api, vnode2) {
        return api.isDocumentFragment(vnode2);
      }
      function createKeyToOldIdx(children, beginIdx, endIdx) {
        var _a;
        const map = {};
        for (let i = beginIdx; i <= endIdx; ++i) {
          const key = (_a = children[i]) === null || _a === void 0 ? void 0 : _a.key;
          if (key !== void 0) {
            map[key] = i;
          }
        }
        return map;
      }
      var hooks = [
        "create",
        "update",
        "remove",
        "destroy",
        "pre",
        "post"
      ];
      function init$1(modules, domApi, options) {
        const cbs = {
          create: [],
          update: [],
          remove: [],
          destroy: [],
          pre: [],
          post: []
        };
        const api = domApi !== void 0 ? domApi : htmlDomApi;
        for (const hook of hooks) {
          for (const module2 of modules) {
            const currentHook = module2[hook];
            if (currentHook !== void 0) {
              cbs[hook].push(currentHook);
            }
          }
        }
        function emptyNodeAt(elm) {
          const id = elm.id ? "#" + elm.id : "";
          const classes = elm.getAttribute("class");
          const c = classes ? "." + classes.split(" ").join(".") : "";
          return vnode(api.tagName(elm).toLowerCase() + id + c, {}, [], void 0, elm);
        }
        function emptyDocumentFragmentAt(frag) {
          return vnode(void 0, {}, [], void 0, frag);
        }
        function createRmCb(childElm, listeners) {
          return function rmCb() {
            if (--listeners === 0) {
              const parent = api.parentNode(childElm);
              api.removeChild(parent, childElm);
            }
          };
        }
        function createElm(vnode2, insertedVnodeQueue) {
          var _a, _b, _c, _d;
          let i;
          let data = vnode2.data;
          if (data !== void 0) {
            const init2 = (_a = data.hook) === null || _a === void 0 ? void 0 : _a.init;
            if (isDef(init2)) {
              init2(vnode2);
              data = vnode2.data;
            }
          }
          const children = vnode2.children;
          const sel = vnode2.sel;
          if (sel === "!") {
            if (isUndef(vnode2.text)) {
              vnode2.text = "";
            }
            vnode2.elm = api.createComment(vnode2.text);
          } else if (sel !== void 0) {
            const hashIdx = sel.indexOf("#");
            const dotIdx = sel.indexOf(".", hashIdx);
            const hash = hashIdx > 0 ? hashIdx : sel.length;
            const dot = dotIdx > 0 ? dotIdx : sel.length;
            const tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
            const elm = vnode2.elm = isDef(data) && isDef(i = data.ns) ? api.createElementNS(i, tag, data) : api.createElement(tag, data);
            if (hash < dot)
              elm.setAttribute("id", sel.slice(hash + 1, dot));
            if (dotIdx > 0)
              elm.setAttribute("class", sel.slice(dot + 1).replace(/\./g, " "));
            for (i = 0; i < cbs.create.length; ++i)
              cbs.create[i](emptyNode, vnode2);
            if (array(children)) {
              for (i = 0; i < children.length; ++i) {
                const ch = children[i];
                if (ch != null) {
                  api.appendChild(elm, createElm(ch, insertedVnodeQueue));
                }
              }
            } else if (primitive(vnode2.text)) {
              api.appendChild(elm, api.createTextNode(vnode2.text));
            }
            const hook = vnode2.data.hook;
            if (isDef(hook)) {
              (_b = hook.create) === null || _b === void 0 ? void 0 : _b.call(hook, emptyNode, vnode2);
              if (hook.insert) {
                insertedVnodeQueue.push(vnode2);
              }
            }
          } else if (((_c = options === null || options === void 0 ? void 0 : options.experimental) === null || _c === void 0 ? void 0 : _c.fragments) && vnode2.children) {
            vnode2.elm = ((_d = api.createDocumentFragment) !== null && _d !== void 0 ? _d : documentFragmentIsNotSupported)();
            for (i = 0; i < cbs.create.length; ++i)
              cbs.create[i](emptyNode, vnode2);
            for (i = 0; i < vnode2.children.length; ++i) {
              const ch = vnode2.children[i];
              if (ch != null) {
                api.appendChild(vnode2.elm, createElm(ch, insertedVnodeQueue));
              }
            }
          } else {
            vnode2.elm = api.createTextNode(vnode2.text);
          }
          return vnode2.elm;
        }
        function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
          for (; startIdx <= endIdx; ++startIdx) {
            const ch = vnodes[startIdx];
            if (ch != null) {
              api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before);
            }
          }
        }
        function invokeDestroyHook(vnode2) {
          var _a, _b;
          const data = vnode2.data;
          if (data !== void 0) {
            (_b = (_a = data === null || data === void 0 ? void 0 : data.hook) === null || _a === void 0 ? void 0 : _a.destroy) === null || _b === void 0 ? void 0 : _b.call(_a, vnode2);
            for (let i = 0; i < cbs.destroy.length; ++i)
              cbs.destroy[i](vnode2);
            if (vnode2.children !== void 0) {
              for (let j = 0; j < vnode2.children.length; ++j) {
                const child = vnode2.children[j];
                if (child != null && typeof child !== "string") {
                  invokeDestroyHook(child);
                }
              }
            }
          }
        }
        function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
          var _a, _b;
          for (; startIdx <= endIdx; ++startIdx) {
            let listeners;
            let rm;
            const ch = vnodes[startIdx];
            if (ch != null) {
              if (isDef(ch.sel)) {
                invokeDestroyHook(ch);
                listeners = cbs.remove.length + 1;
                rm = createRmCb(ch.elm, listeners);
                for (let i = 0; i < cbs.remove.length; ++i)
                  cbs.remove[i](ch, rm);
                const removeHook = (_b = (_a = ch === null || ch === void 0 ? void 0 : ch.data) === null || _a === void 0 ? void 0 : _a.hook) === null || _b === void 0 ? void 0 : _b.remove;
                if (isDef(removeHook)) {
                  removeHook(ch, rm);
                } else {
                  rm();
                }
              } else if (ch.children) {
                invokeDestroyHook(ch);
                removeVnodes(parentElm, ch.children, 0, ch.children.length - 1);
              } else {
                api.removeChild(parentElm, ch.elm);
              }
            }
          }
        }
        function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
          let oldStartIdx = 0;
          let newStartIdx = 0;
          let oldEndIdx = oldCh.length - 1;
          let oldStartVnode = oldCh[0];
          let oldEndVnode = oldCh[oldEndIdx];
          let newEndIdx = newCh.length - 1;
          let newStartVnode = newCh[0];
          let newEndVnode = newCh[newEndIdx];
          let oldKeyToIdx;
          let idxInOld;
          let elmToMove;
          let before;
          while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
            if (oldStartVnode == null) {
              oldStartVnode = oldCh[++oldStartIdx];
            } else if (oldEndVnode == null) {
              oldEndVnode = oldCh[--oldEndIdx];
            } else if (newStartVnode == null) {
              newStartVnode = newCh[++newStartIdx];
            } else if (newEndVnode == null) {
              newEndVnode = newCh[--newEndIdx];
            } else if (sameVnode(oldStartVnode, newStartVnode)) {
              patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
              oldStartVnode = oldCh[++oldStartIdx];
              newStartVnode = newCh[++newStartIdx];
            } else if (sameVnode(oldEndVnode, newEndVnode)) {
              patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
              oldEndVnode = oldCh[--oldEndIdx];
              newEndVnode = newCh[--newEndIdx];
            } else if (sameVnode(oldStartVnode, newEndVnode)) {
              patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
              api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
              oldStartVnode = oldCh[++oldStartIdx];
              newEndVnode = newCh[--newEndIdx];
            } else if (sameVnode(oldEndVnode, newStartVnode)) {
              patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
              api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
              oldEndVnode = oldCh[--oldEndIdx];
              newStartVnode = newCh[++newStartIdx];
            } else {
              if (oldKeyToIdx === void 0) {
                oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
              }
              idxInOld = oldKeyToIdx[newStartVnode.key];
              if (isUndef(idxInOld)) {
                api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
              } else {
                elmToMove = oldCh[idxInOld];
                if (elmToMove.sel !== newStartVnode.sel) {
                  api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                } else {
                  patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
                  oldCh[idxInOld] = void 0;
                  api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
                }
              }
              newStartVnode = newCh[++newStartIdx];
            }
          }
          if (newStartIdx <= newEndIdx) {
            before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
            addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
          }
          if (oldStartIdx <= oldEndIdx) {
            removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
          }
        }
        function patchVnode(oldVnode, vnode2, insertedVnodeQueue) {
          var _a, _b, _c, _d, _e, _f, _g, _h;
          const hook = (_a = vnode2.data) === null || _a === void 0 ? void 0 : _a.hook;
          (_b = hook === null || hook === void 0 ? void 0 : hook.prepatch) === null || _b === void 0 ? void 0 : _b.call(hook, oldVnode, vnode2);
          const elm = vnode2.elm = oldVnode.elm;
          if (oldVnode === vnode2)
            return;
          if (vnode2.data !== void 0 || isDef(vnode2.text) && vnode2.text !== oldVnode.text) {
            (_c = vnode2.data) !== null && _c !== void 0 ? _c : vnode2.data = {};
            (_d = oldVnode.data) !== null && _d !== void 0 ? _d : oldVnode.data = {};
            for (let i = 0; i < cbs.update.length; ++i)
              cbs.update[i](oldVnode, vnode2);
            (_g = (_f = (_e = vnode2.data) === null || _e === void 0 ? void 0 : _e.hook) === null || _f === void 0 ? void 0 : _f.update) === null || _g === void 0 ? void 0 : _g.call(_f, oldVnode, vnode2);
          }
          const oldCh = oldVnode.children;
          const ch = vnode2.children;
          if (isUndef(vnode2.text)) {
            if (isDef(oldCh) && isDef(ch)) {
              if (oldCh !== ch)
                updateChildren(elm, oldCh, ch, insertedVnodeQueue);
            } else if (isDef(ch)) {
              if (isDef(oldVnode.text))
                api.setTextContent(elm, "");
              addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
            } else if (isDef(oldCh)) {
              removeVnodes(elm, oldCh, 0, oldCh.length - 1);
            } else if (isDef(oldVnode.text)) {
              api.setTextContent(elm, "");
            }
          } else if (oldVnode.text !== vnode2.text) {
            if (isDef(oldCh)) {
              removeVnodes(elm, oldCh, 0, oldCh.length - 1);
            }
            api.setTextContent(elm, vnode2.text);
          }
          (_h = hook === null || hook === void 0 ? void 0 : hook.postpatch) === null || _h === void 0 ? void 0 : _h.call(hook, oldVnode, vnode2);
        }
        return function patch(oldVnode, vnode2) {
          let i, elm, parent;
          const insertedVnodeQueue = [];
          for (i = 0; i < cbs.pre.length; ++i)
            cbs.pre[i]();
          if (isElement(api, oldVnode)) {
            oldVnode = emptyNodeAt(oldVnode);
          } else if (isDocumentFragment(api, oldVnode)) {
            oldVnode = emptyDocumentFragmentAt(oldVnode);
          }
          if (sameVnode(oldVnode, vnode2)) {
            patchVnode(oldVnode, vnode2, insertedVnodeQueue);
          } else {
            elm = oldVnode.elm;
            parent = api.parentNode(elm);
            createElm(vnode2, insertedVnodeQueue);
            if (parent !== null) {
              api.insertBefore(parent, vnode2.elm, api.nextSibling(elm));
              removeVnodes(parent, [oldVnode], 0, 0);
            }
          }
          for (i = 0; i < insertedVnodeQueue.length; ++i) {
            insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
          }
          for (i = 0; i < cbs.post.length; ++i)
            cbs.post[i]();
          return vnode2;
        };
      }
      function addNS(data, children, sel) {
        data.ns = "http://www.w3.org/2000/svg";
        if (sel !== "foreignObject" && children !== void 0) {
          for (let i = 0; i < children.length; ++i) {
            const child = children[i];
            if (typeof child === "string")
              continue;
            const childData = child.data;
            if (childData !== void 0) {
              addNS(childData, child.children, child.sel);
            }
          }
        }
      }
      function h(sel, b, c) {
        let data = {};
        let children;
        let text;
        let i;
        if (c !== void 0) {
          if (b !== null) {
            data = b;
          }
          if (array(c)) {
            children = c;
          } else if (primitive(c)) {
            text = c.toString();
          } else if (c && c.sel) {
            children = [c];
          }
        } else if (b !== void 0 && b !== null) {
          if (array(b)) {
            children = b;
          } else if (primitive(b)) {
            text = b.toString();
          } else if (b && b.sel) {
            children = [b];
          } else {
            data = b;
          }
        }
        if (children !== void 0) {
          for (i = 0; i < children.length; ++i) {
            if (primitive(children[i]))
              children[i] = vnode(void 0, void 0, void 0, children[i], void 0);
          }
        }
        if (sel[0] === "s" && sel[1] === "v" && sel[2] === "g" && (sel.length === 3 || sel[3] === "." || sel[3] === "#")) {
          addNS(data, children, sel);
        }
        return vnode(sel, data, children, text, void 0);
      }
      function fragment(children) {
        let c;
        let text;
        if (array(children)) {
          c = children;
        } else if (primitive(c)) {
          text = children;
        } else if (c && c.sel) {
          c = [children];
        }
        if (c !== void 0) {
          for (let i = 0; i < c.length; ++i) {
            if (primitive(c[i]))
              c[i] = vnode(void 0, void 0, void 0, c[i], void 0);
          }
        }
        return vnode(void 0, {}, c, text, void 0);
      }
      function copyToThunk(vnode2, thunk2) {
        var _a;
        const ns = (_a = thunk2.data) === null || _a === void 0 ? void 0 : _a.ns;
        vnode2.data.fn = thunk2.data.fn;
        vnode2.data.args = thunk2.data.args;
        thunk2.data = vnode2.data;
        thunk2.children = vnode2.children;
        thunk2.text = vnode2.text;
        thunk2.elm = vnode2.elm;
        if (ns)
          addNS(thunk2.data, thunk2.children, thunk2.sel);
      }
      function init(thunk2) {
        const cur = thunk2.data;
        const vnode2 = cur.fn(...cur.args);
        copyToThunk(vnode2, thunk2);
      }
      function prepatch(oldVnode, thunk2) {
        let i;
        const old = oldVnode.data;
        const cur = thunk2.data;
        const oldArgs = old.args;
        const args = cur.args;
        if (old.fn !== cur.fn || oldArgs.length !== args.length) {
          copyToThunk(cur.fn(...args), thunk2);
          return;
        }
        for (i = 0; i < args.length; ++i) {
          if (oldArgs[i] !== args[i]) {
            copyToThunk(cur.fn(...args), thunk2);
            return;
          }
        }
        copyToThunk(oldVnode, thunk2);
      }
      var thunk = function thunk2(sel, key, fn, args) {
        if (args === void 0) {
          args = fn;
          fn = key;
          key = void 0;
        }
        return h(sel, {
          key,
          hook: { init, prepatch },
          fn,
          args
        });
      };
      function pre(vnode2, newVnode) {
        const attachData = vnode2.data.attachData;
        newVnode.data.attachData.placeholder = attachData.placeholder;
        newVnode.data.attachData.real = attachData.real;
        vnode2.elm = vnode2.data.attachData.real;
      }
      function post(_, vnode2) {
        vnode2.elm = vnode2.data.attachData.placeholder;
      }
      function destroy(vnode2) {
        if (vnode2.elm !== void 0) {
          vnode2.elm.parentNode.removeChild(vnode2.elm);
        }
        vnode2.elm = vnode2.data.attachData.real;
      }
      function create(_, vnode2) {
        const real = vnode2.elm;
        const attachData = vnode2.data.attachData;
        const placeholder = document.createElement("span");
        vnode2.elm = placeholder;
        attachData.target.appendChild(real);
        attachData.real = real;
        attachData.placeholder = placeholder;
      }
      function attachTo(target, vnode2) {
        if (vnode2.data === void 0)
          vnode2.data = {};
        if (vnode2.data.hook === void 0)
          vnode2.data.hook = {};
        const data = vnode2.data;
        const hook = vnode2.data.hook;
        data.attachData = { target, placeholder: void 0, real: void 0 };
        hook.create = create;
        hook.prepatch = pre;
        hook.postpatch = post;
        hook.destroy = destroy;
        return vnode2;
      }
      function toVNode(node, domApi) {
        const api = domApi !== void 0 ? domApi : htmlDomApi;
        let text;
        if (api.isElement(node)) {
          const id = node.id ? "#" + node.id : "";
          const cn = node.getAttribute("class");
          const c = cn ? "." + cn.split(" ").join(".") : "";
          const sel = api.tagName(node).toLowerCase() + id + c;
          const attrs = {};
          const dataset = {};
          const data = {};
          const children = [];
          let name;
          let i, n;
          const elmAttrs = node.attributes;
          const elmChildren = node.childNodes;
          for (i = 0, n = elmAttrs.length; i < n; i++) {
            name = elmAttrs[i].nodeName;
            if (name[0] === "d" && name[1] === "a" && name[2] === "t" && name[3] === "a" && name[4] === "-") {
              dataset[name.slice(5)] = elmAttrs[i].nodeValue || "";
            } else if (name !== "id" && name !== "class") {
              attrs[name] = elmAttrs[i].nodeValue;
            }
          }
          for (i = 0, n = elmChildren.length; i < n; i++) {
            children.push(toVNode(elmChildren[i], domApi));
          }
          if (Object.keys(attrs).length > 0)
            data.attrs = attrs;
          if (Object.keys(dataset).length > 0)
            data.dataset = dataset;
          if (sel[0] === "s" && sel[1] === "v" && sel[2] === "g" && (sel.length === 3 || sel[3] === "." || sel[3] === "#")) {
            addNS(data, children, sel);
          }
          return vnode(sel, data, children, void 0, node);
        } else if (api.isText(node)) {
          text = api.getTextContent(node);
          return vnode(void 0, void 0, void 0, text, node);
        } else if (api.isComment(node)) {
          text = api.getTextContent(node);
          return vnode("!", {}, [], text, node);
        } else {
          return vnode("", {}, [], void 0, node);
        }
      }
      var xlinkNS = "http://www.w3.org/1999/xlink";
      var xmlNS = "http://www.w3.org/XML/1998/namespace";
      var colonChar = 58;
      var xChar = 120;
      function updateAttrs(oldVnode, vnode2) {
        let key;
        const elm = vnode2.elm;
        let oldAttrs = oldVnode.data.attrs;
        let attrs = vnode2.data.attrs;
        if (!oldAttrs && !attrs)
          return;
        if (oldAttrs === attrs)
          return;
        oldAttrs = oldAttrs || {};
        attrs = attrs || {};
        for (key in attrs) {
          const cur = attrs[key];
          const old = oldAttrs[key];
          if (old !== cur) {
            if (cur === true) {
              elm.setAttribute(key, "");
            } else if (cur === false) {
              elm.removeAttribute(key);
            } else {
              if (key.charCodeAt(0) !== xChar) {
                elm.setAttribute(key, cur);
              } else if (key.charCodeAt(3) === colonChar) {
                elm.setAttributeNS(xmlNS, key, cur);
              } else if (key.charCodeAt(5) === colonChar) {
                elm.setAttributeNS(xlinkNS, key, cur);
              } else {
                elm.setAttribute(key, cur);
              }
            }
          }
        }
        for (key in oldAttrs) {
          if (!(key in attrs)) {
            elm.removeAttribute(key);
          }
        }
      }
      var attributesModule = {
        create: updateAttrs,
        update: updateAttrs
      };
      function updateClass(oldVnode, vnode2) {
        let cur;
        let name;
        const elm = vnode2.elm;
        let oldClass = oldVnode.data.class;
        let klass = vnode2.data.class;
        if (!oldClass && !klass)
          return;
        if (oldClass === klass)
          return;
        oldClass = oldClass || {};
        klass = klass || {};
        for (name in oldClass) {
          if (oldClass[name] && !Object.prototype.hasOwnProperty.call(klass, name)) {
            elm.classList.remove(name);
          }
        }
        for (name in klass) {
          cur = klass[name];
          if (cur !== oldClass[name]) {
            elm.classList[cur ? "add" : "remove"](name);
          }
        }
      }
      var classModule = { create: updateClass, update: updateClass };
      var CAPS_REGEX = /[A-Z]/g;
      function updateDataset(oldVnode, vnode2) {
        const elm = vnode2.elm;
        let oldDataset = oldVnode.data.dataset;
        let dataset = vnode2.data.dataset;
        let key;
        if (!oldDataset && !dataset)
          return;
        if (oldDataset === dataset)
          return;
        oldDataset = oldDataset || {};
        dataset = dataset || {};
        const d = elm.dataset;
        for (key in oldDataset) {
          if (!dataset[key]) {
            if (d) {
              if (key in d) {
                delete d[key];
              }
            } else {
              elm.removeAttribute("data-" + key.replace(CAPS_REGEX, "-$&").toLowerCase());
            }
          }
        }
        for (key in dataset) {
          if (oldDataset[key] !== dataset[key]) {
            if (d) {
              d[key] = dataset[key];
            } else {
              elm.setAttribute("data-" + key.replace(CAPS_REGEX, "-$&").toLowerCase(), dataset[key]);
            }
          }
        }
      }
      var datasetModule = {
        create: updateDataset,
        update: updateDataset
      };
      function invokeHandler(handler, vnode2, event) {
        if (typeof handler === "function") {
          handler.call(vnode2, event, vnode2);
        } else if (typeof handler === "object") {
          for (let i = 0; i < handler.length; i++) {
            invokeHandler(handler[i], vnode2, event);
          }
        }
      }
      function handleEvent(event, vnode2) {
        const name = event.type;
        const on = vnode2.data.on;
        if (on && on[name]) {
          invokeHandler(on[name], vnode2, event);
        }
      }
      function createListener() {
        return function handler(event) {
          handleEvent(event, handler.vnode);
        };
      }
      function updateEventListeners(oldVnode, vnode2) {
        const oldOn = oldVnode.data.on;
        const oldListener = oldVnode.listener;
        const oldElm = oldVnode.elm;
        const on = vnode2 && vnode2.data.on;
        const elm = vnode2 && vnode2.elm;
        let name;
        if (oldOn === on) {
          return;
        }
        if (oldOn && oldListener) {
          if (!on) {
            for (name in oldOn) {
              oldElm.removeEventListener(name, oldListener, false);
            }
          } else {
            for (name in oldOn) {
              if (!on[name]) {
                oldElm.removeEventListener(name, oldListener, false);
              }
            }
          }
        }
        if (on) {
          const listener = vnode2.listener = oldVnode.listener || createListener();
          listener.vnode = vnode2;
          if (!oldOn) {
            for (name in on) {
              elm.addEventListener(name, listener, false);
            }
          } else {
            for (name in on) {
              if (!oldOn[name]) {
                elm.addEventListener(name, listener, false);
              }
            }
          }
        }
      }
      var eventListenersModule = {
        create: updateEventListeners,
        update: updateEventListeners,
        destroy: updateEventListeners
      };
      function updateProps(oldVnode, vnode2) {
        let key;
        let cur;
        let old;
        const elm = vnode2.elm;
        let oldProps = oldVnode.data.props;
        let props = vnode2.data.props;
        if (!oldProps && !props)
          return;
        if (oldProps === props)
          return;
        oldProps = oldProps || {};
        props = props || {};
        for (key in props) {
          cur = props[key];
          old = oldProps[key];
          if (old !== cur && (key !== "value" || elm[key] !== cur)) {
            elm[key] = cur;
          }
        }
      }
      var propsModule = { create: updateProps, update: updateProps };
      var raf = typeof window !== "undefined" && window.requestAnimationFrame.bind(window) || setTimeout;
      var nextFrame = function(fn) {
        raf(function() {
          raf(fn);
        });
      };
      var reflowForced = false;
      function setNextFrame(obj, prop, val) {
        nextFrame(function() {
          obj[prop] = val;
        });
      }
      function updateStyle(oldVnode, vnode2) {
        let cur;
        let name;
        const elm = vnode2.elm;
        let oldStyle = oldVnode.data.style;
        let style = vnode2.data.style;
        if (!oldStyle && !style)
          return;
        if (oldStyle === style)
          return;
        oldStyle = oldStyle || {};
        style = style || {};
        const oldHasDel = "delayed" in oldStyle;
        for (name in oldStyle) {
          if (!style[name]) {
            if (name[0] === "-" && name[1] === "-") {
              elm.style.removeProperty(name);
            } else {
              elm.style[name] = "";
            }
          }
        }
        for (name in style) {
          cur = style[name];
          if (name === "delayed" && style.delayed) {
            for (const name2 in style.delayed) {
              cur = style.delayed[name2];
              if (!oldHasDel || cur !== oldStyle.delayed[name2]) {
                setNextFrame(elm.style, name2, cur);
              }
            }
          } else if (name !== "remove" && cur !== oldStyle[name]) {
            if (name[0] === "-" && name[1] === "-") {
              elm.style.setProperty(name, cur);
            } else {
              elm.style[name] = cur;
            }
          }
        }
      }
      function applyDestroyStyle(vnode2) {
        let style;
        let name;
        const elm = vnode2.elm;
        const s = vnode2.data.style;
        if (!s || !(style = s.destroy))
          return;
        for (name in style) {
          elm.style[name] = style[name];
        }
      }
      function applyRemoveStyle(vnode2, rm) {
        const s = vnode2.data.style;
        if (!s || !s.remove) {
          rm();
          return;
        }
        if (!reflowForced) {
          vnode2.elm.offsetLeft;
          reflowForced = true;
        }
        let name;
        const elm = vnode2.elm;
        let i = 0;
        const style = s.remove;
        let amount = 0;
        const applied = [];
        for (name in style) {
          applied.push(name);
          elm.style[name] = style[name];
        }
        const compStyle = getComputedStyle(elm);
        const props = compStyle["transition-property"].split(", ");
        for (; i < props.length; ++i) {
          if (applied.indexOf(props[i]) !== -1)
            amount++;
        }
        elm.addEventListener("transitionend", function(ev) {
          if (ev.target === elm)
            --amount;
          if (amount === 0)
            rm();
        });
      }
      function forceReflow() {
        reflowForced = false;
      }
      var styleModule = {
        pre: forceReflow,
        create: updateStyle,
        update: updateStyle,
        destroy: applyDestroyStyle,
        remove: applyRemoveStyle
      };
      function Fragment(data, ...children) {
        const flatChildren = flattenAndFilter(children, []);
        if (flatChildren.length === 1 && !flatChildren[0].sel && flatChildren[0].text) {
          return vnode(void 0, void 0, void 0, flatChildren[0].text, void 0);
        } else {
          return vnode(void 0, data !== null && data !== void 0 ? data : {}, flatChildren, void 0, void 0);
        }
      }
      function flattenAndFilter(children, flattened) {
        for (const child of children) {
          if (child !== void 0 && child !== null && child !== false && child !== "") {
            if (Array.isArray(child)) {
              flattenAndFilter(child, flattened);
            } else if (typeof child === "string" || typeof child === "number" || typeof child === "boolean") {
              flattened.push(vnode(void 0, void 0, void 0, String(child), void 0));
            } else {
              flattened.push(child);
            }
          }
        }
        return flattened;
      }
      function jsx(tag, data, ...children) {
        const flatChildren = flattenAndFilter(children, []);
        if (typeof tag === "function") {
          return tag(data, flatChildren);
        } else {
          if (flatChildren.length === 1 && !flatChildren[0].sel && flatChildren[0].text) {
            return h(tag, data, flatChildren[0].text);
          } else {
            return h(tag, data, flatChildren);
          }
        }
      }
      (function(jsx2) {
      })(jsx || (jsx = {}));
      exports.Fragment = Fragment;
      exports.array = array;
      exports.attachTo = attachTo;
      exports.attributesModule = attributesModule;
      exports.classModule = classModule;
      exports.datasetModule = datasetModule;
      exports.eventListenersModule = eventListenersModule;
      exports.fragment = fragment;
      exports.h = h;
      exports.htmlDomApi = htmlDomApi;
      exports.init = init$1;
      exports.jsx = jsx;
      exports.primitive = primitive;
      exports.propsModule = propsModule;
      exports.styleModule = styleModule;
      exports.thunk = thunk;
      exports.toVNode = toVNode;
      exports.vnode = vnode;
    }
  });

  // node_modules/sprotty/lib/base/views/thunk-view.js
  var require_thunk_view = __commonJS({
    "node_modules/sprotty/lib/base/views/thunk-view.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isThunk = exports.ThunkView = void 0;
      var snabbdom_1 = require_snabbdom_cjs();
      var inversify_1 = require_inversify();
      var ThunkView = class ThunkView {
        render(model, context) {
          return (0, snabbdom_1.h)(this.selector(model), {
            key: model.id,
            hook: {
              init: this.init.bind(this),
              prepatch: this.prepatch.bind(this)
            },
            fn: () => this.renderAndDecorate(model, context),
            args: this.watchedArgs(model),
            thunk: true
          });
        }
        renderAndDecorate(model, context) {
          const vnode = this.doRender(model, context);
          context.decorate(vnode, model);
          return vnode;
        }
        copyToThunk(vnode, thunk) {
          thunk.elm = vnode.elm;
          vnode.data.fn = thunk.data.fn;
          vnode.data.args = thunk.data.args;
          thunk.data = vnode.data;
          thunk.children = vnode.children;
          thunk.text = vnode.text;
          thunk.elm = vnode.elm;
        }
        init(thunk) {
          const cur = thunk.data;
          const vnode = cur.fn.apply(void 0, cur.args);
          this.copyToThunk(vnode, thunk);
        }
        prepatch(oldVnode, thunk) {
          const old = oldVnode.data, cur = thunk.data;
          if (!this.equals(old.args, cur.args))
            this.copyToThunk(cur.fn.apply(void 0, cur.args), thunk);
          else
            this.copyToThunk(oldVnode, thunk);
        }
        equals(oldArg, newArg) {
          if (Array.isArray(oldArg) && Array.isArray(newArg)) {
            if (oldArg.length !== newArg.length)
              return false;
            for (let i = 0; i < newArg.length; ++i) {
              if (!this.equals(oldArg[i], newArg[i]))
                return false;
            }
          } else if (typeof oldArg === "object" && typeof newArg === "object") {
            if (Object.keys(oldArg).length !== Object.keys(newArg).length)
              return false;
            for (const key in oldArg) {
              if (key !== "parent" && key !== "root" && (!(key in newArg) || !this.equals(oldArg[key], newArg[key])))
                return false;
            }
          } else if (oldArg !== newArg) {
            return false;
          }
          return true;
        }
      };
      ThunkView = __decorate([
        (0, inversify_1.injectable)()
      ], ThunkView);
      exports.ThunkView = ThunkView;
      function isThunk(vnode) {
        return "thunk" in vnode;
      }
      exports.isThunk = isThunk;
    }
  });

  // node_modules/sprotty/lib/lib/jsx.js
  var require_jsx = __commonJS({
    "node_modules/sprotty/lib/lib/jsx.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.JSX = exports.svg = exports.html = void 0;
      var snabbdom_1 = require_snabbdom_cjs();
      var modulesNS = ["hook", "on", "style", "class", "props", "attrs", "dataset"];
      var SVGNS = "http://www.w3.org/2000/svg";
      function normalizeAttrs(source, defNS, namespace) {
        const data = {};
        if (namespace) {
          data.ns = namespace;
        }
        if (source === null) {
          return data;
        }
        modulesNS.forEach((mod) => {
          if (source[mod]) {
            data[mod] = source[mod];
          }
        });
        Object.keys(source).forEach((key) => {
          if (key === "key" || key === "classNames" || key === "selector")
            return;
          const idx = key.indexOf("-");
          if (idx > 0)
            addAttr(key.slice(0, idx), key.slice(idx + 1), source[key]);
          else if (!data[key])
            addAttr(defNS, key, source[key]);
        });
        return data;
        function addAttr(modname, key, val) {
          const mod = data[modname] || (data[modname] = {});
          mod[key] = val;
        }
      }
      function JSX(namespace, defNS = "props") {
        return (tag, attrs, ...children) => (0, snabbdom_1.jsx)(tag, normalizeAttrs(attrs, defNS, namespace), children);
      }
      exports.JSX = JSX;
      var html = JSX();
      exports.html = html;
      var svg2 = JSX(SVGNS, "attrs");
      exports.svg = svg2;
    }
  });

  // node_modules/sprotty/lib/base/views/view.js
  var require_view = __commonJS({
    "node_modules/sprotty/lib/base/views/view.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      var __param = exports && exports.__param || function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.MissingView = exports.EmptyView = exports.configureView = exports.configureModelElement = exports.ViewRegistry = exports.findArgValue = void 0;
      var jsx_1 = require_jsx();
      var inversify_1 = require_inversify();
      var types_1 = require_types();
      var registry_1 = require_registry();
      var inversify_2 = require_inversify2();
      var smodel_factory_1 = require_smodel_factory();
      var smodel_utils_1 = require_smodel_utils();
      var sprotty_protocol_1 = require_lib();
      function findArgValue(arg, key) {
        while (arg !== void 0 && !(key in arg) && arg.parentArgs) {
          arg = arg.parentArgs;
        }
        return arg ? arg[key] : void 0;
      }
      exports.findArgValue = findArgValue;
      var ViewRegistry = class ViewRegistry extends registry_1.InstanceRegistry {
        constructor(registrations) {
          super();
          this.registerDefaults();
          registrations.forEach((registration) => this.register(registration.type, registration.factory()));
        }
        registerDefaults() {
          this.register(smodel_factory_1.EMPTY_ROOT.type, new EmptyView());
        }
        missing(key) {
          return new MissingView();
        }
      };
      ViewRegistry = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.multiInject)(types_1.TYPES.ViewRegistration)),
        __param(0, (0, inversify_1.optional)()),
        __metadata("design:paramtypes", [Array])
      ], ViewRegistry);
      exports.ViewRegistry = ViewRegistry;
      function configureModelElement2(context, type, modelConstr, viewConstr, features) {
        (0, smodel_utils_1.registerModelElement)(context, type, modelConstr, features);
        configureView(context, type, viewConstr);
      }
      exports.configureModelElement = configureModelElement2;
      function configureView(context, type, constr) {
        if (typeof constr === "function") {
          if (!(0, inversify_2.isInjectable)(constr)) {
            throw new Error(`Views should be @injectable: ${constr.name}`);
          }
          if (!context.isBound(constr)) {
            context.bind(constr).toSelf();
          }
        }
        context.bind(types_1.TYPES.ViewRegistration).toDynamicValue((ctx) => ({
          type,
          factory: () => ctx.container.get(constr)
        }));
      }
      exports.configureView = configureView;
      var EmptyView = class EmptyView {
        render(model, context) {
          return (0, jsx_1.svg)("svg", { "class-sprotty-empty": true });
        }
      };
      EmptyView = __decorate([
        (0, inversify_1.injectable)()
      ], EmptyView);
      exports.EmptyView = EmptyView;
      var MissingView = class MissingView {
        render(model, context) {
          const position = model.position || sprotty_protocol_1.Point.ORIGIN;
          return (0, jsx_1.svg)(
            "text",
            { "class-sprotty-missing": true, x: position.x, y: position.y },
            "?",
            model.id,
            "?"
          );
        }
      };
      MissingView = __decorate([
        (0, inversify_1.injectable)()
      ], MissingView);
      exports.MissingView = MissingView;
    }
  });

  // node_modules/sprotty/lib/base/views/viewer-cache.js
  var require_viewer_cache = __commonJS({
    "node_modules/sprotty/lib/base/views/viewer-cache.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ViewerCache = void 0;
      var inversify_1 = require_inversify();
      var types_1 = require_types();
      var animation_frame_syncer_1 = require_animation_frame_syncer();
      var ViewerCache = class ViewerCache {
        update(model, cause) {
          if (cause !== void 0) {
            this.delegate.update(model, cause);
            this.cachedModel = void 0;
          } else {
            const isCacheEmpty = this.cachedModel === void 0;
            this.cachedModel = model;
            if (isCacheEmpty) {
              this.scheduleUpdate();
            }
          }
        }
        scheduleUpdate() {
          this.syncer.onEndOfNextFrame(() => {
            if (this.cachedModel) {
              this.delegate.update(this.cachedModel);
              this.cachedModel = void 0;
            }
          });
        }
      };
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.IViewer),
        __metadata("design:type", Object)
      ], ViewerCache.prototype, "delegate", void 0);
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.AnimationFrameSyncer),
        __metadata("design:type", animation_frame_syncer_1.AnimationFrameSyncer)
      ], ViewerCache.prototype, "syncer", void 0);
      ViewerCache = __decorate([
        (0, inversify_1.injectable)()
      ], ViewerCache);
      exports.ViewerCache = ViewerCache;
    }
  });

  // node_modules/sprotty/lib/base/views/viewer-options.js
  var require_viewer_options = __commonJS({
    "node_modules/sprotty/lib/base/views/viewer-options.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.overrideViewerOptions = exports.configureViewerOptions = exports.defaultViewerOptions = void 0;
      var object_1 = require_object();
      var types_1 = require_types();
      var defaultViewerOptions = () => ({
        baseDiv: "sprotty",
        baseClass: "sprotty",
        hiddenDiv: "sprotty-hidden",
        hiddenClass: "sprotty-hidden",
        popupDiv: "sprotty-popup",
        popupClass: "sprotty-popup",
        popupClosedClass: "sprotty-popup-closed",
        needsClientLayout: true,
        needsServerLayout: false,
        popupOpenDelay: 1e3,
        popupCloseDelay: 300
      });
      exports.defaultViewerOptions = defaultViewerOptions;
      function configureViewerOptions2(context, options) {
        const opt = Object.assign(Object.assign({}, (0, exports.defaultViewerOptions)()), options);
        if (context.isBound(types_1.TYPES.ViewerOptions))
          context.rebind(types_1.TYPES.ViewerOptions).toConstantValue(opt);
        else
          context.bind(types_1.TYPES.ViewerOptions).toConstantValue(opt);
      }
      exports.configureViewerOptions = configureViewerOptions2;
      function overrideViewerOptions(container, options) {
        const opt = container.get(types_1.TYPES.ViewerOptions);
        (0, object_1.safeAssign)(opt, options);
        return opt;
      }
      exports.overrideViewerOptions = overrideViewerOptions;
    }
  });

  // node_modules/sprotty/lib/base/views/viewer.js
  var require_viewer = __commonJS({
    "node_modules/sprotty/lib/base/views/viewer.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      var __param = exports && exports.__param || function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.PopupModelViewer = exports.HiddenModelViewer = exports.ModelViewer = exports.PatcherProvider = exports.ModelRenderer = void 0;
      var inversify_1 = require_inversify();
      var snabbdom_1 = require_snabbdom_cjs();
      var jsx_1 = require_jsx();
      var browser_1 = require_browser();
      var initialize_canvas_1 = require_initialize_canvas();
      var smodel_factory_1 = require_smodel_factory();
      var types_1 = require_types();
      var thunk_view_1 = require_thunk_view();
      var vnode_utils_1 = require_vnode_utils();
      var ModelRenderer = class {
        constructor(viewRegistry, targetKind, postprocessors, args = {}) {
          this.viewRegistry = viewRegistry;
          this.targetKind = targetKind;
          this.postprocessors = postprocessors;
          this.args = args;
        }
        decorate(vnode, element) {
          if ((0, thunk_view_1.isThunk)(vnode)) {
            return vnode;
          }
          return this.postprocessors.reduce((n, processor) => processor.decorate(n, element), vnode);
        }
        renderElement(element) {
          const view = this.viewRegistry.get(element.type);
          const vnode = view.render(element, this, this.args);
          if (vnode) {
            return this.decorate(vnode, element);
          } else {
            return void 0;
          }
        }
        renderChildren(element, args) {
          const context = args ? new ModelRenderer(this.viewRegistry, this.targetKind, this.postprocessors, Object.assign(Object.assign({}, args), { parentArgs: this.args })) : this;
          return element.children.map((child) => context.renderElement(child)).filter((vnode) => vnode !== void 0);
        }
        postUpdate(cause) {
          this.postprocessors.forEach((processor) => processor.postUpdate(cause));
        }
      };
      exports.ModelRenderer = ModelRenderer;
      var PatcherProvider = class PatcherProvider {
        constructor() {
          this.patcher = (0, snabbdom_1.init)(this.createModules());
        }
        createModules() {
          return [
            snabbdom_1.propsModule,
            snabbdom_1.attributesModule,
            snabbdom_1.classModule,
            snabbdom_1.styleModule,
            snabbdom_1.eventListenersModule
          ];
        }
      };
      PatcherProvider = __decorate([
        (0, inversify_1.injectable)(),
        __metadata("design:paramtypes", [])
      ], PatcherProvider);
      exports.PatcherProvider = PatcherProvider;
      var ModelViewer = class ModelViewer {
        constructor(modelRendererFactory, patcherProvider, postprocessors) {
          this.renderer = modelRendererFactory("main", postprocessors);
          this.patcher = patcherProvider.patcher;
        }
        update(model, cause) {
          this.logger.log(this, "rendering", model);
          const newVDOM = (0, jsx_1.html)("div", { id: this.options.baseDiv }, this.renderer.renderElement(model));
          if (this.lastVDOM !== void 0) {
            const hadFocus = this.hasFocus();
            (0, vnode_utils_1.copyClassesFromVNode)(this.lastVDOM, newVDOM);
            this.lastVDOM = this.patcher.call(this, this.lastVDOM, newVDOM);
            this.restoreFocus(hadFocus);
          } else if (typeof document !== "undefined") {
            const placeholder = document.getElementById(this.options.baseDiv);
            if (placeholder !== null) {
              if (typeof window !== "undefined") {
                window.addEventListener("resize", () => {
                  this.onWindowResize(newVDOM);
                });
              }
              (0, vnode_utils_1.copyClassesFromElement)(placeholder, newVDOM);
              (0, vnode_utils_1.setClass)(newVDOM, this.options.baseClass, true);
              this.lastVDOM = this.patcher.call(this, placeholder, newVDOM);
            } else {
              this.logger.error(this, "element not in DOM:", this.options.baseDiv);
            }
          }
          this.renderer.postUpdate(cause);
        }
        hasFocus() {
          if (typeof document !== "undefined" && document.activeElement && this.lastVDOM.children && this.lastVDOM.children.length > 0) {
            const lastRootVNode = this.lastVDOM.children[0];
            if (typeof lastRootVNode === "object") {
              const lastElement = lastRootVNode.elm;
              return document.activeElement === lastElement;
            }
          }
          return false;
        }
        restoreFocus(focus) {
          if (focus && this.lastVDOM.children && this.lastVDOM.children.length > 0) {
            const lastRootVNode = this.lastVDOM.children[0];
            if (typeof lastRootVNode === "object") {
              const lastElement = lastRootVNode.elm;
              if (lastElement && typeof lastElement.focus === "function")
                lastElement.focus();
            }
          }
        }
        onWindowResize(vdom) {
          const baseDiv = document.getElementById(this.options.baseDiv);
          if (baseDiv !== null) {
            const newBounds = this.getBoundsInPage(baseDiv);
            this.actiondispatcher.dispatch(initialize_canvas_1.InitializeCanvasBoundsAction.create(newBounds));
          }
        }
        getBoundsInPage(element) {
          const bounds = element.getBoundingClientRect();
          const scroll = (0, browser_1.getWindowScroll)();
          return {
            x: bounds.left + scroll.x,
            y: bounds.top + scroll.y,
            width: bounds.width,
            height: bounds.height
          };
        }
      };
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.ViewerOptions),
        __metadata("design:type", Object)
      ], ModelViewer.prototype, "options", void 0);
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.ILogger),
        __metadata("design:type", Object)
      ], ModelViewer.prototype, "logger", void 0);
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.IActionDispatcher),
        __metadata("design:type", Object)
      ], ModelViewer.prototype, "actiondispatcher", void 0);
      ModelViewer = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(types_1.TYPES.ModelRendererFactory)),
        __param(1, (0, inversify_1.inject)(types_1.TYPES.PatcherProvider)),
        __param(2, (0, inversify_1.multiInject)(types_1.TYPES.IVNodePostprocessor)),
        __param(2, (0, inversify_1.optional)()),
        __metadata("design:paramtypes", [Function, PatcherProvider, Array])
      ], ModelViewer);
      exports.ModelViewer = ModelViewer;
      var HiddenModelViewer = class HiddenModelViewer {
        constructor(modelRendererFactory, patcherProvider, hiddenPostprocessors) {
          this.hiddenRenderer = modelRendererFactory("hidden", hiddenPostprocessors);
          this.patcher = patcherProvider.patcher;
        }
        update(hiddenModel, cause) {
          this.logger.log(this, "rendering hidden");
          let newVDOM;
          if (hiddenModel.type === smodel_factory_1.EMPTY_ROOT.type) {
            newVDOM = (0, jsx_1.html)("div", { id: this.options.hiddenDiv });
          } else {
            const hiddenVNode = this.hiddenRenderer.renderElement(hiddenModel);
            if (hiddenVNode) {
              (0, vnode_utils_1.setAttr)(hiddenVNode, "opacity", 0);
            }
            newVDOM = (0, jsx_1.html)("div", { id: this.options.hiddenDiv }, hiddenVNode);
          }
          if (this.lastHiddenVDOM !== void 0) {
            (0, vnode_utils_1.copyClassesFromVNode)(this.lastHiddenVDOM, newVDOM);
            this.lastHiddenVDOM = this.patcher.call(this, this.lastHiddenVDOM, newVDOM);
          } else {
            let placeholder = document.getElementById(this.options.hiddenDiv);
            if (placeholder === null) {
              placeholder = document.createElement("div");
              document.body.appendChild(placeholder);
            } else {
              (0, vnode_utils_1.copyClassesFromElement)(placeholder, newVDOM);
            }
            (0, vnode_utils_1.setClass)(newVDOM, this.options.baseClass, true);
            (0, vnode_utils_1.setClass)(newVDOM, this.options.hiddenClass, true);
            this.lastHiddenVDOM = this.patcher.call(this, placeholder, newVDOM);
          }
          this.hiddenRenderer.postUpdate(cause);
        }
      };
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.ViewerOptions),
        __metadata("design:type", Object)
      ], HiddenModelViewer.prototype, "options", void 0);
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.ILogger),
        __metadata("design:type", Object)
      ], HiddenModelViewer.prototype, "logger", void 0);
      HiddenModelViewer = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(types_1.TYPES.ModelRendererFactory)),
        __param(1, (0, inversify_1.inject)(types_1.TYPES.PatcherProvider)),
        __param(2, (0, inversify_1.multiInject)(types_1.TYPES.HiddenVNodePostprocessor)),
        __param(2, (0, inversify_1.optional)()),
        __metadata("design:paramtypes", [Function, PatcherProvider, Array])
      ], HiddenModelViewer);
      exports.HiddenModelViewer = HiddenModelViewer;
      var PopupModelViewer = class PopupModelViewer {
        constructor(modelRendererFactory, patcherProvider, popupPostprocessors) {
          this.modelRendererFactory = modelRendererFactory;
          this.popupRenderer = this.modelRendererFactory("popup", popupPostprocessors);
          this.patcher = patcherProvider.patcher;
        }
        update(model, cause) {
          this.logger.log(this, "rendering popup", model);
          const popupClosed = model.type === smodel_factory_1.EMPTY_ROOT.type;
          let newVDOM;
          if (popupClosed) {
            newVDOM = (0, jsx_1.html)("div", { id: this.options.popupDiv });
          } else {
            const position = model.canvasBounds;
            const inlineStyle = {
              top: position.y + "px",
              left: position.x + "px"
            };
            newVDOM = (0, jsx_1.html)("div", { id: this.options.popupDiv, style: inlineStyle }, this.popupRenderer.renderElement(model));
          }
          if (this.lastPopupVDOM !== void 0) {
            (0, vnode_utils_1.copyClassesFromVNode)(this.lastPopupVDOM, newVDOM);
            (0, vnode_utils_1.setClass)(newVDOM, this.options.popupClosedClass, popupClosed);
            this.lastPopupVDOM = this.patcher.call(this, this.lastPopupVDOM, newVDOM);
          } else if (typeof document !== "undefined") {
            let placeholder = document.getElementById(this.options.popupDiv);
            if (placeholder === null) {
              placeholder = document.createElement("div");
              document.body.appendChild(placeholder);
            } else {
              (0, vnode_utils_1.copyClassesFromElement)(placeholder, newVDOM);
            }
            (0, vnode_utils_1.setClass)(newVDOM, this.options.popupClass, true);
            (0, vnode_utils_1.setClass)(newVDOM, this.options.popupClosedClass, popupClosed);
            this.lastPopupVDOM = this.patcher.call(this, placeholder, newVDOM);
          }
          this.popupRenderer.postUpdate(cause);
        }
      };
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.ViewerOptions),
        __metadata("design:type", Object)
      ], PopupModelViewer.prototype, "options", void 0);
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.ILogger),
        __metadata("design:type", Object)
      ], PopupModelViewer.prototype, "logger", void 0);
      PopupModelViewer = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(types_1.TYPES.ModelRendererFactory)),
        __param(1, (0, inversify_1.inject)(types_1.TYPES.PatcherProvider)),
        __param(2, (0, inversify_1.multiInject)(types_1.TYPES.PopupVNodePostprocessor)),
        __param(2, (0, inversify_1.optional)()),
        __metadata("design:paramtypes", [Function, PatcherProvider, Array])
      ], PopupModelViewer);
      exports.PopupModelViewer = PopupModelViewer;
    }
  });

  // node_modules/sprotty/lib/base/views/vnode-postprocessor.js
  var require_vnode_postprocessor = __commonJS({
    "node_modules/sprotty/lib/base/views/vnode-postprocessor.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.FocusFixPostprocessor = void 0;
      var inversify_1 = require_inversify();
      var vnode_utils_1 = require_vnode_utils();
      var FocusFixPostprocessor = class FocusFixPostprocessor {
        decorate(vnode, element) {
          if (vnode.sel && vnode.sel.startsWith("svg"))
            (0, vnode_utils_1.setAttr)(vnode, "tabindex", 0);
          return vnode;
        }
        postUpdate() {
        }
      };
      FocusFixPostprocessor = __decorate([
        (0, inversify_1.injectable)()
      ], FocusFixPostprocessor);
      exports.FocusFixPostprocessor = FocusFixPostprocessor;
    }
  });

  // node_modules/sprotty/lib/utils/logging.js
  var require_logging = __commonJS({
    "node_modules/sprotty/lib/utils/logging.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ConsoleLogger = exports.NullLogger = exports.LogLevel = void 0;
      var inversify_1 = require_inversify();
      var types_1 = require_types();
      var LogLevel2;
      (function(LogLevel3) {
        LogLevel3[LogLevel3["none"] = 0] = "none";
        LogLevel3[LogLevel3["error"] = 1] = "error";
        LogLevel3[LogLevel3["warn"] = 2] = "warn";
        LogLevel3[LogLevel3["info"] = 3] = "info";
        LogLevel3[LogLevel3["log"] = 4] = "log";
      })(LogLevel2 = exports.LogLevel || (exports.LogLevel = {}));
      var NullLogger = class NullLogger {
        constructor() {
          this.logLevel = LogLevel2.none;
        }
        error(thisArg, message, ...params) {
        }
        warn(thisArg, message, ...params) {
        }
        info(thisArg, message, ...params) {
        }
        log(thisArg, message, ...params) {
        }
      };
      NullLogger = __decorate([
        (0, inversify_1.injectable)()
      ], NullLogger);
      exports.NullLogger = NullLogger;
      var ConsoleLogger2 = class ConsoleLogger {
        constructor() {
          this.logLevel = LogLevel2.log;
          this.viewOptions = { baseDiv: "" };
        }
        error(thisArg, message, ...params) {
          if (this.logLevel >= LogLevel2.error)
            try {
              console.error.apply(thisArg, this.consoleArguments(thisArg, message, params));
            } catch (error) {
            }
        }
        warn(thisArg, message, ...params) {
          if (this.logLevel >= LogLevel2.warn)
            try {
              console.warn.apply(thisArg, this.consoleArguments(thisArg, message, params));
            } catch (error) {
            }
        }
        info(thisArg, message, ...params) {
          if (this.logLevel >= LogLevel2.info)
            try {
              console.info.apply(thisArg, this.consoleArguments(thisArg, message, params));
            } catch (error) {
            }
        }
        log(thisArg, message, ...params) {
          if (this.logLevel >= LogLevel2.log)
            try {
              console.log.apply(thisArg, this.consoleArguments(thisArg, message, params));
            } catch (error) {
            }
        }
        consoleArguments(thisArg, message, params) {
          let caller;
          if (typeof thisArg === "object")
            caller = thisArg.constructor.name;
          else
            caller = thisArg;
          const date = /* @__PURE__ */ new Date();
          return [date.toLocaleTimeString() + " " + this.viewOptions.baseDiv + " " + caller + ": " + message, ...params];
        }
      };
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.LogLevel),
        __metadata("design:type", Number)
      ], ConsoleLogger2.prototype, "logLevel", void 0);
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.ViewerOptions),
        __metadata("design:type", Object)
      ], ConsoleLogger2.prototype, "viewOptions", void 0);
      ConsoleLogger2 = __decorate([
        (0, inversify_1.injectable)()
      ], ConsoleLogger2);
      exports.ConsoleLogger = ConsoleLogger2;
    }
  });

  // node_modules/sprotty/lib/base/views/id-postprocessor.js
  var require_id_postprocessor = __commonJS({
    "node_modules/sprotty/lib/base/views/id-postprocessor.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.IdPostprocessor = void 0;
      var inversify_1 = require_inversify();
      var types_1 = require_types();
      var dom_helper_1 = require_dom_helper();
      var vnode_utils_1 = require_vnode_utils();
      var IdPostprocessor = class IdPostprocessor {
        decorate(vnode, element) {
          const attrs = (0, vnode_utils_1.getAttrs)(vnode);
          if (attrs.id !== void 0)
            this.logger.warn(vnode, "Overriding id of vnode (" + attrs.id + "). Make sure not to set it manually in view.");
          attrs.id = this.domHelper.createUniqueDOMElementId(element);
          if (!vnode.key)
            vnode.key = element.id;
          return vnode;
        }
        postUpdate() {
        }
      };
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.ILogger),
        __metadata("design:type", Object)
      ], IdPostprocessor.prototype, "logger", void 0);
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.DOMHelper),
        __metadata("design:type", dom_helper_1.DOMHelper)
      ], IdPostprocessor.prototype, "domHelper", void 0);
      IdPostprocessor = __decorate([
        (0, inversify_1.injectable)()
      ], IdPostprocessor);
      exports.IdPostprocessor = IdPostprocessor;
    }
  });

  // node_modules/sprotty/lib/base/views/css-class-postprocessor.js
  var require_css_class_postprocessor = __commonJS({
    "node_modules/sprotty/lib/base/views/css-class-postprocessor.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.CssClassPostprocessor = void 0;
      var model_utils_1 = require_model_utils();
      var vnode_utils_1 = require_vnode_utils();
      var inversify_1 = require_inversify();
      var CssClassPostprocessor = class CssClassPostprocessor {
        decorate(vnode, element) {
          if (element.cssClasses) {
            for (const cssClass of element.cssClasses)
              (0, vnode_utils_1.setClass)(vnode, cssClass, true);
          }
          const subType = (0, model_utils_1.getSubType)(element);
          if (subType && subType !== element.type) {
            (0, vnode_utils_1.setClass)(vnode, subType, true);
          }
          return vnode;
        }
        postUpdate() {
        }
      };
      CssClassPostprocessor = __decorate([
        (0, inversify_1.injectable)()
      ], CssClassPostprocessor);
      exports.CssClassPostprocessor = CssClassPostprocessor;
    }
  });

  // node_modules/sprotty/lib/base/di.config.js
  var require_di_config = __commonJS({
    "node_modules/sprotty/lib/base/di.config.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var inversify_1 = require_inversify();
      var types_1 = require_types();
      var initialize_canvas_1 = require_initialize_canvas();
      var logging_1 = require_logging();
      var action_dispatcher_1 = require_action_dispatcher();
      var action_handler_1 = require_action_handler();
      var command_stack_1 = require_command_stack();
      var smodel_factory_1 = require_smodel_factory();
      var animation_frame_syncer_1 = require_animation_frame_syncer();
      var viewer_1 = require_viewer();
      var viewer_options_1 = require_viewer_options();
      var mouse_tool_1 = require_mouse_tool();
      var key_tool_1 = require_key_tool();
      var vnode_postprocessor_1 = require_vnode_postprocessor();
      var view_1 = require_view();
      var viewer_cache_1 = require_viewer_cache();
      var dom_helper_1 = require_dom_helper();
      var id_postprocessor_1 = require_id_postprocessor();
      var command_registration_1 = require_command_registration();
      var css_class_postprocessor_1 = require_css_class_postprocessor();
      var tool_manager_1 = require_tool_manager();
      var tool_1 = require_tool();
      var set_model_1 = require_set_model();
      var ui_extension_registry_1 = require_ui_extension_registry();
      var diagram_locker_1 = require_diagram_locker();
      var defaultContainerModule = new inversify_1.ContainerModule((bind, _unbind, isBound) => {
        bind(types_1.TYPES.ILogger).to(logging_1.NullLogger).inSingletonScope();
        bind(types_1.TYPES.LogLevel).toConstantValue(logging_1.LogLevel.warn);
        bind(types_1.TYPES.SModelRegistry).to(smodel_factory_1.SModelRegistry).inSingletonScope();
        bind(action_handler_1.ActionHandlerRegistry).toSelf().inSingletonScope();
        bind(types_1.TYPES.ActionHandlerRegistryProvider).toProvider((ctx) => {
          return () => {
            return new Promise((resolve) => {
              resolve(ctx.container.get(action_handler_1.ActionHandlerRegistry));
            });
          };
        });
        bind(types_1.TYPES.ViewRegistry).to(view_1.ViewRegistry).inSingletonScope();
        bind(types_1.TYPES.IModelFactory).to(smodel_factory_1.SModelFactory).inSingletonScope();
        bind(types_1.TYPES.IActionDispatcher).to(action_dispatcher_1.ActionDispatcher).inSingletonScope();
        bind(types_1.TYPES.IActionDispatcherProvider).toProvider((ctx) => {
          return () => {
            return new Promise((resolve) => {
              resolve(ctx.container.get(types_1.TYPES.IActionDispatcher));
            });
          };
        });
        bind(types_1.TYPES.IDiagramLocker).to(diagram_locker_1.DefaultDiagramLocker).inSingletonScope();
        bind(types_1.TYPES.IActionHandlerInitializer).to(command_registration_1.CommandActionHandlerInitializer);
        bind(types_1.TYPES.ICommandStack).to(command_stack_1.CommandStack).inSingletonScope();
        bind(types_1.TYPES.ICommandStackProvider).toProvider((ctx) => {
          return () => {
            return new Promise((resolve) => {
              resolve(ctx.container.get(types_1.TYPES.ICommandStack));
            });
          };
        });
        bind(types_1.TYPES.CommandStackOptions).toConstantValue({
          defaultDuration: 250,
          undoHistoryLimit: 50
        });
        bind(viewer_1.ModelViewer).toSelf().inSingletonScope();
        bind(viewer_1.HiddenModelViewer).toSelf().inSingletonScope();
        bind(viewer_1.PopupModelViewer).toSelf().inSingletonScope();
        bind(types_1.TYPES.ModelViewer).toDynamicValue((ctx) => {
          const container = ctx.container.createChild();
          container.bind(types_1.TYPES.IViewer).toService(viewer_1.ModelViewer);
          container.bind(viewer_cache_1.ViewerCache).toSelf();
          return container.get(viewer_cache_1.ViewerCache);
        }).inSingletonScope();
        bind(types_1.TYPES.PopupModelViewer).toDynamicValue((ctx) => {
          const container = ctx.container.createChild();
          container.bind(types_1.TYPES.IViewer).toService(viewer_1.PopupModelViewer);
          container.bind(viewer_cache_1.ViewerCache).toSelf();
          return container.get(viewer_cache_1.ViewerCache);
        }).inSingletonScope();
        bind(types_1.TYPES.HiddenModelViewer).toService(viewer_1.HiddenModelViewer);
        bind(types_1.TYPES.IViewerProvider).toDynamicValue((ctx) => {
          return {
            get modelViewer() {
              return ctx.container.get(types_1.TYPES.ModelViewer);
            },
            get hiddenModelViewer() {
              return ctx.container.get(types_1.TYPES.HiddenModelViewer);
            },
            get popupModelViewer() {
              return ctx.container.get(types_1.TYPES.PopupModelViewer);
            }
          };
        });
        bind(types_1.TYPES.ViewerOptions).toConstantValue((0, viewer_options_1.defaultViewerOptions)());
        bind(types_1.TYPES.PatcherProvider).to(viewer_1.PatcherProvider).inSingletonScope();
        bind(types_1.TYPES.DOMHelper).to(dom_helper_1.DOMHelper).inSingletonScope();
        bind(types_1.TYPES.ModelRendererFactory).toFactory((ctx) => {
          return (targetKind, processors, args = {}) => {
            const viewRegistry = ctx.container.get(types_1.TYPES.ViewRegistry);
            return new viewer_1.ModelRenderer(viewRegistry, targetKind, processors, args);
          };
        });
        bind(id_postprocessor_1.IdPostprocessor).toSelf().inSingletonScope();
        bind(types_1.TYPES.IVNodePostprocessor).toService(id_postprocessor_1.IdPostprocessor);
        bind(types_1.TYPES.HiddenVNodePostprocessor).toService(id_postprocessor_1.IdPostprocessor);
        bind(css_class_postprocessor_1.CssClassPostprocessor).toSelf().inSingletonScope();
        bind(types_1.TYPES.IVNodePostprocessor).toService(css_class_postprocessor_1.CssClassPostprocessor);
        bind(types_1.TYPES.HiddenVNodePostprocessor).toService(css_class_postprocessor_1.CssClassPostprocessor);
        bind(mouse_tool_1.MouseTool).toSelf().inSingletonScope();
        bind(types_1.TYPES.IVNodePostprocessor).toService(mouse_tool_1.MouseTool);
        bind(key_tool_1.KeyTool).toSelf().inSingletonScope();
        bind(types_1.TYPES.IVNodePostprocessor).toService(key_tool_1.KeyTool);
        bind(vnode_postprocessor_1.FocusFixPostprocessor).toSelf().inSingletonScope();
        bind(types_1.TYPES.IVNodePostprocessor).toService(vnode_postprocessor_1.FocusFixPostprocessor);
        bind(types_1.TYPES.PopupVNodePostprocessor).toService(id_postprocessor_1.IdPostprocessor);
        bind(mouse_tool_1.PopupMouseTool).toSelf().inSingletonScope();
        bind(types_1.TYPES.PopupVNodePostprocessor).toService(mouse_tool_1.PopupMouseTool);
        bind(types_1.TYPES.AnimationFrameSyncer).to(animation_frame_syncer_1.AnimationFrameSyncer).inSingletonScope();
        const context = { bind, isBound };
        (0, command_registration_1.configureCommand)(context, initialize_canvas_1.InitializeCanvasBoundsCommand);
        bind(initialize_canvas_1.CanvasBoundsInitializer).toSelf().inSingletonScope();
        bind(types_1.TYPES.IVNodePostprocessor).toService(initialize_canvas_1.CanvasBoundsInitializer);
        (0, command_registration_1.configureCommand)(context, set_model_1.SetModelCommand);
        bind(types_1.TYPES.IToolManager).to(tool_manager_1.ToolManager).inSingletonScope();
        bind(tool_manager_1.DefaultToolsEnablingKeyListener).toSelf().inSingletonScope();
        bind(types_1.TYPES.KeyListener).toService(tool_manager_1.DefaultToolsEnablingKeyListener);
        bind(tool_manager_1.ToolManagerActionHandler).toSelf().inSingletonScope();
        (0, action_handler_1.configureActionHandler)(context, tool_1.EnableDefaultToolsAction.KIND, tool_manager_1.ToolManagerActionHandler);
        (0, action_handler_1.configureActionHandler)(context, tool_1.EnableToolsAction.KIND, tool_manager_1.ToolManagerActionHandler);
        bind(types_1.TYPES.UIExtensionRegistry).to(ui_extension_registry_1.UIExtensionRegistry).inSingletonScope();
        (0, command_registration_1.configureCommand)(context, ui_extension_registry_1.SetUIExtensionVisibilityCommand);
        bind(mouse_tool_1.MousePositionTracker).toSelf().inSingletonScope();
        bind(types_1.TYPES.MouseListener).toService(mouse_tool_1.MousePositionTracker);
      });
      exports.default = defaultContainerModule;
    }
  });

  // node_modules/sprotty/lib/features/bounds/model.js
  var require_model2 = __commonJS({
    "node_modules/sprotty/lib/features/bounds/model.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SShapeElement = exports.findChildrenAtPosition = exports.getAbsoluteClientBounds = exports.getAbsoluteBounds = exports.isAlignable = exports.isSizeable = exports.isLayoutableChild = exports.isLayoutContainer = exports.isBoundsAware = exports.alignFeature = exports.layoutableChildFeature = exports.layoutContainerFeature = exports.boundsFeature = void 0;
      var geometry_1 = require_geometry();
      var smodel_1 = require_smodel();
      var smodel_utils_1 = require_smodel_utils();
      var browser_1 = require_browser();
      exports.boundsFeature = Symbol("boundsFeature");
      exports.layoutContainerFeature = Symbol("layoutContainerFeature");
      exports.layoutableChildFeature = Symbol("layoutableChildFeature");
      exports.alignFeature = Symbol("alignFeature");
      function isBoundsAware(element) {
        return "bounds" in element;
      }
      exports.isBoundsAware = isBoundsAware;
      function isLayoutContainer(element) {
        return isBoundsAware(element) && element.hasFeature(exports.layoutContainerFeature) && "layout" in element;
      }
      exports.isLayoutContainer = isLayoutContainer;
      function isLayoutableChild(element) {
        return isBoundsAware(element) && element.hasFeature(exports.layoutableChildFeature);
      }
      exports.isLayoutableChild = isLayoutableChild;
      function isSizeable(element) {
        return element.hasFeature(exports.boundsFeature) && isBoundsAware(element);
      }
      exports.isSizeable = isSizeable;
      function isAlignable(element) {
        return element.hasFeature(exports.alignFeature) && "alignment" in element;
      }
      exports.isAlignable = isAlignable;
      function getAbsoluteBounds(element) {
        const boundsAware = (0, smodel_utils_1.findParentByFeature)(element, isBoundsAware);
        if (boundsAware !== void 0) {
          let bounds = boundsAware.bounds;
          let current = boundsAware;
          while (current instanceof smodel_1.SChildElement) {
            const parent = current.parent;
            bounds = parent.localToParent(bounds);
            current = parent;
          }
          return bounds;
        } else if (element instanceof smodel_1.SModelRoot) {
          const canvasBounds = element.canvasBounds;
          return { x: 0, y: 0, width: canvasBounds.width, height: canvasBounds.height };
        } else {
          return geometry_1.Bounds.EMPTY;
        }
      }
      exports.getAbsoluteBounds = getAbsoluteBounds;
      function getAbsoluteClientBounds(element, domHelper, viewerOptions) {
        let x = 0;
        let y = 0;
        let width = 0;
        let height = 0;
        const svgElementId = domHelper.createUniqueDOMElementId(element);
        const svgElement = document.getElementById(svgElementId);
        if (svgElement) {
          const rect = svgElement.getBoundingClientRect();
          const scroll = (0, browser_1.getWindowScroll)();
          x = rect.left + scroll.x;
          y = rect.top + scroll.y;
          width = rect.width;
          height = rect.height;
        }
        let container = document.getElementById(viewerOptions.baseDiv);
        if (container) {
          while (container.offsetParent instanceof HTMLElement && (container = container.offsetParent)) {
            x -= container.offsetLeft;
            y -= container.offsetTop;
          }
        }
        return { x, y, width, height };
      }
      exports.getAbsoluteClientBounds = getAbsoluteClientBounds;
      function findChildrenAtPosition(parent, point) {
        const matches = [];
        doFindChildrenAtPosition(parent, point, matches);
        return matches;
      }
      exports.findChildrenAtPosition = findChildrenAtPosition;
      function doFindChildrenAtPosition(parent, point, matches) {
        parent.children.forEach((child) => {
          if (isBoundsAware(child) && geometry_1.Bounds.includes(child.bounds, point))
            matches.push(child);
          if (child instanceof smodel_1.SParentElement) {
            const newPoint = child.parentToLocal(point);
            doFindChildrenAtPosition(child, newPoint, matches);
          }
        });
      }
      var SShapeElement = class extends smodel_1.SChildElement {
        constructor() {
          super(...arguments);
          this.position = geometry_1.Point.ORIGIN;
          this.size = geometry_1.Dimension.EMPTY;
        }
        get bounds() {
          return {
            x: this.position.x,
            y: this.position.y,
            width: this.size.width,
            height: this.size.height
          };
        }
        set bounds(newBounds) {
          this.position = {
            x: newBounds.x,
            y: newBounds.y
          };
          this.size = {
            width: newBounds.width,
            height: newBounds.height
          };
        }
        localToParent(point) {
          const result = {
            x: point.x + this.position.x,
            y: point.y + this.position.y,
            width: -1,
            height: -1
          };
          if ((0, geometry_1.isBounds)(point)) {
            result.width = point.width;
            result.height = point.height;
          }
          return result;
        }
        parentToLocal(point) {
          const result = {
            x: point.x - this.position.x,
            y: point.y - this.position.y,
            width: -1,
            height: -1
          };
          if ((0, geometry_1.isBounds)(point)) {
            result.width = point.width;
            result.height = point.height;
          }
          return result;
        }
      };
      exports.SShapeElement = SShapeElement;
    }
  });

  // node_modules/sprotty/lib/features/bounds/bounds-manipulation.js
  var require_bounds_manipulation = __commonJS({
    "node_modules/sprotty/lib/features/bounds/bounds-manipulation.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      });
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      var __param = exports && exports.__param || function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.RequestBoundsCommand = exports.SetBoundsCommand = exports.LayoutAction = exports.ComputedBoundsAction = exports.RequestBoundsAction = exports.SetBoundsAction = void 0;
      var inversify_1 = require_inversify();
      var actions_1 = require_actions();
      var protocol = __importStar(require_actions());
      var command_1 = require_command();
      var types_1 = require_types();
      var model_1 = require_model2();
      var SetBoundsAction = class {
        constructor(bounds) {
          this.bounds = bounds;
          this.kind = SetBoundsAction.KIND;
        }
      };
      exports.SetBoundsAction = SetBoundsAction;
      SetBoundsAction.KIND = "setBounds";
      var RequestBoundsAction = class {
        constructor(newRoot, requestId = "") {
          this.newRoot = newRoot;
          this.requestId = requestId;
          this.kind = RequestBoundsAction.KIND;
        }
        /** Factory function to dispatch a request with the `IActionDispatcher` */
        static create(newRoot) {
          return new RequestBoundsAction(newRoot, (0, actions_1.generateRequestId)());
        }
      };
      exports.RequestBoundsAction = RequestBoundsAction;
      RequestBoundsAction.KIND = "requestBounds";
      var ComputedBoundsAction = class {
        constructor(bounds, revision, alignments, responseId = "") {
          this.bounds = bounds;
          this.revision = revision;
          this.alignments = alignments;
          this.responseId = responseId;
          this.kind = ComputedBoundsAction.KIND;
        }
      };
      exports.ComputedBoundsAction = ComputedBoundsAction;
      ComputedBoundsAction.KIND = "computedBounds";
      var LayoutAction = class {
        constructor() {
          this.kind = LayoutAction.KIND;
        }
      };
      exports.LayoutAction = LayoutAction;
      LayoutAction.KIND = "layout";
      var SetBoundsCommand = class SetBoundsCommand extends command_1.SystemCommand {
        constructor(action) {
          super();
          this.action = action;
          this.bounds = [];
        }
        execute(context) {
          this.action.bounds.forEach((b) => {
            const element = context.root.index.getById(b.elementId);
            if (element && (0, model_1.isBoundsAware)(element)) {
              this.bounds.push({
                element,
                oldBounds: element.bounds,
                newPosition: b.newPosition,
                newSize: b.newSize
              });
            }
          });
          return this.redo(context);
        }
        undo(context) {
          this.bounds.forEach((b) => b.element.bounds = b.oldBounds);
          return context.root;
        }
        redo(context) {
          this.bounds.forEach((b) => {
            if (b.newPosition)
              b.element.bounds = Object.assign(Object.assign({}, b.newPosition), b.newSize);
            else
              b.element.bounds = Object.assign({ x: b.element.bounds.x, y: b.element.bounds.y }, b.newSize);
          });
          return context.root;
        }
      };
      SetBoundsCommand.KIND = protocol.SetBoundsAction.KIND;
      SetBoundsCommand = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(types_1.TYPES.Action)),
        __metadata("design:paramtypes", [Object])
      ], SetBoundsCommand);
      exports.SetBoundsCommand = SetBoundsCommand;
      var RequestBoundsCommand = class RequestBoundsCommand extends command_1.HiddenCommand {
        constructor(action) {
          super();
          this.action = action;
        }
        execute(context) {
          return {
            model: context.modelFactory.createRoot(this.action.newRoot),
            modelChanged: true,
            cause: this.action
          };
        }
        get blockUntil() {
          return (action) => action.kind === ComputedBoundsAction.KIND;
        }
      };
      RequestBoundsCommand.KIND = protocol.RequestBoundsAction.KIND;
      RequestBoundsCommand = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(types_1.TYPES.Action)),
        __metadata("design:paramtypes", [Object])
      ], RequestBoundsCommand);
      exports.RequestBoundsCommand = RequestBoundsCommand;
    }
  });

  // node_modules/sprotty/lib/features/bounds/layout.js
  var require_layout = __commonJS({
    "node_modules/sprotty/lib/features/bounds/layout.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      var __param = exports && exports.__param || function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.configureLayout = exports.StatefulLayouter = exports.Layouter = exports.LayoutRegistry = void 0;
      var inversify_1 = require_inversify();
      var geometry_1 = require_geometry();
      var types_1 = require_types();
      var registry_1 = require_registry();
      var model_1 = require_model2();
      var inversify_2 = require_inversify2();
      var LayoutRegistry = class LayoutRegistry extends registry_1.InstanceRegistry {
        constructor(layouts = []) {
          super();
          layouts.forEach((layout) => {
            if (this.hasKey(layout.layoutKind)) {
              this.logger.warn("Layout kind is already defined: ", layout.layoutKind);
            } else {
              this.register(layout.layoutKind, layout.factory());
            }
          });
        }
      };
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.ILogger),
        __metadata("design:type", Object)
      ], LayoutRegistry.prototype, "logger", void 0);
      LayoutRegistry = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.multiInject)(types_1.TYPES.LayoutRegistration)),
        __param(0, (0, inversify_1.optional)()),
        __metadata("design:paramtypes", [Array])
      ], LayoutRegistry);
      exports.LayoutRegistry = LayoutRegistry;
      var Layouter = class Layouter {
        layout(element2boundsData) {
          new StatefulLayouter(element2boundsData, this.layoutRegistry, this.logger).layout();
        }
      };
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.LayoutRegistry),
        __metadata("design:type", LayoutRegistry)
      ], Layouter.prototype, "layoutRegistry", void 0);
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.ILogger),
        __metadata("design:type", Object)
      ], Layouter.prototype, "logger", void 0);
      Layouter = __decorate([
        (0, inversify_1.injectable)()
      ], Layouter);
      exports.Layouter = Layouter;
      var StatefulLayouter = class {
        constructor(element2boundsData, layoutRegistry, log) {
          this.element2boundsData = element2boundsData;
          this.layoutRegistry = layoutRegistry;
          this.log = log;
          this.toBeLayouted = [];
          element2boundsData.forEach((data, element) => {
            if ((0, model_1.isLayoutContainer)(element))
              this.toBeLayouted.push(element);
          });
        }
        getBoundsData(element) {
          let boundsData = this.element2boundsData.get(element);
          let bounds = element.bounds;
          if ((0, model_1.isLayoutContainer)(element) && this.toBeLayouted.indexOf(element) >= 0) {
            bounds = this.doLayout(element);
          }
          if (!boundsData) {
            boundsData = {
              bounds,
              boundsChanged: false,
              alignmentChanged: false
            };
            this.element2boundsData.set(element, boundsData);
          }
          return boundsData;
        }
        layout() {
          while (this.toBeLayouted.length > 0) {
            const element = this.toBeLayouted[0];
            this.doLayout(element);
          }
        }
        doLayout(element) {
          const index = this.toBeLayouted.indexOf(element);
          if (index >= 0)
            this.toBeLayouted.splice(index, 1);
          const layout = this.layoutRegistry.get(element.layout);
          if (layout)
            layout.layout(element, this);
          const boundsData = this.element2boundsData.get(element);
          if (boundsData !== void 0 && boundsData.bounds !== void 0) {
            return boundsData.bounds;
          } else {
            this.log.error(element, "Layout failed");
            return geometry_1.Bounds.EMPTY;
          }
        }
      };
      exports.StatefulLayouter = StatefulLayouter;
      function configureLayout(context, kind, constr) {
        if (typeof constr === "function") {
          if (!(0, inversify_2.isInjectable)(constr)) {
            throw new Error(`Layouts be @injectable: ${constr.name}`);
          }
          if (!context.isBound(constr)) {
            context.bind(constr).toSelf();
          }
        }
        context.bind(types_1.TYPES.LayoutRegistration).toDynamicValue((ctx) => ({
          layoutKind: kind,
          factory: () => ctx.container.get(constr)
        }));
      }
      exports.configureLayout = configureLayout;
    }
  });

  // node_modules/sprotty/lib/features/bounds/hidden-bounds-updater.js
  var require_hidden_bounds_updater = __commonJS({
    "node_modules/sprotty/lib/features/bounds/hidden-bounds-updater.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.HiddenBoundsUpdater = exports.BoundsData = void 0;
      var inversify_1 = require_inversify();
      var actions_1 = require_actions();
      var geometry_1 = require_geometry();
      var smodel_1 = require_smodel();
      var types_1 = require_types();
      var layout_1 = require_layout();
      var model_1 = require_model2();
      var BoundsData = class {
      };
      exports.BoundsData = BoundsData;
      var HiddenBoundsUpdater = class HiddenBoundsUpdater {
        constructor() {
          this.element2boundsData = /* @__PURE__ */ new Map();
        }
        decorate(vnode, element) {
          if ((0, model_1.isSizeable)(element) || (0, model_1.isLayoutContainer)(element)) {
            this.element2boundsData.set(element, {
              vnode,
              bounds: element.bounds,
              boundsChanged: false,
              alignmentChanged: false
            });
          }
          if (element instanceof smodel_1.SModelRoot)
            this.root = element;
          return vnode;
        }
        postUpdate(cause) {
          if (cause === void 0 || cause.kind !== actions_1.RequestBoundsAction.KIND) {
            return;
          }
          const request = cause;
          this.getBoundsFromDOM();
          this.layouter.layout(this.element2boundsData);
          const resizes = [];
          const alignments = [];
          this.element2boundsData.forEach((boundsData, element) => {
            if (boundsData.boundsChanged && boundsData.bounds !== void 0) {
              const resize = {
                elementId: element.id,
                newSize: {
                  width: boundsData.bounds.width,
                  height: boundsData.bounds.height
                }
              };
              if (element instanceof smodel_1.SChildElement && (0, model_1.isLayoutContainer)(element.parent)) {
                resize.newPosition = {
                  x: boundsData.bounds.x,
                  y: boundsData.bounds.y
                };
              }
              resizes.push(resize);
            }
            if (boundsData.alignmentChanged && boundsData.alignment !== void 0) {
              alignments.push({
                elementId: element.id,
                newAlignment: boundsData.alignment
              });
            }
          });
          const revision = this.root !== void 0 ? this.root.revision : void 0;
          this.actionDispatcher.dispatch(actions_1.ComputedBoundsAction.create(resizes, { revision, alignments, requestId: request.requestId }));
          this.element2boundsData.clear();
        }
        getBoundsFromDOM() {
          this.element2boundsData.forEach((boundsData, element) => {
            if (boundsData.bounds && (0, model_1.isSizeable)(element)) {
              const vnode = boundsData.vnode;
              if (vnode && vnode.elm) {
                const boundingBox = this.getBounds(vnode.elm, element);
                if ((0, model_1.isAlignable)(element) && !((0, geometry_1.almostEquals)(boundingBox.x, 0) && (0, geometry_1.almostEquals)(boundingBox.y, 0))) {
                  boundsData.alignment = {
                    x: -boundingBox.x,
                    y: -boundingBox.y
                  };
                  boundsData.alignmentChanged = true;
                }
                const newBounds = {
                  x: element.bounds.x,
                  y: element.bounds.y,
                  width: boundingBox.width,
                  height: boundingBox.height
                };
                if (!((0, geometry_1.almostEquals)(newBounds.x, element.bounds.x) && (0, geometry_1.almostEquals)(newBounds.y, element.bounds.y) && (0, geometry_1.almostEquals)(newBounds.width, element.bounds.width) && (0, geometry_1.almostEquals)(newBounds.height, element.bounds.height))) {
                  boundsData.bounds = newBounds;
                  boundsData.boundsChanged = true;
                }
              }
            }
          });
        }
        getBounds(elm, element) {
          if (typeof elm.getBBox !== "function") {
            this.logger.error(this, "Not an SVG element:", elm);
            return geometry_1.Bounds.EMPTY;
          }
          const bounds = elm.getBBox();
          return {
            x: bounds.x,
            y: bounds.y,
            width: bounds.width,
            height: bounds.height
          };
        }
      };
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.ILogger),
        __metadata("design:type", Object)
      ], HiddenBoundsUpdater.prototype, "logger", void 0);
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.IActionDispatcher),
        __metadata("design:type", Object)
      ], HiddenBoundsUpdater.prototype, "actionDispatcher", void 0);
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.Layouter),
        __metadata("design:type", layout_1.Layouter)
      ], HiddenBoundsUpdater.prototype, "layouter", void 0);
      HiddenBoundsUpdater = __decorate([
        (0, inversify_1.injectable)()
      ], HiddenBoundsUpdater);
      exports.HiddenBoundsUpdater = HiddenBoundsUpdater;
    }
  });

  // node_modules/sprotty/lib/features/bounds/abstract-layout.js
  var require_abstract_layout = __commonJS({
    "node_modules/sprotty/lib/features/bounds/abstract-layout.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.AbstractLayout = void 0;
      var geometry_1 = require_geometry();
      var smodel_1 = require_smodel();
      var model_1 = require_model2();
      var inversify_1 = require_inversify();
      var AbstractLayout = class AbstractLayout {
        layout(container, layouter) {
          const boundsData = layouter.getBoundsData(container);
          const options = this.getLayoutOptions(container);
          const childrenSize = this.getChildrenSize(container, options, layouter);
          const maxWidth = options.paddingFactor * (options.resizeContainer ? childrenSize.width : Math.max(0, this.getFixedContainerBounds(container, options, layouter).width) - options.paddingLeft - options.paddingRight);
          const maxHeight = options.paddingFactor * (options.resizeContainer ? childrenSize.height : Math.max(0, this.getFixedContainerBounds(container, options, layouter).height) - options.paddingTop - options.paddingBottom);
          if (maxWidth > 0 && maxHeight > 0) {
            const offset = this.layoutChildren(container, layouter, options, maxWidth, maxHeight);
            boundsData.bounds = this.getFinalContainerBounds(container, offset, options, maxWidth, maxHeight);
            boundsData.boundsChanged = true;
          }
        }
        getFinalContainerBounds(container, lastOffset, options, maxWidth, maxHeight) {
          return {
            x: container.bounds.x,
            y: container.bounds.y,
            width: Math.max(options.minWidth, maxWidth + options.paddingLeft + options.paddingRight),
            height: Math.max(options.minHeight, maxHeight + options.paddingTop + options.paddingBottom)
          };
        }
        getFixedContainerBounds(container, layoutOptions, layouter) {
          let currentContainer = container;
          while (true) {
            if ((0, model_1.isBoundsAware)(currentContainer)) {
              const bounds = currentContainer.bounds;
              if ((0, model_1.isLayoutContainer)(currentContainer) && layoutOptions.resizeContainer)
                layouter.log.error(currentContainer, "Resizable container found while detecting fixed bounds");
              if (geometry_1.Dimension.isValid(bounds))
                return bounds;
            }
            if (currentContainer instanceof smodel_1.SChildElement) {
              currentContainer = currentContainer.parent;
            } else {
              layouter.log.error(currentContainer, "Cannot detect fixed bounds");
              return geometry_1.Bounds.EMPTY;
            }
          }
        }
        layoutChildren(container, layouter, containerOptions, maxWidth, maxHeight) {
          let currentOffset = {
            x: containerOptions.paddingLeft + 0.5 * (maxWidth - maxWidth / containerOptions.paddingFactor),
            y: containerOptions.paddingTop + 0.5 * (maxHeight - maxHeight / containerOptions.paddingFactor)
          };
          container.children.forEach((child) => {
            if ((0, model_1.isLayoutableChild)(child)) {
              const boundsData = layouter.getBoundsData(child);
              const bounds = boundsData.bounds;
              const childOptions = this.getChildLayoutOptions(child, containerOptions);
              if (bounds !== void 0 && geometry_1.Dimension.isValid(bounds)) {
                currentOffset = this.layoutChild(child, boundsData, bounds, childOptions, containerOptions, currentOffset, maxWidth, maxHeight);
              }
            }
          });
          return currentOffset;
        }
        getDx(hAlign, bounds, maxWidth) {
          switch (hAlign) {
            case "left":
              return 0;
            case "center":
              return 0.5 * (maxWidth - bounds.width);
            case "right":
              return maxWidth - bounds.width;
          }
        }
        getDy(vAlign, bounds, maxHeight) {
          switch (vAlign) {
            case "top":
              return 0;
            case "center":
              return 0.5 * (maxHeight - bounds.height);
            case "bottom":
              return maxHeight - bounds.height;
          }
        }
        getChildLayoutOptions(child, containerOptions) {
          const layoutOptions = child.layoutOptions;
          if (layoutOptions === void 0)
            return containerOptions;
          else
            return this.spread(containerOptions, layoutOptions);
        }
        getLayoutOptions(element) {
          let current = element;
          const allOptions = [];
          while (current !== void 0) {
            const layoutOptions = current.layoutOptions;
            if (layoutOptions !== void 0)
              allOptions.push(layoutOptions);
            if (current instanceof smodel_1.SChildElement)
              current = current.parent;
            else
              break;
          }
          return allOptions.reverse().reduce((a, b) => {
            return this.spread(a, b);
          }, this.getDefaultLayoutOptions());
        }
      };
      AbstractLayout = __decorate([
        (0, inversify_1.injectable)()
      ], AbstractLayout);
      exports.AbstractLayout = AbstractLayout;
    }
  });

  // node_modules/sprotty/lib/features/bounds/vbox-layout.js
  var require_vbox_layout = __commonJS({
    "node_modules/sprotty/lib/features/bounds/vbox-layout.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.VBoxLayouter = void 0;
      var inversify_1 = require_inversify();
      var geometry_1 = require_geometry();
      var abstract_layout_1 = require_abstract_layout();
      var model_1 = require_model2();
      var VBoxLayouter = class VBoxLayouter extends abstract_layout_1.AbstractLayout {
        getChildrenSize(container, containerOptions, layouter) {
          let maxWidth = -1;
          let maxHeight = 0;
          let isFirst = true;
          container.children.forEach((child) => {
            if ((0, model_1.isLayoutableChild)(child)) {
              const bounds = layouter.getBoundsData(child).bounds;
              if (bounds !== void 0 && geometry_1.Dimension.isValid(bounds)) {
                maxHeight += bounds.height;
                if (isFirst)
                  isFirst = false;
                else
                  maxHeight += containerOptions.vGap;
                maxWidth = Math.max(maxWidth, bounds.width);
              }
            }
          });
          return {
            width: maxWidth,
            height: maxHeight
          };
        }
        layoutChild(child, boundsData, bounds, childOptions, containerOptions, currentOffset, maxWidth, maxHeight) {
          const dx = this.getDx(childOptions.hAlign, bounds, maxWidth);
          boundsData.bounds = {
            x: containerOptions.paddingLeft + child.bounds.x - bounds.x + dx,
            y: currentOffset.y + child.bounds.y - bounds.y,
            width: bounds.width,
            height: bounds.height
          };
          boundsData.boundsChanged = true;
          return {
            x: currentOffset.x,
            y: currentOffset.y + bounds.height + containerOptions.vGap
          };
        }
        getDefaultLayoutOptions() {
          return {
            resizeContainer: true,
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 5,
            paddingRight: 5,
            paddingFactor: 1,
            vGap: 1,
            hAlign: "center",
            minWidth: 0,
            minHeight: 0
          };
        }
        spread(a, b) {
          return Object.assign(Object.assign({}, a), b);
        }
      };
      VBoxLayouter.KIND = "vbox";
      VBoxLayouter = __decorate([
        (0, inversify_1.injectable)()
      ], VBoxLayouter);
      exports.VBoxLayouter = VBoxLayouter;
    }
  });

  // node_modules/sprotty/lib/features/bounds/hbox-layout.js
  var require_hbox_layout = __commonJS({
    "node_modules/sprotty/lib/features/bounds/hbox-layout.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.HBoxLayouter = void 0;
      var inversify_1 = require_inversify();
      var geometry_1 = require_geometry();
      var abstract_layout_1 = require_abstract_layout();
      var model_1 = require_model2();
      var HBoxLayouter = class HBoxLayouter extends abstract_layout_1.AbstractLayout {
        getChildrenSize(container, containerOptions, layouter) {
          let maxWidth = 0;
          let maxHeight = -1;
          let isFirst = true;
          container.children.forEach((child) => {
            if ((0, model_1.isLayoutableChild)(child)) {
              const bounds = layouter.getBoundsData(child).bounds;
              if (bounds !== void 0 && geometry_1.Dimension.isValid(bounds)) {
                if (isFirst)
                  isFirst = false;
                else
                  maxWidth += containerOptions.hGap;
                maxWidth += bounds.width;
                maxHeight = Math.max(maxHeight, bounds.height);
              }
            }
          });
          return {
            width: maxWidth,
            height: maxHeight
          };
        }
        layoutChild(child, boundsData, bounds, childOptions, containerOptions, currentOffset, maxWidth, maxHeight) {
          const dy = this.getDy(childOptions.vAlign, bounds, maxHeight);
          boundsData.bounds = {
            x: currentOffset.x + child.bounds.x - bounds.x,
            y: containerOptions.paddingTop + child.bounds.y - bounds.y + dy,
            width: bounds.width,
            height: bounds.height
          };
          boundsData.boundsChanged = true;
          return {
            x: currentOffset.x + bounds.width + containerOptions.hGap,
            y: currentOffset.y
          };
        }
        getDefaultLayoutOptions() {
          return {
            resizeContainer: true,
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 5,
            paddingRight: 5,
            paddingFactor: 1,
            hGap: 1,
            vAlign: "center",
            minWidth: 0,
            minHeight: 0
          };
        }
        spread(a, b) {
          return Object.assign(Object.assign({}, a), b);
        }
      };
      HBoxLayouter.KIND = "hbox";
      HBoxLayouter = __decorate([
        (0, inversify_1.injectable)()
      ], HBoxLayouter);
      exports.HBoxLayouter = HBoxLayouter;
    }
  });

  // node_modules/sprotty/lib/features/bounds/stack-layout.js
  var require_stack_layout = __commonJS({
    "node_modules/sprotty/lib/features/bounds/stack-layout.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.StackLayouter = void 0;
      var inversify_1 = require_inversify();
      var geometry_1 = require_geometry();
      var abstract_layout_1 = require_abstract_layout();
      var model_1 = require_model2();
      var StackLayouter = class StackLayouter extends abstract_layout_1.AbstractLayout {
        getChildrenSize(container, options, layouter) {
          let maxWidth = -1;
          let maxHeight = -1;
          container.children.forEach((child) => {
            if ((0, model_1.isLayoutableChild)(child)) {
              const bounds = layouter.getBoundsData(child).bounds;
              if (bounds !== void 0 && geometry_1.Dimension.isValid(bounds)) {
                maxWidth = Math.max(maxWidth, bounds.width);
                maxHeight = Math.max(maxHeight, bounds.height);
              }
            }
          });
          return {
            width: maxWidth,
            height: maxHeight
          };
        }
        layoutChild(child, boundsData, bounds, childOptions, containerOptions, currentOffset, maxWidth, maxHeight) {
          const dx = this.getDx(childOptions.hAlign, bounds, maxWidth);
          const dy = this.getDy(childOptions.vAlign, bounds, maxHeight);
          boundsData.bounds = {
            x: containerOptions.paddingLeft + child.bounds.x - bounds.x + dx,
            y: containerOptions.paddingTop + child.bounds.y - bounds.y + dy,
            width: bounds.width,
            height: bounds.height
          };
          boundsData.boundsChanged = true;
          return currentOffset;
        }
        getDefaultLayoutOptions() {
          return {
            resizeContainer: true,
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 5,
            paddingRight: 5,
            paddingFactor: 1,
            hAlign: "center",
            vAlign: "center",
            minWidth: 0,
            minHeight: 0
          };
        }
        spread(a, b) {
          return Object.assign(Object.assign({}, a), b);
        }
      };
      StackLayouter.KIND = "stack";
      StackLayouter = __decorate([
        (0, inversify_1.injectable)()
      ], StackLayouter);
      exports.StackLayouter = StackLayouter;
    }
  });

  // node_modules/sprotty/lib/features/bounds/views.js
  var require_views = __commonJS({
    "node_modules/sprotty/lib/features/bounds/views.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ShapeView = void 0;
      var inversify_1 = require_inversify();
      var geometry_1 = require_geometry();
      var model_1 = require_model2();
      var ShapeView = class ShapeView {
        /**
         * Check whether the given model element is in the current viewport. Use this method
         * in your `render` implementation to skip rendering in case the element is not visible.
         * This can greatly enhance performance for large models.
         */
        isVisible(model, context) {
          if (context.targetKind === "hidden") {
            return true;
          }
          if (!geometry_1.Dimension.isValid(model.bounds)) {
            return true;
          }
          const ab = (0, model_1.getAbsoluteBounds)(model);
          const canvasBounds = model.root.canvasBounds;
          return ab.x <= canvasBounds.width && ab.x + ab.width >= 0 && ab.y <= canvasBounds.height && ab.y + ab.height >= 0;
        }
      };
      ShapeView = __decorate([
        (0, inversify_1.injectable)()
      ], ShapeView);
      exports.ShapeView = ShapeView;
    }
  });

  // node_modules/sprotty/lib/features/button/button-handler.js
  var require_button_handler = __commonJS({
    "node_modules/sprotty/lib/features/button/button-handler.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      var __param = exports && exports.__param || function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.configureButtonHandler = exports.ButtonHandlerRegistry = void 0;
      var inversify_1 = require_inversify();
      var registry_1 = require_registry();
      var types_1 = require_types();
      var inversify_2 = require_inversify2();
      var ButtonHandlerRegistry = class ButtonHandlerRegistry extends registry_1.InstanceRegistry {
        constructor(buttonHandlerRegistrations, buttonHandlerFactories) {
          super();
          buttonHandlerRegistrations.forEach((factory) => this.register(factory.TYPE, factory.factory()));
          buttonHandlerFactories.forEach((factory) => this.register(factory.TYPE, new factory()));
        }
      };
      ButtonHandlerRegistry = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.multiInject)(types_1.TYPES.IButtonHandlerRegistration)),
        __param(0, (0, inversify_1.optional)()),
        __param(1, (0, inversify_1.multiInject)(types_1.TYPES.IButtonHandler)),
        __param(1, (0, inversify_1.optional)()),
        __metadata("design:paramtypes", [Array, Array])
      ], ButtonHandlerRegistry);
      exports.ButtonHandlerRegistry = ButtonHandlerRegistry;
      function configureButtonHandler(context, type, constr) {
        if (typeof constr === "function") {
          if (!(0, inversify_2.isInjectable)(constr)) {
            throw new Error(`Button handlers should be @injectable: ${constr.name}`);
          }
          if (!context.isBound(constr)) {
            context.bind(constr).toSelf();
          }
        }
        context.bind(types_1.TYPES.IButtonHandlerRegistration).toDynamicValue((ctx) => ({
          TYPE: type,
          factory: () => ctx.container.get(constr)
        }));
      }
      exports.configureButtonHandler = configureButtonHandler;
    }
  });

  // node_modules/sprotty/lib/features/fade/model.js
  var require_model3 = __commonJS({
    "node_modules/sprotty/lib/features/fade/model.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isFadeable = exports.fadeFeature = void 0;
      exports.fadeFeature = Symbol("fadeFeature");
      function isFadeable(element) {
        return element.hasFeature(exports.fadeFeature) && element["opacity"] !== void 0;
      }
      exports.isFadeable = isFadeable;
    }
  });

  // node_modules/sprotty/lib/features/button/model.js
  var require_model4 = __commonJS({
    "node_modules/sprotty/lib/features/button/model.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SButton = void 0;
      var model_1 = require_model2();
      var model_2 = require_model3();
      var SButton = class extends model_1.SShapeElement {
        constructor() {
          super(...arguments);
          this.enabled = true;
        }
      };
      exports.SButton = SButton;
      SButton.DEFAULT_FEATURES = [model_1.boundsFeature, model_1.layoutableChildFeature, model_2.fadeFeature];
    }
  });

  // node_modules/sprotty/lib/features/nameable/model.js
  var require_model5 = __commonJS({
    "node_modules/sprotty/lib/features/nameable/model.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.name = exports.isNameable = exports.nameFeature = void 0;
      exports.nameFeature = Symbol("nameableFeature");
      function isNameable(element) {
        return element.hasFeature(exports.nameFeature);
      }
      exports.isNameable = isNameable;
      function name(element) {
        if (isNameable(element)) {
          return element.name;
        } else {
          return void 0;
        }
      }
      exports.name = name;
    }
  });

  // node_modules/sprotty/lib/features/command-palette/action-providers.js
  var require_action_providers = __commonJS({
    "node_modules/sprotty/lib/features/command-palette/action-providers.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      var __param = exports && exports.__param || function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.RevealNamedElementActionProvider = exports.CommandPaletteActionProviderRegistry = void 0;
      var inversify_1 = require_inversify();
      var actions_1 = require_actions();
      var action_1 = require_action();
      var types_1 = require_types();
      var iterable_1 = require_iterable();
      var model_1 = require_model5();
      var CommandPaletteActionProviderRegistry = class CommandPaletteActionProviderRegistry {
        constructor(actionProviders = []) {
          this.actionProviders = actionProviders;
        }
        getActions(root, text, lastMousePosition, index) {
          const actionLists = this.actionProviders.map((provider) => provider.getActions(root, text, lastMousePosition, index));
          return Promise.all(actionLists).then((p) => p.reduce((acc, promise) => promise !== void 0 ? acc.concat(promise) : acc));
        }
      };
      CommandPaletteActionProviderRegistry = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.multiInject)(types_1.TYPES.ICommandPaletteActionProvider)),
        __param(0, (0, inversify_1.optional)()),
        __metadata("design:paramtypes", [Array])
      ], CommandPaletteActionProviderRegistry);
      exports.CommandPaletteActionProviderRegistry = CommandPaletteActionProviderRegistry;
      var RevealNamedElementActionProvider = class RevealNamedElementActionProvider {
        constructor(logger) {
          this.logger = logger;
        }
        getActions(root, text, lastMousePosition, index) {
          if (index !== void 0 && index % 2 === 0)
            return Promise.resolve(this.createSelectActions(root));
          else
            return Promise.resolve([new action_1.LabeledAction("Select all", [actions_1.SelectAllAction.create()])]);
        }
        createSelectActions(modelRoot) {
          const nameables = (0, iterable_1.toArray)(modelRoot.index.all().filter((element) => (0, model_1.isNameable)(element)));
          return nameables.map((nameable) => new action_1.LabeledAction(`Reveal ${(0, model_1.name)(nameable)}`, [actions_1.SelectAction.create({ selectedElementsIDs: [nameable.id] }), actions_1.CenterAction.create([nameable.id])], "eye"));
        }
      };
      RevealNamedElementActionProvider = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(types_1.TYPES.ILogger)),
        __metadata("design:paramtypes", [Object])
      ], RevealNamedElementActionProvider);
      exports.RevealNamedElementActionProvider = RevealNamedElementActionProvider;
    }
  });

  // node_modules/sprotty/lib/utils/codicon.js
  var require_codicon = __commonJS({
    "node_modules/sprotty/lib/utils/codicon.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.codiconCSSClasses = exports.codiconCSSString = exports.ANIMATION_SPIN = exports.ACTION_ITEM = void 0;
      exports.ACTION_ITEM = "action-item";
      exports.ANIMATION_SPIN = "animation-spin";
      function codiconCSSString(codiconId, actionItem = false, animationSpin = false, additionalCSS = []) {
        return codiconCSSClasses(codiconId, actionItem, animationSpin, additionalCSS).join(" ");
      }
      exports.codiconCSSString = codiconCSSString;
      function codiconCSSClasses(codiconId, actionItem = false, animationSpin = false, additionalCSS = []) {
        const cssClassArray = ["codicon", `codicon-${codiconId}`];
        if (actionItem) {
          cssClassArray.push(exports.ACTION_ITEM);
        }
        if (animationSpin) {
          cssClassArray.push(exports.ANIMATION_SPIN);
        }
        if (additionalCSS.length > 0) {
          cssClassArray.push(...additionalCSS);
        }
        return cssClassArray;
      }
      exports.codiconCSSClasses = codiconCSSClasses;
    }
  });

  // node_modules/sprotty/lib/features/select/model.js
  var require_model6 = __commonJS({
    "node_modules/sprotty/lib/features/select/model.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isSelected = exports.isSelectable = exports.selectFeature = void 0;
      exports.selectFeature = Symbol("selectFeature");
      function isSelectable(element) {
        return element.hasFeature(exports.selectFeature);
      }
      exports.isSelectable = isSelectable;
      function isSelected(element) {
        return element !== void 0 && isSelectable(element) && element.selected;
      }
      exports.isSelected = isSelected;
    }
  });

  // node_modules/autocompleter/autocomplete.js
  var require_autocomplete = __commonJS({
    "node_modules/autocompleter/autocomplete.js"(exports, module) {
      (function(global2, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, global2.autocomplete = factory());
      })(exports, function() {
        "use strict";
        function autocomplete(settings) {
          var doc = document;
          var container = settings.container || doc.createElement("div");
          container.id = container.id || "autocomplete-" + uid();
          var containerStyle = container.style;
          var debounceWaitMs = settings.debounceWaitMs || 0;
          var preventSubmit = settings.preventSubmit || false;
          var disableAutoSelect = settings.disableAutoSelect || false;
          var items = [];
          var inputValue = "";
          var minLen = 2;
          var showOnFocus = settings.showOnFocus;
          var selected;
          var keypressCounter = 0;
          var debounceTimer;
          if (settings.minLength !== void 0) {
            minLen = settings.minLength;
          }
          if (!settings.input) {
            throw new Error("input undefined");
          }
          var input = settings.input;
          container.className = "autocomplete " + (settings.className || "");
          container.setAttribute("role", "listbox");
          input.setAttribute("role", "combobox");
          input.setAttribute("aria-expanded", "false");
          input.setAttribute("aria-autocomplete", "list");
          input.setAttribute("aria-controls", container.id);
          input.setAttribute("aria-owns", container.id);
          input.setAttribute("aria-activedescendant", "");
          input.setAttribute("aria-haspopup", "listbox");
          containerStyle.position = "absolute";
          function uid() {
            return Date.now().toString(36) + Math.random().toString(36).substring(2);
          }
          function detach() {
            var parent = container.parentNode;
            if (parent) {
              parent.removeChild(container);
            }
          }
          function clearDebounceTimer() {
            if (debounceTimer) {
              window.clearTimeout(debounceTimer);
            }
          }
          function attach() {
            if (!container.parentNode) {
              doc.body.appendChild(container);
            }
          }
          function containerDisplayed() {
            return !!container.parentNode;
          }
          function clear() {
            keypressCounter++;
            items = [];
            inputValue = "";
            selected = void 0;
            input.setAttribute("aria-activedescendant", "");
            input.setAttribute("aria-expanded", "false");
            detach();
          }
          function updatePosition() {
            if (!containerDisplayed()) {
              return;
            }
            input.setAttribute("aria-expanded", "true");
            containerStyle.height = "auto";
            containerStyle.width = input.offsetWidth + "px";
            var maxHeight = 0;
            var inputRect;
            function calc() {
              var docEl = doc.documentElement;
              var clientTop = docEl.clientTop || doc.body.clientTop || 0;
              var clientLeft = docEl.clientLeft || doc.body.clientLeft || 0;
              var scrollTop = window.pageYOffset || docEl.scrollTop;
              var scrollLeft = window.pageXOffset || docEl.scrollLeft;
              inputRect = input.getBoundingClientRect();
              var top = inputRect.top + input.offsetHeight + scrollTop - clientTop;
              var left = inputRect.left + scrollLeft - clientLeft;
              containerStyle.top = top + "px";
              containerStyle.left = left + "px";
              maxHeight = window.innerHeight - (inputRect.top + input.offsetHeight);
              if (maxHeight < 0) {
                maxHeight = 0;
              }
              containerStyle.top = top + "px";
              containerStyle.bottom = "";
              containerStyle.left = left + "px";
              containerStyle.maxHeight = maxHeight + "px";
            }
            calc();
            calc();
            if (settings.customize && inputRect) {
              settings.customize(input, inputRect, container, maxHeight);
            }
          }
          function update() {
            while (container.firstChild) {
              container.removeChild(container.firstChild);
            }
            input.setAttribute("aria-activedescendant", "");
            var render = function(item, _, __) {
              var itemElement = doc.createElement("div");
              itemElement.textContent = item.label || "";
              return itemElement;
            };
            if (settings.render) {
              render = settings.render;
            }
            var renderGroup = function(groupName, _) {
              var groupDiv = doc.createElement("div");
              groupDiv.textContent = groupName;
              return groupDiv;
            };
            if (settings.renderGroup) {
              renderGroup = settings.renderGroup;
            }
            var fragment = doc.createDocumentFragment();
            var prevGroup = "#9?$";
            items.forEach(function(item, index) {
              if (item.group && item.group !== prevGroup) {
                prevGroup = item.group;
                var groupDiv = renderGroup(item.group, inputValue);
                if (groupDiv) {
                  groupDiv.className += " group";
                  fragment.appendChild(groupDiv);
                }
              }
              var div = render(item, inputValue, index);
              if (div) {
                div.id = container.id + "_" + index;
                div.setAttribute("role", "option");
                div.addEventListener("click", function(ev) {
                  settings.onSelect(item, input);
                  clear();
                  ev.preventDefault();
                  ev.stopPropagation();
                });
                if (item === selected) {
                  div.className += " selected";
                  div.setAttribute("aria-selected", "true");
                  input.setAttribute("aria-activedescendant", div.id);
                }
                fragment.appendChild(div);
              }
            });
            container.appendChild(fragment);
            if (items.length < 1) {
              if (settings.emptyMsg) {
                var empty = doc.createElement("div");
                empty.id = container.id + "_" + uid();
                empty.className = "empty";
                empty.textContent = settings.emptyMsg;
                container.appendChild(empty);
                input.setAttribute("aria-activedescendant", empty.id);
              } else {
                clear();
                return;
              }
            }
            attach();
            updatePosition();
            updateScroll();
          }
          function updateIfDisplayed() {
            if (containerDisplayed()) {
              update();
            }
          }
          function resizeEventHandler() {
            updateIfDisplayed();
          }
          function scrollEventHandler(e) {
            if (e.target !== container) {
              updateIfDisplayed();
            } else {
              e.preventDefault();
            }
          }
          function keyupEventHandler(ev) {
            var keyCode = ev.which || ev.keyCode || 0;
            var ignore = settings.keysToIgnore || [
              38,
              13,
              27,
              39,
              37,
              16,
              17,
              18,
              20,
              91,
              9
              /* Tab */
            ];
            for (var _i = 0, ignore_1 = ignore; _i < ignore_1.length; _i++) {
              var key = ignore_1[_i];
              if (keyCode === key) {
                return;
              }
            }
            if (keyCode >= 112 && keyCode <= 123 && !settings.keysToIgnore) {
              return;
            }
            if (keyCode === 40 && containerDisplayed()) {
              return;
            }
            startFetch(
              0
              /* Keyboard */
            );
          }
          function updateScroll() {
            var elements = container.getElementsByClassName("selected");
            if (elements.length > 0) {
              var element = elements[0];
              var previous = element.previousElementSibling;
              if (previous && previous.className.indexOf("group") !== -1 && !previous.previousElementSibling) {
                element = previous;
              }
              if (element.offsetTop < container.scrollTop) {
                container.scrollTop = element.offsetTop;
              } else {
                var selectBottom = element.offsetTop + element.offsetHeight;
                var containerBottom = container.scrollTop + container.offsetHeight;
                if (selectBottom > containerBottom) {
                  container.scrollTop += selectBottom - containerBottom;
                }
              }
            }
          }
          function selectPrev() {
            if (items.length < 1) {
              selected = void 0;
            } else {
              if (selected === items[0]) {
                selected = items[items.length - 1];
              } else {
                for (var i = items.length - 1; i > 0; i--) {
                  if (selected === items[i] || i === 1) {
                    selected = items[i - 1];
                    break;
                  }
                }
              }
            }
          }
          function selectNext() {
            if (items.length < 1) {
              selected = void 0;
            }
            if (!selected || selected === items[items.length - 1]) {
              selected = items[0];
              return;
            }
            for (var i = 0; i < items.length - 1; i++) {
              if (selected === items[i]) {
                selected = items[i + 1];
                break;
              }
            }
          }
          function keydownEventHandler(ev) {
            var keyCode = ev.which || ev.keyCode || 0;
            if (keyCode === 38 || keyCode === 40 || keyCode === 27) {
              var containerIsDisplayed = containerDisplayed();
              if (keyCode === 27) {
                clear();
              } else {
                if (!containerIsDisplayed || items.length < 1) {
                  return;
                }
                keyCode === 38 ? selectPrev() : selectNext();
                update();
              }
              ev.preventDefault();
              if (containerIsDisplayed) {
                ev.stopPropagation();
              }
              return;
            }
            if (keyCode === 13) {
              if (selected) {
                settings.onSelect(selected, input);
                clear();
              }
              if (preventSubmit) {
                ev.preventDefault();
              }
            }
          }
          function focusEventHandler() {
            if (showOnFocus) {
              startFetch(
                1
                /* Focus */
              );
            }
          }
          function startFetch(trigger) {
            var savedKeypressCounter = ++keypressCounter;
            var inputText = input.value;
            var cursorPos = input.selectionStart || 0;
            if (inputText.length >= minLen || trigger === 1) {
              clearDebounceTimer();
              debounceTimer = window.setTimeout(function() {
                settings.fetch(inputText, function(elements) {
                  if (keypressCounter === savedKeypressCounter && elements) {
                    items = elements;
                    inputValue = inputText;
                    selected = items.length < 1 || disableAutoSelect ? void 0 : items[0];
                    update();
                  }
                }, trigger, cursorPos);
              }, trigger === 0 ? debounceWaitMs : 0);
            } else {
              clear();
            }
          }
          function blurEventHandler() {
            setTimeout(function() {
              if (doc.activeElement !== input) {
                clear();
              }
            }, 200);
          }
          container.addEventListener("mousedown", function(evt) {
            evt.stopPropagation();
            evt.preventDefault();
          });
          container.addEventListener("focus", function() {
            return input.focus();
          });
          function destroy() {
            input.removeEventListener("focus", focusEventHandler);
            input.removeEventListener("keydown", keydownEventHandler);
            input.removeEventListener("keyup", keyupEventHandler);
            input.removeEventListener("blur", blurEventHandler);
            window.removeEventListener("resize", resizeEventHandler);
            doc.removeEventListener("scroll", scrollEventHandler, true);
            input.removeAttribute("role");
            input.removeAttribute("aria-expanded");
            input.removeAttribute("aria-autocomplete");
            input.removeAttribute("aria-controls");
            input.removeAttribute("aria-activedescendant");
            input.removeAttribute("aria-owns");
            input.removeAttribute("aria-haspopup");
            clearDebounceTimer();
            clear();
          }
          input.addEventListener("keydown", keydownEventHandler);
          input.addEventListener("keyup", keyupEventHandler);
          input.addEventListener("blur", blurEventHandler);
          input.addEventListener("focus", focusEventHandler);
          window.addEventListener("resize", resizeEventHandler);
          doc.addEventListener("scroll", scrollEventHandler, true);
          return {
            destroy
          };
        }
        return autocomplete;
      });
    }
  });

  // node_modules/sprotty/lib/features/command-palette/command-palette.js
  var require_command_palette = __commonJS({
    "node_modules/sprotty/lib/features/command-palette/command-palette.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      var CommandPalette_1;
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.CommandPaletteKeyListener = exports.CommandPalette = void 0;
      var inversify_1 = require_inversify();
      var actions_1 = require_actions();
      var action_1 = require_action();
      var types_1 = require_types();
      var ui_extension_1 = require_ui_extension();
      var ui_extension_registry_1 = require_ui_extension_registry();
      var dom_helper_1 = require_dom_helper();
      var key_tool_1 = require_key_tool();
      var codicon_1 = require_codicon();
      var iterable_1 = require_iterable();
      var keyboard_1 = require_keyboard();
      var model_1 = require_model2();
      var model_2 = require_model6();
      var action_providers_1 = require_action_providers();
      var mouse_tool_1 = require_mouse_tool();
      var autocompleter_1 = __importDefault(require_autocomplete());
      var CommandPalette = CommandPalette_1 = class CommandPalette extends ui_extension_1.AbstractUIExtension {
        constructor() {
          super(...arguments);
          this.loadingIndicatorClasses = (0, codicon_1.codiconCSSClasses)("loading", false, true, ["loading"]);
          this.xOffset = 20;
          this.yOffset = 20;
          this.defaultWidth = 400;
          this.debounceWaitMs = 100;
          this.noCommandsMsg = "No commands available";
          this.paletteIndex = 0;
        }
        id() {
          return CommandPalette_1.ID;
        }
        containerClass() {
          return "command-palette";
        }
        show(root, ...contextElementIds) {
          super.show(root, ...contextElementIds);
          this.paletteIndex = 0;
          this.contextActions = void 0;
          this.inputElement.value = "";
          this.autoCompleteResult = (0, autocompleter_1.default)(this.autocompleteSettings(root));
          this.inputElement.focus();
        }
        initializeContents(containerElement) {
          containerElement.style.position = "absolute";
          this.inputElement = document.createElement("input");
          this.inputElement.style.width = "100%";
          this.inputElement.addEventListener("keydown", (event) => this.hideIfEscapeEvent(event));
          this.inputElement.addEventListener("keydown", (event) => this.cylceIfInvokePaletteKey(event));
          this.inputElement.onblur = () => window.setTimeout(() => this.hide(), 200);
          containerElement.appendChild(this.inputElement);
        }
        hideIfEscapeEvent(event) {
          if ((0, keyboard_1.matchesKeystroke)(event, "Escape")) {
            this.hide();
          }
        }
        cylceIfInvokePaletteKey(event) {
          if (CommandPalette_1.isInvokePaletteKey(event)) {
            this.cycle();
          }
        }
        cycle() {
          this.contextActions = void 0;
          this.paletteIndex++;
        }
        onBeforeShow(containerElement, root, ...selectedElementIds) {
          let x = this.xOffset;
          let y = this.yOffset;
          const selectedElements = (0, iterable_1.toArray)(root.index.all().filter((e) => (0, model_2.isSelectable)(e) && e.selected));
          if (selectedElements.length === 1) {
            const bounds = (0, model_1.getAbsoluteClientBounds)(selectedElements[0], this.domHelper, this.viewerOptions);
            x += bounds.x + bounds.width;
            y += bounds.y;
          } else {
            const bounds = (0, model_1.getAbsoluteClientBounds)(root, this.domHelper, this.viewerOptions);
            x += bounds.x;
            y += bounds.y;
          }
          containerElement.style.left = `${x}px`;
          containerElement.style.top = `${y}px`;
          containerElement.style.width = `${this.defaultWidth}px`;
        }
        autocompleteSettings(root) {
          return {
            input: this.inputElement,
            emptyMsg: this.noCommandsMsg,
            className: "command-palette-suggestions",
            debounceWaitMs: this.debounceWaitMs,
            showOnFocus: true,
            minLength: -1,
            fetch: (text, update) => this.updateAutoCompleteActions(update, text, root),
            onSelect: (item) => this.onSelect(item),
            render: (item, currentValue) => this.renderLabeledActionSuggestion(item, currentValue),
            customize: (input, inputRect, container, maxHeight) => {
              this.customizeSuggestionContainer(container, inputRect, maxHeight);
            }
          };
        }
        onSelect(item) {
          this.executeAction(item);
          this.hide();
        }
        updateAutoCompleteActions(update, text, root) {
          this.onLoading();
          if (this.contextActions) {
            update(this.filterActions(text, this.contextActions));
            this.onLoaded("success");
          } else {
            this.actionProviderRegistry.getActions(root, text, this.mousePositionTracker.lastPositionOnDiagram, this.paletteIndex).then((actions) => {
              this.contextActions = actions;
              update(this.filterActions(text, actions));
              this.onLoaded("success");
            }).catch((reason) => {
              this.logger.error(this, "Failed to obtain actions from command palette action providers", reason);
              this.onLoaded("error");
            });
          }
        }
        onLoading() {
          if (this.loadingIndicator && this.containerElement.contains(this.loadingIndicator)) {
            return;
          }
          this.loadingIndicator = document.createElement("span");
          this.loadingIndicator.classList.add(...this.loadingIndicatorClasses);
          this.containerElement.appendChild(this.loadingIndicator);
        }
        onLoaded(success) {
          if (this.containerElement.contains(this.loadingIndicator)) {
            this.containerElement.removeChild(this.loadingIndicator);
          }
        }
        renderLabeledActionSuggestion(item, value) {
          const itemElement = document.createElement("div");
          const wordMatcher = espaceForRegExp(value).split(" ").join("|");
          const regex = new RegExp(wordMatcher, "gi");
          if (item.icon) {
            this.renderIcon(itemElement, item.icon);
          }
          if (value.length > 0) {
            itemElement.innerHTML += item.label.replace(regex, (match) => "<em>" + match + "</em>").replace(/ /g, "&nbsp;");
          } else {
            itemElement.innerHTML += item.label.replace(/ /g, "&nbsp;");
          }
          return itemElement;
        }
        renderIcon(itemElement, iconId) {
          itemElement.innerHTML += `<span class="icon ${this.getCodicon(iconId)}"></span>`;
        }
        getFontAwesomeIcon(iconId) {
          return `fa fa-${iconId}`;
        }
        getCodicon(iconId) {
          return (0, codicon_1.codiconCSSString)(iconId);
        }
        filterActions(filterText, actions) {
          return (0, iterable_1.toArray)(actions.filter((action) => {
            const label = action.label.toLowerCase();
            const searchWords = filterText.split(" ");
            return searchWords.every((word) => label.indexOf(word.toLowerCase()) !== -1);
          }));
        }
        customizeSuggestionContainer(container, inputRect, maxHeight) {
          if (this.containerElement) {
            this.containerElement.appendChild(container);
          }
        }
        hide() {
          super.hide();
          if (this.autoCompleteResult) {
            this.autoCompleteResult.destroy();
          }
        }
        executeAction(input) {
          this.actionDispatcherProvider().then((actionDispatcher) => actionDispatcher.dispatchAll(toActionArray(input))).catch((reason) => this.logger.error(this, "No action dispatcher available to execute command palette action", reason));
        }
      };
      CommandPalette.ID = "command-palette";
      CommandPalette.isInvokePaletteKey = (event) => (0, keyboard_1.matchesKeystroke)(event, "Space", "ctrl");
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.IActionDispatcherProvider),
        __metadata("design:type", Function)
      ], CommandPalette.prototype, "actionDispatcherProvider", void 0);
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.ICommandPaletteActionProviderRegistry),
        __metadata("design:type", action_providers_1.CommandPaletteActionProviderRegistry)
      ], CommandPalette.prototype, "actionProviderRegistry", void 0);
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.ViewerOptions),
        __metadata("design:type", Object)
      ], CommandPalette.prototype, "viewerOptions", void 0);
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.DOMHelper),
        __metadata("design:type", dom_helper_1.DOMHelper)
      ], CommandPalette.prototype, "domHelper", void 0);
      __decorate([
        (0, inversify_1.inject)(mouse_tool_1.MousePositionTracker),
        __metadata("design:type", mouse_tool_1.MousePositionTracker)
      ], CommandPalette.prototype, "mousePositionTracker", void 0);
      CommandPalette = CommandPalette_1 = __decorate([
        (0, inversify_1.injectable)()
      ], CommandPalette);
      exports.CommandPalette = CommandPalette;
      function toActionArray(input) {
        if ((0, action_1.isLabeledAction)(input)) {
          return input.actions;
        } else if ((0, actions_1.isAction)(input)) {
          return [input];
        }
        return [];
      }
      function espaceForRegExp(value) {
        return value.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
      }
      var CommandPaletteKeyListener = class extends key_tool_1.KeyListener {
        keyDown(element, event) {
          if ((0, keyboard_1.matchesKeystroke)(event, "Escape")) {
            return [ui_extension_registry_1.SetUIExtensionVisibilityAction.create({ extensionId: CommandPalette.ID, visible: false, contextElementsId: [] })];
          } else if (CommandPalette.isInvokePaletteKey(event)) {
            const selectedElements = (0, iterable_1.toArray)(element.index.all().filter((e) => (0, model_2.isSelectable)(e) && e.selected).map((e) => e.id));
            return [ui_extension_registry_1.SetUIExtensionVisibilityAction.create({ extensionId: CommandPalette.ID, visible: true, contextElementsId: selectedElements })];
          }
          return [];
        }
      };
      exports.CommandPaletteKeyListener = CommandPaletteKeyListener;
    }
  });

  // node_modules/sprotty/lib/features/context-menu/context-menu-service.js
  var require_context_menu_service = __commonJS({
    "node_modules/sprotty/lib/features/context-menu/context-menu-service.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.toAnchor = void 0;
      function toAnchor(anchor) {
        return anchor instanceof HTMLElement ? { x: anchor.offsetLeft, y: anchor.offsetTop } : anchor;
      }
      exports.toAnchor = toAnchor;
    }
  });

  // node_modules/sprotty/lib/features/edit/delete.js
  var require_delete = __commonJS({
    "node_modules/sprotty/lib/features/edit/delete.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      var __param = exports && exports.__param || function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.DeleteElementCommand = exports.ResolvedDelete = exports.DeleteElementAction = exports.isDeletable = exports.deletableFeature = void 0;
      var inversify_1 = require_inversify();
      var command_1 = require_command();
      var smodel_1 = require_smodel();
      var types_1 = require_types();
      exports.deletableFeature = Symbol("deletableFeature");
      function isDeletable(element) {
        return element instanceof smodel_1.SChildElement && element.hasFeature(exports.deletableFeature);
      }
      exports.isDeletable = isDeletable;
      var DeleteElementAction;
      (function(DeleteElementAction2) {
        DeleteElementAction2.KIND = "delete";
        function create(elementIds) {
          return {
            kind: DeleteElementAction2.KIND,
            elementIds
          };
        }
        DeleteElementAction2.create = create;
      })(DeleteElementAction = exports.DeleteElementAction || (exports.DeleteElementAction = {}));
      var ResolvedDelete = class {
      };
      exports.ResolvedDelete = ResolvedDelete;
      var DeleteElementCommand = class DeleteElementCommand extends command_1.Command {
        constructor(action) {
          super();
          this.action = action;
          this.resolvedDeletes = [];
        }
        execute(context) {
          const index = context.root.index;
          for (const id of this.action.elementIds) {
            const element = index.getById(id);
            if (element && isDeletable(element)) {
              this.resolvedDeletes.push({ child: element, parent: element.parent });
              element.parent.remove(element);
            }
          }
          return context.root;
        }
        undo(context) {
          for (const resolvedDelete of this.resolvedDeletes)
            resolvedDelete.parent.add(resolvedDelete.child);
          return context.root;
        }
        redo(context) {
          for (const resolvedDelete of this.resolvedDeletes)
            resolvedDelete.parent.remove(resolvedDelete.child);
          return context.root;
        }
      };
      DeleteElementCommand.KIND = DeleteElementAction.KIND;
      DeleteElementCommand = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(types_1.TYPES.Action)),
        __metadata("design:paramtypes", [Object])
      ], DeleteElementCommand);
      exports.DeleteElementCommand = DeleteElementCommand;
    }
  });

  // node_modules/sprotty/lib/features/context-menu/menu-providers.js
  var require_menu_providers = __commonJS({
    "node_modules/sprotty/lib/features/context-menu/menu-providers.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      var __param = exports && exports.__param || function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.DeleteContextMenuItemProvider = exports.ContextMenuProviderRegistry = void 0;
      var inversify_1 = require_inversify();
      var types_1 = require_types();
      var delete_1 = require_delete();
      var model_1 = require_model6();
      var sprotty_protocol_1 = require_lib();
      var ContextMenuProviderRegistry = class ContextMenuProviderRegistry {
        constructor(menuProviders = []) {
          this.menuProviders = menuProviders;
        }
        getItems(root, lastMousePosition) {
          const menues = this.menuProviders.map((provider) => provider.getItems(root, lastMousePosition));
          return Promise.all(menues).then(this.flattenAndRestructure);
        }
        flattenAndRestructure(p) {
          let menuItems = p.reduce((acc, promise) => promise !== void 0 ? acc.concat(promise) : acc, []);
          const menuItemsWithParentId = menuItems.filter((menuItem) => menuItem.parentId);
          for (const menuItem of menuItemsWithParentId) {
            if (menuItem.parentId) {
              const fragments = menuItem.parentId.split(".");
              let matchingParent = void 0;
              let nextParents = menuItems;
              for (const fragment of fragments) {
                matchingParent = nextParents.find((item) => fragment === item.id);
                if (matchingParent && matchingParent.children)
                  nextParents = matchingParent.children;
              }
              if (matchingParent) {
                if (matchingParent.children) {
                  matchingParent.children.push(menuItem);
                } else {
                  matchingParent.children = [menuItem];
                }
                menuItems = menuItems.filter((item) => item !== menuItem);
              }
            }
          }
          return menuItems;
        }
      };
      ContextMenuProviderRegistry = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.multiInject)(types_1.TYPES.IContextMenuItemProvider)),
        __param(0, (0, inversify_1.optional)()),
        __metadata("design:paramtypes", [Array])
      ], ContextMenuProviderRegistry);
      exports.ContextMenuProviderRegistry = ContextMenuProviderRegistry;
      var DeleteContextMenuItemProvider = class DeleteContextMenuItemProvider {
        getItems(root, lastMousePosition) {
          const selectedElements = Array.from(root.index.all().filter(model_1.isSelected).filter(delete_1.isDeletable));
          return Promise.resolve([
            {
              id: "delete",
              label: "Delete",
              sortString: "d",
              group: "edit",
              actions: [sprotty_protocol_1.DeleteElementAction.create(selectedElements.map((e) => e.id))],
              isEnabled: () => selectedElements.length > 0
            }
          ]);
        }
      };
      DeleteContextMenuItemProvider = __decorate([
        (0, inversify_1.injectable)()
      ], DeleteContextMenuItemProvider);
      exports.DeleteContextMenuItemProvider = DeleteContextMenuItemProvider;
    }
  });

  // node_modules/sprotty/lib/features/context-menu/mouse-listener.js
  var require_mouse_listener = __commonJS({
    "node_modules/sprotty/lib/features/context-menu/mouse-listener.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      var __param = exports && exports.__param || function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ContextMenuMouseListener = void 0;
      var inversify_1 = require_inversify();
      var actions_1 = require_actions();
      var menu_providers_1 = require_menu_providers();
      var mouse_tool_1 = require_mouse_tool();
      var types_1 = require_types();
      var model_1 = require_model6();
      var smodel_utils_1 = require_smodel_utils();
      var ContextMenuMouseListener = class ContextMenuMouseListener extends mouse_tool_1.MouseListener {
        constructor(contextMenuService, menuProvider) {
          super();
          this.contextMenuService = contextMenuService;
          this.menuProvider = menuProvider;
        }
        contextMenu(target, event) {
          this.showContextMenu(target, event);
          return [];
        }
        async showContextMenu(target, event) {
          let menuService;
          try {
            menuService = await this.contextMenuService();
          } catch (rejected) {
            return;
          }
          const mousePosition = { x: event.x, y: event.y };
          const root = target.root;
          const id = target.id;
          let isTargetSelected = false;
          const selectableTarget = (0, smodel_utils_1.findParentByFeature)(target, model_1.isSelectable);
          if (selectableTarget) {
            isTargetSelected = selectableTarget.selected;
            selectableTarget.selected = true;
          }
          const restoreSelection = () => {
            if (selectableTarget)
              selectableTarget.selected = isTargetSelected;
          };
          if ((0, model_1.isSelectable)(target)) {
            if ((0, model_1.isSelected)(target)) {
              const menuItems = await this.menuProvider.getItems(target.root, mousePosition);
              menuService.show(menuItems, mousePosition, restoreSelection);
            } else {
              const options = { selectedElementsIDs: [id], deselectedElementsIDs: Array.from(root.index.all().filter(model_1.isSelected), (val) => {
                return val.id;
              }) };
              await this.actionDispatcher.dispatch(actions_1.SelectAction.create(options));
              const items = await this.menuProvider.getItems(root, mousePosition);
              menuService.show(items, mousePosition);
            }
          }
        }
      };
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.IActionDispatcher),
        __metadata("design:type", Object)
      ], ContextMenuMouseListener.prototype, "actionDispatcher", void 0);
      ContextMenuMouseListener = __decorate([
        __param(0, (0, inversify_1.inject)(types_1.TYPES.IContextMenuServiceProvider)),
        __param(1, (0, inversify_1.inject)(types_1.TYPES.IContextMenuProviderRegistry)),
        __metadata("design:paramtypes", [Function, menu_providers_1.ContextMenuProviderRegistry])
      ], ContextMenuMouseListener);
      exports.ContextMenuMouseListener = ContextMenuMouseListener;
    }
  });

  // node_modules/sprotty/lib/features/hover/model.js
  var require_model7 = __commonJS({
    "node_modules/sprotty/lib/features/hover/model.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.hasPopupFeature = exports.popupFeature = exports.isHoverable = exports.hoverFeedbackFeature = void 0;
      exports.hoverFeedbackFeature = Symbol("hoverFeedbackFeature");
      function isHoverable(element) {
        return element.hasFeature(exports.hoverFeedbackFeature);
      }
      exports.isHoverable = isHoverable;
      exports.popupFeature = Symbol("popupFeature");
      function hasPopupFeature(element) {
        return element.hasFeature(exports.popupFeature);
      }
      exports.hasPopupFeature = hasPopupFeature;
    }
  });

  // node_modules/sprotty/lib/features/move/model.js
  var require_model8 = __commonJS({
    "node_modules/sprotty/lib/features/move/model.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isMoveable = exports.isLocateable = exports.moveFeature = void 0;
      exports.moveFeature = Symbol("moveFeature");
      function isLocateable(element) {
        return element["position"] !== void 0;
      }
      exports.isLocateable = isLocateable;
      function isMoveable(element) {
        return element.hasFeature(exports.moveFeature) && isLocateable(element);
      }
      exports.isMoveable = isMoveable;
    }
  });

  // node_modules/sprotty/lib/features/routing/model.js
  var require_model9 = __commonJS({
    "node_modules/sprotty/lib/features/routing/model.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.edgeInProgressTargetHandleID = exports.edgeInProgressID = exports.SDanglingAnchor = exports.SRoutingHandle = exports.SConnectableElement = exports.getRouteBounds = exports.getAbsoluteRouteBounds = exports.isConnectable = exports.connectableFeature = exports.SRoutableElement = void 0;
      var geometry_1 = require_geometry();
      var smodel_1 = require_smodel();
      var model_1 = require_model2();
      var delete_1 = require_delete();
      var model_2 = require_model6();
      var model_3 = require_model7();
      var model_4 = require_model8();
      var SRoutableElement = class extends smodel_1.SChildElement {
        constructor() {
          super(...arguments);
          this.routingPoints = [];
        }
        get source() {
          return this.index.getById(this.sourceId);
        }
        get target() {
          return this.index.getById(this.targetId);
        }
        get bounds() {
          return this.routingPoints.reduce((bounds, routingPoint) => geometry_1.Bounds.combine(bounds, {
            x: routingPoint.x,
            y: routingPoint.y,
            width: 0,
            height: 0
          }), geometry_1.Bounds.EMPTY);
        }
      };
      exports.SRoutableElement = SRoutableElement;
      exports.connectableFeature = Symbol("connectableFeature");
      function isConnectable(element) {
        return element.hasFeature(exports.connectableFeature) && element.canConnect;
      }
      exports.isConnectable = isConnectable;
      function getAbsoluteRouteBounds(model, route = model.routingPoints) {
        let bounds = getRouteBounds(route);
        let current = model;
        while (current instanceof smodel_1.SChildElement) {
          const parent = current.parent;
          bounds = parent.localToParent(bounds);
          current = parent;
        }
        return bounds;
      }
      exports.getAbsoluteRouteBounds = getAbsoluteRouteBounds;
      function getRouteBounds(route) {
        const bounds = { x: NaN, y: NaN, width: 0, height: 0 };
        for (const point of route) {
          if (isNaN(bounds.x)) {
            bounds.x = point.x;
            bounds.y = point.y;
          } else {
            if (point.x < bounds.x) {
              bounds.width += bounds.x - point.x;
              bounds.x = point.x;
            } else if (point.x > bounds.x + bounds.width) {
              bounds.width = point.x - bounds.x;
            }
            if (point.y < bounds.y) {
              bounds.height += bounds.y - point.y;
              bounds.y = point.y;
            } else if (point.y > bounds.y + bounds.height) {
              bounds.height = point.y - bounds.y;
            }
          }
        }
        return bounds;
      }
      exports.getRouteBounds = getRouteBounds;
      var SConnectableElement = class extends model_1.SShapeElement {
        constructor() {
          super(...arguments);
          this.strokeWidth = 0;
        }
        get anchorKind() {
          return void 0;
        }
        /**
         * The incoming edges of this connectable element. They are resolved by the index, which must
         * be an `SGraphIndex` for efficient lookup.
         */
        get incomingEdges() {
          const allEdges = this.index.all().filter((e) => e instanceof SRoutableElement);
          return allEdges.filter((e) => e.targetId === this.id);
        }
        /**
         * The outgoing edges of this connectable element. They are resolved by the index, which must
         * be an `SGraphIndex` for efficient lookup.
         */
        get outgoingEdges() {
          const allEdges = this.index.all().filter((e) => e instanceof SRoutableElement);
          return allEdges.filter((e) => e.sourceId === this.id);
        }
        canConnect(routable, role) {
          return true;
        }
      };
      exports.SConnectableElement = SConnectableElement;
      var SRoutingHandle = class extends smodel_1.SChildElement {
        constructor() {
          super(...arguments);
          this.editMode = false;
          this.hoverFeedback = false;
          this.selected = false;
        }
        /**
         * SRoutingHandles are created using the constructor, so we hard-wire the
         * default features
         */
        hasFeature(feature) {
          return SRoutingHandle.DEFAULT_FEATURES.indexOf(feature) !== -1;
        }
      };
      exports.SRoutingHandle = SRoutingHandle;
      SRoutingHandle.DEFAULT_FEATURES = [model_2.selectFeature, model_4.moveFeature, model_3.hoverFeedbackFeature];
      var SDanglingAnchor = class extends SConnectableElement {
        constructor() {
          super();
          this.type = "dangling-anchor";
          this.size = { width: 0, height: 0 };
        }
      };
      exports.SDanglingAnchor = SDanglingAnchor;
      SDanglingAnchor.DEFAULT_FEATURES = [delete_1.deletableFeature];
      exports.edgeInProgressID = "edge-in-progress";
      exports.edgeInProgressTargetHandleID = exports.edgeInProgressID + "-target-anchor";
    }
  });

  // node_modules/sprotty/lib/features/edge-layout/model.js
  var require_model10 = __commonJS({
    "node_modules/sprotty/lib/features/edge-layout/model.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.DEFAULT_EDGE_PLACEMENT = exports.EdgePlacement = exports.isEdgeLayoutable = exports.edgeLayoutFeature = void 0;
      var smodel_1 = require_smodel();
      var model_1 = require_model2();
      var model_2 = require_model9();
      exports.edgeLayoutFeature = Symbol("edgeLayout");
      function isEdgeLayoutable(element) {
        return element instanceof smodel_1.SChildElement && element.parent instanceof model_2.SRoutableElement && checkEdgeLayoutable(element) && (0, model_1.isBoundsAware)(element) && element.hasFeature(exports.edgeLayoutFeature);
      }
      exports.isEdgeLayoutable = isEdgeLayoutable;
      function checkEdgeLayoutable(element) {
        return "edgePlacement" in element;
      }
      var EdgePlacement = class extends Object {
      };
      exports.EdgePlacement = EdgePlacement;
      exports.DEFAULT_EDGE_PLACEMENT = {
        rotate: true,
        side: "top",
        position: 0.5,
        offset: 7
      };
    }
  });

  // node_modules/sprotty/lib/features/edit/model.js
  var require_model11 = __commonJS({
    "node_modules/sprotty/lib/features/edit/model.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isWithEditableLabel = exports.withEditLabelFeature = exports.isEditableLabel = exports.editLabelFeature = exports.canEditRouting = exports.editFeature = void 0;
      var model_1 = require_model9();
      exports.editFeature = Symbol("editFeature");
      function canEditRouting(element) {
        return element instanceof model_1.SRoutableElement && element.hasFeature(exports.editFeature);
      }
      exports.canEditRouting = canEditRouting;
      exports.editLabelFeature = Symbol("editLabelFeature");
      function isEditableLabel(element) {
        return "text" in element && element.hasFeature(exports.editLabelFeature);
      }
      exports.isEditableLabel = isEditableLabel;
      exports.withEditLabelFeature = Symbol("withEditLabelFeature");
      function isWithEditableLabel(element) {
        return "editableLabel" in element && element.hasFeature(exports.withEditLabelFeature);
      }
      exports.isWithEditableLabel = isWithEditableLabel;
    }
  });

  // node_modules/sprotty/lib/features/viewport/model.js
  var require_model12 = __commonJS({
    "node_modules/sprotty/lib/features/viewport/model.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isViewport = exports.viewportFeature = void 0;
      var smodel_1 = require_smodel();
      exports.viewportFeature = Symbol("viewportFeature");
      function isViewport(element) {
        return element instanceof smodel_1.SModelRoot && element.hasFeature(exports.viewportFeature) && "zoom" in element && "scroll" in element;
      }
      exports.isViewport = isViewport;
    }
  });

  // node_modules/sprotty/lib/features/export/model.js
  var require_model13 = __commonJS({
    "node_modules/sprotty/lib/features/export/model.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isExportable = exports.exportFeature = void 0;
      exports.exportFeature = Symbol("exportFeature");
      function isExportable(element) {
        return element.hasFeature(exports.exportFeature);
      }
      exports.isExportable = isExportable;
    }
  });

  // node_modules/sprotty/lib/features/viewport/viewport-root.js
  var require_viewport_root = __commonJS({
    "node_modules/sprotty/lib/features/viewport/viewport-root.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ViewportRootElement = void 0;
      var geometry_1 = require_geometry();
      var smodel_1 = require_smodel();
      var model_1 = require_model12();
      var model_2 = require_model13();
      var ViewportRootElement = class extends smodel_1.SModelRoot {
        constructor(index) {
          super(index);
          this.scroll = { x: 0, y: 0 };
          this.zoom = 1;
          this.position = geometry_1.Point.ORIGIN;
          this.size = geometry_1.Dimension.EMPTY;
        }
        get bounds() {
          return {
            x: this.position.x,
            y: this.position.y,
            width: this.size.width,
            height: this.size.height
          };
        }
        set bounds(newBounds) {
          this.position = {
            x: newBounds.x,
            y: newBounds.y
          };
          this.size = {
            width: newBounds.width,
            height: newBounds.height
          };
        }
        localToParent(point) {
          const result = {
            x: (point.x - this.scroll.x) * this.zoom,
            y: (point.y - this.scroll.y) * this.zoom,
            width: -1,
            height: -1
          };
          if ((0, geometry_1.isBounds)(point)) {
            result.width = point.width * this.zoom;
            result.height = point.height * this.zoom;
          }
          return result;
        }
        parentToLocal(point) {
          const result = {
            x: point.x / this.zoom + this.scroll.x,
            y: point.y / this.zoom + this.scroll.y,
            width: -1,
            height: -1
          };
          if ((0, geometry_1.isBounds)(point) && geometry_1.Dimension.isValid(point)) {
            result.width = point.width / this.zoom;
            result.height = point.height / this.zoom;
          }
          return result;
        }
      };
      exports.ViewportRootElement = ViewportRootElement;
      ViewportRootElement.DEFAULT_FEATURES = [model_1.viewportFeature, model_2.exportFeature];
    }
  });

  // node_modules/sprotty/lib/graph/sgraph.js
  var require_sgraph = __commonJS({
    "node_modules/sprotty/lib/graph/sgraph.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SGraphIndex = exports.SCompartment = exports.SLabel = exports.SEdge = exports.SPort = exports.SNode = exports.SGraph = void 0;
      var geometry_1 = require_geometry();
      var smodel_1 = require_smodel();
      var model_1 = require_model2();
      var model_2 = require_model10();
      var delete_1 = require_delete();
      var model_3 = require_model11();
      var model_4 = require_model3();
      var model_5 = require_model7();
      var model_6 = require_model8();
      var model_7 = require_model9();
      var model_8 = require_model6();
      var viewport_root_1 = require_viewport_root();
      var iterable_1 = require_iterable();
      var SGraph2 = class extends viewport_root_1.ViewportRootElement {
        constructor(index = new SGraphIndex()) {
          super(index);
        }
      };
      exports.SGraph = SGraph2;
      var SNode = class extends model_7.SConnectableElement {
        constructor() {
          super(...arguments);
          this.selected = false;
          this.hoverFeedback = false;
          this.opacity = 1;
        }
        canConnect(routable, role) {
          return this.children.find((c) => c instanceof SPort) === void 0;
        }
        get incomingEdges() {
          const index = this.index;
          if (index instanceof SGraphIndex) {
            return index.getIncomingEdges(this);
          }
          const allEdges = this.index.all().filter((e) => e instanceof SEdge2);
          return allEdges.filter((e) => e.targetId === this.id);
        }
        get outgoingEdges() {
          const index = this.index;
          if (index instanceof SGraphIndex) {
            return index.getOutgoingEdges(this);
          }
          const allEdges = this.index.all().filter((e) => e instanceof SEdge2);
          return allEdges.filter((e) => e.sourceId === this.id);
        }
      };
      exports.SNode = SNode;
      SNode.DEFAULT_FEATURES = [
        model_7.connectableFeature,
        delete_1.deletableFeature,
        model_8.selectFeature,
        model_1.boundsFeature,
        model_6.moveFeature,
        model_1.layoutContainerFeature,
        model_4.fadeFeature,
        model_5.hoverFeedbackFeature,
        model_5.popupFeature
      ];
      var SPort = class extends model_7.SConnectableElement {
        constructor() {
          super(...arguments);
          this.selected = false;
          this.hoverFeedback = false;
          this.opacity = 1;
        }
        get incomingEdges() {
          const index = this.index;
          if (index instanceof SGraphIndex) {
            return index.getIncomingEdges(this);
          }
          return super.incomingEdges.filter((e) => e instanceof SEdge2);
        }
        get outgoingEdges() {
          const index = this.index;
          if (index instanceof SGraphIndex) {
            return index.getOutgoingEdges(this);
          }
          return super.outgoingEdges.filter((e) => e instanceof SEdge2);
        }
      };
      exports.SPort = SPort;
      SPort.DEFAULT_FEATURES = [
        model_7.connectableFeature,
        model_8.selectFeature,
        model_1.boundsFeature,
        model_4.fadeFeature,
        model_5.hoverFeedbackFeature
      ];
      var SEdge2 = class extends model_7.SRoutableElement {
        constructor() {
          super(...arguments);
          this.selected = false;
          this.hoverFeedback = false;
          this.opacity = 1;
        }
      };
      exports.SEdge = SEdge2;
      SEdge2.DEFAULT_FEATURES = [
        model_3.editFeature,
        delete_1.deletableFeature,
        model_8.selectFeature,
        model_4.fadeFeature,
        model_5.hoverFeedbackFeature
      ];
      var SLabel = class extends model_1.SShapeElement {
        constructor() {
          super(...arguments);
          this.selected = false;
          this.alignment = geometry_1.Point.ORIGIN;
          this.opacity = 1;
        }
      };
      exports.SLabel = SLabel;
      SLabel.DEFAULT_FEATURES = [
        model_1.boundsFeature,
        model_1.alignFeature,
        model_1.layoutableChildFeature,
        model_2.edgeLayoutFeature,
        model_4.fadeFeature
      ];
      var SCompartment = class extends model_1.SShapeElement {
        constructor() {
          super(...arguments);
          this.opacity = 1;
        }
      };
      exports.SCompartment = SCompartment;
      SCompartment.DEFAULT_FEATURES = [
        model_1.boundsFeature,
        model_1.layoutContainerFeature,
        model_1.layoutableChildFeature,
        model_4.fadeFeature
      ];
      var SGraphIndex = class extends smodel_1.ModelIndexImpl {
        constructor() {
          super(...arguments);
          this.outgoing = /* @__PURE__ */ new Map();
          this.incoming = /* @__PURE__ */ new Map();
        }
        add(element) {
          super.add(element);
          if (element instanceof SEdge2) {
            if (element.sourceId) {
              const sourceArr = this.outgoing.get(element.sourceId);
              if (sourceArr === void 0)
                this.outgoing.set(element.sourceId, [element]);
              else
                sourceArr.push(element);
            }
            if (element.targetId) {
              const targetArr = this.incoming.get(element.targetId);
              if (targetArr === void 0)
                this.incoming.set(element.targetId, [element]);
              else
                targetArr.push(element);
            }
          }
        }
        remove(element) {
          super.remove(element);
          if (element instanceof SEdge2) {
            const sourceArr = this.outgoing.get(element.sourceId);
            if (sourceArr !== void 0) {
              const index = sourceArr.indexOf(element);
              if (index >= 0) {
                if (sourceArr.length === 1)
                  this.outgoing.delete(element.sourceId);
                else
                  sourceArr.splice(index, 1);
              }
            }
            const targetArr = this.incoming.get(element.targetId);
            if (targetArr !== void 0) {
              const index = targetArr.indexOf(element);
              if (index >= 0) {
                if (targetArr.length === 1)
                  this.incoming.delete(element.targetId);
                else
                  targetArr.splice(index, 1);
              }
            }
          }
        }
        getAttachedElements(element) {
          return new iterable_1.FluentIterableImpl(() => ({
            outgoing: this.outgoing.get(element.id),
            incoming: this.incoming.get(element.id),
            nextOutgoingIndex: 0,
            nextIncomingIndex: 0
          }), (state) => {
            let index = state.nextOutgoingIndex;
            if (state.outgoing !== void 0 && index < state.outgoing.length) {
              state.nextOutgoingIndex = index + 1;
              return { done: false, value: state.outgoing[index] };
            }
            index = state.nextIncomingIndex;
            if (state.incoming !== void 0) {
              while (index < state.incoming.length) {
                const edge = state.incoming[index];
                if (edge.sourceId !== edge.targetId) {
                  state.nextIncomingIndex = index + 1;
                  return { done: false, value: edge };
                }
                index++;
              }
            }
            return { done: true, value: void 0 };
          });
        }
        getIncomingEdges(element) {
          return this.incoming.get(element.id) || [];
        }
        getOutgoingEdges(element) {
          return this.outgoing.get(element.id) || [];
        }
      };
      exports.SGraphIndex = SGraphIndex;
    }
  });

  // node_modules/sprotty/lib/features/routing/anchor.js
  var require_anchor = __commonJS({
    "node_modules/sprotty/lib/features/routing/anchor.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      var __param = exports && exports.__param || function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.AnchorComputerRegistry = exports.RECTANGULAR_ANCHOR_KIND = exports.ELLIPTIC_ANCHOR_KIND = exports.DIAMOND_ANCHOR_KIND = void 0;
      var inversify_1 = require_inversify();
      var types_1 = require_types();
      var registry_1 = require_registry();
      exports.DIAMOND_ANCHOR_KIND = "diamond";
      exports.ELLIPTIC_ANCHOR_KIND = "elliptic";
      exports.RECTANGULAR_ANCHOR_KIND = "rectangular";
      var AnchorComputerRegistry = class AnchorComputerRegistry extends registry_1.InstanceRegistry {
        constructor(anchors) {
          super();
          anchors.forEach((anchor) => this.register(anchor.kind, anchor));
        }
        get defaultAnchorKind() {
          return exports.RECTANGULAR_ANCHOR_KIND;
        }
        get(routerKind, anchorKind) {
          return super.get(`${routerKind}:${anchorKind || this.defaultAnchorKind}`);
        }
      };
      AnchorComputerRegistry = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.multiInject)(types_1.TYPES.IAnchorComputer)),
        __metadata("design:paramtypes", [Array])
      ], AnchorComputerRegistry);
      exports.AnchorComputerRegistry = AnchorComputerRegistry;
    }
  });

  // node_modules/sprotty/lib/features/routing/abstract-edge-router.js
  var require_abstract_edge_router = __commonJS({
    "node_modules/sprotty/lib/features/routing/abstract-edge-router.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.AbstractEdgeRouter = exports.DefaultAnchors = exports.Side = void 0;
      var inversify_1 = require_inversify();
      var geometry_1 = require_geometry();
      var smodel_utils_1 = require_smodel_utils();
      var model_1 = require_model9();
      var anchor_1 = require_anchor();
      var model_2 = require_model9();
      var Side;
      (function(Side2) {
        Side2[Side2["RIGHT"] = 0] = "RIGHT";
        Side2[Side2["LEFT"] = 1] = "LEFT";
        Side2[Side2["TOP"] = 2] = "TOP";
        Side2[Side2["BOTTOM"] = 3] = "BOTTOM";
      })(Side = exports.Side || (exports.Side = {}));
      var DefaultAnchors = class {
        constructor(element, edgeParent, kind) {
          this.element = element;
          this.kind = kind;
          const bounds = element.bounds;
          this.bounds = (0, smodel_utils_1.translateBounds)(bounds, element.parent, edgeParent);
          this.left = { x: this.bounds.x, y: this.bounds.y + 0.5 * this.bounds.height, kind };
          this.right = { x: this.bounds.x + this.bounds.width, y: this.bounds.y + 0.5 * this.bounds.height, kind };
          this.top = { x: this.bounds.x + 0.5 * this.bounds.width, y: this.bounds.y, kind };
          this.bottom = { x: this.bounds.x + 0.5 * this.bounds.width, y: this.bounds.y + this.bounds.height, kind };
        }
        get(side) {
          return this[Side[side].toLowerCase()];
        }
        getNearestSide(point) {
          const leftDistance = geometry_1.Point.euclideanDistance(point, this.left);
          const rightDistance = geometry_1.Point.euclideanDistance(point, this.right);
          const topDistance = geometry_1.Point.euclideanDistance(point, this.top);
          const bottomDistance = geometry_1.Point.euclideanDistance(point, this.bottom);
          let currentNearestSide = Side.LEFT;
          let currentMinDist = leftDistance;
          if (rightDistance < currentMinDist) {
            currentMinDist = rightDistance;
            currentNearestSide = Side.RIGHT;
          }
          if (topDistance < currentMinDist) {
            currentMinDist = topDistance;
            currentNearestSide = Side.TOP;
          }
          if (bottomDistance < currentMinDist) {
            currentMinDist = bottomDistance;
            currentNearestSide = Side.BOTTOM;
          }
          return currentNearestSide;
        }
      };
      exports.DefaultAnchors = DefaultAnchors;
      var AbstractEdgeRouter = class AbstractEdgeRouter {
        pointAt(edge, t) {
          const segments = this.calculateSegment(edge, t);
          if (!segments)
            return void 0;
          const { segmentStart, segmentEnd, lambda } = segments;
          return geometry_1.Point.linear(segmentStart, segmentEnd, lambda);
        }
        derivativeAt(edge, t) {
          const segments = this.calculateSegment(edge, t);
          if (!segments)
            return void 0;
          const { segmentStart, segmentEnd } = segments;
          return {
            x: segmentEnd.x - segmentStart.x,
            y: segmentEnd.y - segmentStart.y
          };
        }
        calculateSegment(edge, t) {
          if (t < 0 || t > 1)
            return void 0;
          const routedPoints = this.route(edge);
          if (routedPoints.length < 2)
            return void 0;
          const segmentLengths = [];
          let totalLength = 0;
          for (let i = 0; i < routedPoints.length - 1; ++i) {
            segmentLengths[i] = geometry_1.Point.euclideanDistance(routedPoints[i], routedPoints[i + 1]);
            totalLength += segmentLengths[i];
          }
          let currentLenght = 0;
          const tAsLenght = t * totalLength;
          for (let i = 0; i < routedPoints.length - 1; ++i) {
            const newLength = currentLenght + segmentLengths[i];
            if (segmentLengths[i] > 1e-8) {
              if (newLength >= tAsLenght) {
                const lambda = Math.max(0, tAsLenght - currentLenght) / segmentLengths[i];
                return {
                  segmentStart: routedPoints[i],
                  segmentEnd: routedPoints[i + 1],
                  lambda
                };
              }
            }
            currentLenght = newLength;
          }
          return {
            segmentEnd: routedPoints.pop(),
            segmentStart: routedPoints.pop(),
            lambda: 1
          };
        }
        addHandle(edge, kind, type, routingPointIndex) {
          const handle = new model_1.SRoutingHandle();
          handle.kind = kind;
          handle.pointIndex = routingPointIndex;
          handle.type = type;
          if (kind === "target" && edge.id === model_1.edgeInProgressID)
            handle.id = model_1.edgeInProgressTargetHandleID;
          edge.add(handle);
          return handle;
        }
        getHandlePosition(edge, route, handle) {
          switch (handle.kind) {
            case "source":
              if (edge.source instanceof model_1.SDanglingAnchor)
                return edge.source.position;
              else
                return route[0];
            case "target":
              if (edge.target instanceof model_1.SDanglingAnchor)
                return edge.target.position;
              else {
                return route[route.length - 1];
              }
            default:
              const position = this.getInnerHandlePosition(edge, route, handle);
              if (position !== void 0)
                return position;
              if (handle.pointIndex >= 0 && handle.pointIndex < edge.routingPoints.length)
                return edge.routingPoints[handle.pointIndex];
          }
          return void 0;
        }
        findRouteSegment(edge, route, handleIndex) {
          const getIndex = (rp) => {
            if (rp.pointIndex !== void 0)
              return rp.pointIndex;
            else if (rp.kind === "target")
              return edge.routingPoints.length;
            else
              return -2;
          };
          let start, end;
          for (const rp of route) {
            const i = getIndex(rp);
            if (i <= handleIndex && (start === void 0 || i > getIndex(start)))
              start = rp;
            if (i > handleIndex && (end === void 0 || i < getIndex(end)))
              end = rp;
          }
          return { start, end };
        }
        getTranslatedAnchor(connectable, refPoint, refContainer, edge, anchorCorrection = 0) {
          const translatedRefPoint = (0, smodel_utils_1.translatePoint)(refPoint, refContainer, connectable.parent);
          const anchorComputer = this.getAnchorComputer(connectable);
          const strokeCorrection = 0.5 * connectable.strokeWidth;
          const anchor = anchorComputer.getAnchor(connectable, translatedRefPoint, anchorCorrection + strokeCorrection);
          return (0, smodel_utils_1.translatePoint)(anchor, connectable.parent, edge.parent);
        }
        getAnchorComputer(connectable) {
          return this.anchorRegistry.get(this.kind, connectable.anchorKind);
        }
        applyHandleMoves(edge, moves) {
          const remainingMoves = moves.slice();
          moves.forEach((move) => {
            const handle = move.handle;
            if (handle.kind === "source" && !(edge.source instanceof model_1.SDanglingAnchor)) {
              const anchor = new model_1.SDanglingAnchor();
              anchor.id = edge.id + "_dangling-source";
              anchor.original = edge.source;
              anchor.position = move.toPosition;
              handle.root.add(anchor);
              handle.danglingAnchor = anchor;
              edge.sourceId = anchor.id;
            } else if (handle.kind === "target" && !(edge.target instanceof model_1.SDanglingAnchor)) {
              const anchor = new model_1.SDanglingAnchor();
              anchor.id = edge.id + "_dangling-target";
              anchor.original = edge.target;
              anchor.position = move.toPosition;
              handle.root.add(anchor);
              handle.danglingAnchor = anchor;
              edge.targetId = anchor.id;
            }
            if (handle.danglingAnchor) {
              handle.danglingAnchor.position = move.toPosition;
              remainingMoves.splice(remainingMoves.indexOf(move), 1);
            }
          });
          if (remainingMoves.length > 0)
            this.applyInnerHandleMoves(edge, remainingMoves);
          this.cleanupRoutingPoints(edge, edge.routingPoints, true, true);
        }
        cleanupRoutingPoints(edge, routingPoints, updateHandles, addRoutingPoints) {
          const sourceAnchors = new DefaultAnchors(edge.source, edge.parent, "source");
          const targetAnchors = new DefaultAnchors(edge.target, edge.parent, "target");
          this.resetRoutingPointsOnReconnect(edge, routingPoints, updateHandles, sourceAnchors, targetAnchors);
        }
        resetRoutingPointsOnReconnect(edge, routingPoints, updateHandles, sourceAnchors, targetAnchors) {
          if (routingPoints.length === 0 || edge.source instanceof model_1.SDanglingAnchor || edge.target instanceof model_1.SDanglingAnchor) {
            const options = this.getOptions(edge);
            const corners = this.calculateDefaultCorners(edge, sourceAnchors, targetAnchors, options);
            routingPoints.splice(0, routingPoints.length, ...corners);
            if (updateHandles) {
              let maxPointIndex = -2;
              edge.children.forEach((child) => {
                if (child instanceof model_1.SRoutingHandle) {
                  if (child.kind === "target")
                    child.pointIndex = routingPoints.length;
                  else if (child.kind === "line" && child.pointIndex >= routingPoints.length)
                    edge.remove(child);
                  else
                    maxPointIndex = Math.max(child.pointIndex, maxPointIndex);
                }
              });
              for (let i = maxPointIndex; i < routingPoints.length - 1; ++i)
                this.addHandle(edge, "manhattan-50%", "volatile-routing-point", i);
            }
            return true;
          }
          return false;
        }
        applyReconnect(edge, newSourceId, newTargetId) {
          let hasChanged = false;
          if (newSourceId) {
            const newSource = edge.root.index.getById(newSourceId);
            if (newSource instanceof model_2.SConnectableElement) {
              edge.sourceId = newSource.id;
              hasChanged = true;
            }
          }
          if (newTargetId) {
            const newTarget = edge.root.index.getById(newTargetId);
            if (newTarget instanceof model_2.SConnectableElement) {
              edge.targetId = newTarget.id;
              hasChanged = true;
            }
          }
          if (hasChanged) {
            edge.index.remove(edge);
            edge.index.add(edge);
            if (this.getSelfEdgeIndex(edge) > -1) {
              edge.routingPoints = [];
              this.cleanupRoutingPoints(edge, edge.routingPoints, true, true);
            }
          }
        }
        takeSnapshot(edge) {
          return {
            routingPoints: edge.routingPoints.slice(),
            routingHandles: edge.children.filter((child) => child instanceof model_1.SRoutingHandle).map((child) => child),
            routedPoints: this.route(edge),
            router: this,
            source: edge.source,
            target: edge.target
          };
        }
        applySnapshot(edge, snapshot) {
          edge.routingPoints = snapshot.routingPoints;
          edge.removeAll((child) => child instanceof model_1.SRoutingHandle);
          edge.routerKind = snapshot.router.kind;
          snapshot.routingHandles.forEach((handle) => edge.add(handle));
          if (snapshot.source)
            edge.sourceId = snapshot.source.id;
          if (snapshot.target)
            edge.targetId = snapshot.target.id;
          edge.root.index.remove(edge);
          edge.root.index.add(edge);
        }
        calculateDefaultCorners(edge, sourceAnchors, targetAnchors, options) {
          const selfEdgeIndex = this.getSelfEdgeIndex(edge);
          if (selfEdgeIndex >= 0) {
            const standardDist = options.standardDistance;
            const delta = options.selfEdgeOffset * Math.min(sourceAnchors.bounds.width, sourceAnchors.bounds.height);
            switch (selfEdgeIndex % 4) {
              case 0:
                return [
                  { x: sourceAnchors.get(Side.RIGHT).x + standardDist, y: sourceAnchors.get(Side.RIGHT).y + delta },
                  { x: sourceAnchors.get(Side.RIGHT).x + standardDist, y: sourceAnchors.get(Side.BOTTOM).y + standardDist },
                  { x: sourceAnchors.get(Side.BOTTOM).x + delta, y: sourceAnchors.get(Side.BOTTOM).y + standardDist }
                ];
              case 1:
                return [
                  { x: sourceAnchors.get(Side.BOTTOM).x - delta, y: sourceAnchors.get(Side.BOTTOM).y + standardDist },
                  { x: sourceAnchors.get(Side.LEFT).x - standardDist, y: sourceAnchors.get(Side.BOTTOM).y + standardDist },
                  { x: sourceAnchors.get(Side.LEFT).x - standardDist, y: sourceAnchors.get(Side.LEFT).y + delta }
                ];
              case 2:
                return [
                  { x: sourceAnchors.get(Side.LEFT).x - standardDist, y: sourceAnchors.get(Side.LEFT).y - delta },
                  { x: sourceAnchors.get(Side.LEFT).x - standardDist, y: sourceAnchors.get(Side.TOP).y - standardDist },
                  { x: sourceAnchors.get(Side.TOP).x - delta, y: sourceAnchors.get(Side.TOP).y - standardDist }
                ];
              case 3:
                return [
                  { x: sourceAnchors.get(Side.TOP).x + delta, y: sourceAnchors.get(Side.TOP).y - standardDist },
                  { x: sourceAnchors.get(Side.RIGHT).x + standardDist, y: sourceAnchors.get(Side.TOP).y - standardDist },
                  { x: sourceAnchors.get(Side.RIGHT).x + standardDist, y: sourceAnchors.get(Side.RIGHT).y - delta }
                ];
            }
          }
          return [];
        }
        getSelfEdgeIndex(edge) {
          if (!edge.source || edge.source !== edge.target)
            return -1;
          return edge.source.outgoingEdges.filter((otherEdge) => otherEdge.target === edge.source).indexOf(edge);
        }
        commitRoute(edge, routedPoints) {
          const newRoutingPoints = [];
          for (let i = 1; i < routedPoints.length - 1; ++i)
            newRoutingPoints.push({ x: routedPoints[i].x, y: routedPoints[i].y });
          edge.routingPoints = newRoutingPoints;
        }
      };
      __decorate([
        (0, inversify_1.inject)(anchor_1.AnchorComputerRegistry),
        __metadata("design:type", anchor_1.AnchorComputerRegistry)
      ], AbstractEdgeRouter.prototype, "anchorRegistry", void 0);
      AbstractEdgeRouter = __decorate([
        (0, inversify_1.injectable)()
      ], AbstractEdgeRouter);
      exports.AbstractEdgeRouter = AbstractEdgeRouter;
    }
  });

  // node_modules/sprotty/lib/features/routing/polyline-edge-router.js
  var require_polyline_edge_router = __commonJS({
    "node_modules/sprotty/lib/features/routing/polyline-edge-router.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      var PolylineEdgeRouter_1;
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.PolylineEdgeRouter = void 0;
      var inversify_1 = require_inversify();
      var geometry_1 = require_geometry();
      var model_1 = require_model9();
      var anchor_1 = require_anchor();
      var abstract_edge_router_1 = require_abstract_edge_router();
      var PolylineEdgeRouter = PolylineEdgeRouter_1 = class PolylineEdgeRouter extends abstract_edge_router_1.AbstractEdgeRouter {
        get kind() {
          return PolylineEdgeRouter_1.KIND;
        }
        getOptions(edge) {
          return {
            minimalPointDistance: 2,
            removeAngleThreshold: 0.1,
            standardDistance: 20,
            selfEdgeOffset: 0.25
          };
        }
        route(edge) {
          const source = edge.source;
          const target = edge.target;
          if (source === void 0 || target === void 0) {
            return [];
          }
          let sourceAnchor;
          let targetAnchor;
          const options = this.getOptions(edge);
          const routingPoints = edge.routingPoints.length > 0 ? edge.routingPoints : [];
          this.cleanupRoutingPoints(edge, routingPoints, false, false);
          const rpCount = routingPoints !== void 0 ? routingPoints.length : 0;
          if (rpCount === 0) {
            const startRef = geometry_1.Bounds.center(target.bounds);
            sourceAnchor = this.getTranslatedAnchor(source, startRef, target.parent, edge, edge.sourceAnchorCorrection);
            const endRef = geometry_1.Bounds.center(source.bounds);
            targetAnchor = this.getTranslatedAnchor(target, endRef, source.parent, edge, edge.targetAnchorCorrection);
          } else {
            const p0 = routingPoints[0];
            sourceAnchor = this.getTranslatedAnchor(source, p0, edge.parent, edge, edge.sourceAnchorCorrection);
            const pn = routingPoints[rpCount - 1];
            targetAnchor = this.getTranslatedAnchor(target, pn, edge.parent, edge, edge.targetAnchorCorrection);
          }
          const result = [];
          result.push({ kind: "source", x: sourceAnchor.x, y: sourceAnchor.y });
          for (let i = 0; i < rpCount; i++) {
            const p = routingPoints[i];
            if (i > 0 && i < rpCount - 1 || i === 0 && geometry_1.Point.maxDistance(sourceAnchor, p) >= options.minimalPointDistance + (edge.sourceAnchorCorrection || 0) || i === rpCount - 1 && geometry_1.Point.maxDistance(p, targetAnchor) >= options.minimalPointDistance + (edge.targetAnchorCorrection || 0)) {
              result.push({ kind: "linear", x: p.x, y: p.y, pointIndex: i });
            }
          }
          result.push({ kind: "target", x: targetAnchor.x, y: targetAnchor.y });
          return this.filterEditModeHandles(result, edge, options);
        }
        /**
         * Remove routed points that are in edit mode and for which the angle between the preceding and
         * following points falls below a threshold.
         */
        filterEditModeHandles(route, edge, options) {
          if (edge.children.length === 0)
            return route;
          let i = 0;
          while (i < route.length) {
            const curr = route[i];
            if (curr.pointIndex !== void 0) {
              const handle = edge.children.find((child) => child instanceof model_1.SRoutingHandle && child.kind === "junction" && child.pointIndex === curr.pointIndex);
              if (handle !== void 0 && handle.editMode && i > 0 && i < route.length - 1) {
                const prev = route[i - 1], next = route[i + 1];
                const prevDiff = { x: prev.x - curr.x, y: prev.y - curr.y };
                const nextDiff = { x: next.x - curr.x, y: next.y - curr.y };
                const angle = (0, geometry_1.angleBetweenPoints)(prevDiff, nextDiff);
                if (Math.abs(Math.PI - angle) < options.removeAngleThreshold) {
                  route.splice(i, 1);
                  continue;
                }
              }
            }
            i++;
          }
          return route;
        }
        createRoutingHandles(edge) {
          const rpCount = edge.routingPoints.length;
          this.addHandle(edge, "source", "routing-point", -2);
          this.addHandle(edge, "line", "volatile-routing-point", -1);
          for (let i = 0; i < rpCount; i++) {
            this.addHandle(edge, "junction", "routing-point", i);
            this.addHandle(edge, "line", "volatile-routing-point", i);
          }
          this.addHandle(edge, "target", "routing-point", rpCount);
        }
        getInnerHandlePosition(edge, route, handle) {
          if (handle.kind === "line") {
            const { start, end } = this.findRouteSegment(edge, route, handle.pointIndex);
            if (start !== void 0 && end !== void 0)
              return (0, geometry_1.centerOfLine)(start, end);
          }
          return void 0;
        }
        applyInnerHandleMoves(edge, moves) {
          moves.forEach((move) => {
            const handle = move.handle;
            const points = edge.routingPoints;
            let index = handle.pointIndex;
            if (handle.kind === "line") {
              handle.kind = "junction";
              handle.type = "routing-point";
              points.splice(index + 1, 0, move.fromPosition || points[Math.max(index, 0)]);
              edge.children.forEach((child) => {
                if (child instanceof model_1.SRoutingHandle && (child === handle || child.pointIndex > index))
                  child.pointIndex++;
              });
              this.addHandle(edge, "line", "volatile-routing-point", index);
              index++;
              this.addHandle(edge, "line", "volatile-routing-point", index);
            }
            if (index >= 0 && index < points.length) {
              points[index] = move.toPosition;
            }
          });
        }
      };
      PolylineEdgeRouter.KIND = "polyline";
      __decorate([
        (0, inversify_1.inject)(anchor_1.AnchorComputerRegistry),
        __metadata("design:type", anchor_1.AnchorComputerRegistry)
      ], PolylineEdgeRouter.prototype, "anchorRegistry", void 0);
      PolylineEdgeRouter = PolylineEdgeRouter_1 = __decorate([
        (0, inversify_1.injectable)()
      ], PolylineEdgeRouter);
      exports.PolylineEdgeRouter = PolylineEdgeRouter;
    }
  });

  // node_modules/sprotty/lib/features/routing/routing.js
  var require_routing = __commonJS({
    "node_modules/sprotty/lib/features/routing/routing.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      var __param = exports && exports.__param || function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.EdgeRouting = exports.EdgeRouterRegistry = void 0;
      var inversify_1 = require_inversify();
      var smodel_1 = require_smodel();
      var types_1 = require_types();
      var view_1 = require_view();
      var registry_1 = require_registry();
      var model_1 = require_model9();
      var polyline_edge_router_1 = require_polyline_edge_router();
      function isMultipleEdgesRouter(router) {
        return router.routeAll !== void 0;
      }
      var EdgeRouterRegistry = class EdgeRouterRegistry extends registry_1.InstanceRegistry {
        constructor(edgeRouters) {
          super();
          edgeRouters.forEach((router) => this.register(router.kind, router));
        }
        get defaultKind() {
          return polyline_edge_router_1.PolylineEdgeRouter.KIND;
        }
        get(kind) {
          return super.get(kind || this.defaultKind);
        }
        /**
         * Computes the routes of all edges contained by the specified `parent`.
         * After all routes are available, it'll apply the registered `EdgeRoutePostProcessors`.
         * @param parent the parent to traverse for edges
         * @returns the routes of all edges that are children of `parent`
         */
        routeAllChildren(parent) {
          const routing = this.doRouteAllChildren(parent);
          for (const postProcessor of this.postProcessors) {
            postProcessor.apply(routing);
          }
          return routing;
        }
        /**
         * Recursively traverses the children of `parent`, collects children grouped by router kind,
         * and then routes them either.
         * @param parent the parent to traverse for edges
         * @returns the routes of all edges that are children of `parent`
         */
        doRouteAllChildren(parent) {
          const routing = new EdgeRouting();
          const routersEdges = /* @__PURE__ */ new Map();
          const elementsToProcess = [parent];
          while (elementsToProcess.length > 0) {
            const element = elementsToProcess.shift();
            for (const child of element.children) {
              if (child instanceof model_1.SRoutableElement) {
                const routerKind = child.routerKind || this.defaultKind;
                if (routersEdges.has(routerKind)) {
                  routersEdges.get(routerKind).push(child);
                } else {
                  routersEdges.set(routerKind, [child]);
                }
              }
              if (child instanceof smodel_1.SParentElement) {
                elementsToProcess.push(child);
              }
            }
          }
          routersEdges.forEach((edges, routerKind) => {
            const childRouter = this.get(routerKind);
            if (isMultipleEdgesRouter(childRouter)) {
              routing.setAll(childRouter.routeAll(edges, parent));
            } else {
              for (const edge of edges) {
                routing.set(edge.id, this.route(edge));
              }
            }
          });
          return routing;
        }
        /**
         * Computes or obtains the route of a single edge.
         * @param edge the edge to be routed
         * @param args arguments that may contain an `EdgeRouting` already
         * @returns the route of the specified `edge`
         */
        route(edge, args) {
          const edgeRouting = (0, view_1.findArgValue)(args, "edgeRouting");
          if (edgeRouting) {
            const route = edgeRouting.get(edge.id);
            if (route) {
              return route;
            }
          }
          const router = this.get(edge.routerKind);
          return router.route(edge);
        }
      };
      __decorate([
        (0, inversify_1.multiInject)(types_1.TYPES.IEdgeRoutePostprocessor),
        (0, inversify_1.optional)(),
        __metadata("design:type", Array)
      ], EdgeRouterRegistry.prototype, "postProcessors", void 0);
      EdgeRouterRegistry = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.multiInject)(types_1.TYPES.IEdgeRouter)),
        __metadata("design:paramtypes", [Array])
      ], EdgeRouterRegistry);
      exports.EdgeRouterRegistry = EdgeRouterRegistry;
      var EdgeRouting = class {
        constructor() {
          this.routesMap = /* @__PURE__ */ new Map();
        }
        set(routableId, route) {
          this.routesMap.set(routableId, route);
        }
        setAll(otherRoutes) {
          otherRoutes.routes.forEach((route, routableId) => this.set(routableId, route));
        }
        get(routableId) {
          return this.routesMap.get(routableId);
        }
        get routes() {
          return this.routesMap;
        }
      };
      exports.EdgeRouting = EdgeRouting;
    }
  });

  // node_modules/sprotty/lib/features/edge-layout/edge-layout.js
  var require_edge_layout = __commonJS({
    "node_modules/sprotty/lib/features/edge-layout/edge-layout.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.EdgeLayoutPostprocessor = void 0;
      var inversify_1 = require_inversify();
      var geometry_1 = require_geometry();
      var smodel_1 = require_smodel();
      var vnode_utils_1 = require_vnode_utils();
      var sgraph_1 = require_sgraph();
      var model_1 = require_model2();
      var model_2 = require_model10();
      var routing_1 = require_routing();
      var EdgeLayoutPostprocessor = class EdgeLayoutPostprocessor {
        decorate(vnode, element) {
          if ((0, model_2.isEdgeLayoutable)(element) && element.parent instanceof sgraph_1.SEdge) {
            if (element.bounds !== geometry_1.Bounds.EMPTY) {
              const placement = this.getEdgePlacement(element);
              const edge = element.parent;
              const position = Math.min(1, Math.max(0, placement.position));
              const router = this.edgeRouterRegistry.get(edge.routerKind);
              const pointOnEdge = router.pointAt(edge, position);
              const derivativeOnEdge = router.derivativeAt(edge, position);
              let transform = "";
              if (pointOnEdge && derivativeOnEdge) {
                transform += `translate(${pointOnEdge.x}, ${pointOnEdge.y})`;
                const angle = (0, geometry_1.toDegrees)(Math.atan2(derivativeOnEdge.y, derivativeOnEdge.x));
                if (placement.rotate) {
                  let flippedAngle = angle;
                  if (Math.abs(angle) > 90) {
                    if (angle < 0)
                      flippedAngle += 180;
                    else if (angle > 0)
                      flippedAngle -= 180;
                  }
                  transform += ` rotate(${flippedAngle})`;
                  const alignment = this.getRotatedAlignment(element, placement, flippedAngle !== angle);
                  transform += ` translate(${alignment.x}, ${alignment.y})`;
                } else {
                  const alignment = this.getAlignment(element, placement, angle);
                  transform += ` translate(${alignment.x}, ${alignment.y})`;
                }
                (0, vnode_utils_1.setAttr)(vnode, "transform", transform);
              }
            }
          }
          return vnode;
        }
        getRotatedAlignment(element, placement, flip) {
          let x = (0, model_1.isAlignable)(element) ? element.alignment.x : 0;
          let y = (0, model_1.isAlignable)(element) ? element.alignment.y : 0;
          const bounds = element.bounds;
          if (placement.side === "on")
            return { x: x - 0.5 * bounds.height, y: y - 0.5 * bounds.height };
          if (flip) {
            if (placement.position < 0.3333333)
              x -= bounds.width + placement.offset;
            else if (placement.position < 0.6666666)
              x -= 0.5 * bounds.width;
            else
              x += placement.offset;
            switch (placement.side) {
              case "left":
              case "bottom":
                y -= placement.offset + bounds.height;
                break;
              case "right":
              case "top":
                y += placement.offset;
            }
          } else {
            if (placement.position < 0.3333333)
              x += placement.offset;
            else if (placement.position < 0.6666666)
              x -= 0.5 * bounds.width;
            else
              x -= bounds.width + placement.offset;
            switch (placement.side) {
              case "right":
              case "bottom":
                y += -placement.offset - bounds.height;
                break;
              case "left":
              case "top":
                y += placement.offset;
            }
          }
          return { x, y };
        }
        getEdgePlacement(element) {
          let current = element;
          const allPlacements = [];
          while (current !== void 0) {
            const placement = current.edgePlacement;
            if (placement !== void 0)
              allPlacements.push(placement);
            if (current instanceof smodel_1.SChildElement)
              current = current.parent;
            else
              break;
          }
          return allPlacements.reverse().reduce((a, b) => {
            return Object.assign(Object.assign({}, a), b);
          }, model_2.DEFAULT_EDGE_PLACEMENT);
        }
        getAlignment(label, placement, angle) {
          const bounds = label.bounds;
          const x = (0, model_1.isAlignable)(label) ? label.alignment.x - bounds.width : 0;
          const y = (0, model_1.isAlignable)(label) ? label.alignment.y - bounds.height : 0;
          if (placement.side === "on")
            return { x: x + 0.5 * bounds.height, y: y + 0.5 * bounds.height };
          const quadrant = this.getQuadrant(angle);
          const midLeft = { x: placement.offset, y: y + 0.5 * bounds.height };
          const topLeft = { x: placement.offset, y: y + bounds.height + placement.offset };
          const topRight = { x: -bounds.width - placement.offset, y: y + bounds.height + placement.offset };
          const midRight = { x: -bounds.width - placement.offset, y: y + 0.5 * bounds.height };
          const bottomRight = { x: -bounds.width - placement.offset, y: y - placement.offset };
          const bottomLeft = { x: placement.offset, y: y - placement.offset };
          switch (placement.side) {
            case "left":
              switch (quadrant.orientation) {
                case "west":
                  return geometry_1.Point.linear(topLeft, topRight, quadrant.position);
                case "north":
                  return geometry_1.Point.linear(topRight, bottomRight, quadrant.position);
                case "east":
                  return geometry_1.Point.linear(bottomRight, bottomLeft, quadrant.position);
                case "south":
                  return geometry_1.Point.linear(bottomLeft, topLeft, quadrant.position);
              }
              break;
            case "right":
              switch (quadrant.orientation) {
                case "west":
                  return geometry_1.Point.linear(bottomRight, bottomLeft, quadrant.position);
                case "north":
                  return geometry_1.Point.linear(bottomLeft, topLeft, quadrant.position);
                case "east":
                  return geometry_1.Point.linear(topLeft, topRight, quadrant.position);
                case "south":
                  return geometry_1.Point.linear(topRight, bottomRight, quadrant.position);
              }
              break;
            case "top":
              switch (quadrant.orientation) {
                case "west":
                  return geometry_1.Point.linear(bottomRight, bottomLeft, quadrant.position);
                case "north":
                  return this.linearFlip(bottomLeft, midLeft, midRight, bottomRight, quadrant.position);
                case "east":
                  return geometry_1.Point.linear(bottomRight, bottomLeft, quadrant.position);
                case "south":
                  return this.linearFlip(bottomLeft, midLeft, midRight, bottomRight, quadrant.position);
              }
              break;
            case "bottom":
              switch (quadrant.orientation) {
                case "west":
                  return geometry_1.Point.linear(topLeft, topRight, quadrant.position);
                case "north":
                  return this.linearFlip(topRight, midRight, midLeft, topLeft, quadrant.position);
                case "east":
                  return geometry_1.Point.linear(topLeft, topRight, quadrant.position);
                case "south":
                  return this.linearFlip(topRight, midRight, midLeft, topLeft, quadrant.position);
              }
              break;
          }
          return { x: 0, y: 0 };
        }
        getQuadrant(angle) {
          if (Math.abs(angle) > 135)
            return { orientation: "west", position: (angle > 0 ? angle - 135 : angle + 225) / 90 };
          else if (angle < -45)
            return { orientation: "north", position: (angle + 135) / 90 };
          else if (angle < 45)
            return { orientation: "east", position: (angle + 45) / 90 };
          else
            return { orientation: "south", position: (angle - 45) / 90 };
        }
        linearFlip(p0, p1, p2, p3, position) {
          return position < 0.5 ? geometry_1.Point.linear(p0, p1, 2 * position) : geometry_1.Point.linear(p2, p3, 2 * position - 1);
        }
        postUpdate() {
        }
      };
      __decorate([
        (0, inversify_1.inject)(routing_1.EdgeRouterRegistry),
        __metadata("design:type", routing_1.EdgeRouterRegistry)
      ], EdgeLayoutPostprocessor.prototype, "edgeRouterRegistry", void 0);
      EdgeLayoutPostprocessor = __decorate([
        (0, inversify_1.injectable)()
      ], EdgeLayoutPostprocessor);
      exports.EdgeLayoutPostprocessor = EdgeLayoutPostprocessor;
    }
  });

  // node_modules/sprotty/lib/features/edge-layout/di.config.js
  var require_di_config2 = __commonJS({
    "node_modules/sprotty/lib/features/edge-layout/di.config.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var inversify_1 = require_inversify();
      var types_1 = require_types();
      var edge_layout_1 = require_edge_layout();
      var edgeLayoutModule = new inversify_1.ContainerModule((bind) => {
        bind(edge_layout_1.EdgeLayoutPostprocessor).toSelf().inSingletonScope();
        bind(types_1.TYPES.IVNodePostprocessor).toService(edge_layout_1.EdgeLayoutPostprocessor);
        bind(types_1.TYPES.HiddenVNodePostprocessor).toService(edge_layout_1.EdgeLayoutPostprocessor);
      });
      exports.default = edgeLayoutModule;
    }
  });

  // node_modules/sprotty/lib/features/edit/create.js
  var require_create = __commonJS({
    "node_modules/sprotty/lib/features/edit/create.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      var __param = exports && exports.__param || function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.CreateElementCommand = exports.CreateElementAction = void 0;
      var inversify_1 = require_inversify();
      var command_1 = require_command();
      var smodel_1 = require_smodel();
      var types_1 = require_types();
      var CreateElementAction;
      (function(CreateElementAction2) {
        CreateElementAction2.KIND = "createElement";
        function create(elementSchema, options) {
          return {
            kind: CreateElementAction2.KIND,
            elementSchema,
            containerId: options.containerId
          };
        }
        CreateElementAction2.create = create;
      })(CreateElementAction = exports.CreateElementAction || (exports.CreateElementAction = {}));
      var CreateElementCommand = class CreateElementCommand extends command_1.Command {
        constructor(action) {
          super();
          this.action = action;
        }
        execute(context) {
          const container = context.root.index.getById(this.action.containerId);
          if (container instanceof smodel_1.SParentElement) {
            this.container = container;
            this.newElement = context.modelFactory.createElement(this.action.elementSchema);
            this.container.add(this.newElement);
          }
          return context.root;
        }
        undo(context) {
          this.container.remove(this.newElement);
          return context.root;
        }
        redo(context) {
          this.container.add(this.newElement);
          return context.root;
        }
      };
      CreateElementCommand.KIND = CreateElementAction.KIND;
      CreateElementCommand = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(types_1.TYPES.Action)),
        __metadata("design:paramtypes", [Object])
      ], CreateElementCommand);
      exports.CreateElementCommand = CreateElementCommand;
    }
  });

  // node_modules/sprotty/lib/features/edit/create-on-drag.js
  var require_create_on_drag = __commonJS({
    "node_modules/sprotty/lib/features/edit/create-on-drag.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isCreatingOnDrag = exports.creatingOnDragFeature = void 0;
      exports.creatingOnDragFeature = Symbol("creatingOnDragFeature");
      function isCreatingOnDrag(element) {
        return element.hasFeature(exports.creatingOnDragFeature) && element.createAction !== void 0;
      }
      exports.isCreatingOnDrag = isCreatingOnDrag;
    }
  });

  // node_modules/sprotty/lib/utils/geometry.js
  var require_geometry2 = __commonJS({
    "node_modules/sprotty/lib/utils/geometry.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.intersection = exports.PointToPointLine = exports.Diamond = exports.linear = exports.almostEquals = exports.toRadians = exports.toDegrees = exports.magnitude = exports.normalize = exports.shiftTowards = exports.angleBetweenPoints = exports.angleOfPoint = exports.maxDistance = exports.manhattanDistance = exports.euclideanDistance = exports.Direction = exports.includes = exports.centerOfLine = exports.center = exports.translate = exports.combine = exports.isBounds = exports.EMPTY_BOUNDS = exports.isValidDimension = exports.EMPTY_DIMENSION = exports.pointEquals = exports.subtract = exports.add = exports.ORIGIN_POINT = void 0;
      exports.ORIGIN_POINT = Object.freeze({
        x: 0,
        y: 0
      });
      function add(p1, p2) {
        return {
          x: p1.x + p2.x,
          y: p1.y + p2.y
        };
      }
      exports.add = add;
      function subtract(p1, p2) {
        return {
          x: p1.x - p2.x,
          y: p1.y - p2.y
        };
      }
      exports.subtract = subtract;
      function pointEquals(point1, point2) {
        return point1.x === point2.x && point1.y === point2.y;
      }
      exports.pointEquals = pointEquals;
      exports.EMPTY_DIMENSION = Object.freeze({
        width: -1,
        height: -1
      });
      function isValidDimension(d) {
        return d.width >= 0 && d.height >= 0;
      }
      exports.isValidDimension = isValidDimension;
      exports.EMPTY_BOUNDS = Object.freeze({
        x: 0,
        y: 0,
        width: -1,
        height: -1
      });
      function isBounds(element) {
        return "x" in element && "y" in element && "width" in element && "height" in element;
      }
      exports.isBounds = isBounds;
      function combine(b0, b1) {
        if (!isValidDimension(b0))
          return isValidDimension(b1) ? b1 : exports.EMPTY_BOUNDS;
        if (!isValidDimension(b1))
          return b0;
        const minX = Math.min(b0.x, b1.x);
        const minY = Math.min(b0.y, b1.y);
        const maxX = Math.max(b0.x + (b0.width >= 0 ? b0.width : 0), b1.x + (b1.width >= 0 ? b1.width : 0));
        const maxY = Math.max(b0.y + (b0.height >= 0 ? b0.height : 0), b1.y + (b1.height >= 0 ? b1.height : 0));
        return {
          x: minX,
          y: minY,
          width: maxX - minX,
          height: maxY - minY
        };
      }
      exports.combine = combine;
      function translate(b, p) {
        return {
          x: b.x + p.x,
          y: b.y + p.y,
          width: b.width,
          height: b.height
        };
      }
      exports.translate = translate;
      function center(b) {
        return {
          x: b.x + (b.width >= 0 ? 0.5 * b.width : 0),
          y: b.y + (b.height >= 0 ? 0.5 * b.height : 0)
        };
      }
      exports.center = center;
      function centerOfLine(s, e) {
        const b = {
          x: s.x > e.x ? e.x : s.x,
          y: s.y > e.y ? e.y : s.y,
          width: Math.abs(e.x - s.x),
          height: Math.abs(e.y - s.y)
        };
        return center(b);
      }
      exports.centerOfLine = centerOfLine;
      function includes(b, p) {
        return p.x >= b.x && p.x <= b.x + b.width && p.y >= b.y && p.y <= b.y + b.height;
      }
      exports.includes = includes;
      var Direction;
      (function(Direction2) {
        Direction2[Direction2["left"] = 0] = "left";
        Direction2[Direction2["right"] = 1] = "right";
        Direction2[Direction2["up"] = 2] = "up";
        Direction2[Direction2["down"] = 3] = "down";
      })(Direction = exports.Direction || (exports.Direction = {}));
      function euclideanDistance(a, b) {
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        return Math.sqrt(dx * dx + dy * dy);
      }
      exports.euclideanDistance = euclideanDistance;
      function manhattanDistance(a, b) {
        return Math.abs(b.x - a.x) + Math.abs(b.y - a.y);
      }
      exports.manhattanDistance = manhattanDistance;
      function maxDistance(a, b) {
        return Math.max(Math.abs(b.x - a.x), Math.abs(b.y - a.y));
      }
      exports.maxDistance = maxDistance;
      function angleOfPoint(p) {
        return Math.atan2(p.y, p.x);
      }
      exports.angleOfPoint = angleOfPoint;
      function angleBetweenPoints(a, b) {
        const lengthProduct = Math.sqrt((a.x * a.x + a.y * a.y) * (b.x * b.x + b.y * b.y));
        if (isNaN(lengthProduct) || lengthProduct === 0)
          return NaN;
        const dotProduct = a.x * b.x + a.y * b.y;
        return Math.acos(dotProduct / lengthProduct);
      }
      exports.angleBetweenPoints = angleBetweenPoints;
      function shiftTowards(point, refPoint, distance) {
        const diff = subtract(refPoint, point);
        const normalized = normalize(diff);
        const shift = { x: normalized.x * distance, y: normalized.y * distance };
        return add(point, shift);
      }
      exports.shiftTowards = shiftTowards;
      function normalize(point) {
        const mag = magnitude(point);
        if (mag === 0 || mag === 1) {
          return exports.ORIGIN_POINT;
        }
        return {
          x: point.x / mag,
          y: point.y / mag
        };
      }
      exports.normalize = normalize;
      function magnitude(point) {
        return Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2));
      }
      exports.magnitude = magnitude;
      function toDegrees(a) {
        return a * 180 / Math.PI;
      }
      exports.toDegrees = toDegrees;
      function toRadians(a) {
        return a * Math.PI / 180;
      }
      exports.toRadians = toRadians;
      function almostEquals(a, b) {
        return Math.abs(a - b) < 1e-3;
      }
      exports.almostEquals = almostEquals;
      function linear(p0, p1, lambda) {
        return {
          x: (1 - lambda) * p0.x + lambda * p1.x,
          y: (1 - lambda) * p0.y + lambda * p1.y
        };
      }
      exports.linear = linear;
      var Diamond = class {
        constructor(bounds) {
          this.bounds = bounds;
        }
        get topPoint() {
          return {
            x: this.bounds.x + this.bounds.width / 2,
            y: this.bounds.y
          };
        }
        get rightPoint() {
          return {
            x: this.bounds.x + this.bounds.width,
            y: this.bounds.y + this.bounds.height / 2
          };
        }
        get bottomPoint() {
          return {
            x: this.bounds.x + this.bounds.width / 2,
            y: this.bounds.y + this.bounds.height
          };
        }
        get leftPoint() {
          return {
            x: this.bounds.x,
            y: this.bounds.y + this.bounds.height / 2
          };
        }
        get topRightSideLine() {
          return new PointToPointLine(this.topPoint, this.rightPoint);
        }
        get topLeftSideLine() {
          return new PointToPointLine(this.topPoint, this.leftPoint);
        }
        get bottomRightSideLine() {
          return new PointToPointLine(this.bottomPoint, this.rightPoint);
        }
        get bottomLeftSideLine() {
          return new PointToPointLine(this.bottomPoint, this.leftPoint);
        }
        /**
         * Return the closest side of this diamond to the specified `refPoint`.
         * @param {Point} refPoint a reference point
         * @returns {Line} a line representing the closest side
         */
        closestSideLine(refPoint) {
          const c = center(this.bounds);
          if (refPoint.x > c.x) {
            if (refPoint.y > c.y) {
              return this.bottomRightSideLine;
            } else {
              return this.topRightSideLine;
            }
          } else {
            if (refPoint.y > c.y) {
              return this.bottomLeftSideLine;
            } else {
              return this.topLeftSideLine;
            }
          }
        }
      };
      exports.Diamond = Diamond;
      var PointToPointLine = class {
        constructor(p1, p2) {
          this.p1 = p1;
          this.p2 = p2;
        }
        get a() {
          return this.p1.y - this.p2.y;
        }
        get b() {
          return this.p2.x - this.p1.x;
        }
        get c() {
          return this.p2.x * this.p1.y - this.p1.x * this.p2.y;
        }
        /**
         * The counter-clockwise angle of this line relative to the x-axis.
         */
        get angle() {
          return Math.atan2(-this.a, this.b);
        }
        /**
         * The slope of the line.
         * A vertical line returns `undefined`.
         */
        get slope() {
          if (this.b === 0)
            return void 0;
          return this.a / this.b;
        }
        /**
         * The slope of the line or `Number.MAX_SAFE_INTEGER` if vertical.
         */
        get slopeOrMax() {
          if (this.slope === void 0) {
            return Number.MAX_SAFE_INTEGER;
          }
          return this.slope;
        }
        /**
         * The direction of this line, such as 'north', 'south', or 'south-west'.
         */
        get direction() {
          const hDegrees = toDegrees(this.angle);
          const degrees = hDegrees < 0 ? 360 + hDegrees : hDegrees;
          if (degrees === 90) {
            return "south";
          } else if (degrees === 0 || degrees === 360) {
            return "east";
          } else if (degrees === 270) {
            return "north";
          } else if (degrees === 180) {
            return "west";
          } else if (degrees > 0 && degrees < 90) {
            return "south-east";
          } else if (degrees > 90 && degrees < 180) {
            return "south-west";
          } else if (degrees > 180 && degrees < 270) {
            return "north-west";
          } else if (degrees > 270 && degrees < 360) {
            return "north-east";
          }
          throw new Error(`Cannot determine direction of line (${this.p1.x},${this.p1.y}) to (${this.p2.x},${this.p2.y})`);
        }
        /**
         * @param otherLine the other line
         * @returns the intersection point between `this` line and the `otherLine` if exists, or `undefined`.
         */
        intersection(otherLine) {
          if (this.hasIndistinctPoints(otherLine)) {
            return void 0;
          }
          const x1 = this.p1.x;
          const y1 = this.p1.y;
          const x2 = this.p2.x;
          const y2 = this.p2.y;
          const x3 = otherLine.p1.x;
          const y3 = otherLine.p1.y;
          const x4 = otherLine.p2.x;
          const y4 = otherLine.p2.y;
          const denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
          if (denominator === 0) {
            return void 0;
          }
          const numeratorA = (x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3);
          const numeratorB = (x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3);
          if (numeratorA === 0 && numeratorB === 0) {
            return void 0;
          }
          const determinantA = numeratorA / denominator;
          const determinantB = numeratorB / denominator;
          if (determinantA < 0 || determinantA > 1 || determinantB < 0 || determinantB > 1) {
            return void 0;
          }
          const x = x1 + determinantA * (x2 - x1);
          const y = y1 + determinantA * (y2 - y1);
          return { x, y };
        }
        /**
         * @param otherLine the other line
         * @returns whether the start and end point of this line is does not have distinct start
         * or end points with the `otherLine`
         */
        hasIndistinctPoints(otherLine) {
          return pointEquals(this.p1, otherLine.p1) || pointEquals(this.p1, otherLine.p2) || pointEquals(this.p2, otherLine.p1) || pointEquals(this.p2, otherLine.p2);
        }
      };
      exports.PointToPointLine = PointToPointLine;
      function intersection(l1, l2) {
        return {
          x: (l1.c * l2.b - l2.c * l1.b) / (l1.a * l2.b - l2.a * l1.b),
          y: (l1.a * l2.c - l2.a * l1.c) / (l1.a * l2.b - l2.a * l1.b)
        };
      }
      exports.intersection = intersection;
    }
  });

  // node_modules/sprotty/lib/lib/svg-views.js
  var require_svg_views = __commonJS({
    "node_modules/sprotty/lib/lib/svg-views.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.EmptyGroupView = exports.DiamondNodeView = exports.RectangularNodeView = exports.CircularNodeView = exports.SvgViewportView = void 0;
      var jsx_1 = require_jsx();
      var sgraph_1 = require_sgraph();
      var views_1 = require_views();
      var geometry_1 = require_geometry2();
      var inversify_1 = require_inversify();
      var SvgViewportView = class SvgViewportView {
        render(model, context, args) {
          const transform = `scale(${model.zoom}) translate(${-model.scroll.x},${-model.scroll.y})`;
          return (0, jsx_1.svg)(
            "svg",
            null,
            (0, jsx_1.svg)("g", { transform }, context.renderChildren(model))
          );
        }
      };
      SvgViewportView = __decorate([
        (0, inversify_1.injectable)()
      ], SvgViewportView);
      exports.SvgViewportView = SvgViewportView;
      var CircularNodeView = class CircularNodeView extends views_1.ShapeView {
        render(node, context, args) {
          if (!this.isVisible(node, context)) {
            return void 0;
          }
          const radius = this.getRadius(node);
          return (0, jsx_1.svg)(
            "g",
            null,
            (0, jsx_1.svg)("circle", { "class-sprotty-node": node instanceof sgraph_1.SNode, "class-sprotty-port": node instanceof sgraph_1.SPort, "class-mouseover": node.hoverFeedback, "class-selected": node.selected, r: radius, cx: radius, cy: radius }),
            context.renderChildren(node)
          );
        }
        getRadius(node) {
          const d = Math.min(node.size.width, node.size.height);
          return d > 0 ? d / 2 : 0;
        }
      };
      CircularNodeView = __decorate([
        (0, inversify_1.injectable)()
      ], CircularNodeView);
      exports.CircularNodeView = CircularNodeView;
      var RectangularNodeView = class RectangularNodeView extends views_1.ShapeView {
        render(node, context, args) {
          if (!this.isVisible(node, context)) {
            return void 0;
          }
          return (0, jsx_1.svg)(
            "g",
            null,
            (0, jsx_1.svg)("rect", { "class-sprotty-node": node instanceof sgraph_1.SNode, "class-sprotty-port": node instanceof sgraph_1.SPort, "class-mouseover": node.hoverFeedback, "class-selected": node.selected, x: "0", y: "0", width: Math.max(node.size.width, 0), height: Math.max(node.size.height, 0) }),
            context.renderChildren(node)
          );
        }
      };
      RectangularNodeView = __decorate([
        (0, inversify_1.injectable)()
      ], RectangularNodeView);
      exports.RectangularNodeView = RectangularNodeView;
      var DiamondNodeView = class DiamondNodeView extends views_1.ShapeView {
        render(node, context, args) {
          if (!this.isVisible(node, context)) {
            return void 0;
          }
          const diamond = new geometry_1.Diamond({ height: Math.max(node.size.height, 0), width: Math.max(node.size.width, 0), x: 0, y: 0 });
          const points = `${svgStr(diamond.topPoint)} ${svgStr(diamond.rightPoint)} ${svgStr(diamond.bottomPoint)} ${svgStr(diamond.leftPoint)}`;
          return (0, jsx_1.svg)(
            "g",
            null,
            (0, jsx_1.svg)("polygon", { "class-sprotty-node": node instanceof sgraph_1.SNode, "class-sprotty-port": node instanceof sgraph_1.SPort, "class-mouseover": node.hoverFeedback, "class-selected": node.selected, points }),
            context.renderChildren(node)
          );
        }
      };
      DiamondNodeView = __decorate([
        (0, inversify_1.injectable)()
      ], DiamondNodeView);
      exports.DiamondNodeView = DiamondNodeView;
      function svgStr(point) {
        return `${point.x},${point.y}`;
      }
      var EmptyGroupView = class EmptyGroupView {
        render(model, context) {
          return (0, jsx_1.svg)("g", null);
        }
      };
      EmptyGroupView = __decorate([
        (0, inversify_1.injectable)()
      ], EmptyGroupView);
      exports.EmptyGroupView = EmptyGroupView;
    }
  });

  // node_modules/sprotty/lib/features/edit/edit-label.js
  var require_edit_label = __commonJS({
    "node_modules/sprotty/lib/features/edit/edit-label.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      var __param = exports && exports.__param || function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getEditableLabel = exports.EditLabelKeyListener = exports.EditLabelMouseListener = exports.ApplyLabelEditCommand = exports.ResolvedLabelEdit = exports.isApplyLabelEditAction = exports.ApplyLabelEditAction = exports.isEditLabelAction = exports.EditLabelAction = void 0;
      var inversify_1 = require_inversify();
      var actions_1 = require_actions();
      var command_1 = require_command();
      var types_1 = require_types();
      var mouse_tool_1 = require_mouse_tool();
      var key_tool_1 = require_key_tool();
      var keyboard_1 = require_keyboard();
      var model_1 = require_model6();
      var iterable_1 = require_iterable();
      var model_2 = require_model11();
      var EditLabelAction;
      (function(EditLabelAction2) {
        EditLabelAction2.KIND = "EditLabel";
        function create(labelId) {
          return {
            kind: EditLabelAction2.KIND,
            labelId
          };
        }
        EditLabelAction2.create = create;
      })(EditLabelAction = exports.EditLabelAction || (exports.EditLabelAction = {}));
      function isEditLabelAction(element) {
        return (0, actions_1.isAction)(element) && element.kind === EditLabelAction.KIND && "labelId" in element;
      }
      exports.isEditLabelAction = isEditLabelAction;
      var ApplyLabelEditAction;
      (function(ApplyLabelEditAction2) {
        ApplyLabelEditAction2.KIND = "applyLabelEdit";
        function create(labelId, text) {
          return {
            kind: ApplyLabelEditAction2.KIND,
            labelId,
            text
          };
        }
        ApplyLabelEditAction2.create = create;
      })(ApplyLabelEditAction = exports.ApplyLabelEditAction || (exports.ApplyLabelEditAction = {}));
      function isApplyLabelEditAction(element) {
        return (0, actions_1.isAction)(element) && element.kind === ApplyLabelEditAction.KIND && "labelId" in element && "text" in element;
      }
      exports.isApplyLabelEditAction = isApplyLabelEditAction;
      var ResolvedLabelEdit = class {
      };
      exports.ResolvedLabelEdit = ResolvedLabelEdit;
      var ApplyLabelEditCommand = class ApplyLabelEditCommand extends command_1.Command {
        constructor(action) {
          super();
          this.action = action;
        }
        execute(context) {
          const index = context.root.index;
          const label = index.getById(this.action.labelId);
          if (label && (0, model_2.isEditableLabel)(label)) {
            this.resolvedLabelEdit = { label, oldLabel: label.text, newLabel: this.action.text };
            label.text = this.action.text;
          }
          return context.root;
        }
        undo(context) {
          if (this.resolvedLabelEdit) {
            this.resolvedLabelEdit.label.text = this.resolvedLabelEdit.oldLabel;
          }
          return context.root;
        }
        redo(context) {
          if (this.resolvedLabelEdit) {
            this.resolvedLabelEdit.label.text = this.resolvedLabelEdit.newLabel;
          }
          return context.root;
        }
      };
      ApplyLabelEditCommand.KIND = ApplyLabelEditAction.KIND;
      ApplyLabelEditCommand = __decorate([
        __param(0, (0, inversify_1.inject)(types_1.TYPES.Action)),
        __metadata("design:paramtypes", [Object])
      ], ApplyLabelEditCommand);
      exports.ApplyLabelEditCommand = ApplyLabelEditCommand;
      var EditLabelMouseListener = class extends mouse_tool_1.MouseListener {
        doubleClick(target, event) {
          const editableLabel = getEditableLabel(target);
          if (editableLabel) {
            return [EditLabelAction.create(editableLabel.id)];
          }
          return [];
        }
      };
      exports.EditLabelMouseListener = EditLabelMouseListener;
      var EditLabelKeyListener = class extends key_tool_1.KeyListener {
        keyDown(element, event) {
          if ((0, keyboard_1.matchesKeystroke)(event, "F2")) {
            const editableLabels = (0, iterable_1.toArray)(element.index.all().filter((e) => (0, model_1.isSelectable)(e) && e.selected)).map(getEditableLabel).filter((e) => e !== void 0);
            if (editableLabels.length === 1) {
              return [EditLabelAction.create(editableLabels[0].id)];
            }
          }
          return [];
        }
      };
      exports.EditLabelKeyListener = EditLabelKeyListener;
      function getEditableLabel(element) {
        if ((0, model_2.isEditableLabel)(element)) {
          return element;
        } else if ((0, model_2.isWithEditableLabel)(element) && element.editableLabel) {
          return element.editableLabel;
        }
        return void 0;
      }
      exports.getEditableLabel = getEditableLabel;
    }
  });

  // node_modules/sprotty/lib/features/export/svg-exporter.js
  var require_svg_exporter = __commonJS({
    "node_modules/sprotty/lib/features/export/svg-exporter.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SvgExporter = exports.ExportSvgAction = void 0;
      var inversify_1 = require_inversify();
      var geometry_1 = require_geometry();
      var model_1 = require_model2();
      var action_dispatcher_1 = require_action_dispatcher();
      var types_1 = require_types();
      var ExportSvgAction;
      (function(ExportSvgAction2) {
        ExportSvgAction2.KIND = "exportSvg";
        function create(svg2, requestId) {
          return {
            kind: ExportSvgAction2.KIND,
            svg: svg2,
            responseId: requestId
          };
        }
        ExportSvgAction2.create = create;
      })(ExportSvgAction = exports.ExportSvgAction || (exports.ExportSvgAction = {}));
      var SvgExporter = class SvgExporter {
        export(root, request) {
          if (typeof document !== "undefined") {
            const div = document.getElementById(this.options.hiddenDiv);
            if (div !== null && div.firstElementChild && div.firstElementChild.tagName === "svg") {
              const svgElement = div.firstElementChild;
              const svg2 = this.createSvg(svgElement, root);
              this.actionDispatcher.dispatch(ExportSvgAction.create(svg2, request ? request.requestId : ""));
            }
          }
        }
        createSvg(svgElementOrig, root) {
          const serializer = new XMLSerializer();
          const svgCopy = serializer.serializeToString(svgElementOrig);
          const iframe = document.createElement("iframe");
          document.body.appendChild(iframe);
          if (!iframe.contentWindow)
            throw new Error("IFrame has no contentWindow");
          const docCopy = iframe.contentWindow.document;
          docCopy.open();
          docCopy.write(svgCopy);
          docCopy.close();
          const svgElementNew = docCopy.getElementById(svgElementOrig.id);
          svgElementNew.removeAttribute("opacity");
          this.copyStyles(svgElementOrig, svgElementNew, ["width", "height", "opacity"]);
          svgElementNew.setAttribute("version", "1.1");
          const bounds = this.getBounds(root);
          svgElementNew.setAttribute("viewBox", `${bounds.x} ${bounds.y} ${bounds.width} ${bounds.height}`);
          const svgCode = serializer.serializeToString(svgElementNew);
          document.body.removeChild(iframe);
          return svgCode;
        }
        copyStyles(source, target, skipedProperties) {
          const sourceStyle = getComputedStyle(source);
          const targetStyle = getComputedStyle(target);
          let diffStyle = "";
          for (let i = 0; i < sourceStyle.length; i++) {
            const key = sourceStyle[i];
            if (skipedProperties.indexOf(key) === -1) {
              const value = sourceStyle.getPropertyValue(key);
              if (targetStyle.getPropertyValue(key) !== value) {
                diffStyle += key + ":" + value + ";";
              }
            }
          }
          if (diffStyle !== "")
            target.setAttribute("style", diffStyle);
          for (let i = 0; i < source.childNodes.length; ++i) {
            const sourceChild = source.childNodes[i];
            const targetChild = target.childNodes[i];
            if (sourceChild instanceof Element)
              this.copyStyles(sourceChild, targetChild, []);
          }
        }
        getBounds(root) {
          const allBounds = [geometry_1.Bounds.EMPTY];
          root.children.forEach((element) => {
            if ((0, model_1.isBoundsAware)(element)) {
              allBounds.push(element.bounds);
            }
          });
          return allBounds.reduce((one, two) => geometry_1.Bounds.combine(one, two));
        }
      };
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.ViewerOptions),
        __metadata("design:type", Object)
      ], SvgExporter.prototype, "options", void 0);
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.IActionDispatcher),
        __metadata("design:type", action_dispatcher_1.ActionDispatcher)
      ], SvgExporter.prototype, "actionDispatcher", void 0);
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.ILogger),
        __metadata("design:type", Object)
      ], SvgExporter.prototype, "log", void 0);
      SvgExporter = __decorate([
        (0, inversify_1.injectable)()
      ], SvgExporter);
      exports.SvgExporter = SvgExporter;
    }
  });

  // node_modules/sprotty/lib/model-source/model-source.js
  var require_model_source = __commonJS({
    "node_modules/sprotty/lib/model-source/model-source.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ComputedBoundsApplicator = exports.ModelSource = void 0;
      var inversify_1 = require_inversify();
      var actions_1 = require_actions();
      var model_utils_1 = require_model_utils();
      var types_1 = require_types();
      var svg_exporter_1 = require_svg_exporter();
      var ModelSource = class ModelSource {
        initialize(registry) {
          registry.register(actions_1.RequestModelAction.KIND, this);
          registry.register(svg_exporter_1.ExportSvgAction.KIND, this);
        }
      };
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.IActionDispatcher),
        __metadata("design:type", Object)
      ], ModelSource.prototype, "actionDispatcher", void 0);
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.ViewerOptions),
        __metadata("design:type", Object)
      ], ModelSource.prototype, "viewerOptions", void 0);
      ModelSource = __decorate([
        (0, inversify_1.injectable)()
      ], ModelSource);
      exports.ModelSource = ModelSource;
      var ComputedBoundsApplicator = class ComputedBoundsApplicator {
        apply(root, action) {
          const index = new model_utils_1.SModelIndex();
          index.add(root);
          for (const b of action.bounds) {
            const element = index.getById(b.elementId);
            if (element !== void 0)
              this.applyBounds(element, b.newPosition, b.newSize);
          }
          if (action.alignments !== void 0) {
            for (const a of action.alignments) {
              const element = index.getById(a.elementId);
              if (element !== void 0)
                this.applyAlignment(element, a.newAlignment);
            }
          }
          return index;
        }
        applyAlignment(element, newAlignment) {
          const e = element;
          e.alignment = { x: newAlignment.x, y: newAlignment.y };
        }
        applyBounds(element, newPosition, newSize) {
          const e = element;
          if (newPosition)
            e.position = Object.assign({}, newPosition);
          e.size = Object.assign({}, newSize);
        }
      };
      ComputedBoundsApplicator = __decorate([
        (0, inversify_1.injectable)()
      ], ComputedBoundsApplicator);
      exports.ComputedBoundsApplicator = ComputedBoundsApplicator;
    }
  });

  // node_modules/sprotty/lib/model-source/commit-model.js
  var require_commit_model = __commonJS({
    "node_modules/sprotty/lib/model-source/commit-model.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      var __param = exports && exports.__param || function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.CommitModelCommand = exports.CommitModelAction = void 0;
      var inversify_1 = require_inversify();
      var command_1 = require_command();
      var types_1 = require_types();
      var model_source_1 = require_model_source();
      var CommitModelAction;
      (function(CommitModelAction2) {
        CommitModelAction2.KIND = "commitModel";
        function create() {
          return {
            kind: CommitModelAction2.KIND
          };
        }
        CommitModelAction2.create = create;
      })(CommitModelAction = exports.CommitModelAction || (exports.CommitModelAction = {}));
      var CommitModelCommand = class CommitModelCommand extends command_1.SystemCommand {
        constructor(action) {
          super();
          this.action = action;
        }
        execute(context) {
          this.newModel = context.modelFactory.createSchema(context.root);
          return this.doCommit(this.newModel, context.root, true);
        }
        doCommit(model, result, doSetOriginal) {
          const commitResult = this.modelSource.commitModel(model);
          if (commitResult instanceof Promise) {
            return commitResult.then((originalModel) => {
              if (doSetOriginal)
                this.originalModel = originalModel;
              return result;
            });
          } else {
            if (doSetOriginal)
              this.originalModel = commitResult;
            return result;
          }
        }
        undo(context) {
          return this.doCommit(this.originalModel, context.root, false);
        }
        redo(context) {
          return this.doCommit(this.newModel, context.root, false);
        }
      };
      CommitModelCommand.KIND = CommitModelAction.KIND;
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.ModelSource),
        __metadata("design:type", model_source_1.ModelSource)
      ], CommitModelCommand.prototype, "modelSource", void 0);
      CommitModelCommand = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(types_1.TYPES.Action)),
        __metadata("design:paramtypes", [Object])
      ], CommitModelCommand);
      exports.CommitModelCommand = CommitModelCommand;
    }
  });

  // node_modules/sprotty/lib/features/viewport/zoom.js
  var require_zoom = __commonJS({
    "node_modules/sprotty/lib/features/viewport/zoom.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ZoomMouseListener = exports.getZoom = exports.isZoomable = void 0;
      var actions_1 = require_actions();
      var browser_1 = require_browser();
      var mouse_tool_1 = require_mouse_tool();
      var smodel_utils_1 = require_smodel_utils();
      var model_1 = require_model12();
      function isZoomable(element) {
        return "zoom" in element;
      }
      exports.isZoomable = isZoomable;
      function getZoom(label) {
        let zoom = 1;
        const viewport = (0, smodel_utils_1.findParentByFeature)(label, model_1.isViewport);
        if (viewport) {
          zoom = viewport.zoom;
        }
        return zoom;
      }
      exports.getZoom = getZoom;
      var ZoomMouseListener = class extends mouse_tool_1.MouseListener {
        wheel(target, event) {
          const viewport = (0, smodel_utils_1.findParentByFeature)(target, model_1.isViewport);
          if (viewport) {
            const newZoom = this.getZoomFactor(event);
            const viewportOffset = this.getViewportOffset(target.root, event);
            const offsetFactor = 1 / (newZoom * viewport.zoom) - 1 / viewport.zoom;
            const newViewport = {
              scroll: {
                x: viewport.scroll.x - offsetFactor * viewportOffset.x,
                y: viewport.scroll.y - offsetFactor * viewportOffset.y
              },
              zoom: viewport.zoom * newZoom
            };
            return [actions_1.SetViewportAction.create(viewport.id, newViewport, { animate: false })];
          }
          return [];
        }
        getViewportOffset(root, event) {
          const canvasBounds = root.canvasBounds;
          const windowScroll = (0, browser_1.getWindowScroll)();
          return {
            x: event.clientX + windowScroll.x - canvasBounds.x,
            y: event.clientY + windowScroll.y - canvasBounds.y
          };
        }
        getZoomFactor(event) {
          if (event.deltaMode === event.DOM_DELTA_PAGE)
            return Math.exp(-event.deltaY * 0.5);
          else if (event.deltaMode === event.DOM_DELTA_LINE)
            return Math.exp(-event.deltaY * 0.05);
          else
            return Math.exp(-event.deltaY * 5e-3);
        }
      };
      exports.ZoomMouseListener = ZoomMouseListener;
    }
  });

  // node_modules/sprotty/lib/features/edit/edit-label-ui.js
  var require_edit_label_ui = __commonJS({
    "node_modules/sprotty/lib/features/edit/edit-label-ui.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      var EditLabelUI_1;
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.EditLabelUI = exports.EditLabelActionHandler = void 0;
      var inversify_1 = require_inversify();
      var actions_1 = require_actions();
      var types_1 = require_types();
      var ui_extension_1 = require_ui_extension();
      var ui_extension_registry_1 = require_ui_extension_registry();
      var dom_helper_1 = require_dom_helper();
      var commit_model_1 = require_commit_model();
      var keyboard_1 = require_keyboard();
      var model_1 = require_model2();
      var zoom_1 = require_zoom();
      var edit_label_1 = require_edit_label();
      var model_2 = require_model11();
      var EditLabelActionHandler = class EditLabelActionHandler {
        handle(action) {
          if ((0, edit_label_1.isEditLabelAction)(action)) {
            return ui_extension_registry_1.SetUIExtensionVisibilityAction.create({ extensionId: EditLabelUI.ID, visible: true, contextElementsId: [action.labelId] });
          }
        }
      };
      EditLabelActionHandler = __decorate([
        (0, inversify_1.injectable)()
      ], EditLabelActionHandler);
      exports.EditLabelActionHandler = EditLabelActionHandler;
      var EditLabelUI = EditLabelUI_1 = class EditLabelUI extends ui_extension_1.AbstractUIExtension {
        constructor() {
          super(...arguments);
          this.validationTimeout = void 0;
          this.isActive = false;
          this.blockApplyEditOnInvalidInput = true;
          this.isCurrentLabelValid = true;
        }
        id() {
          return EditLabelUI_1.ID;
        }
        containerClass() {
          return "label-edit";
        }
        get labelId() {
          return this.label ? this.label.id : "unknown";
        }
        initializeContents(containerElement) {
          containerElement.style.position = "absolute";
          this.inputElement = document.createElement("input");
          this.textAreaElement = document.createElement("textarea");
          [this.inputElement, this.textAreaElement].forEach((element) => {
            element.onkeydown = (event) => this.applyLabelEditOnEvent(event, "Enter");
            this.configureAndAdd(element, containerElement);
          });
        }
        configureAndAdd(element, containerElement) {
          element.style.visibility = "hidden";
          element.style.position = "absolute";
          element.style.top = "0px";
          element.style.left = "0px";
          element.addEventListener("keydown", (event) => this.hideIfEscapeEvent(event));
          element.addEventListener("keyup", (event) => this.validateLabelIfContentChange(event, element.value));
          element.addEventListener("blur", () => window.setTimeout(() => this.applyLabelEdit(), 200));
          containerElement.appendChild(element);
        }
        get editControl() {
          if (this.label && this.label.isMultiLine) {
            return this.textAreaElement;
          }
          return this.inputElement;
        }
        hideIfEscapeEvent(event) {
          if ((0, keyboard_1.matchesKeystroke)(event, "Escape")) {
            this.hide();
          }
        }
        applyLabelEditOnEvent(event, code, ...modifiers) {
          if ((0, keyboard_1.matchesKeystroke)(event, code ? code : "Enter", ...modifiers)) {
            event.preventDefault();
            this.applyLabelEdit();
          }
        }
        validateLabelIfContentChange(event, value) {
          if (this.previousLabelContent === void 0 || this.previousLabelContent !== value) {
            this.previousLabelContent = value;
            this.performLabelValidation(event, this.editControl.value);
          }
        }
        async applyLabelEdit() {
          var _a;
          if (!this.isActive) {
            return;
          }
          if (((_a = this.label) === null || _a === void 0 ? void 0 : _a.text) === this.editControl.value) {
            this.hide();
            return;
          }
          if (this.blockApplyEditOnInvalidInput) {
            const result = await this.validateLabel(this.editControl.value);
            if ("error" === result.severity) {
              this.editControl.focus();
              return;
            }
          }
          this.actionDispatcherProvider().then((actionDispatcher) => actionDispatcher.dispatchAll([actions_1.ApplyLabelEditAction.create(this.labelId, this.editControl.value), commit_model_1.CommitModelAction.create()])).catch((reason) => this.logger.error(this, "No action dispatcher available to execute apply label edit action", reason));
          this.hide();
        }
        performLabelValidation(event, value) {
          if (this.validationTimeout) {
            window.clearTimeout(this.validationTimeout);
          }
          this.validationTimeout = window.setTimeout(() => this.validateLabel(value), 200);
        }
        async validateLabel(value) {
          if (this.labelValidator && this.label) {
            try {
              const result = await this.labelValidator.validate(value, this.label);
              this.isCurrentLabelValid = "error" !== result.severity;
              this.showValidationResult(result);
              return result;
            } catch (reason) {
              this.logger.error(this, "Error validating edited label", reason);
            }
          }
          this.isCurrentLabelValid = true;
          return { severity: "ok", message: void 0 };
        }
        showValidationResult(result) {
          this.clearValidationResult();
          if (this.validationDecorator) {
            this.validationDecorator.decorate(this.editControl, result);
          }
        }
        clearValidationResult() {
          if (this.validationDecorator) {
            this.validationDecorator.dispose(this.editControl);
          }
        }
        show(root, ...contextElementIds) {
          if (!hasEditableLabel(contextElementIds, root) || this.isActive) {
            return;
          }
          super.show(root, ...contextElementIds);
          this.isActive = true;
        }
        hide() {
          this.editControl.style.visibility = "hidden";
          super.hide();
          this.clearValidationResult();
          this.isActive = false;
          this.isCurrentLabelValid = true;
          this.previousLabelContent = void 0;
          if (this.labelElement) {
            this.labelElement.style.visibility = "visible";
          }
        }
        onBeforeShow(containerElement, root, ...contextElementIds) {
          this.label = getEditableLabels(contextElementIds, root)[0];
          this.previousLabelContent = this.label.text;
          this.setPosition(containerElement);
          this.applyTextContents();
          this.applyFontStyling();
          this.editControl.style.visibility = "visible";
          this.editControl.focus();
        }
        setPosition(containerElement) {
          let x = 0;
          let y = 0;
          let width = 100;
          let height = 20;
          if (this.label) {
            const zoom = (0, zoom_1.getZoom)(this.label);
            const bounds = (0, model_1.getAbsoluteClientBounds)(this.label, this.domHelper, this.viewerOptions);
            x = bounds.x + (this.label.editControlPositionCorrection ? this.label.editControlPositionCorrection.x : 0) * zoom;
            y = bounds.y + (this.label.editControlPositionCorrection ? this.label.editControlPositionCorrection.y : 0) * zoom;
            height = (this.label.editControlDimension ? this.label.editControlDimension.height : height) * zoom;
            width = (this.label.editControlDimension ? this.label.editControlDimension.width : width) * zoom;
          }
          containerElement.style.left = `${x}px`;
          containerElement.style.top = `${y}px`;
          containerElement.style.width = `${width}px`;
          this.editControl.style.width = `${width}px`;
          containerElement.style.height = `${height}px`;
          this.editControl.style.height = `${height}px`;
        }
        applyTextContents() {
          if (this.label) {
            this.editControl.value = this.label.text;
            if (this.editControl instanceof HTMLTextAreaElement) {
              this.editControl.selectionStart = 0;
              this.editControl.selectionEnd = 0;
              this.editControl.scrollTop = 0;
              this.editControl.scrollLeft = 0;
            } else {
              this.editControl.setSelectionRange(0, this.editControl.value.length);
            }
          }
        }
        applyFontStyling() {
          if (this.label) {
            this.labelElement = document.getElementById(this.domHelper.createUniqueDOMElementId(this.label));
            if (this.labelElement) {
              this.labelElement.style.visibility = "hidden";
              const style = window.getComputedStyle(this.labelElement);
              this.editControl.style.font = style.font;
              this.editControl.style.fontStyle = style.fontStyle;
              this.editControl.style.fontFamily = style.fontFamily;
              this.editControl.style.fontSize = scaledFont(style.fontSize, (0, zoom_1.getZoom)(this.label));
              this.editControl.style.fontWeight = style.fontWeight;
              this.editControl.style.lineHeight = style.lineHeight;
            }
          }
        }
      };
      EditLabelUI.ID = "editLabelUi";
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.IActionDispatcherProvider),
        __metadata("design:type", Function)
      ], EditLabelUI.prototype, "actionDispatcherProvider", void 0);
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.ViewerOptions),
        __metadata("design:type", Object)
      ], EditLabelUI.prototype, "viewerOptions", void 0);
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.DOMHelper),
        __metadata("design:type", dom_helper_1.DOMHelper)
      ], EditLabelUI.prototype, "domHelper", void 0);
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.IEditLabelValidator),
        (0, inversify_1.optional)(),
        __metadata("design:type", Object)
      ], EditLabelUI.prototype, "labelValidator", void 0);
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.IEditLabelValidationDecorator),
        (0, inversify_1.optional)(),
        __metadata("design:type", Object)
      ], EditLabelUI.prototype, "validationDecorator", void 0);
      EditLabelUI = EditLabelUI_1 = __decorate([
        (0, inversify_1.injectable)()
      ], EditLabelUI);
      exports.EditLabelUI = EditLabelUI;
      function hasEditableLabel(contextElementIds, root) {
        return getEditableLabels(contextElementIds, root).length === 1;
      }
      function getEditableLabels(contextElementIds, root) {
        return contextElementIds.map((id) => root.index.getById(id)).filter(model_2.isEditableLabel);
      }
      function scaledFont(font, zoom) {
        return font.replace(/([0-9]+)/, (match) => {
          return String(Number.parseInt(match, 10) * zoom);
        });
      }
    }
  });

  // node_modules/sprotty/lib/features/edit/edit-routing.js
  var require_edit_routing = __commonJS({
    "node_modules/sprotty/lib/features/edit/edit-routing.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      var __param = exports && exports.__param || function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SwitchEditModeCommand = exports.SwitchEditModeAction = void 0;
      var inversify_1 = require_inversify();
      var command_1 = require_command();
      var smodel_1 = require_smodel();
      var types_1 = require_types();
      var model_1 = require_model9();
      var routing_1 = require_routing();
      var model_2 = require_model11();
      var SwitchEditModeAction;
      (function(SwitchEditModeAction2) {
        SwitchEditModeAction2.KIND = "switchEditMode";
        function create(options) {
          var _a, _b;
          return {
            kind: SwitchEditModeAction2.KIND,
            elementsToActivate: (_a = options.elementsToActivate) !== null && _a !== void 0 ? _a : [],
            elementsToDeactivate: (_b = options.elementsToDeactivate) !== null && _b !== void 0 ? _b : []
          };
        }
        SwitchEditModeAction2.create = create;
      })(SwitchEditModeAction = exports.SwitchEditModeAction || (exports.SwitchEditModeAction = {}));
      var SwitchEditModeCommand = class SwitchEditModeCommand extends command_1.Command {
        constructor(action) {
          super();
          this.action = action;
          this.elementsToActivate = [];
          this.elementsToDeactivate = [];
          this.handlesToRemove = [];
        }
        execute(context) {
          const index = context.root.index;
          this.action.elementsToActivate.forEach((id) => {
            const element = index.getById(id);
            if (element !== void 0)
              this.elementsToActivate.push(element);
          });
          this.action.elementsToDeactivate.forEach((id) => {
            const element = index.getById(id);
            if (element !== void 0)
              this.elementsToDeactivate.push(element);
            if (element instanceof model_1.SRoutingHandle && element.parent instanceof model_1.SRoutableElement) {
              const parent = element.parent;
              if (this.shouldRemoveHandle(element, parent)) {
                this.handlesToRemove.push({ handle: element, parent });
                this.elementsToDeactivate.push(parent);
                this.elementsToActivate.push(parent);
              }
            }
          });
          return this.doExecute(context);
        }
        doExecute(context) {
          this.handlesToRemove.forEach((entry) => {
            entry.point = entry.parent.routingPoints.splice(entry.handle.pointIndex, 1)[0];
          });
          this.elementsToDeactivate.forEach((element) => {
            if (element instanceof model_1.SRoutableElement)
              element.removeAll((child) => child instanceof model_1.SRoutingHandle);
            else if (element instanceof model_1.SRoutingHandle) {
              element.editMode = false;
              if (element.danglingAnchor) {
                if (element.parent instanceof model_1.SRoutableElement && element.danglingAnchor.original) {
                  if (element.parent.source === element.danglingAnchor)
                    element.parent.sourceId = element.danglingAnchor.original.id;
                  else if (element.parent.target === element.danglingAnchor)
                    element.parent.targetId = element.danglingAnchor.original.id;
                  element.danglingAnchor.parent.remove(element.danglingAnchor);
                  element.danglingAnchor = void 0;
                }
              }
            }
          });
          this.elementsToActivate.forEach((element) => {
            if ((0, model_2.canEditRouting)(element) && element instanceof smodel_1.SParentElement) {
              const router = this.edgeRouterRegistry.get(element.routerKind);
              router.createRoutingHandles(element);
            } else if (element instanceof model_1.SRoutingHandle)
              element.editMode = true;
          });
          return context.root;
        }
        shouldRemoveHandle(handle, parent) {
          if (handle.kind === "junction") {
            const route = this.edgeRouterRegistry.route(parent);
            return route.find((rp) => rp.pointIndex === handle.pointIndex) === void 0;
          }
          return false;
        }
        undo(context) {
          this.handlesToRemove.forEach((entry) => {
            if (entry.point !== void 0)
              entry.parent.routingPoints.splice(entry.handle.pointIndex, 0, entry.point);
          });
          this.elementsToActivate.forEach((element) => {
            if (element instanceof model_1.SRoutableElement)
              element.removeAll((child) => child instanceof model_1.SRoutingHandle);
            else if (element instanceof model_1.SRoutingHandle)
              element.editMode = false;
          });
          this.elementsToDeactivate.forEach((element) => {
            if ((0, model_2.canEditRouting)(element)) {
              const router = this.edgeRouterRegistry.get(element.routerKind);
              router.createRoutingHandles(element);
            } else if (element instanceof model_1.SRoutingHandle)
              element.editMode = true;
          });
          return context.root;
        }
        redo(context) {
          return this.doExecute(context);
        }
      };
      SwitchEditModeCommand.KIND = SwitchEditModeAction.KIND;
      __decorate([
        (0, inversify_1.inject)(routing_1.EdgeRouterRegistry),
        __metadata("design:type", routing_1.EdgeRouterRegistry)
      ], SwitchEditModeCommand.prototype, "edgeRouterRegistry", void 0);
      SwitchEditModeCommand = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(types_1.TYPES.Action)),
        __metadata("design:paramtypes", [Object])
      ], SwitchEditModeCommand);
      exports.SwitchEditModeCommand = SwitchEditModeCommand;
    }
  });

  // node_modules/sprotty/lib/features/edit/reconnect.js
  var require_reconnect = __commonJS({
    "node_modules/sprotty/lib/features/edit/reconnect.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      var __param = exports && exports.__param || function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ReconnectCommand = exports.ReconnectAction = void 0;
      var inversify_1 = require_inversify();
      var command_1 = require_command();
      var types_1 = require_types();
      var model_1 = require_model9();
      var routing_1 = require_routing();
      var ReconnectAction;
      (function(ReconnectAction2) {
        ReconnectAction2.KIND = "reconnect";
        function create(options) {
          return {
            kind: ReconnectAction2.KIND,
            routableId: options.routableId,
            newSourceId: options.newSourceId,
            newTargetId: options.newTargetId
          };
        }
        ReconnectAction2.create = create;
      })(ReconnectAction = exports.ReconnectAction || (exports.ReconnectAction = {}));
      var ReconnectCommand = class ReconnectCommand extends command_1.Command {
        constructor(action) {
          super();
          this.action = action;
        }
        execute(context) {
          this.doExecute(context);
          return context.root;
        }
        doExecute(context) {
          const index = context.root.index;
          const edge = index.getById(this.action.routableId);
          if (edge instanceof model_1.SRoutableElement) {
            const router = this.edgeRouterRegistry.get(edge.routerKind);
            const before = router.takeSnapshot(edge);
            router.applyReconnect(edge, this.action.newSourceId, this.action.newTargetId);
            const after = router.takeSnapshot(edge);
            this.memento = {
              edge,
              before,
              after
            };
          }
        }
        undo(context) {
          if (this.memento) {
            const router = this.edgeRouterRegistry.get(this.memento.edge.routerKind);
            router.applySnapshot(this.memento.edge, this.memento.before);
          }
          return context.root;
        }
        redo(context) {
          if (this.memento) {
            const router = this.edgeRouterRegistry.get(this.memento.edge.routerKind);
            router.applySnapshot(this.memento.edge, this.memento.after);
          }
          return context.root;
        }
      };
      ReconnectCommand.KIND = ReconnectAction.KIND;
      __decorate([
        (0, inversify_1.inject)(routing_1.EdgeRouterRegistry),
        __metadata("design:type", routing_1.EdgeRouterRegistry)
      ], ReconnectCommand.prototype, "edgeRouterRegistry", void 0);
      ReconnectCommand = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(types_1.TYPES.Action)),
        __metadata("design:paramtypes", [Object])
      ], ReconnectCommand);
      exports.ReconnectCommand = ReconnectCommand;
    }
  });

  // node_modules/sprotty/lib/features/edit/di.config.js
  var require_di_config3 = __commonJS({
    "node_modules/sprotty/lib/features/edit/di.config.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.labelEditUiModule = exports.labelEditModule = exports.edgeEditModule = void 0;
      var inversify_1 = require_inversify();
      var types_1 = require_types();
      var command_registration_1 = require_command_registration();
      var action_handler_1 = require_action_handler();
      var view_1 = require_view();
      var model_1 = require_model9();
      var svg_views_1 = require_svg_views();
      var delete_1 = require_delete();
      var edit_label_1 = require_edit_label();
      var edit_label_ui_1 = require_edit_label_ui();
      var edit_routing_1 = require_edit_routing();
      var reconnect_1 = require_reconnect();
      exports.edgeEditModule = new inversify_1.ContainerModule((bind, _unbind, isBound) => {
        const context = { bind, isBound };
        (0, command_registration_1.configureCommand)(context, edit_routing_1.SwitchEditModeCommand);
        (0, command_registration_1.configureCommand)(context, reconnect_1.ReconnectCommand);
        (0, command_registration_1.configureCommand)(context, delete_1.DeleteElementCommand);
        (0, view_1.configureModelElement)(context, "dangling-anchor", model_1.SDanglingAnchor, svg_views_1.EmptyGroupView);
      });
      exports.labelEditModule = new inversify_1.ContainerModule((bind, _unbind, isBound) => {
        bind(edit_label_1.EditLabelMouseListener).toSelf().inSingletonScope();
        bind(types_1.TYPES.MouseListener).toService(edit_label_1.EditLabelMouseListener);
        bind(edit_label_1.EditLabelKeyListener).toSelf().inSingletonScope();
        bind(types_1.TYPES.KeyListener).toService(edit_label_1.EditLabelKeyListener);
        (0, command_registration_1.configureCommand)({ bind, isBound }, edit_label_1.ApplyLabelEditCommand);
      });
      exports.labelEditUiModule = new inversify_1.ContainerModule((bind, _unbind, isBound) => {
        const context = { bind, isBound };
        (0, action_handler_1.configureActionHandler)(context, edit_label_1.EditLabelAction.KIND, edit_label_ui_1.EditLabelActionHandler);
        bind(edit_label_ui_1.EditLabelUI).toSelf().inSingletonScope();
        bind(types_1.TYPES.IUIExtension).toService(edit_label_ui_1.EditLabelUI);
      });
    }
  });

  // node_modules/sprotty/lib/features/expand/model.js
  var require_model14 = __commonJS({
    "node_modules/sprotty/lib/features/expand/model.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isExpandable = exports.expandFeature = void 0;
      exports.expandFeature = Symbol("expandFeature");
      function isExpandable(element) {
        return element.hasFeature(exports.expandFeature) && "expanded" in element;
      }
      exports.isExpandable = isExpandable;
    }
  });

  // node_modules/sprotty/lib/features/expand/expand.js
  var require_expand = __commonJS({
    "node_modules/sprotty/lib/features/expand/expand.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ExpandButtonHandler = exports.CollapseExpandAllAction = exports.CollapseExpandAction = void 0;
      var inversify_1 = require_inversify();
      var actions_1 = require_actions();
      var smodel_utils_1 = require_smodel_utils();
      var model_1 = require_model14();
      var CollapseExpandAction = class {
        constructor(expandIds, collapseIds) {
          this.expandIds = expandIds;
          this.collapseIds = collapseIds;
          this.kind = CollapseExpandAction.KIND;
        }
      };
      exports.CollapseExpandAction = CollapseExpandAction;
      CollapseExpandAction.KIND = "collapseExpand";
      var CollapseExpandAllAction = class {
        /**
         * If `expand` is true, all elements are expanded, othewise they are collapsed.
         */
        constructor(expand = true) {
          this.expand = expand;
          this.kind = CollapseExpandAllAction.KIND;
        }
      };
      exports.CollapseExpandAllAction = CollapseExpandAllAction;
      CollapseExpandAllAction.KIND = "collapseExpandAll";
      var ExpandButtonHandler = class ExpandButtonHandler {
        buttonPressed(button) {
          const expandable = (0, smodel_utils_1.findParentByFeature)(button, model_1.isExpandable);
          if (expandable !== void 0) {
            return [actions_1.CollapseExpandAction.create({
              expandIds: expandable.expanded ? [] : [expandable.id],
              collapseIds: expandable.expanded ? [expandable.id] : []
            })];
          } else {
            return [];
          }
        }
      };
      ExpandButtonHandler.TYPE = "button:expand";
      ExpandButtonHandler = __decorate([
        (0, inversify_1.injectable)()
      ], ExpandButtonHandler);
      exports.ExpandButtonHandler = ExpandButtonHandler;
    }
  });

  // node_modules/sprotty/lib/features/expand/views.js
  var require_views2 = __commonJS({
    "node_modules/sprotty/lib/features/expand/views.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ExpandButtonView = void 0;
      var jsx_1 = require_jsx();
      var model_1 = require_model14();
      var smodel_utils_1 = require_smodel_utils();
      var inversify_1 = require_inversify();
      var ExpandButtonView = class ExpandButtonView {
        render(button, context) {
          const expandable = (0, smodel_utils_1.findParentByFeature)(button, model_1.isExpandable);
          const path = expandable !== void 0 && expandable.expanded ? "M 1,5 L 8,12 L 15,5 Z" : "M 1,8 L 8,15 L 8,1 Z";
          return (0, jsx_1.svg)(
            "g",
            { "class-sprotty-button": "{true}", "class-enabled": "{button.enabled}" },
            (0, jsx_1.svg)("rect", { x: 0, y: 0, width: 16, height: 16, opacity: 0 }),
            (0, jsx_1.svg)("path", { d: path })
          );
        }
      };
      ExpandButtonView = __decorate([
        (0, inversify_1.injectable)()
      ], ExpandButtonView);
      exports.ExpandButtonView = ExpandButtonView;
    }
  });

  // node_modules/sprotty/lib/features/export/export.js
  var require_export = __commonJS({
    "node_modules/sprotty/lib/features/export/export.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      var __param = exports && exports.__param || function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ExportSvgPostprocessor = exports.ExportSvgCommand = exports.RequestExportSvgAction = exports.ExportSvgKeyListener = void 0;
      var inversify_1 = require_inversify();
      var actions_1 = require_actions();
      var command_1 = require_command();
      var model_1 = require_model6();
      var smodel_1 = require_smodel();
      var key_tool_1 = require_key_tool();
      var keyboard_1 = require_keyboard();
      var model_2 = require_model13();
      var svg_exporter_1 = require_svg_exporter();
      var model_3 = require_model12();
      var model_4 = require_model7();
      var types_1 = require_types();
      var ExportSvgKeyListener = class ExportSvgKeyListener extends key_tool_1.KeyListener {
        keyDown(element, event) {
          if ((0, keyboard_1.matchesKeystroke)(event, "KeyE", "ctrlCmd", "shift"))
            return [RequestExportSvgAction.create()];
          else
            return [];
        }
      };
      ExportSvgKeyListener = __decorate([
        (0, inversify_1.injectable)()
      ], ExportSvgKeyListener);
      exports.ExportSvgKeyListener = ExportSvgKeyListener;
      var RequestExportSvgAction;
      (function(RequestExportSvgAction2) {
        RequestExportSvgAction2.KIND = "requestExportSvg";
        function create() {
          return {
            kind: RequestExportSvgAction2.KIND,
            requestId: (0, actions_1.generateRequestId)()
          };
        }
        RequestExportSvgAction2.create = create;
      })(RequestExportSvgAction = exports.RequestExportSvgAction || (exports.RequestExportSvgAction = {}));
      var ExportSvgCommand = class ExportSvgCommand extends command_1.HiddenCommand {
        constructor(action) {
          super();
          this.action = action;
        }
        execute(context) {
          if ((0, model_2.isExportable)(context.root)) {
            const root = context.modelFactory.createRoot(context.root);
            if ((0, model_2.isExportable)(root)) {
              if ((0, model_3.isViewport)(root)) {
                root.zoom = 1;
                root.scroll = { x: 0, y: 0 };
              }
              root.index.all().forEach((element) => {
                if ((0, model_1.isSelectable)(element) && element.selected)
                  element.selected = false;
                if ((0, model_4.isHoverable)(element) && element.hoverFeedback)
                  element.hoverFeedback = false;
              });
              return {
                model: root,
                modelChanged: true,
                cause: this.action
              };
            }
          }
          return {
            model: context.root,
            modelChanged: false
          };
        }
      };
      ExportSvgCommand.KIND = RequestExportSvgAction.KIND;
      ExportSvgCommand = __decorate([
        __param(0, (0, inversify_1.inject)(types_1.TYPES.Action)),
        __metadata("design:paramtypes", [Object])
      ], ExportSvgCommand);
      exports.ExportSvgCommand = ExportSvgCommand;
      var ExportSvgPostprocessor = class ExportSvgPostprocessor {
        decorate(vnode, element) {
          if (element instanceof smodel_1.SModelRoot)
            this.root = element;
          return vnode;
        }
        postUpdate(cause) {
          if (this.root && cause !== void 0 && cause.kind === RequestExportSvgAction.KIND) {
            this.svgExporter.export(this.root, cause);
          }
        }
      };
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.SvgExporter),
        __metadata("design:type", svg_exporter_1.SvgExporter)
      ], ExportSvgPostprocessor.prototype, "svgExporter", void 0);
      ExportSvgPostprocessor = __decorate([
        (0, inversify_1.injectable)()
      ], ExportSvgPostprocessor);
      exports.ExportSvgPostprocessor = ExportSvgPostprocessor;
    }
  });

  // node_modules/sprotty/lib/features/fade/fade.js
  var require_fade = __commonJS({
    "node_modules/sprotty/lib/features/fade/fade.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ElementFader = exports.FadeAnimation = void 0;
      var inversify_1 = require_inversify();
      var animation_1 = require_animation();
      var smodel_1 = require_smodel();
      var vnode_utils_1 = require_vnode_utils();
      var model_1 = require_model3();
      var FadeAnimation = class extends animation_1.Animation {
        constructor(model, elementFades, context, removeAfterFadeOut = false) {
          super(context);
          this.model = model;
          this.elementFades = elementFades;
          this.removeAfterFadeOut = removeAfterFadeOut;
        }
        tween(t, context) {
          for (const elementFade of this.elementFades) {
            const element = elementFade.element;
            if (elementFade.type === "in") {
              element.opacity = t;
            } else if (elementFade.type === "out") {
              element.opacity = 1 - t;
              if (t === 1 && this.removeAfterFadeOut && element instanceof smodel_1.SChildElement) {
                element.parent.remove(element);
              }
            }
          }
          return this.model;
        }
      };
      exports.FadeAnimation = FadeAnimation;
      var ElementFader = class ElementFader {
        decorate(vnode, element) {
          if ((0, model_1.isFadeable)(element) && element.opacity !== 1) {
            (0, vnode_utils_1.setAttr)(vnode, "opacity", element.opacity);
          }
          return vnode;
        }
        postUpdate() {
        }
      };
      ElementFader = __decorate([
        (0, inversify_1.injectable)()
      ], ElementFader);
      exports.ElementFader = ElementFader;
    }
  });

  // node_modules/sprotty/lib/features/hover/hover.js
  var require_hover = __commonJS({
    "node_modules/sprotty/lib/features/hover/hover.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      var __param = exports && exports.__param || function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ClosePopupActionHandler = exports.HoverKeyListener = exports.PopupHoverMouseListener = exports.HoverMouseListener = exports.AbstractHoverMouseListener = exports.SetPopupModelCommand = exports.SetPopupModelAction = exports.RequestPopupModelAction = exports.HoverFeedbackCommand = exports.HoverFeedbackAction = void 0;
      var inversify_1 = require_inversify();
      var actions_1 = require_actions();
      var geometry_1 = require_geometry();
      var keyboard_1 = require_keyboard();
      var types_1 = require_types();
      var smodel_1 = require_smodel();
      var mouse_tool_1 = require_mouse_tool();
      var command_1 = require_command();
      var smodel_factory_1 = require_smodel_factory();
      var key_tool_1 = require_key_tool();
      var smodel_utils_1 = require_smodel_utils();
      var model_1 = require_model2();
      var model_2 = require_model7();
      var HoverFeedbackAction;
      (function(HoverFeedbackAction2) {
        HoverFeedbackAction2.KIND = "hoverFeedback";
        function create(options) {
          return {
            kind: HoverFeedbackAction2.KIND,
            mouseoverElement: options.mouseoverElement,
            mouseIsOver: options.mouseIsOver
          };
        }
        HoverFeedbackAction2.create = create;
      })(HoverFeedbackAction = exports.HoverFeedbackAction || (exports.HoverFeedbackAction = {}));
      var HoverFeedbackCommand = class HoverFeedbackCommand extends command_1.SystemCommand {
        constructor(action) {
          super();
          this.action = action;
        }
        execute(context) {
          const model = context.root;
          const modelElement = model.index.getById(this.action.mouseoverElement);
          if (modelElement) {
            if ((0, model_2.isHoverable)(modelElement)) {
              modelElement.hoverFeedback = this.action.mouseIsOver;
            }
          }
          return this.redo(context);
        }
        undo(context) {
          return context.root;
        }
        redo(context) {
          return context.root;
        }
      };
      HoverFeedbackCommand.KIND = HoverFeedbackAction.KIND;
      HoverFeedbackCommand = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(types_1.TYPES.Action)),
        __metadata("design:paramtypes", [Object])
      ], HoverFeedbackCommand);
      exports.HoverFeedbackCommand = HoverFeedbackCommand;
      var RequestPopupModelAction = class {
        constructor(elementId, bounds, requestId = "") {
          this.elementId = elementId;
          this.bounds = bounds;
          this.requestId = requestId;
          this.kind = RequestPopupModelAction.KIND;
        }
        /** Factory function to dispatch a request with the `IActionDispatcher` */
        static create(elementId, bounds) {
          return new RequestPopupModelAction(elementId, bounds, (0, actions_1.generateRequestId)());
        }
      };
      exports.RequestPopupModelAction = RequestPopupModelAction;
      RequestPopupModelAction.KIND = "requestPopupModel";
      var SetPopupModelAction = class {
        constructor(newRoot, responseId = "") {
          this.newRoot = newRoot;
          this.responseId = responseId;
          this.kind = SetPopupModelAction.KIND;
        }
      };
      exports.SetPopupModelAction = SetPopupModelAction;
      SetPopupModelAction.KIND = "setPopupModel";
      var SetPopupModelCommand = class SetPopupModelCommand extends command_1.PopupCommand {
        constructor(action) {
          super();
          this.action = action;
        }
        execute(context) {
          this.oldRoot = context.root;
          this.newRoot = context.modelFactory.createRoot(this.action.newRoot);
          return this.newRoot;
        }
        undo(context) {
          return this.oldRoot;
        }
        redo(context) {
          return this.newRoot;
        }
      };
      SetPopupModelCommand.KIND = actions_1.SetPopupModelAction.KIND;
      SetPopupModelCommand = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(types_1.TYPES.Action)),
        __metadata("design:paramtypes", [Object])
      ], SetPopupModelCommand);
      exports.SetPopupModelCommand = SetPopupModelCommand;
      var AbstractHoverMouseListener = class extends mouse_tool_1.MouseListener {
        mouseDown(target, event) {
          this.mouseIsDown = true;
          return [];
        }
        mouseUp(target, event) {
          this.mouseIsDown = false;
          return [];
        }
        stopMouseOutTimer() {
          if (this.state.mouseOutTimer !== void 0) {
            window.clearTimeout(this.state.mouseOutTimer);
            this.state.mouseOutTimer = void 0;
          }
        }
        startMouseOutTimer() {
          this.stopMouseOutTimer();
          return new Promise((resolve) => {
            this.state.mouseOutTimer = window.setTimeout(() => {
              this.state.popupOpen = false;
              this.state.previousPopupElement = void 0;
              resolve(new SetPopupModelAction({ type: smodel_factory_1.EMPTY_ROOT.type, id: smodel_factory_1.EMPTY_ROOT.id }));
            }, this.options.popupCloseDelay);
          });
        }
        stopMouseOverTimer() {
          if (this.state.mouseOverTimer !== void 0) {
            window.clearTimeout(this.state.mouseOverTimer);
            this.state.mouseOverTimer = void 0;
          }
        }
      };
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.ViewerOptions),
        __metadata("design:type", Object)
      ], AbstractHoverMouseListener.prototype, "options", void 0);
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.HoverState),
        __metadata("design:type", Object)
      ], AbstractHoverMouseListener.prototype, "state", void 0);
      exports.AbstractHoverMouseListener = AbstractHoverMouseListener;
      var HoverMouseListener = class HoverMouseListener extends AbstractHoverMouseListener {
        computePopupBounds(target, mousePosition) {
          let offset = { x: -5, y: 20 };
          const targetBounds = (0, model_1.getAbsoluteBounds)(target);
          const canvasBounds = target.root.canvasBounds;
          const boundsInWindow = geometry_1.Bounds.translate(targetBounds, canvasBounds);
          const distRight = boundsInWindow.x + boundsInWindow.width - mousePosition.x;
          const distBottom = boundsInWindow.y + boundsInWindow.height - mousePosition.y;
          if (distBottom <= distRight && this.allowSidePosition(target, "below", distBottom)) {
            offset = { x: -5, y: Math.round(distBottom + 5) };
          } else if (distRight <= distBottom && this.allowSidePosition(target, "right", distRight)) {
            offset = { x: Math.round(distRight + 5), y: -5 };
          }
          let leftPopupPosition = mousePosition.x + offset.x;
          const canvasRightBorderPosition = canvasBounds.x + canvasBounds.width;
          if (leftPopupPosition > canvasRightBorderPosition) {
            leftPopupPosition = canvasRightBorderPosition;
          }
          let topPopupPosition = mousePosition.y + offset.y;
          const canvasBottomBorderPosition = canvasBounds.y + canvasBounds.height;
          if (topPopupPosition > canvasBottomBorderPosition) {
            topPopupPosition = canvasBottomBorderPosition;
          }
          return { x: leftPopupPosition, y: topPopupPosition, width: -1, height: -1 };
        }
        allowSidePosition(target, side, distance) {
          return !(target instanceof smodel_1.SModelRoot) && distance <= 150;
        }
        startMouseOverTimer(target, event) {
          this.stopMouseOverTimer();
          return new Promise((resolve) => {
            this.state.mouseOverTimer = window.setTimeout(() => {
              const popupBounds = this.computePopupBounds(target, { x: event.pageX, y: event.pageY });
              resolve(new RequestPopupModelAction(target.id, popupBounds));
              this.state.popupOpen = true;
              this.state.previousPopupElement = target;
            }, this.options.popupOpenDelay);
          });
        }
        mouseOver(target, event) {
          const result = [];
          if (!this.mouseIsDown) {
            const popupTarget = (0, smodel_utils_1.findParent)(target, model_2.hasPopupFeature);
            if (this.state.popupOpen && (popupTarget === void 0 || this.state.previousPopupElement !== void 0 && this.state.previousPopupElement.id !== popupTarget.id)) {
              result.push(this.startMouseOutTimer());
            } else {
              this.stopMouseOverTimer();
              this.stopMouseOutTimer();
            }
            if (popupTarget !== void 0 && (this.state.previousPopupElement === void 0 || this.state.previousPopupElement.id !== popupTarget.id)) {
              result.push(this.startMouseOverTimer(popupTarget, event));
            }
            if (this.lastHoverFeedbackElementId) {
              result.push(HoverFeedbackAction.create({ mouseoverElement: this.lastHoverFeedbackElementId, mouseIsOver: false }));
              this.lastHoverFeedbackElementId = void 0;
            }
            const hoverTarget = (0, smodel_utils_1.findParentByFeature)(target, model_2.isHoverable);
            if (hoverTarget !== void 0) {
              result.push(HoverFeedbackAction.create({ mouseoverElement: hoverTarget.id, mouseIsOver: true }));
              this.lastHoverFeedbackElementId = hoverTarget.id;
            }
          }
          return result;
        }
        mouseOut(target, event) {
          const result = [];
          if (!this.mouseIsDown) {
            const elementUnderMouse = this.getElementFromEventPosition(event);
            if (!this.isSprottyPopup(elementUnderMouse)) {
              if (this.state.popupOpen) {
                const popupTarget = (0, smodel_utils_1.findParent)(target, model_2.hasPopupFeature);
                if (this.state.previousPopupElement !== void 0 && popupTarget !== void 0 && this.state.previousPopupElement.id === popupTarget.id)
                  result.push(this.startMouseOutTimer());
              }
              this.stopMouseOverTimer();
              const hoverTarget = (0, smodel_utils_1.findParentByFeature)(target, model_2.isHoverable);
              if (hoverTarget !== void 0) {
                result.push(HoverFeedbackAction.create({ mouseoverElement: hoverTarget.id, mouseIsOver: false }));
                if (this.lastHoverFeedbackElementId && this.lastHoverFeedbackElementId !== hoverTarget.id) {
                  result.push(HoverFeedbackAction.create({ mouseoverElement: this.lastHoverFeedbackElementId, mouseIsOver: false }));
                }
                this.lastHoverFeedbackElementId = void 0;
              }
            }
          }
          return result;
        }
        getElementFromEventPosition(event) {
          return document.elementFromPoint(event.x, event.y);
        }
        isSprottyPopup(element) {
          return element ? element.id === this.options.popupDiv || !!element.parentElement && this.isSprottyPopup(element.parentElement) : false;
        }
        mouseMove(target, event) {
          const result = [];
          if (!this.mouseIsDown) {
            if (this.state.previousPopupElement !== void 0 && this.closeOnMouseMove(this.state.previousPopupElement, event)) {
              result.push(this.startMouseOutTimer());
            }
            const popupTarget = (0, smodel_utils_1.findParent)(target, model_2.hasPopupFeature);
            if (popupTarget !== void 0 && (this.state.previousPopupElement === void 0 || this.state.previousPopupElement.id !== popupTarget.id)) {
              result.push(this.startMouseOverTimer(popupTarget, event));
            }
          }
          return result;
        }
        closeOnMouseMove(target, event) {
          return target instanceof smodel_1.SModelRoot;
        }
      };
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.ViewerOptions),
        __metadata("design:type", Object)
      ], HoverMouseListener.prototype, "options", void 0);
      HoverMouseListener = __decorate([
        (0, inversify_1.injectable)()
      ], HoverMouseListener);
      exports.HoverMouseListener = HoverMouseListener;
      var PopupHoverMouseListener = class PopupHoverMouseListener extends AbstractHoverMouseListener {
        mouseOut(target, event) {
          return [this.startMouseOutTimer()];
        }
        mouseOver(target, event) {
          this.stopMouseOutTimer();
          this.stopMouseOverTimer();
          return [];
        }
      };
      PopupHoverMouseListener = __decorate([
        (0, inversify_1.injectable)()
      ], PopupHoverMouseListener);
      exports.PopupHoverMouseListener = PopupHoverMouseListener;
      var HoverKeyListener = class extends key_tool_1.KeyListener {
        keyDown(element, event) {
          if ((0, keyboard_1.matchesKeystroke)(event, "Escape")) {
            return [new SetPopupModelAction({ type: smodel_factory_1.EMPTY_ROOT.type, id: smodel_factory_1.EMPTY_ROOT.id })];
          }
          return [];
        }
      };
      exports.HoverKeyListener = HoverKeyListener;
      var ClosePopupActionHandler = class ClosePopupActionHandler {
        constructor() {
          this.popupOpen = false;
        }
        handle(action) {
          if (action.kind === SetPopupModelCommand.KIND) {
            this.popupOpen = action.newRoot.type !== smodel_factory_1.EMPTY_ROOT.type;
          } else if (this.popupOpen) {
            return new SetPopupModelAction({ id: smodel_factory_1.EMPTY_ROOT.id, type: smodel_factory_1.EMPTY_ROOT.type });
          }
        }
      };
      ClosePopupActionHandler = __decorate([
        (0, inversify_1.injectable)()
      ], ClosePopupActionHandler);
      exports.ClosePopupActionHandler = ClosePopupActionHandler;
    }
  });

  // node_modules/sprotty/lib/features/decoration/model.js
  var require_model15 = __commonJS({
    "node_modules/sprotty/lib/features/decoration/model.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SIssue = exports.SIssueMarker = exports.SDecoration = exports.isDecoration = exports.decorationFeature = void 0;
      var model_1 = require_model2();
      var model_2 = require_model7();
      exports.decorationFeature = Symbol("decorationFeature");
      function isDecoration(e) {
        return e.hasFeature(exports.decorationFeature);
      }
      exports.isDecoration = isDecoration;
      var SDecoration = class extends model_1.SShapeElement {
      };
      exports.SDecoration = SDecoration;
      SDecoration.DEFAULT_FEATURES = [exports.decorationFeature, model_1.boundsFeature, model_2.hoverFeedbackFeature, model_2.popupFeature];
      var SIssueMarker = class extends SDecoration {
      };
      exports.SIssueMarker = SIssueMarker;
      var SIssue = class {
      };
      exports.SIssue = SIssue;
    }
  });

  // node_modules/sprotty/lib/features/decoration/views.js
  var require_views3 = __commonJS({
    "node_modules/sprotty/lib/features/decoration/views.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.IssueMarkerView = void 0;
      var jsx_1 = require_jsx();
      var vnode_utils_1 = require_vnode_utils();
      var inversify_1 = require_inversify();
      var IssueMarkerView = class IssueMarkerView {
        render(marker, context) {
          const scale = 16 / 1792;
          const trafo = `scale(${scale}, ${scale})`;
          const maxSeverity = this.getMaxSeverity(marker);
          const group = (0, jsx_1.svg)(
            "g",
            { "class-sprotty-issue": true },
            (0, jsx_1.svg)(
              "g",
              { transform: trafo },
              (0, jsx_1.svg)("path", { d: this.getPath(maxSeverity) })
            )
          );
          (0, vnode_utils_1.setClass)(group, "sprotty-" + maxSeverity, true);
          return group;
        }
        getMaxSeverity(marker) {
          let currentSeverity = "info";
          for (const severity of marker.issues.map((s) => s.severity)) {
            if (severity === "error" || severity === "warning" && currentSeverity === "info")
              currentSeverity = severity;
          }
          return currentSeverity;
        }
        getPath(severity) {
          switch (severity) {
            case "error":
            case "warning":
              return "M768 128q209 0 385.5 103t279.5 279.5 103 385.5-103 385.5-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103zm128 1247v-190q0-14-9-23.5t-22-9.5h-192q-13 0-23 10t-10 23v190q0 13 10 23t23 10h192q13 0 22-9.5t9-23.5zm-2-344l18-621q0-12-10-18-10-8-24-8h-220q-14 0-24 8-10 6-10 18l17 621q0 10 10 17.5t24 7.5h185q14 0 23.5-7.5t10.5-17.5z";
            case "info":
              return "M1024 1376v-160q0-14-9-23t-23-9h-96v-512q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v160q0 14 9 23t23 9h96v320h-96q-14 0-23 9t-9 23v160q0 14 9 23t23 9h448q14 0 23-9t9-23zm-128-896v-160q0-14-9-23t-23-9h-192q-14 0-23 9t-9 23v160q0 14 9 23t23 9h192q14 0 23-9t9-23zm640 416q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z";
          }
        }
      };
      IssueMarkerView = __decorate([
        (0, inversify_1.injectable)()
      ], IssueMarkerView);
      exports.IssueMarkerView = IssueMarkerView;
    }
  });

  // node_modules/sprotty/lib/features/decoration/decoration-placer.js
  var require_decoration_placer = __commonJS({
    "node_modules/sprotty/lib/features/decoration/decoration-placer.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.DecorationPlacer = void 0;
      var inversify_1 = require_inversify();
      var smodel_1 = require_smodel();
      var model_1 = require_model15();
      var vnode_utils_1 = require_vnode_utils();
      var model_2 = require_model2();
      var model_3 = require_model9();
      var routing_1 = require_routing();
      var sprotty_protocol_1 = require_lib();
      var DecorationPlacer = class DecorationPlacer {
        decorate(vnode, element) {
          if ((0, model_1.isDecoration)(element)) {
            const position = this.getPosition(element);
            const translate = "translate(" + position.x + ", " + position.y + ")";
            (0, vnode_utils_1.setAttr)(vnode, "transform", translate);
          }
          return vnode;
        }
        getPosition(element) {
          if (element instanceof smodel_1.SChildElement && element.parent instanceof model_3.SRoutableElement) {
            const route = this.edgeRouterRegistry.route(element.parent);
            if (route.length > 1) {
              const index = Math.floor(0.5 * (route.length - 1));
              const offset = (0, model_2.isSizeable)(element) ? {
                x: -0.5 * element.bounds.width,
                y: -0.5 * element.bounds.width
              } : sprotty_protocol_1.Point.ORIGIN;
              return {
                x: 0.5 * (route[index].x + route[index + 1].x) + offset.x,
                y: 0.5 * (route[index].y + route[index + 1].y) + offset.y
              };
            }
          }
          if ((0, model_2.isSizeable)(element))
            return {
              x: -0.666 * element.bounds.width,
              y: -0.666 * element.bounds.height
            };
          return sprotty_protocol_1.Point.ORIGIN;
        }
        postUpdate() {
        }
      };
      __decorate([
        (0, inversify_1.inject)(routing_1.EdgeRouterRegistry),
        __metadata("design:type", routing_1.EdgeRouterRegistry)
      ], DecorationPlacer.prototype, "edgeRouterRegistry", void 0);
      DecorationPlacer = __decorate([
        (0, inversify_1.injectable)()
      ], DecorationPlacer);
      exports.DecorationPlacer = DecorationPlacer;
    }
  });

  // node_modules/tinyqueue/tinyqueue.js
  var require_tinyqueue = __commonJS({
    "node_modules/tinyqueue/tinyqueue.js"(exports, module) {
      (function(global2, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global2 = global2 || self, global2.TinyQueue = factory());
      })(exports, function() {
        "use strict";
        var TinyQueue = function TinyQueue2(data, compare) {
          if (data === void 0)
            data = [];
          if (compare === void 0)
            compare = defaultCompare;
          this.data = data;
          this.length = this.data.length;
          this.compare = compare;
          if (this.length > 0) {
            for (var i = (this.length >> 1) - 1; i >= 0; i--) {
              this._down(i);
            }
          }
        };
        TinyQueue.prototype.push = function push(item) {
          this.data.push(item);
          this.length++;
          this._up(this.length - 1);
        };
        TinyQueue.prototype.pop = function pop() {
          if (this.length === 0) {
            return void 0;
          }
          var top = this.data[0];
          var bottom = this.data.pop();
          this.length--;
          if (this.length > 0) {
            this.data[0] = bottom;
            this._down(0);
          }
          return top;
        };
        TinyQueue.prototype.peek = function peek() {
          return this.data[0];
        };
        TinyQueue.prototype._up = function _up(pos) {
          var ref = this;
          var data = ref.data;
          var compare = ref.compare;
          var item = data[pos];
          while (pos > 0) {
            var parent = pos - 1 >> 1;
            var current = data[parent];
            if (compare(item, current) >= 0) {
              break;
            }
            data[pos] = current;
            pos = parent;
          }
          data[pos] = item;
        };
        TinyQueue.prototype._down = function _down(pos) {
          var ref = this;
          var data = ref.data;
          var compare = ref.compare;
          var halfLength = this.length >> 1;
          var item = data[pos];
          while (pos < halfLength) {
            var left = (pos << 1) + 1;
            var best = data[left];
            var right = left + 1;
            if (right < this.length && compare(data[right], best) < 0) {
              left = right;
              best = data[right];
            }
            if (compare(best, item) >= 0) {
              break;
            }
            data[pos] = best;
            pos = left;
          }
          data[pos] = item;
        };
        function defaultCompare(a, b) {
          return a < b ? -1 : a > b ? 1 : 0;
        }
        return TinyQueue;
      });
    }
  });

  // node_modules/sprotty/lib/features/edge-intersection/sweepline.js
  var require_sweepline = __commonJS({
    "node_modules/sprotty/lib/features/edge-intersection/sweepline.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.intersectionOfSegments = exports.getSegmentIndex = exports.checkWhichSegmentHasRightEndpointFirst = exports.runSweep = exports.Segment = exports.SweepEvent = exports.checkWhichEventIsLeft = exports.addRoute = void 0;
      var tinyqueue_1 = __importDefault(require_tinyqueue());
      var geometry_1 = require_geometry2();
      function addRoute(routeId, route, queue) {
        if (route.length < 1)
          return;
        let currentPoint = route[0];
        let nextPoint = void 0;
        for (let i = 0; i < route.length - 1; i++) {
          nextPoint = route[i + 1];
          const e1 = new SweepEvent(routeId, currentPoint, i);
          const e2 = new SweepEvent(routeId, nextPoint, i + 1);
          e1.otherEvent = e2;
          e2.otherEvent = e1;
          if (checkWhichEventIsLeft(e1, e2) > 0) {
            e2.isLeftEndpoint = true;
            e1.isLeftEndpoint = false;
          } else {
            e1.isLeftEndpoint = true;
            e2.isLeftEndpoint = false;
          }
          queue.push(e1);
          queue.push(e2);
          currentPoint = nextPoint;
        }
      }
      exports.addRoute = addRoute;
      function checkWhichEventIsLeft(e1, e2) {
        if (e1.point.x > e2.point.x)
          return 1;
        if (e1.point.x < e2.point.x)
          return -1;
        if (e1.point.y !== e2.point.y)
          return e1.point.y > e2.point.y ? 1 : -1;
        return 1;
      }
      exports.checkWhichEventIsLeft = checkWhichEventIsLeft;
      var SweepEvent = class {
        constructor(edgeId, point, segmentIndex) {
          this.edgeId = edgeId;
          this.point = point;
          this.segmentIndex = segmentIndex;
        }
      };
      exports.SweepEvent = SweepEvent;
      var Segment = class {
        constructor(event) {
          this.leftSweepEvent = event;
          this.rightSweepEvent = event.otherEvent;
        }
      };
      exports.Segment = Segment;
      function runSweep(eventQueue) {
        const intersectionPoints = [];
        const outQueue = new tinyqueue_1.default([], checkWhichSegmentHasRightEndpointFirst);
        while (eventQueue.length) {
          const event = eventQueue.pop();
          if (event === null || event === void 0 ? void 0 : event.isLeftEndpoint) {
            const segment = new Segment(event);
            for (let i = 0; i < outQueue.data.length; i++) {
              const otherSegment = outQueue.data[i];
              const intersection = intersectionOfSegments(segment, otherSegment);
              if (intersection) {
                intersectionPoints.push({
                  routable1: event.edgeId,
                  routable2: otherSegment.leftSweepEvent.edgeId,
                  segmentIndex1: getSegmentIndex(segment),
                  segmentIndex2: getSegmentIndex(otherSegment),
                  intersectionPoint: intersection
                });
              }
            }
            outQueue.push(segment);
          } else if ((event === null || event === void 0 ? void 0 : event.isLeftEndpoint) === false) {
            outQueue.pop();
          }
        }
        return intersectionPoints;
      }
      exports.runSweep = runSweep;
      function checkWhichSegmentHasRightEndpointFirst(seg1, seg2) {
        if (seg1.rightSweepEvent.point.x > seg2.rightSweepEvent.point.x)
          return 1;
        if (seg1.rightSweepEvent.point.x < seg2.rightSweepEvent.point.x)
          return -1;
        if (seg1.rightSweepEvent.point.y !== seg2.rightSweepEvent.point.y)
          return seg1.rightSweepEvent.point.y < seg2.rightSweepEvent.point.y ? 1 : -1;
        return 1;
      }
      exports.checkWhichSegmentHasRightEndpointFirst = checkWhichSegmentHasRightEndpointFirst;
      function getSegmentIndex(segment) {
        return Math.min(segment.leftSweepEvent.segmentIndex, segment.rightSweepEvent.segmentIndex);
      }
      exports.getSegmentIndex = getSegmentIndex;
      function intersectionOfSegments(seg1, seg2) {
        if (seg1.leftSweepEvent.edgeId === seg2.leftSweepEvent.edgeId) {
          return void 0;
        }
        const seg1Line = new geometry_1.PointToPointLine(seg1.leftSweepEvent.point, seg1.rightSweepEvent.point);
        const seg2Line = new geometry_1.PointToPointLine(seg2.leftSweepEvent.point, seg2.rightSweepEvent.point);
        return seg1Line.intersection(seg2Line);
      }
      exports.intersectionOfSegments = intersectionOfSegments;
    }
  });

  // node_modules/sprotty/lib/features/edge-intersection/intersection-finder.js
  var require_intersection_finder = __commonJS({
    "node_modules/sprotty/lib/features/edge-intersection/intersection-finder.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.IntersectionFinder = exports.BY_DESCENDING_X_THEN_DESCENDING_Y = exports.BY_X_THEN_DESCENDING_Y = exports.BY_DESCENDING_X_THEN_Y = exports.BY_X_THEN_Y = exports.isIntersectingRoutedPoint = void 0;
      var inversify_1 = require_inversify();
      var tinyqueue_1 = __importDefault(require_tinyqueue());
      var sweepline_1 = require_sweepline();
      function isIntersectingRoutedPoint(routedPoint) {
        return routedPoint !== void 0 && "intersections" in routedPoint && "kind" in routedPoint;
      }
      exports.isIntersectingRoutedPoint = isIntersectingRoutedPoint;
      var BY_X_THEN_Y = (a, b) => {
        if (a.intersectionPoint.x === b.intersectionPoint.x) {
          return a.intersectionPoint.y - b.intersectionPoint.y;
        }
        return a.intersectionPoint.x - b.intersectionPoint.x;
      };
      exports.BY_X_THEN_Y = BY_X_THEN_Y;
      var BY_DESCENDING_X_THEN_Y = (a, b) => {
        if (a.intersectionPoint.x === b.intersectionPoint.x) {
          return a.intersectionPoint.y - b.intersectionPoint.y;
        }
        return b.intersectionPoint.x - a.intersectionPoint.x;
      };
      exports.BY_DESCENDING_X_THEN_Y = BY_DESCENDING_X_THEN_Y;
      var BY_X_THEN_DESCENDING_Y = (a, b) => {
        if (a.intersectionPoint.x === b.intersectionPoint.x) {
          return b.intersectionPoint.y - a.intersectionPoint.y;
        }
        return a.intersectionPoint.x - b.intersectionPoint.x;
      };
      exports.BY_X_THEN_DESCENDING_Y = BY_X_THEN_DESCENDING_Y;
      var BY_DESCENDING_X_THEN_DESCENDING_Y = (a, b) => {
        if (a.intersectionPoint.x === b.intersectionPoint.x) {
          return b.intersectionPoint.y - a.intersectionPoint.y;
        }
        return b.intersectionPoint.x - a.intersectionPoint.x;
      };
      exports.BY_DESCENDING_X_THEN_DESCENDING_Y = BY_DESCENDING_X_THEN_DESCENDING_Y;
      var IntersectionFinder = class IntersectionFinder {
        /**
         * Finds all intersections in the specified `routing` and replaces the `RoutedPoints` that are
         * intersecting by adding intersection information to routing points (@see `IntersectingRoutedPoints`).
         * @param routing the edge routing to find intersections for and update.
         */
        apply(routing) {
          const intersections = this.find(routing);
          this.addToRouting(intersections, routing);
        }
        /**
         * Finds the intersections in the specified `routing` and returns them.
         * @param routing the edge routing to find intersections for and update.
         * @returns the identified intersections.
         */
        find(routing) {
          const eventQueue = new tinyqueue_1.default(void 0, sweepline_1.checkWhichEventIsLeft);
          routing.routes.forEach((route, routeId) => {
            if (this.isSupportedRoute(route)) {
              (0, sweepline_1.addRoute)(routeId, route, eventQueue);
            }
          });
          return (0, sweepline_1.runSweep)(eventQueue);
        }
        /**
         * Specifies whether or not a specific route should be included in this intersection search or not.
         *
         * As this intersection finder only supports linear line segments, this method only returns `true`
         * for routes that only contain routed points, which are either 'source', 'target' or 'linear'.
         */
        isSupportedRoute(route) {
          return route.find((point) => point.kind !== "source" && point.kind !== "target" && point.kind !== "linear") === void 0;
        }
        addToRouting(intersections, routing) {
          for (const intersection of intersections) {
            const routable1 = routing.get(intersection.routable1);
            const routable2 = routing.get(intersection.routable2);
            this.addIntersectionToRoutedPoint(intersection, routable1, intersection.segmentIndex1);
            this.addIntersectionToRoutedPoint(intersection, routable2, intersection.segmentIndex2);
          }
        }
        addIntersectionToRoutedPoint(intersection, routedPoint, segmentIndex) {
          if (routedPoint && routedPoint.length > segmentIndex) {
            const segment = routedPoint[segmentIndex + 1];
            if (isIntersectingRoutedPoint(segment)) {
              segment.intersections.push(intersection);
            } else {
              const intersectingRoutedPoint = Object.assign(Object.assign({}, segment), { intersections: [intersection] });
              routedPoint[segmentIndex + 1] = intersectingRoutedPoint;
            }
          }
        }
      };
      IntersectionFinder = __decorate([
        (0, inversify_1.injectable)()
      ], IntersectionFinder);
      exports.IntersectionFinder = IntersectionFinder;
    }
  });

  // node_modules/sprotty/lib/features/move/move.js
  var require_move = __commonJS({
    "node_modules/sprotty/lib/features/move/move.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      var __param = exports && exports.__param || function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      var MoveCommand_1;
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.LocationPostprocessor = exports.MoveMouseListener = exports.MorphEdgesAnimation = exports.MoveAnimation = exports.MoveCommand = exports.MoveAction = void 0;
      var inversify_1 = require_inversify();
      var geometry_1 = require_geometry();
      var actions_1 = require_actions();
      var animation_1 = require_animation();
      var command_1 = require_command();
      var smodel_1 = require_smodel();
      var smodel_utils_1 = require_smodel_utils();
      var types_1 = require_types();
      var mouse_tool_1 = require_mouse_tool();
      var vnode_utils_1 = require_vnode_utils();
      var sgraph_1 = require_sgraph();
      var commit_model_1 = require_commit_model();
      var model_1 = require_model2();
      var create_on_drag_1 = require_create_on_drag();
      var edit_routing_1 = require_edit_routing();
      var reconnect_1 = require_reconnect();
      var model_2 = require_model9();
      var routing_1 = require_routing();
      var model_3 = require_model10();
      var model_4 = require_model6();
      var model_5 = require_model12();
      var model_6 = require_model8();
      var MoveAction;
      (function(MoveAction2) {
        MoveAction2.KIND = "move";
        function create(moves, options = {}) {
          var _a, _b;
          return {
            kind: MoveAction2.KIND,
            moves,
            animate: (_a = options.animate) !== null && _a !== void 0 ? _a : true,
            finished: (_b = options.finished) !== null && _b !== void 0 ? _b : false
          };
        }
        MoveAction2.create = create;
      })(MoveAction = exports.MoveAction || (exports.MoveAction = {}));
      var MoveCommand = MoveCommand_1 = class MoveCommand extends command_1.MergeableCommand {
        constructor(action) {
          super();
          this.action = action;
          this.resolvedMoves = /* @__PURE__ */ new Map();
          this.edgeMementi = [];
        }
        execute(context) {
          const index = context.root.index;
          const edge2handleMoves = /* @__PURE__ */ new Map();
          const attachedEdgeShifts = /* @__PURE__ */ new Map();
          this.action.moves.forEach((move) => {
            const element = index.getById(move.elementId);
            if (element instanceof model_2.SRoutingHandle && this.edgeRouterRegistry) {
              const edge = element.parent;
              if (edge instanceof model_2.SRoutableElement) {
                const resolvedMove = this.resolveHandleMove(element, edge, move);
                if (resolvedMove) {
                  let movesByEdge = edge2handleMoves.get(edge);
                  if (!movesByEdge) {
                    movesByEdge = [];
                    edge2handleMoves.set(edge, movesByEdge);
                  }
                  movesByEdge.push(resolvedMove);
                }
              }
            } else if (element && (0, model_6.isLocateable)(element)) {
              const resolvedMove = this.resolveElementMove(element, move);
              if (resolvedMove) {
                this.resolvedMoves.set(resolvedMove.element.id, resolvedMove);
                if (this.edgeRouterRegistry) {
                  index.getAttachedElements(element).forEach((edge) => {
                    if (edge instanceof model_2.SRoutableElement) {
                      const existingDelta = attachedEdgeShifts.get(edge);
                      const newDelta = geometry_1.Point.subtract(resolvedMove.toPosition, resolvedMove.fromPosition);
                      const delta = existingDelta ? geometry_1.Point.linear(existingDelta, newDelta, 0.5) : newDelta;
                      attachedEdgeShifts.set(edge, delta);
                    }
                  });
                }
              }
            }
          });
          this.doMove(edge2handleMoves, attachedEdgeShifts);
          if (this.action.animate) {
            this.undoMove();
            return new animation_1.CompoundAnimation(context.root, context, [
              new MoveAnimation(context.root, this.resolvedMoves, context, false),
              new MorphEdgesAnimation(context.root, this.edgeMementi, context, false)
            ]).start();
          }
          return context.root;
        }
        resolveHandleMove(handle, edge, move) {
          let fromPosition = move.fromPosition;
          if (!fromPosition) {
            const router = this.edgeRouterRegistry.get(edge.routerKind);
            fromPosition = router.getHandlePosition(edge, router.route(edge), handle);
          }
          if (fromPosition)
            return {
              handle,
              fromPosition,
              toPosition: move.toPosition
            };
          return void 0;
        }
        resolveElementMove(element, move) {
          const fromPosition = move.fromPosition || { x: element.position.x, y: element.position.y };
          return {
            element,
            fromPosition,
            toPosition: move.toPosition
          };
        }
        doMove(edge2move, attachedEdgeShifts) {
          this.resolvedMoves.forEach((res) => {
            res.element.position = res.toPosition;
          });
          edge2move.forEach((moves, edge) => {
            const router = this.edgeRouterRegistry.get(edge.routerKind);
            const before = router.takeSnapshot(edge);
            router.applyHandleMoves(edge, moves);
            const after = router.takeSnapshot(edge);
            this.edgeMementi.push({ edge, before, after });
          });
          attachedEdgeShifts.forEach((delta, edge) => {
            if (!edge2move.get(edge)) {
              const router = this.edgeRouterRegistry.get(edge.routerKind);
              const before = router.takeSnapshot(edge);
              if (edge.source && edge.target && this.resolvedMoves.get(edge.source.id) && this.resolvedMoves.get(edge.target.id)) {
                edge.routingPoints = edge.routingPoints.map((rp) => geometry_1.Point.add(rp, delta));
              } else {
                const updateHandles = (0, model_4.isSelectable)(edge) && edge.selected;
                router.cleanupRoutingPoints(edge, edge.routingPoints, updateHandles, this.action.finished);
              }
              const after = router.takeSnapshot(edge);
              this.edgeMementi.push({ edge, before, after });
            }
          });
        }
        undoMove() {
          this.resolvedMoves.forEach((res) => {
            res.element.position = res.fromPosition;
          });
          this.edgeMementi.forEach((memento) => {
            const router = this.edgeRouterRegistry.get(memento.edge.routerKind);
            router.applySnapshot(memento.edge, memento.before);
          });
        }
        undo(context) {
          return new animation_1.CompoundAnimation(context.root, context, [
            new MoveAnimation(context.root, this.resolvedMoves, context, true),
            new MorphEdgesAnimation(context.root, this.edgeMementi, context, true)
          ]).start();
        }
        redo(context) {
          return new animation_1.CompoundAnimation(context.root, context, [
            new MoveAnimation(context.root, this.resolvedMoves, context, false),
            new MorphEdgesAnimation(context.root, this.edgeMementi, context, false)
          ]).start();
        }
        merge(other, context) {
          if (!this.action.animate && other instanceof MoveCommand_1) {
            other.resolvedMoves.forEach((otherMove, otherElementId) => {
              const existingMove = this.resolvedMoves.get(otherElementId);
              if (existingMove) {
                existingMove.toPosition = otherMove.toPosition;
              } else {
                this.resolvedMoves.set(otherElementId, otherMove);
              }
            });
            other.edgeMementi.forEach((otherMemento) => {
              const existingMemento = this.edgeMementi.find((edgeMemento) => edgeMemento.edge.id === otherMemento.edge.id);
              if (existingMemento) {
                existingMemento.after = otherMemento.after;
              } else {
                this.edgeMementi.push(otherMemento);
              }
            });
            return true;
          } else if (other instanceof reconnect_1.ReconnectCommand) {
            const otherMemento = other.memento;
            if (otherMemento) {
              const existingMemento = this.edgeMementi.find((edgeMemento) => edgeMemento.edge.id === otherMemento.edge.id);
              if (existingMemento) {
                existingMemento.after = otherMemento.after;
              } else {
                this.edgeMementi.push(otherMemento);
              }
            }
            return true;
          }
          return false;
        }
      };
      MoveCommand.KIND = MoveAction.KIND;
      __decorate([
        (0, inversify_1.inject)(routing_1.EdgeRouterRegistry),
        (0, inversify_1.optional)(),
        __metadata("design:type", routing_1.EdgeRouterRegistry)
      ], MoveCommand.prototype, "edgeRouterRegistry", void 0);
      MoveCommand = MoveCommand_1 = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(types_1.TYPES.Action)),
        __metadata("design:paramtypes", [Object])
      ], MoveCommand);
      exports.MoveCommand = MoveCommand;
      var MoveAnimation = class extends animation_1.Animation {
        constructor(model, elementMoves, context, reverse = false) {
          super(context);
          this.model = model;
          this.elementMoves = elementMoves;
          this.reverse = reverse;
        }
        tween(t) {
          this.elementMoves.forEach((elementMove) => {
            if (this.reverse) {
              elementMove.element.position = {
                x: (1 - t) * elementMove.toPosition.x + t * elementMove.fromPosition.x,
                y: (1 - t) * elementMove.toPosition.y + t * elementMove.fromPosition.y
              };
            } else {
              elementMove.element.position = {
                x: (1 - t) * elementMove.fromPosition.x + t * elementMove.toPosition.x,
                y: (1 - t) * elementMove.fromPosition.y + t * elementMove.toPosition.y
              };
            }
          });
          return this.model;
        }
      };
      exports.MoveAnimation = MoveAnimation;
      var MorphEdgesAnimation = class extends animation_1.Animation {
        constructor(model, originalMementi, context, reverse = false) {
          super(context);
          this.model = model;
          this.reverse = reverse;
          this.expanded = [];
          originalMementi.forEach((edgeMemento) => {
            const start = this.reverse ? edgeMemento.after : edgeMemento.before;
            const end = this.reverse ? edgeMemento.before : edgeMemento.after;
            const startRoute = start.routedPoints;
            const endRoute = end.routedPoints;
            const maxRoutingPoints = Math.max(startRoute.length, endRoute.length);
            this.expanded.push({
              startExpandedRoute: this.growToSize(startRoute, maxRoutingPoints),
              endExpandedRoute: this.growToSize(endRoute, maxRoutingPoints),
              memento: edgeMemento
            });
          });
        }
        midPoint(edgeMemento) {
          const edge = edgeMemento.edge;
          const source = edgeMemento.edge.source;
          const target = edgeMemento.edge.target;
          return geometry_1.Point.linear((0, smodel_utils_1.translatePoint)(geometry_1.Bounds.center(source.bounds), source.parent, edge.parent), (0, smodel_utils_1.translatePoint)(geometry_1.Bounds.center(target.bounds), target.parent, edge.parent), 0.5);
        }
        start() {
          this.expanded.forEach((morph) => {
            morph.memento.edge.removeAll((e) => e instanceof model_2.SRoutingHandle);
          });
          return super.start();
        }
        tween(t) {
          if (t === 1) {
            this.expanded.forEach((morph) => {
              const memento = morph.memento;
              if (this.reverse)
                memento.before.router.applySnapshot(memento.edge, memento.before);
              else
                memento.after.router.applySnapshot(memento.edge, memento.after);
            });
          } else {
            this.expanded.forEach((morph) => {
              const newRoutingPoints = [];
              for (let i = 1; i < morph.startExpandedRoute.length - 1; ++i)
                newRoutingPoints.push(geometry_1.Point.linear(morph.startExpandedRoute[i], morph.endExpandedRoute[i], t));
              const closestSnapshot = t < 0.5 ? morph.memento.before : morph.memento.after;
              const newSnapshot = Object.assign(Object.assign({}, closestSnapshot), { routingPoints: newRoutingPoints, routingHandles: [] });
              closestSnapshot.router.applySnapshot(morph.memento.edge, newSnapshot);
            });
          }
          return this.model;
        }
        growToSize(route, targetSize) {
          const diff = targetSize - route.length;
          if (diff <= 0)
            return route;
          const result = [];
          result.push(route[0]);
          const deltaDiff = 1 / (diff + 1);
          const deltaSmaller = 1 / (route.length - 1);
          let nextInsertion = 1;
          for (let i = 1; i < route.length; ++i) {
            const pos = deltaSmaller * i;
            let insertions = 0;
            while (pos > (nextInsertion + insertions) * deltaDiff)
              ++insertions;
            nextInsertion += insertions;
            for (let j = 0; j < insertions; ++j) {
              const p = geometry_1.Point.linear(route[i - 1], route[i], (j + 1) / (insertions + 1));
              result.push(p);
            }
            result.push(route[i]);
          }
          return result;
        }
      };
      exports.MorphEdgesAnimation = MorphEdgesAnimation;
      var MoveMouseListener = class extends mouse_tool_1.MouseListener {
        constructor() {
          super(...arguments);
          this.hasDragged = false;
          this.elementId2startPos = /* @__PURE__ */ new Map();
        }
        mouseDown(target, event) {
          if (event.button === 0) {
            const moveable = (0, smodel_utils_1.findParentByFeature)(target, model_6.isMoveable);
            const isRoutingHandle = target instanceof model_2.SRoutingHandle;
            if (moveable !== void 0 || isRoutingHandle || (0, create_on_drag_1.isCreatingOnDrag)(target)) {
              this.startDragPosition = { x: event.pageX, y: event.pageY };
            } else {
              this.startDragPosition = void 0;
            }
            this.hasDragged = false;
            if ((0, create_on_drag_1.isCreatingOnDrag)(target)) {
              this.startCreatingOnDrag(target, event);
            } else if (isRoutingHandle) {
              this.activateRoutingHandle(target, event);
            }
          }
          return [];
        }
        startCreatingOnDrag(target, event) {
          const result = [];
          result.push(actions_1.SelectAllAction.create({ select: false }));
          result.push(target.createAction(model_2.edgeInProgressID));
          result.push(actions_1.SelectAction.create({ selectedElementsIDs: [model_2.edgeInProgressID] }));
          result.push(edit_routing_1.SwitchEditModeAction.create({ elementsToActivate: [model_2.edgeInProgressID] }));
          result.push(actions_1.SelectAction.create({ selectedElementsIDs: [model_2.edgeInProgressTargetHandleID] }));
          result.push(edit_routing_1.SwitchEditModeAction.create({ elementsToActivate: [model_2.edgeInProgressTargetHandleID] }));
          return result;
        }
        activateRoutingHandle(target, event) {
          return [edit_routing_1.SwitchEditModeAction.create({ elementsToActivate: [target.id] })];
        }
        mouseMove(target, event) {
          const result = [];
          if (event.buttons === 0)
            this.mouseUp(target, event);
          else if (this.startDragPosition) {
            if (this.elementId2startPos.size === 0) {
              this.collectStartPositions(target.root);
            }
            this.hasDragged = true;
            const moveAction = this.getElementMoves(target, event, false);
            if (moveAction)
              result.push(moveAction);
          }
          return result;
        }
        collectStartPositions(root) {
          const selectedElements = new Set(root.index.all().filter((element) => (0, model_4.isSelectable)(element) && element.selected));
          selectedElements.forEach((element) => {
            if (!this.isChildOfSelected(selectedElements, element)) {
              if ((0, model_6.isMoveable)(element))
                this.elementId2startPos.set(element.id, element.position);
              else if (element instanceof model_2.SRoutingHandle) {
                const position = this.getHandlePosition(element);
                if (position)
                  this.elementId2startPos.set(element.id, position);
              }
            }
          });
        }
        isChildOfSelected(selectedElements, element) {
          while (element instanceof smodel_1.SChildElement) {
            element = element.parent;
            if ((0, model_6.isMoveable)(element) && selectedElements.has(element)) {
              return true;
            }
          }
          return false;
        }
        getElementMoves(target, event, isFinished) {
          if (!this.startDragPosition)
            return void 0;
          const elementMoves = [];
          const viewport = (0, smodel_utils_1.findParentByFeature)(target, model_5.isViewport);
          const zoom = viewport ? viewport.zoom : 1;
          const delta = {
            x: (event.pageX - this.startDragPosition.x) / zoom,
            y: (event.pageY - this.startDragPosition.y) / zoom
          };
          this.elementId2startPos.forEach((startPosition, elementId) => {
            const element = target.root.index.getById(elementId);
            if (element) {
              const move = this.createElementMove(element, startPosition, delta, event);
              if (move) {
                elementMoves.push(move);
              }
            }
          });
          if (elementMoves.length > 0)
            return MoveAction.create(elementMoves, { animate: false, finished: isFinished });
          else
            return void 0;
        }
        createElementMove(element, startPosition, delta, event) {
          const toPosition = this.snap({
            x: startPosition.x + delta.x,
            y: startPosition.y + delta.y
          }, element, !event.shiftKey);
          if ((0, model_6.isMoveable)(element)) {
            return {
              elementId: element.id,
              elementType: element.type,
              fromPosition: {
                x: element.position.x,
                y: element.position.y
              },
              toPosition
            };
          } else if (element instanceof model_2.SRoutingHandle) {
            const point = this.getHandlePosition(element);
            if (point !== void 0) {
              return {
                elementId: element.id,
                elementType: element.type,
                fromPosition: point,
                toPosition
              };
            }
          }
          return void 0;
        }
        snap(position, element, isSnap) {
          if (isSnap && this.snapper)
            return this.snapper.snap(position, element);
          else
            return position;
        }
        getHandlePosition(handle) {
          if (this.edgeRouterRegistry) {
            const parent = handle.parent;
            if (!(parent instanceof model_2.SRoutableElement))
              return void 0;
            const router = this.edgeRouterRegistry.get(parent.routerKind);
            const route = router.route(parent);
            return router.getHandlePosition(parent, route, handle);
          }
          return void 0;
        }
        mouseEnter(target, event) {
          if (target instanceof smodel_1.SModelRoot && event.buttons === 0 && !this.startDragPosition)
            this.mouseUp(target, event);
          return [];
        }
        mouseUp(target, event) {
          const result = [];
          if (this.startDragPosition) {
            const moveAction = this.getElementMoves(target, event, true);
            if (moveAction) {
              result.push(moveAction);
            }
            target.root.index.all().forEach((element) => {
              if (element instanceof model_2.SRoutingHandle) {
                result.push(...this.deactivateRoutingHandle(element, target, event));
              }
            });
          }
          if (!result.some((a) => a.kind === actions_1.ReconnectAction.KIND)) {
            const edgeInProgress = target.root.index.getById(model_2.edgeInProgressID);
            if (edgeInProgress instanceof smodel_1.SChildElement) {
              result.push(this.deleteEdgeInProgress(edgeInProgress));
            }
          }
          if (this.hasDragged) {
            result.push(commit_model_1.CommitModelAction.create());
          }
          this.hasDragged = false;
          this.startDragPosition = void 0;
          this.elementId2startPos.clear();
          return result;
        }
        deactivateRoutingHandle(element, target, event) {
          const result = [];
          const parent = element.parent;
          if (parent instanceof model_2.SRoutableElement && element.danglingAnchor) {
            const handlePos = this.getHandlePosition(element);
            if (handlePos) {
              const handlePosAbs = (0, smodel_utils_1.translatePoint)(handlePos, element.parent, element.root);
              const newEnd = (0, model_1.findChildrenAtPosition)(target.root, handlePosAbs).find((e) => (0, model_2.isConnectable)(e) && e.canConnect(parent, element.kind));
              if (newEnd && this.hasDragged) {
                result.push(actions_1.ReconnectAction.create({
                  routableId: element.parent.id,
                  newSourceId: element.kind === "source" ? newEnd.id : parent.sourceId,
                  newTargetId: element.kind === "target" ? newEnd.id : parent.targetId
                }));
              }
            }
          }
          if (element.editMode) {
            result.push(edit_routing_1.SwitchEditModeAction.create({ elementsToDeactivate: [element.id] }));
          }
          return result;
        }
        deleteEdgeInProgress(edgeInProgress) {
          const deleteIds = [];
          deleteIds.push(model_2.edgeInProgressID);
          edgeInProgress.children.forEach((c) => {
            if (c instanceof model_2.SRoutingHandle && c.danglingAnchor)
              deleteIds.push(c.danglingAnchor.id);
          });
          return actions_1.DeleteElementAction.create(deleteIds);
        }
        decorate(vnode, element) {
          return vnode;
        }
      };
      __decorate([
        (0, inversify_1.inject)(routing_1.EdgeRouterRegistry),
        (0, inversify_1.optional)(),
        __metadata("design:type", routing_1.EdgeRouterRegistry)
      ], MoveMouseListener.prototype, "edgeRouterRegistry", void 0);
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.ISnapper),
        (0, inversify_1.optional)(),
        __metadata("design:type", Object)
      ], MoveMouseListener.prototype, "snapper", void 0);
      exports.MoveMouseListener = MoveMouseListener;
      var LocationPostprocessor = class LocationPostprocessor {
        decorate(vnode, element) {
          if ((0, model_3.isEdgeLayoutable)(element) && element.parent instanceof sgraph_1.SEdge) {
            return vnode;
          }
          let translate = "";
          if ((0, model_6.isLocateable)(element) && element instanceof smodel_1.SChildElement && element.parent !== void 0) {
            const pos = element.position;
            if (pos.x !== 0 || pos.y !== 0) {
              translate = "translate(" + pos.x + ", " + pos.y + ")";
            }
          }
          if ((0, model_1.isAlignable)(element)) {
            const ali = element.alignment;
            if (ali.x !== 0 || ali.y !== 0) {
              if (translate.length > 0) {
                translate += " ";
              }
              translate += "translate(" + ali.x + ", " + ali.y + ")";
            }
          }
          if (translate.length > 0) {
            (0, vnode_utils_1.setAttr)(vnode, "transform", translate);
          }
          return vnode;
        }
        postUpdate() {
        }
      };
      LocationPostprocessor = __decorate([
        (0, inversify_1.injectable)()
      ], LocationPostprocessor);
      exports.LocationPostprocessor = LocationPostprocessor;
    }
  });

  // node_modules/sprotty/lib/features/move/snap.js
  var require_snap = __commonJS({
    "node_modules/sprotty/lib/features/move/snap.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.CenterGridSnapper = void 0;
      var inversify_1 = require_inversify();
      var model_1 = require_model2();
      var CenterGridSnapper = class CenterGridSnapper {
        get gridX() {
          return 10;
        }
        get gridY() {
          return 10;
        }
        snap(position, element) {
          if (element && (0, model_1.isBoundsAware)(element))
            return {
              x: Math.round((position.x + 0.5 * element.bounds.width) / this.gridX) * this.gridX - 0.5 * element.bounds.width,
              y: Math.round((position.y + 0.5 * element.bounds.height) / this.gridY) * this.gridY - 0.5 * element.bounds.height
            };
          else
            return {
              x: Math.round(position.x / this.gridX) * this.gridX,
              y: Math.round(position.y / this.gridY) * this.gridY
            };
        }
      };
      CenterGridSnapper = __decorate([
        (0, inversify_1.injectable)()
      ], CenterGridSnapper);
      exports.CenterGridSnapper = CenterGridSnapper;
    }
  });

  // node_modules/sprotty/lib/features/open/model.js
  var require_model16 = __commonJS({
    "node_modules/sprotty/lib/features/open/model.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isOpenable = exports.openFeature = void 0;
      exports.openFeature = Symbol("openFeature");
      function isOpenable(element) {
        return element.hasFeature(exports.openFeature);
      }
      exports.isOpenable = isOpenable;
    }
  });

  // node_modules/sprotty/lib/features/open/open.js
  var require_open = __commonJS({
    "node_modules/sprotty/lib/features/open/open.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.OpenMouseListener = void 0;
      var actions_1 = require_actions();
      var mouse_tool_1 = require_mouse_tool();
      var smodel_utils_1 = require_smodel_utils();
      var model_1 = require_model16();
      var OpenMouseListener = class extends mouse_tool_1.MouseListener {
        doubleClick(target, event) {
          const openableTarget = (0, smodel_utils_1.findParentByFeature)(target, model_1.isOpenable);
          if (openableTarget !== void 0) {
            return [actions_1.OpenAction.create(openableTarget.id)];
          }
          return [];
        }
      };
      exports.OpenMouseListener = OpenMouseListener;
    }
  });

  // node_modules/sprotty/lib/features/projection/model.js
  var require_model17 = __commonJS({
    "node_modules/sprotty/lib/features/projection/model.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getModelBounds = exports.getProjectedBounds = exports.getProjections = exports.isProjectable = void 0;
      var geometry_1 = require_geometry();
      var object_1 = require_object();
      var smodel_utils_1 = require_smodel_utils();
      var model_1 = require_model2();
      function isProjectable(arg) {
        return (0, object_1.hasOwnProperty)(arg, "projectionCssClasses");
      }
      exports.isProjectable = isProjectable;
      function getProjections(parent) {
        let result;
        for (const child of parent.children) {
          if (isProjectable(child) && child.projectionCssClasses.length > 0) {
            const projectedBounds = getProjectedBounds(child);
            if (projectedBounds) {
              const projection = {
                elementId: child.id,
                projectedBounds,
                cssClasses: child.projectionCssClasses
              };
              if (result) {
                result.push(projection);
              } else {
                result = [projection];
              }
            }
          }
          if (child.children.length > 0) {
            const childProj = getProjections(child);
            if (childProj) {
              if (result) {
                result.push(...childProj);
              } else {
                result = childProj;
              }
            }
          }
        }
        return result;
      }
      exports.getProjections = getProjections;
      function getProjectedBounds(model) {
        const parent = model.parent;
        if (model.projectedBounds) {
          let bounds = model.projectedBounds;
          if ((0, model_1.isBoundsAware)(parent)) {
            bounds = (0, smodel_utils_1.transformToRootBounds)(parent, bounds);
          }
          return bounds;
        } else if ((0, model_1.isBoundsAware)(model)) {
          let bounds = model.bounds;
          bounds = (0, smodel_utils_1.transformToRootBounds)(parent, bounds);
          return bounds;
        }
        return void 0;
      }
      exports.getProjectedBounds = getProjectedBounds;
      var MAX_COORD = 1e9;
      function getModelBounds(model) {
        let minX = MAX_COORD;
        let minY = MAX_COORD;
        let maxX = -MAX_COORD;
        let maxY = -MAX_COORD;
        const bounds = (0, model_1.isBoundsAware)(model) ? model.bounds : void 0;
        if (bounds && geometry_1.Dimension.isValid(bounds)) {
          minX = bounds.x;
          minY = bounds.y;
          maxX = minX + bounds.width;
          maxY = minY + bounds.height;
        } else {
          for (const element of model.children) {
            if ((0, model_1.isBoundsAware)(element)) {
              const b = element.bounds;
              minX = Math.min(minX, b.x);
              minY = Math.min(minY, b.y);
              maxX = Math.max(maxX, b.x + b.width);
              maxY = Math.max(maxY, b.y + b.height);
            }
          }
        }
        minX = Math.min(minX, model.scroll.x);
        minY = Math.min(minY, model.scroll.y);
        maxX = Math.max(maxX, model.scroll.x + model.canvasBounds.width / model.zoom);
        maxY = Math.max(maxY, model.scroll.y + model.canvasBounds.height / model.zoom);
        if (minX < maxX && minY < maxY) {
          return {
            x: minX,
            y: minY,
            width: maxX - minX,
            height: maxY - minY
          };
        }
        return void 0;
      }
      exports.getModelBounds = getModelBounds;
    }
  });

  // node_modules/sprotty/lib/features/projection/views.js
  var require_views4 = __commonJS({
    "node_modules/sprotty/lib/features/projection/views.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ProjectedViewportView = void 0;
      var jsx_1 = require_jsx();
      var inversify_1 = require_inversify();
      var snabbdom_1 = require_snabbdom_cjs();
      var vnode_utils_1 = require_vnode_utils();
      var model_1 = require_model17();
      var ProjectedViewportView = class ProjectedViewportView {
        render(model, context, args) {
          const rootNode = (0, jsx_1.html)(
            "div",
            { "class-sprotty-root": true },
            this.renderSvg(model, context, args),
            this.renderProjections(model, context, args)
          );
          (0, vnode_utils_1.setAttr)(rootNode, "tabindex", 0);
          return rootNode;
        }
        renderSvg(model, context, args) {
          const transform = `scale(${model.zoom}) translate(${-model.scroll.x},${-model.scroll.y})`;
          const ns = "http://www.w3.org/2000/svg";
          return (0, snabbdom_1.h)("svg", { ns }, (0, snabbdom_1.h)("g", { ns, attrs: { transform } }, context.renderChildren(model)));
        }
        renderProjections(model, context, args) {
          var _a;
          if (model.zoom <= 0) {
            return [];
          }
          const modelBounds = (0, model_1.getModelBounds)(model);
          if (!modelBounds) {
            return [];
          }
          const projections = (_a = (0, model_1.getProjections)(model)) !== null && _a !== void 0 ? _a : [];
          return [
            this.renderProjectionBar(projections, model, modelBounds, "vertical"),
            this.renderProjectionBar(projections, model, modelBounds, "horizontal")
          ];
        }
        renderProjectionBar(projections, model, modelBounds, orientation) {
          const params = { modelBounds, orientation };
          params.factor = orientation === "horizontal" ? model.canvasBounds.width / modelBounds.width : model.canvasBounds.height / modelBounds.height;
          params.zoomedFactor = params.factor / model.zoom;
          return (0, jsx_1.html)(
            "div",
            { "class-sprotty-projection-bar": true, "class-horizontal": orientation === "horizontal", "class-vertical": orientation === "vertical" },
            this.renderViewport(model, params),
            projections.map((p) => this.renderProjection(p, model, params))
          );
        }
        renderViewport(model, params) {
          let canvasSize, viewportPos;
          if (params.orientation === "horizontal") {
            canvasSize = model.canvasBounds.width;
            viewportPos = (model.scroll.x - params.modelBounds.x) * params.factor;
          } else {
            canvasSize = model.canvasBounds.height;
            viewportPos = (model.scroll.y - params.modelBounds.y) * params.factor;
          }
          let viewportSize = canvasSize * params.zoomedFactor;
          if (viewportPos < 0) {
            viewportSize += viewportPos;
            viewportPos = 0;
          } else if (viewportPos > canvasSize) {
            viewportPos = canvasSize;
          }
          if (viewportSize < 0) {
            viewportSize = 0;
          } else if (viewportPos + viewportSize > canvasSize) {
            viewportSize = canvasSize - viewportPos;
          }
          const style = params.orientation === "horizontal" ? {
            left: `${viewportPos}px`,
            width: `${viewportSize}px`
          } : {
            top: `${viewportPos}px`,
            height: `${viewportSize}px`
          };
          return (0, jsx_1.html)("div", { "class-sprotty-viewport": true, style });
        }
        renderProjection(projection, model, params) {
          let canvasSize, projPos, projSize;
          if (params.orientation === "horizontal") {
            canvasSize = model.canvasBounds.width;
            projPos = (projection.projectedBounds.x - params.modelBounds.x) * params.factor;
            projSize = projection.projectedBounds.width * params.factor;
          } else {
            canvasSize = model.canvasBounds.height;
            projPos = (projection.projectedBounds.y - params.modelBounds.y) * params.factor;
            projSize = projection.projectedBounds.height * params.factor;
          }
          if (projPos < 0) {
            projSize += projPos;
            projPos = 0;
          } else if (projPos > canvasSize) {
            projPos = canvasSize;
          }
          if (projSize < 0) {
            projSize = 0;
          } else if (projPos + projSize > canvasSize) {
            projSize = canvasSize - projPos;
          }
          const style = params.orientation === "horizontal" ? {
            left: `${projPos}px`,
            width: `${projSize}px`
          } : {
            top: `${projPos}px`,
            height: `${projSize}px`
          };
          const result = (0, jsx_1.html)("div", { id: `${params.orientation}-projection:${projection.elementId}`, "class-sprotty-projection": true, style });
          projection.cssClasses.forEach((cl) => (0, vnode_utils_1.setClass)(result, cl, true));
          return result;
        }
      };
      ProjectedViewportView = __decorate([
        (0, inversify_1.injectable)()
      ], ProjectedViewportView);
      exports.ProjectedViewportView = ProjectedViewportView;
    }
  });

  // node_modules/sprotty/lib/features/routing/polyline-anchors.js
  var require_polyline_anchors = __commonJS({
    "node_modules/sprotty/lib/features/routing/polyline-anchors.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.DiamondAnchor = exports.RectangleAnchor = exports.EllipseAnchor = void 0;
      var anchor_1 = require_anchor();
      var geometry_1 = require_geometry2();
      var inversify_1 = require_inversify();
      var polyline_edge_router_1 = require_polyline_edge_router();
      var geometry_2 = require_geometry();
      var EllipseAnchor = class EllipseAnchor {
        get kind() {
          return polyline_edge_router_1.PolylineEdgeRouter.KIND + ":" + anchor_1.ELLIPTIC_ANCHOR_KIND;
        }
        getAnchor(connectable, refPoint, offset = 0) {
          const bounds = connectable.bounds;
          const c = geometry_2.Bounds.center(bounds);
          const dx = c.x - refPoint.x;
          const dy = c.y - refPoint.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const normX = dx / distance || 0;
          const normY = dy / distance || 0;
          return {
            x: c.x - normX * (0.5 * bounds.width + offset),
            y: c.y - normY * (0.5 * bounds.height + offset)
          };
        }
      };
      EllipseAnchor = __decorate([
        (0, inversify_1.injectable)()
      ], EllipseAnchor);
      exports.EllipseAnchor = EllipseAnchor;
      var RectangleAnchor = class RectangleAnchor {
        get kind() {
          return polyline_edge_router_1.PolylineEdgeRouter.KIND + ":" + anchor_1.RECTANGULAR_ANCHOR_KIND;
        }
        getAnchor(connectable, refPoint, offset = 0) {
          const bounds = connectable.bounds;
          const c = geometry_2.Bounds.center(bounds);
          const finder = new NearestPointFinder(c, refPoint);
          if (!(0, geometry_2.almostEquals)(c.y, refPoint.y)) {
            const xTop = this.getXIntersection(bounds.y, c, refPoint);
            if (xTop >= bounds.x && xTop <= bounds.x + bounds.width)
              finder.addCandidate(xTop, bounds.y - offset);
            const xBottom = this.getXIntersection(bounds.y + bounds.height, c, refPoint);
            if (xBottom >= bounds.x && xBottom <= bounds.x + bounds.width)
              finder.addCandidate(xBottom, bounds.y + bounds.height + offset);
          }
          if (!(0, geometry_2.almostEquals)(c.x, refPoint.x)) {
            const yLeft = this.getYIntersection(bounds.x, c, refPoint);
            if (yLeft >= bounds.y && yLeft <= bounds.y + bounds.height)
              finder.addCandidate(bounds.x - offset, yLeft);
            const yRight = this.getYIntersection(bounds.x + bounds.width, c, refPoint);
            if (yRight >= bounds.y && yRight <= bounds.y + bounds.height)
              finder.addCandidate(bounds.x + bounds.width + offset, yRight);
          }
          return finder.best;
        }
        getXIntersection(yIntersection, centerPoint, point) {
          const t = (yIntersection - centerPoint.y) / (point.y - centerPoint.y);
          return (point.x - centerPoint.x) * t + centerPoint.x;
        }
        getYIntersection(xIntersection, centerPoint, point) {
          const t = (xIntersection - centerPoint.x) / (point.x - centerPoint.x);
          return (point.y - centerPoint.y) * t + centerPoint.y;
        }
      };
      RectangleAnchor = __decorate([
        (0, inversify_1.injectable)()
      ], RectangleAnchor);
      exports.RectangleAnchor = RectangleAnchor;
      var NearestPointFinder = class {
        constructor(centerPoint, refPoint) {
          this.centerPoint = centerPoint;
          this.refPoint = refPoint;
          this.currentDist = -1;
        }
        addCandidate(x, y) {
          const dx = this.refPoint.x - x;
          const dy = this.refPoint.y - y;
          const dist = dx * dx + dy * dy;
          if (this.currentDist < 0 || dist < this.currentDist) {
            this.currentBest = {
              x,
              y
            };
            this.currentDist = dist;
          }
        }
        get best() {
          if (this.currentBest === void 0)
            return this.centerPoint;
          else
            return this.currentBest;
        }
      };
      var DiamondAnchor = class DiamondAnchor {
        get kind() {
          return polyline_edge_router_1.PolylineEdgeRouter.KIND + ":" + anchor_1.DIAMOND_ANCHOR_KIND;
        }
        getAnchor(connectable, refPoint, offset) {
          const bounds = connectable.bounds;
          const referenceLine = new geometry_1.PointToPointLine(geometry_2.Bounds.center(bounds), refPoint);
          const closestDiamondSide = new geometry_1.Diamond(bounds).closestSideLine(refPoint);
          const anchorPoint = (0, geometry_1.intersection)(closestDiamondSide, referenceLine);
          return geometry_2.Point.shiftTowards(anchorPoint, refPoint, offset);
        }
      };
      DiamondAnchor = __decorate([
        (0, inversify_1.injectable)()
      ], DiamondAnchor);
      exports.DiamondAnchor = DiamondAnchor;
    }
  });

  // node_modules/sprotty/lib/features/routing/bezier-edge-router.js
  var require_bezier_edge_router = __commonJS({
    "node_modules/sprotty/lib/features/routing/bezier-edge-router.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      var __param = exports && exports.__param || function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      var BezierEdgeRouter_1;
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.AddRemoveBezierSegmentCommand = exports.AddRemoveBezierSegmentAction = exports.BezierMouseListener = exports.BezierEdgeRouter = void 0;
      var inversify_1 = require_inversify();
      var geometry_1 = require_geometry();
      var model_1 = require_model9();
      var routing_1 = require_routing();
      var abstract_edge_router_1 = require_abstract_edge_router();
      var mouse_tool_1 = require_mouse_tool();
      var command_1 = require_command();
      var types_1 = require_types();
      var BezierEdgeRouter = BezierEdgeRouter_1 = class BezierEdgeRouter extends abstract_edge_router_1.AbstractEdgeRouter {
        get kind() {
          return BezierEdgeRouter_1.KIND;
        }
        route(edge) {
          if (!edge.source || !edge.target)
            return [];
          const rpCount = edge.routingPoints.length;
          const source = edge.source;
          const target = edge.target;
          const result = [];
          result.push({ kind: "source", x: 0, y: 0 });
          if (rpCount === 0) {
            const [h1, h2] = this.createDefaultBezierHandles(source.position, target.position);
            result.push({ kind: "bezier-control-after", x: h1.x, y: h1.y, pointIndex: 0 });
            result.push({ kind: "bezier-control-before", x: h2.x, y: h2.y, pointIndex: 1 });
            edge.routingPoints.push(h1);
            edge.routingPoints.push(h2);
          } else if (rpCount >= 2) {
            for (let i = 0; i < rpCount; i++) {
              const p = edge.routingPoints[i];
              if (i % 3 === 0) {
                result.push({ kind: "bezier-control-after", x: p.x, y: p.y, pointIndex: i });
              }
              if ((i + 1) % 3 === 0) {
                result.push({ kind: "bezier-junction", x: p.x, y: p.y, pointIndex: i });
              } else if ((i + 2) % 3 === 0) {
                result.push({ kind: "bezier-control-before", x: p.x, y: p.y, pointIndex: i });
              }
            }
          }
          result.push({ kind: "target", x: 0, y: 0 });
          const p0 = rpCount > 2 ? edge.routingPoints[2] : target.position;
          const pn = rpCount > 2 ? edge.routingPoints[edge.routingPoints.length - 3] : source.position;
          const sourceAnchor = this.getTranslatedAnchor(source, p0, target.parent, edge, edge.sourceAnchorCorrection);
          const targetAnchor = this.getTranslatedAnchor(target, pn, source.parent, edge, edge.targetAnchorCorrection);
          result[0] = { kind: "source", x: sourceAnchor.x, y: sourceAnchor.y };
          result[result.length - 1] = { kind: "target", x: targetAnchor.x, y: targetAnchor.y };
          return result;
        }
        createDefaultBezierHandles(relH1, relH2) {
          const h1 = {
            x: relH1.x - BezierEdgeRouter_1.DEFAULT_BEZIER_HANDLE_OFFSET,
            y: relH1.y
          };
          const h2 = {
            x: relH2.x + BezierEdgeRouter_1.DEFAULT_BEZIER_HANDLE_OFFSET,
            y: relH2.y
          };
          return [h1, h2];
        }
        createRoutingHandles(edge) {
          this.route(edge);
          this.rebuildHandles(edge);
        }
        rebuildHandles(edge) {
          this.addHandle(edge, "source", "routing-point", -2);
          this.addHandle(edge, "bezier-control-after", "bezier-routing-point", 0);
          this.addHandle(edge, "bezier-add", "bezier-create-routing-point", 0);
          const rpCount = edge.routingPoints.length;
          if (rpCount > 2) {
            for (let i = 1; i < rpCount - 1; i += 3) {
              this.addHandle(edge, "bezier-control-before", "bezier-routing-point", i);
              this.addHandle(edge, "bezier-add", "bezier-create-routing-point", i + 1);
              this.addHandle(edge, "bezier-junction", "routing-point", i + 1);
              this.addHandle(edge, "bezier-remove", "bezier-remove-routing-point", i + 1);
              this.addHandle(edge, "bezier-control-after", "bezier-routing-point", i + 2);
              this.moveBezierControlPair(edge.routingPoints[i], i, edge);
            }
          }
          this.addHandle(edge, "bezier-control-before", "bezier-routing-point", rpCount - 1);
          this.addHandle(edge, "target", "routing-point", -1);
        }
        getInnerHandlePosition(edge, route, handle) {
          if (handle.kind === "bezier-control-before" || handle.kind === "bezier-junction" || handle.kind === "bezier-control-after") {
            for (let i = 0; i < route.length; i++) {
              const p = route[i];
              if (p.pointIndex === handle.pointIndex && p.kind === handle.kind)
                return p;
            }
          } else if (handle.kind === "bezier-add") {
            const ctrlPoint = this.findBezierControl(edge, route, handle.pointIndex);
            return { x: ctrlPoint.x, y: ctrlPoint.y + 12.5 };
          } else if (handle.kind === "bezier-remove") {
            const ctrlPoint = this.findBezierControl(edge, route, handle.pointIndex);
            return { x: ctrlPoint.x, y: ctrlPoint.y - 12.5 };
          }
          return void 0;
        }
        findBezierControl(edge, route, handleIndex) {
          let result = { x: route[0].x, y: route[0].y };
          if (handleIndex > 0) {
            for (const rp of route) {
              if (rp.pointIndex !== void 0 && rp.pointIndex === handleIndex && rp.kind === "bezier-junction") {
                result = { x: rp.x, y: rp.y };
                break;
              }
            }
          }
          return result;
        }
        applyHandleMoves(edge, moves) {
          moves.forEach((move) => {
            const handle = move.handle;
            let orgPosition = { x: 0, y: 0 };
            let relativePos, newControlPos, ctrlPointIndex;
            const moveToPos = move.toPosition;
            switch (handle.kind) {
              case "bezier-control-before":
              case "bezier-control-after":
                this.moveBezierControlPair(moveToPos, move.handle.pointIndex, edge);
                break;
              case "bezier-junction":
                const index = handle.pointIndex;
                if (index >= 0 && index < edge.routingPoints.length) {
                  ctrlPointIndex = index - 1;
                  orgPosition = edge.routingPoints[index];
                  relativePos = edge.routingPoints[ctrlPointIndex];
                  newControlPos = this.calcRelativeMove(orgPosition, moveToPos, relativePos);
                  edge.routingPoints[index] = moveToPos;
                  this.moveBezierControlPair(newControlPos, ctrlPointIndex, edge);
                }
                break;
              case "source":
                ctrlPointIndex = 0;
                relativePos = edge.routingPoints[ctrlPointIndex];
                if (!(edge.source instanceof model_1.SDanglingAnchor)) {
                  const anchor = new model_1.SDanglingAnchor();
                  anchor.id = edge.id + "_dangling-source";
                  anchor.original = edge.source;
                  anchor.position = move.toPosition;
                  handle.root.add(anchor);
                  handle.danglingAnchor = anchor;
                  edge.sourceId = anchor.id;
                  if (edge.source)
                    orgPosition = edge.source.position;
                } else if (handle.danglingAnchor) {
                  orgPosition = handle.danglingAnchor.position;
                  handle.danglingAnchor.position = moveToPos;
                }
                newControlPos = this.calcRelativeMove(orgPosition, moveToPos, relativePos);
                this.moveBezierControlPair(newControlPos, ctrlPointIndex, edge);
                break;
              case "target":
                ctrlPointIndex = edge.routingPoints.length - 1;
                relativePos = edge.routingPoints[ctrlPointIndex];
                if (!(edge.target instanceof model_1.SDanglingAnchor)) {
                  const anchor = new model_1.SDanglingAnchor();
                  anchor.id = edge.id + "_dangling-target";
                  anchor.original = edge.target;
                  anchor.position = moveToPos;
                  handle.root.add(anchor);
                  handle.danglingAnchor = anchor;
                  edge.targetId = anchor.id;
                  if (edge.target)
                    orgPosition = edge.target.position;
                } else if (handle.danglingAnchor) {
                  orgPosition = handle.danglingAnchor.position;
                  handle.danglingAnchor.position = moveToPos;
                }
                newControlPos = this.calcRelativeMove(orgPosition, moveToPos, relativePos);
                this.moveBezierControlPair(newControlPos, ctrlPointIndex, edge);
                break;
              default:
                break;
            }
          });
        }
        applyInnerHandleMoves(edge, moves) {
        }
        getOptions(edge) {
          return {
            minimalPointDistance: 2,
            standardDistance: 0.1,
            selfEdgeOffset: 20
          };
        }
        calcRelativeMove(oldPos, newPos, relativePoint) {
          return {
            x: relativePoint.x - (oldPos.x - newPos.x),
            y: relativePoint.y - (oldPos.y - newPos.y)
          };
        }
        createNewBezierSegment(index, edge) {
          const routingPoints = edge.routingPoints;
          let bezierJunctionPos, start, end;
          if (routingPoints.length === 2) {
            start = routingPoints[index < 0 ? 0 : index];
            end = routingPoints[routingPoints.length - 1];
            bezierJunctionPos = (0, geometry_1.centerOfLine)(start, end);
          } else {
            start = routingPoints[index];
            end = routingPoints[index + 2];
            bezierJunctionPos = (0, geometry_1.centerOfLine)(start, end);
          }
          const [h1, h2] = this.createDefaultBezierHandles(bezierJunctionPos, bezierJunctionPos);
          routingPoints.splice(index + 1, 0, h1);
          routingPoints.splice(index + 2, 0, bezierJunctionPos);
          routingPoints.splice(index + 3, 0, h2);
          this.moveBezierControlPair(h1, index + 1, edge);
          edge.removeAll((c) => c instanceof model_1.SRoutingHandle);
          this.rebuildHandles(edge);
        }
        removeBezierSegment(index, edge) {
          const routingPoints = edge.routingPoints;
          routingPoints.splice(index - 1, 3);
          edge.removeAll((c) => c instanceof model_1.SRoutingHandle);
          this.rebuildHandles(edge);
        }
        moveBezierControlPair(newPos, ctrlPointIndex, edge) {
          if (ctrlPointIndex >= 0 && ctrlPointIndex < edge.routingPoints.length) {
            const before = ctrlPointIndex - 1;
            const after = ctrlPointIndex + 1;
            if (before < 0 || after === edge.routingPoints.length) {
              edge.routingPoints[ctrlPointIndex] = newPos;
            } else {
              if (ctrlPointIndex % 3 === 0) {
                this.setBezierMirror(edge, newPos, ctrlPointIndex, false);
              } else if ((ctrlPointIndex + 2) % 3 === 0) {
                this.setBezierMirror(edge, newPos, ctrlPointIndex, true);
              }
            }
          }
        }
        setBezierMirror(edge, newPos, pointIndex, before) {
          edge.routingPoints[pointIndex] = newPos;
          const jct = edge.routingPoints[before ? pointIndex + 1 : pointIndex - 1];
          edge.routingPoints[before ? pointIndex + 2 : pointIndex - 2] = {
            x: jct.x - (newPos.x - jct.x),
            y: jct.y - (newPos.y - jct.y)
          };
        }
      };
      BezierEdgeRouter.KIND = "bezier";
      BezierEdgeRouter.DEFAULT_BEZIER_HANDLE_OFFSET = 25;
      BezierEdgeRouter = BezierEdgeRouter_1 = __decorate([
        (0, inversify_1.injectable)()
      ], BezierEdgeRouter);
      exports.BezierEdgeRouter = BezierEdgeRouter;
      var BezierMouseListener = class extends mouse_tool_1.MouseListener {
        mouseDown(target, event) {
          const result = [];
          if (target instanceof model_1.SRoutingHandle && (target.kind === "bezier-add" || target.kind === "bezier-remove")) {
            if (target.type === "bezier-create-routing-point") {
              result.push(AddRemoveBezierSegmentAction.create("add", target.id));
            } else if (target.type === "bezier-remove-routing-point") {
              result.push(AddRemoveBezierSegmentAction.create("remove", target.id));
            }
          }
          return result;
        }
      };
      exports.BezierMouseListener = BezierMouseListener;
      var AddRemoveBezierSegmentAction;
      (function(AddRemoveBezierSegmentAction2) {
        AddRemoveBezierSegmentAction2.KIND = "addRemoveBezierSegment";
        function create(actionTask, targetId) {
          return {
            kind: AddRemoveBezierSegmentAction2.KIND,
            actionTask,
            targetId
          };
        }
        AddRemoveBezierSegmentAction2.create = create;
      })(AddRemoveBezierSegmentAction = exports.AddRemoveBezierSegmentAction || (exports.AddRemoveBezierSegmentAction = {}));
      var AddRemoveBezierSegmentCommand = class AddRemoveBezierSegmentCommand extends command_1.Command {
        constructor(action, edgeRouterRegistry) {
          super();
          this.action = action;
          this.edgeRouterRegistry = edgeRouterRegistry;
        }
        execute(context) {
          const index = context.root.index;
          const target = index.getById(this.action.targetId);
          if (this.edgeRouterRegistry && target instanceof model_1.SRoutingHandle) {
            const raw = this.edgeRouterRegistry.get(target.parent.routerKind);
            if (raw instanceof BezierEdgeRouter) {
              const router = raw;
              for (const child of context.root.children) {
                if (child.id === target.parent.id) {
                  if (this.action.actionTask === "add") {
                    router.createNewBezierSegment(target.pointIndex, child);
                  } else if (this.action.actionTask === "remove") {
                    router.removeBezierSegment(target.pointIndex, child);
                  }
                  break;
                }
              }
            }
          }
          return context.root;
        }
        undo(context) {
          throw new Error("Method not implemented.");
        }
        redo(context) {
          throw new Error("Method not implemented.");
        }
      };
      AddRemoveBezierSegmentCommand.KIND = AddRemoveBezierSegmentAction.KIND;
      AddRemoveBezierSegmentCommand = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(types_1.TYPES.Action)),
        __param(1, (0, inversify_1.inject)(routing_1.EdgeRouterRegistry)),
        __metadata("design:paramtypes", [Object, routing_1.EdgeRouterRegistry])
      ], AddRemoveBezierSegmentCommand);
      exports.AddRemoveBezierSegmentCommand = AddRemoveBezierSegmentCommand;
    }
  });

  // node_modules/sprotty/lib/features/routing/bezier-anchors.js
  var require_bezier_anchors = __commonJS({
    "node_modules/sprotty/lib/features/routing/bezier-anchors.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.BezierDiamondAnchor = exports.BezierRectangleAnchor = exports.BezierEllipseAnchor = void 0;
      var anchor_1 = require_anchor();
      var inversify_1 = require_inversify();
      var polyline_anchors_1 = require_polyline_anchors();
      var bezier_edge_router_1 = require_bezier_edge_router();
      var BezierEllipseAnchor = class BezierEllipseAnchor extends polyline_anchors_1.EllipseAnchor {
        get kind() {
          return bezier_edge_router_1.BezierEdgeRouter.KIND + ":" + anchor_1.ELLIPTIC_ANCHOR_KIND;
        }
      };
      BezierEllipseAnchor = __decorate([
        (0, inversify_1.injectable)()
      ], BezierEllipseAnchor);
      exports.BezierEllipseAnchor = BezierEllipseAnchor;
      var BezierRectangleAnchor = class BezierRectangleAnchor extends polyline_anchors_1.RectangleAnchor {
        get kind() {
          return bezier_edge_router_1.BezierEdgeRouter.KIND + ":" + anchor_1.RECTANGULAR_ANCHOR_KIND;
        }
      };
      BezierRectangleAnchor = __decorate([
        (0, inversify_1.injectable)()
      ], BezierRectangleAnchor);
      exports.BezierRectangleAnchor = BezierRectangleAnchor;
      var BezierDiamondAnchor = class BezierDiamondAnchor extends polyline_anchors_1.DiamondAnchor {
        get kind() {
          return bezier_edge_router_1.BezierEdgeRouter.KIND + ":" + anchor_1.DIAMOND_ANCHOR_KIND;
        }
      };
      BezierDiamondAnchor = __decorate([
        (0, inversify_1.injectable)()
      ], BezierDiamondAnchor);
      exports.BezierDiamondAnchor = BezierDiamondAnchor;
    }
  });

  // node_modules/sprotty/lib/features/routing/manhattan-edge-router.js
  var require_manhattan_edge_router = __commonJS({
    "node_modules/sprotty/lib/features/routing/manhattan-edge-router.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ManhattanEdgeRouter = void 0;
      var geometry_1 = require_geometry();
      var smodel_utils_1 = require_smodel_utils();
      var abstract_edge_router_1 = require_abstract_edge_router();
      var model_1 = require_model9();
      var ManhattanEdgeRouter = class extends abstract_edge_router_1.AbstractEdgeRouter {
        get kind() {
          return ManhattanEdgeRouter.KIND;
        }
        getOptions(edge) {
          return {
            standardDistance: 20,
            minimalPointDistance: 3,
            selfEdgeOffset: 0.25
          };
        }
        route(edge) {
          if (!edge.source || !edge.target)
            return [];
          const routedCorners = this.createRoutedCorners(edge);
          const sourceRefPoint = routedCorners[0] || (0, smodel_utils_1.translatePoint)(geometry_1.Bounds.center(edge.target.bounds), edge.target.parent, edge.parent);
          const sourceAnchor = this.getTranslatedAnchor(edge.source, sourceRefPoint, edge.parent, edge, edge.sourceAnchorCorrection);
          const targetRefPoint = routedCorners[routedCorners.length - 1] || (0, smodel_utils_1.translatePoint)(geometry_1.Bounds.center(edge.source.bounds), edge.source.parent, edge.parent);
          const targetAnchor = this.getTranslatedAnchor(edge.target, targetRefPoint, edge.parent, edge, edge.targetAnchorCorrection);
          if (!sourceAnchor || !targetAnchor)
            return [];
          const routedPoints = [];
          routedPoints.push(Object.assign({ kind: "source" }, sourceAnchor));
          routedCorners.forEach((corner) => routedPoints.push(corner));
          routedPoints.push(Object.assign({ kind: "target" }, targetAnchor));
          return routedPoints;
        }
        createRoutedCorners(edge) {
          const sourceAnchors = new abstract_edge_router_1.DefaultAnchors(edge.source, edge.parent, "source");
          const targetAnchors = new abstract_edge_router_1.DefaultAnchors(edge.target, edge.parent, "target");
          if (edge.routingPoints.length > 0) {
            const routingPointsCopy = edge.routingPoints.slice();
            this.cleanupRoutingPoints(edge, routingPointsCopy, false, true);
            if (routingPointsCopy.length > 0)
              return routingPointsCopy.map((routingPoint, index) => {
                return Object.assign({ kind: "linear", pointIndex: index }, routingPoint);
              });
          }
          const options = this.getOptions(edge);
          const corners = this.calculateDefaultCorners(edge, sourceAnchors, targetAnchors, options);
          return corners.map((corner) => {
            return Object.assign({ kind: "linear" }, corner);
          });
        }
        createRoutingHandles(edge) {
          const routedPoints = this.route(edge);
          this.commitRoute(edge, routedPoints);
          if (routedPoints.length > 0) {
            this.addHandle(edge, "source", "routing-point", -2);
            for (let i = 0; i < routedPoints.length - 1; ++i)
              this.addHandle(edge, "manhattan-50%", "volatile-routing-point", i - 1);
            this.addHandle(edge, "target", "routing-point", routedPoints.length - 2);
          }
        }
        getInnerHandlePosition(edge, route, handle) {
          const fraction = this.getFraction(handle.kind);
          if (fraction !== void 0) {
            const { start, end } = this.findRouteSegment(edge, route, handle.pointIndex);
            if (start !== void 0 && end !== void 0)
              return geometry_1.Point.linear(start, end, fraction);
          }
          return void 0;
        }
        getFraction(kind) {
          switch (kind) {
            case "manhattan-50%":
              return 0.5;
            default:
              return void 0;
          }
        }
        applyInnerHandleMoves(edge, moves) {
          const route = this.route(edge);
          const routingPoints = edge.routingPoints;
          const minimalPointDistance = this.getOptions(edge).minimalPointDistance;
          moves.forEach((move) => {
            const handle = move.handle;
            const index = handle.pointIndex;
            const correctedX = this.correctX(routingPoints, index, move.toPosition.x, minimalPointDistance);
            const correctedY = this.correctY(routingPoints, index, move.toPosition.y, minimalPointDistance);
            switch (handle.kind) {
              case "manhattan-50%":
                if (index < 0) {
                  if ((0, geometry_1.almostEquals)(route[0].x, route[1].x))
                    this.alignX(routingPoints, 0, correctedX);
                  else
                    this.alignY(routingPoints, 0, correctedY);
                } else if (index < routingPoints.length - 1) {
                  if ((0, geometry_1.almostEquals)(routingPoints[index].x, routingPoints[index + 1].x)) {
                    this.alignX(routingPoints, index, correctedX);
                    this.alignX(routingPoints, index + 1, correctedX);
                  } else {
                    this.alignY(routingPoints, index, correctedY);
                    this.alignY(routingPoints, index + 1, correctedY);
                  }
                } else {
                  if ((0, geometry_1.almostEquals)(route[route.length - 2].x, route[route.length - 1].x))
                    this.alignX(routingPoints, routingPoints.length - 1, correctedX);
                  else
                    this.alignY(routingPoints, routingPoints.length - 1, correctedY);
                }
                break;
            }
          });
        }
        correctX(routingPoints, index, x, minimalPointDistance) {
          if (index > 0 && Math.abs(x - routingPoints[index - 1].x) < minimalPointDistance)
            return routingPoints[index - 1].x;
          else if (index < routingPoints.length - 2 && Math.abs(x - routingPoints[index + 2].x) < minimalPointDistance)
            return routingPoints[index + 2].x;
          else
            return x;
        }
        alignX(routingPoints, index, x) {
          if (index >= 0 && index < routingPoints.length)
            routingPoints[index] = {
              x,
              y: routingPoints[index].y
            };
        }
        correctY(routingPoints, index, y, minimalPointDistance) {
          if (index > 0 && Math.abs(y - routingPoints[index - 1].y) < minimalPointDistance)
            return routingPoints[index - 1].y;
          else if (index < routingPoints.length - 2 && Math.abs(y - routingPoints[index + 2].y) < minimalPointDistance)
            return routingPoints[index + 2].y;
          else
            return y;
        }
        alignY(routingPoints, index, y) {
          if (index >= 0 && index < routingPoints.length)
            routingPoints[index] = {
              x: routingPoints[index].x,
              y
            };
        }
        cleanupRoutingPoints(edge, routingPoints, updateHandles, addRoutingPoints) {
          const sourceAnchors = new abstract_edge_router_1.DefaultAnchors(edge.source, edge.parent, "source");
          const targetAnchors = new abstract_edge_router_1.DefaultAnchors(edge.target, edge.parent, "target");
          if (this.resetRoutingPointsOnReconnect(edge, routingPoints, updateHandles, sourceAnchors, targetAnchors))
            return;
          for (let i = 0; i < routingPoints.length; ++i)
            if (geometry_1.Bounds.includes(sourceAnchors.bounds, routingPoints[i])) {
              routingPoints.splice(0, 1);
              if (updateHandles) {
                this.removeHandle(edge, -1);
              }
            } else {
              break;
            }
          for (let i = routingPoints.length - 1; i >= 0; --i)
            if (geometry_1.Bounds.includes(targetAnchors.bounds, routingPoints[i])) {
              routingPoints.splice(i, 1);
              if (updateHandles) {
                this.removeHandle(edge, i);
              }
            } else {
              break;
            }
          if (routingPoints.length >= 2) {
            const options = this.getOptions(edge);
            for (let i = routingPoints.length - 2; i >= 0; --i) {
              if (geometry_1.Point.manhattanDistance(routingPoints[i], routingPoints[i + 1]) < options.minimalPointDistance) {
                routingPoints.splice(i, 2);
                --i;
                if (updateHandles) {
                  this.removeHandle(edge, i - 1);
                  this.removeHandle(edge, i);
                }
              }
            }
          }
          if (addRoutingPoints) {
            this.addAdditionalCorner(edge, routingPoints, sourceAnchors, targetAnchors, updateHandles);
            this.addAdditionalCorner(edge, routingPoints, targetAnchors, sourceAnchors, updateHandles);
            this.manhattanify(edge, routingPoints);
          }
        }
        removeHandle(edge, pointIndex) {
          const toBeRemoved = [];
          edge.children.forEach((child) => {
            if (child instanceof model_1.SRoutingHandle) {
              if (child.pointIndex > pointIndex)
                --child.pointIndex;
              else if (child.pointIndex === pointIndex)
                toBeRemoved.push(child);
            }
          });
          toBeRemoved.forEach((child) => edge.remove(child));
        }
        addAdditionalCorner(edge, routingPoints, currentAnchors, otherAnchors, updateHandles) {
          if (routingPoints.length === 0)
            return;
          const refPoint = currentAnchors.kind === "source" ? routingPoints[0] : routingPoints[routingPoints.length - 1];
          const index = currentAnchors.kind === "source" ? 0 : routingPoints.length;
          const shiftIndex = index - (currentAnchors.kind === "source" ? 1 : 0);
          let isHorizontal;
          if (routingPoints.length > 1) {
            isHorizontal = index === 0 ? (0, geometry_1.almostEquals)(routingPoints[0].x, routingPoints[1].x) : (0, geometry_1.almostEquals)(routingPoints[routingPoints.length - 1].x, routingPoints[routingPoints.length - 2].x);
          } else {
            const nearestSide = otherAnchors.getNearestSide(refPoint);
            isHorizontal = nearestSide === abstract_edge_router_1.Side.TOP || nearestSide === abstract_edge_router_1.Side.BOTTOM;
          }
          if (isHorizontal) {
            if (refPoint.y < currentAnchors.get(abstract_edge_router_1.Side.TOP).y || refPoint.y > currentAnchors.get(abstract_edge_router_1.Side.BOTTOM).y) {
              const newPoint = { x: currentAnchors.get(abstract_edge_router_1.Side.TOP).x, y: refPoint.y };
              routingPoints.splice(index, 0, newPoint);
              if (updateHandles) {
                edge.children.forEach((child) => {
                  if (child instanceof model_1.SRoutingHandle && child.pointIndex >= shiftIndex)
                    ++child.pointIndex;
                });
                this.addHandle(edge, "manhattan-50%", "volatile-routing-point", shiftIndex);
              }
            }
          } else {
            if (refPoint.x < currentAnchors.get(abstract_edge_router_1.Side.LEFT).x || refPoint.x > currentAnchors.get(abstract_edge_router_1.Side.RIGHT).x) {
              const newPoint = { x: refPoint.x, y: currentAnchors.get(abstract_edge_router_1.Side.LEFT).y };
              routingPoints.splice(index, 0, newPoint);
              if (updateHandles) {
                edge.children.forEach((child) => {
                  if (child instanceof model_1.SRoutingHandle && child.pointIndex >= shiftIndex)
                    ++child.pointIndex;
                });
                this.addHandle(edge, "manhattan-50%", "volatile-routing-point", shiftIndex);
              }
            }
          }
        }
        /**
         * Add artificial routing points to keep all angles rectilinear.
         *
         * This makes edge morphing look a lot smoother, where RP positions are interpolated
         * linearly probably resulting in non-rectilinear angles. We don't add handles for
         * these additional RPs.
         */
        manhattanify(edge, routingPoints) {
          for (let i = 1; i < routingPoints.length; ++i) {
            const isVertical = Math.abs(routingPoints[i - 1].x - routingPoints[i].x) < 1;
            const isHorizontal = Math.abs(routingPoints[i - 1].y - routingPoints[i].y) < 1;
            if (!isVertical && !isHorizontal) {
              routingPoints.splice(i, 0, {
                x: routingPoints[i - 1].x,
                y: routingPoints[i].y
              });
              ++i;
            }
          }
        }
        calculateDefaultCorners(edge, sourceAnchors, targetAnchors, options) {
          const selfEdge = super.calculateDefaultCorners(edge, sourceAnchors, targetAnchors, options);
          if (selfEdge.length > 0)
            return selfEdge;
          const bestAnchors = this.getBestConnectionAnchors(edge, sourceAnchors, targetAnchors, options);
          const sourceSide = bestAnchors.source;
          const targetSide = bestAnchors.target;
          const corners = [];
          const startPoint = sourceAnchors.get(sourceSide);
          let endPoint = targetAnchors.get(targetSide);
          switch (sourceSide) {
            case abstract_edge_router_1.Side.RIGHT:
              switch (targetSide) {
                case abstract_edge_router_1.Side.BOTTOM:
                  corners.push({ x: endPoint.x, y: startPoint.y });
                  break;
                case abstract_edge_router_1.Side.TOP:
                  corners.push({ x: endPoint.x, y: startPoint.y });
                  break;
                case abstract_edge_router_1.Side.RIGHT:
                  corners.push({ x: Math.max(startPoint.x, endPoint.x) + 1.5 * options.standardDistance, y: startPoint.y });
                  corners.push({ x: Math.max(startPoint.x, endPoint.x) + 1.5 * options.standardDistance, y: endPoint.y });
                  break;
                case abstract_edge_router_1.Side.LEFT:
                  if (endPoint.y !== startPoint.y) {
                    corners.push({ x: (startPoint.x + endPoint.x) / 2, y: startPoint.y });
                    corners.push({ x: (startPoint.x + endPoint.x) / 2, y: endPoint.y });
                  }
                  break;
              }
              break;
            case abstract_edge_router_1.Side.LEFT:
              switch (targetSide) {
                case abstract_edge_router_1.Side.BOTTOM:
                  corners.push({ x: endPoint.x, y: startPoint.y });
                  break;
                case abstract_edge_router_1.Side.TOP:
                  corners.push({ x: endPoint.x, y: startPoint.y });
                  break;
                default:
                  endPoint = targetAnchors.get(abstract_edge_router_1.Side.RIGHT);
                  if (endPoint.y !== startPoint.y) {
                    corners.push({ x: (startPoint.x + endPoint.x) / 2, y: startPoint.y });
                    corners.push({ x: (startPoint.x + endPoint.x) / 2, y: endPoint.y });
                  }
                  break;
              }
              break;
            case abstract_edge_router_1.Side.TOP:
              switch (targetSide) {
                case abstract_edge_router_1.Side.RIGHT:
                  if (endPoint.x - startPoint.x > 0) {
                    corners.push({ x: startPoint.x, y: startPoint.y - options.standardDistance });
                    corners.push({ x: endPoint.x + 1.5 * options.standardDistance, y: startPoint.y - options.standardDistance });
                    corners.push({ x: endPoint.x + 1.5 * options.standardDistance, y: endPoint.y });
                  } else {
                    corners.push({ x: startPoint.x, y: endPoint.y });
                  }
                  break;
                case abstract_edge_router_1.Side.LEFT:
                  if (endPoint.x - startPoint.x < 0) {
                    corners.push({ x: startPoint.x, y: startPoint.y - options.standardDistance });
                    corners.push({ x: endPoint.x - 1.5 * options.standardDistance, y: startPoint.y - options.standardDistance });
                    corners.push({ x: endPoint.x - 1.5 * options.standardDistance, y: endPoint.y });
                  } else {
                    corners.push({ x: startPoint.x, y: endPoint.y });
                  }
                  break;
                case abstract_edge_router_1.Side.TOP:
                  corners.push({ x: startPoint.x, y: Math.min(startPoint.y, endPoint.y) - 1.5 * options.standardDistance });
                  corners.push({ x: endPoint.x, y: Math.min(startPoint.y, endPoint.y) - 1.5 * options.standardDistance });
                  break;
                case abstract_edge_router_1.Side.BOTTOM:
                  if (endPoint.x !== startPoint.x) {
                    corners.push({ x: startPoint.x, y: (startPoint.y + endPoint.y) / 2 });
                    corners.push({ x: endPoint.x, y: (startPoint.y + endPoint.y) / 2 });
                  }
                  break;
              }
              break;
            case abstract_edge_router_1.Side.BOTTOM:
              switch (targetSide) {
                case abstract_edge_router_1.Side.RIGHT:
                  if (endPoint.x - startPoint.x > 0) {
                    corners.push({ x: startPoint.x, y: startPoint.y + options.standardDistance });
                    corners.push({ x: endPoint.x + 1.5 * options.standardDistance, y: startPoint.y + options.standardDistance });
                    corners.push({ x: endPoint.x + 1.5 * options.standardDistance, y: endPoint.y });
                  } else {
                    corners.push({ x: startPoint.x, y: endPoint.y });
                  }
                  break;
                case abstract_edge_router_1.Side.LEFT:
                  if (endPoint.x - startPoint.x < 0) {
                    corners.push({ x: startPoint.x, y: startPoint.y + options.standardDistance });
                    corners.push({ x: endPoint.x - 1.5 * options.standardDistance, y: startPoint.y + options.standardDistance });
                    corners.push({ x: endPoint.x - 1.5 * options.standardDistance, y: endPoint.y });
                  } else {
                    corners.push({ x: startPoint.x, y: endPoint.y });
                  }
                  break;
                default:
                  endPoint = targetAnchors.get(abstract_edge_router_1.Side.TOP);
                  if (endPoint.x !== startPoint.x) {
                    corners.push({ x: startPoint.x, y: (startPoint.y + endPoint.y) / 2 });
                    corners.push({ x: endPoint.x, y: (startPoint.y + endPoint.y) / 2 });
                  }
                  break;
              }
              break;
          }
          return corners;
        }
        getBestConnectionAnchors(edge, sourceAnchors, targetAnchors, options) {
          let sourcePoint = sourceAnchors.get(abstract_edge_router_1.Side.RIGHT);
          let targetPoint = targetAnchors.get(abstract_edge_router_1.Side.LEFT);
          if (targetPoint.x - sourcePoint.x > options.standardDistance)
            return { source: abstract_edge_router_1.Side.RIGHT, target: abstract_edge_router_1.Side.LEFT };
          sourcePoint = sourceAnchors.get(abstract_edge_router_1.Side.LEFT);
          targetPoint = targetAnchors.get(abstract_edge_router_1.Side.RIGHT);
          if (sourcePoint.x - targetPoint.x > options.standardDistance)
            return { source: abstract_edge_router_1.Side.LEFT, target: abstract_edge_router_1.Side.RIGHT };
          sourcePoint = sourceAnchors.get(abstract_edge_router_1.Side.TOP);
          targetPoint = targetAnchors.get(abstract_edge_router_1.Side.BOTTOM);
          if (sourcePoint.y - targetPoint.y > options.standardDistance)
            return { source: abstract_edge_router_1.Side.TOP, target: abstract_edge_router_1.Side.BOTTOM };
          sourcePoint = sourceAnchors.get(abstract_edge_router_1.Side.BOTTOM);
          targetPoint = targetAnchors.get(abstract_edge_router_1.Side.TOP);
          if (targetPoint.y - sourcePoint.y > options.standardDistance)
            return { source: abstract_edge_router_1.Side.BOTTOM, target: abstract_edge_router_1.Side.TOP };
          sourcePoint = sourceAnchors.get(abstract_edge_router_1.Side.RIGHT);
          targetPoint = targetAnchors.get(abstract_edge_router_1.Side.TOP);
          if (targetPoint.x - sourcePoint.x > 0.5 * options.standardDistance && targetPoint.y - sourcePoint.y > options.standardDistance)
            return { source: abstract_edge_router_1.Side.RIGHT, target: abstract_edge_router_1.Side.TOP };
          targetPoint = targetAnchors.get(abstract_edge_router_1.Side.BOTTOM);
          if (targetPoint.x - sourcePoint.x > 0.5 * options.standardDistance && sourcePoint.y - targetPoint.y > options.standardDistance)
            return { source: abstract_edge_router_1.Side.RIGHT, target: abstract_edge_router_1.Side.BOTTOM };
          sourcePoint = sourceAnchors.get(abstract_edge_router_1.Side.LEFT);
          targetPoint = targetAnchors.get(abstract_edge_router_1.Side.BOTTOM);
          if (sourcePoint.x - targetPoint.x > 0.5 * options.standardDistance && sourcePoint.y - targetPoint.y > options.standardDistance)
            return { source: abstract_edge_router_1.Side.LEFT, target: abstract_edge_router_1.Side.BOTTOM };
          targetPoint = targetAnchors.get(abstract_edge_router_1.Side.TOP);
          if (sourcePoint.x - targetPoint.x > 0.5 * options.standardDistance && targetPoint.y - sourcePoint.y > options.standardDistance)
            return { source: abstract_edge_router_1.Side.LEFT, target: abstract_edge_router_1.Side.TOP };
          sourcePoint = sourceAnchors.get(abstract_edge_router_1.Side.TOP);
          targetPoint = targetAnchors.get(abstract_edge_router_1.Side.RIGHT);
          if (sourcePoint.y - targetPoint.y > 0.5 * options.standardDistance && sourcePoint.x - targetPoint.x > options.standardDistance)
            return { source: abstract_edge_router_1.Side.TOP, target: abstract_edge_router_1.Side.RIGHT };
          targetPoint = targetAnchors.get(abstract_edge_router_1.Side.LEFT);
          if (sourcePoint.y - targetPoint.y > 0.5 * options.standardDistance && targetPoint.x - sourcePoint.x > options.standardDistance)
            return { source: abstract_edge_router_1.Side.TOP, target: abstract_edge_router_1.Side.LEFT };
          sourcePoint = sourceAnchors.get(abstract_edge_router_1.Side.BOTTOM);
          targetPoint = targetAnchors.get(abstract_edge_router_1.Side.RIGHT);
          if (targetPoint.y - sourcePoint.y > 0.5 * options.standardDistance && sourcePoint.x - targetPoint.x > options.standardDistance)
            return { source: abstract_edge_router_1.Side.BOTTOM, target: abstract_edge_router_1.Side.RIGHT };
          targetPoint = targetAnchors.get(abstract_edge_router_1.Side.LEFT);
          if (targetPoint.y - sourcePoint.y > 0.5 * options.standardDistance && targetPoint.x - sourcePoint.x > options.standardDistance)
            return { source: abstract_edge_router_1.Side.BOTTOM, target: abstract_edge_router_1.Side.LEFT };
          sourcePoint = sourceAnchors.get(abstract_edge_router_1.Side.TOP);
          targetPoint = targetAnchors.get(abstract_edge_router_1.Side.TOP);
          if (!geometry_1.Bounds.includes(targetAnchors.bounds, sourcePoint) && !geometry_1.Bounds.includes(sourceAnchors.bounds, targetPoint)) {
            if (sourcePoint.y - targetPoint.y < 0) {
              if (Math.abs(sourcePoint.x - targetPoint.x) > (sourceAnchors.bounds.width + options.standardDistance) / 2)
                return { source: abstract_edge_router_1.Side.TOP, target: abstract_edge_router_1.Side.TOP };
            } else {
              if (Math.abs(sourcePoint.x - targetPoint.x) > targetAnchors.bounds.width / 2)
                return { source: abstract_edge_router_1.Side.TOP, target: abstract_edge_router_1.Side.TOP };
            }
          }
          sourcePoint = sourceAnchors.get(abstract_edge_router_1.Side.RIGHT);
          targetPoint = targetAnchors.get(abstract_edge_router_1.Side.RIGHT);
          if (!geometry_1.Bounds.includes(targetAnchors.bounds, sourcePoint) && !geometry_1.Bounds.includes(sourceAnchors.bounds, targetPoint)) {
            if (sourcePoint.x - targetPoint.x > 0) {
              if (Math.abs(sourcePoint.y - targetPoint.y) > (sourceAnchors.bounds.height + options.standardDistance) / 2)
                return { source: abstract_edge_router_1.Side.RIGHT, target: abstract_edge_router_1.Side.RIGHT };
            } else if (Math.abs(sourcePoint.y - targetPoint.y) > targetAnchors.bounds.height / 2)
              return { source: abstract_edge_router_1.Side.RIGHT, target: abstract_edge_router_1.Side.RIGHT };
          }
          sourcePoint = sourceAnchors.get(abstract_edge_router_1.Side.TOP);
          targetPoint = targetAnchors.get(abstract_edge_router_1.Side.RIGHT);
          if (!geometry_1.Bounds.includes(targetAnchors.bounds, sourcePoint) && !geometry_1.Bounds.includes(sourceAnchors.bounds, targetPoint))
            return { source: abstract_edge_router_1.Side.TOP, target: abstract_edge_router_1.Side.RIGHT };
          targetPoint = targetAnchors.get(abstract_edge_router_1.Side.LEFT);
          if (!geometry_1.Bounds.includes(targetAnchors.bounds, sourcePoint) && !geometry_1.Bounds.includes(sourceAnchors.bounds, targetPoint))
            return { source: abstract_edge_router_1.Side.TOP, target: abstract_edge_router_1.Side.LEFT };
          sourcePoint = sourceAnchors.get(abstract_edge_router_1.Side.BOTTOM);
          targetPoint = targetAnchors.get(abstract_edge_router_1.Side.RIGHT);
          if (!geometry_1.Bounds.includes(targetAnchors.bounds, sourcePoint) && !geometry_1.Bounds.includes(sourceAnchors.bounds, targetPoint))
            return { source: abstract_edge_router_1.Side.BOTTOM, target: abstract_edge_router_1.Side.RIGHT };
          targetPoint = targetAnchors.get(abstract_edge_router_1.Side.LEFT);
          if (!geometry_1.Bounds.includes(targetAnchors.bounds, sourcePoint) && !geometry_1.Bounds.includes(sourceAnchors.bounds, targetPoint))
            return { source: abstract_edge_router_1.Side.BOTTOM, target: abstract_edge_router_1.Side.LEFT };
          return { source: abstract_edge_router_1.Side.RIGHT, target: abstract_edge_router_1.Side.BOTTOM };
        }
      };
      exports.ManhattanEdgeRouter = ManhattanEdgeRouter;
      ManhattanEdgeRouter.KIND = "manhattan";
    }
  });

  // node_modules/sprotty/lib/features/routing/manhattan-anchors.js
  var require_manhattan_anchors = __commonJS({
    "node_modules/sprotty/lib/features/routing/manhattan-anchors.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var ManhattanRectangularAnchor_1;
      var ManhattanDiamondAnchor_1;
      var ManhattanEllipticAnchor_1;
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ManhattanEllipticAnchor = exports.ManhattanDiamondAnchor = exports.ManhattanRectangularAnchor = void 0;
      var geometry_1 = require_geometry();
      var geometry_2 = require_geometry2();
      var anchor_1 = require_anchor();
      var manhattan_edge_router_1 = require_manhattan_edge_router();
      var inversify_1 = require_inversify();
      var ManhattanRectangularAnchor = ManhattanRectangularAnchor_1 = class ManhattanRectangularAnchor {
        get kind() {
          return ManhattanRectangularAnchor_1.KIND;
        }
        getAnchor(connectable, refPoint, offset) {
          const b = connectable.bounds;
          if (b.width <= 0 || b.height <= 0) {
            return b;
          }
          const bounds = {
            x: b.x - offset,
            y: b.y - offset,
            width: b.width + 2 * offset,
            height: b.height + 2 * offset
          };
          if (refPoint.x >= bounds.x && bounds.x + bounds.width >= refPoint.x) {
            if (refPoint.y < bounds.y + 0.5 * bounds.height)
              return { x: refPoint.x, y: bounds.y };
            else
              return { x: refPoint.x, y: bounds.y + bounds.height };
          }
          if (refPoint.y >= bounds.y && bounds.y + bounds.height >= refPoint.y) {
            if (refPoint.x < bounds.x + 0.5 * bounds.width)
              return { x: bounds.x, y: refPoint.y };
            else
              return { x: bounds.x + bounds.width, y: refPoint.y };
          }
          return geometry_1.Bounds.center(bounds);
        }
      };
      ManhattanRectangularAnchor.KIND = manhattan_edge_router_1.ManhattanEdgeRouter.KIND + ":" + anchor_1.RECTANGULAR_ANCHOR_KIND;
      ManhattanRectangularAnchor = ManhattanRectangularAnchor_1 = __decorate([
        (0, inversify_1.injectable)()
      ], ManhattanRectangularAnchor);
      exports.ManhattanRectangularAnchor = ManhattanRectangularAnchor;
      var ManhattanDiamondAnchor = ManhattanDiamondAnchor_1 = class ManhattanDiamondAnchor {
        get kind() {
          return ManhattanDiamondAnchor_1.KIND;
        }
        getAnchor(connectable, refPoint, offset = 0) {
          const b = connectable.bounds;
          if (b.width <= 0 || b.height <= 0) {
            return b;
          }
          const bounds = {
            x: b.x - offset,
            y: b.y - offset,
            width: b.width + 2 * offset,
            height: b.height + 2 * offset
          };
          const c = geometry_1.Bounds.center(bounds);
          let outline = void 0;
          let refLine = void 0;
          if (refPoint.x >= bounds.x && refPoint.x <= bounds.x + bounds.width) {
            if (bounds.x + 0.5 * bounds.width >= refPoint.x) {
              refLine = new geometry_2.PointToPointLine(refPoint, { x: refPoint.x, y: c.y });
              if (refPoint.y < c.y)
                outline = new geometry_2.PointToPointLine({ x: bounds.x, y: c.y }, { x: c.x, y: bounds.y });
              else
                outline = new geometry_2.PointToPointLine({ x: bounds.x, y: c.y }, { x: c.x, y: bounds.y + bounds.height });
            } else {
              refLine = new geometry_2.PointToPointLine(refPoint, { x: refPoint.x, y: c.y });
              if (refPoint.y < c.y)
                outline = new geometry_2.PointToPointLine({ x: bounds.x + bounds.width, y: c.y }, { x: c.x, y: bounds.y });
              else
                outline = new geometry_2.PointToPointLine({ x: bounds.x + bounds.width, y: c.y }, { x: c.x, y: bounds.y + bounds.height });
            }
          } else if (refPoint.y >= bounds.y && refPoint.y <= bounds.y + bounds.height) {
            if (bounds.y + 0.5 * bounds.height >= refPoint.y) {
              refLine = new geometry_2.PointToPointLine(refPoint, { x: c.x, y: refPoint.y });
              if (refPoint.x < c.x)
                outline = new geometry_2.PointToPointLine({ x: bounds.x, y: c.y }, { x: c.x, y: bounds.y });
              else
                outline = new geometry_2.PointToPointLine({ x: bounds.x + bounds.width, y: c.y }, { x: c.x, y: bounds.y });
            } else {
              refLine = new geometry_2.PointToPointLine(refPoint, { x: c.x, y: refPoint.y });
              if (refPoint.x < c.x)
                outline = new geometry_2.PointToPointLine({ x: bounds.x, y: c.y }, { x: c.x, y: bounds.y + bounds.height });
              else
                outline = new geometry_2.PointToPointLine({ x: bounds.x + bounds.width, y: c.y }, { x: c.x, y: bounds.y + bounds.height });
            }
          }
          if (!!refLine && !!outline)
            return (0, geometry_2.intersection)(outline, refLine);
          else
            return c;
        }
      };
      ManhattanDiamondAnchor.KIND = manhattan_edge_router_1.ManhattanEdgeRouter.KIND + ":" + anchor_1.DIAMOND_ANCHOR_KIND;
      ManhattanDiamondAnchor = ManhattanDiamondAnchor_1 = __decorate([
        (0, inversify_1.injectable)()
      ], ManhattanDiamondAnchor);
      exports.ManhattanDiamondAnchor = ManhattanDiamondAnchor;
      var ManhattanEllipticAnchor = ManhattanEllipticAnchor_1 = class ManhattanEllipticAnchor {
        get kind() {
          return ManhattanEllipticAnchor_1.KIND;
        }
        getAnchor(connectable, refPoint, offset = 0) {
          const b = connectable.bounds;
          if (b.width <= 0 || b.height <= 0) {
            return b;
          }
          const bounds = {
            x: b.x - offset,
            y: b.y - offset,
            width: b.width + 2 * offset,
            height: b.height + 2 * offset
          };
          const c = geometry_1.Bounds.center(bounds);
          const refRelative = geometry_1.Point.subtract(refPoint, c);
          let x = c.x;
          let y = c.y;
          if (refPoint.x >= bounds.x && bounds.x + bounds.width >= refPoint.x) {
            x += refRelative.x;
            const dy = 0.5 * bounds.height * Math.sqrt(1 - refRelative.x * refRelative.x / (0.25 * bounds.width * bounds.width));
            if (refRelative.y < 0)
              y -= dy;
            else
              y += dy;
          } else if (refPoint.y >= bounds.y && bounds.y + bounds.height >= refPoint.y) {
            y += refRelative.y;
            const dx = 0.5 * bounds.width * Math.sqrt(1 - refRelative.y * refRelative.y / (0.25 * bounds.height * bounds.height));
            if (refRelative.x < 0)
              x -= dx;
            else
              x += dx;
          }
          return { x, y };
        }
      };
      ManhattanEllipticAnchor.KIND = manhattan_edge_router_1.ManhattanEdgeRouter.KIND + ":" + anchor_1.ELLIPTIC_ANCHOR_KIND;
      ManhattanEllipticAnchor = ManhattanEllipticAnchor_1 = __decorate([
        (0, inversify_1.injectable)()
      ], ManhattanEllipticAnchor);
      exports.ManhattanEllipticAnchor = ManhattanEllipticAnchor;
    }
  });

  // node_modules/sprotty/lib/features/routing/views.js
  var require_views5 = __commonJS({
    "node_modules/sprotty/lib/features/routing/views.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.RoutableView = void 0;
      var inversify_1 = require_inversify();
      var model_1 = require_model9();
      var RoutableView = class RoutableView {
        /**
         * Check whether the given model element is in the current viewport. Use this method
         * in your `render` implementation to skip rendering in case the element is not visible.
         * This can greatly enhance performance for large models.
         */
        isVisible(model, route, context) {
          if (context.targetKind === "hidden") {
            return true;
          }
          if (route.length === 0) {
            return true;
          }
          const ab = (0, model_1.getAbsoluteRouteBounds)(model, route);
          const canvasBounds = model.root.canvasBounds;
          return ab.x <= canvasBounds.width && ab.x + ab.width >= 0 && ab.y <= canvasBounds.height && ab.y + ab.height >= 0;
        }
      };
      RoutableView = __decorate([
        (0, inversify_1.injectable)()
      ], RoutableView);
      exports.RoutableView = RoutableView;
    }
  });

  // node_modules/sprotty/lib/base/commands/request-command.js
  var require_request_command = __commonJS({
    "node_modules/sprotty/lib/base/commands/request-command.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ModelRequestCommand = void 0;
      var inversify_1 = require_inversify();
      var types_1 = require_types();
      var command_1 = require_command();
      var ModelRequestCommand = class ModelRequestCommand extends command_1.SystemCommand {
        execute(context) {
          const result = this.retrieveResult(context);
          this.actionDispatcher.dispatch(result);
          return { model: context.root, modelChanged: false };
        }
        undo(context) {
          return { model: context.root, modelChanged: false };
        }
        redo(context) {
          return { model: context.root, modelChanged: false };
        }
      };
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.IActionDispatcher),
        __metadata("design:type", Object)
      ], ModelRequestCommand.prototype, "actionDispatcher", void 0);
      ModelRequestCommand = __decorate([
        (0, inversify_1.injectable)()
      ], ModelRequestCommand);
      exports.ModelRequestCommand = ModelRequestCommand;
    }
  });

  // node_modules/sprotty/lib/features/select/select.js
  var require_select = __commonJS({
    "node_modules/sprotty/lib/features/select/select.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      var __param = exports && exports.__param || function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SelectKeyboardListener = exports.GetSelectionCommand = exports.SelectMouseListener = exports.SelectAllCommand = exports.SelectCommand = exports.SelectionResult = exports.GetSelectionAction = exports.SelectAllAction = exports.SelectAction = void 0;
      var inversify_1 = require_inversify();
      var actions_1 = require_actions();
      var command_1 = require_command();
      var request_command_1 = require_request_command();
      var smodel_1 = require_smodel();
      var smodel_utils_1 = require_smodel_utils();
      var types_1 = require_types();
      var key_tool_1 = require_key_tool();
      var mouse_tool_1 = require_mouse_tool();
      var vnode_utils_1 = require_vnode_utils();
      var browser_1 = require_browser();
      var iterable_1 = require_iterable();
      var keyboard_1 = require_keyboard();
      var button_handler_1 = require_button_handler();
      var model_1 = require_model4();
      var edit_routing_1 = require_edit_routing();
      var model_2 = require_model9();
      var model_3 = require_model9();
      var model_4 = require_model6();
      var SelectAction = class {
        constructor(selectedElementsIDs = [], deselectedElementsIDs = []) {
          this.selectedElementsIDs = selectedElementsIDs;
          this.deselectedElementsIDs = deselectedElementsIDs;
          this.kind = SelectAction.KIND;
        }
      };
      exports.SelectAction = SelectAction;
      SelectAction.KIND = "elementSelected";
      var SelectAllAction = class {
        /**
         * If `select` is true, all elements are selected, otherwise they are deselected.
         */
        constructor(select = true) {
          this.select = select;
          this.kind = SelectAllAction.KIND;
        }
      };
      exports.SelectAllAction = SelectAllAction;
      SelectAllAction.KIND = "allSelected";
      var GetSelectionAction;
      (function(GetSelectionAction2) {
        GetSelectionAction2.KIND = "getSelection";
        function create() {
          return {
            kind: GetSelectionAction2.KIND,
            requestId: (0, actions_1.generateRequestId)()
          };
        }
        GetSelectionAction2.create = create;
      })(GetSelectionAction = exports.GetSelectionAction || (exports.GetSelectionAction = {}));
      var SelectionResult;
      (function(SelectionResult2) {
        SelectionResult2.KIND = "selectionResult";
        function create(selectedElementsIDs, requestId) {
          return {
            kind: SelectionResult2.KIND,
            selectedElementsIDs,
            responseId: requestId
          };
        }
        SelectionResult2.create = create;
      })(SelectionResult = exports.SelectionResult || (exports.SelectionResult = {}));
      var SelectCommand = class SelectCommand extends command_1.Command {
        constructor(action) {
          super();
          this.action = action;
          this.selected = [];
          this.deselected = [];
        }
        execute(context) {
          const model = context.root;
          this.action.selectedElementsIDs.forEach((id) => {
            const element = model.index.getById(id);
            if (element instanceof smodel_1.SChildElement && (0, model_4.isSelectable)(element)) {
              this.selected.push(element);
            }
          });
          this.action.deselectedElementsIDs.forEach((id) => {
            const element = model.index.getById(id);
            if (element instanceof smodel_1.SChildElement && (0, model_4.isSelectable)(element)) {
              this.deselected.push(element);
            }
          });
          return this.redo(context);
        }
        undo(context) {
          for (const element of this.selected) {
            element.selected = false;
          }
          for (const element of this.deselected) {
            element.selected = true;
          }
          return context.root;
        }
        redo(context) {
          for (const element of this.deselected) {
            element.selected = false;
          }
          for (const element of this.selected) {
            element.selected = true;
          }
          return context.root;
        }
      };
      SelectCommand.KIND = actions_1.SelectAction.KIND;
      SelectCommand = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(types_1.TYPES.Action)),
        __metadata("design:paramtypes", [Object])
      ], SelectCommand);
      exports.SelectCommand = SelectCommand;
      var SelectAllCommand = class SelectAllCommand extends command_1.Command {
        constructor(action) {
          super();
          this.action = action;
          this.previousSelection = {};
        }
        execute(context) {
          this.selectAll(context.root, this.action.select);
          return context.root;
        }
        selectAll(element, newState) {
          if ((0, model_4.isSelectable)(element)) {
            this.previousSelection[element.id] = element.selected;
            element.selected = newState;
          }
          for (const child of element.children) {
            this.selectAll(child, newState);
          }
        }
        undo(context) {
          const index = context.root.index;
          Object.keys(this.previousSelection).forEach((id) => {
            const element = index.getById(id);
            if (element !== void 0 && (0, model_4.isSelectable)(element))
              element.selected = this.previousSelection[id];
          });
          return context.root;
        }
        redo(context) {
          this.selectAll(context.root, this.action.select);
          return context.root;
        }
      };
      SelectAllCommand.KIND = actions_1.SelectAllAction.KIND;
      SelectAllCommand = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(types_1.TYPES.Action)),
        __metadata("design:paramtypes", [Object])
      ], SelectAllCommand);
      exports.SelectAllCommand = SelectAllCommand;
      var SelectMouseListener = class extends mouse_tool_1.MouseListener {
        constructor() {
          super(...arguments);
          this.wasSelected = false;
          this.hasDragged = false;
        }
        mouseDown(target, event) {
          if (event.button !== 0) {
            return [];
          }
          const buttonHandled = this.handleButton(target, event);
          if (buttonHandled) {
            return buttonHandled;
          }
          const selectableTarget = (0, smodel_utils_1.findParentByFeature)(target, model_4.isSelectable);
          if (selectableTarget !== void 0 || target instanceof smodel_1.SModelRoot) {
            this.hasDragged = false;
            let deselectedElements = [];
            if (!(0, browser_1.isCtrlOrCmd)(event)) {
              deselectedElements = (0, iterable_1.toArray)(target.root.index.all().filter((element) => (0, model_4.isSelectable)(element) && element.selected && !(selectableTarget instanceof model_2.SRoutingHandle && element === selectableTarget.parent)));
            }
            if (selectableTarget !== void 0) {
              if (!selectableTarget.selected) {
                this.wasSelected = false;
                return this.handleSelectTarget(selectableTarget, deselectedElements, event);
              } else if ((0, browser_1.isCtrlOrCmd)(event)) {
                this.wasSelected = false;
                return this.handleDeselectTarget(selectableTarget, event);
              } else {
                this.wasSelected = true;
              }
            } else {
              return this.handleDeselectAll(deselectedElements, event);
            }
          }
          return [];
        }
        handleButton(target, event) {
          if (this.buttonHandlerRegistry !== void 0 && target instanceof model_1.SButton && target.enabled) {
            const buttonHandler = this.buttonHandlerRegistry.get(target.type);
            if (buttonHandler !== void 0) {
              return buttonHandler.buttonPressed(target);
            }
          }
          return void 0;
        }
        handleSelectTarget(selectableTarget, deselectedElements, event) {
          const result = [];
          result.push(new SelectAction([selectableTarget.id], deselectedElements.map((e) => e.id)));
          result.push(actions_1.BringToFrontAction.create([selectableTarget.id]));
          const routableDeselect = deselectedElements.filter((e) => e instanceof model_3.SRoutableElement).map((e) => e.id);
          if (selectableTarget instanceof model_3.SRoutableElement) {
            result.push(edit_routing_1.SwitchEditModeAction.create({ elementsToActivate: [selectableTarget.id], elementsToDeactivate: routableDeselect }));
          } else if (routableDeselect.length > 0) {
            result.push(edit_routing_1.SwitchEditModeAction.create({ elementsToDeactivate: routableDeselect }));
          }
          return result;
        }
        handleDeselectTarget(selectableTarget, event) {
          const result = [];
          result.push(new SelectAction([], [selectableTarget.id]));
          if (selectableTarget instanceof model_3.SRoutableElement) {
            result.push(edit_routing_1.SwitchEditModeAction.create({ elementsToDeactivate: [selectableTarget.id] }));
          }
          return result;
        }
        handleDeselectAll(deselectedElements, event) {
          const result = [];
          result.push(new SelectAction([], deselectedElements.map((e) => e.id)));
          const routableDeselect = deselectedElements.filter((e) => e instanceof model_3.SRoutableElement).map((e) => e.id);
          if (routableDeselect.length > 0) {
            result.push(edit_routing_1.SwitchEditModeAction.create({ elementsToDeactivate: routableDeselect }));
          }
          return result;
        }
        mouseMove(target, event) {
          this.hasDragged = true;
          return [];
        }
        mouseUp(target, event) {
          if (event.button === 0) {
            if (!this.hasDragged) {
              const selectableTarget = (0, smodel_utils_1.findParentByFeature)(target, model_4.isSelectable);
              if (selectableTarget !== void 0 && this.wasSelected) {
                return [new SelectAction([selectableTarget.id], [])];
              }
            }
          }
          this.hasDragged = false;
          return [];
        }
        decorate(vnode, element) {
          const selectableTarget = (0, smodel_utils_1.findParentByFeature)(element, model_4.isSelectable);
          if (selectableTarget !== void 0) {
            (0, vnode_utils_1.setClass)(vnode, "selected", selectableTarget.selected);
          }
          return vnode;
        }
      };
      __decorate([
        (0, inversify_1.inject)(button_handler_1.ButtonHandlerRegistry),
        (0, inversify_1.optional)(),
        __metadata("design:type", button_handler_1.ButtonHandlerRegistry)
      ], SelectMouseListener.prototype, "buttonHandlerRegistry", void 0);
      exports.SelectMouseListener = SelectMouseListener;
      var GetSelectionCommand = class GetSelectionCommand extends request_command_1.ModelRequestCommand {
        constructor(action) {
          super();
          this.action = action;
          this.previousSelection = {};
        }
        retrieveResult(context) {
          const selection = context.root.index.all().filter((e) => (0, model_4.isSelectable)(e) && e.selected).map((e) => e.id);
          return SelectionResult.create((0, iterable_1.toArray)(selection), this.action.requestId);
        }
      };
      GetSelectionCommand.KIND = GetSelectionAction.KIND;
      GetSelectionCommand = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(types_1.TYPES.Action)),
        __metadata("design:paramtypes", [Object])
      ], GetSelectionCommand);
      exports.GetSelectionCommand = GetSelectionCommand;
      var SelectKeyboardListener = class extends key_tool_1.KeyListener {
        keyDown(element, event) {
          if ((0, keyboard_1.matchesKeystroke)(event, "KeyA", "ctrlCmd")) {
            return [new SelectAllAction()];
          }
          return [];
        }
      };
      exports.SelectKeyboardListener = SelectKeyboardListener;
    }
  });

  // node_modules/sprotty/lib/features/undo-redo/undo-redo.js
  var require_undo_redo = __commonJS({
    "node_modules/sprotty/lib/features/undo-redo/undo-redo.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.UndoRedoKeyListener = exports.RedoAction = exports.UndoAction = void 0;
      var keyboard_1 = require_keyboard();
      var key_tool_1 = require_key_tool();
      var browser_1 = require_browser();
      var UndoAction;
      (function(UndoAction2) {
        UndoAction2.KIND = "undo";
        function create() {
          return {
            kind: UndoAction2.KIND
          };
        }
        UndoAction2.create = create;
      })(UndoAction = exports.UndoAction || (exports.UndoAction = {}));
      var RedoAction;
      (function(RedoAction2) {
        RedoAction2.KIND = "redo";
        function create() {
          return {
            kind: RedoAction2.KIND
          };
        }
        RedoAction2.create = create;
      })(RedoAction = exports.RedoAction || (exports.RedoAction = {}));
      var UndoRedoKeyListener = class extends key_tool_1.KeyListener {
        keyDown(element, event) {
          if ((0, keyboard_1.matchesKeystroke)(event, "KeyZ", "ctrlCmd"))
            return [UndoAction.create()];
          if ((0, keyboard_1.matchesKeystroke)(event, "KeyZ", "ctrlCmd", "shift") || !(0, browser_1.isMac)() && (0, keyboard_1.matchesKeystroke)(event, "KeyY", "ctrlCmd"))
            return [RedoAction.create()];
          return [];
        }
      };
      exports.UndoRedoKeyListener = UndoRedoKeyListener;
    }
  });

  // node_modules/sprotty/lib/features/update/model-matching.js
  var require_model_matching = __commonJS({
    "node_modules/sprotty/lib/features/update/model-matching.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.applyMatches = exports.ModelMatcher = exports.forEachMatch = void 0;
      var smodel_1 = require_smodel();
      var sprotty_protocol_1 = require_lib();
      function forEachMatch(matchResult, callback) {
        Object.keys(matchResult).forEach((id) => callback(id, matchResult[id]));
      }
      exports.forEachMatch = forEachMatch;
      var ModelMatcher = class {
        match(left, right) {
          const result = {};
          this.matchLeft(left, result);
          this.matchRight(right, result);
          return result;
        }
        matchLeft(element, result, parentId) {
          let match = result[element.id];
          if (match !== void 0) {
            match.left = element;
            match.leftParentId = parentId;
          } else {
            match = {
              left: element,
              leftParentId: parentId
            };
            result[element.id] = match;
          }
          if ((0, smodel_1.isParent)(element)) {
            for (const child of element.children) {
              this.matchLeft(child, result, element.id);
            }
          }
        }
        matchRight(element, result, parentId) {
          let match = result[element.id];
          if (match !== void 0) {
            match.right = element;
            match.rightParentId = parentId;
          } else {
            match = {
              right: element,
              rightParentId: parentId
            };
            result[element.id] = match;
          }
          if ((0, smodel_1.isParent)(element)) {
            for (const child of element.children) {
              this.matchRight(child, result, element.id);
            }
          }
        }
      };
      exports.ModelMatcher = ModelMatcher;
      function applyMatches(root, matches, index) {
        if (root instanceof smodel_1.SModelRoot) {
          index = root.index;
        } else if (index === void 0) {
          index = new sprotty_protocol_1.SModelIndex();
          index.add(root);
        }
        for (const match of matches) {
          let newElementInserted = false;
          if (match.left !== void 0 && match.leftParentId !== void 0) {
            const parent = index.getById(match.leftParentId);
            if (parent !== void 0 && parent.children !== void 0) {
              const i = parent.children.indexOf(match.left);
              if (i >= 0) {
                if (match.right !== void 0 && match.leftParentId === match.rightParentId) {
                  parent.children.splice(i, 1, match.right);
                  newElementInserted = true;
                } else {
                  parent.children.splice(i, 1);
                }
              }
              index.remove(match.left);
            }
          }
          if (!newElementInserted && match.right !== void 0 && match.rightParentId !== void 0) {
            const parent = index.getById(match.rightParentId);
            if (parent !== void 0) {
              if (parent.children === void 0)
                parent.children = [];
              parent.children.push(match.right);
            }
          }
        }
      }
      exports.applyMatches = applyMatches;
    }
  });

  // node_modules/sprotty/lib/features/bounds/resize.js
  var require_resize = __commonJS({
    "node_modules/sprotty/lib/features/bounds/resize.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ResizeAnimation = void 0;
      var animation_1 = require_animation();
      var ResizeAnimation = class extends animation_1.Animation {
        constructor(model, elementResizes, context, reverse = false) {
          super(context);
          this.model = model;
          this.elementResizes = elementResizes;
          this.reverse = reverse;
        }
        tween(t) {
          this.elementResizes.forEach((elementResize) => {
            const element = elementResize.element;
            const newDimension = this.reverse ? {
              width: (1 - t) * elementResize.toDimension.width + t * elementResize.fromDimension.width,
              height: (1 - t) * elementResize.toDimension.height + t * elementResize.fromDimension.height
            } : {
              width: (1 - t) * elementResize.fromDimension.width + t * elementResize.toDimension.width,
              height: (1 - t) * elementResize.fromDimension.height + t * elementResize.toDimension.height
            };
            element.bounds = {
              x: element.bounds.x,
              y: element.bounds.y,
              width: newDimension.width,
              height: newDimension.height
            };
          });
          return this.model;
        }
      };
      exports.ResizeAnimation = ResizeAnimation;
    }
  });

  // node_modules/sprotty/lib/features/update/update-model.js
  var require_update_model = __commonJS({
    "node_modules/sprotty/lib/features/update/update-model.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      var __param = exports && exports.__param || function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.UpdateModelCommand = exports.UpdateModelAction = void 0;
      var inversify_1 = require_inversify();
      var actions_1 = require_actions();
      var geometry_1 = require_geometry();
      var animation_1 = require_animation();
      var command_1 = require_command();
      var fade_1 = require_fade();
      var smodel_1 = require_smodel();
      var move_1 = require_move();
      var model_1 = require_model3();
      var model_2 = require_model8();
      var model_3 = require_model2();
      var viewport_root_1 = require_viewport_root();
      var model_4 = require_model6();
      var model_matching_1 = require_model_matching();
      var resize_1 = require_resize();
      var types_1 = require_types();
      var model_5 = require_model12();
      var routing_1 = require_routing();
      var model_6 = require_model9();
      var smodel_utils_1 = require_smodel_utils();
      var UpdateModelAction = class {
        constructor(input, animate = true, cause) {
          this.animate = animate;
          this.cause = cause;
          this.kind = UpdateModelAction.KIND;
          if (input.id !== void 0)
            this.newRoot = input;
          else
            this.matches = input;
        }
      };
      exports.UpdateModelAction = UpdateModelAction;
      UpdateModelAction.KIND = "updateModel";
      var UpdateModelCommand = class UpdateModelCommand extends command_1.Command {
        constructor(action) {
          super();
          this.action = action;
        }
        execute(context) {
          let newRoot;
          if (this.action.newRoot !== void 0) {
            newRoot = context.modelFactory.createRoot(this.action.newRoot);
          } else {
            newRoot = context.modelFactory.createRoot(context.root);
            if (this.action.matches !== void 0)
              this.applyMatches(newRoot, this.action.matches, context);
          }
          this.oldRoot = context.root;
          this.newRoot = newRoot;
          return this.performUpdate(this.oldRoot, this.newRoot, context);
        }
        performUpdate(oldRoot, newRoot, context) {
          if ((this.action.animate === void 0 || this.action.animate) && oldRoot.id === newRoot.id) {
            let matchResult;
            if (this.action.matches === void 0) {
              const matcher = new model_matching_1.ModelMatcher();
              matchResult = matcher.match(oldRoot, newRoot);
            } else {
              matchResult = this.convertToMatchResult(this.action.matches, oldRoot, newRoot);
            }
            const animationOrRoot = this.computeAnimation(newRoot, matchResult, context);
            if (animationOrRoot instanceof animation_1.Animation)
              return animationOrRoot.start();
            else
              return animationOrRoot;
          } else {
            if (oldRoot.type === newRoot.type && geometry_1.Dimension.isValid(oldRoot.canvasBounds))
              newRoot.canvasBounds = oldRoot.canvasBounds;
            if ((0, model_5.isViewport)(oldRoot) && (0, model_5.isViewport)(newRoot)) {
              newRoot.zoom = oldRoot.zoom;
              newRoot.scroll = oldRoot.scroll;
            }
            return newRoot;
          }
        }
        applyMatches(root, matches, context) {
          const index = root.index;
          for (const match of matches) {
            if (match.left !== void 0) {
              const element = index.getById(match.left.id);
              if (element instanceof smodel_1.SChildElement)
                element.parent.remove(element);
            }
          }
          for (const match of matches) {
            if (match.right !== void 0) {
              const element = context.modelFactory.createElement(match.right);
              let parent;
              if (match.rightParentId !== void 0)
                parent = index.getById(match.rightParentId);
              if (parent instanceof smodel_1.SParentElement)
                parent.add(element);
              else
                root.add(element);
            }
          }
        }
        convertToMatchResult(matches, leftRoot, rightRoot) {
          const result = {};
          for (const match of matches) {
            const converted = {};
            let id = void 0;
            if (match.left !== void 0) {
              id = match.left.id;
              converted.left = leftRoot.index.getById(id);
              converted.leftParentId = match.leftParentId;
            }
            if (match.right !== void 0) {
              id = match.right.id;
              converted.right = rightRoot.index.getById(id);
              converted.rightParentId = match.rightParentId;
            }
            if (id !== void 0)
              result[id] = converted;
          }
          return result;
        }
        computeAnimation(newRoot, matchResult, context) {
          const animationData = {
            fades: []
          };
          (0, model_matching_1.forEachMatch)(matchResult, (id, match) => {
            if (match.left !== void 0 && match.right !== void 0) {
              this.updateElement(match.left, match.right, animationData);
            } else if (match.right !== void 0) {
              const right = match.right;
              if ((0, model_1.isFadeable)(right)) {
                right.opacity = 0;
                animationData.fades.push({
                  element: right,
                  type: "in"
                });
              }
            } else if (match.left instanceof smodel_1.SChildElement) {
              const left = match.left;
              if ((0, model_1.isFadeable)(left) && match.leftParentId !== void 0) {
                if (!(0, smodel_utils_1.containsSome)(newRoot, left)) {
                  const parent = newRoot.index.getById(match.leftParentId);
                  if (parent instanceof smodel_1.SParentElement) {
                    const leftCopy = context.modelFactory.createElement(left);
                    parent.add(leftCopy);
                    animationData.fades.push({
                      element: leftCopy,
                      type: "out"
                    });
                  }
                }
              }
            }
          });
          const animations = this.createAnimations(animationData, newRoot, context);
          if (animations.length >= 2) {
            return new animation_1.CompoundAnimation(newRoot, context, animations);
          } else if (animations.length === 1) {
            return animations[0];
          } else {
            return newRoot;
          }
        }
        updateElement(left, right, animationData) {
          if ((0, model_2.isLocateable)(left) && (0, model_2.isLocateable)(right)) {
            const leftPos = left.position;
            const rightPos = right.position;
            if (!(0, geometry_1.almostEquals)(leftPos.x, rightPos.x) || !(0, geometry_1.almostEquals)(leftPos.y, rightPos.y)) {
              if (animationData.moves === void 0)
                animationData.moves = [];
              animationData.moves.push({
                element: right,
                fromPosition: leftPos,
                toPosition: rightPos
              });
              right.position = leftPos;
            }
          }
          if ((0, model_3.isSizeable)(left) && (0, model_3.isSizeable)(right)) {
            if (!geometry_1.Dimension.isValid(right.bounds)) {
              right.bounds = {
                x: right.bounds.x,
                y: right.bounds.y,
                width: left.bounds.width,
                height: left.bounds.height
              };
            } else if (!(0, geometry_1.almostEquals)(left.bounds.width, right.bounds.width) || !(0, geometry_1.almostEquals)(left.bounds.height, right.bounds.height)) {
              if (animationData.resizes === void 0)
                animationData.resizes = [];
              animationData.resizes.push({
                element: right,
                fromDimension: {
                  width: left.bounds.width,
                  height: left.bounds.height
                },
                toDimension: {
                  width: right.bounds.width,
                  height: right.bounds.height
                }
              });
            }
          }
          if (left instanceof model_6.SRoutableElement && right instanceof model_6.SRoutableElement && this.edgeRouterRegistry) {
            if (animationData.edgeMementi === void 0)
              animationData.edgeMementi = [];
            animationData.edgeMementi.push({
              edge: right,
              before: this.takeSnapshot(left),
              after: this.takeSnapshot(right)
            });
          }
          if ((0, model_4.isSelectable)(left) && (0, model_4.isSelectable)(right)) {
            right.selected = left.selected;
          }
          if (left instanceof smodel_1.SModelRoot && right instanceof smodel_1.SModelRoot) {
            right.canvasBounds = left.canvasBounds;
          }
          if (left instanceof viewport_root_1.ViewportRootElement && right instanceof viewport_root_1.ViewportRootElement) {
            right.scroll = left.scroll;
            right.zoom = left.zoom;
          }
        }
        takeSnapshot(edge) {
          const router = this.edgeRouterRegistry.get(edge.routerKind);
          return router.takeSnapshot(edge);
        }
        createAnimations(data, root, context) {
          const animations = [];
          if (data.fades.length > 0) {
            animations.push(new fade_1.FadeAnimation(root, data.fades, context, true));
          }
          if (data.moves !== void 0 && data.moves.length > 0) {
            const movesMap = /* @__PURE__ */ new Map();
            for (const move of data.moves) {
              movesMap.set(move.element.id, move);
            }
            animations.push(new move_1.MoveAnimation(root, movesMap, context, false));
          }
          if (data.resizes !== void 0 && data.resizes.length > 0) {
            const resizesMap = /* @__PURE__ */ new Map();
            for (const resize of data.resizes) {
              resizesMap.set(resize.element.id, resize);
            }
            animations.push(new resize_1.ResizeAnimation(root, resizesMap, context, false));
          }
          if (data.edgeMementi !== void 0 && data.edgeMementi.length > 0) {
            animations.push(new move_1.MorphEdgesAnimation(root, data.edgeMementi, context, false));
          }
          return animations;
        }
        undo(context) {
          return this.performUpdate(this.newRoot, this.oldRoot, context);
        }
        redo(context) {
          return this.performUpdate(this.oldRoot, this.newRoot, context);
        }
      };
      UpdateModelCommand.KIND = actions_1.UpdateModelAction.KIND;
      __decorate([
        (0, inversify_1.inject)(routing_1.EdgeRouterRegistry),
        (0, inversify_1.optional)(),
        __metadata("design:type", routing_1.EdgeRouterRegistry)
      ], UpdateModelCommand.prototype, "edgeRouterRegistry", void 0);
      UpdateModelCommand = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(types_1.TYPES.Action)),
        __metadata("design:paramtypes", [Object])
      ], UpdateModelCommand);
      exports.UpdateModelCommand = UpdateModelCommand;
    }
  });

  // node_modules/sprotty/lib/features/viewport/viewport.js
  var require_viewport = __commonJS({
    "node_modules/sprotty/lib/features/viewport/viewport.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      var __param = exports && exports.__param || function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      var SetViewportCommand_1;
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ViewportAnimation = exports.GetViewportCommand = exports.SetViewportCommand = exports.ViewportResult = exports.GetViewportAction = exports.SetViewportAction = void 0;
      var inversify_1 = require_inversify();
      var actions_1 = require_actions();
      var geometry_1 = require_geometry();
      var command_1 = require_command();
      var animation_1 = require_animation();
      var model_1 = require_model12();
      var types_1 = require_types();
      var request_command_1 = require_request_command();
      var SetViewportAction = class {
        constructor(elementId, newViewport, animate) {
          this.elementId = elementId;
          this.newViewport = newViewport;
          this.animate = animate;
          this.kind = SetViewportAction.KIND;
        }
      };
      exports.SetViewportAction = SetViewportAction;
      SetViewportAction.KIND = "viewport";
      var GetViewportAction;
      (function(GetViewportAction2) {
        GetViewportAction2.KIND = "getViewport";
        function create() {
          return {
            kind: GetViewportAction2.KIND,
            requestId: (0, actions_1.generateRequestId)()
          };
        }
        GetViewportAction2.create = create;
      })(GetViewportAction = exports.GetViewportAction || (exports.GetViewportAction = {}));
      var ViewportResult;
      (function(ViewportResult2) {
        ViewportResult2.KIND = "viewportResult";
        function create(viewport, canvasBounds, requestId) {
          return {
            kind: ViewportResult2.KIND,
            viewport,
            canvasBounds,
            responseId: requestId
          };
        }
        ViewportResult2.create = create;
      })(ViewportResult = exports.ViewportResult || (exports.ViewportResult = {}));
      var SetViewportCommand = SetViewportCommand_1 = class SetViewportCommand extends command_1.MergeableCommand {
        constructor(action) {
          super();
          this.action = action;
          this.newViewport = action.newViewport;
        }
        execute(context) {
          const model = context.root;
          const element = model.index.getById(this.action.elementId);
          if (element && (0, model_1.isViewport)(element)) {
            this.element = element;
            this.oldViewport = {
              scroll: this.element.scroll,
              zoom: this.element.zoom
            };
            if (this.action.animate)
              return new ViewportAnimation(this.element, this.oldViewport, this.newViewport, context).start();
            else {
              this.element.scroll = this.newViewport.scroll;
              this.element.zoom = this.newViewport.zoom;
            }
          }
          return model;
        }
        undo(context) {
          return new ViewportAnimation(this.element, this.newViewport, this.oldViewport, context).start();
        }
        redo(context) {
          return new ViewportAnimation(this.element, this.oldViewport, this.newViewport, context).start();
        }
        merge(command, context) {
          if (!this.action.animate && command instanceof SetViewportCommand_1 && this.element === command.element) {
            this.newViewport = command.newViewport;
            return true;
          }
          return false;
        }
      };
      SetViewportCommand.KIND = actions_1.SetViewportAction.KIND;
      SetViewportCommand = SetViewportCommand_1 = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(types_1.TYPES.Action)),
        __metadata("design:paramtypes", [Object])
      ], SetViewportCommand);
      exports.SetViewportCommand = SetViewportCommand;
      var GetViewportCommand = class GetViewportCommand extends request_command_1.ModelRequestCommand {
        constructor(action) {
          super();
          this.action = action;
        }
        retrieveResult(context) {
          const elem = context.root;
          let viewport;
          if ((0, model_1.isViewport)(elem)) {
            viewport = { scroll: elem.scroll, zoom: elem.zoom };
          } else {
            viewport = { scroll: geometry_1.Point.ORIGIN, zoom: 1 };
          }
          return ViewportResult.create(viewport, elem.canvasBounds, this.action.requestId);
        }
      };
      GetViewportCommand.KIND = GetViewportAction.KIND;
      GetViewportCommand = __decorate([
        __param(0, (0, inversify_1.inject)(types_1.TYPES.Action)),
        __metadata("design:paramtypes", [Object])
      ], GetViewportCommand);
      exports.GetViewportCommand = GetViewportCommand;
      var ViewportAnimation = class extends animation_1.Animation {
        constructor(element, oldViewport, newViewport, context) {
          super(context);
          this.element = element;
          this.oldViewport = oldViewport;
          this.newViewport = newViewport;
          this.context = context;
          this.zoomFactor = Math.log(newViewport.zoom / oldViewport.zoom);
        }
        tween(t, context) {
          this.element.scroll = {
            x: (1 - t) * this.oldViewport.scroll.x + t * this.newViewport.scroll.x,
            y: (1 - t) * this.oldViewport.scroll.y + t * this.newViewport.scroll.y
          };
          this.element.zoom = this.oldViewport.zoom * Math.exp(t * this.zoomFactor);
          return context.root;
        }
      };
      exports.ViewportAnimation = ViewportAnimation;
    }
  });

  // node_modules/sprotty/lib/features/viewport/center-fit.js
  var require_center_fit = __commonJS({
    "node_modules/sprotty/lib/features/viewport/center-fit.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      var __param = exports && exports.__param || function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.CenterKeyboardListener = exports.FitToScreenCommand = exports.CenterCommand = exports.BoundsAwareViewportCommand = exports.FitToScreenAction = exports.CenterAction = void 0;
      var actions_1 = require_actions();
      var geometry_1 = require_geometry();
      var keyboard_1 = require_keyboard();
      var smodel_1 = require_smodel();
      var command_1 = require_command();
      var key_tool_1 = require_key_tool();
      var model_1 = require_model2();
      var model_2 = require_model6();
      var viewport_1 = require_viewport();
      var model_3 = require_model12();
      var inversify_1 = require_inversify();
      var types_1 = require_types();
      var CenterAction = class {
        constructor(elementIds, animate = true, retainZoom = false) {
          this.elementIds = elementIds;
          this.animate = animate;
          this.retainZoom = retainZoom;
          this.kind = CenterAction.KIND;
        }
      };
      exports.CenterAction = CenterAction;
      CenterAction.KIND = "center";
      var FitToScreenAction = class {
        constructor(elementIds, padding, maxZoom, animate = true) {
          this.elementIds = elementIds;
          this.padding = padding;
          this.maxZoom = maxZoom;
          this.animate = animate;
          this.kind = FitToScreenAction.KIND;
        }
      };
      exports.FitToScreenAction = FitToScreenAction;
      FitToScreenAction.KIND = "fit";
      var BoundsAwareViewportCommand = class BoundsAwareViewportCommand extends command_1.Command {
        constructor(animate) {
          super();
          this.animate = animate;
        }
        initialize(model) {
          if ((0, model_3.isViewport)(model)) {
            this.oldViewport = {
              scroll: model.scroll,
              zoom: model.zoom
            };
            const allBounds = [];
            this.getElementIds().forEach((id) => {
              const element = model.index.getById(id);
              if (element && (0, model_1.isBoundsAware)(element))
                allBounds.push(this.boundsInViewport(element, element.bounds, model));
            });
            if (allBounds.length === 0) {
              model.index.all().forEach((element) => {
                if ((0, model_2.isSelectable)(element) && element.selected && (0, model_1.isBoundsAware)(element))
                  allBounds.push(this.boundsInViewport(element, element.bounds, model));
              });
            }
            if (allBounds.length === 0) {
              model.index.all().forEach((element) => {
                if ((0, model_1.isBoundsAware)(element))
                  allBounds.push(this.boundsInViewport(element, element.bounds, model));
              });
            }
            if (allBounds.length !== 0) {
              const bounds = allBounds.reduce((b0, b1) => geometry_1.Bounds.combine(b0, b1));
              if (geometry_1.Dimension.isValid(bounds))
                this.newViewport = this.getNewViewport(bounds, model);
            }
          }
        }
        boundsInViewport(element, bounds, viewport) {
          if (element instanceof smodel_1.SChildElement && element.parent !== viewport)
            return this.boundsInViewport(element.parent, element.parent.localToParent(bounds), viewport);
          else
            return bounds;
        }
        execute(context) {
          this.initialize(context.root);
          return this.redo(context);
        }
        undo(context) {
          const model = context.root;
          if ((0, model_3.isViewport)(model) && this.newViewport !== void 0 && !this.equal(this.newViewport, this.oldViewport)) {
            if (this.animate)
              return new viewport_1.ViewportAnimation(model, this.newViewport, this.oldViewport, context).start();
            else {
              model.scroll = this.oldViewport.scroll;
              model.zoom = this.oldViewport.zoom;
            }
          }
          return model;
        }
        redo(context) {
          const model = context.root;
          if ((0, model_3.isViewport)(model) && this.newViewport !== void 0 && !this.equal(this.newViewport, this.oldViewport)) {
            if (this.animate) {
              return new viewport_1.ViewportAnimation(model, this.oldViewport, this.newViewport, context).start();
            } else {
              model.scroll = this.newViewport.scroll;
              model.zoom = this.newViewport.zoom;
            }
          }
          return model;
        }
        equal(vp1, vp2) {
          return vp1.zoom === vp2.zoom && vp1.scroll.x === vp2.scroll.x && vp1.scroll.y === vp2.scroll.y;
        }
      };
      BoundsAwareViewportCommand = __decorate([
        (0, inversify_1.injectable)(),
        __metadata("design:paramtypes", [Boolean])
      ], BoundsAwareViewportCommand);
      exports.BoundsAwareViewportCommand = BoundsAwareViewportCommand;
      var CenterCommand = class CenterCommand extends BoundsAwareViewportCommand {
        constructor(action) {
          super(action.animate);
          this.action = action;
        }
        getElementIds() {
          return this.action.elementIds;
        }
        getNewViewport(bounds, model) {
          if (!geometry_1.Dimension.isValid(model.canvasBounds)) {
            return void 0;
          }
          const zoom = this.action.retainZoom && (0, model_3.isViewport)(model) ? model.zoom : 1;
          const c = geometry_1.Bounds.center(bounds);
          return {
            scroll: {
              x: c.x - 0.5 * model.canvasBounds.width / zoom,
              y: c.y - 0.5 * model.canvasBounds.height / zoom
            },
            zoom
          };
        }
      };
      CenterCommand.KIND = actions_1.CenterAction.KIND;
      CenterCommand = __decorate([
        __param(0, (0, inversify_1.inject)(types_1.TYPES.Action)),
        __metadata("design:paramtypes", [Object])
      ], CenterCommand);
      exports.CenterCommand = CenterCommand;
      var FitToScreenCommand = class FitToScreenCommand extends BoundsAwareViewportCommand {
        constructor(action) {
          super(action.animate);
          this.action = action;
        }
        getElementIds() {
          return this.action.elementIds;
        }
        getNewViewport(bounds, model) {
          if (!geometry_1.Dimension.isValid(model.canvasBounds)) {
            return void 0;
          }
          const c = geometry_1.Bounds.center(bounds);
          const delta = this.action.padding === void 0 ? 0 : 2 * this.action.padding;
          let zoom = Math.min(model.canvasBounds.width / (bounds.width + delta), model.canvasBounds.height / (bounds.height + delta));
          if (this.action.maxZoom !== void 0)
            zoom = Math.min(zoom, this.action.maxZoom);
          if (zoom === Infinity) {
            zoom = 1;
          }
          return {
            scroll: {
              x: c.x - 0.5 * model.canvasBounds.width / zoom,
              y: c.y - 0.5 * model.canvasBounds.height / zoom
            },
            zoom
          };
        }
      };
      FitToScreenCommand.KIND = actions_1.FitToScreenAction.KIND;
      FitToScreenCommand = __decorate([
        __param(0, (0, inversify_1.inject)(types_1.TYPES.Action)),
        __metadata("design:paramtypes", [Object])
      ], FitToScreenCommand);
      exports.FitToScreenCommand = FitToScreenCommand;
      var CenterKeyboardListener = class extends key_tool_1.KeyListener {
        keyDown(element, event) {
          if ((0, keyboard_1.matchesKeystroke)(event, "KeyC", "ctrlCmd", "shift"))
            return [new CenterAction([])];
          if ((0, keyboard_1.matchesKeystroke)(event, "KeyF", "ctrlCmd", "shift"))
            return [new FitToScreenAction([])];
          return [];
        }
      };
      exports.CenterKeyboardListener = CenterKeyboardListener;
    }
  });

  // node_modules/sprotty/lib/features/viewport/scroll.js
  var require_scroll = __commonJS({
    "node_modules/sprotty/lib/features/viewport/scroll.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ScrollMouseListener = exports.isScrollable = void 0;
      var actions_1 = require_actions();
      var smodel_1 = require_smodel();
      var mouse_tool_1 = require_mouse_tool();
      var smodel_utils_1 = require_smodel_utils();
      var model_1 = require_model12();
      var model_2 = require_model8();
      var model_3 = require_model9();
      var model_4 = require_model17();
      var browser_1 = require_browser();
      function isScrollable(element) {
        return "scroll" in element;
      }
      exports.isScrollable = isScrollable;
      var ScrollMouseListener = class extends mouse_tool_1.MouseListener {
        constructor() {
          super(...arguments);
          this.scrollbarMouseDownDelay = 200;
        }
        mouseDown(target, event) {
          const moveable = (0, smodel_utils_1.findParentByFeature)(target, model_2.isMoveable);
          if (moveable === void 0 && !(target instanceof model_3.SRoutingHandle)) {
            const viewport = (0, smodel_utils_1.findParentByFeature)(target, model_1.isViewport);
            if (viewport) {
              this.lastScrollPosition = { x: event.pageX, y: event.pageY };
              this.scrollbar = this.getScrollbar(event);
              if (this.scrollbar) {
                window.clearTimeout(this.scrollbarMouseDownTimeout);
                return this.moveScrollBar(viewport, event, this.scrollbar, true).map((action) => new Promise((resolve) => {
                  this.scrollbarMouseDownTimeout = window.setTimeout(() => resolve(action), this.scrollbarMouseDownDelay);
                }));
              }
            } else {
              this.lastScrollPosition = void 0;
              this.scrollbar = void 0;
            }
          }
          return [];
        }
        mouseMove(target, event) {
          if (event.buttons === 0) {
            return this.mouseUp(target, event);
          }
          if (this.scrollbar) {
            window.clearTimeout(this.scrollbarMouseDownTimeout);
            const viewport = (0, smodel_utils_1.findParentByFeature)(target, model_1.isViewport);
            if (viewport) {
              return this.moveScrollBar(viewport, event, this.scrollbar);
            }
          }
          if (this.lastScrollPosition) {
            const viewport = (0, smodel_utils_1.findParentByFeature)(target, model_1.isViewport);
            if (viewport) {
              return this.dragCanvas(viewport, event, this.lastScrollPosition);
            }
          }
          return [];
        }
        mouseEnter(target, event) {
          if (target instanceof smodel_1.SModelRoot && event.buttons === 0) {
            this.mouseUp(target, event);
          }
          return [];
        }
        mouseUp(target, event) {
          this.lastScrollPosition = void 0;
          this.scrollbar = void 0;
          return [];
        }
        doubleClick(target, event) {
          const viewport = (0, smodel_utils_1.findParentByFeature)(target, model_1.isViewport);
          if (viewport) {
            const scrollbar = this.getScrollbar(event);
            if (scrollbar) {
              window.clearTimeout(this.scrollbarMouseDownTimeout);
              const targetElement = this.findClickTarget(scrollbar, event);
              let elementId;
              if (targetElement && targetElement.id.startsWith("horizontal-projection:")) {
                elementId = targetElement.id.substring("horizontal-projection:".length);
              } else if (targetElement && targetElement.id.startsWith("vertical-projection:")) {
                elementId = targetElement.id.substring("vertical-projection:".length);
              }
              if (elementId) {
                return [actions_1.CenterAction.create([elementId], { animate: true, retainZoom: true })];
              }
            }
          }
          return [];
        }
        dragCanvas(viewport, event, lastScrollPosition) {
          const dx = (event.pageX - lastScrollPosition.x) / viewport.zoom;
          const dy = (event.pageY - lastScrollPosition.y) / viewport.zoom;
          const newViewport = {
            scroll: {
              x: viewport.scroll.x - dx,
              y: viewport.scroll.y - dy
            },
            zoom: viewport.zoom
          };
          this.lastScrollPosition = { x: event.pageX, y: event.pageY };
          return [actions_1.SetViewportAction.create(viewport.id, newViewport, { animate: false })];
        }
        moveScrollBar(model, event, scrollbar, animate = false) {
          const modelBounds = (0, model_4.getModelBounds)(model);
          if (!modelBounds || model.zoom <= 0) {
            return [];
          }
          const scrollbarRect = scrollbar.getBoundingClientRect();
          let newScroll;
          if (this.getScrollbarOrientation(scrollbar) === "horizontal") {
            if (scrollbarRect.width <= 0) {
              return [];
            }
            const viewportSize = model.canvasBounds.width / (model.zoom * modelBounds.width) * scrollbarRect.width;
            let position = event.clientX - scrollbarRect.x - viewportSize / 2;
            if (position < 0) {
              position = 0;
            } else if (position > scrollbarRect.width - viewportSize) {
              position = scrollbarRect.width - viewportSize;
            }
            newScroll = {
              x: modelBounds.x + position / scrollbarRect.width * modelBounds.width,
              y: model.scroll.y
            };
          } else {
            if (scrollbarRect.height <= 0) {
              return [];
            }
            const viewportSize = model.canvasBounds.height / (model.zoom * modelBounds.height) * scrollbarRect.height;
            let position = event.clientY - scrollbarRect.y - viewportSize / 2;
            if (position < 0) {
              position = 0;
            } else if (position > scrollbarRect.height - viewportSize) {
              position = scrollbarRect.height - viewportSize;
            }
            newScroll = {
              x: model.scroll.x,
              y: modelBounds.y + position / scrollbarRect.height * modelBounds.height
            };
          }
          return [actions_1.SetViewportAction.create(model.id, { scroll: newScroll, zoom: model.zoom }, { animate })];
        }
        getScrollbar(event) {
          let element = event.target;
          while (element) {
            if (element.classList && element.classList.contains("sprotty-projection-bar")) {
              return element;
            }
            element = element.parentElement;
          }
          return void 0;
        }
        getScrollbarOrientation(scrollbar) {
          if (scrollbar.classList.contains("horizontal")) {
            return "horizontal";
          } else {
            return "vertical";
          }
        }
        findClickTarget(scrollbar, event) {
          const matching = Array.from(scrollbar.children).filter((child) => child.id && child.classList.contains("sprotty-projection") && (0, browser_1.hitsMouseEvent)(child, event));
          if (matching.length > 0) {
            return matching[matching.length - 1];
          }
          return void 0;
        }
      };
      exports.ScrollMouseListener = ScrollMouseListener;
    }
  });

  // node_modules/sprotty/lib/features/zorder/zorder.js
  var require_zorder = __commonJS({
    "node_modules/sprotty/lib/features/zorder/zorder.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      var __param = exports && exports.__param || function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.BringToFrontCommand = exports.BringToFrontAction = void 0;
      var inversify_1 = require_inversify();
      var types_1 = require_types();
      var smodel_1 = require_smodel();
      var command_1 = require_command();
      var model_1 = require_model9();
      var BringToFrontAction;
      (function(BringToFrontAction2) {
        BringToFrontAction2.KIND = "bringToFront";
        function create(elementIDs) {
          return {
            kind: BringToFrontAction2.KIND,
            elementIDs
          };
        }
        BringToFrontAction2.create = create;
      })(BringToFrontAction = exports.BringToFrontAction || (exports.BringToFrontAction = {}));
      var BringToFrontCommand = class BringToFrontCommand extends command_1.Command {
        constructor(action) {
          super();
          this.action = action;
          this.selected = [];
        }
        execute(context) {
          const model = context.root;
          this.action.elementIDs.forEach((id) => {
            const element = model.index.getById(id);
            if (element instanceof model_1.SRoutableElement) {
              if (element.source)
                this.addToSelection(element.source);
              if (element.target)
                this.addToSelection(element.target);
            }
            if (element instanceof smodel_1.SChildElement) {
              this.addToSelection(element);
            }
            this.includeConnectedEdges(element);
          });
          return this.redo(context);
        }
        includeConnectedEdges(element) {
          if (element instanceof model_1.SConnectableElement) {
            element.incomingEdges.forEach((edge) => this.addToSelection(edge));
            element.outgoingEdges.forEach((edge) => this.addToSelection(edge));
          }
          if (element instanceof smodel_1.SParentElement) {
            for (const child of element.children) {
              this.includeConnectedEdges(child);
            }
          }
        }
        addToSelection(element) {
          this.selected.push({
            element,
            index: element.parent.children.indexOf(element)
          });
        }
        undo(context) {
          for (let i = this.selected.length - 1; i >= 0; i--) {
            const selection = this.selected[i];
            const element = selection.element;
            element.parent.move(element, selection.index);
          }
          return context.root;
        }
        redo(context) {
          for (let i = 0; i < this.selected.length; i++) {
            this.bringToFront(this.selected[i]);
          }
          return context.root;
        }
        bringToFront(selection) {
          const element = selection.element;
          const childrenLength = element.parent.children.length;
          element.parent.move(element, childrenLength - 1);
        }
      };
      BringToFrontCommand.KIND = BringToFrontAction.KIND;
      BringToFrontCommand = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(types_1.TYPES.Action)),
        __metadata("design:paramtypes", [Object])
      ], BringToFrontCommand);
      exports.BringToFrontCommand = BringToFrontCommand;
    }
  });

  // node_modules/sprotty/lib/graph/sgraph-factory.js
  var require_sgraph_factory = __commonJS({
    "node_modules/sprotty/lib/graph/sgraph-factory.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SGraphFactory = void 0;
      var inversify_1 = require_inversify();
      var model_utils_1 = require_model_utils();
      var smodel_factory_1 = require_smodel_factory();
      var smodel_1 = require_smodel();
      var sgraph_1 = require_sgraph();
      var model_1 = require_model4();
      var SGraphFactory = class SGraphFactory extends smodel_factory_1.SModelFactory {
        constructor() {
          super(...arguments);
          this.defaultGraphFeatures = (0, smodel_factory_1.createFeatureSet)(sgraph_1.SGraph.DEFAULT_FEATURES);
          this.defaultNodeFeatures = (0, smodel_factory_1.createFeatureSet)(sgraph_1.SNode.DEFAULT_FEATURES);
          this.defaultPortFeatures = (0, smodel_factory_1.createFeatureSet)(sgraph_1.SPort.DEFAULT_FEATURES);
          this.defaultEdgeFeatures = (0, smodel_factory_1.createFeatureSet)(sgraph_1.SEdge.DEFAULT_FEATURES);
          this.defaultLabelFeatures = (0, smodel_factory_1.createFeatureSet)(sgraph_1.SLabel.DEFAULT_FEATURES);
          this.defaultCompartmentFeatures = (0, smodel_factory_1.createFeatureSet)(sgraph_1.SCompartment.DEFAULT_FEATURES);
          this.defaultButtonFeatures = (0, smodel_factory_1.createFeatureSet)(model_1.SButton.DEFAULT_FEATURES);
        }
        createElement(schema, parent) {
          let child;
          if (this.registry.hasKey(schema.type)) {
            const regElement = this.registry.get(schema.type, void 0);
            if (!(regElement instanceof smodel_1.SChildElement))
              throw new Error(`Element with type ${schema.type} was expected to be an SChildElement.`);
            child = regElement;
          } else if (this.isNodeSchema(schema)) {
            child = new sgraph_1.SNode();
            child.features = this.defaultNodeFeatures;
          } else if (this.isPortSchema(schema)) {
            child = new sgraph_1.SPort();
            child.features = this.defaultPortFeatures;
          } else if (this.isEdgeSchema(schema)) {
            child = new sgraph_1.SEdge();
            child.features = this.defaultEdgeFeatures;
          } else if (this.isLabelSchema(schema)) {
            child = new sgraph_1.SLabel();
            child.features = this.defaultLabelFeatures;
          } else if (this.isCompartmentSchema(schema)) {
            child = new sgraph_1.SCompartment();
            child.features = this.defaultCompartmentFeatures;
          } else if (this.isButtonSchema(schema)) {
            child = new model_1.SButton();
            child.features = this.defaultButtonFeatures;
          } else {
            child = new smodel_1.SChildElement();
          }
          return this.initializeChild(child, schema, parent);
        }
        createRoot(schema) {
          let root;
          if (this.registry.hasKey(schema.type)) {
            const regElement = this.registry.get(schema.type, void 0);
            if (!(regElement instanceof smodel_1.SModelRoot))
              throw new Error(`Element with type ${schema.type} was expected to be an SModelRoot.`);
            root = regElement;
          } else if (this.isGraphSchema(schema)) {
            root = new sgraph_1.SGraph();
            root.features = this.defaultGraphFeatures;
          } else {
            root = new smodel_1.SModelRoot();
          }
          return this.initializeRoot(root, schema);
        }
        isGraphSchema(schema) {
          return (0, model_utils_1.getBasicType)(schema) === "graph";
        }
        isNodeSchema(schema) {
          return (0, model_utils_1.getBasicType)(schema) === "node";
        }
        isPortSchema(schema) {
          return (0, model_utils_1.getBasicType)(schema) === "port";
        }
        isEdgeSchema(schema) {
          return (0, model_utils_1.getBasicType)(schema) === "edge";
        }
        isLabelSchema(schema) {
          return (0, model_utils_1.getBasicType)(schema) === "label";
        }
        isCompartmentSchema(schema) {
          return (0, model_utils_1.getBasicType)(schema) === "comp";
        }
        isButtonSchema(schema) {
          return (0, model_utils_1.getBasicType)(schema) === "button";
        }
      };
      SGraphFactory = __decorate([
        (0, inversify_1.injectable)()
      ], SGraphFactory);
      exports.SGraphFactory = SGraphFactory;
    }
  });

  // node_modules/sprotty/lib/graph/di.config.js
  var require_di_config4 = __commonJS({
    "node_modules/sprotty/lib/graph/di.config.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var inversify_1 = require_inversify();
      var types_1 = require_types();
      var sgraph_factory_1 = require_sgraph_factory();
      var graphModule = new inversify_1.ContainerModule((bind, unbind, isBound, rebind) => {
        rebind(types_1.TYPES.IModelFactory).to(sgraph_factory_1.SGraphFactory).inSingletonScope();
      });
      exports.default = graphModule;
    }
  });

  // node_modules/sprotty/lib/features/bounds/di.config.js
  var require_di_config5 = __commonJS({
    "node_modules/sprotty/lib/features/bounds/di.config.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var inversify_1 = require_inversify();
      var types_1 = require_types();
      var bounds_manipulation_1 = require_bounds_manipulation();
      var hidden_bounds_updater_1 = require_hidden_bounds_updater();
      var layout_1 = require_layout();
      var command_registration_1 = require_command_registration();
      var hbox_layout_1 = require_hbox_layout();
      var vbox_layout_1 = require_vbox_layout();
      var stack_layout_1 = require_stack_layout();
      var boundsModule = new inversify_1.ContainerModule((bind, _unbind, isBound) => {
        (0, command_registration_1.configureCommand)({ bind, isBound }, bounds_manipulation_1.SetBoundsCommand);
        (0, command_registration_1.configureCommand)({ bind, isBound }, bounds_manipulation_1.RequestBoundsCommand);
        bind(hidden_bounds_updater_1.HiddenBoundsUpdater).toSelf().inSingletonScope();
        bind(types_1.TYPES.HiddenVNodePostprocessor).toService(hidden_bounds_updater_1.HiddenBoundsUpdater);
        bind(types_1.TYPES.Layouter).to(layout_1.Layouter).inSingletonScope();
        bind(types_1.TYPES.LayoutRegistry).to(layout_1.LayoutRegistry).inSingletonScope();
        (0, layout_1.configureLayout)({ bind, isBound }, vbox_layout_1.VBoxLayouter.KIND, vbox_layout_1.VBoxLayouter);
        (0, layout_1.configureLayout)({ bind, isBound }, hbox_layout_1.HBoxLayouter.KIND, hbox_layout_1.HBoxLayouter);
        (0, layout_1.configureLayout)({ bind, isBound }, stack_layout_1.StackLayouter.KIND, stack_layout_1.StackLayouter);
      });
      exports.default = boundsModule;
    }
  });

  // node_modules/sprotty/lib/features/button/di.config.js
  var require_di_config6 = __commonJS({
    "node_modules/sprotty/lib/features/button/di.config.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var inversify_1 = require_inversify();
      var button_handler_1 = require_button_handler();
      var buttonModule = new inversify_1.ContainerModule((bind) => {
        bind(button_handler_1.ButtonHandlerRegistry).toSelf().inSingletonScope();
      });
      exports.default = buttonModule;
    }
  });

  // node_modules/sprotty/lib/features/command-palette/di.config.js
  var require_di_config7 = __commonJS({
    "node_modules/sprotty/lib/features/command-palette/di.config.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var inversify_1 = require_inversify();
      var types_1 = require_types();
      var action_providers_1 = require_action_providers();
      var command_palette_1 = require_command_palette();
      var commandPaletteModule = new inversify_1.ContainerModule((bind) => {
        bind(command_palette_1.CommandPalette).toSelf().inSingletonScope();
        bind(types_1.TYPES.IUIExtension).toService(command_palette_1.CommandPalette);
        bind(command_palette_1.CommandPaletteKeyListener).toSelf().inSingletonScope();
        bind(types_1.TYPES.KeyListener).toService(command_palette_1.CommandPaletteKeyListener);
        bind(action_providers_1.CommandPaletteActionProviderRegistry).toSelf().inSingletonScope();
        bind(types_1.TYPES.ICommandPaletteActionProviderRegistry).toService(action_providers_1.CommandPaletteActionProviderRegistry);
      });
      exports.default = commandPaletteModule;
    }
  });

  // node_modules/sprotty/lib/features/context-menu/di.config.js
  var require_di_config8 = __commonJS({
    "node_modules/sprotty/lib/features/context-menu/di.config.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var inversify_1 = require_inversify();
      var menu_providers_1 = require_menu_providers();
      var mouse_listener_1 = require_mouse_listener();
      var types_1 = require_types();
      var contextMenuModule = new inversify_1.ContainerModule((bind) => {
        bind(types_1.TYPES.IContextMenuServiceProvider).toProvider((ctx) => {
          return () => {
            return new Promise((resolve, reject) => {
              if (ctx.container.isBound(types_1.TYPES.IContextMenuService)) {
                resolve(ctx.container.get(types_1.TYPES.IContextMenuService));
              } else {
                reject();
              }
            });
          };
        });
        bind(mouse_listener_1.ContextMenuMouseListener).toSelf().inSingletonScope();
        bind(types_1.TYPES.MouseListener).toService(mouse_listener_1.ContextMenuMouseListener);
        bind(types_1.TYPES.IContextMenuProviderRegistry).to(menu_providers_1.ContextMenuProviderRegistry);
      });
      exports.default = contextMenuModule;
    }
  });

  // node_modules/sprotty/lib/features/decoration/di.config.js
  var require_di_config9 = __commonJS({
    "node_modules/sprotty/lib/features/decoration/di.config.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var view_1 = require_view();
      var inversify_1 = require_inversify();
      var model_1 = require_model15();
      var views_1 = require_views3();
      var types_1 = require_types();
      var decoration_placer_1 = require_decoration_placer();
      var decorationModule = new inversify_1.ContainerModule((bind, _unbind, isBound) => {
        (0, view_1.configureModelElement)({ bind, isBound }, "marker", model_1.SIssueMarker, views_1.IssueMarkerView);
        bind(decoration_placer_1.DecorationPlacer).toSelf().inSingletonScope();
        bind(types_1.TYPES.IVNodePostprocessor).toService(decoration_placer_1.DecorationPlacer);
      });
      exports.default = decorationModule;
    }
  });

  // node_modules/sprotty/lib/features/edge-intersection/di.config.js
  var require_di_config10 = __commonJS({
    "node_modules/sprotty/lib/features/edge-intersection/di.config.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var inversify_1 = require_inversify();
      var types_1 = require_types();
      var intersection_finder_1 = require_intersection_finder();
      var edgeIntersectionModule2 = new inversify_1.ContainerModule((bind) => {
        bind(intersection_finder_1.IntersectionFinder).toSelf().inSingletonScope();
        bind(types_1.TYPES.IEdgeRoutePostprocessor).toService(intersection_finder_1.IntersectionFinder);
      });
      exports.default = edgeIntersectionModule2;
    }
  });

  // node_modules/sprotty/lib/features/expand/di.config.js
  var require_di_config11 = __commonJS({
    "node_modules/sprotty/lib/features/expand/di.config.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var inversify_1 = require_inversify();
      var button_handler_1 = require_button_handler();
      var expand_1 = require_expand();
      var expandModule = new inversify_1.ContainerModule((bind, _unbind, isBound) => {
        (0, button_handler_1.configureButtonHandler)({ bind, isBound }, expand_1.ExpandButtonHandler.TYPE, expand_1.ExpandButtonHandler);
      });
      exports.default = expandModule;
    }
  });

  // node_modules/sprotty/lib/features/export/di.config.js
  var require_di_config12 = __commonJS({
    "node_modules/sprotty/lib/features/export/di.config.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var inversify_1 = require_inversify();
      var types_1 = require_types();
      var export_1 = require_export();
      var svg_exporter_1 = require_svg_exporter();
      var command_registration_1 = require_command_registration();
      var exportSvgModule = new inversify_1.ContainerModule((bind, _unbind, isBound) => {
        bind(export_1.ExportSvgKeyListener).toSelf().inSingletonScope();
        bind(types_1.TYPES.KeyListener).toService(export_1.ExportSvgKeyListener);
        bind(types_1.TYPES.HiddenVNodePostprocessor).to(export_1.ExportSvgPostprocessor).inSingletonScope();
        (0, command_registration_1.configureCommand)({ bind, isBound }, export_1.ExportSvgCommand);
        bind(types_1.TYPES.SvgExporter).to(svg_exporter_1.SvgExporter).inSingletonScope();
      });
      exports.default = exportSvgModule;
    }
  });

  // node_modules/sprotty/lib/features/fade/di.config.js
  var require_di_config13 = __commonJS({
    "node_modules/sprotty/lib/features/fade/di.config.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var inversify_1 = require_inversify();
      var types_1 = require_types();
      var fade_1 = require_fade();
      var fadeModule = new inversify_1.ContainerModule((bind) => {
        bind(types_1.TYPES.IVNodePostprocessor).to(fade_1.ElementFader).inSingletonScope();
      });
      exports.default = fadeModule;
    }
  });

  // node_modules/sprotty/lib/features/hover/popup-position-updater.js
  var require_popup_position_updater = __commonJS({
    "node_modules/sprotty/lib/features/hover/popup-position-updater.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.PopupPositionUpdater = void 0;
      var inversify_1 = require_inversify();
      var types_1 = require_types();
      var PopupPositionUpdater = class PopupPositionUpdater {
        decorate(vnode, element) {
          return vnode;
        }
        postUpdate() {
          const popupDiv = document.getElementById(this.options.popupDiv);
          if (popupDiv !== null && typeof window !== "undefined") {
            const boundingClientRect = popupDiv.getBoundingClientRect();
            if (window.innerHeight < boundingClientRect.height + boundingClientRect.top) {
              popupDiv.style.top = window.pageYOffset + window.innerHeight - boundingClientRect.height - 5 + "px";
            }
            if (window.innerWidth < boundingClientRect.left + boundingClientRect.width) {
              popupDiv.style.left = window.pageXOffset + window.innerWidth - boundingClientRect.width - 5 + "px";
            }
            if (boundingClientRect.left < 0) {
              popupDiv.style.left = "0px";
            }
            if (boundingClientRect.top < 0) {
              popupDiv.style.top = "0px";
            }
          }
        }
      };
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.ViewerOptions),
        __metadata("design:type", Object)
      ], PopupPositionUpdater.prototype, "options", void 0);
      PopupPositionUpdater = __decorate([
        (0, inversify_1.injectable)()
      ], PopupPositionUpdater);
      exports.PopupPositionUpdater = PopupPositionUpdater;
    }
  });

  // node_modules/sprotty/lib/features/hover/di.config.js
  var require_di_config14 = __commonJS({
    "node_modules/sprotty/lib/features/hover/di.config.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var inversify_1 = require_inversify();
      var types_1 = require_types();
      var hover_1 = require_hover();
      var popup_position_updater_1 = require_popup_position_updater();
      var command_registration_1 = require_command_registration();
      var action_handler_1 = require_action_handler();
      var center_fit_1 = require_center_fit();
      var viewport_1 = require_viewport();
      var move_1 = require_move();
      var hoverModule = new inversify_1.ContainerModule((bind, _unbind, isBound) => {
        bind(types_1.TYPES.PopupVNodePostprocessor).to(popup_position_updater_1.PopupPositionUpdater).inSingletonScope();
        bind(hover_1.HoverMouseListener).toSelf().inSingletonScope();
        bind(types_1.TYPES.MouseListener).toService(hover_1.HoverMouseListener);
        bind(hover_1.PopupHoverMouseListener).toSelf().inSingletonScope();
        bind(types_1.TYPES.PopupMouseListener).toService(hover_1.PopupHoverMouseListener);
        bind(hover_1.HoverKeyListener).toSelf().inSingletonScope();
        bind(types_1.TYPES.KeyListener).toService(hover_1.HoverKeyListener);
        bind(types_1.TYPES.HoverState).toConstantValue({
          mouseOverTimer: void 0,
          mouseOutTimer: void 0,
          popupOpen: false,
          previousPopupElement: void 0
        });
        bind(hover_1.ClosePopupActionHandler).toSelf().inSingletonScope();
        const context = { bind, isBound };
        (0, command_registration_1.configureCommand)(context, hover_1.HoverFeedbackCommand);
        (0, command_registration_1.configureCommand)(context, hover_1.SetPopupModelCommand);
        (0, action_handler_1.configureActionHandler)(context, hover_1.SetPopupModelCommand.KIND, hover_1.ClosePopupActionHandler);
        (0, action_handler_1.configureActionHandler)(context, center_fit_1.FitToScreenCommand.KIND, hover_1.ClosePopupActionHandler);
        (0, action_handler_1.configureActionHandler)(context, center_fit_1.CenterCommand.KIND, hover_1.ClosePopupActionHandler);
        (0, action_handler_1.configureActionHandler)(context, viewport_1.SetViewportCommand.KIND, hover_1.ClosePopupActionHandler);
        (0, action_handler_1.configureActionHandler)(context, move_1.MoveCommand.KIND, hover_1.ClosePopupActionHandler);
      });
      exports.default = hoverModule;
    }
  });

  // node_modules/sprotty/lib/features/move/di.config.js
  var require_di_config15 = __commonJS({
    "node_modules/sprotty/lib/features/move/di.config.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var inversify_1 = require_inversify();
      var types_1 = require_types();
      var move_1 = require_move();
      var command_registration_1 = require_command_registration();
      var moveModule = new inversify_1.ContainerModule((bind, _unbind, isBound) => {
        bind(move_1.MoveMouseListener).toSelf().inSingletonScope();
        bind(types_1.TYPES.MouseListener).toService(move_1.MoveMouseListener);
        (0, command_registration_1.configureCommand)({ bind, isBound }, move_1.MoveCommand);
        bind(move_1.LocationPostprocessor).toSelf().inSingletonScope();
        bind(types_1.TYPES.IVNodePostprocessor).toService(move_1.LocationPostprocessor);
        bind(types_1.TYPES.HiddenVNodePostprocessor).toService(move_1.LocationPostprocessor);
      });
      exports.default = moveModule;
    }
  });

  // node_modules/sprotty/lib/features/open/di.config.js
  var require_di_config16 = __commonJS({
    "node_modules/sprotty/lib/features/open/di.config.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var inversify_1 = require_inversify();
      var types_1 = require_types();
      var open_1 = require_open();
      var openModule = new inversify_1.ContainerModule((bind) => {
        bind(open_1.OpenMouseListener).toSelf().inSingletonScope();
        bind(types_1.TYPES.MouseListener).toService(open_1.OpenMouseListener);
      });
      exports.default = openModule;
    }
  });

  // node_modules/sprotty/lib/features/routing/di.config.js
  var require_di_config17 = __commonJS({
    "node_modules/sprotty/lib/features/routing/di.config.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var inversify_1 = require_inversify();
      var types_1 = require_types();
      var manhattan_edge_router_1 = require_manhattan_edge_router();
      var polyline_edge_router_1 = require_polyline_edge_router();
      var manhattan_anchors_1 = require_manhattan_anchors();
      var polyline_anchors_1 = require_polyline_anchors();
      var anchor_1 = require_anchor();
      var routing_1 = require_routing();
      var bezier_edge_router_1 = require_bezier_edge_router();
      var bezier_anchors_1 = require_bezier_anchors();
      var command_registration_1 = require_command_registration();
      var routingModule = new inversify_1.ContainerModule((bind, _unbind, isBound) => {
        bind(routing_1.EdgeRouterRegistry).toSelf().inSingletonScope();
        bind(anchor_1.AnchorComputerRegistry).toSelf().inSingletonScope();
        bind(manhattan_edge_router_1.ManhattanEdgeRouter).toSelf().inSingletonScope();
        bind(types_1.TYPES.IEdgeRouter).toService(manhattan_edge_router_1.ManhattanEdgeRouter);
        bind(types_1.TYPES.IAnchorComputer).to(manhattan_anchors_1.ManhattanEllipticAnchor).inSingletonScope();
        bind(types_1.TYPES.IAnchorComputer).to(manhattan_anchors_1.ManhattanRectangularAnchor).inSingletonScope();
        bind(types_1.TYPES.IAnchorComputer).to(manhattan_anchors_1.ManhattanDiamondAnchor).inSingletonScope();
        bind(polyline_edge_router_1.PolylineEdgeRouter).toSelf().inSingletonScope();
        bind(types_1.TYPES.IEdgeRouter).toService(polyline_edge_router_1.PolylineEdgeRouter);
        bind(types_1.TYPES.IAnchorComputer).to(polyline_anchors_1.EllipseAnchor);
        bind(types_1.TYPES.IAnchorComputer).to(polyline_anchors_1.RectangleAnchor);
        bind(types_1.TYPES.IAnchorComputer).to(polyline_anchors_1.DiamondAnchor);
        bind(bezier_edge_router_1.BezierEdgeRouter).toSelf().inSingletonScope();
        bind(types_1.TYPES.IEdgeRouter).toService(bezier_edge_router_1.BezierEdgeRouter);
        bind(types_1.TYPES.IAnchorComputer).to(bezier_anchors_1.BezierEllipseAnchor);
        bind(types_1.TYPES.IAnchorComputer).to(bezier_anchors_1.BezierRectangleAnchor);
        bind(types_1.TYPES.IAnchorComputer).to(bezier_anchors_1.BezierDiamondAnchor);
        (0, command_registration_1.configureCommand)({ bind, isBound }, bezier_edge_router_1.AddRemoveBezierSegmentCommand);
      });
      exports.default = routingModule;
    }
  });

  // node_modules/sprotty/lib/features/select/di.config.js
  var require_di_config18 = __commonJS({
    "node_modules/sprotty/lib/features/select/di.config.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var inversify_1 = require_inversify();
      var types_1 = require_types();
      var select_1 = require_select();
      var command_registration_1 = require_command_registration();
      var selectModule = new inversify_1.ContainerModule((bind, _unbind, isBound) => {
        (0, command_registration_1.configureCommand)({ bind, isBound }, select_1.SelectCommand);
        (0, command_registration_1.configureCommand)({ bind, isBound }, select_1.SelectAllCommand);
        (0, command_registration_1.configureCommand)({ bind, isBound }, select_1.GetSelectionCommand);
        bind(select_1.SelectKeyboardListener).toSelf().inSingletonScope();
        bind(types_1.TYPES.KeyListener).toService(select_1.SelectKeyboardListener);
        bind(select_1.SelectMouseListener).toSelf().inSingletonScope();
        bind(types_1.TYPES.MouseListener).toService(select_1.SelectMouseListener);
      });
      exports.default = selectModule;
    }
  });

  // node_modules/sprotty/lib/features/undo-redo/di.config.js
  var require_di_config19 = __commonJS({
    "node_modules/sprotty/lib/features/undo-redo/di.config.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var inversify_1 = require_inversify();
      var types_1 = require_types();
      var undo_redo_1 = require_undo_redo();
      var undoRedoModule = new inversify_1.ContainerModule((bind) => {
        bind(undo_redo_1.UndoRedoKeyListener).toSelf().inSingletonScope();
        bind(types_1.TYPES.KeyListener).toService(undo_redo_1.UndoRedoKeyListener);
      });
      exports.default = undoRedoModule;
    }
  });

  // node_modules/sprotty/lib/features/update/di.config.js
  var require_di_config20 = __commonJS({
    "node_modules/sprotty/lib/features/update/di.config.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var inversify_1 = require_inversify();
      var command_registration_1 = require_command_registration();
      var update_model_1 = require_update_model();
      var updateModule = new inversify_1.ContainerModule((bind, _unbind, isBound) => {
        (0, command_registration_1.configureCommand)({ bind, isBound }, update_model_1.UpdateModelCommand);
      });
      exports.default = updateModule;
    }
  });

  // node_modules/sprotty/lib/features/viewport/di.config.js
  var require_di_config21 = __commonJS({
    "node_modules/sprotty/lib/features/viewport/di.config.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var inversify_1 = require_inversify();
      var types_1 = require_types();
      var center_fit_1 = require_center_fit();
      var viewport_1 = require_viewport();
      var scroll_1 = require_scroll();
      var zoom_1 = require_zoom();
      var command_registration_1 = require_command_registration();
      var viewportModule = new inversify_1.ContainerModule((bind, _unbind, isBound) => {
        (0, command_registration_1.configureCommand)({ bind, isBound }, center_fit_1.CenterCommand);
        (0, command_registration_1.configureCommand)({ bind, isBound }, center_fit_1.FitToScreenCommand);
        (0, command_registration_1.configureCommand)({ bind, isBound }, viewport_1.SetViewportCommand);
        (0, command_registration_1.configureCommand)({ bind, isBound }, viewport_1.GetViewportCommand);
        bind(center_fit_1.CenterKeyboardListener).toSelf().inSingletonScope();
        bind(types_1.TYPES.KeyListener).toService(center_fit_1.CenterKeyboardListener);
        bind(scroll_1.ScrollMouseListener).toSelf().inSingletonScope();
        bind(zoom_1.ZoomMouseListener).toSelf().inSingletonScope();
        bind(types_1.TYPES.MouseListener).toService(scroll_1.ScrollMouseListener);
        bind(types_1.TYPES.MouseListener).toService(zoom_1.ZoomMouseListener);
      });
      exports.default = viewportModule;
    }
  });

  // node_modules/sprotty/lib/features/zorder/di.config.js
  var require_di_config22 = __commonJS({
    "node_modules/sprotty/lib/features/zorder/di.config.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var inversify_1 = require_inversify();
      var command_registration_1 = require_command_registration();
      var zorder_1 = require_zorder();
      var zorderModule = new inversify_1.ContainerModule((bind, _unbind, isBound) => {
        (0, command_registration_1.configureCommand)({ bind, isBound }, zorder_1.BringToFrontCommand);
      });
      exports.default = zorderModule;
    }
  });

  // node_modules/sprotty/lib/graph/views.js
  var require_views6 = __commonJS({
    "node_modules/sprotty/lib/graph/views.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SBezierControlHandleView = exports.SBezierCreateHandleView = exports.SCompartmentView = exports.SLabelView = exports.SRoutingHandleView = exports.BezierCurveEdgeView = exports.PolylineEdgeViewWithGapsOnIntersections = exports.JumpingPolylineEdgeView = exports.PolylineEdgeView = exports.SGraphView = void 0;
      var inversify_1 = require_inversify();
      var geometry_1 = require_geometry();
      var model_utils_1 = require_model_utils();
      var vnode_utils_1 = require_vnode_utils();
      var views_1 = require_views();
      var intersection_finder_1 = require_intersection_finder();
      var model_1 = require_model10();
      var model_2 = require_model9();
      var routing_1 = require_routing();
      var views_2 = require_views5();
      var jsx_1 = require_jsx();
      var geometry_2 = require_geometry2();
      var SGraphView2 = class SGraphView {
        render(model, context) {
          const edgeRouting = this.edgeRouterRegistry.routeAllChildren(model);
          const transform = `scale(${model.zoom}) translate(${-model.scroll.x},${-model.scroll.y})`;
          return (0, jsx_1.svg)(
            "svg",
            { "class-sprotty-graph": true },
            (0, jsx_1.svg)("g", { transform }, context.renderChildren(model, { edgeRouting }))
          );
        }
      };
      __decorate([
        (0, inversify_1.inject)(routing_1.EdgeRouterRegistry),
        __metadata("design:type", routing_1.EdgeRouterRegistry)
      ], SGraphView2.prototype, "edgeRouterRegistry", void 0);
      SGraphView2 = __decorate([
        (0, inversify_1.injectable)()
      ], SGraphView2);
      exports.SGraphView = SGraphView2;
      var PolylineEdgeView2 = class PolylineEdgeView extends views_2.RoutableView {
        render(edge, context, args) {
          const route = this.edgeRouterRegistry.route(edge, args);
          if (route.length === 0) {
            return this.renderDanglingEdge("Cannot compute route", edge, context);
          }
          if (!this.isVisible(edge, route, context)) {
            if (edge.children.length === 0) {
              return void 0;
            }
            return (0, jsx_1.svg)("g", null, context.renderChildren(edge, { route }));
          }
          return (0, jsx_1.svg)(
            "g",
            { "class-sprotty-edge": true, "class-mouseover": edge.hoverFeedback },
            this.renderLine(edge, route, context, args),
            this.renderAdditionals(edge, route, context),
            context.renderChildren(edge, { route })
          );
        }
        renderLine(edge, segments, context, args) {
          const firstPoint = segments[0];
          let path = `M ${firstPoint.x},${firstPoint.y}`;
          for (let i = 1; i < segments.length; i++) {
            const p = segments[i];
            path += ` L ${p.x},${p.y}`;
          }
          return (0, jsx_1.svg)("path", { d: path });
        }
        renderAdditionals(edge, segments, context) {
          return [];
        }
        renderDanglingEdge(message, edge, context) {
          return (0, jsx_1.svg)("text", { "class-sprotty-edge-dangling": true, title: message }, "?");
        }
      };
      __decorate([
        (0, inversify_1.inject)(routing_1.EdgeRouterRegistry),
        __metadata("design:type", routing_1.EdgeRouterRegistry)
      ], PolylineEdgeView2.prototype, "edgeRouterRegistry", void 0);
      PolylineEdgeView2 = __decorate([
        (0, inversify_1.injectable)()
      ], PolylineEdgeView2);
      exports.PolylineEdgeView = PolylineEdgeView2;
      var JumpingPolylineEdgeView = class JumpingPolylineEdgeView extends PolylineEdgeView2 {
        constructor() {
          super(...arguments);
          this.jumpOffsetBefore = 5;
          this.jumpOffsetAfter = 5;
          this.skipOffsetBefore = 3;
          this.skipOffsetAfter = 2;
        }
        renderLine(edge, segments, context, args) {
          let path = "";
          for (let i = 0; i < segments.length; i++) {
            const p = segments[i];
            if (i === 0) {
              path = `M ${p.x},${p.y}`;
            }
            if ((0, intersection_finder_1.isIntersectingRoutedPoint)(p)) {
              path += this.intersectionPath(edge, segments, p, args);
            }
            if (i !== 0) {
              path += ` L ${p.x},${p.y}`;
            }
          }
          return (0, jsx_1.svg)("path", { d: path });
        }
        /**
         * Returns a path that takes the intersections into account by drawing a line jump or a gap for intersections on that path.
         */
        intersectionPath(edge, segments, intersectingPoint, args) {
          if (intersectingPoint.intersections.length < 1) {
            return "";
          }
          const segment = this.getLineSegment(edge, intersectingPoint.intersections[0], args, segments);
          const intersections = this.getIntersectionsSortedBySegmentDirection(segment, intersectingPoint);
          let path = "";
          for (const intersection of intersections) {
            const otherLineSegment = this.getOtherLineSegment(edge, intersection, args);
            if (otherLineSegment === void 0) {
              continue;
            }
            const currentLineSegment = this.getLineSegment(edge, intersection, args, segments);
            const intersectionPoint = intersection.intersectionPoint;
            if (this.shouldDrawLineJumpOnIntersection(currentLineSegment, otherLineSegment)) {
              path += this.createJumpPath(intersectionPoint, currentLineSegment);
            } else if (this.shouldDrawLineGapOnIntersection(currentLineSegment, otherLineSegment)) {
              path += this.createGapPath(intersectionPoint, currentLineSegment);
            }
          }
          return path;
        }
        /**
         * Returns the intersections sorted by the direction of the `lineSegment`.
         *
         * The coordinate system goes from left to right and top to bottom.
         * Thus, x increases to the right and y increases downwards.
         *
         * We need to draw the intersections in the order of the direction of the line segment.
         * To draw a line pointing north, we need to order intersections by Y in a descending order.
         * To draw a line pointing south, we need to order intersections by Y in an ascending order.
         */
        getIntersectionsSortedBySegmentDirection(lineSegment, intersectingPoint) {
          switch (lineSegment.direction) {
            case "north":
            case "north-east":
              return intersectingPoint.intersections.sort(intersection_finder_1.BY_X_THEN_DESCENDING_Y);
            case "south":
            case "south-east":
            case "east":
              return intersectingPoint.intersections.sort(intersection_finder_1.BY_X_THEN_Y);
            case "south-west":
            case "west":
              return intersectingPoint.intersections.sort(intersection_finder_1.BY_DESCENDING_X_THEN_Y);
            case "north-west":
              return intersectingPoint.intersections.sort(intersection_finder_1.BY_DESCENDING_X_THEN_DESCENDING_Y);
          }
        }
        /**
         * Whether or not to draw a line jump on an intersection for the `currentLineSegment`.
         * This should usually be inverse of `shouldDrawLineGapOnIntersection()`.
         */
        shouldDrawLineJumpOnIntersection(currentLineSegment, otherLineSegment) {
          return Math.abs(currentLineSegment.slopeOrMax) < Math.abs(otherLineSegment.slopeOrMax);
        }
        /**
         * Whether or not to draw a line gap on an intersection for the `currentLineSegment`.
         * This should usually be inverse of `shouldDrawLineJumpOnIntersection()`.
         */
        shouldDrawLineGapOnIntersection(currentLineSegment, otherLineSegment) {
          return !this.shouldDrawLineJumpOnIntersection(currentLineSegment, otherLineSegment);
        }
        getLineSegment(edge, intersection, args, segments) {
          const route = segments ? segments : this.edgeRouterRegistry.route(edge, args);
          const index = intersection.routable1 === edge.id ? intersection.segmentIndex1 : intersection.segmentIndex2;
          return new geometry_2.PointToPointLine(route[index], route[index + 1]);
        }
        getOtherLineSegment(currentEdge, intersection, args) {
          const otherEdgeId = intersection.routable1 === currentEdge.id ? intersection.routable2 : intersection.routable1;
          const otherEdge = currentEdge.index.getById(otherEdgeId);
          if (!(otherEdge instanceof model_2.SRoutableElement)) {
            return void 0;
          }
          return this.getLineSegment(otherEdge, intersection, args);
        }
        createJumpPath(intersectionPoint, lineSegment) {
          const anchorBefore = geometry_1.Point.shiftTowards(intersectionPoint, lineSegment.p1, this.jumpOffsetBefore);
          const anchorAfter = geometry_1.Point.shiftTowards(intersectionPoint, lineSegment.p2, this.jumpOffsetAfter);
          const rotation = lineSegment.p1.x < lineSegment.p2.x ? 1 : 0;
          return ` L ${anchorBefore.x},${anchorBefore.y} A 1,1 0,0 ${rotation} ${anchorAfter.x},${anchorAfter.y}`;
        }
        createGapPath(intersectionPoint, lineSegment) {
          let offsetBefore;
          let offsetAfter;
          if (intersectionPoint.y < lineSegment.p1.y) {
            offsetBefore = -this.skipOffsetBefore;
            offsetAfter = this.jumpOffsetAfter + this.skipOffsetAfter;
          } else {
            offsetBefore = this.jumpOffsetBefore + this.skipOffsetAfter;
            offsetAfter = -this.skipOffsetBefore;
          }
          const anchorBefore = geometry_1.Point.shiftTowards(intersectionPoint, lineSegment.p1, offsetBefore);
          const anchorAfter = geometry_1.Point.shiftTowards(intersectionPoint, lineSegment.p2, offsetAfter);
          return ` L ${anchorBefore.x},${anchorBefore.y} M ${anchorAfter.x},${anchorAfter.y}`;
        }
      };
      JumpingPolylineEdgeView = __decorate([
        (0, inversify_1.injectable)()
      ], JumpingPolylineEdgeView);
      exports.JumpingPolylineEdgeView = JumpingPolylineEdgeView;
      var PolylineEdgeViewWithGapsOnIntersections = class PolylineEdgeViewWithGapsOnIntersections extends JumpingPolylineEdgeView {
        constructor() {
          super(...arguments);
          this.skipOffsetBefore = 3;
          this.skipOffsetAfter = 3;
        }
        shouldDrawLineJumpOnIntersection(currentLineSegment, otherLineSegment) {
          return false;
        }
        shouldDrawLineGapOnIntersection(currentLineSegment, otherLineSegment) {
          return Math.abs(currentLineSegment.slopeOrMax) >= Math.abs(otherLineSegment.slopeOrMax);
        }
        createGapPath(intersectionPoint, lineSegment) {
          const anchorBefore = geometry_1.Point.shiftTowards(intersectionPoint, lineSegment.p1, this.skipOffsetBefore);
          const anchorAfter = geometry_1.Point.shiftTowards(intersectionPoint, lineSegment.p2, this.skipOffsetAfter);
          return ` L ${anchorBefore.x},${anchorBefore.y} M ${anchorAfter.x},${anchorAfter.y}`;
        }
      };
      PolylineEdgeViewWithGapsOnIntersections = __decorate([
        (0, inversify_1.injectable)()
      ], PolylineEdgeViewWithGapsOnIntersections);
      exports.PolylineEdgeViewWithGapsOnIntersections = PolylineEdgeViewWithGapsOnIntersections;
      var BezierCurveEdgeView = class BezierCurveEdgeView extends views_2.RoutableView {
        render(edge, context, args) {
          const route = this.edgeRouterRegistry.route(edge, args);
          if (route.length === 0) {
            return this.renderDanglingEdge("Cannot compute route", edge, context);
          }
          if (!this.isVisible(edge, route, context)) {
            if (edge.children.length === 0) {
              return void 0;
            }
            return (0, jsx_1.svg)("g", null, context.renderChildren(edge, { route }));
          }
          return (0, jsx_1.svg)(
            "g",
            { "class-sprotty-edge": true, "class-mouseover": edge.hoverFeedback },
            this.renderLine(edge, route, context, args),
            this.renderAdditionals(edge, route, context),
            context.renderChildren(edge, { route })
          );
        }
        renderLine(edge, segments, context, args) {
          let path = "";
          if (segments.length >= 4) {
            path += this.buildMainSegment(segments);
            const pointsLeft = segments.length - 4;
            if (pointsLeft > 0 && pointsLeft % 3 === 0) {
              for (let i = 4; i < segments.length; i += 3) {
                path += this.addSpline(segments, i);
              }
            }
          }
          return (0, jsx_1.svg)("path", { d: path });
        }
        buildMainSegment(segments) {
          const s = segments[0];
          const h1 = segments[1];
          const h2 = segments[2];
          const t = segments[3];
          return `M${s.x},${s.y} C${h1.x},${h1.y} ${h2.x},${h2.y} ${t.x},${t.y}`;
        }
        addSpline(segments, index) {
          const c = segments[index + 1];
          const p = segments[index + 2];
          return ` S${c.x},${c.y} ${p.x},${p.y}`;
        }
        renderAdditionals(edge, segments, context) {
          return [];
        }
        renderDanglingEdge(message, edge, context) {
          return (0, jsx_1.svg)("text", { "class-sprotty-edge-dangling": true, title: message }, "?");
        }
      };
      __decorate([
        (0, inversify_1.inject)(routing_1.EdgeRouterRegistry),
        __metadata("design:type", routing_1.EdgeRouterRegistry)
      ], BezierCurveEdgeView.prototype, "edgeRouterRegistry", void 0);
      BezierCurveEdgeView = __decorate([
        (0, inversify_1.injectable)()
      ], BezierCurveEdgeView);
      exports.BezierCurveEdgeView = BezierCurveEdgeView;
      var SRoutingHandleView = class SRoutingHandleView {
        constructor() {
          this.minimalPointDistance = 10;
        }
        render(handle, context, args) {
          if (args && args.route) {
            if (handle.parent instanceof model_2.SRoutableElement) {
              const router = this.edgeRouterRegistry.get(handle.parent.routerKind);
              const theRoute = args.route === void 0 ? this.edgeRouterRegistry.route(handle.parent, args) : args.route;
              const position = router.getHandlePosition(handle.parent, theRoute, handle);
              if (position !== void 0) {
                const node = (0, jsx_1.svg)("circle", { "class-sprotty-routing-handle": true, "class-selected": handle.selected, "class-mouseover": handle.hoverFeedback, cx: position.x, cy: position.y, r: this.getRadius() });
                (0, vnode_utils_1.setAttr)(node, "data-kind", handle.kind);
                return node;
              }
            }
          }
          return (0, jsx_1.svg)("g", null);
        }
        getRadius() {
          return 7;
        }
      };
      __decorate([
        (0, inversify_1.inject)(routing_1.EdgeRouterRegistry),
        __metadata("design:type", routing_1.EdgeRouterRegistry)
      ], SRoutingHandleView.prototype, "edgeRouterRegistry", void 0);
      SRoutingHandleView = __decorate([
        (0, inversify_1.injectable)()
      ], SRoutingHandleView);
      exports.SRoutingHandleView = SRoutingHandleView;
      var SLabelView = class SLabelView extends views_1.ShapeView {
        render(label, context) {
          if (!(0, model_1.isEdgeLayoutable)(label) && !this.isVisible(label, context)) {
            return void 0;
          }
          const vnode = (0, jsx_1.svg)("text", { "class-sprotty-label": true }, label.text);
          const subType = (0, model_utils_1.getSubType)(label);
          if (subType) {
            (0, vnode_utils_1.setAttr)(vnode, "class", subType);
          }
          return vnode;
        }
      };
      SLabelView = __decorate([
        (0, inversify_1.injectable)()
      ], SLabelView);
      exports.SLabelView = SLabelView;
      var SCompartmentView = class SCompartmentView {
        render(compartment, context, args) {
          const translate = `translate(${compartment.bounds.x}, ${compartment.bounds.y})`;
          const vnode = (0, jsx_1.svg)("g", { transform: translate, "class-sprotty-comp": "{true}" }, context.renderChildren(compartment));
          const subType = (0, model_utils_1.getSubType)(compartment);
          if (subType)
            (0, vnode_utils_1.setAttr)(vnode, "class", subType);
          return vnode;
        }
      };
      SCompartmentView = __decorate([
        (0, inversify_1.injectable)()
      ], SCompartmentView);
      exports.SCompartmentView = SCompartmentView;
      var SBezierCreateHandleView = class SBezierCreateHandleView extends SRoutingHandleView {
        render(handle, context, args) {
          if (args) {
            const theRoute = args.route;
            if (theRoute && handle.parent instanceof model_2.SRoutableElement) {
              const router = this.edgeRouterRegistry.get(handle.parent.routerKind);
              const position = router.getHandlePosition(handle.parent, theRoute, handle);
              if (position !== void 0) {
                const translation = "translate(" + position.x + ", " + position.y + ")";
                const textOffsetX = -5.5;
                const textOffsetY = 5.5;
                const text = handle.kind === "bezier-add" ? "+" : "-";
                const node = (0, jsx_1.svg)(
                  "g",
                  { transform: translation, "class-sprotty-routing-handle": true, "class-selected": handle.selected, "class-mouseover": handle.hoverFeedback },
                  (0, jsx_1.svg)("circle", { r: this.getRadius() }),
                  (0, jsx_1.svg)("text", { x: textOffsetX, y: textOffsetY, "attrs-text-align": "middle", "style-font-family": "monospace", "style-pointer-events": "none", "style-fill": "white" }, text)
                );
                (0, vnode_utils_1.setAttr)(node, "data-kind", handle.kind);
                return node;
              }
            }
          }
          return (0, jsx_1.svg)("g", null);
        }
      };
      SBezierCreateHandleView = __decorate([
        (0, inversify_1.injectable)()
      ], SBezierCreateHandleView);
      exports.SBezierCreateHandleView = SBezierCreateHandleView;
      var SBezierControlHandleView = class SBezierControlHandleView extends SRoutingHandleView {
        render(handle, context, args) {
          if (args) {
            const theRoute = args.route;
            if (theRoute && handle.parent instanceof model_2.SRoutableElement) {
              const router = this.edgeRouterRegistry.get(handle.parent.routerKind);
              const position = router.getHandlePosition(handle.parent, theRoute, handle);
              if (position !== void 0) {
                let pathEndPos;
                for (let i = 0; i < theRoute.length; i++) {
                  const elem = theRoute[i];
                  if (elem.kind === position.kind && elem.pointIndex === position.pointIndex) {
                    if (handle.kind === "bezier-control-before") {
                      pathEndPos = theRoute[i + 1];
                    } else {
                      pathEndPos = theRoute[i - 1];
                    }
                    break;
                  }
                }
                let node;
                if (pathEndPos) {
                  const coords = `M ${position.x}, ${position.y} L ${pathEndPos.x}, ${pathEndPos.y}`;
                  node = (0, jsx_1.svg)(
                    "g",
                    { "class-sprotty-routing-handle": true, "class-selected": handle.selected, "class-mouseover": handle.hoverFeedback },
                    (0, jsx_1.svg)("path", { d: coords, stroke: "grey", "style-stroke-width": "2px" }),
                    (0, jsx_1.svg)("circle", { cx: position.x, cy: position.y, r: this.getRadius() })
                  );
                } else {
                  node = (0, jsx_1.svg)("circle", { "class-sprotty-routing-handle": true, "class-selected": handle.selected, "class-mouseover": handle.hoverFeedback, cx: position.x, cy: position.y, r: this.getRadius() });
                }
                (0, vnode_utils_1.setAttr)(node, "data-kind", handle.kind);
                return node;
              }
            }
          }
          return (0, jsx_1.svg)("g", null);
        }
      };
      SBezierControlHandleView = __decorate([
        (0, inversify_1.injectable)()
      ], SBezierControlHandleView);
      exports.SBezierControlHandleView = SBezierControlHandleView;
    }
  });

  // node_modules/sprotty/lib/model-source/di.config.js
  var require_di_config23 = __commonJS({
    "node_modules/sprotty/lib/model-source/di.config.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var inversify_1 = require_inversify();
      var command_registration_1 = require_command_registration();
      var types_1 = require_types();
      var commit_model_1 = require_commit_model();
      var model_source_1 = require_model_source();
      var modelSourceModule = new inversify_1.ContainerModule((bind, _unbind, isBound) => {
        bind(types_1.TYPES.ModelSourceProvider).toProvider((context) => {
          return () => {
            return new Promise((resolve) => {
              resolve(context.container.get(types_1.TYPES.ModelSource));
            });
          };
        });
        (0, command_registration_1.configureCommand)({ bind, isBound }, commit_model_1.CommitModelCommand);
        bind(types_1.TYPES.IActionHandlerInitializer).toService(types_1.TYPES.ModelSource);
        bind(model_source_1.ComputedBoundsApplicator).toSelf().inSingletonScope();
      });
      exports.default = modelSourceModule;
    }
  });

  // node_modules/sprotty/lib/lib/modules.js
  var require_modules = __commonJS({
    "node_modules/sprotty/lib/lib/modules.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.loadDefaultModules = void 0;
      var di_config_1 = __importDefault(require_di_config());
      var di_config_2 = __importDefault(require_di_config23());
      var di_config_3 = __importDefault(require_di_config5());
      var di_config_4 = __importDefault(require_di_config6());
      var di_config_5 = __importDefault(require_di_config7());
      var di_config_6 = __importDefault(require_di_config8());
      var di_config_7 = __importDefault(require_di_config9());
      var di_config_8 = __importDefault(require_di_config2());
      var di_config_9 = require_di_config3();
      var di_config_10 = __importDefault(require_di_config11());
      var di_config_11 = __importDefault(require_di_config12());
      var di_config_12 = __importDefault(require_di_config13());
      var di_config_13 = __importDefault(require_di_config14());
      var di_config_14 = __importDefault(require_di_config15());
      var di_config_15 = __importDefault(require_di_config16());
      var di_config_16 = __importDefault(require_di_config17());
      var di_config_17 = __importDefault(require_di_config18());
      var di_config_18 = __importDefault(require_di_config19());
      var di_config_19 = __importDefault(require_di_config20());
      var di_config_20 = __importDefault(require_di_config21());
      var di_config_21 = __importDefault(require_di_config22());
      function loadDefaultModules2(container, options) {
        const modules = [
          di_config_1.default,
          di_config_2.default,
          di_config_3.default,
          di_config_4.default,
          di_config_5.default,
          di_config_6.default,
          di_config_7.default,
          di_config_9.edgeEditModule,
          di_config_8.default,
          di_config_10.default,
          di_config_11.default,
          di_config_12.default,
          di_config_13.default,
          di_config_9.labelEditModule,
          di_config_9.labelEditUiModule,
          di_config_14.default,
          di_config_15.default,
          di_config_16.default,
          di_config_17.default,
          di_config_18.default,
          di_config_19.default,
          di_config_20.default,
          di_config_21.default
        ];
        if (options && options.exclude) {
          for (const mod of options.exclude) {
            const index = modules.indexOf(mod);
            if (index >= 0)
              modules.splice(index, 1);
          }
        }
        container.load(...modules);
      }
      exports.loadDefaultModules = loadDefaultModules2;
    }
  });

  // node_modules/sprotty/lib/lib/virtualize.js
  var require_virtualize = __commonJS({
    "node_modules/sprotty/lib/lib/virtualize.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var snabbdom_1 = require_snabbdom_cjs();
      function buildVNodeData(attrs) {
        const data = {};
        const addData = (memo, name) => {
          if (name !== "style" && name !== "class") {
            const val = unescapeEntities(attrs[name]);
            memo ? memo[name] = val : memo = { [name]: val };
          }
          return memo;
        };
        const _attrs = Object.keys(attrs).reduce(addData, null);
        if (_attrs) {
          data.attrs = _attrs;
        }
        const style = parseStyle(attrs);
        if (style) {
          data.style = style;
        }
        const classes = parseClass(attrs);
        if (classes) {
          data.class = classes;
        }
        return data;
      }
      function parseStyle(attrs) {
        const addStyle = (memo, styleProp) => {
          const res = styleProp.split(":");
          const name = transformName(res[0].trim());
          if (name) {
            const val = res[1].replace("!important", "").trim();
            memo ? memo[name] = val : memo = { [name]: val };
          }
          return memo;
        };
        try {
          return attrs.style.split(";").reduce(addStyle, null);
        } catch (e) {
          return null;
        }
      }
      function parseClass(attrs) {
        const addClass = (memo, className) => {
          className = className.trim();
          if (className) {
            memo ? memo[className] = true : memo = { [className]: true };
          }
          return memo;
        };
        try {
          return attrs.class.split(" ").reduce(addClass, null);
        } catch (e) {
          return null;
        }
      }
      function transformName(name) {
        name = name.replace(/-(\w)/g, function _replace($1, $2) {
          return $2.toUpperCase();
        });
        const firstChar = name.charAt(0).toLowerCase();
        return `${firstChar}${name.substring(1)}`;
      }
      var entityRegex = new RegExp("&[a-z0-9#]+;", "gi");
      var el = null;
      function unescapeEntities(text) {
        if (!el) {
          el = document.createElement("div");
        }
        return text.replace(entityRegex, (entity) => {
          if (el === null)
            return "";
          el.innerHTML = entity;
          return el.textContent === null ? "" : el.textContent;
        });
      }
      function recurse(doc, func) {
        let node = doc;
        let parent = null;
        const stack = [];
        const setChild = (n) => {
          const child = n.firstChild;
          if (child !== null) {
            parent = n;
          }
          node = child;
        };
        func(node, parent);
        setChild(node);
        while (true) {
          while (node) {
            stack.push(node);
            func(node, parent);
            setChild(node);
          }
          const _node = stack.pop();
          node = _node ? _node : null;
          if (!stack.length)
            break;
          parent = stack[stack.length - 1];
          if (node) {
            const sibling = node.nextSibling;
            if (sibling == null) {
              parent = stack[stack.length - 1];
            }
            node = sibling;
          }
        }
      }
      var vdom = null;
      var vnodeMap = /* @__PURE__ */ new Map();
      var delimited = false;
      function toVNode(node, parent) {
        let current;
        if (parent !== null) {
          current = vnodeMap.get(parent);
        }
        switch (node === null || node === void 0 ? void 0 : node.nodeType) {
          case 1: {
            if (current === void 0)
              return;
            current.children = current.children ? current.children : [];
            const children = current.children;
            const attributes = node.attributes;
            const attrs = {};
            for (let i = 0; i < attributes.length; i++) {
              const attr = attributes.item(i);
              if (attr) {
                attrs[attr.name] = attr.value;
              }
            }
            const vn = (0, snabbdom_1.h)(node.nodeName, buildVNodeData(attrs));
            children.push(vn);
            vnodeMap.set(node, vn);
            break;
          }
          case 3: {
            const text = node.textContent;
            if (text !== null && current !== void 0) {
              current.children = current.children ? current.children : [];
              const children = current.children;
              const lastData = children.length > 0 ? children[children.length - 1] : null;
              if (!delimited && typeof lastData !== "string" && lastData !== null && lastData.sel === void 0) {
                lastData.text = lastData.text + text;
              } else {
                children.push((0, snabbdom_1.vnode)(void 0, void 0, void 0, text, void 0));
              }
              delimited = false;
            }
            break;
          }
          case 8: {
            delimited = true;
            break;
          }
          case 9: {
            vdom = (0, snabbdom_1.vnode)(void 0, void 0, [], void 0, void 0);
            vnodeMap.set(node, vdom);
            break;
          }
          default:
            break;
        }
      }
      function stripVNode(vnodes) {
        const children = vnodes === null || vnodes === void 0 ? void 0 : vnodes.children;
        if (typeof children === "undefined")
          return null;
        if (children.length === 1 && typeof children[0] !== "string")
          return children[0];
        return null;
      }
      function virtualizeString(html) {
        var _a, _b;
        const parser = new window.DOMParser();
        if (parser === void 0 || html === void 0 || html === "")
          return null;
        const doc = parser.parseFromString(html, "application/xml");
        if (((_a = doc === null || doc === void 0 ? void 0 : doc.firstChild) === null || _a === void 0 ? void 0 : _a.nodeName) === "parsererror") {
          const error = `${(_b = doc === null || doc === void 0 ? void 0 : doc.firstChild) === null || _b === void 0 ? void 0 : _b.textContent}`;
          return (0, snabbdom_1.h)("parsererror", [error]);
        }
        delimited = false;
        vdom = null;
        recurse(doc, toVNode);
        if (vdom === null)
          return null;
        return stripVNode(vdom);
      }
      exports.default = virtualizeString;
    }
  });

  // node_modules/sprotty/lib/lib/model.js
  var require_model18 = __commonJS({
    "node_modules/sprotty/lib/lib/model.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ForeignObjectElement = exports.ShapedPreRenderedElement = exports.PreRenderedElement = exports.HtmlRoot = exports.RectangularPort = exports.CircularPort = exports.DiamondNode = exports.RectangularNode = exports.CircularNode = void 0;
      var geometry_1 = require_geometry();
      var smodel_1 = require_smodel();
      var model_1 = require_model2();
      var model_2 = require_model8();
      var model_3 = require_model6();
      var sgraph_1 = require_sgraph();
      var anchor_1 = require_anchor();
      var CircularNode = class extends sgraph_1.SNode {
        get anchorKind() {
          return anchor_1.ELLIPTIC_ANCHOR_KIND;
        }
      };
      exports.CircularNode = CircularNode;
      var RectangularNode2 = class extends sgraph_1.SNode {
        get anchorKind() {
          return anchor_1.RECTANGULAR_ANCHOR_KIND;
        }
      };
      exports.RectangularNode = RectangularNode2;
      var DiamondNode = class extends sgraph_1.SNode {
        get anchorKind() {
          return anchor_1.DIAMOND_ANCHOR_KIND;
        }
      };
      exports.DiamondNode = DiamondNode;
      var CircularPort = class extends sgraph_1.SPort {
        get anchorKind() {
          return anchor_1.ELLIPTIC_ANCHOR_KIND;
        }
      };
      exports.CircularPort = CircularPort;
      var RectangularPort = class extends sgraph_1.SPort {
        get anchorKind() {
          return anchor_1.RECTANGULAR_ANCHOR_KIND;
        }
      };
      exports.RectangularPort = RectangularPort;
      var HtmlRoot = class extends smodel_1.SModelRoot {
        constructor() {
          super(...arguments);
          this.classes = [];
        }
      };
      exports.HtmlRoot = HtmlRoot;
      var PreRenderedElement = class extends smodel_1.SChildElement {
      };
      exports.PreRenderedElement = PreRenderedElement;
      var ShapedPreRenderedElement = class extends PreRenderedElement {
        constructor() {
          super(...arguments);
          this.position = geometry_1.Point.ORIGIN;
          this.size = geometry_1.Dimension.EMPTY;
          this.selected = false;
          this.alignment = geometry_1.Point.ORIGIN;
        }
        get bounds() {
          return {
            x: this.position.x,
            y: this.position.y,
            width: this.size.width,
            height: this.size.height
          };
        }
        set bounds(newBounds) {
          this.position = {
            x: newBounds.x,
            y: newBounds.y
          };
          this.size = {
            width: newBounds.width,
            height: newBounds.height
          };
        }
      };
      exports.ShapedPreRenderedElement = ShapedPreRenderedElement;
      ShapedPreRenderedElement.DEFAULT_FEATURES = [model_2.moveFeature, model_1.boundsFeature, model_3.selectFeature, model_1.alignFeature];
      var ForeignObjectElement = class extends ShapedPreRenderedElement {
        get bounds() {
          if (geometry_1.Dimension.isValid(this.size)) {
            return {
              x: this.position.x,
              y: this.position.y,
              width: this.size.width,
              height: this.size.height
            };
          } else if ((0, model_1.isBoundsAware)(this.parent)) {
            return {
              x: this.position.x,
              y: this.position.y,
              width: this.parent.bounds.width,
              height: this.parent.bounds.height
            };
          }
          return geometry_1.Bounds.EMPTY;
        }
      };
      exports.ForeignObjectElement = ForeignObjectElement;
    }
  });

  // node_modules/sprotty/lib/lib/generic-views.js
  var require_generic_views = __commonJS({
    "node_modules/sprotty/lib/lib/generic-views.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ForeignObjectView = exports.PreRenderedView = void 0;
      var jsx_1 = require_jsx();
      var inversify_1 = require_inversify();
      var virtualize_1 = __importDefault(require_virtualize());
      var vnode_utils_1 = require_vnode_utils();
      var views_1 = require_views();
      var model_1 = require_model18();
      var PreRenderedView = class PreRenderedView extends views_1.ShapeView {
        render(model, context) {
          if (model instanceof model_1.ShapedPreRenderedElement && !this.isVisible(model, context)) {
            return void 0;
          }
          const node = (0, virtualize_1.default)(model.code);
          if (node === null)
            return void 0;
          this.correctNamespace(node);
          return node;
        }
        correctNamespace(node) {
          if (node.sel === "svg" || node.sel === "g")
            (0, vnode_utils_1.setNamespace)(node, "http://www.w3.org/2000/svg");
        }
      };
      PreRenderedView = __decorate([
        (0, inversify_1.injectable)()
      ], PreRenderedView);
      exports.PreRenderedView = PreRenderedView;
      var ForeignObjectView = class ForeignObjectView {
        render(model, context) {
          const foreignObjectContents = (0, virtualize_1.default)(model.code);
          if (foreignObjectContents === null)
            return void 0;
          const node = (0, jsx_1.svg)(
            "g",
            null,
            (0, jsx_1.svg)("foreignObject", { requiredFeatures: "http://www.w3.org/TR/SVG11/feature#Extensibility", height: model.bounds.height, width: model.bounds.width, x: 0, y: 0 }, foreignObjectContents),
            context.renderChildren(model)
          );
          (0, vnode_utils_1.setAttr)(node, "class", model.type);
          (0, vnode_utils_1.setNamespace)(foreignObjectContents, model.namespace);
          return node;
        }
      };
      ForeignObjectView = __decorate([
        (0, inversify_1.injectable)()
      ], ForeignObjectView);
      exports.ForeignObjectView = ForeignObjectView;
    }
  });

  // node_modules/sprotty/lib/lib/html-views.js
  var require_html_views = __commonJS({
    "node_modules/sprotty/lib/lib/html-views.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.HtmlRootView = void 0;
      var jsx_1 = require_jsx();
      var inversify_1 = require_inversify();
      var vnode_utils_1 = require_vnode_utils();
      var HtmlRootView = class HtmlRootView {
        render(model, context) {
          const root = (0, jsx_1.html)("div", null, context.renderChildren(model));
          for (const c of model.classes) {
            (0, vnode_utils_1.setClass)(root, c, true);
          }
          return root;
        }
      };
      HtmlRootView = __decorate([
        (0, inversify_1.injectable)()
      ], HtmlRootView);
      exports.HtmlRootView = HtmlRootView;
    }
  });

  // node_modules/file-saver/dist/FileSaver.min.js
  var require_FileSaver_min = __commonJS({
    "node_modules/file-saver/dist/FileSaver.min.js"(exports, module) {
      (function(a, b) {
        if ("function" == typeof define && define.amd)
          define([], b);
        else if ("undefined" != typeof exports)
          b();
        else {
          b(), a.FileSaver = { exports: {} }.exports;
        }
      })(exports, function() {
        "use strict";
        function b(a2, b2) {
          return "undefined" == typeof b2 ? b2 = { autoBom: false } : "object" != typeof b2 && (console.warn("Deprecated: Expected third argument to be a object"), b2 = { autoBom: !b2 }), b2.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a2.type) ? new Blob(["\uFEFF", a2], { type: a2.type }) : a2;
        }
        function c(a2, b2, c2) {
          var d2 = new XMLHttpRequest();
          d2.open("GET", a2), d2.responseType = "blob", d2.onload = function() {
            g(d2.response, b2, c2);
          }, d2.onerror = function() {
            console.error("could not download file");
          }, d2.send();
        }
        function d(a2) {
          var b2 = new XMLHttpRequest();
          b2.open("HEAD", a2, false);
          try {
            b2.send();
          } catch (a3) {
          }
          return 200 <= b2.status && 299 >= b2.status;
        }
        function e(a2) {
          try {
            a2.dispatchEvent(new MouseEvent("click"));
          } catch (c2) {
            var b2 = document.createEvent("MouseEvents");
            b2.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null), a2.dispatchEvent(b2);
          }
        }
        var f = "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof global && global.global === global ? global : void 0, a = f.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent), g = f.saveAs || ("object" != typeof window || window !== f ? function() {
        } : "download" in HTMLAnchorElement.prototype && !a ? function(b2, g2, h) {
          var i = f.URL || f.webkitURL, j = document.createElement("a");
          g2 = g2 || b2.name || "download", j.download = g2, j.rel = "noopener", "string" == typeof b2 ? (j.href = b2, j.origin === location.origin ? e(j) : d(j.href) ? c(b2, g2, h) : e(j, j.target = "_blank")) : (j.href = i.createObjectURL(b2), setTimeout(function() {
            i.revokeObjectURL(j.href);
          }, 4e4), setTimeout(function() {
            e(j);
          }, 0));
        } : "msSaveOrOpenBlob" in navigator ? function(f2, g2, h) {
          if (g2 = g2 || f2.name || "download", "string" != typeof f2)
            navigator.msSaveOrOpenBlob(b(f2, h), g2);
          else if (d(f2))
            c(f2, g2, h);
          else {
            var i = document.createElement("a");
            i.href = f2, i.target = "_blank", setTimeout(function() {
              e(i);
            });
          }
        } : function(b2, d2, e2, g2) {
          if (g2 = g2 || open("", "_blank"), g2 && (g2.document.title = g2.document.body.innerText = "downloading..."), "string" == typeof b2)
            return c(b2, d2, e2);
          var h = "application/octet-stream" === b2.type, i = /constructor/i.test(f.HTMLElement) || f.safari, j = /CriOS\/[\d]+/.test(navigator.userAgent);
          if ((j || h && i || a) && "undefined" != typeof FileReader) {
            var k = new FileReader();
            k.onloadend = function() {
              var a2 = k.result;
              a2 = j ? a2 : a2.replace(/^data:[^;]*;/, "data:attachment/file;"), g2 ? g2.location.href = a2 : location = a2, g2 = null;
            }, k.readAsDataURL(b2);
          } else {
            var l = f.URL || f.webkitURL, m = l.createObjectURL(b2);
            g2 ? g2.location = m : location.href = m, g2 = null, setTimeout(function() {
              l.revokeObjectURL(m);
            }, 4e4);
          }
        });
        f.saveAs = g.saveAs = g, "undefined" != typeof module && (module.exports = g);
      });
    }
  });

  // node_modules/sprotty/lib/model-source/diagram-server.js
  var require_diagram_server2 = __commonJS({
    "node_modules/sprotty/lib/model-source/diagram-server.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.DiagramServer = exports.DiagramServerProxy = exports.ServerStatusAction = exports.isActionMessage = void 0;
      var file_saver_1 = require_FileSaver_min();
      var inversify_1 = require_inversify();
      var sprotty_protocol_1 = require_lib();
      var actions_1 = require_actions();
      var object_1 = require_object();
      var set_model_1 = require_set_model();
      var types_1 = require_types();
      var bounds_manipulation_1 = require_bounds_manipulation();
      var svg_exporter_1 = require_svg_exporter();
      var update_model_1 = require_update_model();
      var model_source_1 = require_model_source();
      function isActionMessage(object) {
        return (0, object_1.hasOwnProperty)(object, "action");
      }
      exports.isActionMessage = isActionMessage;
      var ServerStatusAction = class {
        constructor() {
          this.kind = ServerStatusAction.KIND;
        }
      };
      exports.ServerStatusAction = ServerStatusAction;
      ServerStatusAction.KIND = "serverStatus";
      var receivedFromServerProperty = "__receivedFromServer";
      var DiagramServerProxy = class DiagramServerProxy extends model_source_1.ModelSource {
        constructor() {
          super(...arguments);
          this.currentRoot = {
            type: "NONE",
            id: "ROOT"
          };
        }
        initialize(registry) {
          super.initialize(registry);
          registry.register(actions_1.ComputedBoundsAction.KIND, this);
          registry.register(bounds_manipulation_1.RequestBoundsCommand.KIND, this);
          registry.register(actions_1.RequestPopupModelAction.KIND, this);
          registry.register(actions_1.CollapseExpandAction.KIND, this);
          registry.register(actions_1.CollapseExpandAllAction.KIND, this);
          registry.register(sprotty_protocol_1.OpenAction.KIND, this);
          registry.register(ServerStatusAction.KIND, this);
          if (!this.clientId)
            this.clientId = this.viewerOptions.baseDiv;
        }
        handle(action) {
          const forwardToServer = this.handleLocally(action);
          if (forwardToServer)
            this.forwardToServer(action);
        }
        forwardToServer(action) {
          const message = {
            clientId: this.clientId,
            action
          };
          this.logger.log(this, "sending", message);
          this.sendMessage(message);
        }
        messageReceived(data) {
          const object = typeof data === "string" ? JSON.parse(data) : data;
          if (isActionMessage(object) && object.action) {
            if (!object.clientId || object.clientId === this.clientId) {
              object.action[receivedFromServerProperty] = true;
              this.logger.log(this, "receiving", object);
              this.actionDispatcher.dispatch(object.action).then(() => {
                this.storeNewModel(object.action);
              });
            }
          } else {
            this.logger.error(this, "received data is not an action message", object);
          }
        }
        /**
         * Check whether the given action should be handled locally. Returns true if the action should
         * still be sent to the server, and false if it's only handled locally.
         */
        handleLocally(action) {
          this.storeNewModel(action);
          switch (action.kind) {
            case actions_1.ComputedBoundsAction.KIND:
              return this.handleComputedBounds(action);
            case actions_1.RequestModelAction.KIND:
              return this.handleRequestModel(action);
            case bounds_manipulation_1.RequestBoundsCommand.KIND:
              return false;
            case svg_exporter_1.ExportSvgAction.KIND:
              return this.handleExportSvgAction(action);
            case ServerStatusAction.KIND:
              return this.handleServerStateAction(action);
          }
          return !action[receivedFromServerProperty];
        }
        /**
         * Put the new model contained in the given action into the model storage, if there is any.
         */
        storeNewModel(action) {
          if (action.kind === set_model_1.SetModelCommand.KIND || action.kind === update_model_1.UpdateModelCommand.KIND || action.kind === bounds_manipulation_1.RequestBoundsCommand.KIND) {
            const newRoot = action.newRoot;
            if (newRoot) {
              this.currentRoot = newRoot;
              if (action.kind === set_model_1.SetModelCommand.KIND || action.kind === update_model_1.UpdateModelCommand.KIND) {
                this.lastSubmittedModelType = newRoot.type;
              }
            }
          }
        }
        handleRequestModel(action) {
          const newOptions = Object.assign({ needsClientLayout: this.viewerOptions.needsClientLayout, needsServerLayout: this.viewerOptions.needsServerLayout }, action.options);
          const newAction = Object.assign(Object.assign({}, action), { options: newOptions });
          this.forwardToServer(newAction);
          return false;
        }
        /**
         * If the server requires to compute a layout, the computed bounds are forwarded. Otherwise they
         * are applied to the current model locally and a model update is triggered.
         */
        handleComputedBounds(action) {
          if (this.viewerOptions.needsServerLayout) {
            return true;
          } else {
            const root = this.currentRoot;
            this.computedBoundsApplicator.apply(root, action);
            if (root.type === this.lastSubmittedModelType) {
              this.actionDispatcher.dispatch(actions_1.UpdateModelAction.create(root));
            } else {
              this.actionDispatcher.dispatch(actions_1.SetModelAction.create(root));
            }
            this.lastSubmittedModelType = root.type;
            return false;
          }
        }
        handleExportSvgAction(action) {
          const blob = new Blob([action.svg], { type: "text/plain;charset=utf-8" });
          (0, file_saver_1.saveAs)(blob, "diagram.svg");
          return false;
        }
        handleServerStateAction(action) {
          return false;
        }
        commitModel(newRoot) {
          const previousRoot = this.currentRoot;
          this.currentRoot = newRoot;
          return previousRoot;
        }
      };
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.ILogger),
        __metadata("design:type", Object)
      ], DiagramServerProxy.prototype, "logger", void 0);
      __decorate([
        (0, inversify_1.inject)(model_source_1.ComputedBoundsApplicator),
        __metadata("design:type", model_source_1.ComputedBoundsApplicator)
      ], DiagramServerProxy.prototype, "computedBoundsApplicator", void 0);
      DiagramServerProxy = __decorate([
        (0, inversify_1.injectable)()
      ], DiagramServerProxy);
      exports.DiagramServerProxy = DiagramServerProxy;
      exports.DiagramServer = DiagramServerProxy;
    }
  });

  // node_modules/sprotty/lib/model-source/local-model-source.js
  var require_local_model_source = __commonJS({
    "node_modules/sprotty/lib/model-source/local-model-source.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.LocalModelSource = void 0;
      var file_saver_1 = require_FileSaver_min();
      var inversify_1 = require_inversify();
      var actions_1 = require_actions();
      var model_utils_1 = require_model_utils();
      var types_1 = require_types();
      var smodel_factory_1 = require_smodel_factory();
      var viewport_1 = require_viewport();
      var svg_exporter_1 = require_svg_exporter();
      var model_matching_1 = require_model_matching();
      var select_1 = require_select();
      var model_source_1 = require_model_source();
      var LocalModelSource3 = class LocalModelSource extends model_source_1.ModelSource {
        constructor() {
          super(...arguments);
          this.currentRoot = smodel_factory_1.EMPTY_ROOT;
        }
        get model() {
          return this.currentRoot;
        }
        set model(root) {
          this.setModel(root);
        }
        initialize(registry) {
          super.initialize(registry);
          registry.register(actions_1.ComputedBoundsAction.KIND, this);
          registry.register(actions_1.RequestPopupModelAction.KIND, this);
        }
        /**
         * Set the model without incremental update.
         */
        setModel(newRoot) {
          this.currentRoot = newRoot;
          return this.submitModel(newRoot, false);
        }
        commitModel(newRoot) {
          const previousRoot = this.currentRoot;
          this.currentRoot = newRoot;
          return previousRoot;
        }
        /**
         * Apply an incremental update to the model with an animation showing the transition to
         * the new state. If `newRoot` is undefined, the current root is submitted; in that case
         * it is assumed that it has been modified before.
         */
        updateModel(newRoot) {
          if (newRoot === void 0) {
            return this.submitModel(this.currentRoot, true);
          } else {
            this.currentRoot = newRoot;
            return this.submitModel(newRoot, true);
          }
        }
        /**
         * Get the current selection from the model.
         */
        async getSelection() {
          const res = await this.actionDispatcher.request(select_1.GetSelectionAction.create());
          const result = [];
          this.gatherSelectedElements(this.currentRoot, new Set(res.selectedElementsIDs), result);
          return result;
        }
        gatherSelectedElements(element, selected, result) {
          if (selected.has(element.id)) {
            result.push(element);
          }
          if (element.children) {
            for (const child of element.children) {
              this.gatherSelectedElements(child, selected, result);
            }
          }
        }
        /**
         * Get the current viewport from the model.
         */
        async getViewport() {
          const res = await this.actionDispatcher.request(viewport_1.GetViewportAction.create());
          return {
            scroll: res.viewport.scroll,
            zoom: res.viewport.zoom,
            canvasBounds: res.canvasBounds
          };
        }
        /**
         * If client layout is active, run a `RequestBoundsAction` and wait for the resulting
         * `ComputedBoundsAction`, otherwise call `doSubmitModel(…)` directly.
         */
        async submitModel(newRoot, update, cause) {
          if (this.viewerOptions.needsClientLayout) {
            const computedBounds = await this.actionDispatcher.request(actions_1.RequestBoundsAction.create(newRoot));
            const index = this.computedBoundsApplicator.apply(this.currentRoot, computedBounds);
            await this.doSubmitModel(newRoot, true, cause, index);
          } else {
            await this.doSubmitModel(newRoot, update, cause);
          }
        }
        /**
         * Submit the given model with an `UpdateModelAction` or a `SetModelAction` depending on the
         * `update` argument. If available, the model layout engine is invoked first.
         */
        async doSubmitModel(newRoot, update, cause, index) {
          if (this.layoutEngine !== void 0) {
            try {
              const layoutResult = this.layoutEngine.layout(newRoot, index);
              if (layoutResult instanceof Promise)
                newRoot = await layoutResult;
              else if (layoutResult !== void 0)
                newRoot = layoutResult;
            } catch (error) {
              this.logger.error(this, error.toString(), error.stack);
            }
          }
          const lastSubmittedModelType = this.lastSubmittedModelType;
          this.lastSubmittedModelType = newRoot.type;
          if (cause && cause.kind === actions_1.RequestModelAction.KIND && cause.requestId) {
            const request = cause;
            await this.actionDispatcher.dispatch(actions_1.SetModelAction.create(newRoot, request.requestId));
          } else if (update && newRoot.type === lastSubmittedModelType) {
            const input = Array.isArray(update) ? update : newRoot;
            await this.actionDispatcher.dispatch(actions_1.UpdateModelAction.create(input, { animate: true, cause }));
          } else {
            await this.actionDispatcher.dispatch(actions_1.SetModelAction.create(newRoot));
          }
        }
        /**
         * Modify the current model with an array of matches.
         */
        applyMatches(matches) {
          const root = this.currentRoot;
          (0, model_matching_1.applyMatches)(root, matches);
          return this.submitModel(root, matches);
        }
        /**
         * Modify the current model by adding new elements.
         */
        addElements(elements) {
          const matches = [];
          for (const e of elements) {
            const anye = e;
            if (anye.element !== void 0 && anye.parentId !== void 0) {
              matches.push({
                right: anye.element,
                rightParentId: anye.parentId
              });
            } else if (anye.id !== void 0) {
              matches.push({
                right: anye,
                rightParentId: this.currentRoot.id
              });
            }
          }
          return this.applyMatches(matches);
        }
        /**
         * Modify the current model by removing elements.
         */
        removeElements(elements) {
          const matches = [];
          const index = new model_utils_1.SModelIndex();
          index.add(this.currentRoot);
          for (const e of elements) {
            const anye = e;
            if (anye.elementId !== void 0 && anye.parentId !== void 0) {
              const element = index.getById(anye.elementId);
              if (element !== void 0) {
                matches.push({
                  left: element,
                  leftParentId: anye.parentId
                });
              }
            } else {
              const element = index.getById(anye);
              if (element !== void 0) {
                matches.push({
                  left: element,
                  leftParentId: this.currentRoot.id
                });
              }
            }
          }
          return this.applyMatches(matches);
        }
        // ----- Methods for handling incoming actions ----------------------------
        handle(action) {
          switch (action.kind) {
            case actions_1.RequestModelAction.KIND:
              this.handleRequestModel(action);
              break;
            case actions_1.ComputedBoundsAction.KIND:
              this.computedBoundsApplicator.apply(this.currentRoot, action);
              break;
            case actions_1.RequestPopupModelAction.KIND:
              this.handleRequestPopupModel(action);
              break;
            case svg_exporter_1.ExportSvgAction.KIND:
              this.handleExportSvgAction(action);
              break;
          }
        }
        handleRequestModel(action) {
          this.submitModel(this.currentRoot, false, action);
        }
        handleRequestPopupModel(action) {
          if (this.popupModelProvider !== void 0) {
            const element = (0, model_utils_1.findElement)(this.currentRoot, action.elementId);
            const popupRoot = this.popupModelProvider.getPopupModel(action, element);
            if (popupRoot !== void 0) {
              popupRoot.canvasBounds = action.bounds;
              this.actionDispatcher.dispatch(actions_1.SetPopupModelAction.create(popupRoot, action.requestId));
            }
          }
        }
        handleExportSvgAction(action) {
          const blob = new Blob([action.svg], { type: "text/plain;charset=utf-8" });
          (0, file_saver_1.saveAs)(blob, "diagram.svg");
        }
      };
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.ILogger),
        __metadata("design:type", Object)
      ], LocalModelSource3.prototype, "logger", void 0);
      __decorate([
        (0, inversify_1.inject)(model_source_1.ComputedBoundsApplicator),
        __metadata("design:type", model_source_1.ComputedBoundsApplicator)
      ], LocalModelSource3.prototype, "computedBoundsApplicator", void 0);
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.IPopupModelProvider),
        (0, inversify_1.optional)(),
        __metadata("design:type", Object)
      ], LocalModelSource3.prototype, "popupModelProvider", void 0);
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.IModelLayoutEngine),
        (0, inversify_1.optional)(),
        __metadata("design:type", Object)
      ], LocalModelSource3.prototype, "layoutEngine", void 0);
      LocalModelSource3 = __decorate([
        (0, inversify_1.injectable)()
      ], LocalModelSource3);
      exports.LocalModelSource = LocalModelSource3;
    }
  });

  // node_modules/sprotty/lib/model-source/logging.js
  var require_logging2 = __commonJS({
    "node_modules/sprotty/lib/model-source/logging.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      var __metadata = exports && exports.__metadata || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ForwardingLogger = exports.LoggingAction = void 0;
      var inversify_1 = require_inversify();
      var logging_1 = require_logging();
      var types_1 = require_types();
      var LoggingAction;
      (function(LoggingAction2) {
        LoggingAction2.KIND = "logging";
        function create(options) {
          return Object.assign({ kind: LoggingAction2.KIND }, options);
        }
        LoggingAction2.create = create;
      })(LoggingAction = exports.LoggingAction || (exports.LoggingAction = {}));
      var ForwardingLogger = class ForwardingLogger {
        error(thisArg, message, ...params) {
          if (this.logLevel >= logging_1.LogLevel.error)
            this.forward(thisArg, message, logging_1.LogLevel.error, params);
        }
        warn(thisArg, message, ...params) {
          if (this.logLevel >= logging_1.LogLevel.warn)
            this.forward(thisArg, message, logging_1.LogLevel.warn, params);
        }
        info(thisArg, message, ...params) {
          if (this.logLevel >= logging_1.LogLevel.info)
            this.forward(thisArg, message, logging_1.LogLevel.info, params);
        }
        log(thisArg, message, ...params) {
          if (this.logLevel >= logging_1.LogLevel.log) {
            try {
              const caller = typeof thisArg === "object" ? thisArg.constructor.name : String(thisArg);
              console.log.apply(thisArg, [caller + ": " + message, ...params]);
            } catch (error) {
            }
          }
        }
        forward(thisArg, message, logLevel, params) {
          const date = /* @__PURE__ */ new Date();
          const action = LoggingAction.create({
            message,
            severity: logging_1.LogLevel[logLevel],
            time: date.toLocaleTimeString(),
            caller: typeof thisArg === "object" ? thisArg.constructor.name : String(thisArg),
            params: params.map((p) => JSON.stringify(p))
          });
          this.modelSourceProvider().then((modelSource) => {
            try {
              modelSource.handle(action);
            } catch (error) {
              try {
                console.log.apply(thisArg, [message, action, error]);
              } catch (e) {
              }
            }
          });
        }
      };
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.ModelSourceProvider),
        __metadata("design:type", Function)
      ], ForwardingLogger.prototype, "modelSourceProvider", void 0);
      __decorate([
        (0, inversify_1.inject)(types_1.TYPES.LogLevel),
        __metadata("design:type", Number)
      ], ForwardingLogger.prototype, "logLevel", void 0);
      ForwardingLogger = __decorate([
        (0, inversify_1.injectable)()
      ], ForwardingLogger);
      exports.ForwardingLogger = ForwardingLogger;
    }
  });

  // node_modules/sprotty/lib/model-source/websocket.js
  var require_websocket = __commonJS({
    "node_modules/sprotty/lib/model-source/websocket.js"(exports) {
      "use strict";
      var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
              r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.WebSocketDiagramServer = exports.WebSocketDiagramServerProxy = void 0;
      var inversify_1 = require_inversify();
      var diagram_server_1 = require_diagram_server2();
      var WebSocketDiagramServerProxy = class WebSocketDiagramServerProxy extends diagram_server_1.DiagramServerProxy {
        listen(webSocket) {
          webSocket.addEventListener("message", (event) => {
            this.messageReceived(event.data);
          });
          webSocket.addEventListener("error", (event) => {
            this.logger.error(this, "error event received", event);
          });
          this.webSocket = webSocket;
        }
        disconnect() {
          if (this.webSocket) {
            this.webSocket.close();
            this.webSocket = void 0;
          }
        }
        sendMessage(message) {
          if (this.webSocket) {
            this.webSocket.send(JSON.stringify(message));
          } else {
            throw new Error("WebSocket is not connected");
          }
        }
      };
      WebSocketDiagramServerProxy = __decorate([
        (0, inversify_1.injectable)()
      ], WebSocketDiagramServerProxy);
      exports.WebSocketDiagramServerProxy = WebSocketDiagramServerProxy;
      exports.WebSocketDiagramServer = WebSocketDiagramServerProxy;
    }
  });

  // node_modules/sprotty/lib/utils/color.js
  var require_color = __commonJS({
    "node_modules/sprotty/lib/utils/color.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ColorMap = exports.toSVG = exports.rgb = void 0;
      function rgb(red, green, blue) {
        return {
          red,
          green,
          blue
        };
      }
      exports.rgb = rgb;
      function toSVG(c) {
        return "rgb(" + c.red + "," + c.green + "," + c.blue + ")";
      }
      exports.toSVG = toSVG;
      var ColorMap = class {
        constructor(stops) {
          this.stops = stops;
        }
        getColor(t) {
          t = Math.max(0, Math.min(0.99999999, t));
          const i = Math.floor(t * this.stops.length);
          return this.stops[i];
        }
      };
      exports.ColorMap = ColorMap;
    }
  });

  // node_modules/sprotty/lib/utils/json.js
  var require_json2 = __commonJS({
    "node_modules/sprotty/lib/utils/json.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/sprotty/lib/index.js
  var require_lib2 = __commonJS({
    "node_modules/sprotty/lib/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.modelSourceModule = exports.zorderModule = exports.viewportModule = exports.updateModule = exports.undoRedoModule = exports.selectModule = exports.routingModule = exports.openModule = exports.moveModule = exports.hoverModule = exports.fadeModule = exports.exportModule = exports.expandModule = exports.edgeLayoutModule = exports.edgeIntersectionModule = exports.decorationModule = exports.contextMenuModule = exports.commandPaletteModule = exports.buttonModule = exports.boundsModule = exports.graphModule = exports.defaultModule = void 0;
      __exportStar(require_action(), exports);
      __exportStar(require_action_dispatcher(), exports);
      __exportStar(require_action_handler(), exports);
      __exportStar(require_diagram_locker(), exports);
      __exportStar(require_animation_frame_syncer(), exports);
      __exportStar(require_animation(), exports);
      __exportStar(require_easing(), exports);
      __exportStar(require_command(), exports);
      __exportStar(require_command_registration(), exports);
      __exportStar(require_command_stack_options(), exports);
      __exportStar(require_command_stack(), exports);
      __exportStar(require_initialize_canvas(), exports);
      __exportStar(require_set_model(), exports);
      __exportStar(require_smodel_extension(), exports);
      __exportStar(require_smodel_factory(), exports);
      __exportStar(require_smodel_utils(), exports);
      __exportStar(require_smodel(), exports);
      __exportStar(require_tool_manager(), exports);
      __exportStar(require_tool(), exports);
      __exportStar(require_ui_extension_registry(), exports);
      __exportStar(require_ui_extension(), exports);
      __exportStar(require_key_tool(), exports);
      __exportStar(require_mouse_tool(), exports);
      __exportStar(require_thunk_view(), exports);
      __exportStar(require_view(), exports);
      __exportStar(require_viewer_cache(), exports);
      __exportStar(require_viewer_options(), exports);
      __exportStar(require_viewer(), exports);
      __exportStar(require_vnode_postprocessor(), exports);
      __exportStar(require_vnode_utils(), exports);
      __exportStar(require_types(), exports);
      var di_config_1 = __importDefault(require_di_config());
      exports.defaultModule = di_config_1.default;
      __exportStar(require_bounds_manipulation(), exports);
      __exportStar(require_hidden_bounds_updater(), exports);
      __exportStar(require_layout(), exports);
      __exportStar(require_model2(), exports);
      __exportStar(require_vbox_layout(), exports);
      __exportStar(require_hbox_layout(), exports);
      __exportStar(require_stack_layout(), exports);
      __exportStar(require_views(), exports);
      __exportStar(require_button_handler(), exports);
      __exportStar(require_model4(), exports);
      __exportStar(require_action_providers(), exports);
      __exportStar(require_command_palette(), exports);
      __exportStar(require_context_menu_service(), exports);
      __exportStar(require_menu_providers(), exports);
      __exportStar(require_mouse_listener(), exports);
      __exportStar(require_di_config2(), exports);
      __exportStar(require_edge_layout(), exports);
      __exportStar(require_model10(), exports);
      __exportStar(require_create(), exports);
      __exportStar(require_create_on_drag(), exports);
      __exportStar(require_di_config3(), exports);
      __exportStar(require_delete(), exports);
      __exportStar(require_edit_label(), exports);
      __exportStar(require_edit_label_ui(), exports);
      __exportStar(require_edit_routing(), exports);
      __exportStar(require_model11(), exports);
      __exportStar(require_reconnect(), exports);
      __exportStar(require_expand(), exports);
      __exportStar(require_model14(), exports);
      __exportStar(require_views2(), exports);
      __exportStar(require_export(), exports);
      __exportStar(require_model13(), exports);
      __exportStar(require_svg_exporter(), exports);
      __exportStar(require_fade(), exports);
      __exportStar(require_model3(), exports);
      __exportStar(require_hover(), exports);
      __exportStar(require_model7(), exports);
      __exportStar(require_model15(), exports);
      __exportStar(require_views3(), exports);
      __exportStar(require_decoration_placer(), exports);
      __exportStar(require_intersection_finder(), exports);
      __exportStar(require_sweepline(), exports);
      __exportStar(require_model8(), exports);
      __exportStar(require_move(), exports);
      __exportStar(require_snap(), exports);
      __exportStar(require_model5(), exports);
      __exportStar(require_open(), exports);
      __exportStar(require_model16(), exports);
      __exportStar(require_model17(), exports);
      __exportStar(require_views4(), exports);
      __exportStar(require_anchor(), exports);
      __exportStar(require_abstract_edge_router(), exports);
      __exportStar(require_bezier_anchors(), exports);
      __exportStar(require_bezier_edge_router(), exports);
      __exportStar(require_manhattan_anchors(), exports);
      __exportStar(require_manhattan_edge_router(), exports);
      __exportStar(require_model9(), exports);
      __exportStar(require_polyline_anchors(), exports);
      __exportStar(require_polyline_edge_router(), exports);
      __exportStar(require_routing(), exports);
      __exportStar(require_views5(), exports);
      __exportStar(require_model6(), exports);
      __exportStar(require_select(), exports);
      __exportStar(require_undo_redo(), exports);
      __exportStar(require_model_matching(), exports);
      __exportStar(require_update_model(), exports);
      __exportStar(require_center_fit(), exports);
      __exportStar(require_model12(), exports);
      __exportStar(require_scroll(), exports);
      __exportStar(require_viewport_root(), exports);
      __exportStar(require_viewport(), exports);
      __exportStar(require_zoom(), exports);
      __exportStar(require_zorder(), exports);
      var di_config_2 = __importDefault(require_di_config4());
      exports.graphModule = di_config_2.default;
      var di_config_3 = __importDefault(require_di_config5());
      exports.boundsModule = di_config_3.default;
      var di_config_4 = __importDefault(require_di_config6());
      exports.buttonModule = di_config_4.default;
      var di_config_5 = __importDefault(require_di_config7());
      exports.commandPaletteModule = di_config_5.default;
      var di_config_6 = __importDefault(require_di_config8());
      exports.contextMenuModule = di_config_6.default;
      var di_config_7 = __importDefault(require_di_config9());
      exports.decorationModule = di_config_7.default;
      var di_config_8 = __importDefault(require_di_config10());
      exports.edgeIntersectionModule = di_config_8.default;
      var di_config_9 = __importDefault(require_di_config2());
      exports.edgeLayoutModule = di_config_9.default;
      var di_config_10 = __importDefault(require_di_config11());
      exports.expandModule = di_config_10.default;
      var di_config_11 = __importDefault(require_di_config12());
      exports.exportModule = di_config_11.default;
      var di_config_12 = __importDefault(require_di_config13());
      exports.fadeModule = di_config_12.default;
      var di_config_13 = __importDefault(require_di_config14());
      exports.hoverModule = di_config_13.default;
      var di_config_14 = __importDefault(require_di_config15());
      exports.moveModule = di_config_14.default;
      var di_config_15 = __importDefault(require_di_config16());
      exports.openModule = di_config_15.default;
      var di_config_16 = __importDefault(require_di_config17());
      exports.routingModule = di_config_16.default;
      var di_config_17 = __importDefault(require_di_config18());
      exports.selectModule = di_config_17.default;
      var di_config_18 = __importDefault(require_di_config19());
      exports.undoRedoModule = di_config_18.default;
      var di_config_19 = __importDefault(require_di_config20());
      exports.updateModule = di_config_19.default;
      var di_config_20 = __importDefault(require_di_config21());
      exports.viewportModule = di_config_20.default;
      var di_config_21 = __importDefault(require_di_config22());
      exports.zorderModule = di_config_21.default;
      __exportStar(require_sgraph_factory(), exports);
      __exportStar(require_sgraph(), exports);
      __exportStar(require_views6(), exports);
      __exportStar(require_modules(), exports);
      __exportStar(require_generic_views(), exports);
      __exportStar(require_html_views(), exports);
      __exportStar(require_jsx(), exports);
      __exportStar(require_model18(), exports);
      __exportStar(require_svg_views(), exports);
      __exportStar(require_commit_model(), exports);
      __exportStar(require_diagram_server2(), exports);
      __exportStar(require_local_model_source(), exports);
      __exportStar(require_logging2(), exports);
      __exportStar(require_model_source(), exports);
      __exportStar(require_websocket(), exports);
      var di_config_22 = __importDefault(require_di_config23());
      exports.modelSourceModule = di_config_22.default;
      __exportStar(require_browser(), exports);
      __exportStar(require_codicon(), exports);
      __exportStar(require_color(), exports);
      __exportStar(require_geometry2(), exports);
      __exportStar(require_inversify2(), exports);
      __exportStar(require_json2(), exports);
      __exportStar(require_logging(), exports);
      __exportStar(require_registry(), exports);
    }
  });

  // node_modules/reflect-metadata/Reflect.js
  var Reflect2;
  (function(Reflect3) {
    (function(factory) {
      var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : Function("return this;")();
      var exporter = makeExporter(Reflect3);
      if (typeof root.Reflect === "undefined") {
        root.Reflect = Reflect3;
      } else {
        exporter = makeExporter(root.Reflect, exporter);
      }
      factory(exporter);
      function makeExporter(target, previous) {
        return function(key, value) {
          if (typeof target[key] !== "function") {
            Object.defineProperty(target, key, { configurable: true, writable: true, value });
          }
          if (previous)
            previous(key, value);
        };
      }
    })(function(exporter) {
      var hasOwn = Object.prototype.hasOwnProperty;
      var supportsSymbol = typeof Symbol === "function";
      var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
      var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
      var supportsCreate = typeof Object.create === "function";
      var supportsProto = { __proto__: [] } instanceof Array;
      var downLevel = !supportsCreate && !supportsProto;
      var HashMap = {
        // create an object in dictionary mode (a.k.a. "slow" mode in v8)
        create: supportsCreate ? function() {
          return MakeDictionary(/* @__PURE__ */ Object.create(null));
        } : supportsProto ? function() {
          return MakeDictionary({ __proto__: null });
        } : function() {
          return MakeDictionary({});
        },
        has: downLevel ? function(map, key) {
          return hasOwn.call(map, key);
        } : function(map, key) {
          return key in map;
        },
        get: downLevel ? function(map, key) {
          return hasOwn.call(map, key) ? map[key] : void 0;
        } : function(map, key) {
          return map[key];
        }
      };
      var functionPrototype = Object.getPrototypeOf(Function);
      var usePolyfill = typeof process === "object" && process.env && process.env["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";
      var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
      var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
      var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
      var Metadata = new _WeakMap();
      function decorate(decorators, target, propertyKey, attributes) {
        if (!IsUndefined(propertyKey)) {
          if (!IsArray(decorators))
            throw new TypeError();
          if (!IsObject(target))
            throw new TypeError();
          if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
            throw new TypeError();
          if (IsNull(attributes))
            attributes = void 0;
          propertyKey = ToPropertyKey(propertyKey);
          return DecorateProperty(decorators, target, propertyKey, attributes);
        } else {
          if (!IsArray(decorators))
            throw new TypeError();
          if (!IsConstructor(target))
            throw new TypeError();
          return DecorateConstructor(decorators, target);
        }
      }
      exporter("decorate", decorate);
      function metadata(metadataKey, metadataValue) {
        function decorator(target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
            throw new TypeError();
          OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
        }
        return decorator;
      }
      exporter("metadata", metadata);
      function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError();
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
      }
      exporter("defineMetadata", defineMetadata);
      function hasMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError();
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryHasMetadata(metadataKey, target, propertyKey);
      }
      exporter("hasMetadata", hasMetadata);
      function hasOwnMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError();
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
      }
      exporter("hasOwnMetadata", hasOwnMetadata);
      function getMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError();
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryGetMetadata(metadataKey, target, propertyKey);
      }
      exporter("getMetadata", getMetadata);
      function getOwnMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError();
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
      }
      exporter("getOwnMetadata", getOwnMetadata);
      function getMetadataKeys(target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError();
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryMetadataKeys(target, propertyKey);
      }
      exporter("getMetadataKeys", getMetadataKeys);
      function getOwnMetadataKeys(target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError();
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        return OrdinaryOwnMetadataKeys(target, propertyKey);
      }
      exporter("getOwnMetadataKeys", getOwnMetadataKeys);
      function deleteMetadata(metadataKey, target, propertyKey) {
        if (!IsObject(target))
          throw new TypeError();
        if (!IsUndefined(propertyKey))
          propertyKey = ToPropertyKey(propertyKey);
        var metadataMap = GetOrCreateMetadataMap(
          target,
          propertyKey,
          /*Create*/
          false
        );
        if (IsUndefined(metadataMap))
          return false;
        if (!metadataMap.delete(metadataKey))
          return false;
        if (metadataMap.size > 0)
          return true;
        var targetMetadata = Metadata.get(target);
        targetMetadata.delete(propertyKey);
        if (targetMetadata.size > 0)
          return true;
        Metadata.delete(target);
        return true;
      }
      exporter("deleteMetadata", deleteMetadata);
      function DecorateConstructor(decorators, target) {
        for (var i = decorators.length - 1; i >= 0; --i) {
          var decorator = decorators[i];
          var decorated = decorator(target);
          if (!IsUndefined(decorated) && !IsNull(decorated)) {
            if (!IsConstructor(decorated))
              throw new TypeError();
            target = decorated;
          }
        }
        return target;
      }
      function DecorateProperty(decorators, target, propertyKey, descriptor) {
        for (var i = decorators.length - 1; i >= 0; --i) {
          var decorator = decorators[i];
          var decorated = decorator(target, propertyKey, descriptor);
          if (!IsUndefined(decorated) && !IsNull(decorated)) {
            if (!IsObject(decorated))
              throw new TypeError();
            descriptor = decorated;
          }
        }
        return descriptor;
      }
      function GetOrCreateMetadataMap(O, P, Create) {
        var targetMetadata = Metadata.get(O);
        if (IsUndefined(targetMetadata)) {
          if (!Create)
            return void 0;
          targetMetadata = new _Map();
          Metadata.set(O, targetMetadata);
        }
        var metadataMap = targetMetadata.get(P);
        if (IsUndefined(metadataMap)) {
          if (!Create)
            return void 0;
          metadataMap = new _Map();
          targetMetadata.set(P, metadataMap);
        }
        return metadataMap;
      }
      function OrdinaryHasMetadata(MetadataKey, O, P) {
        var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey, O, P);
        if (hasOwn2)
          return true;
        var parent = OrdinaryGetPrototypeOf(O);
        if (!IsNull(parent))
          return OrdinaryHasMetadata(MetadataKey, parent, P);
        return false;
      }
      function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
        var metadataMap = GetOrCreateMetadataMap(
          O,
          P,
          /*Create*/
          false
        );
        if (IsUndefined(metadataMap))
          return false;
        return ToBoolean(metadataMap.has(MetadataKey));
      }
      function OrdinaryGetMetadata(MetadataKey, O, P) {
        var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey, O, P);
        if (hasOwn2)
          return OrdinaryGetOwnMetadata(MetadataKey, O, P);
        var parent = OrdinaryGetPrototypeOf(O);
        if (!IsNull(parent))
          return OrdinaryGetMetadata(MetadataKey, parent, P);
        return void 0;
      }
      function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
        var metadataMap = GetOrCreateMetadataMap(
          O,
          P,
          /*Create*/
          false
        );
        if (IsUndefined(metadataMap))
          return void 0;
        return metadataMap.get(MetadataKey);
      }
      function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
        var metadataMap = GetOrCreateMetadataMap(
          O,
          P,
          /*Create*/
          true
        );
        metadataMap.set(MetadataKey, MetadataValue);
      }
      function OrdinaryMetadataKeys(O, P) {
        var ownKeys = OrdinaryOwnMetadataKeys(O, P);
        var parent = OrdinaryGetPrototypeOf(O);
        if (parent === null)
          return ownKeys;
        var parentKeys = OrdinaryMetadataKeys(parent, P);
        if (parentKeys.length <= 0)
          return ownKeys;
        if (ownKeys.length <= 0)
          return parentKeys;
        var set = new _Set();
        var keys = [];
        for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
          var key = ownKeys_1[_i];
          var hasKey = set.has(key);
          if (!hasKey) {
            set.add(key);
            keys.push(key);
          }
        }
        for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
          var key = parentKeys_1[_a];
          var hasKey = set.has(key);
          if (!hasKey) {
            set.add(key);
            keys.push(key);
          }
        }
        return keys;
      }
      function OrdinaryOwnMetadataKeys(O, P) {
        var keys = [];
        var metadataMap = GetOrCreateMetadataMap(
          O,
          P,
          /*Create*/
          false
        );
        if (IsUndefined(metadataMap))
          return keys;
        var keysObj = metadataMap.keys();
        var iterator = GetIterator(keysObj);
        var k = 0;
        while (true) {
          var next = IteratorStep(iterator);
          if (!next) {
            keys.length = k;
            return keys;
          }
          var nextValue = IteratorValue(next);
          try {
            keys[k] = nextValue;
          } catch (e) {
            try {
              IteratorClose(iterator);
            } finally {
              throw e;
            }
          }
          k++;
        }
      }
      function Type(x) {
        if (x === null)
          return 1;
        switch (typeof x) {
          case "undefined":
            return 0;
          case "boolean":
            return 2;
          case "string":
            return 3;
          case "symbol":
            return 4;
          case "number":
            return 5;
          case "object":
            return x === null ? 1 : 6;
          default:
            return 6;
        }
      }
      function IsUndefined(x) {
        return x === void 0;
      }
      function IsNull(x) {
        return x === null;
      }
      function IsSymbol(x) {
        return typeof x === "symbol";
      }
      function IsObject(x) {
        return typeof x === "object" ? x !== null : typeof x === "function";
      }
      function ToPrimitive(input, PreferredType) {
        switch (Type(input)) {
          case 0:
            return input;
          case 1:
            return input;
          case 2:
            return input;
          case 3:
            return input;
          case 4:
            return input;
          case 5:
            return input;
        }
        var hint = PreferredType === 3 ? "string" : PreferredType === 5 ? "number" : "default";
        var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
        if (exoticToPrim !== void 0) {
          var result = exoticToPrim.call(input, hint);
          if (IsObject(result))
            throw new TypeError();
          return result;
        }
        return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
      }
      function OrdinaryToPrimitive(O, hint) {
        if (hint === "string") {
          var toString_1 = O.toString;
          if (IsCallable(toString_1)) {
            var result = toString_1.call(O);
            if (!IsObject(result))
              return result;
          }
          var valueOf = O.valueOf;
          if (IsCallable(valueOf)) {
            var result = valueOf.call(O);
            if (!IsObject(result))
              return result;
          }
        } else {
          var valueOf = O.valueOf;
          if (IsCallable(valueOf)) {
            var result = valueOf.call(O);
            if (!IsObject(result))
              return result;
          }
          var toString_2 = O.toString;
          if (IsCallable(toString_2)) {
            var result = toString_2.call(O);
            if (!IsObject(result))
              return result;
          }
        }
        throw new TypeError();
      }
      function ToBoolean(argument) {
        return !!argument;
      }
      function ToString(argument) {
        return "" + argument;
      }
      function ToPropertyKey(argument) {
        var key = ToPrimitive(
          argument,
          3
          /* String */
        );
        if (IsSymbol(key))
          return key;
        return ToString(key);
      }
      function IsArray(argument) {
        return Array.isArray ? Array.isArray(argument) : argument instanceof Object ? argument instanceof Array : Object.prototype.toString.call(argument) === "[object Array]";
      }
      function IsCallable(argument) {
        return typeof argument === "function";
      }
      function IsConstructor(argument) {
        return typeof argument === "function";
      }
      function IsPropertyKey(argument) {
        switch (Type(argument)) {
          case 3:
            return true;
          case 4:
            return true;
          default:
            return false;
        }
      }
      function GetMethod(V, P) {
        var func = V[P];
        if (func === void 0 || func === null)
          return void 0;
        if (!IsCallable(func))
          throw new TypeError();
        return func;
      }
      function GetIterator(obj) {
        var method = GetMethod(obj, iteratorSymbol);
        if (!IsCallable(method))
          throw new TypeError();
        var iterator = method.call(obj);
        if (!IsObject(iterator))
          throw new TypeError();
        return iterator;
      }
      function IteratorValue(iterResult) {
        return iterResult.value;
      }
      function IteratorStep(iterator) {
        var result = iterator.next();
        return result.done ? false : result;
      }
      function IteratorClose(iterator) {
        var f = iterator["return"];
        if (f)
          f.call(iterator);
      }
      function OrdinaryGetPrototypeOf(O) {
        var proto = Object.getPrototypeOf(O);
        if (typeof O !== "function" || O === functionPrototype)
          return proto;
        if (proto !== functionPrototype)
          return proto;
        var prototype = O.prototype;
        var prototypeProto = prototype && Object.getPrototypeOf(prototype);
        if (prototypeProto == null || prototypeProto === Object.prototype)
          return proto;
        var constructor = prototypeProto.constructor;
        if (typeof constructor !== "function")
          return proto;
        if (constructor === O)
          return proto;
        return constructor;
      }
      function CreateMapPolyfill() {
        var cacheSentinel = {};
        var arraySentinel = [];
        var MapIterator = (
          /** @class */
          function() {
            function MapIterator2(keys, values, selector) {
              this._index = 0;
              this._keys = keys;
              this._values = values;
              this._selector = selector;
            }
            MapIterator2.prototype["@@iterator"] = function() {
              return this;
            };
            MapIterator2.prototype[iteratorSymbol] = function() {
              return this;
            };
            MapIterator2.prototype.next = function() {
              var index = this._index;
              if (index >= 0 && index < this._keys.length) {
                var result = this._selector(this._keys[index], this._values[index]);
                if (index + 1 >= this._keys.length) {
                  this._index = -1;
                  this._keys = arraySentinel;
                  this._values = arraySentinel;
                } else {
                  this._index++;
                }
                return { value: result, done: false };
              }
              return { value: void 0, done: true };
            };
            MapIterator2.prototype.throw = function(error) {
              if (this._index >= 0) {
                this._index = -1;
                this._keys = arraySentinel;
                this._values = arraySentinel;
              }
              throw error;
            };
            MapIterator2.prototype.return = function(value) {
              if (this._index >= 0) {
                this._index = -1;
                this._keys = arraySentinel;
                this._values = arraySentinel;
              }
              return { value, done: true };
            };
            return MapIterator2;
          }()
        );
        return (
          /** @class */
          function() {
            function Map2() {
              this._keys = [];
              this._values = [];
              this._cacheKey = cacheSentinel;
              this._cacheIndex = -2;
            }
            Object.defineProperty(Map2.prototype, "size", {
              get: function() {
                return this._keys.length;
              },
              enumerable: true,
              configurable: true
            });
            Map2.prototype.has = function(key) {
              return this._find(
                key,
                /*insert*/
                false
              ) >= 0;
            };
            Map2.prototype.get = function(key) {
              var index = this._find(
                key,
                /*insert*/
                false
              );
              return index >= 0 ? this._values[index] : void 0;
            };
            Map2.prototype.set = function(key, value) {
              var index = this._find(
                key,
                /*insert*/
                true
              );
              this._values[index] = value;
              return this;
            };
            Map2.prototype.delete = function(key) {
              var index = this._find(
                key,
                /*insert*/
                false
              );
              if (index >= 0) {
                var size = this._keys.length;
                for (var i = index + 1; i < size; i++) {
                  this._keys[i - 1] = this._keys[i];
                  this._values[i - 1] = this._values[i];
                }
                this._keys.length--;
                this._values.length--;
                if (key === this._cacheKey) {
                  this._cacheKey = cacheSentinel;
                  this._cacheIndex = -2;
                }
                return true;
              }
              return false;
            };
            Map2.prototype.clear = function() {
              this._keys.length = 0;
              this._values.length = 0;
              this._cacheKey = cacheSentinel;
              this._cacheIndex = -2;
            };
            Map2.prototype.keys = function() {
              return new MapIterator(this._keys, this._values, getKey);
            };
            Map2.prototype.values = function() {
              return new MapIterator(this._keys, this._values, getValue);
            };
            Map2.prototype.entries = function() {
              return new MapIterator(this._keys, this._values, getEntry);
            };
            Map2.prototype["@@iterator"] = function() {
              return this.entries();
            };
            Map2.prototype[iteratorSymbol] = function() {
              return this.entries();
            };
            Map2.prototype._find = function(key, insert) {
              if (this._cacheKey !== key) {
                this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
              }
              if (this._cacheIndex < 0 && insert) {
                this._cacheIndex = this._keys.length;
                this._keys.push(key);
                this._values.push(void 0);
              }
              return this._cacheIndex;
            };
            return Map2;
          }()
        );
        function getKey(key, _) {
          return key;
        }
        function getValue(_, value) {
          return value;
        }
        function getEntry(key, value) {
          return [key, value];
        }
      }
      function CreateSetPolyfill() {
        return (
          /** @class */
          function() {
            function Set2() {
              this._map = new _Map();
            }
            Object.defineProperty(Set2.prototype, "size", {
              get: function() {
                return this._map.size;
              },
              enumerable: true,
              configurable: true
            });
            Set2.prototype.has = function(value) {
              return this._map.has(value);
            };
            Set2.prototype.add = function(value) {
              return this._map.set(value, value), this;
            };
            Set2.prototype.delete = function(value) {
              return this._map.delete(value);
            };
            Set2.prototype.clear = function() {
              this._map.clear();
            };
            Set2.prototype.keys = function() {
              return this._map.keys();
            };
            Set2.prototype.values = function() {
              return this._map.values();
            };
            Set2.prototype.entries = function() {
              return this._map.entries();
            };
            Set2.prototype["@@iterator"] = function() {
              return this.keys();
            };
            Set2.prototype[iteratorSymbol] = function() {
              return this.keys();
            };
            return Set2;
          }()
        );
      }
      function CreateWeakMapPolyfill() {
        var UUID_SIZE = 16;
        var keys = HashMap.create();
        var rootKey = CreateUniqueKey();
        return (
          /** @class */
          function() {
            function WeakMap2() {
              this._key = CreateUniqueKey();
            }
            WeakMap2.prototype.has = function(target) {
              var table = GetOrCreateWeakMapTable(
                target,
                /*create*/
                false
              );
              return table !== void 0 ? HashMap.has(table, this._key) : false;
            };
            WeakMap2.prototype.get = function(target) {
              var table = GetOrCreateWeakMapTable(
                target,
                /*create*/
                false
              );
              return table !== void 0 ? HashMap.get(table, this._key) : void 0;
            };
            WeakMap2.prototype.set = function(target, value) {
              var table = GetOrCreateWeakMapTable(
                target,
                /*create*/
                true
              );
              table[this._key] = value;
              return this;
            };
            WeakMap2.prototype.delete = function(target) {
              var table = GetOrCreateWeakMapTable(
                target,
                /*create*/
                false
              );
              return table !== void 0 ? delete table[this._key] : false;
            };
            WeakMap2.prototype.clear = function() {
              this._key = CreateUniqueKey();
            };
            return WeakMap2;
          }()
        );
        function CreateUniqueKey() {
          var key;
          do
            key = "@@WeakMap@@" + CreateUUID();
          while (HashMap.has(keys, key));
          keys[key] = true;
          return key;
        }
        function GetOrCreateWeakMapTable(target, create) {
          if (!hasOwn.call(target, rootKey)) {
            if (!create)
              return void 0;
            Object.defineProperty(target, rootKey, { value: HashMap.create() });
          }
          return target[rootKey];
        }
        function FillRandomBytes(buffer, size) {
          for (var i = 0; i < size; ++i)
            buffer[i] = Math.random() * 255 | 0;
          return buffer;
        }
        function GenRandomBytes(size) {
          if (typeof Uint8Array === "function") {
            if (typeof crypto !== "undefined")
              return crypto.getRandomValues(new Uint8Array(size));
            if (typeof msCrypto !== "undefined")
              return msCrypto.getRandomValues(new Uint8Array(size));
            return FillRandomBytes(new Uint8Array(size), size);
          }
          return FillRandomBytes(new Array(size), size);
        }
        function CreateUUID() {
          var data = GenRandomBytes(UUID_SIZE);
          data[6] = data[6] & 79 | 64;
          data[8] = data[8] & 191 | 128;
          var result = "";
          for (var offset = 0; offset < UUID_SIZE; ++offset) {
            var byte = data[offset];
            if (offset === 4 || offset === 6 || offset === 8)
              result += "-";
            if (byte < 16)
              result += "0";
            result += byte.toString(16).toLowerCase();
          }
          return result;
        }
      }
      function MakeDictionary(obj) {
        obj.__ = void 0;
        delete obj.__;
        return obj;
      }
    });
  })(Reflect2 || (Reflect2 = {}));

  // src/index.ts
  var import_sprotty2 = __toESM(require_lib2());

  // src/di.config.ts
  var import_inversify2 = __toESM(require_inversify());
  var import_sprotty = __toESM(require_lib2());

  // src/views.tsx
  var import_jsx = __toESM(require_jsx());
  var import_inversify = __toESM(require_inversify());
  var TaskNodeView = class {
    render(node, context) {
      return /* @__PURE__ */ (0, import_jsx.svg)("g", null, /* @__PURE__ */ (0, import_jsx.svg)(
        "rect",
        {
          "class-sprotty-node": true,
          "class-task": true,
          "class-running": node.isRunning,
          "class-finished": node.isFinished,
          width: node.size.width,
          height: node.size.height
        }
      ), /* @__PURE__ */ (0, import_jsx.svg)("text", { x: node.size.width / 2, y: node.size.height / 2 + 5 }, node.name));
    }
  };
  TaskNodeView = __decorateClass([
    (0, import_inversify.injectable)()
  ], TaskNodeView);

  // src/di.config.ts
  var di_config_default = (containerId) => {
    const ASCETExamleModule = new import_inversify2.ContainerModule((bind, unbind, isBound, rebind) => {
      bind(import_sprotty.TYPES.ModelSource).to(import_sprotty.LocalModelSource).inSingletonScope();
      rebind(import_sprotty.TYPES.ILogger).to(import_sprotty.ConsoleLogger).inSingletonScope();
      rebind(import_sprotty.TYPES.LogLevel).toConstantValue(import_sprotty.LogLevel.log);
      const context = { bind, unbind, isBound, rebind };
      (0, import_sprotty.configureModelElement)(context, "graph", import_sprotty.SGraph, import_sprotty.SGraphView);
      (0, import_sprotty.configureModelElement)(context, "task", import_sprotty.RectangularNode, TaskNodeView);
      (0, import_sprotty.configureModelElement)(context, "edge", import_sprotty.SEdge, import_sprotty.PolylineEdgeView);
      (0, import_sprotty.configureViewerOptions)(context, {
        needsClientLayout: false,
        baseDiv: containerId
      });
    });
    const container = new import_inversify2.Container();
    (0, import_sprotty.loadDefaultModules)(container);
    container.load(ASCETExamleModule);
    container.load(import_sprotty.edgeIntersectionModule);
    return container;
  };

  // src/model-source.ts
  var graph = {
    type: "graph",
    id: "graph",
    children: [
      {
        type: "task",
        id: "task01",
        name: "First Task",
        isFinished: true,
        isRunning: false,
        position: { x: 0, y: 0 },
        size: { width: 100, height: 100 }
      },
      {
        type: "task",
        id: "task02",
        name: "Second Task",
        isFinished: false,
        isRunning: true,
        position: { x: 0, y: 200 },
        size: { width: 100, height: 100 }
      },
      {
        type: "task",
        id: "task03",
        name: "Third Task",
        isFinished: false,
        isRunning: false,
        position: { x: 150, y: 0 },
        size: { width: 100, height: 100 }
      },
      {
        type: "edge",
        id: "edge01",
        sourceId: "task01",
        targetId: "task02",
        routerKind: "manhattan"
      }
    ]
  };

  // src/index.ts
  document.addEventListener("DOMContentLoaded", () => {
    const container = di_config_default("sprotty-diagram");
    const modelSource = container.get(import_sprotty2.TYPES.ModelSource);
    modelSource.setModel(graph);
  });
})();
/*! Bundled license information:

reflect-metadata/Reflect.js:
  (*! *****************************************************************************
  Copyright (C) Microsoft. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0
  
  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.
  
  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** *)
*/
//# sourceMappingURL=index.js.map