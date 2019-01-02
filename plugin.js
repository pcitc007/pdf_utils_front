$(function () {
    ;//防止前边有没写分号的情况
    var pdfShow = (function ($) {
            function _appendStyle() {
                var mengbanCss = '<style type="text/css"> #pcitc_mengban {background-color: rgb(0, 0, 0);width: 100%;height: 100%;left: 0;top: 0;z-index: 0;position: absolute;filter:alpha(opacity:50); opacity:0.5;  -moz-opacity:0.5;-khtml-opacity: 0.5;}  #pcitc_popWindow.popWindow {width: 100%;height: 100%;left: 0;top: 0;z-index: 1;position: absolute;}  #pcitc_popWindow .maskLayer {height: 30px;line-height: 30px;color: #fff;z-index: 200;position: absolute;right: 15px;top: 15px;text-align: center;}  #pcitc_popWindow .content {z-index: 200;width: 80% !important; height: 80%; position: absolute; left: 10%; top: 45px;}</style>';
                $("head").append(mengbanCss);
            }

            function _appendHtml() {
                var html = '<div id="pcitc_mengban" style="display: none;"></div><div id="pcitc_popWindow" class="popWindow" style="display: none;"><div id="maskLayer" class="maskLayer">' +
                    '<button class="close" onclick="pdfShow.showPdf(false)">关闭</button> <br/>' +
                    '<button class="prev" onclick="pdfShow.switchPdf(undefined, this)">上一个</button> <br/>' +
                    '<button class="next" onclick="pdfShow.switchPdf(undefined, this)">下一个</button> <br/>' +
                    '</div><div id="content" src="" class="content"></div></div>';
                $('body').append(html);
            }


            //蒙版控制
            var _pdfNameArray = [];
            var _pdfPath = "../download/pdf/";

            function _showPdf(flag) {
                var popMengban = $("#pcitc_mengban ");
                var popWindow = $("#pcitc_popWindow ");
                var maskLayer = $("#pcitc_popWindow #maskLayer");
                if (!!flag) {
                    popMengban.show();
                    popWindow.show();
                    maskLayer.show();
                } else {
                    popMengban.hide();
                    popWindow.hide();
                    maskLayer.hide();
                }
            }

            function _switchPdf(pdfUrl, obj) {
                console.log($(obj).attr("data-pdfUrl"))
                if (undefined === pdfUrl) {
                    if(!$(obj).attr("data-pdfUrl")) {
                       return false;
                    } else {
                        pdfUrl = $(obj).attr("data-pdfUrl")
                    }
                }

                //播放pdf
                $('#pcitc_popWindow #content').media({
                    width: '100%',
                    height: '100%',
                    autoplay: true,
                    src: _pdfPath + pdfUrl
                });

                //控制上下按钮
                var $prevBtn = $("#pcitc_popWindow #maskLayer .prev");
                var $nextBtn = $("#pcitc_popWindow #maskLayer .next");
                $prevBtn.hide();
                $nextBtn.hide();
                $.each(_pdfNameArray, function (idx, obj) {
                    debugger
                    //1.第一个,没有上一个
                    if (obj === pdfUrl) {
                        //判断是否有下一个
                        if (idx === 0) {
                            if(idx < (_pdfNameArray.length - 1)) {
                                $nextBtn.show().attr("data-pdfUrl", _pdfNameArray[idx+1]);
                            }
                            //2.最后一个，没有下一个,肯定有上一个
                        } else if (idx === (_pdfNameArray.length - 1)) {
                            $prevBtn.show().attr("data-pdfUrl", _pdfNameArray[idx-1]);
                            //3.中间，上、下都有
                        } else {
                            $prevBtn.show().attr("data-pdfUrl", _pdfNameArray[idx-1]);
                            $nextBtn.show().attr("data-pdfUrl", _pdfNameArray[idx+1]);
                        }
                    }
                });

            }

            function _controlDiv(pdfList) {
                //fileList.fileList.list.source
                if (undefined !== pdfList.fileList && pdfList.fileList.length > 0) {
                    _pdfNameArray = pdfList.fileList.list.source;
                    _showPdf(true);
                    _switchPdf(_pdfNameArray[0]);
                }
            }

            function _init() {
                _appendStyle();
                _appendHtml();
            }

            _init();

            return {
                controlDiv: _controlDiv,
                switchPdf: _switchPdf,
                pdfNameArray: _pdfNameArray,
                showPdf: _showPdf
            };
        }

    )(jQuery);

    window.pdfShow = pdfShow;
})
;
