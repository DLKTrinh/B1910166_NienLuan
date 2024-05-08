const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const { ObjectId } = require('mongodb');

async function start() {
  const uri = 'mongodb://localhost:27017/TiemBanh'
  const client = new MongoClient(uri);

  await client.connect();
  const db = client.db();

  const app = express();
  app.use(express.json());

  app.use('/images', express.static(path.join(__dirname, '../assets')));

//handler cho quản lý sản phẩm

  app.get('/api/products', async (req, res) => {
    const products = await db.collection('products').find({}).toArray();
    res.send(products);
  });

  app.get('/api/products/:productId', async (req, res) => {
    const productId = req.params.productId;
    const product = await db.collection('products').findOne({ id: productId });
    res.json(product);
  });

  app.post('/api/products', async (req, res) => {
    try {
      const { id, name, description, price, imageUrl } = req.body;
  
      const existingProduct = await db.collection('products').findOne({ id });
  
      if (existingProduct) {
        return res.status(400).json({ message: 'ID bị trùng' });
      }
  
      const newProduct = {
        id,
        name,
        description,
        price,
        imageUrl
      };
  
      await db.collection('products').insertOne(newProduct);
  
      res.status(201).json({ message: 'Sản phẩm mới đã được tạo', product: newProduct });
    } catch (error) {
      console.error(error);
    }
  });

  app.put('/api/products/:productId', async (req, res) => {
    try {
      const productId = req.params.productId;
      const { name, description, price, imageUrl } = req.body;

      const existingProduct = await db.collection('products').findOne({ id: productId });

      if (!existingProduct) {
        return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
      }

      await db.collection('products').updateOne({ id: productId }, {
        $set: {
          name: name || existingProduct.name,
          description: description || existingProduct.description,
          price: price || existingProduct.price,
          imageUrl: imageUrl || existingProduct.imageUrl
        }
      });

      const updatedProduct = await db.collection('products').findOne({ id: productId });

      res.json({ message: 'Sản phẩm đã được cập nhật thành công', product: updatedProduct });
    } catch (error) {
      console.error('Đã xảy ra lỗi khi cập nhật sản phẩm:', error);
    }
  });

  app.delete('/api/products/:productId', async (req, res) => {
    try {
      const productId = req.params.productId;
 
      await db.collection('products').deleteOne({ id: productId });
  
      res.json({ message: 'Sản phẩm đã được xóa' });
    } catch (error) {
      console.error(error);
    }
  });

// Hanlder cho giỏ hàng người dùng

  async function populateCartIds(ids) {
    return Promise.all(ids.map(id => db.collection('products').findOne({ id })));
  }

  app.get('/api/users/:userId/cart', async (req, res) => {
    const user = await db.collection('users').findOne({ id: req.params.userId });
    const populatedCart = await populateCartIds(user?.cartItems || []);
    res.json(populatedCart);
  });

  app.post('/api/users/:userId/cart', async (req, res) => {
    const userId = req.params.userId;
    const productId = req.body.id;

    const existingUser = await db.collection('users').findOne({ id: userId });

    if (!existingUser) {
      await db.collection('users').insertOne({ id: userId, cartItems: [] });
    }

    await db.collection('users').updateOne({ id: userId }, {
      $addToSet: { cartItems: productId }
    });

    const user = await db.collection('users').findOne({ id: req.params.userId });
    const populatedCart = await populateCartIds(user?.cartItems || []);
    res.json(populatedCart);
  });

  app.delete('/api/users/:userId/cart/:productId', async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;

    await db.collection('users').updateOne({ id: userId }, {
      $pull: { cartItems: productId },
    });

    const user = await db.collection('users').findOne({ id: req.params.userId });
    const populatedCart = await populateCartIds(user?.cartItems || []);
    res.json(populatedCart);
  });

// Handler cho đơn hàng

app.post('/api/users/:userId/orders', async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await db.collection('users').findOne({ id: userId });
    const cartItems = user?.cartItems || [];

    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Giỏ hàng rỗng' });
    }

    let total = 0;
    for (const itemId of cartItems) {
      const item = await db.collection('products').findOne({ id: itemId });
      total += parseFloat(item.price.replace('đ', '').trim());
    }

    const { name, address } = req.body;

    const order = {
      userId: userId,
      name: name,
      address: address,
      items: cartItems,
      total: total+"đ",
    };

    await db.collection('orders').insertOne(order);

    await db.collection('users').updateOne({ id: userId }, { $set: { cartItems: [] } });

    res.status(201).json({ message: 'Đơn hàng đã được tạo', order });
  } catch (error) {
    console.error(error);
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const orders = await db.collection('orders').find({}).toArray();

    res.json(orders);
  } catch (error) {
    console.error(error);
  }
});

app.get('/api/orders/:orderId', async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const order = await db.collection('orders').findOne({ _id: new ObjectId(orderId) });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const populatedCart = await populateCartIds(order.items);

    const orderWithCart = {
      ...order,
      cart: populatedCart
    };

    res.json(orderWithCart);
  } catch (error) {
    console.error(error);
  }
});


app.delete('/api/orders/:orderId', async (req, res) => {
  try { 
    const orderId = req.params.orderId;
    const existingOrder = await db.collection('orders').findOne({ _id: new ObjectId(orderId)});

    if (!existingOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await db.collection('orders').deleteOne({ _id: new ObjectId(orderId) });

    res.json({ message: 'Đơn hàng đã được xóa' });
  } catch (error) {
    console.error(error);
  }
});


  app.listen(8000, () => {
    console.log(`Server is listening on port 8000`)
  });

}

start();