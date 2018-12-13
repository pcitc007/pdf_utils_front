(function () {
    var app = angular.module('myApp', []);
    app.controller('myCtrl', function ($scope, $http, $location, $window) {
        var root = "http://localhost:8081/printTemp";
        var api = {
            queryById: function (id) {
                var url = root + "/edit/" + id;
                return $http.get(url);
            },
            save: function (params) {
				var data = $('#baseForm').serialize();
				console.log(data);
                return $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: root + "/save",
                    data: $('#baseForm').serialize()
                });
            }
        };

        var init = function () {
            $scope.entity = {};
            if ($location.search().id !== undefined && $location.search().id.length > 0) {
                api.queryById($location.search().id).then(function (result) {
                    var data = result.data;
                    $scope.entity = data.entity;
                    $scope.sqlContents = data.sqlContents;
                    $scope.sqlDatatypes = data.sqlDatatypes;
                    //因为angularjs， ue 加载顺序的问题
                    $window.ue.ready(function () {
                        //设置编辑器的内容
                        $window.ue.setContent($scope.entity.content);
                    });

                });
            }
        };
        init();
        var uploadUrl = "http://localhost:8081/file/upload";
        $('#fileupload').fileupload({
            url: uploadUrl,
            done: function (e, data) {
                angular.element("#imgName").val(data.result);
                console.log(data.result)
            },
            progressall: function (e, data) {
                var progress = parseInt(data.loaded / data.total * 100, 10);
                // if (progress >= 100) {
                //     alert("上传完成！")
                // }
            }
        })

        $scope.delModelForm = function (first, partIndex) {
			partIndex = first + partIndex;
            angular.element("#form_" + partIndex).remove();
        };
        $scope.save = function () {
            api.save().error(function (data) {
                if(data.responseText === "success") {
                    alert("保存成功");
                }
            });
        };


    });

})();
