/**
 * 字符串格式化方法
 * @params null
 * @example '我是{0}'.format('CoderQ') => '我是CoderQ'
 * @depends trim
 * @returns string
 */
String.prototype.format = function(){
	var args = arguments;
	return this.replace(/\{\d+\}/g, function($){return args[$.trim('{}')]});
};
 
/**
 * 过滤特殊字符
 * @params chars string 特殊字符
 * @example '{0}'.trim('{}') => '0'
 * @depends null
 * @returns string
 */
String.prototype.trim = function(chars){
	return chars 
	?	this.replace(new RegExp('['+chars.replace(/(.)/g, '\\$1')+']', 'g'), '')
	:	this.replace(/^\s+/, '').replace(/\s+$/, '');
};
 
/**
 * 字符串转数字
 * @params null
 * @example '2'.toNumber() => 2
 * @depends null
 * @returns number
 */
String.prototype.toNumber = function(){
	return Number(this);
};
 
/**
 * 数字转字符串
 * @params null
 * @example 2.toString() => '2'
 * @depends null
 * @returns string
 */
Number.prototype.toString = function(){
	return '' + this;
};
 
/**
 * 判断数组中是否存在特定元素
 * @params object 特定元素
 * @example [1, 2].in_array(1) => true;
 * @depends null
 * @returns boolean
 */
Array.prototype.in_array = function(object){
	var i = 0, length = this.length;
	while(i < length && object !== this[i++]);
	return i < length;
};
 
/**
 * 遍历数组
 * @params callback 对数组元素的处理方法
 * @example [1, 2].each(function(index, value){alert(value);});
 * @depends null
 * @returns this
 */
Array.prototype.each = function(callback){
	for(var i = 0; i < this.length; i++){
		callback(i, this[i]);
	}
	return this;
};
 
/**
 * 根据索引删除数组中某个元素
 * @params index 索引
 * @example [1, 2].remove(0) => [2]
 * @depends null
 * @returns object
 */
Array.prototype.remove = function(index){
	delete this[index];
	for(var i = index + 1; i < this.length; i++){
		this[i - 1] = this[i];
	}
	return this.pop();
}
 
/**
 * 根据日期获取日历
 * @params null
 * @example new Date().getCalander()
 * @depends null
 * @returns object
 */
Date.prototype.getCalander = function(){  
    var _calander = {};  
    var _year = this.getFullYear();  
    var _month = this.getMonth()+1;  
    var _date = this.getDate();  
    var _leap_year = ((_year % 4 == 0 && _year % 100 != 0) || (_year % 400 == 0 )) ? true : false;  
    var _month_day_count = [31, _leap_year ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];  
    var _day = this.getDay();  
    var _first_day = (8 - (_date - _day) % 7 ) % 7;  
	var _last_day = _month_day_count[_month - 1] + _first_day - 1;
	_calander.year = _year;
	_calander.month = _month;
    _calander.date = _date;  
    _calander.calander = [];  
	for(var i = 0; i < _first_day; i++){
		var _m = _month === 1 ? 12 : _month - 1;
		_calander.calander.push({
			year: _m === 12 ? _year - 1 : _year,
			month: _m,
			date: _month_day_count[_m - 1] - _first_day + i + 1
		});
	}
	for(var i = _first_day; i <= _last_day; i++){
		_calander.calander.push({
			year: _year,
			month: _month,
			date: i - _first_day + 1
		});
	}
	for(var i = _last_day + 1; i < 42; i++){
		var _m = _month === 12 ? 1 : _month + 1;
		_calander.calander.push({
			year: _m === 1 ? _year + 1 : _year,
			month: _m,
			date: i - _last_day
		});
	}
    return _calander;  
}
 
/**
 * 时间格式化函数
 * @params 
 *	format 格式
 *	language 语言
 * @example new Date().format('Y-m-d H:i:s')
 * @depends toString
 * @returns string
 */
Date.prototype.format = function(format, lang){
	var _format = format || '';
	var _lang = lang || 'zh';
	var _month_text = {
		'zh': ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
		'en': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	}
	var _day_text = {
		'zh': ['日', '一', '二', '三', '四', '五', '六'],
		'en': ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']
	}
	var _year = this.getFullYear();
	var _month = this.getMonth() + 1;
	var _date = this.getDate();
	var _day = this.getDay();
	var _hour = this.getHours();
	var _minute = this.getMinutes();
	var _second = this.getSeconds();
	return _format.replace(/Y/g, _year)
		.replace(/y/g, _year.toString().substr(2))		//如果不想用toString，也可以直接将_year.toString()替换为(''+_year)
		.replace(/M/g, _month_text[_lang][_month - 1])
		.replace(/m/g, _month > 9 ? _month : '0' + _month)
		.replace(/n/g, _month)
		.replace(/D/g, _day_text[_lang][_day])
		.replace(/d/g, _date > 9 ? _date : '0' + _date)
		.replace(/j/g, _date)
		.replace(/H/g, _hour > 9 ? _hour : '0' + _hour)
		.replace(/G/g, _hour)
		.replace(/h/g, (_hour % 12) > 9 ? (_hour % 12) : '0' + (_hour % 12))
		.replace(/g/g, _hour % 12)
		.replace(/i/g, _minute > 9 ? _minute : '0' + _minute)
		.replace(/s/g, _second > 9 ? _second : '0' + _second);
}
 
/**
 * 获取url的参数
 * @params name 参数名称
 * @example window.location.get('func')
 * @depends null
 * @returns object
 */
window.location.get = function(name){
	return name
	?	(function(){
		var str = '({0}=)([^\&]+)'.format(name);
		var reg = new RegExp(str);
		var match = null;
		return (match = reg.exec(location.search))
			?	match[2]
			:	null;
	})()
	:	(function(){
		var args = {};
		var match = null;
		var reg = /(?:([^\&\?]+)=([^\&]+))/g;
		while((match = reg.exec(location.search))!==null){
			args[match[1]] = match[2];
		}
		return args;
	})();
}