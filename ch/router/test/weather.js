var request = require('request');
require('date-utils');
var dDate = new Date();
var today = dDate.toFormat('YYYYMMDD');

var token = 'rC%2BmF3DCdE%2BCfEcFI9xIb%2FIzswvPz1MPV5rx4MoHur2mLbP4HAple5n8itK18TW9PwYMlpTIoArMpyA4DN8oYQ%3D%3D';
var url = 'http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastSpaceData';

var queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + token; /* Service Key*/
queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(today); /* ��15�� 12�� 1�Ϲ�ǥ */
queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent('0500'); /* 05�� ��ǥ * ������� ���� */
queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent('62'); /* ���������� X ��ǥ�� */
queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent('124'); /* ���������� Y ��ǥ�� */
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* �� ������ ��� �� */
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* ������ ��ȣ */
queryParams += '&' + encodeURIComponent('_type') + '=' + encodeURIComponent('json'); /* xml(�⺻��), json */

request({
	url: url + queryParams,
	method: 'GET'
}, function (error, response, body) {
	console.log('Status', response.statusCode);
	console.log('Headers', JSON.stringify(response.headers));
	
	console.log('Reponse received', body);
});