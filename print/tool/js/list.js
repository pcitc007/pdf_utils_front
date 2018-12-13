(function () {
    var app = angular.module('myApp', []);
    app.controller('myCtrl', function ($scope, $http) {
        var root = "http://localhost:8081/printTemp";
        // let init = function() {
        //     $http.get(root + "/edit").then(function (result) {
        //         $scope.entity = result.entity;
        //         $scope.sqlContents = result.sqlContents;
        //         $scope.sqlDatatypes = result.sqlDatatypes;
        //     });
        // };
        // init();
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
            } else if(turnPageNo.val() > 0 && turnPageNo.val < $scope._pager.pageSize) {
                $scope.queryList(turnPageNo.val())
            } else {
                turnPageNo.val($scope._pager.pageSize);
                alert('请输入正确的页数!');
            }
        };
        $scope.queryList = function (pageNo) {
            var id = "", name = "";
            if ($scope._page !== undefined) {
                id = $scope._page.id;
                name = $scope._page.name;
            }
            if (pageNo === undefined) {
                pageNo = 1
            }
            api.queryList(id, name, pageNo).then(function (result) {
                var data = result.data;
                $scope.list = data.list;
                $scope._page = data._page;
                $scope._pager = data._pager;
                $scope._pagerUrl = data._pagerUrl;
            })
        };


        $scope.edit = function () {
            alert("edit");
            // $http.post(root + "/queryList?id=" + $scope._page.id + "&name="+"$scope._page.name"+"&pageNo=1").then(function (result) {
            //     debugger
            //     $scope._page = result._page;
            //     $scope._pager = result._pager;
            //     $scope._pagerUrl = result._pagerUrl;
            // })
        };
    }).directive("runoobDirective", function () {
        return {
            template: "<h1>自定义指令!</h1>"
        };
    });

})();
