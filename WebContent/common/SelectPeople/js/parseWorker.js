function parseJSON(name, data){
    var result = eval('(' + data +')');
    //将得到的结果发送回主线程
    postMessage({
		name: name,
		data: result
	});
};

onmessage = function(event){
    //向主线程发送event.data.name信息
    parseJSON(event.data.name, event.data.data);
};