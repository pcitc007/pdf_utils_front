(function () {
    var app = angular.module('myApp', []);
    app.controller('myCtrl', function ($scope, $http) {


        var root = "http://localhost:8081/printTemp";
        var init = function() {
            $scope.queryId = "";
            $scope.queryName = "";
        };
        init();
        var api = {
            delete: function (id) {
                return $http.delete(root + "/" + id);
            },
            edit: function (id) {
                return $
            },
            queryList: function (id, name, pageNo) {
                var url = root + "/queryList?id=" + id + "&name=" + name + "&pageNo=" + pageNo;
                return $http.get(url);
            }
        };

        $scope.commonDel = function (id) {
            if (confirm('确认删除?')) {
                api.delete(id).then(function (data) {
                    if (data === "suc") {
                        if($scope._page.pageNo !== undefined) {
                            $scope.queryList($scope._page.pageNo)
                        } else {
                            $scope.queryList(1)
                        }
                    } else {
                        alert(data);
                    }
                });
            }
        };
        $scope.edit = function (id) {
            if (confirm('确认删除?')) {
                api.delete(id).then(function (data) {
                    if (data === "suc") {
                        location.reload();
                    } else {
                        alert(data);
                    }
                });
            }
        };
        $scope.gotoPage = function () {
            var turnPageNo = angular.element("#turnPageNo");
            if (turnPageNo.val() === '') {
                turnPageNo.focus();
                alert('请输入要跳转的页数!');
            } else if(turnPageNo.val() > 0 && turnPageNo.val() <= $scope._pager.pageSize) {
                $scope.queryList(turnPageNo.val())
            } else {
                turnPageNo.val($scope._pager.pageSize);
                alert('请输入正确的页数!');
            }
        };
        $scope.queryList = function (pageNo) {
            if (pageNo === undefined) {
                pageNo = 1
            }
            api.queryList($scope.queryId, $scope.queryName, pageNo).then(function (result) {
                var data = result.data;
                $scope.list = data.list;
                $scope._page = data._page;
                $scope._pager = data._pager;
                $scope._pagerUrl = data._pagerUrl;
            })
        };
    });


    var test = "<p style=\"text-align: right;\">\n" + "    fjaklsdjflasjdfa &nbsp; afsdfasdfasdf\n" + "</p>\n" + "<table style=\"border-collapse:collapse\" width=\"90%\" cellspacing=\"0\" cellpadding=\"0\" bordercolor=\"#000000\" border=\"0\" align=\"center\">\n" + "    <tbody>\n" + "        <tr class=\"firstRow\">\n" + "            <td colspan=\"6\" style=\"text-align:center;border: 0px;\">\n" + "                <br/><span style=\"font-family:宋体;font-size:18px\"><strong>内部账户利息计付通知单</strong></span>\n" + "                <hr style=\"width: 70%;size: 2px;\" color=\"#000\"/>\n" + "            </td>\n" + "        </tr>\n" + "        <tr>\n" + "            <td colspan=\"6\" style=\"text-align:center;border: 0px;\">\n" + "                @EFFECTIVE_DT_FORMAT2@\n" + "            </td>\n" + "        </tr>\n" + "        <tr>\n" + "            <td colspan=\"6\" style=\"text-align:right;border: 0px;\">\n" + "                交易编号：@TRADE_ID@\n" + "            </td>\n" + "        </tr>\n" + "        <tr>\n" + "            <td colspan=\"3\" style=\"text-align:left;border: 0px;\">\n" + "                户名：@ACCOUNT_NM@\n" + "            </td>\n" + "            <td colspan=\"3\" style=\"text-align:left;border: 0px;\">\n" + "                业务类型：@DEPOSITE_TYPE@\n" + "            </td>\n" + "        </tr>\n" + "        <tr>\n" + "            <td style=\"text-align:center;border-width:2px 1px 1px 2px;width: 15%; border-style: solid;\">\n" + "                起息日期\n" + "            </td>\n" + "            <td style=\"text-align:center;border-width:2px 1px 1px 1px;width: 15%; border-style: solid;\">\n" + "                截止日期\n" + "            </td>\n" + "            <td style=\"text-align:center;border-width:2px 1px 1px 1px;width: 25%; border-style: solid;\">\n" + "                本金\n" + "            </td>\n" + "            <td style=\"text-align:center;border-width:2px 1px 1px 1px;width: 10%; border-style: solid;\">\n" + "                天数\n" + "            </td>\n" + "            <td style=\"text-align:center;border-width:2px 1px 1px 1px;width: 10%; border-style: solid;\">\n" + "                利率（%）\n" + "            </td>\n" + "            <td style=\"text-align:center;border-width:2px 2px 1px 1px;width: 25%; border-style: solid;\">\n" + "                利息\n" + "            </td>\n" + "        </tr>\n" + "        <tr>\n" + "            <td style=\"text-align:left;border-width:0px 1px 1px 2px; border-style: solid;\">\n" + "                @PERIOD_START_DT_FORMAT1@\n" + "            </td>\n" + "            <td style=\"text-align:left;border-width:1px 1px 1px 1px; border-style: solid;\">\n" + "                @PERIOD_END_DT_FORMAT1@\n" + "            </td>\n" + "            <td style=\"text-align:left;border-width:1px 1px 1px 1px; border-style: solid;\">\n" + "                @CURRENCY_SYMBOL@@FACE_AMT_FORMAT@\n" + "            </td>\n" + "            <td style=\"text-align:left;border-width:1px 1px 1px 1px; border-style: solid;\">\n" + "                @INTEREST_TERM@\n" + "            </td>\n" + "            <td style=\"text-align:left;border-width:1px 1px 1px 1px; border-style: solid;\">\n" + "                @FINAL_RT_FORMAT@\n" + "            </td>\n" + "            <td style=\"text-align:left;border-width:1px 2px 1px 1px; border-style: solid;\">\n" + "                @CURRENCY_SYMBOL@@INTPAY_AMT_FORMAT@\n" + "            </td>\n" + "        </tr>\n" + "        <tr>\n" + "            <td style=\"text-align:left;border-width:1px 1px 1px 2px; border-style: solid;\"></td>\n" + "            <td style=\"text-align:left;border-width:1px 1px 1px 2px; border-style: solid;\"></td>\n" + "            <td style=\"text-align:left;border-width:1px 1px 1px 2px; border-style: solid;\"></td>\n" + "            <td style=\"text-align:left;border-width:1px 1px 1px 2px; border-style: solid;\"></td>\n" + "            <td style=\"text-align:left;border-width:1px 1px 1px 2px; border-style: solid;\"></td>\n" + "            <td style=\"text-align:left;border-width:1px 2px 1px 1px; border-style: solid;\"></td>\n" + "        </tr>\n" + "        <tr>\n" + "            <td style=\"text-align:left;border-width:1px 1px 1px 2px; border-style: solid;\"></td>\n" + "            <td style=\"text-align:left;border-width:1px 1px 1px 2px; border-style: solid;\"></td>\n" + "            <td style=\"text-align:left;border-width:1px 1px 1px 2px; border-style: solid;\"></td>\n" + "            <td style=\"text-align:left;border-width:1px 1px 1px 2px; border-style: solid;\"></td>\n" + "            <td style=\"text-align:left;border-width:1px 1px 1px 2px; border-style: solid;\"></td>\n" + "            <td style=\"text-align:left;border-width:1px 2px 1px 1px; border-style: solid;\"></td>\n" + "        </tr>\n" + "        <tr>\n" + "            <td colspan=\"4\" style=\"text-align:right;border-width:1px 1px 1px 2px; border-style: solid;\">\n" + "                合计（大写）：@INTPAY_AMT_UPPER@\n" + "            </td>\n" + "            <td colspan=\"2\" style=\"text-align:right;border-width:1px 2px 1px 1px; border-style: solid;\">\n" + "                @CURRENCY_SYMBOL@@INTPAY_AMT_FORMAT@\n" + "            </td>\n" + "        </tr>\n" + "        <tr>\n" + "            <td colspan=\"2\" style=\"text-align:left;border-width:1px 0px 0px 2px; border-style: solid;\">\n" + "                旧存单号：@CP_ACCOUNT_CD2@\n" + "            </td>\n" + "            <td colspan=\"4\" style=\"text-align:left;border-width:1px 2px 0px 0px; border-style: solid;\">\n" + "                收息账号：上述利息，已照付你单位（@ACCOUNT_NUM@）号账户\n" + "            </td>\n" + "        </tr>\n" + "        <tr>\n" + "            <td colspan=\"6\" style=\"text-align:left;border-width:0px 2px 0px 2px; border-style: solid;\">\n" + "                新存单号：@CP_ACCOUNT_CD@\n" + "            </td>\n" + "        </tr>\n" + "        <tr>\n" + "            <td colspan=\"5\" style=\"text-align:left;border-width:0px 0px 1px 2px; border-style: solid;\">\n" + "                摘要：@DETAIL@\n" + "            </td>\n" + "            <td style=\"text-align:right;border-width:0px 2px 2px 0px; border-style: solid;\">\n" + "                财务公司盖章\n" + "            </td>\n" + "        </tr>\n" + "        <tr>\n" + "            <td colspan=\"3\" style=\"border-width: 0px 0px 0px 0px;\"></td>\n" + "            <td colspan=\"2\" style=\"border-width: 0px 0px 0px 0px; border-color: black; font-size:12px; border-style: solid;text-align: right;\">\n" + "                [录入]@CREATED_BY@\n" + "            </td>\n" + "            <td style=\"border-width: 0px 0px 0px 0px; border-color: black; font-size:12px; border-style: solid;text-align: right;\">\n" + "                [复核]@APPROVED_BY@\n" + "            </td>\n" + "        </tr>\n" + "    </tbody>\n" + "</table>";

})();
