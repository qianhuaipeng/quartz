$(function(){
	var datagridId = 'calllog_dg';  
    // 第一次加载时自动变化大小  
    $('#' + datagridId).resizeDataGrid(30, 20, 600, 1000);  
    // 当窗口大小发生变化时，调整DataGrid的大小  
    $(window).resize(function() {  
        $('#' + datagridId).resizeDataGrid(20, 20, 400, 1000);  
    });
	$calllog.init();
	
});

var $calllog = {
	init:function(){
		var self = this;
		this.loadData();
	},
	loadData:function(){
		$('#calllog_dg').datagrid({
			url:'calllog/list.do',
			toolbar: '#toolbar',
			rownumbers: true,
			pagination:true,
	    	pageSize: 20,
			columns:[[    
	    	          {field:'call_id',title:'呼叫ID',width:150},    
	    	         // {field:'sessionId',title:'sessionId',width:150},    
	    	          {field:'cust_id',title:'客户号',width:150,align:''} ,   
	    	          {field:'create_time',title:'访问时间',width:150,align:'',formatter:$calllog.formart.operate}
	    	          //{field:' ',title:'操作',width:150,align:'center',formatter:$menuitem.formart.operate}
	    	]]
			
		});
		
	},
	formart: {
		operate: function(value){
			var date = new Date(value);
			var month = date.getMonth()+1;
			return date.getFullYear()+'-'+month+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
		}
	},
	doSearch:function(){
		var startTime =  $('#startTime').val();
		var endTime = $('#endTime').val();
		if(compareTime(startTime,endTime)){
			$('#calllog_dg').datagrid('load',{
				//call_id: $('#call_id').val(),
				cust_id: $('#cust_id').val(),
				startTime: $('#startTime').val(),
				endTime: $('#endTime').val()	
			});
		}
	},
	
	export_:function(){
		var startTime =  $('#startTime').val();
		var endTime = $('#endTime').val();
		var cust_id = $('#cust_id').val();
		var data=$('#calllog_dg').datagrid('getData');
		var total = data.total;
		var pageSize = 8000;
		if(total > 0){
			if(total > pageSize){
				
			}
			window.location.href = "calllog/export.do?cust_id="+cust_id+"&startTime="+startTime+"&endTime="+endTime;
		} else {
			alert("当前无数据！");
		}
			
	}
};

//判断日期，时间大小  
function compareTime(startDate, endDate) {   
	if (startDate.length > 0 && endDate.length > 0) {   
	    var startDateTemp = startDate.split(" ");   
	    var endDateTemp = endDate.split(" ");   
	    var arrStartDate = startDateTemp[0].split("-");   
	    var arrEndDate = endDateTemp[0].split("-");   
	    var arrStartTime = startDateTemp[1].split(":");   
	    var arrEndTime = endDateTemp[1].split(":");   
	    var allStartDate = new Date(arrStartDate[0], arrStartDate[1], arrStartDate[2], arrStartTime[0], arrStartTime[1], arrStartTime[2]);   
	    var allEndDate = new Date(arrEndDate[0], arrEndDate[1], arrEndDate[2], arrEndTime[0], arrEndTime[1], arrEndTime[2]);   
		if (allStartDate.getTime() >= allEndDate.getTime()) {   
	        alert("开始时间不能大于结束时间");   
	        return false;   
		} else if(allStartDate.getFullYear() != allEndDate.getFullYear()){
			alert("时间跨度不能跨年分");   
	        return false;
		} else if(allEndDate.getMonth() - allStartDate.getMonth() > 1){
			alert("时间只能选择相邻月份");   
	        return false;
		}
	} else if(startDate.length == 0){ 
		if(endDate.length > 0){
			alert("请选择开始时间！");   
			return false;   
		}
		
    }   
	return true;
}   



$(document).ajaxStart(function() {
	MaskUtil.mask();	
});
$(document).ajaxStop(function() {
  	MaskUtil.unmask();
});