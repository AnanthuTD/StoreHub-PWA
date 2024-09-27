import axiosInstance from '@/config/axios';
import { CartItem } from '@/presentation/pages/user/cart';
import { AxiosError } from 'axios';

export const fetchCartItems = async () => {
  try {
    const { data } = await axiosInstance.get('/user/cart');
    return data.cartItems;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const incrementQuantity = async (params: { productId: string; variantId: string }) => {
  try {
    const { data } = await axiosInstance.post('/user/cart/add', params);
    return data.totalPrice;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    } else {
      throw { message: 'An unexpected error occurred! Unable to add product to cart' };
    }
  }
};

export const removeProduct = async (productId: string, variantId: string) => {
  try {
    await axiosInstance.delete('/user/cart/remove', { params: { productId, variantId } });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

interface DecrementProductParams {
  productId: string;
  variantId: string;
}

export const decrementProductInCart = async (
  params: DecrementProductParams,
): Promise<CartItem | null> => {
  try {
    const response = await axiosInstance.patch(`/user/cart/decrement`, params);
    return response.data.totalPrice; // Assuming the cart is returned in the response
  } catch (error) {
    console.error('Error decrementing product in cart:', error);
    throw new Error(
      (error as AxiosError).response?.data?.error || 'Failed to decrement product in cart.',
    );
  }
};
