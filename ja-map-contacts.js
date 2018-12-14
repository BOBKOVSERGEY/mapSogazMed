var myMap;
var myPlacemark;
var MyBalloonLayout = [];
	



	map_zoom = parseInt(map_zoom);
	map_lat = parseFloat(map_lat);
	map_long = parseFloat(map_long);
	if (isNaN(map_lat)) map_lat = 66.4219444;
	if (isNaN(map_long)) map_long = 94.2388889;



	if (map_lat != '' && map_long != '') {
		ymaps.ready(init);
	}

	function init() {

		myMap = new ymaps.Map('map', {
			center: [parseFloat(map_lat), parseFloat(map_long)],
			zoom: map_zoom,
			behaviors: ["default", "scrollZoom"],
			controls: []
		});
        // Создание макета балуна на основе Twitter Bootstrap.
        for (var i = 0; i < branchId.length; i++) {
        MyBalloonLayout[i] = ymaps.templateLayoutFactory.createClass(
            '<div class="popover top">' +
            '<a class="print-btn" href="printmap.php?action=onepoint&id=' + branchId[i] +'" target="_blank">Распечатать <img src="/images/icon-print.gif"></a>' +
            '<a class="close-btn" href="#">&times;</a>' +
            '<div class="arrow"></div>' +
            '<div class="popover-inner">' +
            '$[[options.contentLayout width=500]]' +
            '</div>' +
            '</div>', {
                /**
                 * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
                 * @function
                 * @name build
                 */
                build: function () {
                    this.constructor.superclass.build.call(this);

                    this._$element = $('.popover', this.getParentElement());

                    this.applyElementOffset();

                    this._$element.find('.close-btn')
                        .on('click', $.proxy(this.onCloseClick, this));
                },

                /**
                 * Удаляет содержимое макета из DOM.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
                 * @function
                 * @name clear
                 */
                clear: function () {
                    this._$element.find('.close-btn')
                        .off('click');

                    this.constructor.superclass.clear.call(this);
                },


                /**
                 * Сдвигаем балун, чтобы "хвостик" указывал на точку привязки.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                 * @function
                 * @name applyElementOffset
                 */
                applyElementOffset: function () {
                    this._$element.css({
                        left: -(this._$element[0].offsetWidth / 2),
                        top: -(this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight)
                    });
                },

                /**
                 * Закрывает балун при клике на крестик, кидая событие "userclose" на макете.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                 * @function
                 * @name onCloseClick
                 */
                onCloseClick: function (e) {
                    e.preventDefault();

                    this.events.fire('userclose');
                },

                /**
                 * Используется для автопозиционирования (balloonAutoPan).
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
                 * @function
                 * @name getClientBounds
                 * @returns {Number[][]} Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
                 */
                getShape: function () {
                    if(!this._isElement(this._$element)) {
                        return MyBalloonLayout.superclass.getShape.call(this);
                    }

                    var position = this._$element.position();

                    return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
                        [position.left, position.top], [
                            position.left + this._$element[0].offsetWidth,
                            position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight
                        ]
                    ]));
                },

                /**
                 * Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
                 * @function
                 * @private
                 * @name _isElement
                 * @param {jQuery} [element] Элемент.
                 * @returns {Boolean} Флаг наличия.
                 */
                _isElement: function (element) {
                    return element && element[0] && element.find('.arrow')[0];
                }
            }
        );
        }
        MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
            '<h3 class="popover-title">$[properties.balloonHeader]</h3>' +
                '<div class="popover-content">$[properties.balloonContent]</div>'
        ),
		placemarks = [];

		var coords = [];
		for (var i = 0; i < lat.length; i++) {
			coords[i] = [lat[i], long[i]];
		}
		var myClusterer = new ymaps.Clusterer({
			clusterIcons: [{
                href: 'https://www.sogaz-med.ru/images/Marker-1.gif',
                size: [45, 51],
                offset: [-20, -20]
            }],
            clusterDisableClickZoom: false,
		});
		var myCollection = new ymaps.GeoObjectCollection();
		var metro = new Array();
		for (var i = 0; i < coords.length; i++) {
			var placemark = new ymaps.Placemark(coords[i],
				{
					balloonHeader: branchTitle[i],
            		balloonContent: '<div class="div-map addr-map"><b>Адрес:</b> ' + branchAddr[i] + '</div>'
            		+ '<div class="div-map regim-map"><b>Режим работы:</b><br>' + branchRegime[i] + '</div>'
            		+ '<div class="div-map phone-map"><b>Телефон:</b> ' + branchPhone[i] + '</div>'
            		+ '<div class="div-map mail-map"><b>E-mail:</b> <a href="mailto:'+ branchEmail[i] +'">'+ branchEmail[i] +'</a></div>'
            		+ '<div class="clearfix"></div>',
				},
				{
					balloonShadow: false,
		            balloonLayout: MyBalloonLayout[i],
		            balloonContentLayout: MyBalloonContentLayout,
		            balloonPanelMaxMapArea: 0,
					iconLayout: 'default#image',
					iconImageHref: 'https://www.sogaz-med.ru/images/Marker-0.gif',
					iconImageSize: [40, 45]
				}
			);
			placemarks.push(placemark);
		}
		
		myClusterer.add(placemarks);
		myMap.geoObjects.add(myClusterer);
		myMap.controls.add('geolocationControl');
		myMap.controls.add('fullscreenControl');
		myMap.controls.add('zoomControl');
	}