import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface UserPreferences {
  budget: {
    min: number;
    max: number;
  };
  size: string;
  styleTags: string[];
  preferredCategories: string[];
  shoppingHistory: string[];
  favoriteColors: string[];
  occasion: string;
}

interface PreferencesState {
  preferences: UserPreferences;
  isLoaded: boolean;
}

type PreferencesAction =
  | { type: 'SET_BUDGET'; payload: { min: number; max: number } }
  | { type: 'SET_SIZE'; payload: string }
  | { type: 'ADD_STYLE_TAG'; payload: string }
  | { type: 'REMOVE_STYLE_TAG'; payload: string }
  | { type: 'SET_PREFERRED_CATEGORIES'; payload: string[] }
  | { type: 'ADD_TO_HISTORY'; payload: string }
  | { type: 'SET_FAVORITE_COLORS'; payload: string[] }
  | { type: 'SET_OCCASION'; payload: string }
  | { type: 'LOAD_PREFERENCES'; payload: UserPreferences }
  | { type: 'RESET_PREFERENCES' };

const defaultPreferences: UserPreferences = {
  budget: { min: 0, max: 10000 },
  size: 'M',
  styleTags: [],
  preferredCategories: [],
  shoppingHistory: [],
  favoriteColors: [],
  occasion: 'casual',
};

const initialState: PreferencesState = {
  preferences: defaultPreferences,
  isLoaded: false,
};

const preferencesReducer = (state: PreferencesState, action: PreferencesAction): PreferencesState => {
  switch (action.type) {
    case 'SET_BUDGET':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          budget: action.payload,
        },
      };

    case 'SET_SIZE':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          size: action.payload,
        },
      };

    case 'ADD_STYLE_TAG':
      if (!state.preferences.styleTags.includes(action.payload)) {
        return {
          ...state,
          preferences: {
            ...state.preferences,
            styleTags: [...state.preferences.styleTags, action.payload],
          },
        };
      }
      return state;

    case 'REMOVE_STYLE_TAG':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          styleTags: state.preferences.styleTags.filter(tag => tag !== action.payload),
        },
      };

    case 'SET_PREFERRED_CATEGORIES':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          preferredCategories: action.payload,
        },
      };

    case 'ADD_TO_HISTORY':
      const newHistory = [action.payload, ...state.preferences.shoppingHistory.filter(id => id !== action.payload)].slice(0, 20);
      return {
        ...state,
        preferences: {
          ...state.preferences,
          shoppingHistory: newHistory,
        },
      };

    case 'SET_FAVORITE_COLORS':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          favoriteColors: action.payload,
        },
      };

    case 'SET_OCCASION':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          occasion: action.payload,
        },
      };

    case 'LOAD_PREFERENCES':
      return {
        ...state,
        preferences: action.payload,
        isLoaded: true,
      };

    case 'RESET_PREFERENCES':
      return {
        ...state,
        preferences: defaultPreferences,
      };

    default:
      return state;
  }
};

interface PreferencesContextType {
  state: PreferencesState;
  setBudget: (min: number, max: number) => void;
  setSize: (size: string) => void;
  addStyleTag: (tag: string) => void;
  removeStyleTag: (tag: string) => void;
  setPreferredCategories: (categories: string[]) => void;
  addToHistory: (productId: string) => void;
  setFavoriteColors: (colors: string[]) => void;
  setOccasion: (occasion: string) => void;
  resetPreferences: () => void;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a UserPreferencesProvider');
  }
  return context;
};

export const UserPreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(preferencesReducer, initialState);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      try {
        const parsedPreferences = JSON.parse(savedPreferences);
        dispatch({ type: 'LOAD_PREFERENCES', payload: parsedPreferences });
      } catch (error) {
        console.error('Error loading preferences from localStorage:', error);
        dispatch({ type: 'LOAD_PREFERENCES', payload: defaultPreferences });
      }
    } else {
      dispatch({ type: 'LOAD_PREFERENCES', payload: defaultPreferences });
    }
  }, []);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    if (state.isLoaded) {
      localStorage.setItem('userPreferences', JSON.stringify(state.preferences));
    }
  }, [state.preferences, state.isLoaded]);

  const setBudget = (min: number, max: number) => {
    dispatch({ type: 'SET_BUDGET', payload: { min, max } });
  };

  const setSize = (size: string) => {
    dispatch({ type: 'SET_SIZE', payload: size });
  };

  const addStyleTag = (tag: string) => {
    dispatch({ type: 'ADD_STYLE_TAG', payload: tag });
  };

  const removeStyleTag = (tag: string) => {
    dispatch({ type: 'REMOVE_STYLE_TAG', payload: tag });
  };

  const setPreferredCategories = (categories: string[]) => {
    dispatch({ type: 'SET_PREFERRED_CATEGORIES', payload: categories });
  };

  const addToHistory = (productId: string) => {
    dispatch({ type: 'ADD_TO_HISTORY', payload: productId });
  };

  const setFavoriteColors = (colors: string[]) => {
    dispatch({ type: 'SET_FAVORITE_COLORS', payload: colors });
  };

  const setOccasion = (occasion: string) => {
    dispatch({ type: 'SET_OCCASION', payload: occasion });
  };

  const resetPreferences = () => {
    dispatch({ type: 'RESET_PREFERENCES' });
  };

  const value: PreferencesContextType = {
    state,
    setBudget,
    setSize,
    addStyleTag,
    removeStyleTag,
    setPreferredCategories,
    addToHistory,
    setFavoriteColors,
    setOccasion,
    resetPreferences,
  };

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
};

