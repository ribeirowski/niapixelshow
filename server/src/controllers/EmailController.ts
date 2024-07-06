import { Request, Response, NextFunction } from 'express';
import { firestoreDB } from '../services/firebase/firebaseAdmin'; // Importa a instância correta do Firestore
import { ConfirmPayment, ErrorPayment, MailHandler } from 'src/services/nodemailer';
import { collection, addDoc, getDocs, doc, updateDoc, query, where, orderBy } from 'firebase/firestore';
import { request } from 'http';
import { Parser } from 'json2csv';
import Mail from 'nodemailer/lib/mailer';
class EmailController{

    //SEND METHOD
    async send (req: Request, res: Response, next: NextFunction) {
        try {
            const send_email = req.params.mail;
            const order = req.body.order;
            const name = req.body.name;
            const stat = req.body.stat;
            var text = '';
            var subj = '';
            if(stat === 'Confirmação'){
                text = ConfirmPayment(name, order);
                subj = 'Confirmação do Pagamento';
            }
            else if (stat === 'Erro'){
                text = ErrorPayment(name, order);
                subj = 'Erro no Pagamento';
            }
            const email = {
                userEmail: send_email,
                subjectText: subj,
                html: text
            }
            MailHandler(email);
            res.status(200).json({ message: 'Email sent successfully' });
            return next();
        } catch (error) {
            return next(error);
        }
    }
}
const emailController = new EmailController();
export default emailController;