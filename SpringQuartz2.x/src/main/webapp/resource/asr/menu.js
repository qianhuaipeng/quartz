$(function() {  
	    var datagridId = 'menuDataGrid';  
	    // 第一次加载时自动变化大小  
	    $('#' + datagridId).resizeDataGrid(30, 20, 600, 1000);  
	    // 当窗口大小发生变化时，调整DataGrid的大小  
	    $(window).resize(function() {  
	        $('#' + datagridId).resizeDataGrid(20, 20, 400, 1000);  
	    });  
	    
	    $('#tag_id').textbox({
	    	inputEvents: $.extend({},$.fn.textbox.defaults.inputEvents,{
		    	keyup: function(event){
			    	if(event.keyCode == 13) {
			    		$mainmenu.doSearch();
			    	}
		    	}
	    	})
	    });
	    $menuitem.closeWin();  
	    $mainmenu.load();
});



var $menuitem = {
	tmp: {
		tag_id: null
	},
	loadDataGrid: function(menuTag){
		$('#menuitem-dg').datagrid({
	    	url:'menuResult/list.do?menuTag=' + menuTag,
	    	toolbar: '#menuitem_tb',
	    	columns:[[    
	    	          {field:'swiMeaning',title:'swiMeaning',width:150},    
	    	          {field:'appTag',title:'appTag',width:150},    
	    	          {field:'appDesc',title:'Price',width:150,align:'center'} ,   
	    	          {field:'appDtmf',title:'appDtmf',width:150,align:'center'} ,
	    	          {field:' ',title:'操作',width:150,align:'center',formatter:$menuitem.formart.operate}
	    	]]
	    });
	},
	openWin : function(index){
		$('#menuDataGrid').datagrid('selectRow', index);  
	    var row = $('#menuDataGrid').datagrid('getSelected');
	    $('#menuitem-window').window('open');
	    var menuTag = row.tag_id;
	    this.tmp.tag_id = menuTag;
	    this.loadDataGrid(menuTag);
	},
	closeWin : function(){
		$('#menuitem-window').window('close');
	},
	edit: function(index){
		$('#menuitem-dg').datagrid('selectRow', index);  
	    var row = $('#menuitem-dg').datagrid('getSelected');  
	    if (row){  
	        $('#menuitem_edit_dlg').dialog('open').dialog('setTitle','修改');  
	        $('#menuitem_editfm').form('load',row);  
	    }  
	},
	update: function(){
		$('#menuitem_editfm').form('submit', { 
	        url: "menuResult/update.do", 
	        onSubmit: function () {        //表单提交前的回调函数 
	          var isValid = $(this).form('validate');//验证表单中的一些控件的值是否填写正确，比如某些文本框中的内容必须是数字 
	          if (!isValid) { 
	          } 
	          return isValid; // 如果验证不通过，返回false终止表单提交 
	        }, 
	        success: function (data) {  //表单提交成功后的回调函数，里面参数data是我们调用方法的返回值。 
	          var data = eval('(' + data + ')');
	          //alert(data);
	          if (data.success) { 
	            $.messager.show({ 
	              title: '提示消息', 
	              msg: '修改成功', 
	              showType: 'show', 
	              timeout: 1000, 
	              style: { 
	                right: '', 
	                bottom: ''
	              } 
	            }); 
	            $('#menuitem-dg').datagrid('reload');  // 重新载入当前页面数据  
	            $('#menuitem_edit_dlg').dialog('close');//关闭窗口 
	          } else { 
	            $.messager.alert('提示信息', '修改失败！', 'warning'); 
	        	} 
	        } 
	      }); 
	
	},
	addDlg : function(){
		$('#menuitem_add_dlg').dialog('open');
		$('#menuTag').val(this.tmp.tag_id);
	},
	add : function(){
		$('#menuitem_addfm').form('submit', { 
	        url: "menuResult/add.do", 
	        onSubmit: function () {        //表单提交前的回调函数 
	          var isValid = $(this).form('validate');//验证表单中的一些控件的值是否填写正确，比如某些文本框中的内容必须是数字 
	          if (!isValid) { 
	          } 
	          return isValid; // 如果验证不通过，返回false终止表单提交 
	        }, 
	        success: function (data) {  //表单提交成功后的回调函数，里面参数data是我们调用方法的返回值。 
	          var data = eval('(' + data + ')');
	          //alert(data);
	          if (data.success) { 
	            $.messager.show({ 
	              title: '提示消息', 
	              msg: '添加成功', 
	              showType: 'show', 
	              timeout: 1000, 
	              style: { 
	                right: '', 
	                bottom: ''
	              } 
	            }); 
	            $("#menuitem_addfm").form('clear');
	            $('#menuitem-dg').datagrid('reload');  // 重新载入当前页面数据  
	            $('#menuitem_add_dlg').dialog('close');//关闭窗口 
	          } else { 
	            $.messager.alert('提示信息', '添加失败！', 'warning'); 
	        	} 
	        } 
	      }); 
	},
	del: function(index){
		var self = this;
		$.messager.confirm('Confirm', '确认删除?', function(r){
			if (r){
				$('#menuDataGrid').datagrid('selectRow', index);  
	    		var row = $('#menuitem-dg').datagrid('getSelected'); 
	    		var id = row.id;
	    		$.ajax({
					url: 'menuResult/del.do?id='+id,
					type: 'get',
					dataType: 'json',
					success: function(data){
						if(data.success){
							$.messager.show({ 
				              title: '提示消息', 
				              msg: '删除成功', 
				              showType: 'show', 
				              timeout: 1000, 
				              style: { 
				                right: '', 
				                bottom: ''
				              } 
				            }); 
				            $('#menuitem-dg').datagrid('reload');  // 重新载入当前页面数据  
						} else {
							$.messager.alert('提示信息', '删除失败！', 'warning'); 
						}
					},
					error: function(){
						$.messager.alert('提示信息', '删除失败！', 'warning'); 
					}
				});
			}
		});	
	},
	formart: {
		operate: function(value, row, index){
			return '<a href="javascript:void(0)" onclick="$menuitem.edit('+index+')">修改</a>' + '&nbsp;&nbsp;' + '<a href="#" onclick="$menuitem.del('+index+')">删除</a>';
		}
	}
};


var $mainmenu = {
		load: function(){
			var self = this;
			$('#menuDataGrid').datagrid({
		    	url:'menuDisambig/list.do',
		    	pagination:true,
		    	pageSize: 20,
		    	iconCls:'icon-save',
		    	toolbar: '#menu_tb',
		    	columns:[[    
		    	          //{field:'id',title:'id',width:50},    
		    	          {field:'tag_id',title:'tag_id',width:150,formatter:this.formatter.tagIdFormatter},    
		    	          {field:'voice_gram',title:'voice_gram',width:250,align:''} ,   
		    	          {field:'dtmf_gram',title:'dtmf_gram',width:250,align:''} ,
		    	          {field:'voice1',title:'voice1',width:250,align:''} ,
		    	          {field:'voice2',title:'voice2',width:200,align:''} ,
		    	          {field:' ',title:'操作',width:150,align:'center',formatter:this.formatter.operate}
		    	]],
		    	onRowContextMenu: function (e, rowIndex, rowData) { //右键时触发事件 
		    	   $('#contextMenu_disambig').empty();                  
                   e.preventDefault(); //阻止浏览器捕获右键事件
                   $(this).datagrid("clearSelections"); //取消所有选中项
                   $(this).datagrid("selectRow", rowIndex); //根据索引选中该行
                   $('#contextMenu_disambig').menu('appendItem',{id:'edit',text:'修改',iconCls:'icon-edit',handler: function(){self.edit(rowIndex);}});
	       		   $('#contextMenu_disambig').menu('appendItem',{id:'remove',text:'删除',iconCls:'icon-remove',handler: function(){self.del(rowIndex);}});
                   $('#contextMenu_disambig').menu('show', {                        
                       left: e.pageX,//在鼠标点击处显示菜单
                       top: e.pageY
                   });
                   e.preventDefault();  //阻止浏览器自带的右键菜单弹出
               } 
		    });
			
			var pager = $('#menuDataGrid').datagrid('getPager');
			pager.pagination({
			    buttons: [{
			    iconCls: 'icon-add',
			    title: '添加',
			    text: '添加',
			    handler: function() {
					 $('#add_dlg').dialog('open').dialog('setTitle','添加'); 
			    }
			    }]
			
			});
		},	
		formatter: {
			operate: function(value, row, index) {  
			    return '<a href="javascript:void(0)" onclick="$mainmenu.edit('+index+')">修改</a>' + '&nbsp;&nbsp;' + '<a href="#" onclick="$mainmenu.del('+index+')">删除</a>';  
			},
			tagIdFormatter : function(value, row, index) {
				return "<a href='#' onclick='$menuitem.openWin("+index+")'>"+value+"</a>";
			}
		},
		add: function(){
			$('#add_fm').form('submit', { 
		        url: "menuDisambig/add.do", 
		        onSubmit: function () {        //表单提交前的回调函数 
		          var isValid = $(this).form('validate');//验证表单中的一些控件的值是否填写正确，比如某些文本框中的内容必须是数字 
		          if (!isValid) { 
		          } 
		          return isValid; // 如果验证不通过，返回false终止表单提交 
		        }, 
		        success: function (data) {  //表单提交成功后的回调函数，里面参数data是我们调用方法的返回值。 
		          var data = eval('(' + data + ')');
		          //alert(data);
		          if (data.success) { 
		            $.messager.show({ 
		              title: '提示消息', 
		              msg: '添加成功', 
		              showType: 'show', 
		              timeout: 1000, 
		              style: { 
		                right: '', 
		                bottom: ''
		              } 
		            }); 
		            $("#add_fm").form('clear');
		            $('#menuDataGrid').datagrid('reload');  // 重新载入当前页面数据  
		            $('#add_dlg').dialog('close');//关闭窗口 
		          } else { 
		            $.messager.alert('提示信息', '添加失败！', 'warning'); 
		        	} 
		        } 
		      }); 

		},
		edit : function(index){
		    $('#menuDataGrid').datagrid('selectRow', index);  
		    var row = $('#menuDataGrid').datagrid('getSelected');  
		    if (row){  
		        $('#edit_dlg').dialog('open').dialog('setTitle','修改');  
		        $('#fm').form('load',row);  
		    }  

		},
		del : function(index){
			$.messager.confirm('Confirm', '确认删除?', function(r){
				if (r){
					$('#menuDataGrid').datagrid('selectRow', index);  
		    		var row = $('#menuDataGrid').datagrid('getSelected'); 
		    		var id = row.id;
					$.ajax({
						url: 'menuDisambig/del.do?id='+id,
						type: 'get',
						dataType: 'json',
						success: function(data){
							if(data.success){
								$.messager.show({ 
					              title: '提示消息', 
					              msg: '删除成功', 
					              showType: 'show', 
					              timeout: 1000, 
					              style: { 
					                right: '', 
					                bottom: ''
					              } 
					            }); 
					            $('#menuDataGrid').datagrid('reload');  // 重新载入当前页面数据  
							} else {
								$.messager.alert('提示信息', '删除失败！', 'warning'); 
							}
						},
						error: function(){
							$.messager.alert('提示信息', '删除失败！', 'warning'); 
						}
					});
				}
			});	
		},
		doSearch: function(){
			$('#menuDataGrid').datagrid('load',{
				tag_id: $('#tag_id').val()
			});
		},
		update: function(){
			$('#fm').form('submit', { 
		        url: "menuDisambig/update.do", 
		        onSubmit: function () {        //表单提交前的回调函数 
		          var isValid = $(this).form('validate');//验证表单中的一些控件的值是否填写正确，比如某些文本框中的内容必须是数字 
		          if (!isValid) { 
		          } 
		          return isValid; // 如果验证不通过，返回false终止表单提交 
		        }, 
		        success: function (data) {  //表单提交成功后的回调函数，里面参数data是我们调用方法的返回值。 
		          var data = eval('(' + data + ')');
		          //alert(data);
		          if (data.success) { 
		            $.messager.show({ 
		              title: '提示消息', 
		              msg: '提交成功', 
		              showType: 'show', 
		              timeout: 1000, 
		              style: { 
		                right: '', 
		                bottom: ''
		              } 
		            }); 
		            $('#menuDataGrid').datagrid('reload');  // 重新载入当前页面数据  
		            $('#edit_dlg').dialog('close');//关闭窗口 
		          } else { 
		            $.messager.alert('提示信息', '提交失败！', 'warning'); 
		        	} 
		        } 
		      }); 
		},
	};

$(document).ajaxStart(function() {
	MaskUtil.mask();	
});
$(document).ajaxStop(function() {
  	MaskUtil.unmask();
});

