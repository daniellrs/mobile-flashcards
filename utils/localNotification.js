import { Notifications, Permissions } from 'expo';
import { AsyncStorage } from 'react-native'

const NOTIFICATION_KEY = 'desk:notification';

const createLocalNotification = ( ) => {
  return {
    title: 'Mobile FlashCards!',
    body: `👋 Don't forget to study today!`,
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}

export const setLocalNotification = ( ) => {
  AsyncStorage.getItem( NOTIFICATION_KEY ).then( JSON.parse ).then(( data ) => {
    if ( data === null ) {
      Permissions.askAsync( Permissions.NOTIFICATIONS ).then(({ status }) => {
        if ( status === 'granted' ) {
          Notifications.cancelAllScheduledNotificationsAsync( );

          let tomorrow = new Date( );
          tomorrow.setDate( tomorrow.getDate( ) + 1 );
          tomorrow.setHours( 8, 0 );

          Notifications.scheduleLocalNotificationAsync(createLocalNotification( ), {
            time: tomorrow,
            repeat: 'day'
          })

          AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify( true ))
        }
      })
    }
  })
}

export const clearLocalNotification = ( ) => {
  return AsyncStorage.removeItem( NOTIFICATION_KEY ).then( Notifications.cancelAllScheduledNotificationsAsync )
}
