// const {user , pwd} = require(`./secret.js`)
// const nodemailer =  require(`nodemailer`)

// function sendmail(){
//     const transporter = nodemailer.createTransport({
//         service : `gmail`,
//         auth : {
//             user : user,
//             pass : pwd
//         }
//     })
//     const mailOptions ={
//         from : user,
//         to : `shivangpatel83@gmail.com`,
//         subject : `sending Email using Node.js`,
//         text : `hey! its Shivang this side sending you mail to just checking the Authentication code`
//     }

//     transporter.sendMail(mailOptions,(err,info)=>{
//         if(err){
//             console.log(err)
//         }
//         else{
//             console.log(`Mail sent: `+info.response())
//         }
//     })
// }

// sendmail()