Book 类有两个属性：title 和 price

BasketItem 类有两个属性： book 和 count

Basket 类有一个属性basketItems, 包含若干个basketItem
Basket 类有一个添加basketItem的方法：addBasketItem(),
  若要添加的basketItem存在，则将此baskeItem的数量增加到原有的basketItem的数量中
  若要添加的basketItem不存在，则将此basketItem添加到basketItems数组中

Discounter 类有一个属性 discounts ,是所有的优惠方式
  find 方法按照打折名称查找折扣

Settlement 类
  format方法将basketItems数组转换为basketArray,一个只包含价格和数量的对象数组

  account方法根据basketItems的内容计算可能的结算方式，并返回其中最小的价格
    如果basketItems中只有一种书，则返回本类书的价格*数量
    如果没有书，则返回0
    如果有超过两种的书，则循环调用getAmount方法获得不同优惠方式下的价格
  返回值为所有价格中的最小值

  getAmount方法根据basketArray和count来计算，count为计算折扣时最大的数量
    给了一个临时数组items，用来存放每次计算折扣的数据，最大长度为count
    查找basketArray，将其中符合条件的数据一次放入items中，并将该数据的count减1，
      条件为items的长度小于count并且当前数据的count不为0
    将items中数据的价格求和
    根据items的长度求应该打的折扣（getDiscount）
    计算打折后的价格
    直到将basketItems中的所有basketItem的数量都为0时，结束循环，并将计算的总价返回

  getDiscount 方法根据length返回不同的折扣
