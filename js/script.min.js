'use strict';
(function () {
  const keyCodes = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
  };

  const directionsToArrKeys = {
    horizontal: ['LEFT', 'RIGHT'],
    vertical: ['UP', 'DOWN']
  }
  const {horizontal, vertical} = directionsToArrKeys;

  // Constructor of arrow-keys parametres for different arrays of active elements (like ddHeaders, ppHeaders, etc):
  function ArrKeysParams(activeElems) {
    this.range = [0, activeElems.length - 1];
    this.edgeIndexs37 = this.range.slice();
    this.edgeIndexs38 = this.range.slice();
    this.edgeIndexs39 = this.range.slice().reverse();
    this.edgeIndexs40 = this.range.slice().reverse();
  }

  // moving UP and LEFT: the index of the next element is getting smaller
  // moving DOWN and RIGHT: the index of the next element is getting bigger
  ArrKeysParams.prototype.sign37 = -1;
  ArrKeysParams.prototype.sign38 = -1;
  ArrKeysParams.prototype.sign39 = 1;
  ArrKeysParams.prototype.sign40 = 1;


  function getNextIndx(evt, focusablesList, arrKeysParams) {
    const nextElemIndx = focusablesList.indexOf(evt.target) === arrKeysParams['edgeIndexs' + evt.keyCode][0] ?
      arrKeysParams['edgeIndexs' + evt.keyCode][1] :
      focusablesList.indexOf(evt.target) + arrKeysParams['sign' + evt.keyCode];
    return nextElemIndx;
  }

  window.arrowNav = {
    navigateByArrowKey: function (focusables, focusablesArray, {
      moveLeftRight = true, // this parametre defines if the navigation is horizontal or vertical
      focusableParent = document} = {}
    ) {
      const direction = moveLeftRight ? horizontal : vertical;
      const arrKeysParams = new ArrKeysParams(focusablesArray);

      focusables.forEach(function (elem) {
        elem.addEventListener('keydown', function (evt) {
          //
          if (evt.keyCode === keyCodes[direction[0]] ||
            evt.keyCode === keyCodes[direction[1]]) {
            evt.preventDefault();
            let nextElemIndx;
            nextElemIndx = getNextIndx(evt, focusablesArray, arrKeysParams);
            evt.target.blur();
            focusablesArray[nextElemIndx].focus();
          }
        });
      });  
    },
  };

})();

'use strict';
(function () {
  const keyCodes = {
    ESC: 27,
    ENTER: 13,
    SPACE: 32,
    TAB: 9,
    SHIFT: 16
  };
  const {ESC, ENTER, SPACE, TAB, SHIFT} = keyCodes;
  const page = document.querySelector('.page');

  window.utils = {
    defineTabIndex: function (elem, disable) {
      elem.tabIndex = disable ? -1 : 0;
    },
    isEscPressed: function (evt, action) {
      if (evt.keyCode === ESC) {
        action();
      }
    },
    isEnterPressed: function (evt, action) {
      if (evt.keyCode === ENTER) {
        action();
      }
    },
    isSpacePressed: function (evt, action) {
      if (evt.keyCode === SPACE) {
        action();
      }
    },
    toggleElem: function (parentElem, elemClass, modifier) {
      parentElem.classList.toggle(elemClass + '--' + modifier);
    },
    addClassModifier: function (parentElem, elemClass, modifier) {
      parentElem.classList.add(elemClass + '--' + modifier);
    },
    removeClassModifier: function (parentElem, elemClass, modifier) {
      parentElem.classList.remove(elemClass + '--' + modifier);
    },
    checkDevWidth: function (callback) {
      let devWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      callback(devWidth);
    },// DELETE
    stopPageScroll: function () {
      page.classList.add('page--noscroll');
    },
    letPageScroll: function () {
      page.classList.remove('page--noscroll');
    },
    getWindWidth: function () {
      return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    },
    breakpointHandler: function (breakpoint) {
      return function (smallerWidthHandler, biggerWidthHandler, exactWidthHandler) {
        const width = window.utils.getWindWidth();
        if (smallerWidthHandler && width < breakpoint) {
          smallerWidthHandler();
        }
        if (biggerWidthHandler && width > breakpoint) {
          biggerWidthHandler();
        }
        if (exactWidthHandler && width === breakpoint) {
          exactWidthHandler();
        }
      }
    }
  };

})();

'use strict';
(function () {
  if (document.querySelector('.b-s__wrap')) {
    document.querySelector('.b-s__list').classList.remove('b-s__list--nojs');
    document.querySelector('.b-s').classList.remove('b-s--nojs');
    const devWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    // devWidth < 480px:
    /*const swiperBanner = new Swiper('.b-s__wrap', {
      spaceBetween: 20,
      slidesPerView: 1,//'auto',//2,//'auto',//2,//'auto',
      centeredSlides: true,//false,//true,//false,//true,
      loop: true,//false, --> true is OK when there are at least 3 slides
      autoplay: {
        delay: 3300,
        disableOnInteraction: false,
      },
    });*/

    // width < 900px:
    /* const swiperBanner = new Swiper('.b-s__wrap', {
      spaceBetween: 20,
      slidesPerView: 'auto',//2,//'auto',//2,//'auto',
      centeredSlides: true,//false,//true,//false,//true,
      loop: false,//false, --> true is OK when there are at least 3 slides
      autoplay: false,
    });*/


    // width >= 900:
    /*
    const swiperBanner = new Swiper('.b-s__wrap', {
      spaceBetween: 20,
      slidesPerView: 2,//2,//'auto',//2,//'auto',
      centeredSlides: false,//false,//true,//false,//true,
      loop: false,//false, --> true is OK when there are at least 3 slides
      autoplay: {
        delay: 3300,
        disableOnInteraction: false,
      },
    });*/

    const swiperPromo = new Swiper('.b-s__wra', {
      spaceBetween: 20,
      slidesPerView: 2,//2,//'auto',//2,//'auto',
      centeredSlides: false,//false,//true,//false,//true,
      loop: false,//false, --> true is OK when there are at least 3 slides
      // autoplay.enabled: true,
      speed: 900,
      autoplay: {
        delay: 3000,
        disableOnInteraction: true,
      },
      breakpoints: {
        479: {
          spaceBetween: 0,
          slidesPerView: 'auto',//1,//2,//'auto',//2,//'auto',
          centeredSlides: true, //true,
          loop: false,
          /*
          autoplay: {
            enabled: true,
            delay: 2300,
            disableOnInteraction: true,
          }*/
        },
        899: {
          spaceBetween: 20,
          slidesPerView: 'auto',
          centeredSlides: true,
          loop: false,
          /*
          autoplay: {
            enabled: false,
          }
          */
        },
      },
    });

    window.addEventListener('resize', function () {
      
    });

  /*
    window.addEventListener('resize', function () {
      const devWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      if (devWidth < 480) {
        swiperPromo = new Swiper('.b-s__wrap', {
          spaceBetween: 20,
          slidesPerView: 'auto',
          centeredSlides: false,
          loop: true,
          autoplay: {
            enabled: true,
            delay: 2000,
            disableOnInteraction: false,
          }
        });
      }

      if (devWidth >= 480 && devWidth < 900) {
        swiperPromo = new Swiper('.b-s__wrap', {
          spaceBetween: 20,
          slidesPerView: 'auto',
          centeredSlides: true,
          loop: false,
          autoplay: {
            enabled: false,
          }
        });
      }

      if (devWidth >= 900) {
        swiperPromo = new Swiper('.b-s__wrap', {
          spaceBetween: 20,
          slidesPerView: 2,
          centeredSlides: false,
        });
      }
    });
  */
  }
})();




/*

if (devWidth < 480) {
        swiperPromo = new Swiper('.b-s__wrap', {
          spaceBetween: 20,
          slidesPerView: 2,//2,//'auto',//2,//'auto',
          centeredSlides: false,//false,//true,//false,//true,
          loop: false,
          autoplay: {
            enabled: true,
            delay: 2000,
            disableOnInteraction: false,
          }
      });
    }
*/

'use strict';
(function () {
  if (document.querySelector('.best-sellers')) {
    var swiperBestSellers = new Swiper('.best-sellers', {
      spaceBetween: 27,//44,//0,
      /*
      pagination: {
        el: '.promo__pagination',
        type: 'bullets',
        clickable: true,
      },
      */
      slidesPerView: 4,
      breakpoints: {
        1199: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        899: {
          slidesPerView: 2,
          //spaceBetween: 0,
        },
        599: {
          slidesPerView: 1
        }
      },
      loop: true,

      
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      

      noSlideToSlideTabNav: true,
    });


  }
})();

'use strict';
(function () {
  const cart = document.querySelector('.cart');
  const cartForm = cart.querySelector('.cart__form');
  const cartSubmit = cartForm.querySelector('button[type="submit"]');
  const cartLink = cart.querySelector('.cart__link');

  cartLink.addEventListener('click', function (evt) {
    cartSubmit.focus();
  });
})();

'use strict';
(function () {
  const keyCodes = {
    ENTER: 13,
    SPACE: 32,
    TAB: 9,
    SHIFT: 16
  };
  const {ENTER, SPACE, TAB, SHIFT} = keyCodes;

  const ddParents = document.querySelectorAll('.dropdown');
  const ddHeaders = document.querySelectorAll('.dropdown__header');
  let activeEl = null;
  let activeElToggle = false;
  let thisDdcloseBtn = null;

  function docClickHandler(evt) {
    if (activeEl && !activeEl.contains(evt.target)) {
      closeDdMenu(activeEl);
    }
  }

  function docEscPressHandler(evt) {
    window.utils.isEscPressed(evt, function () {
      const activeElHeader = activeEl.querySelector('.dropdown__header');
      activeElHeader.focus();
      closeDdMenu(activeEl);
    });
  }

  function ddCloseBtnClickHandler(evt) {
    closeDdMenu(activeEl);
  }

  function openDdMenu(elem) {
    activeElToggle = true;
    //addClass('focus', elem);
    window.utils.addClassModifier(elem, 'dropdown', 'focus');
    elem.addEventListener('blur', ddItemBlurHandler, true);
    activeEl = elem;
    document.addEventListener('keydown', docEscPressHandler);
  }

  function closeDdMenu(elem) {
    activeElToggle = false;

    //removeClass('focus', elem);
    window.utils.removeClassModifier(elem, 'dropdown', 'focus');
    elem.removeEventListener('blur', ddItemBlurHandler, true);
    activeEl = null;
    document.removeEventListener('keydown', docEscPressHandler);
  }

  function ddItemFocusHandler(evt, btn) {
    if (!evt.currentTarget.classList.contains('dropdown--focus')) {
      openDdMenu(evt.currentTarget);
    }
  }

  function ddItemBlurHandler(evt) {
    const blurElem = evt.currentTarget;
    function focusHandler(evtFocus) {
      if (!blurElem.classList.contains(evtFocus.target)) {
        closeDdMenu(blurElem);
      }
      document.removeEventListener('focus', focusHandler, true);
    }
    document.addEventListener('focus', focusHandler, true);
  }

  function ddHeaderEnterSpaceHandler(evt) {
    evt.preventDefault();
    if (!evt.currentTarget.classList.contains('dropdown--focus')) {
      openDdMenu(evt.currentTarget);
    }
  }

  ddParents.forEach(function (item, key) {
    const ddHeader = item.querySelector('.dropdown__header');
    const ddChild = item.querySelector('.dropdown__child');
    const ddCloseBtn = item.querySelector('.dropdown__close-btn');

    function ddParentMouseOverHadnler(evt) {
      window.utils.toggleElem(item, 'dropdown', 'over');
    }
    function ddParentMouseOutHadnler(evt) {
      window.utils.toggleElem(item, 'dropdown', 'over');
    }

    item.addEventListener('mouseover', ddParentMouseOverHadnler);
    item.addEventListener('mouseout', ddParentMouseOutHadnler);
    


    //item.addEventListener('blur', ddItemBlurHandler, true);
    item.addEventListener('focus', ddItemFocusHandler, true);

    item.addEventListener('touchstart', function () {
      item.removeEventListener('mouseover', ddParentMouseOverHadnler);
      item.removeEventListener('mouseout', ddParentMouseOutHadnler);
      if (ddCloseBtn) {
        ddCloseBtn.classList.remove('dropdown__close-btn--none');
      }
    });

    if (ddCloseBtn) {
      ddCloseBtn.addEventListener('click', ddCloseBtnClickHandler);
    }

    
    ddHeader.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      ddHeader.focus();
    });

    ddHeader.addEventListener('keydown', function (evt) {
      window.utils.isEnterPressed(evt, function () {
        evt.preventDefault();
        if (!item.classList.contains('dropdown--focus')) {
          openDdMenu(item);
        }
      });      
    });
    ddHeader.addEventListener('keydown', function (evt) {
      window.utils.isSpacePressed(evt, function () {
        evt.preventDefault();
        if (!item.classList.contains('dropdown--focus')) {
          openDdMenu(item);
        }
      });      
    });

    const ddFocusables = item.querySelectorAll('.dropdown__focusable');
    const ddFocusablesArray = Array.prototype.slice.call(ddFocusables);
    window.arrowNav.navigateByArrowKey(ddFocusables, ddFocusablesArray, {
      moveLeftRight: false,
      focusableParent: item
    });

    window.addEventListener('load', function () {
      ddFocusablesArray.forEach(function (it) {
        if (ddChild.contains(it)) {
          window.utils.defineTabIndex(it, true);// запрет tab-navigation  внутри выпадающих списков,  только arrow-key nav
        }
      });
    })
  });

  document.addEventListener('click', docClickHandler);
})();

'use strict';
/*
(function () {
  const items = document.querySelectorAll('.item');

  for (let i = 0; i < items.length; i++) {
    const itemLink = items[i].querySelector('.item__link');
    itemLink.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      console.log('ЫЫЫЫЫЫЫЫЫЫЫ');
      evt.target.style.color = 'purple';
    });
  }
})();
*/

'use strict';
(function () {
  const login = document.querySelector('.login');
  const loginForm = login.querySelector('.login__form');
  const loginEmail = loginForm.querySelector('.login__input--email');
  const loginLink = login.querySelector('.login__link');

  loginLink.addEventListener('click', function (evt) {
    loginEmail.focus();
  });

  /*const loginWrap = document.querySelector('.login__wrap');
  loginWrap.addEventListener('click', function (evt) {
  	if (!loginForm.contains(evt.target)) {
      
  	}
  });*/
})();

'use strict';
(function () {
  // no-js backup
  const mainNavBtn = document.querySelector('.page-header__btn');
  mainNavBtn.classList.remove('page-header__btn--no-js');
  const userList = document.querySelector('.user-list').classList.add('user-list--closed');
  const siteList = document.querySelector('.site-list').classList.add('site-list--closed');

  let devWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;


  function windowResizeHandler() {
    devWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }

  let navLists = [];

  function NavList(listClass) {
    this.list = document.querySelector('.' + listClass);
    this.listCloseClass = listClass + '--closed';
  }

  NavList.prototype.openCloseNavList = function () {
    this.list.classList.toggle(this.listCloseClass);
  }

  navLists.push(new NavList('site-list'));
  navLists.push(new NavList('user-list'));

  mainNavBtn.addEventListener('click', function () {
    for (let i = 0; i < navLists.length; i++) {
      navLists[i].openCloseNavList();
    }
    mainNavBtn.classList.toggle('page-header__btn--open');
    mainNavBtn.classList.toggle('page-header__btn--close');
  });

  window.addEventListener('resize', function () {
    windowResizeHandler();
  });
})();

'use strict';
(function () {
  if (document.querySelector('.map-box')) {
    const mapBox = document.querySelector('.map-box');
    let map;

    //const lt = 59.939242; 
    // const lg = 30.329359;
    const mapOptions = {
      // center: {lat: lt, lng: lg},//{ lat: 59.93927000245234, lng: 30.329457879892697},
      center: { lat: 59.93927000245234, lng: 30.329457879892697 },
      zoom: 16,
      currentZoom: 16,
      disableDefaultUI: true,
      zoomControl: true,
    };

    const markerCoords = { lat: 59.938570, lng: 30.322966 };
    //{ lat: 59.938703, lng: 30.323153 };//{ lat: 59.938586, lng: 30.322986 };// {lat: 59.938592, lng: 30.323029};
    
    const markerSvg = {
      path: 'M138.31,193.56l-12.86,13.02l-3.5-3.58c-1.71,0.66-3.47,1.24-5.28,1.75l5.26,5.38l-10.09,10.21l-9.83-9.75l3.67-3.76c-2.22,0.23-4.48,0.35-6.78,0.35c-2.69,0-5.33-0.17-7.91-0.47l3.97,3.94l-9.1,9.33l-10.21-10.26l5.09-5.09c-1.81-0.52-3.57-1.12-5.28-1.79l-3.33,3.33l-12.04-12.1c-6.31,2.91-13.32,4.55-20.72,4.55c-0.54,0-1.08-0.02-1.62-0.04c10.08,27.96,50.01,138.66,51.88,143.33c2.14,5.35,4.63,8.55,8.55,8.55c3.92,0,6.77-1.43,9.62-8.91c2.57-6.75,43.65-121.79,51.73-144.42c-0.78,0.04-1.57,0.06-2.36,0.06C150.52,197.2,144.15,195.9,138.31,193.56z M111.88,227.41l9.46,9.38l-9.31,9.48l-9.43-9.48L111.88,227.41z M98.46,260.09l-9.47-9.52l10.1-10.21l9.44,9.49L98.46,260.09z M98.49,267.2l10.3,10.35l-9.28,9.5l-10.29-10.42L98.49,267.2z M98.53,214.17l9.8,9.72l-9.25,9.36l-9.68-9.73L98.53,214.17z M85.91,227.11l9.65,9.7l-10.1,10.21l-9.58-9.63L85.91,227.11z M57.1,198.15l11.51,11.57l-5.54,5.54L57.1,198.15z M64.89,220.5l7.24-7.24l10.25,10.3l-10.03,10.28l-4.33-4.35L64.89,220.5z M72.12,241.24l0.27-0.27l9.56,9.61l-4.86,4.92L72.12,241.24z M81.87,269.19l-2.94-8.44l6.55-6.63l9.48,9.53l-9.25,9.42L81.87,269.19z M85.71,280.21L85.71,280.21l10.3,10.42l-4.91,5.03L85.71,280.21zM100.43,315.58c-0.38,1.14-1.99,1.15-2.38,0.02l-5.11-14.66l6.59-6.75l5.97,6.05L100.43,315.58z M107.26,294.91l-4.24-4.3l8.56-8.77L107.26,294.91z M115.16,271.03l-2.88,2.95l-10.29-10.34l10.06-10.25l6.7,6.74L115.16,271.03z M120.52,254.8l-4.96-4.99l9.33-9.5l0.32,0.31L120.52,254.8z M129.08,228.92l-4.23,4.31l-9.45-9.37l10.03-10.15l6.48,6.63L129.08,228.92z M133.68,214.99l-4.73-4.85l9.52-9.63L133.68,214.99zM182.68,114.57c2.8-8.52,4.32-17.62,4.32-27.07C187,39.18,147.38,0,98.5,0S10,39.18,10,87.5c0,9.15,1.42,17.97,4.06,26.26C5.46,121.38,0,132.77,0,145.5C0,168.42,17.68,187,39.5,187c8.21,0,15.83-2.63,22.14-7.13C70.71,190.38,83.86,197,98.5,197c14.46,0,27.47-6.46,36.53-16.75c6.31,4.26,13.86,6.75,21.97,6.75c22.09,0,40-18.36,40-41C197,133.38,191.43,122.09,182.68,114.57z M156.5,170c-12.47,0-22.67-9.72-23.45-21.99C129.38,166.34,115.31,180,98.5,180c-15.99,0-29.51-12.36-33.95-29.36C62.39,161.67,52.67,170,41,170c-13.25,0-24-10.75-24-24c0-11.97,8.76-21.88,20.21-23.7C30.73,111.84,27,99.6,27,86.5C27,48.12,59.01,17,98.5,17S170,48.12,170,86.5c0,13.46-3.95,26.02-10.76,36.66c11.69,1.36,20.76,11.28,20.76,23.34C180,159.48,169.48,170,156.5,170z',
      fillColor: '#f34523',
      fillOpacity: 1,
      strokeColor: '#f34523',
      rotation: 0,
      origin: new google.maps.Point(0, 0),
      scale: 0.35,//4,
      anchor: new google.maps.Point(100, 350),//new google.maps.Point(12,-290),//new google.maps.Point(15, 25),
    };
    
    const markerImg = '../img/marker.png';
    const markerShadowImg = '../img/marker-w-shadow360.png';


    const defineMapCentre = () => {
      const mapBoxWidthsToLngs = {
        '1200': { lng: 30.329359 },
        '900': { lng: 30.327830 },
      };

      const basicLat = 59.939242;
      const basicWidth = 1200;
      const basicLng = mapBoxWidthsToLngs[basicWidth].lng;

      const actualMapBoxWidth = mapBox.offsetWidth > 1200 ? 1200 : mapBox.offsetWidth;
      
      if (actualMapBoxWidth < 900 && mapOptions.currentZoom <= mapOptions.zoom) {
        return { lat: basicLat, lng: markerCoords.lng };
      }

      if (actualMapBoxWidth < 900) {
        return { lat: markerCoords.lat, lng: markerCoords.lng };
      }

      if (mapOptions.currentZoom > mapOptions.zoom) {
        return { lat: markerCoords.lat, lng: markerCoords.lng };
      }

      const lngPerPxl = (basicLng - mapBoxWidthsToLngs['900'].lng) / (basicWidth - 900);
      const actualLng = basicLng - (basicWidth - actualMapBoxWidth) * lngPerPxl;
      return { lat: basicLat, lng: actualLng };
    };

    const updateMapCentre = () => {
      mapOptions.center = defineMapCentre();
      map.setCenter(mapOptions.center);
    };


    const zoomChangeHandler = function () {
      const currentZoom = map.getZoom();
      // const currentCenter = mapOptions.center;
      if (currentZoom > mapOptions.zoom) {
        mapOptions.center = markerCoords;
        map.setCenter(mapOptions.center);
      }

      if (currentZoom <= mapOptions.zoom) {
        defineMapCentre();
        map.setCenter(mapOptions.center);
      }
    };


    const initMarker = (coords, map, img, zIdx, title) => {
      const marker = new google.maps.Marker({
        position: coords,
        map: map,
        title: title,
        icon: img,//markerSvg,//markerImg,//markerSvg,
        zIndex: zIdx,
      });

      return marker;
    }
    
    window.initThisMap = function () {
      map = new google.maps.Map(document.getElementById('map'), mapOptions);
      // const marker = 
      initMarker(markerCoords, map, markerSvg, 2, 'Glaccy Shop');
      // const markerShadow = initMarker(markerCoords, map, markerShadowImg, 1);
      initMarker(markerCoords, map, markerShadowImg, 1);

      map.addListener('zoom_changed', function () {
        mapOptions.currentZoom = map.getZoom();
        zoomChangeHandler();
      });
    }
    
    /* DOES NOT WORK:
    window.addEventListener('load', function () {
      window.initThisMap();
      updateMapCentre();
    });
    */

    /*
    window.addEventListener('load', function () {
      if (typeof google === 'object' && typeof google.maps === 'object' && typeof google.maps.Map === 'function'
      && typeof google.maps.Marker === 'function' && typeof google.maps.InfoWindow === 'function') {
        window.initThisMap();
        updateMapCentre();
      }
    });
    */

    if (typeof google === 'object' && typeof google.maps === 'object' && typeof google.maps.Map === 'function'
      && typeof google.maps.Marker === 'function' && typeof google.maps.InfoWindow === 'function') {
      window.initThisMap();
      updateMapCentre();
    }


    window.addEventListener('resize', function (evt) {
      // if (mapOptions.currentZoom <= mapOptions.zoom) {
        updateMapCentre();
      // }
    });
  }
})();

'use strict';
(function () {
  const pageHeader = document.querySelector('.page-header');

  if (pageHeader.nextElementSibling.classList.contains('promo')) {
    pageHeader.classList.add('page-header--js');
  }


  //if (document.querySelector('.page-header')) {}

})();

'use strict';
(function () {
  const keyCodes = {
    ENTER: 13,
    SPACE: 32,
    TAB: 9,
    SHIFT: 16
  };
  const {ENTER, SPACE, TAB, SHIFT} = keyCodes;
  const TABLET_WIDTH = 768;
  // pu - abbreviation for popup;
  // const page = document.querySelector('.page');
  const puParents = document.querySelectorAll('.popup');
  let activeEl = null;

  const tabletBreakpointHandler = window.utils.breakpointHandler(TABLET_WIDTH);

  function docClickHandler(evt) {
    if (activeEl && !activeEl.contains(evt.target)) {
      closePuMenu(activeEl);
    }
  }

  function docEscPressHandler(evt) {
    window.utils.isEscPressed(evt, function () {
      const activeElHeader = activeEl.querySelector('.popup__header');
      activeElHeader.focus();
      closePuMenu(activeEl);
    });
  }

  function puCloseBtnClickHandler(evt) {
    closePuMenu(activeEl);
  }

  function openPuMenu(elem) {
    window.utils.addClassModifier(elem, 'popup', 'focus');
    elem.addEventListener('blur', puItemBlurHandler, true);
    activeEl = elem;

    document.addEventListener('keydown', docEscPressHandler);

    tabletBreakpointHandler(window.utils.stopPageScroll, window.utils.letPageScroll);

  }

  function closePuMenu(elem) {
    window.utils.removeClassModifier(elem, 'popup', 'focus');
    elem.removeEventListener('blur', puItemBlurHandler, true);
    activeEl = null;

    document.removeEventListener('keydown', docEscPressHandler);

    tabletBreakpointHandler(window.utils.letPageScroll, window.utils.letPageScroll);
  }

  function puItemFocusHandler(evt) {//,btn)
    if (!evt.currentTarget.classList.contains('popup--focus')) {
      openPuMenu(evt.currentTarget);
    }
  }

  function puItemBlurHandler(evt) {
    const blurElem = evt.currentTarget;
    function focusHandler(evtFocus) {
      if (!blurElem.classList.contains(evtFocus.target)) {
        closePuMenu(blurElem);
      }
      document.removeEventListener('focus', focusHandler, true);
    }
    document.addEventListener('focus', focusHandler, true);
  }

  puParents.forEach(function (item, key) {
    item.querySelector('.popup__box').classList.remove('popup__box--no-js');

    const puHeader = item.querySelector('.popup__header');
    const puChild = item.querySelector('.popup__child');
    const puCloseBtn = item.querySelector('.popup__close-btn');
    const puBox = item.querySelector('.popup__box');

    function puParentMouseOverHadnler(evt) {
      window.utils.toggleElem(item, 'popup', 'over');
    }
    function puParentMouseOutHadnler(evt) {
      window.utils.toggleElem(item, 'popup', 'over');
    }

    /*function toggleHoverListener(width) {
      if (width > TABLET_WIDTH) {
        item.addEventListener('mouseover', puParentMouseOverHadnler);
        item.addEventListener('mouseout', puParentMouseOutHadnler);
      } else {
        item.removeEventListener('mouseover', puParentMouseOverHadnler);
        item.removeEventListener('mouseout', puParentMouseOutHadnler);
        //puBox.scrollIntoView();
      }
    }*/
    function addHoverListener() {
      item.addEventListener('mouseover', puParentMouseOverHadnler);
      item.addEventListener('mouseout', puParentMouseOutHadnler);
    }

    function removeHoverListener() {
      item.removeEventListener('mouseover', puParentMouseOverHadnler);
      item.removeEventListener('mouseout', puParentMouseOutHadnler);
    }

    window.addEventListener('resize', function (evt) {//HERE
      //window.utils.checkDevWidth(toggleHoverListener);
      tabletBreakpointHandler(removeHoverListener, addHoverListener);
    });
    window.addEventListener('load', function (evt) {
      //window.utils.checkDevWidth(toggleHoverListener);
      tabletBreakpointHandler(removeHoverListener, addHoverListener);
    });



    //item.addEventListener('blur', ddItemBlurHandler, true);
    item.addEventListener('focus', function (evt) {
      puItemFocusHandler(evt);

      tabletBreakpointHandler(function () {
        puBox.scrollIntoView();
      });
    }, true);

    // specific feature of popup, not dropdown (overlay on mobiles):
    puBox.addEventListener('click', function (evt) {
      if (!puChild.contains(evt.target) && !puCloseBtn.contains(evt.target) && evt.target !== puCloseBtn) {
        closePuMenu(activeEl);
      }
    });

    item.addEventListener('touchstart', function () {
      item.removeEventListener('mouseover', puParentMouseOverHadnler);
      item.removeEventListener('mouseout', puParentMouseOutHadnler);
      if (puCloseBtn) {
        puCloseBtn.classList.remove('popup__close-btn--none');
      }
    });
    if (puCloseBtn) {
      puCloseBtn.addEventListener('click', puCloseBtnClickHandler);
    }

    puHeader.addEventListener('click', function (evt) {//'mousedown'
      if (evt.currentTarget.tagName != 'BUTTON' || evt.target.tagName != 'BUTTON') {
        evt.preventDefault();
      }
      puHeader.focus();//SAFARI FIX*/
    });

    puHeader.addEventListener('keydown', function (evt) {
      window.utils.isEnterPressed(evt, function () {
        if (evt.currentTarget.tagName !== 'BUTTON' || evt.target.tagName !== 'BUTTON') {
          evt.preventDefault();
        }
        if (!item.classList.contains('popup--focus')) {
          openPuMenu(item);
        }
      });      
    });
    puHeader.addEventListener('keydown', function (evt) {
      window.utils.isSpacePressed(evt, function () {
        if (evt.currentTarget.tagName !== 'BUTTON' || evt.target.tagName !== 'BUTTON') {
          evt.preventDefault();
        }
        if (!item.classList.contains('popup--focus')) {
          openPuMenu(item);
        }
      });      
    });
  });

  document.addEventListener('click', docClickHandler);





/*
let crw = document.querySelector('.cart__wrap');

crw.scrollIntoView();
*/


})();

'use strict';
(function () {
  const promoImgs = document.querySelectorAll('.promo__img');

  for (let i = 0; i < promoImgs.length; i += 1) {
    promoImgs[i].classList.add('promo__img--js');
  }
})();

'use strict';
(function () {
  if (document.querySelector('.promo__wrap')) {
    var swiperPromo = new Swiper('.promo__wrap', {
      spaceBetween: 0,
      pagination: {
        el: '.promo__pagination',
        type: 'bullets',
        clickable: true,
      },
      slidesPerView: 1,
      loop: true,
      /*
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      */
      page: document.querySelector('.page'),
      overlay: document.querySelector('.overlay'),// hack for ios

      slides: document.querySelector('.promo__list').children,
      pageBgs: {
        '0': '#849d8f',
        '1': '#8996a6',
        '2': '#9d8b84',
      },
      noSlideToSlideTabNav: true,
    });

    const page = document.querySelector('.page');
    const promoSlider = document.querySelector('.promo__list');
    const promoSlides = document.querySelectorAll('.promo__item');
    const promoSlidesAr = Array.prototype.slice.call(promoSlides);
    const promoFocusables = promoSlider.querySelectorAll('.promo__focusable');
    const promoFocusablesArr = Array.prototype.slice.call(promoFocusables);

    const siteList = document.querySelector('.site-list');
    const PORTRAIT_WIDTH_MIN = 768;
    const LANDSCAPE_WIDTH_MIN = 900;
    let devWidth = window.utils.getWindWidth();

    let activeSlide = swiperPromo.slides[swiperPromo.activeIndex];
    let activeFocusablesArr = Array.prototype.slice.call(activeSlide.querySelectorAll('.promo__focusable'));

    function setInitialTabIdxState() {
      promoFocusablesArr.forEach((it) => {window.utils.defineTabIndex(it, true)});
      activeFocusablesArr.forEach((it) => {window.utils.defineTabIndex(it, false)});
    }

    function updateActiveSlide() {
      activeSlide = swiperPromo.slides[swiperPromo.activeIndex];
      activeFocusablesArr = Array.prototype.slice.call(activeSlide.querySelectorAll('.promo__focusable'));
    }

    function setSiteListBgColor() {
      if (devWidth < PORTRAIT_WIDTH_MIN || devWidth >= LANDSCAPE_WIDTH_MIN) {
        siteList.style.backgroundColor = 'transparent';
      }  else {
        siteList.style.backgroundColor = page.style.backgroundColor;
      }
    }

    setInitialTabIdxState();

    promoSlider.addEventListener('transitionend', function (evt) {
      setSiteListBgColor();
      activeFocusablesArr.forEach((it) => {window.utils.defineTabIndex(it, true)});
      updateActiveSlide();
      activeFocusablesArr.forEach((it) => {window.utils.defineTabIndex(it, false)});
    }, true);

    window.addEventListener('resize', function () {
      devWidth = window.utils.getWindWidth();
      setSiteListBgColor();
    });

    
    // an attempt to implement
    promoSlider.addEventListener('focus', function (evt) {
      // console.log(evt.target, evt.currentTarget);

      // blur --> if evt.focus does not belog to activeSlide -> to set focus on the nextElementSibling of promoSlider
      // but how to find the closest interective -> closest

      //!!!!document.querySelector('*[tabindex="0"]');

      // to be very SPECIFIC: knowing the structure of the swiper thing we can just say: focus goes to
      // the first child of document.querySelector('.swiper-pagination').children;
    }, true);

  }
})();

'use strict';
(function () {
  const search = document.querySelector('.search');
  const searchForm = search.querySelector('.search__form');
  const searchInput = searchForm.querySelector('.search__input');
  const searchSubmit = searchForm.querySelector('button[type="submit"]');
  const searchBtn = search.querySelector('.search__btn');

  function searcFormSubmitHandler(evt) {
    if (!searchInput.value) {
      evt.preventDefault();
      searchSubmit.focus();// preventDefault does not let focus happen when while hovering a click does not open the popup
    }
  }

  searchForm.addEventListener('submit', searcFormSubmitHandler);

  searchBtn.addEventListener('click', function (evt) {
    searchInput.focus();
  });

})();

'use strict';
(function () {
  const siteList = document.querySelector('.site-list');
  const siteListLinks = document.querySelectorAll('.site-list__link');
  const siteListLinksArray = Array.prototype.slice.call(siteListLinks);
  window.arrowNav.navigateByArrowKey(siteListLinks, siteListLinksArray, {focusableParent: siteList});
})();

'use strict';
(function () {
  const userList = document.querySelector('.user-list');
  
  const userListLinks = document.querySelectorAll('.user-list__link');
  const userListLinksArray = Array.prototype.slice.call(userListLinks);
  window.arrowNav.navigateByArrowKey(userListLinks, userListLinksArray, {focusableParent: userList});
})();
