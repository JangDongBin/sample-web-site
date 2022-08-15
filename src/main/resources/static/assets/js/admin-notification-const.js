var EC_ADMIN_NOTIFICATION_CONST = {
    I18N_GROUP_ID: 'EC.ADMIN.NOTIFICATION',

    TIME_MINUTE: 60,
    TIME_HOUR: 3600,
    TIME_DAY: 86400,

    NOTIFICATION_CONTAINER_NEW_CLASS: 'active',
    NOTIFICATION_ITEM_CLASS: 'notificationItem',
    NOTIFICATION_ID_PREFIX: 'notification_',

    SUMMARY_CLASS: 'notificationSummary',
    CONTENT_CLASS: 'notificationContent',
    HAS_SUMMARY_CLASS: 'notificationHasSummary',

    CATEGORIES: {
        SYSTEM_MAINTENANCE: {
            messageId: 'SYSTEM.MAINTENANCE',
            category: 'ANNOUNCEMENT',
            className: 'pink'
        },
        NOTICE: {
            messageId: 'NOTICES',
            category: 'ANNOUNCEMENT',
            className: 'pink'
        },
        UPDATE: {
            messageId: 'UPDATES',
            category: 'ANNOUNCEMENT',
            className: 'pink'
        }
    },

    REQUEST: {
        URL_TOKEN: '/exec/admin/notification/token',
        URL_NOTIFICATION_LIST: '/notifications',
        URL_NOTIFICATION_READ: '/notificationReadStatuses',
        URL_NOTIFICATION_READ_COUNT: '/notificationReadStatuses/count',
        LIST_SIZE: 10,
        INTERVAL: 90000
    },

    STORAGE: {
        count: 'notification.count',
        token: 'notification.token',
        list: 'notification.list',
        lastRequestTime: 'notification.last_request_time',
        hasNew: 'notification.has_new',
        lastId: 'notification.last_id'
    },

    getStorageKey: function (sKey) {
        return SHOP.getAdminID() + "." + this.STORAGE[sKey];
    }
};

$(function () {
    if (SHOP.isNewProMode()) {
        EC_ADMIN_NOTIFICATION_CONST.NOTIFICATION_CONTAINER_NEW_CLASS = 'selected';
    }
});