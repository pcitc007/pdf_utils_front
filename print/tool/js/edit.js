(function () {
    var app = angular.module('myApp', []);
    app.controller('myCtrl', function ($scope, $http, $location, $window) {
        // var root = "http://localhost:8081/printTemp";
        var root = "http://localhost:8080/AtomLocal/faces/PrintTempServlet";
        var ajax = function (url, data) {
            return $.ajax({
                type: "POST",
                dataType: 'json',
                url: url,
                data: data
            });
        };
        var api = {
            queryById: function (id) {
                var url = root + '/edit';
                var data = {
                    id: id
                };
                return ajax(url, data);
            },
            save: function (params) {
                var url = root + "/save";
				var data = $('#baseForm').serializeArray();
				var json = {
                    sqlContent: [],
                    resultDataType: [],
                    fieldName: [],
                    fieldType: [],
                    fieldSource: [],
                };
				$.each(data, function (idx, obj) {
				    switch (obj.name) {
                        case 'sqlContent':
                            json.sqlContent.push(obj.value);break;
                        case 'resultDataType':
                            json.resultDataType.push(obj.value);break;
                        case 'fieldName':
                            json.fieldName.push(obj.value);break;
                        case 'fieldType':
                            json.fieldType.push(obj.value);break;
                        case 'fieldSource':
                            json.fieldSource.push(obj.value);break;
                        default:
                            json[obj.name] = obj.value;break;
                    }
                });
                return ajax(url, data)
            },
            imgList: function () {
                var url = root + "/imgList";
                var data = {};
                return ajax(url, data);
            }
        };

        var init = function () {
            $scope.entity = {
                "imgIdSeal": '',
                "imgIdLogo": ''
            };
            if ($location.search().id !== undefined && $location.search().id.length > 0) {
                api.queryById($location.search().id).then(function (data) {
                    $scope.$apply(function () {
                        $scope.entity = data.entity;
                        $scope.sqlContents = data.sqlContents;
                        $scope.sqlDatatypes = data.sqlDatatypes;
                    });
                    //因为angularjs， ue 加载顺序的问题
                    $window.ue.ready(function () {
                        //设置编辑器的内容
                        $window.ue.setContent($scope.entity.content);
                    });
                });
            }
            api.imgList().then(function (data) {
                $scope.$apply(function () {
                    $scope.imgList = data;
                })
            });
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
