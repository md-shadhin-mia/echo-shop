import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {NativeBaseProvider, Box, Text, Heading, VStack, HStack, Button, Image, Stack, Toast } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
type Product={
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    rating: number;
    brand: string;
    colors: string[];
    image_url: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  return (
      <Box width={"1/2"} p={2} >
        <Box backgroundColor={'white'} rounded="md" overflow={"hidden"}>
            <VStack>
                <Image source={{ uri: product.image_url }} style={styles.productImage} alt={product.name} />
                <VStack space={2} p={2}>
                    <Heading size="sm">{product.name}</Heading>
                    <HStack space={2} justifyContent={'space-between'}>
                        <Text style={styles.productPrice}>{product.price}</Text>
                        <Button variant={'ghost'} onPress={() => Toast.show({ title: 'Added to cart' })}>
                            <Ionicons name="cart-sharp" size={18} />
                        </Button>
                    </HStack>
                </VStack>
            </VStack>
          </Box>
      </Box>
  );
};
const products = [
    {
      "id": 1,
      "name": "Wireless Headphones",
      "description": "Noise-cancelling over-ear headphones with Bluetooth connectivity.",
      "price": 99.99,
      "stock": 120,
      "category": "Electronics",
      "rating": 4.7,
      "brand": "SoundMagic",
      "colors": ["Black", "White", "Blue"],
      "image_url": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
    },
    {
      "id": 2,
      "name": "Smartphone",
      "description": "5G smartphone with 128GB storage and a 6.1-inch display.",
      "price": 699.00,
      "stock": 45,
      "category": "Mobile Phones",
      "rating": 4.5,
      "brand": "TechX",
      "colors": ["Black", "Silver"],
      "image_url": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
    },
    {
      "id": 3,
      "name": "Gaming Laptop",
      "description": "High-performance laptop with 16GB RAM and a GTX 3060 graphics card.",
      "price": 1299.99,
      "stock": 30,
      "category": "Computers",
      "rating": 4.8,
      "brand": "GamePro",
      "colors": ["Gray", "Red"],
      "image_url": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
    },
    {
      "id": 4,
      "name": "Smartwatch",
      "description": "Fitness tracking smartwatch with heart rate monitor and GPS.",
      "price": 199.99,
      "stock": 80,
      "category": "Wearables",
      "rating": 4.6,
      "brand": "WristTech",
      "colors": ["Black", "Green", "Pink"],
      "image_url": "https://images.unsplash.com/photo-1519241047957-be31d7379a5d"
    },
    {
      "id": 5,
      "name": "4K Television",
      "description": "55-inch 4K UHD smart TV with HDR10 support.",
      "price": 499.99,
      "stock": 15,
      "category": "Home Entertainment",
      "rating": 4.4,
      "brand": "ScreenMax",
      "colors": ["Black"],
      "image_url": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
    }
  ];

const Shop = () => {
    const [loadedProducts, setLoadedProducts] = useState<Product[]>(products);
    
  return (
    <NativeBaseProvider>
        <Box style={styles.container} safeArea>
            <Box style={styles.header}>
                <Heading style={styles.headerTitle}>Shop</Heading>
                <TouchableOpacity>
                    <Ionicons name="search" size={24} />
                </TouchableOpacity>
            </Box>
            <ScrollView onScrollEndDrag={(event) => {
                const scrollPosition = event.nativeEvent.contentOffset.y;
                const height = event.nativeEvent.contentSize.height;
                const screenHeight = Dimensions.get('window').height;

                if (scrollPosition + screenHeight >= height) {
                    console.log('Scrolled to last');
                    Toast.show({ title: 'more products loading' });
                    // Load more products
                    setTimeout(() => {
                        setLoadedProducts([...loadedProducts, ...products]);
                    }, 2000);
                }
            }}>
                    
                    {/* <Box style={styles.banner}>
                        <Image source={require('@/assets/images/react-logo.png')} style={styles.bannerImage} />
                        <Text style={styles.bannerText}>React Native</Text>
                    </Box> */}
                    <Box style={styles.section}>
                        <Text style={styles.sectionTitle}>Products</Text>
                        <Box >
                            <Stack direction="row" flexWrap={"wrap"}>
                                {loadedProducts.map((product) => (
                                    <ProductCard product={product} />
                                ))}
                            </Stack>
                        </Box>
                    </Box>
            </ScrollView>
        </Box>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00b050',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  bannerImage: {
    width: 150,
    height: 100,
    marginRight: 16,
  },
  bannerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 16,
  },
  productImage: {
    width: '100%',
    height: 150,
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 12,
  },
  productDetails: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  backIcon: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
  },
  productDetailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productDetailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productImageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  productDetailsText: {
    fontSize: 14,
    marginBottom: 4,
  },
  productDetailsPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  colorOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
  },
  reviewsContainer: {
    marginBottom: 16,
  },
  reviewsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  reviewContainer: {
    padding: 16,
    backgroundColor: '#f2f2f2',
    marginRight: 8,
    borderRadius: 8,
  },
  reviewName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  reviewComment: {
    fontSize: 12,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#00b050',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  buyButton: {
    backgroundColor: '#00b050',
    width: '100%',
    padding: 12,
    borderRadius: 8,
  },
});

export default Shop;
