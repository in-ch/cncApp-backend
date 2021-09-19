import firebase from 'firebase-admin';

export const push = firebase.initializeApp(
  {
    credential: firebase.credential.cert({
      projectId: 'fcm-cnc-app',
      clientEmail:
        'firebase-adminsdk-lkxae@fcm-cnc-app.iam.gserviceaccount.com',
      privateKey:
        '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDL3yob9waqvinv\nrJGVfdvGH/BcpXzd6IsksR0dVEbbPHdiUhsfElT/emd4L1ktaButwULiufsEQ2ng\n5SqG6GGXACqvbuCV/pYnQ1Q0HCJStnP1Wigb5Skd+9Gi+s3okFhzzmGt9DKOOmPj\n8DBOASUNAB8t293eY6dbwYRNl3YSYO6LASnA9i6gJ3w4aGv14+pXZVab9xWRZP1y\nFmGzjKatc7gcBpKtA8V3kP7w0aYXz060jZh3JUQlnG7iiY3RfkVb9U4i+ibqWQ28\nr6A2+EaN+yow0twzv279Pmp9YdM98MCSozuawRpCaa/Cshuw00eYjpDzamei7Ggg\nxgOxMUhDAgMBAAECggEABWh5mv1OEXhy71cyE3efvV06iJKhQde53TLPlWgXaxhr\nCFIqQwQ++fn6xa7n3DL/TPgr+Iy7cm0BYYRiwOpoMFPCTh4QWhpDTG5WTP2UEYKi\nh9co6jiFgzSbZonlrW4q0oOehrlMIAa/gJvuBBu2qmYe7Z4AADa/iUkUY+SJLsqU\nR887VmYqKXYbDs2xqPzuHLTdmt+FRE8XuSoBjjJeFBFWZHCqS425CABjslH42E1L\nu0RkqQgFsiKJ7+iaMQnzQxaAKIHAOm/lX5l7QUwOFjn1MA919LbUGtP0VWPLEhC/\nS88GY3xIBwxlz13ee9N+MXG1SqXwA1JE4y++T4NXWQKBgQD+8dWwqDVc53UyJQQq\nHhUbutk9C+xmK/OF26tMAsK0Dax3gs3e7v8xEDWF1B9YuMHVhsQUrLFG9Q5+GdqH\nJjSBQ7ysISjAoZ/iN4lbJ+rgnErPe1nAoec+z6TQanb45JuslOM2W4j6imBUlVMq\nFdLfabxBWKEDeeDk2z8JMO46+wKBgQDMtzUrjGufyLUocRTRwaIG/UvHI6UPSIdU\nWzBMXYdGa7yVFMIzvzF6v6W7tqAEvCtvOt/Vmef9wWrPXXo4kTQTT7Jy4oo91dju\nVkVJutnzRBIR0NcgZz8SQzzO9fajl20spd28k2xSxGq2JBFKJk6FpJCsw3fvt+mv\n+DMxGCGlWQKBgQDfG7JfZAU3JZOJa52GYkckulLsuqeKDoKSLVhuL6hGvASnngAe\nTddkD4RXdvhrw1xWShcE5NBLgZ/KOUPlrEicqzPNC0PHuGncJa/95yQEpqJNiuxT\nyRw++qaIgfNWA3I9CRsCcf6hC0IcI4XhObIONFE8epyGFz356ejzWS/SywKBgDsr\n7Xtz8BvUSMCyxuDGRk4c4s1huTEMtskkPnakRhiNxYmV4XhRmDyxrnbul5wmw6s3\n6kD0ZoELahMcItq85b97NspMPscWy8hAOXDRSHQvRcXOhpAAJ9PgiXAM2kh42X6h\nRtFeD15xFaMmE7VKE0I/ye2V5lHs5+gMJsfXAMqpAoGAZ/8WsHIxYHNtbIcPHbrZ\nNTxsqrz2kgX27qecPjrFBTisspwOCWk2yxxqS1VhW10Tnh/YBajTDvIzrfmm/9BH\nyEnHwEiQPy9w1j34GZFNP9JlRitPYDf9lq/b2M1bl0MVek/WlyQQ3zOVW4RPbQn5\n2vKBYSDpz7cSVI/p4wuMQFU=\n-----END PRIVATE KEY-----\n',
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  },
  'push',
);

export const pushAdmin = firebase.initializeApp(
  {
    credential: firebase.credential.cert({
      projectId: 'fcm-cnc-admin',
      clientEmail:
        'firebase-adminsdk-owyf8@fcm-cnc-admin.iam.gserviceaccount.com',
      privateKey:
        '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC1/hWHXiEWoOKk\nCXNtU8mriY2/XMOsqcMAzawRNIzO0xzbiI0FMggnlpoJrf6qP0x2hCxyaVIUWyM0\nCnRthU3nvyL3UT8JDFha6KunI4mKkZxaGFT824g4RtNOsvEil+yBLAqmQbq7Zy1D\nw9bwe2TYRJPQjFsWGC4YijVgnj7inl4fOJ4Q/L3gPYsNNArd9m4rRb73BwE4RGUQ\nI40tPbLpayI7ZBIhUHKYBLIDfix9DOHrx2pV5CQx9BIyZnORAKD+6lQxThilRLRg\nHhDtbVWCbHHpY3x/dw6YfLcyL6WUSkT0alfbuqmPSYiVVWBXCgIMuU8cYB2wubJZ\nfRVzR513AgMBAAECggEAChoCAeiEolKTIehwYrzIMIr1tjh6Qqbi7wl7fTJTL9Zh\n/1bTVQV+PwxJ8ohDiW7yrzq46NorDHwz4QXviSC2vp/1BeXu6hv9pNYjU6dSUWxc\nUa07Z77xDwactf09YIku6cs9sBVtPaJazdccosPb83EjBJa10O0jVIi0sRniLbE6\nsQ19tRjZeHcwt27wYecvZ2Uj2spXrFREP7l4TVpiuw3yV5MHriG4EUrbNyiQHG/W\nZUfoSMAY4ZYod0jiyjSIMZV0k+VQwKKXlFAMtroMcULjf5CowI+S3lWI3i9FUTMT\nUr7IQFLYyb+aZZu904BOCgoGz39eQw4bbQA5tjpKeQKBgQDZ3VaYkzc4iyOwFAJT\ngmUMVOXEzLiRJl8zgadATsgq8OLkGziAxlwtJrVAfuMAGGY+9xdZ9uUppqGO9md5\nhIRSg8vPV+2A1LA5zfJAmKj8FD183cNYouMXY8GX01rjw5eUKUpUriDrmbIT+MLF\nUY8Y3N4LPGhdM+JElwkX2JXgqwKBgQDV2UsJmh3rJH7ymVIyCDRHN+ZIGTcEa2qP\nXeZaarbtR4/0vCo2d3OKsMsyagsk6PWJ2N5OrUXZO3e2t7Cq9u2g+bmFDxqwTwTs\nL6AqNyfq8ZLD/FfXxWDX5UvehzFnxdUpMaFWipUK4k4LXOuxYi2N7v1iT23Jj0b2\nX3XXMdXuZQKBgQCl/gM1mqzvMuwNAyHGmMn+vEyYRla1mOPeLYHN+HiAZyqoG6lQ\nTFH8wMpGiqbP8scsYDz1eayesGvVrh2ms3XSHMLThq3Zg7OFR0m1N9tAvPcgRSLK\nTMjzkDj3Qby1XtgFtfQBUu6YM3E/0EAt8PczPU0ciHkH0jkqg10VQxrmowKBgQCy\nbpOQ2HpcSGBwVgPiYTwVrIvF3twsIOCR7VyWVvJ5O7vfDd3/Al5y+58gWqEf1A2E\nTmL3rNZaMqdp2w1bKZwPNC9a2caAE/7cf8SZVNpGy/iU9QnqrPNoURej/pP3rXd1\n3sZq6kkAAuHx0z+KC4xNIHtluza09orUacRuoVOKjQKBgQCxzVrVqJrTVVDwhdRq\nW/LFPlUX+9LTLXfb5pb/BAjzn1v7p6lmS7QUUHio4KP6adkpMTOJyaJiPxOQQ0Un\nMNnduPRz+BdyfCduIDw/tbMHTQch4NH0BXSjKy3q7xX5I/6IXrFSjzzr9IjaGy+5\nngk8oIbyekrori3Q4G//osDVIQ==\n-----END PRIVATE KEY-----\n',
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL2,
  },
  'pushAdmin',
);



