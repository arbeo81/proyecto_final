import {
  EMAIL_PASSWORD,
  EMAIL_USERNAME,
  HOST_EMAIL,
  PORT_EMAIL,
} from "../../config/config.js";
import { cartsModel } from "../models/carts.js";
import { userModel } from "../models/user.js";
import nodemailer from "nodemailer";

export class UserRepository {
  static instance = null;

  static getInstance() {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository();
    }
    return UserRepository.instance;
  }
  constructor() {}

  modelGetUser = () => {
    return userModel.find();
  };

  modelUserById = (userId) => {
    return userModel.findById(userId);
  };

  modelRegisterAndLogin = (email) => {
    return userModel.findOne({ email });
  };

  modelCartCreate = () => {
    return cartsModel.create({ products: [] });
  };

  modelUserCreate = (user) => {
    return userModel.create(user);
  };

  createTransportCorreo = () => {
    return nodemailer.createTransport({
      host: HOST_EMAIL,
      port: PORT_EMAIL,
      auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD,
      },
      tls: { rejectUnauthorized: false },
    });
  };

  correoTextEnCola = (email, resetToken) => {
    const resetLink = `http://localhost:5000/Reset/${resetToken}`;
    return {
      from: '"Tienda" <j.arbeo@gmail.com>',
      to: email,
      subject: `¡Restablecimiento de contraseña!`,
      html: `
            <html>
            <head>
                <style>
                        
                </style>
            </head>
            <body>
                <div style="background: white; z-index:9999;">
                <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
                <a href="${resetLink}">${resetLink}</a>
                </div>
            </body>
        </html>
            `,
    };
  };

  enviarCorreo = (transporter, correo) => {
    return transporter.sendMail(correo);
  };

  saveResetToken = async (userId, token) => {
    await userModel.updateOne({ _id: userId }, { resetToken: token });
  };

  getResetToken = async (userId) => {
    const user = await userModel.findById(userId);
    return user.resetToken;
  };

  updatePassword = async (userId, password) => {
    await userModel.updateOne({ _id: userId }, { password: password });
  };

  removeResetToken = async (userId) => {
    await userModel.updateOne({ _id: userId }, { resetToken: null });
  };

  modelUpdateUserPassword = (email, hashedPassword) => {
    return userModel.updateOne({ email: email }, { password: hashedPassword });
  };

  modelUserEdit = (userId, updatedUser) => {
    return userModel.updateOne({ _id: userId }, { $set: updatedUser });
  };

  modelUserDelete = (userId) => {
    return userModel.findByIdAndDelete(userId);
  };

  correoTextEnColaSinConexion = (email) => {
    return {
      from: '"Tienda" <j.arbeo@gmail.com>',
      to: email,
      subject: `¡Falta de inactividad!`,
      html: `
            <html>
            <head>
                <style>
                </style>
            </head>
            <body>
                <div style="background: white; z-index:9999;">
                <p>por falta de inactividad su cuenta fue eliminada </p>
                </div>
            </body>
        </html>
            `,
    };
  };
}
