module.exports = {
// Função para descontar uma porcentagem no valor do produto	
  priceDiscount(product) {
  	if (product.discount) {
  	  return product.price * (1 - product.discount)	
  	} else {
  	  return product.price
  	}
  }
}