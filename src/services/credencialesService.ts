import { ssoDB } from '../database/connection';
import { queries } from '../database/credencialesQueries';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { Exception } from '../util/Exception';

export const getCredenciales = async () => {
    try {
        const [credenciales] = await ssoDB.query(queries.getAllCredenciales);
        return credenciales;
    } catch (error) {
        console.log(error);
    }
}

export const getCredencial = async (idCredencial: string) => {
    try {
        const [credenciales] = await ssoDB.query(queries.getCredencialById, [idCredencial]);
        return credenciales;
    } catch (error) {
        console.log(error);
    }
}


export const insertCredencial = async (curp: string, usuario: string, correo: string, celular: string, contrasena: string) => {
    try {
        const uuid = uuidv4();
        const salt = await bcrypt.genSalt(10);
        const criptContrasena = await bcrypt.hash(contrasena, salt);
        const [credenciales] = await ssoDB.query(queries.insertCredencial, [uuid, curp, usuario, correo, celular, criptContrasena]);
        return credenciales;
    } catch (error) {
        console.log(error);
    }
}

export const uptateCredencial = async (idCredencial: string, usuario: string, correo: string, celular: string, tipo: string) => {
    try {
        const [credenciales] = await ssoDB.query(queries.updateCredencial, [idCredencial, usuario, correo, celular, tipo]);
        return credenciales;
    } catch (error) {
        console.log(error);
    }
}

export const setPassword = async (idCredencial: string, contrasena: string) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const criptContrasena = await bcrypt.hash(contrasena, salt);
        const [credenciales] = await ssoDB.query(queries.updateContrasena, [idCredencial, criptContrasena]);
        return credenciales;
    } catch (error) {
        console.log(error);
    }
}

export const deleteCredencial = async (idCredencial: string) => {
    try {
        const [credenciales] = await ssoDB.query(queries.deleteCredencial, [idCredencial]);
        return credenciales;
    } catch (error) {
        console.log(error);
    }
}