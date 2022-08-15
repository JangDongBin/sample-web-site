var EC_ADMIN_NOTIFICATION_RENDERER = {
    // �덈줈�� 媛앹껜 �앹꽦�� �꾪빐 instance() �몄텧
    instance: function() {
        var $notificationElement = $('#notificationTemplate').clone().removeAttr('id').addClass(EC_ADMIN_NOTIFICATION_CONST.NOTIFICATION_ITEM_CLASS);
        var sId, sTitle, sSummary, sContent, bIsRead, sSubCategory, sLinkUrl, sLinkText, bIsLinkNewWindow, sCreatedDate;

        // ID �좊떦
        function renderId() {
            var newId = EC_ADMIN_NOTIFICATION_CONST.NOTIFICATION_ID_PREFIX + sId;

            $notificationElement.data('id', sId);
            $notificationElement.attr('id', newId);
        }

        // 移댄뀒怨좊━ 吏���
        function renderCategory() {
            var $alarmLabel = $notificationElement.find('.alarmLabel');

            if (EC_ADMIN_NOTIFICATION_CONST.CATEGORIES[sSubCategory]) {
                var oCategoryInfo = EC_ADMIN_NOTIFICATION_CONST.CATEGORIES[sSubCategory];

                $alarmLabel.text(EC_ADMIN_NOTIFICATION_RENDERER.translatePhrase(oCategoryInfo['messageId']));
                $alarmLabel.addClass(oCategoryInfo['className']);

                $notificationElement.data('subCategory', sSubCategory);
            } else {
                $alarmLabel.hide();
            }
        }

        // �쒓컙 �좊떦
        function renderDate() {
            $notificationElement.find('.alarmTime').text(EC_ADMIN_NOTIFICATION_RENDERER.getTimeString(sCreatedDate)).data('raw', sCreatedDate);
        }

        // �쒕ぉ �좊떦
        function renderTitle() {
            $notificationElement.find('.title').text(sTitle);
        }

        // �댁슜 �좊떦
        function renderContent() {
            var $parentElement = $notificationElement.find('.infoArea');
            var $toggleBtn = $notificationElement.find('.alarmToggleBtn');

            if (sSummary) {
                var $summaryElement = $(document.createElement('p'));
                $summaryElement.css({'white-space': 'pre-wrap'});

                // �붿빟 �댁슜 �명똿
                $summaryElement.addClass(EC_ADMIN_NOTIFICATION_CONST.SUMMARY_CLASS);
                $summaryElement.html(sSummary.trim().replace(/\n/g, '<br>'));

                // �댁슜 �쇱퀜�� 蹂닿린 �좉� 踰꾪듉 �뺤쓽
                $toggleBtn.show();
                $toggleBtn.data('id', sId);
                $toggleBtn.addClass(EC_ADMIN_NOTIFICATION_CONST.HAS_SUMMARY_CLASS);
                $toggleBtn.click(function () {
                    var $parentElement = $(this).parent();

                    $(this).hide();
                    $parentElement.find('.' + EC_ADMIN_NOTIFICATION_CONST.CONTENT_CLASS).show();
                });

                $parentElement.prepend($summaryElement);
            }

            if (sContent) {
                var $contentElement = $(document.createElement('p'));
                $contentElement.css({'white-space': 'pre-wrap'});

                $contentElement.addClass(EC_ADMIN_NOTIFICATION_CONST.CONTENT_CLASS);
                $contentElement.html(sContent.trim().replace(/\n/g, '<br>'));

                if (sSummary) {
                    $contentElement.addClass(EC_ADMIN_NOTIFICATION_CONST.HAS_SUMMARY_CLASS);
                    $contentElement.hide();
                }

                $parentElement.append($contentElement);
            }
        }

        // 留곹겕 �좊떦
        function renderLink() {
            var $linkElement = $notificationElement.find('.alarmLink');

            if (!sLinkUrl) {
                $linkElement.remove();
                return;
            }

            $linkElement.data('id', sId);
            $linkElement.attr('href', sLinkUrl);
            $linkElement.text(sLinkText);

            if (bIsLinkNewWindow) {
                $linkElement.attr('target', '_blank');
            }
        }

        function renderRead() {
            if (bIsRead) {
                return;
            }

            $notificationElement.addClass('new');
            if (SHOP.isMobileAdmin()) {
                $notificationElement.find('.eNewContainer').addClass('active');
            }
        }

        return {
            // �뚮┝ �곗씠�� �명똿
            setData: function (oNotificationData) {
                if (!oNotificationData) {
                    return;
                }

                sId = oNotificationData['id'] || '';
                sTitle = oNotificationData['title'] || '';
                sSummary = oNotificationData['summary'] || '';
                sContent = oNotificationData['content'] || '';
                bIsRead = oNotificationData['read'] === 'T';
                sSubCategory = oNotificationData['subCategory'] || '';
                sLinkUrl = oNotificationData['linkUrl'] || '';
                sLinkText = oNotificationData['linkText'] || EC_ADMIN_NOTIFICATION_RENDERER.translatePhrase('READ.NOTICES');
                bIsLinkNewWindow = oNotificationData['linkIsNewWindow'] === 'T';
                sCreatedDate = oNotificationData['createdDate'] || new Date().toISOString();

                return this;
            },

            // �명똿�� �곗씠�곕� �듯빐 render
            render: function () {
                renderId(); // DOM ID 吏���
                renderCategory(); // 移댄뀒怨좊━ 吏���
                renderDate(); // �쒓컙 吏���
                renderTitle(); // �쒕ぉ 吏���
                renderContent(); // �댁슜 �명똿
                renderLink(); // 留곹겕 �명똿
                renderRead();

                // DOM return
                return $notificationElement[0];
            }
        };
    },

    /**
     * �쒓컙 �몄텧 �ъ뼇�� �곕Ⅸ string 蹂���
     * @param sDateString
     */
    getTimeString: function (sDateString) {
        var iNow = new Date().getTime();
        var iNotificationDate = new Date(sDateString).getTime();
        var iDiffSeconds = Math.floor((iNow - iNotificationDate) / 1000);
        var mTimeValue = 0;
        var sTimePostfix;

        if (iDiffSeconds < EC_ADMIN_NOTIFICATION_CONST.TIME_HOUR) {
            // N 遺� ��
            mTimeValue = Math.floor(iDiffSeconds / EC_ADMIN_NOTIFICATION_CONST.TIME_MINUTE);
            sTimePostfix = this.translatePhrase('MINUTES.AGO');
        } else if (iDiffSeconds < EC_ADMIN_NOTIFICATION_CONST.TIME_DAY) {
            // N �쒓컙 ��
            mTimeValue = Math.floor(iDiffSeconds / EC_ADMIN_NOTIFICATION_CONST.TIME_HOUR);
            sTimePostfix = this.translatePhrase('HOURS.AGO');
        } else if (iDiffSeconds < (EC_ADMIN_NOTIFICATION_CONST.TIME_DAY * 3)) {
            // N �� ��
            mTimeValue = Math.floor(iDiffSeconds / EC_ADMIN_NOTIFICATION_CONST.TIME_DAY);
            sTimePostfix = this.translatePhrase('DAYS.AGO');
        } else {
            // �쇰컲 �좎쭨 �쒓린
            var oNotificationDate = new Date(sDateString);
            var sYear = oNotificationDate.getFullYear().toString();
            var sMonth = ('0' + (oNotificationDate.getMonth() + 1)).slice(-2);
            var sDate = ('0' + oNotificationDate.getDate()).slice(-2);
            var sHour = ('0' + (oNotificationDate.getHours() % 12 || 12)).slice(-2);
            var sMinute = ('0' + oNotificationDate.getMinutes()).slice(-2);
            var sAmPm = oNotificationDate.getHours() >= 12 ? 'PM' : 'AM';

            mTimeValue = sYear + '.' + sMonth + '.' + sDate + ' ' + sHour + ':' + sMinute + ' ' + sAmPm;
            sTimePostfix = '';
        }

        return mTimeValue + sTimePostfix;
    },

    /**
     * i18n �ы븿/誘명룷�� �섏씠�ｃ뀍 ����
     * @param sMsgId
     */
    translatePhrase: function (sMsgId) {
        if (typeof EC_ADMIN_MENU_TRANSLATE_JS !== "undefined") {
            return EC_ADMIN_MENU_TRANSLATE_JS.oJsList[sMsgId];
        }

        if (typeof __ === "function") {
            return __(sMsgId, EC_ADMIN_NOTIFICATION_CONST.I18N_GROUP_ID);
        }

        return sMsgId;
    }
};