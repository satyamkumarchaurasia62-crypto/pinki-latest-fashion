const _0x1a8f = [
  'id', 'title', 'mrp', 'price', 'image', 'images', 'sizes', 'stock',
  'Royal Pink Anarkali Kurti', 'Designer Ethnic Party Gown', 'Floral Printed Cotton Suit Set', 'Traditional Silk Festive Kurta',
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80',
  'S', 'M', 'L', 'XL', 'Free Size', 'liveRemainingStock', 'undefined', 'db', 'firebase', 'firestore', 'collection', 'get', 'data', 'deliveryStatus', 'status', 'toLowerCase', 'cancel', 'कैंसिल किया गया', 'return_received', 'returned', 'return received', 'productId', 'size', 'quantity', 'forEach', 'stock', 'Number', 'max', 'refreshProductStockUI', 'error', 'console'
];

const _0x5b2d = function(_0x3e172a) {
  return _0x1a8f[_0x3e172a];
};

const PRODUCTS = [
  {
    [_0x5b2d(0)]: 1,
    [_0x5b2d(1)]: _0x5b2d(8),
    [_0x5b2d(2)]: 1999,
    [_0x5b2d(3)]: 1299,
    [_0x5b2d(4)]: _0x5b2d(12),
    [_0x5b2d(5)]: [_0x5b2d(12)],
    [_0x5b2d(6)]: [_0x5b2d(16)],
    [_0x5b2d(7)]: { [_0x5b2d(16)]: 1 }
  },
  {
    [_0x5b2d(0)]: 2,
    [_0x5b2d(1)]: _0x5b2d(9),
    [_0x5b2d(2)]: 2799,
    [_0x5b2d(3)]: 1899,
    [_0x5b2d(4)]: _0x5b2d(13),
    [_0x5b2d(5)]: [_0x5b2d(13)],
    [_0x5b2d(6)]: [_0x5b2d(16)],
    [_0x5b2d(7)]: { [_0x5b2d(16)]: 1 }
  },
  {
    [_0x5b2d(0)]: 3,
    [_0x5b2d(1)]: _0x5b2d(10),
    [_0x5b2d(2)]: 1599,
    [_0x5b2d(3)]: 999,
    [_0x5b2d(4)]: _0x5b2d(14),
    [_0x5b2d(6)]: [_0x5b2d(16), _0x5b2d(17), _0x5b2d(18)],
    [_0x5b2d(7)]: { [_0x5b2d(16)]: 4, [_0x5b2d(17)]: 4, [_0x5b2d(18)]: 4 }
  },
  {
    [_0x5b2d(0)]: 4,
    [_0x5b2d(1)]: _0x5b2d(11),
    [_0x5b2d(2)]: 2199,
    [_0x5b2d(3)]: 1499,
    [_0x5b2d(4)]: _0x5b2d(15),
    [_0x5b2d(6)]: [_0x5b2d(17), _0x5b2d(18), _0x5b2d(19)],
    [_0x5b2d(7)]: { [_0x5b2d(17)]: 3, [_0x5b2d(18)]: 3, [_0x5b2d(19)]: 3 }
  }
];

window[_0x5b2d(21)] = {};
async function syncProductsAndLiveStock() {
  if (typeof PRODUCTS === _0x5b2d(22)) return;

  try {
    const database = window[_0x5b2d(23)] || firebase[_0x5b2d(25)]();
    const ordersSnap = await database[_0x5b2d(26)](_0x5b2d(51))[_0x5b2d(27)]();

    const soldCount = {};
    ordersSnap[_0x5b2d(34)](doc => {
      const ord = doc[_0x5b2d(28)]();
      const status = (ord[_0x5b2d(29)] || ord[_0x5b2d(30)] || "")[_0x5b2d(31)]();
      
      const isCancelled = status[_0x5b2d(44)](_0x5b2d(32)) || ord[_0x5b2d(29)] === _0x5b2d(33);
      const isReturned = status[_0x5b2d(44)](_0x5b2d(34)) || status[_0x5b2d(44)](_0x5b2d(35)) || status === _0x5b2d(36);

      if (!isCancelled && !isReturned) {
        const pid = String(ord[_0x5b2d(37)] || "");
        const sz = String(ord[_0x5b2d(38)] || _0x5b2d(20));
        const qty = Number(ord[_0x5b2d(39)]) || 1;
        const key = `${pid}_${sz}`;
        soldCount[key] = (soldCount[key] || 0) + qty;
      }
    });

    PRODUCTS[_0x5b2d(40)](product => {
      const pid = String(product[_0x5b2d(0)]);
      const stockObj = product[_0x5b2d(41)] || {};
      window[_0x5b2d(21)][pid] = {};

      (product[_0x5b2d(6)] || [])[_0x5b2d(40)](sz => {
        const totalQty = (stockObj[sz] !== undefined) ? Number(stockObj[sz]) : 10;
        const alreadySold = soldCount[`${pid}_${sz}`] || 0;
        window[_0x5b2d(21)][pid][sz] = Math[_0x5b2d(43)](0, totalQty - alreadySold);
      });

      refreshProductStockUI(pid);
    });
  } catch (err) {
    console[_0x5b2d(47)](_0x5b2d(46), err);
  }
}
