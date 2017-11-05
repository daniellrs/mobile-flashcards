import { AsyncStorage } from 'react-native';

export const getDecks = ( ) => {
  return AsyncStorage.getItem( 'decks' ).then(res => JSON.parse( res ));
}

export const getDeck = ( title ) => {
  return AsyncStorage.getItem( 'decks' ).then(res => {
    const data = JSON.parse( res );
    return data[title];
  });
}

export const saveDeckTitle = ( title ) => {
    return AsyncStorage.mergeItem('decks', JSON.stringify({ [title]: {title} }));
}

export const addCardToDeck = ( ) => {

}

// export const removeEntry = ( key ) => {
//   return AsyncStorage.getItem( CALENDAR_STORAGE_KEY ).then(results => {
//     const data = JSON.parse( results );
//     data[key] = undefined;
//     delete data[key];
//     AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify( data ));
//   });
// }
