import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { Watchlist } from '../types/types';

type WatchlistProviderProps = {
  children: ReactNode;
};

export type Action =
  | { type: 'add_to_list'; payload: number }
  | { type: 'remove_from_list'; payload: number };

const WatchlistContext = createContext<{
  watchlistState: Watchlist;
  dispatch: React.Dispatch<Action>;
} | null>(null);

const watchlistReducer = (state: Watchlist, action: Action) => {
  switch (action.type) {
    case 'add_to_list': {
      return [...state, action.payload];
    }

    case 'remove_from_list': {
      return state.filter((id) => id !== action.payload);
    }

    default: {
      // eslint-disable-next-line no-console
      console.error(`Error: Unhandled action type`);
      return state;
    }
  }
};

const initializer = () => {
  const items = localStorage.getItem('localWatchlist');

  return items ? (JSON.parse(items) as number[]) : [];
};

export const WatchlistProvider = (props: WatchlistProviderProps) => {
  const { children } = props;

  const [watchlistState, dispatch] = useReducer(
    watchlistReducer,
    [],
    initializer,
  );

  useEffect(() => {
    localStorage.setItem('localWatchlist', JSON.stringify(watchlistState));
  }, [watchlistState]);

  return (
    <WatchlistContext.Provider value={{ watchlistState, dispatch }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);

  if (context === null || context === undefined) {
    throw new Error('useWatchlist must be used within the WatchlistProvider');
  }

  return context;
};
