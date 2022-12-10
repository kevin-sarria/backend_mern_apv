import nodemailer from 'nodemailer';

const emailOlvidePassword = async(datos) => {

    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    const { email, nombre, token } = datos;

    // Enviar el email
    const info = transport.sendMail({
        from: "APV - Administrador de Pacientes de Veterinaria",
        to: email,
        subject: 'Reestablece tu Password',
        text: 'Reestablece tu Password',
        html: `<p>Hola: ${nombre}, Has solicitado reestablecer tu password.</p>
            <p>Da click en el siguiente enlace para generar un nuevo password: <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Password</a></p>

            <p>Si tu no pediste este cambio puedes ignorar este mensaje</p>
        `
    });

    console.log("Mensaje enviado: %s", (await info).messageId);

};

export default emailOlvidePassword;