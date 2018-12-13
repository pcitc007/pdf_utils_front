$(function () {
    ;//防止前边有没写分号的情况
    var pdfShow = (function($){
        function _appendStyle() {
            let mengbanCss = '<style type="text/css"> #pcitc_popWindow.popWindow { background-color: rgba(0, 0, 0, 0.5); width: 100%; height: 100%; left: 0; top: 0; /*filter: alpha(opacity=50);*/ /*opacity: 0.5;*/ z-index: 1; position: absolute; } #pcitc_popWindow .maskLayer { /*width: 100%;*/ height: 30px; line-height: 30px; color: #fff; z-index: 2; position: absolute; right: 15px; top: 15px; text-align: center; } #pcitc_popWindow .content{ background-color: red; width: 80%; height: 80%; left: 10%; top: 10%; z-index: 1; position: absolute; } </style>';
            $("head").append(mengbanCss);
        }

        function _appendHtml() {
            let html = '<div id="pcitc_popWindow" class="popWindow" style="display: none;"> <div id="maskLayer" class="maskLayer"> <button onclick="pdfShow.controlDiv(0)">关闭</button> </div> <iframe id="content" src="" class="content"> </iframe> </div>';
            $('body').append(html);
        }

        //蒙版控制
        function _controlDiv(flag, pdfUrl) {
            if(flag == 1 && undefined == pdfUrl) {
                alert("file is error!");
                return false;
            }
            pdfUrl = encodeURIComponent(pdfUrl);
            let headUrl = "./web/viewer.html?file=";
            $("#pcitc_popWindow #content").attr("src", headUrl + pdfUrl);
            let popWindow =  $("#pcitc_popWindow ");
            let maskLayer =  $("#pcitc_popWindow #maskLayer");
            switch (flag) {
                case 0:
                    popWindow.hide();
                    maskLayer.hide();
                    break;
                case 1:
                    popWindow.show();
                    maskLayer.show();
                    break;
                default:
                    popWindow.hide();
                    maskLayer.hide();
                    break;
            }
        }

        function _init() {
            _appendStyle();
            _appendHtml();
        }
        _init();

        return{
            controlDiv: _controlDiv
        };
    })(jQuery);

    window.pdfShow = pdfShow;
});