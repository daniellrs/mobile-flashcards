import { AsyncStorage } from 'react-native';

export const getDecks = ( ) => {
  return AsyncStorage.getItem( 'decks' ).then(res => JSON.parse( res ));
}

export const getDeck = ( title ) => {
  return AsyncStorage.getItem( 'decks' ).then(res => {
    if( !res ) {
      return undefined;
    }

    const data = JSON.parse( res );
    return data[title];
  });
}

export const saveDeckTitle = ( title ) => {
    return AsyncStorage.mergeItem('decks', JSON.stringify({ [title]: {title} }));
}

export const addCardToDeck = ( title, {answer, question} ) => {
  return AsyncStorage.getItem( 'decks' ).then(res => {
    const data = JSON.parse( res );

    if( !data[title].questions ) {
      data[title].questions = [];
    }

    data[title].questions.push({answer, question});

    AsyncStorage.mergeItem('decks', JSON.stringify( data ));
  });
}

export const removeDecks = () => {
  return AsyncStorage.removeItem( 'decks' );
}
