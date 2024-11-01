const mysql             = require('mysql2')
const bcrypt            = require('bcryptjs')
const config_database   = require('../config/database')
const db                = config_database.db
const eksekusi          = config_database.eksekusi

module.exports = 
{

    cari_email: function (form_email) {
        let sqlsyntax = mysql.format(
            'SELECT * FROM user WHERE email = ?',
            [form_email]
        )
        return eksekusi (sqlsyntax)
    },

    // coba

    insertReg: function(req, passwordhash) {
        // let form_password   = req.params.form_password
        let sqlData = {
            email           : req.body.form_email,
            // password        : bcrypt.hashSync(form_password),
            password        : passwordhash,
            nama_lengkap    : req.body.form_namaLengkap,
            role_id         : 2,
        }

        let sqlSyntax = mysql.format(
            `INSERT INTO user SET ?`,
            [sqlData]
        )
        return eksekusi( sqlSyntax )
    },

    editUser: function(req, passwordhash) {
        // let form_password   = req.params.form_password
        let sqlData = {
            email           : req.body.form_email,
            // password        : bcrypt.hashSync(form_password),
            password        : passwordhash,
            nama_lengkap    : req.body.form_namaLengkap,
            alamat          : req.body.form_alamat,
            role_id         : 2,
        }

        let sqlSyntax = mysql.format(
            `UPDATE INTO user SET ?`,
            [sqlData]
        )
        return eksekusi( sqlSyntax )
    },

}