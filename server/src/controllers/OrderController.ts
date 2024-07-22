import { Request, Response, NextFunction } from "express";
import { firestoreDB } from "../services/firebase/firebaseAdmin"; // Importa a instância correta do Firestore
import { Order, UpdateOrder } from "../DTOs";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { request } from "http";
import { Parser } from "json2csv";
class OrderController {
  //CREATE METHOD
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, item, description, qtd, price, status, date, addr } =
        req.body;

      // Verifica se todos os campos estão preenchidos
      if (
        !email ||
        !item ||
        !description ||
        !qtd ||
        !price ||
        !status ||
        !date ||
        !addr
      ) {
        return res
          .status(400)
          .json({ message: "Todos os campos devem ser preenchidos" });
      }
      const orderData = Order.parse(req.body);
      // Adiciona o novo pedido ao Firestore
      const orderRef = await firestoreDB.collection("orders").add(orderData);

      res
        .status(201)
        .json({
          message: "Pedido cadastrado com sucesso",
          id: orderRef.id,
          order: orderData,
        });
      return next();
    } catch (error) {
      return next(error);
    }
  }

  //UPDATE METHOD
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const orderId = req.params.id;
      const orderData = UpdateOrder.parse(req.body);

      // Verifica se o pedido existe
      const orderDoc = await firestoreDB
        .collection("orders")
        .doc(orderId)
        .get();
      if (!orderDoc.exists) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Atualiza as informações do pedido no Firestore
      await firestoreDB.collection("orders").doc(orderId).update(orderData);

      res.status(200).json({ message: "Order updated successfully" });
      return next();
    } catch (error) {
      return next(error);
    }
  }

  //READ ALL METHOD
  async readAll(req: Request, res: Response, next: NextFunction) {
    try {
      const allOrders = await firestoreDB.collection("orders").get();
      if (allOrders.empty) {
        res.status(426).json({ message: "Nenhum pedido encontrado" });
      } else {
        const orders = allOrders.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        res.status(200).json(orders); // Apenas uma resposta aqui}
      }
      return next();
    } catch (error) {
      return next(error);
    }
  }

    //GET STATS METHOD
    async getStats(req: Request, res: Response, next: NextFunction) {
        try {
            const { year, month } = req.query;

            // Get all products or paid orders
            const allOrders = await firestoreDB.collection('orders').where("status", "==", "Pago").get();
            const ordersRaw = allOrders.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            
            const orders = ordersRaw.map(element => {
                const orderVar = Order.parse(element);
                const compare = orderVar.date.split('-');
                if((compare[0] === year && compare[1] === month) || year === "0000") {
                    return orderVar;
                }
                return null;
            }).filter(order => order != null);

            // Establish stats to be sent
            var totalValue = 0;
            var mostSold = 'none';
            var productAmount = [0];
            var productValue = [0];
            var productName = [''];
            var index = 0;
            var first = 1;
            orders.forEach(element => {
                const orderVar = Order.parse(element);
                var found = -1;
                for(var i = 0; i <= index; i++) {
                    if(orderVar.item == productName[i]) {
                        found = i;
                    }
                }
                if(found == -1) {
                    if(first) {
                        first = 0;
                        productName[index] = orderVar.item;
                        found = 0;
                    }
                    else {
                        index = index + 1;
                        productName.push(orderVar.item);
                        productAmount.push(0);
                        productValue.push(0);
                        found = index;
                    }
                }
                totalValue = totalValue + orderVar.price;
                productAmount[found] = productAmount[found] + orderVar.qtd;
                productValue[found] = productValue[found] + orderVar.price;
            });
            var highestValue = 0;
            for(var i = 0; i <= index; i++) {
                if(productAmount[i] > highestValue) {
                    highestValue = productAmount[i];
                    mostSold = productName[i];
                }
            }
            res.status(200).json({ totalValue, mostSold, productName, productAmount, productValue });
            return next();
        } catch(error) {
            return next(error);
        }
        
  }

  //READ METHOD
  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const orderId = req.params.id;
      const orderDoc = await firestoreDB
        .collection("orders")
        .doc(orderId)
        .get();
      if (!orderDoc.exists) {
        return res.status(404).json({ message: "order not found" }); // Aqui enviamos uma resposta se o pedido não for encontrado
      }
      const orderData = orderDoc.data();
      res.status(200).json({ id: orderDoc.id, ...orderData }); // Aqui enviamos a resposta com os dados do pedido encontrado
      return next();
    } catch (error) {
      return next(error);
    }
  }

  //READ BY DATE METHOD
  async readByDate(req: Request, res: Response, next: NextFunction) {
    try {
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        return res
          .status(400)
          .json({
            message: "startDate and endDate query parameters are required",
          });
      }

            return next();
        } catch (error) {
            return next(error);
        }
    }


    //DELETE METHOD
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const orderId = req.params.id;
            await firestoreDB.collection('orders').doc(orderId).delete();
            res.status(200).json({ message: 'order deleted successfully' });
            return next();
        } catch (error) {
            return next(error);
        }
    }

    //FILTER ALL METHOD
    async filterAll(req: Request, res: Response, next: NextFunction){ 
        //Filtra todos os pedidos de um dado usuário de acordo com alguma característica
        try {
            let query;
            let allOrdersSnapshot;
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            const isDate = (str: string) => {
                if(!dateRegex.test(str)){
                    return false;
                }
                return true;
            }
            const atribute = req.params.filtro;
            const {func, filter, email} = req.query;
            const filterString = typeof filter === 'string' ? filter : '';
            var filt: string | Number;
            if(Number.isNaN(parseFloat(filterString)) || isDate(filterString)){
                filt = filterString
            }
            else {
                filt = parseFloat(filterString)
            }

            if(email === ''){
                if (func === 'Acima de') {
                    var allFiltOrders = await firestoreDB.collection('orders').where(atribute, '>' , filt).get();;
                } else if (func === 'Abaixo de') {
                    var allFiltOrders = await firestoreDB.collection('orders').where(atribute, '<' , filt).get();
                } else {
                    var allFiltOrders = await firestoreDB.collection('orders').where(atribute, '==' , filt).get();
                }
                if(allFiltOrders.empty){
                    res.status(426).json({ message: 'Nenhum pedido encontrado' })
                }
                else{
                    const orders = allFiltOrders.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                    }));
                    res.status(200).json(orders); // Apenas uma resposta aqui}
                }
                return next();
            }
            else{    
                type Pedido = {
                    id: string;
                    email: string;
                    item: string;
                    description: string;
                    qtd: number;
                    price: number;
                    status: string;
                    date: string;
                    addr: string;
                };

                allOrdersSnapshot = await firestoreDB.collection('orders').where('email', '==', email).get();

                const orders = allOrdersSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Pedido[];

                // Filtrando em memória pelo segundo critério
                let filteredOrders : Pedido[];
                if (func === 'Acima de') {
                    filteredOrders = orders.filter(order => order[atribute as keyof Pedido] > filt);
                } else if (func === 'Abaixo de') {
                    filteredOrders = orders.filter(order => order[atribute as keyof Pedido] < filt);
                } else {
                    filteredOrders = orders.filter(order => order[atribute as keyof Pedido] === filt);
                }
                
                if(filteredOrders.length === 0){
                    res.status(426).json({ message: 'Nenhum pedido encontrado' })
                }
                else{
                    res.status(200).json(filteredOrders); // Apenas uma resposta aqui}
                }
            }
            return next();
        }catch (error) {
            return next(error);
        }
        return true;
      };
}
const orderController = new OrderController();
export default orderController;
