'use strict';
const ip = require('ip');
const bcrypt = require('bcrypt');
const StockModel = require('../lib/model').Stock;

module.exports = function (app) {
    app.route('/api/stock-prices').get(async (req, res) => {
    const {stock, like} = req.query;
    const local_add = ip.address();
    const ip_add = bcrypt.hashSync(local_add, 12);
    if (Array.isArray(stock)) {
        // if two stock symbol passed
        const { symbol: symA, latestPrice: lpA } = await getStockPrice(stock[0]);
        const { symbol: symB, latestPrice: lpB } = await getStockPrice(stock[1]);

        const stockA = await StockModel.findOne({symbol: stock[0]});
        const stockB = await StockModel.findOne({symbol: stock[1]});
      
        let stockData = [];
        let error = "";
        let a = -1;
        let b = -1;
        if (!stockA) {
            a = 0;
        } else {
            if (!stockA.ip_address) {
                a = 0;
            } else {
                a = stockA.ip_address.length
            }
        }
        if (!stockB) {
            b = 0;
        } else {
          if (!stockB.ip_address) {
              b = 0;
          } else {
              b = stockB.ip_address.length
          }
      }
      if (!symA) {
          error = "invalid symbol"
          stockData.push({
              error: error,
              rel_likes: a - b
          })
      } else {
          stockData.push({
              stock: symA,
              price: lpA,
              rel_likes: a - b
          })
      }
      if (!symB) {
          error = "invalid symbol"
          stockData.push({
            error: error,
            rel_likes: b - a
          })
      } else {
          stockData.push({
              stock: symB,
              price: lpB,
              rel_likes: b - a
          })
      }
      res.json({
          stockData
      })
    } else {
      // single stock symbol passed
      const { symbol, latestPrice } = await getStockPrice(stock);
      if (!symbol) {
        res.json({
          stockData: {
            error: "invalid symbol",
            likes: 0
          }
        })
      } else {
        const searchSotck = await StockModel.findOne({symbol: stock});
        if (!searchSotck) {
          const newStock = new StockModel({
            symbol: stock,
          })
          if (like == 'true') {
            newStock.ip_address.push(ip_add)
          }
          const saved = await newStock.save();
          let n = -1
          if (!newStock.ip_address) {
            n = 0
          } else {
            n = newStock.ip_address.length
          }
          if (!saved) {
            res.json({
              error: "couldn't saved"
            })
          } else {
            res.json({
              stockData: {
                stock: symbol,
                price: latestPrice,
                likes: n
              }
            })
          }
          } else {
            if (like == 'true') {
              // if array is null
              if (searchSotck.ip_address.length == 0) {
                searchSotck.ip_address.push(ip_add);
                const saved = await searchSotck.save();
                let n = -1
                if (!searchSotck.ip_address) {
                  n = 0
                } else {
                  n = searchSotck.ip_address.length
                }
                if (!saved) {
                  res.json({
                    error: "couldn't saved"
                  })
                } else {
                  res.json({
                    stockData: {
                      stock: symbol,
                      price: latestPrice,
                      likes: n
                    }
                  })
                }
              } else {
                // if existing ip_address
                let compare = false;
                searchSotck.ip_address.forEach(element => {
                  if (bcrypt.compareSync(local_add, element)) {
                    compare = true
                    return;
                  }
                });
                if (!compare) {
                  searchSotck.ip_address.push(ip_add);
                  let n = -1
                  if (!searchSotck.ip_address) {
                    n = 0
                  } else {
                    n = searchSotck.ip_address.length
                  }
                  const saved = await searchSotck.save();
                  if(!saved) {
                    res.json({
                      error: "couldn't save"
                    })
                  } else {
                    res.json({
                      stockData: {
                        stock: symbol,
                        price: latestPrice,
                        likes: n
                      }
                    })
                  }
                }
              }
            } else {
              let n = -1;
              if (!searchSotck.ip_address) {
                n = 0
              } else {
                n = searchSotck.ip_address.length
              }
              // if no likes and like to remove each ip_address
              // let index = -1;
              // for (let i = 0; i < searchSotck.ip_address.length; i++) {
              //   if (bcrypt.compareSync(local_add, searchSotck.ip_address[i])) {
              //     index = i;
              //   }
              // }
              // searchSotck.ip_address.splice(index, 1);
              // n = searchSotck.ip_address.length;
              // const saved = await searchSotck.save();
              // if (!saved) {
              //   res.json({
              //     error: "couldn't save"
              //   })
              // } else {
              //   res.json({
              //     stockData: {
              //       stock: symbol,
              //       price: latestPrice,
              //       likes: n
              //     }
              //   })
              // }
              res.json({
                stockData: {
                  stock: searchSotck.symbol,
                  price: latestPrice,
                  likes: n
                }
              })
            }
          }
        }
      }
  });

  async function getStockPrice(stock) {
      const response = await fetch(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stock}/quote`);
      const { symbol, latestPrice } = await response.json();
      return { symbol, latestPrice }
  }
};