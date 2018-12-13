/**
 * 通用删除
 * @param {Object} url
 * @param {Object} param
 */
var commonDel = function(url,param) {
	if(confirm('确认删除?')) {
		$.post(url,param,function(data) {
			if(data == "suc"){
				location.reload();
			}else{
				alert(data);
			}
		});
	}
}
/**
 * 通用恢复
 * @param {Object} url
 * @param {Object} param
 */
var commonRevive = function(url,param) {
	if(confirm('确认恢复?')) {
		$.post(url,param,function(data) {
			if(data=="suc"){
				location.reload();
			}else{
				alert(data);
			}
		});
	}
}
/**
 * 通用发布
 * @param {Object} url
 * @param {Object} param
 */
var commonPub = function(url,param) {
	$.post(url,param,function(data) {
			if(data=="suc"){
				location.reload();
			}else{
				alert(data);
			}
		});
}

/**
 * 通用恢复
 * @param {Object} url
 * @param {Object} param
 */
var commonRevive = function(url,param) {
	if(confirm('确认恢复?')) {
		$.post(url,param,function(data) {
			if(data=="suc"){
				location.reload();
			}else{
				alert(data);
			}
		});
	}
}
/**
 * 对con中的key添加strong标识
 * @author su
 * @param {} con
 * @param {} key
 * @return {}
 */
 var keyStrong = function(con, key) {
	var nk = con.indexOf(key);
	var res = "";
	while (nk != -1) {
		res += con.substring(0, nk) + "<strong>" + key + "</strong>";
		con = con.substr(nk + key.length);
		nk = con.indexOf(key);
	}
	res += con;
	return res;
}
/**
 * 控件显示字符长度
 * eg. $(".box4 h2 > a").textLen(30);
 */
$.fn.extend({
	textLen:function(n){
		return this.each(function(){
			if($(this).text().length>n){
				$(this).text($(this).text().substr(0,n-2)+"...");
			}
		});
	}
});

/**
 * 浮点数四舍五入显示
 * src受控数
 * pos显示小数位数
 */
var formatFloat = function(src, pos) { 
	var v = Math.round(src*Math.pow(10, pos))/Math.pow(10, pos);
	alert(v); 
}

/**
 * 清空表单元素值(置为空而不是默认值)
 * @param {Object} formId 指定表单ID
 */
function setFormEmpty(formId){
	$("#"+formId+" input[type=text]").val("");
	//360浏览器中，无法使用
	//$("#"+formId+" option").removeAttr('selected');
	var obj = document.getElementsByTagName("select");
	for(var i=0 ; i<obj.length ; i++){
		obj[i].selectedIndex = 0;
		//alert(obj[i].selectedIndex);
	}
}
/**
 * id串排序
 * @param oldStr 原顺序，如56,23,78
 * @param moveId 移动的id
 * @param type 移动类型，1后-1前
 * @param targetId 目标id
 * @return 排序后的id串 
 */
var strSort = function(oldStr,moveId,type,targetId){
        oldStr = ","+oldStr+",";
        var indexOfMoveId = oldStr.indexOf(","+moveId+",");
        var indexOfTargetId = oldStr.indexOf(","+targetId+",");
        var firstSplitIndex;
        var secondSplitIndex;
        var firstSplitLength;
        var secondSplitLength;
        if(indexOfMoveId < indexOfTargetId){
                firstSplitIndex = indexOfMoveId;
                secondSplitIndex = indexOfTargetId;
                firstSplitLength = (","+moveId).length;
                secondSplitLength = (","+targetId).length;
        }else{
                firstSplitIndex = indexOfTargetId;
                secondSplitIndex = indexOfMoveId;
                firstSplitLength = (","+targetId).length;
                secondSplitLength = (","+moveId).length;
        }
        var subStr3 = oldStr.substring(0,firstSplitIndex);
        var subStr4 = oldStr.substring(firstSplitIndex+firstSplitLength,secondSplitIndex);
        var subStr5 = oldStr.substring(secondSplitIndex+secondSplitLength,oldStr.length-1);
        var res;
        if(indexOfMoveId < indexOfTargetId){
                if(type == 1){//后
                        res = subStr3 + subStr4 + "," + targetId + "," + moveId + subStr5;
                }
                if(type == -1){//前
                        res = subStr3 + subStr4 + "," + moveId + "," + targetId + subStr5;
                }
        }else{
                if(type == 1){//后
                        res = subStr3 + "," + targetId + "," + moveId + subStr4 + subStr5;
                }
                if(type == -1){//前
                        res = subStr3 + "," + moveId + "," + targetId + subStr4 + subStr5;
                }
        }
        return res.substring(1);
};