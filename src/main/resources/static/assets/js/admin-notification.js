$(function() {
    var $notificationRoot = $('#notificationContainer');
    var bIsMobileAdmin = SHOP.isMobileAdmin();

    var $notificationListContainer = $('#notificationContainer ul.alarmList');
    var $notificationButton = $('#notificationButton');
    var sNotificationHost = $('#notificationApiHostInput').val();
    var $emptyElement = $('#notificationContainer .empty');
    var $countContainer = $('#notificationContainer .count');
    var $scrollContainer = $('#notificationContainer .contentArea');
    var $newContainer = $notificationRoot;
    var bIsFetching = false, bHasNextFetchingElement = true;

    if (bIsMobileAdmin) {
        $notificationListContainer = $('#notificationList');
        $emptyElement = $('.no-notification');
        $newContainer = $('.link-btn .notice');
        $scrollContainer = $(document);
    }

    var iNotificationCount = 0;
    var iNextPage = 1;
    var aReadUpdated = [];

    init();
    EC_ADMIN_NOTIFICATION_TOKEN.init(postInit);

    /**
     * 珥덇린��
     */
    function init() {
        $notificationButton.click(function () {
            $notificationRoot.removeClass(EC_ADMIN_NOTIFICATION_CONST.NOTIFICATION_CONTAINER_NEW_CLASS);
            localStorage.setItem(EC_ADMIN_NOTIFICATION_CONST.getStorageKey('hasNew'), 'F');

            if ($notificationRoot.hasClass('selected')) {
                $notificationRoot.removeClass('selected');
            } else {
                if (!SHOP.isNewProMode()) {
                    // �댄봽濡쒕え�쒕뒗 selected �대옒�ㅺ� �덈줈�� �뚮┝�닿퀬, �섎㉧吏� 紐⑤뱶�먯꽌�� �뚮┝ �⑤꼸�� �대┫ �� 異붽��섎뒗 �대옒��. �댄봽濡쒕え�쒖뿉�쒕뒗 selected �대옒�ㅻ� �뷀븯吏� �딆뒿�덈떎.
                    $notificationRoot.addClass('selected');
                }
                $notificationListContainer.find('.' + EC_ADMIN_NOTIFICATION_CONST.CONTENT_CLASS + '.' + EC_ADMIN_NOTIFICATION_CONST.HAS_SUMMARY_CLASS).hide();
                $notificationListContainer.find('.alarmToggleBtn.' + EC_ADMIN_NOTIFICATION_CONST.HAS_SUMMARY_CLASS).show();
            }
        });

        if (bIsMobileAdmin && $newContainer.length > 0) {
            $newContainer.click(function () {
                localStorage.setItem(EC_ADMIN_NOTIFICATION_CONST.getStorageKey('hasNew'), 'F');
            });
        }

        var bHasNew = localStorage.getItem(EC_ADMIN_NOTIFICATION_CONST.getStorageKey('hasNew')) === 'T';
        if (bHasNew) {
            $newContainer.addClass(EC_ADMIN_NOTIFICATION_CONST.NOTIFICATION_CONTAINER_NEW_CLASS);
        } else {
            $newContainer.removeClass(EC_ADMIN_NOTIFICATION_CONST.NOTIFICATION_CONTAINER_NEW_CLASS);
        }

        if ($notificationListContainer.length > 0) {
            getNotificationFromStorage();
        }

        $scrollContainer.scroll(function () {
            if (bHasNextFetchingElement === false || $scrollContainer[0].offsetHeight + $scrollContainer[0].scrollTop < $scrollContainer[0].scrollHeight){
                return;
            }

            if (requestNotificationList(iNextPage)) {
                iNextPage++;
            }
        });

        $('#readAllNotificationButton').click(function () {
            var newElementCount = $notificationRoot.find('.' + EC_ADMIN_NOTIFICATION_CONST.NOTIFICATION_ITEM_CLASS + '.new').length;
            if (iNotificationCount < 1 && newElementCount < 1) {
                return;
            }

            updateReadStatus('', true);
        });

        if (bIsMobileAdmin) {
            $scrollContainer = $(document.documentElement);
        }
    }

    /**
     * �좏겙 媛��몄삩 �댄썑 �댁빞 �섎뒗 �묒뾽
     */
    function postInit() {
        var iTimeNow = new Date().getTime();
        var iLastRequestTime = localStorage.getItem(EC_ADMIN_NOTIFICATION_CONST.getStorageKey('lastRequestTime'));
        var iFirstRequestTime;

        if (!iLastRequestTime || iTimeNow - iLastRequestTime > EC_ADMIN_NOTIFICATION_CONST.REQUEST.INTERVAL) {
            // 留덉�留� �붿껌 �쒓컙�� �녾굅�� 留덉�留� �붿껌 �쒓컙�� �뚮┝ �붿껌 二쇨린媛� 吏��ъ쓣 寃쎌슦 諛붾줈 �붿껌
            iFirstRequestTime = 0;
        } else {
            iFirstRequestTime = EC_ADMIN_NOTIFICATION_CONST.REQUEST.INTERVAL - (iTimeNow - iLastRequestTime);
        }

        setTimeout(function () {
            // 理쒖큹 �붿껌
            requestNotificationList();

            // �댄썑 二쇨린�곸쑝濡� 理쒖떊 �뚮┝ �붿껌
            setInterval(requestNotificationList, EC_ADMIN_NOTIFICATION_CONST.REQUEST.INTERVAL);
        }, iFirstRequestTime);
    }

    /**
     * 濡쒖뺄�ㅽ넗由ъ��� ���λ맂 �뚮┝�쇰줈 珥덇린�명똿
     */
    function getNotificationFromStorage() {
        var sListJson = localStorage.getItem(EC_ADMIN_NOTIFICATION_CONST.getStorageKey('list'));
        iNotificationCount = localStorage.getItem(EC_ADMIN_NOTIFICATION_CONST.getStorageKey('count')) || 0;

        if (!sListJson) {
            $emptyElement.show();
            return;
        }

        var aNotificationList = JSON.parse(sListJson);
        setCount(iNotificationCount);

        if (!aNotificationList || aNotificationList.length < 1) {
            return;
        }

        aNotificationList.forEach(function (oNotificationItem) {
            var oElement = EC_ADMIN_NOTIFICATION_RENDERER.instance().setData(oNotificationItem).render();
            $(oElement).find('.eNotificationReadItem').click(updateReadStatus);
            $(oElement).addClass('eStorageItem');
            $notificationListContainer.append(oElement);
        });

        $emptyElement.hide();
    }

    /**
     * �뚮┝�� �붿껌�⑸땲��.
     * @param iPage �섏씠吏�踰덊샇 (0遺���)
     */
    function requestNotificationList(iPage) {
        if (!iPage) {
            iPage = 0;
        }

        if (iPage === 0) {
            // 理쒖떊�뚮┝�대㈃ �붿껌�� �쒓컙 ����
            localStorage.setItem(EC_ADMIN_NOTIFICATION_CONST.getStorageKey('lastRequestTime'), new Date().getTime().toString());
        } else if (bIsFetching) {
            return false;
        }

        bIsFetching = true;

        $.ajax({
            url: sNotificationHost + EC_ADMIN_NOTIFICATION_CONST.REQUEST.URL_NOTIFICATION_LIST,
            type: 'GET',
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + EC_ADMIN_NOTIFICATION_TOKEN.getFromStorage());
            },
            data: {
                mallId: SHOP.getMallID(),
                page: iPage,
                size: EC_ADMIN_NOTIFICATION_CONST.REQUEST.LIST_SIZE
            },
            success: function (oResponse) {
                if (!oResponse || !oResponse.content) {
                    return;
                }

                if (oResponse.hasOwnProperty('totalElements')) {
                    syncCount(oResponse.totalElements);
                }

                if (iPage === 0) {
                    $('.eStorageItem').remove();
                    updateNewNotification(oResponse.content);
                }

                var bIsAppend = iPage > 0 || $notificationListContainer.children().length < 1;
                var $firstChild = $notificationListContainer.children().first();

                oResponse.content.forEach(function (oNotificationItem) {
                    // �대� �뚮뜑留곷맂 �뚮┝ �⑥뒪
                    if ($notificationListContainer.find('#' + EC_ADMIN_NOTIFICATION_CONST.NOTIFICATION_ID_PREFIX + oNotificationItem.id).length > 0) {
                        return true;
                    }

                    var oElement = EC_ADMIN_NOTIFICATION_RENDERER.instance().setData(oNotificationItem).render();

                    // �쎌쓬�대깽�� �좊떦
                    $(oElement).find('.eNotificationReadItem').click(updateReadStatus);

                    if (bIsAppend) {
                        $notificationListContainer.append(oElement);
                    } else {
                        $firstChild.before(oElement);
                    }
                });

                var iChildrenLength = $notificationListContainer.children().length;

                if (iChildrenLength > 0) {
                    $emptyElement.hide();
                } else {
                    $emptyElement.show();
                }

                bHasNextFetchingElement = oResponse.hasOwnProperty('totalElements') && iChildrenLength < oResponse.totalElements;

                saveNotificationToStorage(iPage, oResponse.content);

                bIsFetching = false;
            },
            error: function (e) {
                if (e.status === 401) {
                    EC_ADMIN_NOTIFICATION_TOKEN.requestToken(function () {
                        requestNotificationList(iPage);
                    });
                }
            }
        });

        return true;
    }

    /**
     * �덈줈 �쎌쓬泥섎━�� �뚮┝�ㅼ쓽 �곹깭瑜� �낅뜲�댄듃�⑸땲��.
     */
    function updateReadStatus(sNotificationId, bIsAll) {
        if (typeof sNotificationId !== "string") {
            sNotificationId = $(this).data('id');
        }

        var $targetElement = $('#' + EC_ADMIN_NOTIFICATION_CONST.NOTIFICATION_ID_PREFIX + sNotificationId + '.new');

        if (bIsAll !== true && (!sNotificationId || aReadUpdated.indexOf(sNotificationId) !== -1 || $targetElement.length < 1)) {
            return;
        }

        if (bIsAll === true) {
            $notificationRoot.find('.' + EC_ADMIN_NOTIFICATION_CONST.NOTIFICATION_ITEM_CLASS + '.new').removeClass('new');
            $notificationRoot.find('.eNewContainer.active').removeClass('active');
            setCount(0);
        } else {
            $targetElement.removeClass('new');
            $targetElement.find('.eNewContainer').removeClass('active');
            setCount(iNotificationCount - 1);
        }

        // �꾩옱 �곹깭 �ㅽ넗由ъ��� ����
        saveNotificationToStorage();
        aReadUpdated.push(sNotificationId);

        var requestData = {
            id  : [sNotificationId],
            read: 'T'
        };

        if (bIsAll === true) {
            requestData.id = [];
            requestData.all = 'T';
        }

        $.ajax({
            url: sNotificationHost + EC_ADMIN_NOTIFICATION_CONST.REQUEST.URL_NOTIFICATION_READ,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(requestData),
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + EC_ADMIN_NOTIFICATION_TOKEN.getFromStorage());
            },
            error: function (e) {
                if (e.status === 401) {
                    EC_ADMIN_NOTIFICATION_TOKEN.requestToken(function () {
                        updateReadStatus(sNotificationId);
                    });
                }
            }
        });
    }

    /**
     * �꾩옱 蹂댁씠�� �뚮┝ 以� 理쒓렐 10媛쒕� �ㅽ넗由ъ��� ����
     */
    function saveNotificationToStorage(iPage, aRecentNotification) {
        var aNotificationList = [];

        if ($notificationListContainer.length < 1) {
            if (aRecentNotification && iPage === 0) {
                localStorage.setItem(EC_ADMIN_NOTIFICATION_CONST.getStorageKey('list'), JSON.stringify(aRecentNotification));
            }

            return;
        }

        $('.' + EC_ADMIN_NOTIFICATION_CONST.NOTIFICATION_ITEM_CLASS).each(function (iIndex, oNotificationElement) {
            // 10媛쒓퉴吏� ����
            if (iIndex > 9) {
                return false;
            }

            var $element = $(oNotificationElement);
            var oNotificationInfo = {
                id: $element.data('id'),
                title: $element.find('.title').text(),
                summary: $element.find('.' + EC_ADMIN_NOTIFICATION_CONST.SUMMARY_CLASS).html(),
                content: $element.find('.' + EC_ADMIN_NOTIFICATION_CONST.CONTENT_CLASS).html(),
                read: $element.hasClass('new') || $element.find('.eNewContainer').hasClass('active') ? 'F' : 'T',
                subCategory: $element.data('subCategory'),
                createdDate: $element.find('.alarmTime').data('raw')
            };

            var $linkElement = $element.find('.alarmLink');
            if ($linkElement.length > 0) {
                oNotificationInfo['linkUrl'] = $linkElement.attr('href');
                oNotificationInfo['linkText'] = $linkElement.text();
                oNotificationInfo['linkIsNewWindow'] = $linkElement.attr('target') === '_blank' ? 'T' : 'F';
            }

            aNotificationList.push(oNotificationInfo);
        });

        localStorage.setItem(EC_ADMIN_NOTIFICATION_CONST.getStorageKey('list'), JSON.stringify(aNotificationList));
    }

    /**
     * 移댁슫�� �숆린��
     */
    function syncCount(iTotalCount) {
        $.ajax({
            url: sNotificationHost + EC_ADMIN_NOTIFICATION_CONST.REQUEST.URL_NOTIFICATION_READ_COUNT,
            type: 'GET',
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + EC_ADMIN_NOTIFICATION_TOKEN.getFromStorage());
            },
            success: function (oResponse) {
                if (!oResponse || !oResponse.hasOwnProperty('count')) {
                    return;
                }

                setCount(iTotalCount - oResponse.count);
            },
            error: function (e) {
                if (e.status === 401) {
                    EC_ADMIN_NOTIFICATION_TOKEN.requestToken(function () {
                        syncCount(iTotalCount);
                    });
                }
            }
        });
    }

    /**
     * 移댁슫�� �ㅼ젙
     */
    function setCount(iCount) {
        if (!iCount || iCount < 0) {
            iCount = 0;
        }

        iNotificationCount = iCount;
        localStorage.setItem(EC_ADMIN_NOTIFICATION_CONST.getStorageKey('count'), iNotificationCount);
        $countContainer.text('(' + iCount + ')');
    }

    /**
     * �� �뚮┝�� �덈뒗 �곹깭 �ㅼ젙
     */
    function updateNewNotification(aNotificationList) {
        if (aNotificationList.length < 1) {
            return;
        }

        var sRecentId = aNotificationList[0]['id'];
        var sOldRecentId = localStorage.getItem(EC_ADMIN_NOTIFICATION_CONST.getStorageKey('lastId'));
        var sCurrentStatus = localStorage.getItem(EC_ADMIN_NOTIFICATION_CONST.getStorageKey('hasNew'));

        if (!sOldRecentId || sOldRecentId !== sRecentId) {
            localStorage.setItem(EC_ADMIN_NOTIFICATION_CONST.getStorageKey('lastId'), sRecentId);
            localStorage.setItem(EC_ADMIN_NOTIFICATION_CONST.getStorageKey('hasNew'), 'T');
            $newContainer.addClass(EC_ADMIN_NOTIFICATION_CONST.NOTIFICATION_CONTAINER_NEW_CLASS);
        } else if (sCurrentStatus !== 'T') {
            localStorage.setItem(EC_ADMIN_NOTIFICATION_CONST.getStorageKey('hasNew'), 'F');
            $newContainer.removeClass(EC_ADMIN_NOTIFICATION_CONST.NOTIFICATION_CONTAINER_NEW_CLASS);
        }
    }
});