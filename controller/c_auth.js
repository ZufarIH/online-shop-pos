const bcrypt     = require('bcryptjs')
const model_user = require('../model/m_user')

module.exports =
{
    // if-nya biar object user gk bentrok
    halaman_login: function(req,res) {
        if (req.session.user) {
            res.redirect('/toko')
        }else{
        let data ={
            notifikasi: req.query.notif,
        }
        res.render('v_auth/login', data)
        }
    },
    proses_login: async function(req,res) {
        // ambil input dari halaman login
        let form_email = req.body.form_email
        let form_password = req.body.form_password
        // cek email yg di input pada database
        let email_exist = await model_user.cari_email(form_email)
        if (email_exist.length > 0){
            // cek password
            let password_cocok = bcrypt.compareSync(form_password, email_exist[0].password)
            if (password_cocok){
                // arahkan ke halaman utama sistem
                req.session.user = email_exist
                res.redirect('/toko')
            }else{
                let pesan = 'password salah!'
                res.redirect(`/auth/login?notif=${pesan}`)
            }
        }else{
            // tendang kehalaman register
            let pesan = 'email belum terdaftar, silahkan registrasi lebih dulu'
            res.redirect(`/auth/login?notif=${pesan}`)
        }
    },

    cek_login: function(req,res,next){
        if (req.session.user){
            next()
        }else{
            // lempar kehalaman login
            let pesan = 'sesi anda habis, silahkan masuk kembali!'
            res.redirect(`/auth/login?notif=${pesan}`)
        }
    },

}