import nodemailer from 'nodemailer';

import config from '@/config';

const nodemailerTransport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: config.SMTP_AUTH_USERNAME,
    pass: config.SMTP_AUTH_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default nodemailerTransport;
