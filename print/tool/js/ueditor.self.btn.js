//自定义引用样式例子
var btn_name = {
    head: "thead",
    body: "tbody",
    foot: "tfoot",
    head_lable: '设置表为表头',
    body_lable: "设置表为表体",
    foot_lable: "设置表为表尾"
};
UE.registerUI(btn_name.head,function(editor,uiName){
    editor.registerCommand(uiName,{
        queryCommandState: function () {
            var rng = this.selection.getRange();
            return UE.dom.domUtils.findParentByTagName(rng.startContainer, 'table', true) ? 0 : -1;
        },
        execCommand: function (cmd, table) {
            var rng = this.selection.getRange();
            table = table || UE.dom.domUtils.findParentByTagName(rng.startContainer, 'table', true);
            if (table) {
                var next = table.nextSibling;
                if (!next) {
                    next = UE.dom.domUtils.createElement(this.document, 'p', {
                        'innerHTML': browser.ie ? domUtils.fillChar : '<br/>'
                    });
                    table.parentNode.insertBefore(next, table);
                }
                UE.dom.domUtils.setAttributes(table, {"id": btn_name.head, "title": "表头"});
            }

        }
    });

    var btn = new UE.ui.Button({
        name:uiName,
        title: btn_name.head_lable,
        cssRules :"background-position: -582px 99px;",
        onclick:function () {
            editor.execCommand(uiName);
        }
    });

    editor.addListener('selectionchange', function () {
        var state = editor.queryCommandState(btn_name.head);
        if (state === -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
        } else {
            btn.setDisabled(false);
            btn.setChecked(state);
        }
    });

    return btn;
});
UE.registerUI(btn_name.body,function(editor,uiName){
    editor.registerCommand(uiName,{
        queryCommandState: function () {
            var rng = this.selection.getRange();
            return UE.dom.domUtils.findParentByTagName(rng.startContainer, 'table', true) ? 0 : -1;
        },
        execCommand: function (cmd, table) {
            debugger
            var rng = this.selection.getRange();
            table = table || UE.dom.domUtils.findParentByTagName(rng.startContainer, 'table', true);
            if (table) {
                var next = table.nextSibling;
                if (!next) {
                    next = UE.dom.domUtils.createElement(this.document, 'p', {
                        'innerHTML': browser.ie ? domUtils.fillChar : '<br/>'
                    });
                    table.parentNode.insertBefore(next, table);
                }
                UE.dom.domUtils.setAttributes(table, {"id": btn_name.body, "title": "表体"});
            }

        }
    });

    var btn = new UE.ui.Button({
        name:uiName,
        title: btn_name.body_lable,
        cssRules :"background-position: -582px 99px;",
        onclick:function () {
            editor.execCommand(uiName);
        }
    });

    editor.addListener('selectionchange', function () {
        var state = editor.queryCommandState(btn_name.body);
        if (state === -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
        } else {
            btn.setDisabled(false);
            btn.setChecked(state);
        }
    });

    return btn;
});
UE.registerUI(btn_name.foot,function(editor,uiName){
    editor.registerCommand(uiName,{
        queryCommandState: function () {
            var rng = this.selection.getRange();
            return UE.dom.domUtils.findParentByTagName(rng.startContainer, 'table', true) ? 0 : -1;
        },
        execCommand: function (cmd, table) {
            debugger
            var rng = this.selection.getRange();
            table = table || UE.dom.domUtils.findParentByTagName(rng.startContainer, 'table', true);
            if (table) {
                var next = table.nextSibling;
                if (!next) {
                    next = UE.dom.domUtils.createElement(this.document, 'p', {
                        'innerHTML': browser.ie ? domUtils.fillChar : '<br/>'
                    });
                    table.parentNode.insertBefore(next, table);
                }
                UE.dom.domUtils.setAttributes(table, {"id": btn_name.foot, "title": "表尾"});
            }

        }
    });

    var btn = new UE.ui.Button({
        name:uiName,
        title: btn_name.foot_lable,
        cssRules :"background-position: -582px 99px;",
        onclick:function () {
            editor.execCommand(uiName);
        }
    });

    editor.addListener('selectionchange', function () {
        var state = editor.queryCommandState(btn_name.foot);
        if (state === -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
        } else {
            btn.setDisabled(false);
            btn.setChecked(state);
        }
    });

    return btn;
});