import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { wishlistApi } from '../api/wishlistApi';
import { productApi } from '../api/productApi';
import { userApi } from '../api/userApi';
import userReducer from '../reducers/authSlice';
import { cartApi } from '@/api/cartApi';
import { CategoryApi } from '@/api/CategoryApi';
import { SubCategoryApi } from '@/api/SubcategoryApi';

export const store = configureStore({
    reducer: {
        user: userReducer,
        [wishlistApi.reducerPath]: wishlistApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
        [CategoryApi.reducerPath]: CategoryApi.reducer,
        [SubCategoryApi.reducerPath]: SubCategoryApi.reducer,

    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(wishlistApi.middleware)
            .concat(productApi.middleware)
            .concat(userApi.middleware)
            .concat(cartApi.middleware)
            .concat(CategoryApi.middleware)
            .concat(SubCategoryApi.middleware),
});

setupListeners(store.dispatch);
