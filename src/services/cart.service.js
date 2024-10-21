import cartRepository from "../repositories/cart.repository.js";

class CartService {
  async createCart() {
    return await cartRepository.createCart();
  }
  async getCartById(id) {
    return await cartRepository.getCartById(id);
  }
  async updateCart(id, cartData) {
    return await cartRepository.updateCart(id, cartData);
  }
  async deleteById(id) {
    return await cartRepository.deleteById(id);
  }
}

export default new CartService();
